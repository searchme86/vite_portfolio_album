// useHandleFileUpload 훅: 파일 업로드 처리
// 의미: 파일 업로드 로직 통합
// 이유: 단일 책임 원칙 준수
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/clerk-react';
import { useImageUploadStore } from '@/stores/imageUploadStore';
import useFileValidation from './useFileValidation';

interface ImageUrl {
  url: string;
  isNew: boolean;
}

function useHandleFileUpload(): {
  handleFileUpload: (
    e: React.ChangeEvent<HTMLInputElement>,
    existingBaseFileNames: string[]
  ) => Promise<void>;
} {
  const { setImageUrls, setProgress, setIsUploading, setTempFiles } =
    useImageUploadStore();

  // handleFileUpload 함수: 파일 업로드 처리
  // 의미: 파일 선택 후 업로드 및 상태 관리
  // 이유: 사용자 입력 처리
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    existingBaseFileNames: string[]
  ): Promise<void> => {
    const files = Array.from(e.target.files || []);
    // 타입: File[] - 선택된 파일 배열
    // 의미: FileList를 배열로 변환
    // 이유: 반복 처리 용이

    const { validateFiles } = useFileValidation();
    const { duplicateFiles, newFiles } = validateFiles(
      files,
      existingBaseFileNames
    );
    // 타입: { duplicateFiles: File[], newFiles: File[] }
    // 의미: 중복 파일 검증
    // 이유: 중복 업로드 방지

    if (duplicateFiles.length > 0) {
      console.log(
        '중복 파일 발견:',
        duplicateFiles.map((file) => file.name)
      );
      setIsUploading(false);
      // 의미: 업로드 중지
      // 이유: 중복 파일 처리
      return;
    }

    const previewUrls = newFiles.map((file) => URL.createObjectURL(file));
    // 타입: string[] - 미리보기 URL 배열
    // 의미: 파일 미리보기 URL 생성
    // 이유: UI 피드백 제공

    setTempFiles(newFiles);
    // 의미: 임시 파일 상태 저장
    // 이유: 업로드 중 UI 표시

    setIsUploading(true);
    // 의미: 업로드 상태 활성화
    // 이유: UI 상태 업데이트

    setProgress(0);
    // 의미: 진행률 초기화
    // 이유: 업로드 시작 표시

    try {
      const authParams = await fetchAuthParams();
      // 타입: any - 인증 파라미터
      // 의미: ImageKit 인증 정보
      // 이유: 업로드 인증

      const totalFiles = newFiles.length;
      // 타입: number - 총 파일 수
      // 의미: 진행률 계산 기준
      // 이유: 업로드 상태 추적

      let uploadedFiles = 0;
      // 타입: number - 업로드된 파일 수
      // 의미: 진행 상태 추적
      // 이유: 진행률 계산

      const newUploadedUrls: ImageUrl[] = [];
      // 타입: ImageUrl[] - 업로드된 URL 배열
      // 의미: 새 URL 저장
      // 이유: 상태 업데이트 준비

      for (const file of newFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('publicKey', import.meta.env.VITE_IK_PUBLIC_KEY);
        formData.append('folder', '/posts');
        formData.append('token', authParams.token);
        formData.append('signature', authParams.signature);
        formData.append('expire', authParams.expire);
        // 의미: 업로드용 FormData 생성
        // 이유: ImageKit API 요청 준비

        const res = await axios.post(
          'https://upload.imagekit.io/api/v1/files/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const progress = progressEvent.total
                ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
                : 0;
              // 타입: number - 개별 파일 진행률
              // 의미: 업로드 진행 상태
              // 이유: 진행률 계산

              uploadedFiles++;
              const overallProgress = Math.round(
                (uploadedFiles / totalFiles) * 100 * (progress / 100)
              );
              // 타입: number - 전체 진행률
              // 의미: 총 진행 상태 계산
              // 이유: UI 업데이트

              setProgress(overallProgress);
              // 의미: 진행률 상태 업데이트
              // 이유: 사용자 피드백
            },
          }
        );

        newUploadedUrls.push({ url: res.data.url, isNew: true });
        // 의미: 업로드된 URL 추가
        // 이유: 상태 업데이트 준비
      }

      const updatedUrls = [
        ...(useImageUploadStore.getState().imageUrls || []),
        ...newUploadedUrls,
      ];
      // 타입: ImageUrl[] - 최종 URL 배열
      // 의미: 기존 URL과 새 URL 병합
      // 이유: 상태 일관성 유지

      setImageUrls(updatedUrls);
      // 의미: URL 상태 업데이트
      // 이유: 업로드 완료 처리

      setProgress(100);
      // 의미: 진행률 완료
      // 이유: 업로드 완료 표시

      setIsUploading(false);
      // 의미: 업로드 상태 비활성화
      // 이유: UI 상태 복원

      setTimeout(() => {
        setTempFiles([]);
        setProgress(0);
        // 의미: 임시 파일 및 진행률 초기화
        // 이유: 다음 업로드 준비
      }, 1000);
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      toast.error('사진 업로드 실패');
      setIsUploading(false);
      setProgress(0);
      // 의미: 에러 처리
      // 이유: 사용자 피드백 및 상태 복구
    } finally {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
      // 의미: 메모리 누수 방지
      // 이유: 리소스 해제
    }
  };

  // fetchAuthParams 함수: 인증 파라미터 가져오기
  // 의미: ImageKit 인증 처리
  // 이유: 안전한 업로드
  const fetchAuthParams = async (): Promise<any> => {
    const { getToken } = useAuth();
    const token = await getToken();
    // 타입: string | null - 인증 토큰
    // 의미: 사용자 인증 정보
    // 이유: API 요청 인증

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // 타입: any - API 응답
    // 의미: 인증 파라미터
    // 이유: 업로드 준비

    return res.data;
    // 의미: 인증 데이터 반환
    // 이유: 업로드 요청에 사용
  };

  return { handleFileUpload };
  // 타입: { handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>, existingBaseFileNames: string[]) => Promise<void> }
  // 의미: 파일 업로드 핸들러 반환
  // 이유: 재사용 가능성
}

export default useHandleFileUpload;
//====여기까지 수정됨====

import { useRef, useState, useEffect } from 'react'; // @type {Function} - React 훅
// @description 페이지가 바뀔 때나 파일을 다룰 때 도움을 주는 친구
// @reason 파일 업로드와 상태를 관리하기 위해
import axios from 'axios'; // @type {Object} - HTTP 요청 라이브러리
// @description 서버와 편지 주고받는 도구
// @reason 사진을 서버에 보내기 위해
import { useAuth } from '@clerk/clerk-react'; // @type {Function} - 인증 훅
// @description 비밀 번호 확인 도구
// @reason 안전하게 서버에 접근하기 위해
import { toast } from 'react-toastify'; // @type {Function} - 토스트 알림
// @description "잘했어요!" 같은 팝업 메세지
// @reason 사용자에게 알려주기 위해
import { useImageUploadStore } from '@/stores/imageUploadStore'; // @type {Function} - Zustand 스토어 훅
// @description 사진 상태를 저장하는 상자
// @reason 사진 정보를 계속 기억하기 위해
import PreviewContainer from './parts/PreviewContainer'; // @type {Component} - 미리보기 컨테이너
// @description 사진 미리보기를 보여주는 친구
// @reason 사진을 보기 좋게 정리하기 위해

interface ImageUrl {
  url: string; // @type {string} - 이미지 URL
  // @description 사진이 있는 인터넷 주소
  // @reason 사진을 보여주기 위해
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새로 만든 사진인지 확인
  // @reason 사진 관리
}

interface ImageUploaderProps {
  postId: string; // @type {string} - 포스트 ID
  // @description 포스트의 고유 번호
  // @reason 서버와 연결하기 위해
  initialFiles?: File[]; // @type {File[]} - 초기 파일 배열
  // @description 처음에 주어진 파일들
  // @reason 초기 상태 설정
  initialUrls?: string[]; // @type {string[]} - 초기 URL 배열
  // @description 처음에 주어진 사진 주소들
  // @reason 초기 상태 설정
  onFilesChange: (
    files: File[],
    urls: string[],
    progress: number,
    isUploading: boolean
  ) => void; // @type {Function} - 파일 변경 핸들러
  // @description 파일이나 주소가 바뀌었을 때 알려주는 함수
  // @reason 상위 컴포넌트와 소통
  buttonText?: string; // @type {string} - 버튼 텍스트
  // @description 버튼에 쓸 글자
  // @reason 사용자에게 보여주기
  existingBaseFileNames?: string[]; // @type {string[]} - 기존 파일 이름 배열
  // @description 서버에 이미 있는 파일 이름들
  // @reason 중복 확인
  minImages?: number; // @type {number} - 최소 이미지 수
  // @description 한 번에 보여줄 최소 사진 수
  // @reason 사진이 너무 적을 때 막기 위해
}

function ImageUploader({
  postId,
  initialFiles = [], // @type {File[]} - 기본값 빈 배열
  // @description 초기 파일이 없으면 빈 배열
  // @reason 오류 방지
  initialUrls = [], // @type {string[]} - 기본값 빈 배열
  // @description 초기 URL이 없으면 빈 배열
  // @reason 오류 방지
  onFilesChange,
  buttonText,
  existingBaseFileNames = [], // @type {string[]} - 기본값 빈 배열
  // @description 기존 파일 이름이 없으면 빈 배열
  // @reason 오류 방지
  minImages = 1, // @type {number} - 기본 최소 이미지 수
}: // @description 최소 한 장의 사진을 보이게 함
// @reason 기본 설정
ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null); // @type {React.RefObject<HTMLInputElement>} - 파일 입력 참조
  // @description 파일 선택 버튼을 가리키는 손전등
  // @reason 파일을 클릭할 수 있게
  const { getToken } = useAuth(); // @type {Function} - 인증 토큰 가져오기
  // @description 비밀 열쇠 가져오는 도구
  // @reason 서버에 안전하게 접근
  const {
    imageUrls,
    setImageUrls,
    progress,
    setProgress,
    tempFiles,
    setTempFiles,
    isUploading: storeIsUploading,
    setIsUploading: setStoreIsUploading,
    setPostId,
  } = useImageUploadStore(); // @type {Object} - Zustand 스토어 상태
  // @description 사진 상태를 담는 큰 상자
  // @reason 사진 정보 관리
  const [uploadStatus, setUploadStatus] = useState<string>(''); // @type {string} - 업로드 상태
  // @description "지금 무슨 일이 일어나고 있나" 보여주는 메모
  // @reason 사용자에게 알려주기
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // @type {string[]} - 미리보기 URL
  // @description 사진 미리보기 주소 목록
  // @reason 사진 미리 보여주기

  // @description 컴포넌트가 처음 시작하거나 초기 파일/URL이 바뀔 때 실행
  // @reason 초기 상태를 설정하고 정리
  // @mechanism: React가 컴포넌트를 처음 렌더링하거나 의존성 배열 값이 변경될 때 실행됨
  useEffect(() => {
    setPostId(postId); // @type {void} - 포스트 ID 설정
    // @description 포스트 번호를 상자에 넣기
    // @reason 서버와 연결
    const urls = initialFiles.map((file) => URL.createObjectURL(file)); // @type {string[]} - 미리보기 URL
    // @description 파일로 미리보기 주소 만들기
    // @reason 사진 미리 보기
    setTempFiles(initialFiles); // @type {void} - 임시 파일 설정
    // @description 잠시 파일 보관
    // @reason 업로드 준비
    setImageUrls(initialUrls.map((url) => ({ url, isNew: true }))); // @type {void} - 초기 이미지 URL 설정
    // @description 처음 사진 주소 정리
    // @reason 상태 맞추기
    setPreviewUrls(urls); // @type {void} - 미리보기 URL 설정
    // @description 미리보기 주소 넣기
    // @reason 보여주기
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url)); // @type {void} - URL 해제
      // @description 사용한 주소 치우기
      // @reason 메모리 정리
    };
  }, [initialFiles, initialUrls, setImageUrls, setPostId, setTempFiles]); // @description 의존성 배열
  // @reason 처음 시작과 정리

  // @description 서버에서 인증 정보를 가져오는 비동기 함수
  // @reason ImageKit 업로드를 위한 인증 정보 필요
  // @mechanism: axios로 서버에 요청을 보내고, 토큰을 포함한 헤더로 인증 후 데이터를 반환
  const fetchAuthParams = async (): Promise<any> => {
    try {
      const token = await getToken(); // @type {string} - 인증 토큰
      // @description 비밀 열쇠 받기
      // @reason 안전 접근
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/upload-auth`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      ); // @type {Object} - 응답 데이터
      // @description 서버에서 인증 정보 받기
      // @reason ImageKit 사용
      return res.data; // @type {any} - 인증 데이터
      // @description 인증 정보 주기
    } catch (error) {
      console.error('ImageKit 인증 실패:', error); // @type {void} - 에러 로깅
      // @description 에러 기록
      // @reason 확인
      toast.error('ImageKit 인증 파라미터 가져오기 실패'); // @type {void} - 알림
      // @description 사용자에게 알리기
      // @reason 피드백
      throw error; // @type {Error} - 에러 throw
      // @description 에러 넘기기
    }
  };

  // @description 파일 선택 시 실행되는 함수
  // @reason 사용자가 선택한 파일을 업로드하고 상태를 업데이트
  // @mechanism: 파일 중복 확인 후 ImageKit에 업로드, 진행 상황을 추적하며 상태 업데이트
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []); // @type {File[]} - 선택된 파일
    // @description 선택한 파일 목록
    // @reason 업로드 준비
    const newFiles = files; // @type {File[]} - 새 파일
    // @description 새로 고른 파일
    // @reason 처리
    console.log(
      '업로드할 파일:',
      files.map((file) => file.name)
    ); // @type {void} - 디버깅 로그
    // @description 파일 이름 확인
    // @reason 체크

    const duplicateFiles = newFiles.filter((file) => {
      const localFileName = file.name; // @type {string} - 파일 이름
      // @description 파일 이름 꺼내기
      // @reason 중복 확인
      console.log(
        '파일 이름 비교:',
        localFileName,
        '서버 파일 이름:',
        existingBaseFileNames
      ); // @type {void} - 디버깅 로그
      // @description 비교 기록
      // @reason 확인
      const isDuplicate = existingBaseFileNames.includes(localFileName); // @type {boolean} - 중복 여부
      // @description 같은 파일인지 체크
      // @reason 중복 막기
      console.log('서버와 중복인가?:', isDuplicate); // @type {void} - 디버깅 로그
      // @description 결과 보기
      // @reason 확인
      return isDuplicate; // @type {boolean} - 중복 여부 반환
      // @description 필터 조건
    });

    if (duplicateFiles.length > 0) {
      console.log(
        '중복 파일 발견, 업로드 중지:',
        duplicateFiles.map((file) => file.name)
      ); // @type {void} - 디버깅 로그
      // @description 중복 파일 기록
      // @reason 확인
      setUploadStatus('서버에 있는 같은 사진은 바꿀 수 없어요'); // @type {void} - 상태 설정
      // @description 상태 업데이트
      // @reason 알리기
      setStoreIsUploading(false); // @type {void} - 업로드 상태 설정
      // @description 업로드 멈춤
      // @reason UI 조정
      setPreviewUrls([]); // @type {void} - 미리보기 URL 초기화
      // @description 미리보기 지우기
      // @reason 상태 맞추기
      onFilesChange(
        [],
        imageUrls.map((img) => img.url),
        0,
        false
      ); // @type {void} - 상위 이벤트
      // @description 위로 데이터 보내기
      // @reason 동기화
      return; // @type {void} - 함수 종료
      // @description 중복이면 멈춤
    }
    console.log('중복 없음, 업로드 시작'); // @type {void} - 디버깅 로그
    // @description 진행 확인
    // @reason 체크

    const previewUrls = files.map((file) => URL.createObjectURL(file)); // @type {string[]} - 미리보기 URL
    // @description 새 파일로 미리보기 주소 만들기
    // @reason 보여주기
    setPreviewUrls(previewUrls); // @type {void} - 미리보기 URL 설정
    // @description 미리보기 주소 업데이트
    // @reason 상태 동기화
    setTempFiles(newFiles); // @type {void} - 임시 파일 설정
    // @description 파일 보관
    // @reason 준비
    setStoreIsUploading(true); // @type {void} - 업로드 상태 설정
    // @description 업로드 시작
    // @reason UI 조정
    setUploadStatus('파일을 올리는 중이에요'); // @type {void} - 상태 설정
    // @description 상태 업데이트
    // @reason 알리기
    setProgress(0); // @type {void} - 진행률 설정
    // @description 처음 진행률
    // @reason 초기화

    const newUploadedUrls: ImageUrl[] = []; // @type {ImageUrl[]} - 새 업로드 URL
    // @description 올린 사진 주소 저장
    // @reason 관리
    try {
      const authParams = await fetchAuthParams(); // @type {any} - 인증 파라미터
      // @description 인증 정보 받기
      // @reason ImageKit 사용
      const totalFiles = files.length; // @type {number} - 총 파일 수
      // @description 파일 수 세기
      // @reason 진행률 계산
      let uploadedFiles = 0; // @type {number} - 업로드된 파일 수
      // @description 업로드된 개수 체크
      // @reason 진행률 업데이트

      for (const file of files) {
        const formData = new FormData(); // @type {FormData} - 폼 데이터
        // @description 보낼 상자 준비
        // @reason 서버로 보내기
        formData.append('file', file); // @type {void} - 파일 추가
        // @description 파일 넣기
        // @reason 업로드
        formData.append('fileName', file.name); // @type {void} - 파일 이름 추가
        // @description 이름 붙이기
        // @reason 서버 요구
        formData.append('publicKey', import.meta.env.VITE_IK_PUBLIC_KEY); // @type {void} - 공개 키 추가
        // @description 열쇠 보여주기
        // @reason 인증
        formData.append('folder', '/posts'); // @type {void} - 폴더 추가
        // @description 사진 넣을 폴더
        // @reason 정리
        formData.append('token', authParams.token); // @type {void} - 토큰 추가
        // @description 비밀 토큰
        // @reason 안전
        formData.append('signature', authParams.signature); // @type {void} - 서명 추가
        // @description 서명 넣기
        // @reason 안전
        formData.append('expire', authParams.expire); // @type {void} - 만료 시간 추가
        // @description 만료 시간 설정
        // @reason 안전

        const res = await axios.post(
          'https://upload.imagekit.io/api/v1/files/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' }, // @type {Object} - 헤더
            // @description 여러 파일 보낼 준비
            // @reason 업로드
            onUploadProgress: (progressEvent) => {
              const progress =
                progressEvent.total !== undefined
                  ? Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    )
                  : 0; // @type {number} - 개별 진행률
              // @description 한 파일 진행률 계산
              // @reason 상태 업데이트
              uploadedFiles++; // @type {number} - 업로드된 파일 증가
              // @description 카운트 올리기
              // @reason 전체 진행
              const overallProgress = Math.round(
                (uploadedFiles / totalFiles) * 100 * (progress / 100)
              ); // @type {number} - 전체 진행률
              // @description 전체 진행 계산
              // @reason 피드백
              setProgress(overallProgress); // @type {void} - 진행률 설정
              // @description 진행률 업데이트
              // @reason UI 맞추기
            },
          }
        ); // @type {Object} - 응답
        // @description 서버 답장
        // @reason 주소 받기
        const imageUrl = res.data.url; // @type {string} - 이미지 URL
        // @description 사진 주소 꺼내기
        // @reason 저장
        newUploadedUrls.push({ url: imageUrl, isNew: true }); // @type {ImageUrl[]} - 새 URL 추가
        // @description 주소 목록에 추가
        // @reason 상태 동기화
      }

      const updatedUrls = [...imageUrls, ...newUploadedUrls]; // @type {ImageUrl[]} - 업데이트된 URL
      // @description 기존과 새 주소 합치기
      // @reason 상태 유지
      setImageUrls(updatedUrls); // @type {void} - 상태 업데이트
      // @description 주소 저장
      // @reason 영구 저장
      setUploadStatus('파일 올리기 완료!'); // @type {void} - 상태 설정
      // @description 완료 알림
      // @reason 피드백
      setProgress(100); // @type {void} - 진행률 설정
      // @description 끝 표시
      // @reason UI 맞추기
      onFilesChange(
        newFiles,
        updatedUrls.map((img) => img.url),
        100,
        false
      ); // @type {void} - 상위 이벤트
      // @description 위로 데이터 보내기
      // @reason 동기화
      setStoreIsUploading(false); // @type {void} - 업로드 상태 설정
      // @description 업로드 끝
      // @reason UI 조정

      setTimeout(() => {
        setTempFiles([]); // @type {void} - 임시 파일 초기화
        // @description 임시 파일 치우기
        // @reason 메모리 정리
        setProgress(0); // @type {void} - 진행률 초기화
        // @description 진행률 리셋
        // @reason 상태 초기화
        setUploadStatus(''); // @type {void} - 상태 초기화
        // @description 상태 지우기
        // @reason UI 정리
        onFilesChange(
          [],
          updatedUrls.map((img) => img.url),
          0,
          false
        ); // @type {void} - 상위 이벤트
        // @description 위로 데이터 보내기
        // @reason 동기화
      }, 1000); // @type {number} - 지연 시간
      // @description 1초 기다리기
      // @reason 사용자 편리함
    } catch (error) {
      console.error('사진 업로드 실패:', error); // @type {void} - 에러 로깅
      // @description 에러 기록
      // @reason 확인
      toast.error('사진 업로드 실패'); // @type {void} - 알림
      // @description 사용자 알리기
      // @reason 피드백
      setUploadStatus('사진 업로드 중 에러 발생'); // @type {void} - 상태 설정
      // @description 에러 알림
      // @reason 피드백
      setStoreIsUploading(false); // @type {void} - 업로드 상태 설정
      // @description 업로드 멈춤
      // @reason UI 조정
      setProgress(0); // @type {void} - 진행률 초기화
      // @description 진행률 리셋
      // @reason 상태 초기화
      onFilesChange(
        newFiles,
        imageUrls.map((img) => img.url),
        0,
        false
      ); // @type {void} - 상위 이벤트
      // @description 위로 데이터 보내기
      // @reason 동기화
      return; // @type {void} - 함수 종료
      // @description 에러 시 멈춤
    }
  };

  // @description 이미지 삭제 함수
  // @reason 사용자가 이미지를 삭제할 때 호출
  // @mechanism: 인덱스 유효성 검사 후 Zustand 상태 업데이트
  const handleDeleteFile = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return; // @type {void} - 유효성 검사
    // @description 인덱스 범위 확인
    // @reason 오류 막기
    if (imageUrls.length <= minImages) return; // @type {void} - 최소 이미지 체크
    // @description 최소 사진 수 지키기
    // @reason 규칙 유지

    const newImageUrls = imageUrls.filter((_, i) => i !== index); // @type {ImageUrl[]} - 새 URL 배열
    // @description 선택한 사진 빼기
    // @reason 삭제
    setImageUrls(newImageUrls); // @type {void} - 상태 업데이트
    // @description 주소 저장
    // @reason 상태 맞추기
    onFilesChange(
      [],
      newImageUrls.map((img) => img.url),
      progress,
      storeIsUploading
    ); // @type {void} - 상위 이벤트
    // @description 위로 데이터 보내기
    // @reason 동기화
    setUploadStatus(''); // @type {void} - 상태 초기화
    // @description 상태 지우기
    // @reason UI 정리
  };

  // @description 파일 추가 버튼 클릭 시 실행
  // @reason 파일 선택 창 열기
  // @mechanism: fileInputRef를 통해 파일 입력 요소를 트리거
  const handleAddFileClick = () => {
    fileInputRef.current?.click(); // @type {void} - 파일 입력 클릭
    // @description 파일 선택 창 열기
    // @reason 사용자 행동
  };

  // @description UI 렌더링
  // @reason 사용자 인터페이스 표시
  // @mechanism: JSX를 통해 파일 업로드 버튼과 미리보기 영역 렌더링
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
          aria-label="업로드할 이미지 파일을 선택해주세요"
        />
        <button
          type="button"
          onClick={handleAddFileClick}
          disabled={storeIsUploading}
          className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            storeIsUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Add or update images for the post"
          onKeyDown={(e) => e.key === 'Enter' && handleAddFileClick()}
        >
          {buttonText || useImageUploadStore.getState().buttonText}
        </button>
      </div>
      {uploadStatus && (
        <p
          className={`text-sm ${
            uploadStatus === '서버에 있는 같은 사진은 바꿀 수 없어요'
              ? 'text-red-500'
              : 'text-gray-600'
          }`}
        >
          {uploadStatus}
        </p>
      )}
      {tempFiles.length > 0 && (
        <PreviewContainer
          previewUrls={previewUrls}
          onDelete={handleDeleteFile}
          isUploading={storeIsUploading}
        />
      )}
    </div>
  );
}

export default ImageUploader;

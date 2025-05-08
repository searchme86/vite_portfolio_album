// useHandleFileUpload 훅: 파일 업로드 처리
// 의미: 파일 선택 및 업로드 로직 처리
// 이유: 사용자 파일 업로드 관리
import { useImageUploadStore } from '@/stores/imageUploadStore';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useHandleFilesChange from './useHandleFilesChange';

// fetchAuthParams: ImageKit 인증 파라미터 요청
// 의미: 인증 파라미터를 서버에서 가져옴
// 이유: 업로드에 필요한 인증 정보 제공
const fetchAuthParams = async (
  getToken: () => Promise<string | null>
): Promise<any> => {
  try {
    const token = await getToken();
    const safeApiUrl =
      typeof import.meta.env.VITE_API_URL === 'string'
        ? import.meta.env.VITE_API_URL
        : 'http://localhost:3000';
    const res = await axios.get(`${safeApiUrl}/posts/upload-auth`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error('Failed to fetch ImageKit auth params:', error);
    toast.error('Failed to fetch ImageKit authentication parameters');
    throw error;
  }
};

function useHandleFileUpload() {
  const { tempFiles, setTempFiles, setIsUploading, setProgress } =
    useImageUploadStore();
  const { handleFilesChange } = useHandleFilesChange();
  const auth = useAuth(); // 훅 호출은 최상위에서만
  const safeGetToken =
    typeof auth.getToken === 'function' ? auth.getToken : async () => null;

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    existingBaseFileNames: string[]
  ) => {
    const files = Array.from(e.target.files || []);
    const safeFiles = Array.isArray(files) ? files : [];
    const safeExistingFileNames = Array.isArray(existingBaseFileNames)
      ? existingBaseFileNames
      : [];

    const newFiles = safeFiles.filter(
      (file) => !safeExistingFileNames.includes(file.name)
    );
    if (newFiles.length === 0) {
      toast.error('서버에 있는 같은 사진은 바꿀 수 없어요');
      setIsUploading(false);
      handleFilesChange([], 0, false);
      return;
    }

    setTempFiles(newFiles);
    setIsUploading(true);
    toast.info('파일을 올리는 중이에요');
    setProgress(0);

    try {
      const authParams = await fetchAuthParams(safeGetToken);
      let uploadedFiles = 0;
      const newUploadedUrls: { url: string; isNew: boolean }[] = [];

      for (const file of newFiles) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('publicKey', import.meta.env.VITE_IK_PUBLIC_KEY || '');
        formData.append('folder', '/posts');
        formData.append('token', authParams.token || '');
        formData.append('signature', authParams.signature || '');
        formData.append('expire', authParams.expire || '');

        const res = await axios.post(
          'https://upload.imagekit.io/api/v1/files/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const loaded = Number.isFinite(progressEvent?.loaded)
                ? progressEvent.loaded
                : 0;
              // total이 undefined일 가능성을 제거하기 위해 명시적 기본값 설정
              const total = progressEvent?.total ?? 1; // nullish coalescing 연산자로 기본값 1 설정
              const progress =
                total > 0 ? Math.round((loaded * 100) / total) : 0;
              const overallProgress =
                newFiles.length > 0
                  ? Math.round(
                      (uploadedFiles / newFiles.length) * 100 * (progress / 100)
                    )
                  : 0;
              setProgress(overallProgress);
            },
          }
        );
        uploadedFiles++;
        newUploadedUrls.push({ url: res.data.url, isNew: true });
      }

      handleFilesChange(
        newUploadedUrls.map((img) => img.url),
        100,
        false
      );
      setIsUploading(false);
      setTimeout(() => {
        setTempFiles([]);
        setProgress(0);
        handleFilesChange(
          newUploadedUrls.map((img) => img.url),
          0,
          false
        );
      }, 1000);
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '알 수 없는 오류';
      toast.error('사진 업로드 중 에러가 발생했습니다: ' + errorMessage);
      setIsUploading(false);
      setProgress(0);
      handleFilesChange(
        tempFiles.map((file) => URL.createObjectURL(file)),
        0,
        false
      );
    }
  };

  return { handleFileUpload };
}

export default useHandleFileUpload;
//====여기까지 수정됨====

import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import { useImageUploadStore } from '@/stores/imageUploadStore';
import PreviewContainer from './parts/PreviewContainer';

interface ImageUrl {
  url: string;
  isNew: boolean;
}

interface ImageUploaderProps {
  postId: string;
  initialFiles?: File[];
  initialUrls?: string[];
  onFilesChange: (
    files: File[],
    urls: string[],
    progress: number,
    isUploading: boolean
  ) => void;
  buttonText?: string;
  existingBaseFileNames?: string[];
  minImages?: number;
}

function ImageUploader({
  postId,
  initialFiles = [],
  initialUrls = [],
  onFilesChange,
  buttonText,
  existingBaseFileNames = [],
  minImages = 1,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getToken } = useAuth();
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
  } = useImageUploadStore();
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    setPostId(postId);
    const urls = initialFiles.map((file) => URL.createObjectURL(file));
    setTempFiles(initialFiles);
    setImageUrls(initialUrls.map((url) => ({ url, isNew: true })));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [initialFiles, initialUrls, setImageUrls, setPostId, setTempFiles]);

  const fetchAuthParams = async (): Promise<any> => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/upload-auth`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    } catch (error) {
      console.error('ImageKit 인증 실패:', error);
      toast.error('ImageKit 인증 파라미터 가져오기 실패');
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = files;

    console.log(
      '업로드할 파일:',
      files.map((file) => file.name)
    );

    const duplicateFiles = newFiles.filter((file) => {
      const localFileName = file.name;
      console.log(
        '파일 이름 비교:',
        localFileName,
        '서버 파일 이름:',
        existingBaseFileNames
      );
      const isDuplicate = existingBaseFileNames.includes(localFileName);
      console.log('서버와 중복인가?:', isDuplicate);
      return isDuplicate;
    });

    if (duplicateFiles.length > 0) {
      console.log(
        '중복 파일 발견, 업로드 중지:',
        duplicateFiles.map((file) => file.name)
      );
      setUploadStatus('서버에 있는 같은 사진은 바꿀 수 없어요');
      setStoreIsUploading(false);
      setPreviewUrls([]);
      onFilesChange(
        [],
        imageUrls.map((img) => img.url),
        0,
        false
      );
      return;
    }
    console.log('중복 없음, 업로드 시작');

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previewUrls);
    setTempFiles(newFiles);
    setStoreIsUploading(true);
    setUploadStatus('파일을 올리는 중이에요');
    setProgress(0);

    const newUploadedUrls: ImageUrl[] = [];
    try {
      const authParams = await fetchAuthParams();
      const totalFiles = files.length;
      let uploadedFiles = 0;

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        formData.append('publicKey', import.meta.env.VITE_IK_PUBLIC_KEY);
        formData.append('folder', '/posts');
        formData.append('token', authParams.token);
        formData.append('signature', authParams.signature);
        formData.append('expire', authParams.expire);

        const res = await axios.post(
          'https://upload.imagekit.io/api/v1/files/upload',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
              const progress =
                progressEvent.total !== undefined
                  ? Math.round(
                      (progressEvent.loaded * 100) / progressEvent.total
                    )
                  : 0;
              uploadedFiles++;
              const overallProgress = Math.round(
                (uploadedFiles / totalFiles) * 100 * (progress / 100)
              );
              setProgress(overallProgress);
            },
          }
        );
        const imageUrl = res.data.url;
        newUploadedUrls.push({ url: imageUrl, isNew: true });
      }

      const updatedUrls = [...imageUrls, ...newUploadedUrls];
      setImageUrls(updatedUrls);
      setPreviewUrls(updatedUrls.map((img) => img.url));
      setUploadStatus('파일 올리기 완료!');
      setProgress(100);
      onFilesChange(
        newFiles,
        updatedUrls.map((img) => img.url),
        100,
        false
      );
      setStoreIsUploading(false);

      setTimeout(() => {
        setTempFiles([]);
        setProgress(0);
        setUploadStatus('');
        onFilesChange(
          [],
          updatedUrls.map((img) => img.url),
          0,
          false
        );
      }, 1000);
    } catch (error) {
      console.error('사진 업로드 실패:', error);
      toast.error('사진 업로드 실패');
      setUploadStatus('사진 업로드 중 에러 발생');
      setStoreIsUploading(false);
      setProgress(0);
      onFilesChange(
        newFiles,
        imageUrls.map((img) => img.url),
        0,
        false
      );
      return;
    }
  };

  const handleDeleteFile = (index: number) => {
    if (index < 0 || index >= imageUrls.length) return;
    if (imageUrls.length <= minImages) return;

    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
    // 삭제 후 previewUrls 업데이트
    // 의미: 삭제된 이미지를 미리보기에서도 제거
    // 이유: UI와 상태를 일치시키기 위해
    setPreviewUrls(newImageUrls.map((img) => img.url));
    onFilesChange(
      [],
      newImageUrls.map((img) => img.url),
      progress,
      storeIsUploading
    );
    setUploadStatus('');
  };

  const handleAddFileClick = () => {
    fileInputRef.current?.click();
  };

  // imageUrls를 PreviewContainer에 전달하기 위해 변환
  // 의미: imageUrls에서 URL만 추출하여 전달
  // 이유: PreviewContainer가 string[] 타입의 imageUrls를 기대함
  const imageUrlsForPreview = imageUrls.map((img) => img.url);

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
          imageUrls={imageUrlsForPreview}
          onDelete={handleDeleteFile}
          isUploading={storeIsUploading}
        />
      )}
    </div>
  );
}

export default ImageUploader;

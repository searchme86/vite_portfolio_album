import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import ImagePreview from '../ImagePreview/ImagePreview';
import { useAuth } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

function ImageUploader({
  postId,
  initialFiles = [],
  initialUrls = [],
  onFilesChange,
  buttonText,
  isUploading,
  setIsUploading,
  existingBaseFileNames = [],
}) {
  const fileInputRef = useRef(null);
  const { getToken } = useAuth();
  const [previewUrls, setPreviewUrls] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState(initialUrls);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const urls = initialFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [initialFiles]);

  const fetchAuthParams = async () => {
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
      console.error('Failed to fetch ImageKit auth params:', error);
      toast.error('Failed to fetch ImageKit authentication parameters');
      throw error;
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files;
    console.log(
      'Files selected for upload:',
      files.map((file) => file.name)
    );
    const duplicateFiles = newFiles.filter((file) => {
      const localFileName = file.name;
      console.log(
        'Comparing local file name:',
        localFileName,
        'with base server file names:',
        existingBaseFileNames
      );
      const isDuplicate = existingBaseFileNames.includes(localFileName);
      console.log('Is local file duplicate with server?:', isDuplicate);
      return isDuplicate;
    });

    if (duplicateFiles.length > 0) {
      console.log(
        'Duplicate files detected, upload blocked:',
        duplicateFiles.map((file) => file.name)
      );
      setUploadStatus('서버에 올려진 동일한 이미지를 업데이트 할 수 없습니다');
      setIsUploading(false);
      setPreviewUrls([]);
      onFilesChange([], uploadedUrls, 0, false);
      return;
    }
    console.log('No duplicates found, proceeding with upload');

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(newPreviewUrls);
    setIsUploading(true);
    setUploadStatus('파일이 업로드 중입니다');
    setUploadProgress(0);

    const newUploadedUrls = [];
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
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              uploadedFiles++;
              const overallProgress = Math.round(
                (uploadedFiles / totalFiles) * 100 * (progress / 100)
              );
              setUploadProgress(overallProgress);
            },
          }
        );
        const imageUrl = res.data.url;
        newUploadedUrls.push(imageUrl);
      }

      const updatedUrls = [...uploadedUrls, ...newUploadedUrls];
      setUploadedUrls(updatedUrls);
      setUploadStatus('파일이 완료되었습니다');
      setUploadProgress(100);
      onFilesChange(newFiles, updatedUrls, 100, false);
      setIsUploading(false);

      setTimeout(() => {
        setPreviewUrls([]);
        setUploadProgress(0);
        setUploadStatus('');
        onFilesChange([], updatedUrls, 0, false);
      }, 1000);
    } catch (error) {
      console.error('Failed to upload images:', error);
      toast.error('Failed to upload images');
      setUploadStatus('파일 업로드 중 에러가 발생했습니다');
      setIsUploading(false);
      setUploadProgress(0);
      onFilesChange(newFiles, uploadedUrls, 0, false);
      return;
    }
  };

  const handleDeleteFile = async (index) => {
    const newPreviewUrls = previewUrls.filter((_, i) => i !== index);
    const newUploadedUrls = uploadedUrls.filter((_, i) => i !== index);
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(newPreviewUrls);
    setUploadedUrls(newUploadedUrls);
    onFilesChange([], newUploadedUrls, uploadProgress, isUploading);
    setUploadStatus('');
  };

  const handleAddFileClick = () => {
    fileInputRef.current.click();
  };

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
          disabled={isUploading}
          className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isUploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          aria-label="Add or update images for the post"
          onKeyDown={(e) => e.key === 'Enter' && handleAddFileClick()}
        >
          {buttonText}
        </button>
      </div>
      {uploadStatus && (
        <p
          className={`text-sm ${
            uploadStatus ===
            '서버에 올려진 동일한 이미지를 업데이트 할 수 없습니다'
              ? 'text-red-500'
              : 'text-gray-600'
          }`}
        >
          {uploadStatus}
        </p>
      )}
      {previewUrls.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {previewUrls.map((url, index) => (
            <ImagePreview
              key={index}
              imageUrl={url}
              onDelete={() => handleDeleteFile(index)}
              isUploading={isUploading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;

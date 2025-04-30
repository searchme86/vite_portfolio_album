/**
 * @file PostWriteImageUploader.tsx
 * @description 이미지 업로드 관리 컴포넌트
 * @location src/Pages/Post/PostForm/parts/PostWriteImageUploader.tsx
 */
import ImageUploadManager from '@/components/handleImage/ImageUploadManager/ImageUploadManager'; // @type {Component} - 이미지 업로드 컴포넌트
// @description 이미지 업로드 및 관리
// @reason 이미지 업로드 UI

interface PostWriteImageUploaderProps {
  initialImageUrls: string[];
  onImageUrlsChange: (urls: string[]) => void;
}

function PostWriteImageUploader({
  initialImageUrls,
  onImageUrlsChange,
}: PostWriteImageUploaderProps) {
  return (
    <ImageUploadManager
      postId="temp" // @type {string} - 임시 포스트 ID
      // @description 임시 포스트 ID 설정
      // @reason 이미지 업로드 식별
      initialImageUrls={initialImageUrls} // @type {string[]} - 초기 이미지 URL
      // @description 초기 이미지 URL 설정
      // @reason 초기값 제공
      onImageUrlsChange={(urls) => {
        console.log('PostWriteImageUploader - Image URLs updated:', urls);
        // @description 이미지 URL 변경 로그
        // @reason 변경 확인
        onImageUrlsChange(urls || []); // 이미지 URL 업데이트
        // @description 이미지 URL 변경 콜백 호출
        // @reason 상위 컴포넌트 동기화
      }}
      progressBarColor="bg-blue-600" // @type {string} - 진행 바 색상
      // @description 진행 바 색상 설정
      // @reason UI 커스터마이징
      minImages={1} // @type {number} - 최소 이미지 수
      // @description 최소 이미지 수 설정
      // @reason 유효성 검사
      maxImages={10} // @type {number} - 최대 이미지 수
      // @description 최대 이미지 수 설정
      // @reason 유효성 검사
      showSlide={false} // @type {boolean} - 슬라이드 표시 여부
      // @description 슬라이드 표시 비활성화
      // @reason UI 단순화
    />
  );
}

export default PostWriteImageUploader;

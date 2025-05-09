/**
 * @file PostWriteImageUploader.tsx
 * @description 이미지 업로드 관리 컴포넌트
 * @location src/Pages/Post/PostForm/parts/PostWriteImageUploader.tsx
 */
import ImageUploaderMain from '@/components/handleImage/ImageUploaderMain';

// import ProgressBar from '@/components/handleImage/ProgressBar/ProgressBar';
// @description 이미지 업로드 및 관리
// @reason 이미지 업로드 UI

const safeShowSlide = false;
const safeProgressBarColor = 'bg-blue-600'; // @type {string} - 프로그래스바 색상
const postId = 'default-post-id'; // @type {string} - 포스트 ID

function PostWriteImageUploader() {
  return (
    <div className="mb-8">
      <h2 className="mb-2 text-lg font-semibold" role="heading">
        Images
      </h2>
      {/* <ProgressBar progressBarColor={safeProgressBarColor} /> */}
      <ImageUploaderMain postId={postId} />
    </div>
  );
}

export default PostWriteImageUploader;

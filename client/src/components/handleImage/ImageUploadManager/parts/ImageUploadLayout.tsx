// ImageUploadLayout 컴포넌트: 이미지 업로드 섹션의 전체 레이아웃 관리
// 단일 책임: 하위 컴포넌트 조합 및 레이아웃 구성
import ImageUploadHeader from './ImageUploadHeader';
import ImageDisplaySelector from './ImageDisplaySelector';
import ProgressBar from '../../ProgressBar/ProgressBar';
import ImageUploaderMain from '../../ImageUploaderWrapper/ImageUploaderMain';

interface ImageUploadLayoutProps {
  showSlide: boolean;
  progressBarColor: string;
  postId: string;
}

function ImageUploadLayout({
  showSlide,
  progressBarColor,
  postId,
}: ImageUploadLayoutProps) {
  const safeShowSlide = typeof showSlide === 'boolean' ? showSlide : false;
  // 타입: boolean - 안전한 슬라이드 표시 여부
  // 의미: 타입 오류 방지
  // 이유: 조건부 렌더링 안정성

  const safeProgressBarColor =
    typeof progressBarColor === 'string' ? progressBarColor : 'bg-blue-600';
  // 타입: string - 안전한 프로그래스바 색상
  // 의미: 클래스 이름 오류 방지
  // 이유: UI 일관성

  return (
    <div className="mb-8">
      <ImageUploadHeader />
      <ImageDisplaySelector showSlide={safeShowSlide} />
      <ProgressBar progressBarColor={safeProgressBarColor} />
      <div className="flex gap-4">
        <div className="flex-1">
          <ImageUploaderMain postId={postId} />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
  // 의미: 전체 레이아웃 구성
  // 이유: UI 구조화
}

export default ImageUploadLayout;
//====여기까지 수정됨====

// ImageUploadLayout 컴포넌트: 이미지 업로드 섹션의 전체 레이아웃 관리
// 단일 책임: 하위 컴포넌트 조합 및 레이아웃 구성
import ImageUploadHeader from './ImageUploadHeader';
import ImageDisplaySelector from './ImageDisplaySelector';
import ProgressBar from '../../ProgressBar/ProgressBar';
import ImageUploaderWrapper from '../../ImageUploaderWrapper/ImageUploaderWrapper';

function ImageUploadLayout({ showSlide, progressBarColor }) {
  // showSlide가 불리언인지 확인, 아니면 false로 대체
  // 조건부 렌더링 오류 방지
  const safeShowSlide = typeof showSlide === 'boolean' ? showSlide : false;
  // 디버깅: safeShowSlide 확인
  // 값이 올바르게 설정되었는지 확인
  console.log('ImageUploadLayout - safeShowSlide:', safeShowSlide);

  // progressBarColor가 문자열인지 확인, 아니면 기본값으로 대체
  // 클래스 이름 오류 방지
  const safeProgressBarColor =
    typeof progressBarColor === 'string' ? progressBarColor : 'bg-blue-600';
  // 디버깅: safeProgressBarColor 확인
  // 값이 올바르게 설정되었는지 확인
  console.log(
    'ImageUploadLayout - safeProgressBarColor:',
    safeProgressBarColor
  );

  // 디버깅: 컴포넌트 렌더링 확인
  // 컴포넌트가 올바르게 렌더링되었는지 확인
  console.log('ImageUploadLayout - Component rendered');

  return (
    // 전체 레이아웃 구성
    // div 태그로 감싸고 mb-8 클래스 적용
    <div className="mb-8">
      {/* 제목 표시 */}
      <ImageUploadHeader />
      {/* 이미지 미리보기 또는 슬라이드 표시 */}
      <ImageDisplaySelector showSlide={safeShowSlide} />
      {/* 프로그래스바 표시 */}
      <ProgressBar progressBarColor={safeProgressBarColor} />
      {/* 이미지 업로드 버튼 및 로직 */}
      <div className="flex gap-4">
        <div className="flex-1">
          <ImageUploaderWrapper />
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default ImageUploadLayout;

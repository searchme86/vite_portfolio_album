import ImagePreview from '../../ImagePreview/ImagePreview'; // @type {Component} - 이미지 미리보기 컴포넌트
// @description 한 장의 사진 미리보기 보여주는 친구
// @reason 사진 보이기

interface PreviewContainerProps {
  previewUrls: string[]; // @type {string[]} - 미리보기 URL 배열
  // @description 미리보기 주소 목록
  // @reason 보여줄 데이터
  onDelete: (index: number) => void; // @type {(index: number) => void} - 삭제 핸들러
  // @description 사진 지우는 버튼 함수
  // @reason 사용자 행동 처리
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
  // @description 지금 업로드 중인지 확인
  // @reason UI 조정
}

// PreviewContainer 컴포넌트 정의
function PreviewContainer({
  previewUrls,
  onDelete,
  isUploading,
}: PreviewContainerProps) {
  // previewUrls 값 확인을 위한 디버깅 로그
  console.log('PreviewContainer - previewUrls:', previewUrls); // @type {void} - 디버깅 로그
  // @description 주소 목록 확인
  // @reason 체크
  // @analogy 도서관 책 목록 점검

  // flex 컨테이너로 미리보기 이미지 목록 렌더링
  return (
    <div className="flex flex-wrap gap-4">
      {previewUrls.map((url, index) => (
        <ImagePreview
          key={index} // @type {string | number} - 고유 키
          // @description 각 사진에 고유 번호 붙이기
          // @reason React 규칙
          imageUrl={url} // @type {string} - 이미지 URL
          // @description 사진 주소
          // @reason 보여주기
          onDelete={() => onDelete(index)} // @type {() => void} - 삭제 이벤트
          // @description 지우기 버튼 작동
          // @reason 사용자 행동
          isUploading={isUploading} // @type {boolean} - 업로드 상태
          // @description 업로드 중인지 알려주기
          // @reason UI 조정
        />
      ))}
    </div>
  );
}

// 컴포넌트 내보내기
export default PreviewContainer;

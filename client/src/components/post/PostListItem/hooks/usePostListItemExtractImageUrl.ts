/**
 * @file usePostListItemExtractImageUrl.js
 * @description PostListItem 전용 이미지 URL 추출 훅
 * @reason 포스트 데이터에서 이미지 URL 추출
 * @analogy 도서관에서 책 표지 URL을 추출하는 도구
 * @param {Object} params - 훅 매개변수
 * @param {Object} params.post - 포스트 데이터
 * @returns {string | null} - 이미지 URL
 */
export const usePostListItemExtractImageUrl = ({ post }) => {
  console.log('usePostListItemExtractImageUrl - post._doc:', post?._doc); // @description post._doc 데이터 로깅
  // @reason 디버깅, 데이터 구조 확인
  // @analogy 도서관에서 책 안쪽 페이지 정보 확인 기록

  const imageUrl = post?._doc?.img?.length > 0 ? post._doc.img[0] : null; // @type {string | null} - 이미지 URL
  // @description _doc 안의 img 필드에서 URL 추출
  // @reason Mongoose 문서 구조에 맞게 img 접근, 없으면 null로 설정해 대체 UI 표시
  // @analogy 도서관에서 책 안쪽 페이지에서 표지 사진 확인, 없으면 대체 표지 표시

  return imageUrl; // @description 이미지 URL 반환
  // @reason PostListItem에서 사용
  // @analogy 도서관에서 책 표지 URL 반환
};

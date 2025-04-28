/**
 * @file usePostListItemExtractPostId.js
 * @description PostListItem 전용 포스트 ID 추출 훅
 * @reason 포스트 ID를 Mongoose 문서 구조에서 추출
 * @analogy 도서관에서 책 번호를 추출하는 도구
 * @param {Object} params - 훅 매개변수
 * @param {Object} params.post - 포스트 데이터
 * @returns {string} - 포스트 ID
 */
export const usePostListItemExtractPostId = ({ post }) => {
  const postId = post?._doc?._id || post?._id || 'unknown-post-id'; // @type {string} - 포스트 ID
  // @description 포스트 ID를 Mongoose Document 구조를 고려하여 추출
  // @reason post._id가 아닌 post._doc._id에 실제 ID가 있을 수 있음, Mongoose Document의 특성 반영
  // @analogy 도서관에서 책 번호가 책 표지가 아닌 책 안쪽 페이지에 있을 때 안쪽 페이지를 확인

  console.log('usePostListItemExtractPostId - Extracted postId:', postId); // @description 추출된 postId 로깅
  // @reason 디버깅
  // @analogy 도서관에서 책 번호 확인 기록

  return postId; // @description 포스트 ID 반환
  // @reason PostListItem에서 사용
  // @analogy 도서관에서 책 번호 반환
};

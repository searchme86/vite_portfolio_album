import LikeButton from '../../../Like/LikeButton/LikeButton'; // @type {Function} - 좋아요 버튼 컴포넌트
// @description 좋아요 버튼 컴포넌트 가져오기
// @reason 포스트에 좋아요 기능 추가
// @analogy 도서관에서 책에 좋아요 버튼 추가

import LikeCount from '../../../Like/LikeCount/LikeCount'; // @type {Function} - 좋아요 수 표시 컴포넌트
// @description 좋아요 수 표시 컴포넌트 가져오기
// @reason 포스트의 좋아요 수 표시
// @analogy 도서관에서 책의 좋아요 수 표시

/**
 * @file PostListItemActions.jsx
 * @description PostListItem의 액션 컴포넌트
 * @reason 좋아요 버튼과 수를 렌더링
 * @analogy 도서관에서 좋아요 버튼과 수를 표시하는 조각
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.postId - 포스트 ID
 * @param {Function} props.invalidate - 캐시 무효화 함수
 * @returns {JSX.Element} - 액션 컴포넌트
 */
function PostListItemActions({ postId, invalidate }) {
  return (
    <div
      style={{
        display: 'flex', // @description 플렉스 박스 레이아웃
        // @reason 좋아요 버튼과 수를 가로로 정렬
        // @analogy 도서관에서 버튼과 숫자를 나란히 배치
        gap: '10px', // @description 요소 간 간격 설정
        // @reason 시각적 여백 확보
        // @analogy 도서관에서 버튼과 숫자 간 간격 조정
        alignItems: 'center', // @description 세로 중앙 정렬
        // @reason 깔끔한 정렬
        // @analogy 도서관에서 버튼과 숫자 세로 정렬
      }}
    >
      <LikeButton
        postId={postId}
        invalidate={invalidate} // @description 캐시 무효화 함수 전달
        // @reason 좋아요 토글 후 캐시 갱신, useLikeStore에서 처리하도록 전달
        // @analogy 도서관에서 대여 상태 변경 후 게시판 갱신
      />
      <LikeCount postId={postId} />
    </div>
  );
}

export default PostListItemActions; // @description PostListItemActions 컴포넌트 내보내기
// @reason PostListItem에서 사용 가능하도록
// @analogy 도서관에서 액션 컴포넌트 공유

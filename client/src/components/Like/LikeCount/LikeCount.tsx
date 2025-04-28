import useLikeStore from '../../../stores/like/likeStore'; // @type {Object} - 좋아요 Zustand 스토어
// @description 좋아요 Zustand 스토어 가져오기
// @reason 좋아요 수 관리
// @analogy 도서관에서 대여 장부 관리 시스템 가져오기

/**
 * @file LikeCount.jsx
 * @description 좋아요 수 표시 컴포넌트
 * @reason 포스트의 좋아요 수를 표시
 * @analogy 도서관에서 책의 대여 횟수 표시
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.postId - 포스트 ID
 */
function LikeCount({ postId }) {
  const likeCounts = useLikeStore((state) => state.getLikeCounts()); // @type {{ [entityId: string]: number }} - 좋아요 수
  // @description 좋아요 수 가져오기
  // @reason 포스트별 좋아요 수 확인
  // @analogy 도서관에서 책별 대여 횟수 확인

  const count = likeCounts[postId] || 0; // @type {number} - 포스트의 좋아요 수
  // @description 포스트의 좋아요 수 추출
  // @reason 렌더링에 사용
  // @analogy 도서관에서 특정 책의 대여 횟수 확인

  // <!---여기추가
  console.log(
    'LikeCount - likeCounts:',
    likeCounts,
    'count for postId:',
    postId,
    'is:',
    count
  ); // @description 좋아요 수와 특정 postId의 count 로깅
  // @reason 디버깅, 값 확인
  // @analogy 도서관에서 대여 횟수와 특정 책의 횟수 확인 기록

  return <span>{count}</span>; // @description 좋아요 수 렌더링
  // @reason 사용자에게 표시
  // @analogy 도서관에서 손님에게 대여 횟수 표시
}

export default LikeCount; // @description 컴포넌트 내보내기
// @reason 다른 파일에서 사용 가능하도록
// @analogy 도서관에서 대여 횟수 컴포넌트 공유

/**
 * @file PostListLoading.jsx
 * @description PostList의 로딩 UI 컴포넌트
 * @reason 로딩 상태 또는 데이터 없음 메시지 표시
 * @analogy 도서관에서 책 목록 준비 중임을 알림
 * @param {Object} props - 컴포넌트 props
 * @param {boolean} props.isLoaded - Clerk 로딩 상태
 * @param {{ pages: Array<Array>, pageParams: Array<number> } | null} props.postsData - 포스트 데이터
 * @param {Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>} props.flattenedPosts - 병합된 포스트 배열
 * @returns {JSX.Element | null} - 로딩 UI 컴포넌트
 */
function PostListLoading({ isLoaded, postsData, flattenedPosts }) {
  if (!isLoaded || !postsData) {
    return <div>로딩 중...</div>; // @description 로딩 상태 표시
    // @reason 데이터 로드 전 UI 표시
    // @analogy 도서관에서 책 목록 준비 중임을 알림
  }

  if (flattenedPosts.length === 0) {
    return <div>포스트가 없습니다.</div>; // @description 포스트 없음 표시
    // @reason 데이터 없음을 사용자에게 알림
    // @analogy 도서관에서 책이 없음을 손님에게 알림
  }

  return null; // @description 데이터가 있으면 null 반환
  // @reason 불필요한 렌더링 방지
  // @analogy 도서관에서 책이 있으면 로딩 UI 표시 안 함
}

export default PostListLoading; // @description PostListLoading 컴포넌트 내보내기
// @reason PostList에서 사용 가능하도록
// @analogy 도서관에서 로딩 UI 컴포넌트 공유

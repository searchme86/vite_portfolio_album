/**
 * @file PostListItemContent.jsx
 * @description PostListItem의 콘텐츠 컴포넌트
 * @reason 포스트 제목과 내용을 렌더링
 * @analogy 도서관에서 책 제목과 내용을 표시하는 조각
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.post - 포스트 데이터
 * @param {string} props.postId - 포스트 ID
 * @returns {JSX.Element} - 콘텐츠 컴포넌트
 */
function PostListItemContent({ post, postId }) {
  return (
    <>
      <h2 id={`post-title-${postId}`}>
        {post?._doc?.title || post?.title || '제목 없음'}{' '}
        {/* @description 제목을 _doc에서 추출 */}
        {/* @reason Mongoose 문서 구조에 맞게 title 접근 */}
        {/* @analogy 도서관에서 책 제목을 안쪽 페이지에서 확인 */}
      </h2>
      <p>
        {post?._doc?.content || post?.content || '내용 없음'}{' '}
        {/* @description 내용을 _doc에서 추출 */}
        {/* @reason Mongoose 문서 구조에 맞게 content 접근 */}
        {/* @analogy 도서관에서 책 내용을 안쪽 페이지에서 확인 */}
      </p>
    </>
  );
}

export default PostListItemContent; // @description PostListItemContent 컴포넌트 내보내기
// @reason PostListItem에서 사용 가능하도록
// @analogy 도서관에서 책 콘텐츠 컴포넌트 공유

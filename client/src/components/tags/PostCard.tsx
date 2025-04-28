// frontend/components/postCard/PostCard.jsx
import { Link } from 'react-router-dom'; // 1. Link 컴포넌트 임포트
// 2. 포스트 상세 페이지로 이동

// 1. 포스트를 카드 형태로 렌더링하는 컴포넌트
// 2. 뷰 타입에 따라 스타일 변경
function PostCard({ post, viewType }) {
  const imageSizeClass = viewType === 'list' ? 'w-24 h-24' : 'w-48 h-48'; // 1. 뷰 타입에 따라 이미지 크기 설정
  // 2. 리스트 뷰는 작은 이미지, 그리드 뷰는 큰 이미지

  return (
    <div
      className={`flex ${
        viewType === 'list' ? 'flex-row items-center' : 'flex-col'
      } border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
    >
      {/* 1. 포스트 이미지 표시 */}
      {/* 2. 뷰 타입에 따라 크기 조정 */}
      {post.img && post.img.length > 0 && (
        <img
          src={post.img[0]}
          alt={post.title}
          className={`${imageSizeClass} object-cover rounded-md mr-4`}
        />
      )}
      <div className="flex-1">
        {/* 1. 포스트 제목 표시 */}
        {/* 2. 제목 클릭 시 포스트 상세 페이지로 이동 */}
        <Link to={`/posts/${post.slug}`}>
          <h2 className="text-lg font-semibold hover:underline">
            {post.title}
          </h2>
        </Link>
        {/* 1. 포스트 작성자 표시 */}
        {/* 2. 작성자 정보 표시 */}
        <p className="text-sm text-gray-500">By {post.user?.username}</p>
        {/* 1. 포스트 내용 일부 표시 */}
        {/* 2. 내용 미리보기 제공 */}
        <p className="mt-2 text-gray-700 line-clamp-2">{post.content}</p>
      </div>
    </div>
  );
}

export default PostCard; // 1. PostCard 컴포넌트 내보내기
// 2. 다른 컴포넌트에서 사용

// frontend/routes/TagPostsPage.jsx
import { useState, useEffect } from 'react'; // 1. React 훅 임포트
// 2. 상태 및 사이드 이펙트 관리
import { useParams } from 'react-router-dom'; // 1. useParams 훅 임포트
// 2. URL 파라미터 추출
import { useFetchPostsByTagQuery } from './hook/useTagQueries.js';
import PostCard from './PostCard.js';

function TagPostsPage() {
  const { tagName } = useParams(); // 1. URL 파라미터에서 태그 이름 추출
  // 2. /tags/:tagName에서 tagName(예: apple) 가져오기
  const [page, setPage] = useState(1); // 1. 페이지 상태 설정
  // 2. 페이지네이션 관리
  const [viewType, setViewType] = useState('grid'); // 1. 뷰 타입 상태 설정 (기본값: 그리드)
  // 2. 리스트/그리드 뷰 전환

  // 1. 태그별 포스트 데이터를 가져오는 쿼리
  // 2. React Query로 데이터 페칭 관리
  const { data, isLoading, error } = useFetchPostsByTagQuery(tagName, page);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 1. 페이지 변경 시 상단으로 스크롤
    // 2. 사용자 경험 개선
  }, [page]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        {/* 1. 페이지 제목 표시 */}
        {/* 2. 현재 태그 이름 표시 */}
        <h1 className="text-xl font-semibold md:text-3xl xl:text-4xl 2xl:text-5xl">
          Posts tagged with #{tagName}
        </h1>
        {/* 1. 뷰 타입 전환 버튼 */}
        {/* 2. 리스트/그리드 뷰 토글 */}
        <button
          onClick={() => setViewType(viewType === 'grid' ? 'list' : 'grid')}
          className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          {viewType === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
        </button>
      </div>
      <div
        className={`${
          viewType === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            : 'flex flex-col gap-4'
        }`}
      >
        {/* 1. 로딩 상태 표시 */}
        {/* 2. 사용자 피드백 제공 */}
        {isLoading && <div>Loading...</div>}
        {/* 1. 에러 상태 표시 */}
        {/* 2. 사용자 피드백 제공 */}
        {error && (
          <div className="text-red-500">
            Failed to load posts: {error.message}
          </div>
        )}
        {/* 1. 포스트 리스트 렌더링 */}
        {/* 2. 뷰 타입에 따라 스타일 변경 */}
        {data && data.posts && data.posts.length > 0 ? (
          data.posts.map((post) => (
            <PostCard key={post._id} post={post} viewType={viewType} />
          ))
        ) : (
          <div className="text-gray-500">No posts found for #{tagName}.</div>
        )}
      </div>
      {/* 1. 더보기 버튼 표시 */}
      {/* 2. 추가 포스트 로드 */}
      {data && data.hasMore && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default TagPostsPage; // 1. TagPostsPage 컴포넌트 내보내기
// 2. 라우터에서 사용

// frontend/components/tag/TagList.jsx
import { Link } from 'react-router-dom'; // 1. Link 컴포넌트 임포트
// 2. 태그별 포스트 페이지로 이동
import { useFetchAllTagsQuery } from './hook/useTagQueries.js'; // 1. 고유 태그 쿼리 훅 임포트
// 2. 데이터 페칭

// 1. 중복 없는 태그 리스트를 렌더링하는 컴포넌트
// 2. 태그를 클릭하면 태그별 포스트 페이지로 이동
function TagList() {
  // 1. 고유 태그 데이터를 가져오는 쿼리
  // 2. React Query로 데이터 페칭 관리
  const { data: tags, isLoading, error } = useFetchAllTagsQuery();

  return (
    <div className="mb-8">
      <h2 className="mb-4 text-lg font-semibold">Tags</h2>
      {/* 1. 로딩 상태 표시 */}
      {/* 2. 사용자 피드백 제공 */}
      {isLoading && <div>Loading tags...</div>}
      {/* 1. 에러 상태 표시 */}
      {/* 2. 사용자 피드백 제공 */}
      {error && (
        <div className="text-red-500">Failed to load tags: {error.message}</div>
      )}
      {/* 1. 태그 리스트 렌더링 */}
      {/* 2. 태그가 없으면 메시지 표시 */}
      {tags && tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag}>
              {/* 1. 태그를 링크로 렌더링 */}
              {/* 2. 태그별 포스트 페이지로 이동 */}
              <Link
                to={`/tags/${tag}`}
                role="button"
                className="px-3 py-1 text-sm text-gray-700 transition-colors bg-gray-200 rounded-full hover:bg-gray-300"
              >
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">No tags available</div>
      )}
    </div>
  );
}

export default TagList; // 1. TagList 컴포넌트 내보내기
// 2. 다른 컴포넌트에서 사용

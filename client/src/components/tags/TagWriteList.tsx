// src/components/TagWriteList.jsx
import { useFetchTags, useDeleteTag } from '../../api/tags/useTagQueries.js';

function TagWriteList({ postId, tempTags, onDeleteTag }) {
  const { data: tags, isLoading, error } = useFetchTags(postId); // 1. 태그 조회 훅 사용
  // 2. postId로 태그 목록 가져오기
  const { mutate: deleteTag } = useDeleteTag(); // 1. 태그 삭제 훅 사용
  // 2. 태그 삭제 API 호출

  // 1. 표시할 태그 목록 결정
  // 2. postId가 없으면 tempTags 사용
  const displayTags = tempTags || tags;

  if (!displayTags) return null; // 1. 태그가 없으면 아무것도 렌더링하지 않음
  // 2. 초기 상태에서 불필요한 UI 방지
  if (isLoading && !tempTags) return <div>Loading tags...</div>; // 1. 로딩 상태 표시
  // 2. 데이터 로딩 중 UI
  if (error && !tempTags) return <div>Error loading tags</div>; // 1. 에러 상태 표시
  // 2. 데이터 로딩 실패 시 UI

  return (
    <div className="flex flex-wrap gap-2">
      {displayTags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 p-2 bg-gray-200 rounded"
        >
          <span>{tag}</span> {/* 1. 태그 이름 표시 */}
          {/* 2. 태그를 시각적으로 보여줌 */}
          <button
            type="button"
            onClick={() =>
              onDeleteTag
                ? onDeleteTag(tag)
                : postId && postId !== 'null'
                ? deleteTag({ postId, tag })
                : null
            }
            className="text-red-500"
          >
            x
          </button>{' '}
          {/* 1. 태그 삭제 버튼 */}
          {/* 2. 태그 삭제 동작 트리거 */}
        </div>
      ))}
    </div>
  );
}

export default TagWriteList;

// src/components/TagInput.jsx
import { useAddTag } from '../../api/tags/useTagQueries.js';
import { useTagInputState } from '../../hooks/useTagInputState.js';

function TagInput({ postId, onAddTag }) {
  const { tagInput, handleTagInputChange, resetTagInput } = useTagInputState(); // 1. 태그 입력 상태 훅 사용
  // 2. 입력값과 관련 로직 가져오기
  const { mutate: addTag } = useAddTag(); // 1. 태그 추가 훅 사용
  // 2. 태그 추가 API 호출

  // 1. 태그 추가 핸들러
  // 2. 입력된 태그를 서버에 추가하거나 임시 태그로 처리
  const handleAddTag = () => {
    if (tagInput.trim()) {
      if (onAddTag) {
        onAddTag(tagInput.trim()); // 1. 임시 태그 추가
        // 2. Write.jsx에서 전달된 핸들러 호출
      } else if (postId && postId !== 'null') {
        addTag({ postId, tag: tagInput.trim() }); // 1. 서버에 태그 추가 요청
        // 2. postId가 유효할 때만 요청
      } else {
        console.log('Cannot add tag: postId is invalid'); // 1. 디버깅용 로그
        // 2. postId가 유효하지 않을 경우 로그 출력
        return;
      }
      resetTagInput(); // 1. 입력값 초기화
      // 2. 태그 추가 후 입력 필드 비우기
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange}
        placeholder="Add a tag"
        className="p-2 border rounded"
      />{' '}
      {/* 1. 태그 입력 필드 */}
      {/* 2. 사용자가 태그를 입력하는 UI */}
      <button
        type="button"
        onClick={handleAddTag}
        className="p-2 text-white bg-blue-500 rounded"
      >
        Add Tag
      </button>{' '}
      {/* 1. 태그 추가 버튼 */}
      {/* 2. 태그 추가 동작 트리거 */}
    </div>
  );
}

export default TagInput;

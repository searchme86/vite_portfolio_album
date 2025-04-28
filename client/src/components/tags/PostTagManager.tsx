// src/components/PostTagManager.jsx
import TagInput from './TagInput.js';
import TagWriteList from './TagWriteList.js';

function PostTagManager({ postId, tempTags, onAddTag, onDeleteTag }) {
  // 1. postId가 없으면 임시 태그 사용 여부 확인
  // 2. Write.jsx에서 임시 태그를 사용할 수 있도록 설정
  const isTempMode = postId === null || postId === 'null';

  // 1. postId가 유효하지 않으면 태그 관리 UI를 렌더링하지 않음
  // 2. 불필요한 요청 방지
  if (!isTempMode && !postId) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tags</h3> {/* 1. 태그 섹션 제목 */}
      {/* 2. UI에서 태그 섹션 구분 */}
      <TagInput
        postId={isTempMode ? null : postId} // 1. 임시 모드일 경우 postId를 null로 설정
        // 2. 태그 추가 로직 연결
        onAddTag={isTempMode ? onAddTag : undefined} // 1. 임시 모드일 경우 onAddTag 전달
        // 2. 태그 추가 로직 연결
      />
      <TagWriteList
        postId={isTempMode ? null : postId} // 1. 임시 모드일 경우 postId를 null로 설정
        // 2. 태그 조회 로직 연결
        tempTags={isTempMode ? tempTags : undefined} // 1. 임시 모드일 경우 tempTags 전달
        // 2. 임시 태그 표시
        onDeleteTag={isTempMode ? onDeleteTag : undefined} // 1. 임시 모드일 경우 onDeleteTag 전달
        // 2. 태그 삭제 로직 연결
      />
    </div>
  );
}

export default PostTagManager;

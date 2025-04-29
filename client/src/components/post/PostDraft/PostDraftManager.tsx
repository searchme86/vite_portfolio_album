/**
 * @file PostDraftManager.tsx
 * @description 드래프트 관리 하위 컴포넌트들을 통합하는 컴포넌트
 * @reason 자동저장, 임시저장, 불러오기 기능을 하나의 UI로 통합하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록 관리 창구를 하나로 통합하여 관리
 */

import PostAutoSave from './PostAutoSave/PostAutoSave'; // @type {Function} - 자동저장 컴포넌트
// @description 자동저장 컴포넌트 가져오기
// @reason 자동저장 기능 통합
// @analogy 도서관에서 자동 기록 시스템 연결

import PostTemporarySave from './PostTemporarySave/PostTemporarySave'; // @type {Function} - 임시저장 컴포넌트
// @description 임시저장 컴포넌트 가져오기
// @reason 임시저장 기능 통합
// @analogy 도서관에서 임시 저장 시스템 연결

import PostFetchDraft from './PostFetchDraft/PostFetchDraft'; // @type {Function} - 불러오기 컴포넌트
// @description 불러오기 컴포넌트 가져오기
// @reason 불러오기 기능 통합
// @analogy 도서관에서 기록 불러오기 시스템 연결

// 드래프트 관리 컴포넌트 정의
// @description 자동저장, 임시저장, 불러오기 컴포넌트를 통합
// @reason 드래프트 관리 UI를 중앙에서 관리
// @analogy 도서관에서 대여 기록 관리 창구 역할
function PostDraftManager() {
  return (
    <div className="post-draft-manager">
      {/* @description 드래프트 관리 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h2>드래프트 관리</h2>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <PostAutoSave />
      {/* @description 자동저장 컴포넌트 렌더링 */}
      {/* @reason 자동저장 기능 제공 */}
      <PostTemporarySave />
      {/* @description 임시저장 컴포넌트 렌더링 */}
      {/* @reason 임시저장 기능 제공 */}
      <PostFetchDraft />
      {/* @description 불러오기 컴포넌트 렌더링 */}
      {/* @reason 불러오기 기능 제공 */}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 드래프트 관리 UI 사용 가능
// @analogy 도서관에서 대여 기록 관리 창구를 공유
export default PostDraftManager;

// **작동 매커니즘**
// 1. `PostAutoSave`, `PostTemporarySave`, `PostFetchDraft` 컴포넌트 임포트.
// 2. `div.post-draft-manager`로 컴포넌트들을 감싸 UI 구성.
// 3. 각 하위 컴포넌트를 순차적으로 렌더링하여 자동저장, 임시저장, 불러오기 기능 제공.
// 4. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 5. 상위 컴포넌트에서 `PostDraftManager`를 사용하여 드래프트 관리 UI 통합.
// @reason 드래프트 관리 기능을 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 대여 기록 관리 창구를 통해 모든 기능을 통합.

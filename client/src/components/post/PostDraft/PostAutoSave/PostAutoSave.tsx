/**
 * @file PostAutoSave.tsx
 * @description 드래프트 데이터를 주기적으로 자동저장하고 알림 UI를 표시하는 컴포넌트
 * @reason 자동저장 기능과 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록을 주기적으로 자동 저장하고 사용자에게 알리는 시스템
 */

import useAutoSave from './hooks/useAutoSave'; // @type {Function} - 자동저장 훅
// @description 자동저장 훅 가져오기
// @reason 드래프트 데이터 자동저장 로직 사용
// @analogy 도서관에서 자동 저장 시스템 연결

import AutoSaveNotification from './parts/AutoSaveNotification'; // @type {Function} - 알림 UI 컴포넌트
// @description 자동저장 알림 UI 컴포넌트 가져오기
// @reason 저장 상태를 사용자에게 알림
// @analogy 도서관에서 사용자에게 저장 완료 메시지 표시

import useDraftStore from '../../../../stores/draft/draftStore';
import type { DraftState } from '../../../../stores/draft/initialDraftState';

// 자동저장 컴포넌트 정의
// @description 드래프트 데이터를 자동저장하고 알림 UI 표시
// @reason 자동저장 기능과 사용자 피드백 제공
// @analogy 도서관에서 대여 기록을 자동 저장하고 사용자에게 알림
function PostAutoSave() {
  // Zustand 스토어에서 드래프트 데이터 가져오기
  // @description 스토어에서 현재 드래프트 데이터 추출
  // @reason 자동저장할 데이터 준비
  const draft = useDraftStore((state: DraftState) => ({
    postTitle: state.postTitle || '', // @type {string} - Fallback: 빈 문자열
    postDesc: state.postDesc || '', // @type {string} - Fallback: 빈 문자열
    postContent: state.postContent || '', // @type {string} - Fallback: 빈 문자열
    tags: state.tags || [], // @type {string[]} - Fallback: 빈 배열
    imageUrls: state.imageUrls || [], // @type {string[]} - Fallback: 빈 배열
    custom: state.custom || {}, // @type {Object} - Fallback: 빈 객체
    draftId: state.draftId || '', // @type {string} - Fallback: 빈 문자열
    createdAt: state.createdAt || new Date(), // @type {Date} - Fallback: 현재 날짜
    updatedAt: state.updatedAt || new Date(), // @type {Date} - Fallback: 현재 날짜
    isTemporary: state.isTemporary || false, // @type {boolean} - Fallback: false
    updateDraft: state.updateDraft, // @type {Function} - 드래프트 업데이트 함수
  })); // @description 드래프트 데이터 객체 생성
  // @reason 자동저장 시 사용할 데이터 준비
  // @analogy 도서관에서 대여 기록 정보를 수집

  // 자동저장 훅 사용
  // @description 자동저장 로직 실행
  // @reason 드래프트 데이터를 주기적으로 저장
  const { isSaving, lastSaved } = useAutoSave(draft); // @type {Object} - 자동저장 상태
  // @description 자동저장 훅에서 저장 상태와 마지막 저장 시간 가져오기
  // @reason UI 업데이트 및 사용자 피드백 제공

  return (
    <div className="post-auto-save">
      {/* @description 자동저장 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h3>자동저장</h3>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <AutoSaveNotification
        isSaving={isSaving} // @type {boolean} - 저장 중 여부
        lastSaved={lastSaved} // @type {Date | null} - 마지막 저장 시간
      />
      {/* @description 자동저장 알림 UI 렌더링 */}
      {/* @reason 사용자에게 저장 상태 알림 */}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 자동저장 기능 사용 가능
// @analogy 도서관에서 자동 저장 시스템을 공유
export default PostAutoSave;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useDraftStore` 훅 호출: Zustand 스토어에서 드래프트 데이터 가져옴.
// 3. `useAutoSave` 훅 호출: 드래프트 데이터를 주기적으로 자동저장.
// 4. `AutoSaveNotification` 컴포넌트 렌더링: 저장 상태 표시.
// 5. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 6. 상위 컴포넌트에서 `PostAutoSave`를 사용하여 자동저장 기능 통합.
// @reason 자동저장 기능과 사용자 피드백을 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 대여 기록을 자동 저장하고 사용자에게 알리는 시스템.

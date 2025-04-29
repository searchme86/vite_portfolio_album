/**
 * @file PostTemporarySave.tsx
 * @description 드래프트 데이터를 임시저장하고 버튼 UI를 표시하는 컴포넌트
 * @reason 임시저장 기능과 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록을 임시로 저장하고 사용자에게 버튼으로 알리는 시스템
 */

import useTemporarySave from './hooks/useTemporarySave'; // @type {Function} - 임시저장 훅
// @description 임시저장 훅 가져오기
// @reason 드래프트 데이터 임시저장 로직 사용
// @analogy 도서관에서 임시 저장 시스템 연결

import DraftSaveButton from './parts/DraftSaveButton'; // @type {Function} - 버튼 UI 컴포넌트
// @description 임시저장 버튼 UI 컴포넌트 가져오기
// @reason 사용자에게 임시저장 버튼 제공
// @analogy 도서관에서 사용자에게 임시 저장 버튼 표시

import useDraftStore from '../../../stores/draft/draftStore'; // @type {Object} - Zustand 스토어
// @description Zustand 스토어 가져오기
// @reason 드래프트 데이터 상태 관리 및 가져오기
// @analogy 도서관에서 중앙 대여 기록 시스템에 접근

// 드래프트 데이터 타입 정의 (draftStore.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 대여 기록부의 형식을 미리 정의
interface DraftState {
  postTitle: string;
  postDesc: string;
  postContent: string;
  tags: string[];
  imageUrls: string[];
  custom: { [key: string]: any };
  draftId: string;
  createdAt: Date;
  updatedAt: Date;
  isTemporary: boolean;
  updateDraft: (draft: DraftState) => void;
}

// 임시저장 컴포넌트 정의
// @description 드래프트 데이터를 임시저장하고 버튼 UI 표시
// @reason 임시저장 기능과 사용자 피드백 제공
// @analogy 도서관에서 대여 기록을 임시 저장하고 버튼으로 알림
function PostTemporarySave() {
  // Zustand 스토어에서 드래프트 데이터 가져오기
  // @description 스토어에서 현재 드래프트 데이터 추출
  // @reason 임시저장할 데이터 준비
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
  // @reason 임시저장 시 사용할 데이터 준비
  // @analogy 도서관에서 대여 기록 정보를 수집

  // 임시저장 훅 사용
  // @description 임시저장 로직 실행
  // @reason 드래프트 데이터를 수동으로 저장
  const { saveDraft, isSaving } = useTemporarySave(); // @type {Object} - 임시저장 함수와 상태
  // @description 임시저장 훅에서 저장 함수와 상태 가져오기
  // @reason UI 업데이트 및 사용자 피드백 제공

  // 저장 버튼 클릭 핸들러
  // @description 임시저장 실행
  // @reason 사용자 요청에 따라 드래프트 저장
  const handleSave = () => {
    saveDraft(draft); // @description 드래프트 데이터 저장 호출
    // @reason 사용자 요청에 따라 임시저장 실행
    // @analogy 도서관에서 사용자가 버튼을 눌러 기록 저장
  };

  return (
    <div className="post-temporary-save">
      {/* @description 임시저장 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h3>임시저장</h3>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <DraftSaveButton
        onSave={handleSave} // @type {Function} - 저장 핸들러
        isSaving={isSaving} // @type {boolean} - 저장 중 여부
      />
      {/* @description 임시저장 버튼 UI 렌더링 */}
      {/* @reason 사용자에게 저장 버튼 제공 */}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 임시저장 기능 사용 가능
// @analogy 도서관에서 임시 저장 시스템을 공유
export default PostTemporarySave;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useDraftStore` 훅 호출: Zustand 스토어에서 드래프트 데이터 가져옴.
// 3. `useTemporarySave` 훅 호출: 임시저장 로직 실행 준비.
// 4. `handleSave` 함수 정의: 사용자 요청 시 `saveDraft` 호출.
// 5. `DraftSaveButton` 컴포넌트 렌더링: 저장 버튼과 상태 표시.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 7. 상위 컴포넌트에서 `PostTemporarySave`를 사용하여 임시저장 기능 통합.
// @reason 임시저장 기능과 사용자 피드백을 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 대여 기록을 임시 저장하고 버튼으로 알림.

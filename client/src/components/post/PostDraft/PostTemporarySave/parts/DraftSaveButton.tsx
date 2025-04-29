/**
 * @file DraftSaveButton.tsx
 * @description 임시저장을 위한 토글 버튼 UI 컴포넌트
 * @reason 임시저장 버튼 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록 저장을 위한 버튼을 별도로 제공
 */

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface DraftSaveButtonProps {
  onSave: () => void; // @type {Function} - 저장 핸들러
  isSaving: boolean; // @type {boolean} - 저장 중 여부
}

// 토글 버튼 UI 컴포넌트 정의
// @description 임시저장 버튼 UI 제공
// @reason 사용자에게 저장 버튼 제공
// @analogy 도서관에서 저장 버튼을 통해 기록 저장 요청
function DraftSaveButton({ onSave, isSaving }: DraftSaveButtonProps) {
  return (
    <button
      type="button" // @description 버튼 타입 명시
      // @reason 기본 동작(예: submit) 방지
      onClick={onSave} // @description 저장 핸들러 연결
      // @reason 버튼 클릭 시 임시저장 실행
      disabled={isSaving} // @description 저장 중일 때 버튼 비활성화
      // @reason 중복 저장 방지
      className={`save-button ${isSaving ? 'saving' : ''}`} // @description 동적 클래스 적용
      // @reason 저장 상태에 따라 스타일 변경
    >
      {isSaving ? '저장 중...' : '임시저장'}{' '}
      {/* @description 저장 상태에 따라 텍스트 변경 */}
      {/* @reason 사용자에게 현재 상태 알림 */}
    </button>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 버튼 UI 사용 가능
// @analogy 도서관에서 저장 버튼을 공유
export default DraftSaveButton;

// **작동 매커니즘**
// 1. `DraftSaveButtonProps` 타입 정의: Props 타입 명시.
// 2. `button` 요소 렌더링: `type="button"`으로 기본 동작 방지.
// 3. `onClick`에 `onSave` 연결: 버튼 클릭 시 임시저장 실행.
// 4. `disabled` 속성으로 `isSaving` 상태 반영: 저장 중일 때 버튼 비활성화.
// 5. 동적 클래스와 텍스트로 상태 표시: 저장 중일 때 "저장 중..." 표시.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 7. 상위 컴포넌트에서 `DraftSaveButton`을 사용하여 임시저장 버튼 UI 제공.
// @reason 임시저장 버튼 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장 버튼을 통해 기록 저장 요청.

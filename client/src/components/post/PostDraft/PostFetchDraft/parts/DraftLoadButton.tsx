/**
 * @file DraftLoadButton.tsx
 * @description 드래프트 불러오기를 위한 버튼 UI 컴포넌트
 * @reason 불러오기 버튼 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 저장된 대여 기록을 불러오기 위한 버튼 제공
 */

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface DraftLoadButtonProps {
  onLoad: () => void; // @type {Function} - 불러오기 핸들러
  isLoading: boolean; // @type {boolean} - 로딩 중 여부
}

// 불러오기 버튼 UI 컴포넌트 정의
// @description 드래프트 불러오기 버튼 UI 제공
// @reason 사용자에게 불러오기 버튼 제공
// @analogy 도서관에서 불러오기 버튼을 통해 기록 로드 요청
function DraftLoadButton({ onLoad, isLoading }: DraftLoadButtonProps) {
  return (
    <button
      type="button" // @description 버튼 타입 명시
      // @reason 기본 동작(예: submit) 방지
      onClick={onLoad} // @description 불러오기 핸들러 연결
      // @reason 버튼 클릭 시 드래프트 불러오기 실행
      disabled={isLoading} // @description 로딩 중일 때 버튼 비활성화
      // @reason 중복 요청 방지
      className={`load-button ${isLoading ? 'loading' : ''}`} // @description 동적 클래스 적용
      // @reason 로딩 상태에 따라 스타일 변경
    >
      {isLoading ? '불러오는 중...' : '드래프트 불러오기'}{' '}
      {/* @description 로딩 상태에 따라 텍스트 변경 */}
      {/* @reason 사용자에게 현재 상태 알림 */}
    </button>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 버튼 UI 사용 가능
// @analogy 도서관에서 불러오기 버튼을 공유
export default DraftLoadButton;

// **작동 매커니즘**
// 1. `DraftLoadButtonProps` 타입 정의: Props 타입 명시.
// 2. `button` 요소 렌더링: `type="button"`으로 기본 동작 방지.
// 3. `onClick`에 `onLoad` 연결: 버튼 클릭 시 드래프트 불러오기 실행.
// 4. `disabled` 속성으로 `isLoading` 상태 반영: 로딩 중일 때 버튼 비활성화.
// 5. 동적 클래스와 텍스트로 상태 표시: 로딩 중일 때 "불러오는 중..." 표시.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 7. 상위 컴포넌트에서 `DraftLoadButton`을 사용하여 드래프트 불러오기 버튼 UI 제공.
// @reason 드래프트 불러오기 버튼 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 불러오기 버튼을 통해 기록 로드 요청.

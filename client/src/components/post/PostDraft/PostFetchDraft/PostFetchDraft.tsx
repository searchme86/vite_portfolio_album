/**
 * @file PostFetchDraft.tsx
 * @description 저장된 드래프트 데이터를 불러오고 버튼 UI를 표시하는 컴포넌트
 * @reason 드래프트 불러오기 기능과 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 저장된 대여 기록을 불러오고 버튼으로 사용자에게 제공
 */

import useFetchDraft from './hooks/useFetchDraft'; // @type {Function} - 불러오기 훅
// @description 드래프트 불러오기 훅 가져오기
// @reason 저장된 드래프트 데이터 로드 로직 사용
// @analogy 도서관에서 저장된 기록 불러오기 시스템 연결

import DraftLoadButton from './parts/DraftLoadButton'; // @type {Function} - 버튼 UI 컴포넌트
// @description 드래프트 불러오기 버튼 UI 컴포넌트 가져오기
// @reason 사용자에게 불러오기 버튼 제공
// @analogy 도서관에서 사용자에게 불러오기 버튼 표시

// 불러오기 컴포넌트 정의
// @description 저장된 드래프트 데이터를 불러오고 버튼 UI 표시
// @reason 드래프트 불러오기 기능과 사용자 피드백 제공
// @analogy 도서관에서 저장된 대여 기록을 불러오고 버튼으로 알림
function PostFetchDraft() {
  // 드래프트 불러오기 훅 사용
  // @description 드래프트 불러오기 로직 실행
  // @reason 저장된 드래프트 데이터를 로드
  const { fetchDraft, isLoading } = useFetchDraft(); // @type {Object} - 불러오기 함수와 상태
  // @description 불러오기 훅에서 함수와 상태 가져오기
  // @reason UI 업데이트 및 사용자 피드백 제공

  // 불러오기 버튼 클릭 핸들러
  // @description 드래프트 데이터 불러오기 실행
  // @reason 사용자 요청에 따라 드래프트 로드
  const handleLoad = () => {
    fetchDraft(); // @description 드래프트 데이터 불러오기 호출
    // @reason 사용자 요청에 따라 드래프트 로드
    // @analogy 도서관에서 사용자가 버튼을 눌러 기록 불러오기
  };

  return (
    <div className="post-fetch-draft">
      {/* @description 드래프트 불러오기 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h3>드래프트 불러오기</h3>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <DraftLoadButton
        onLoad={handleLoad} // @type {Function} - 불러오기 핸들러
        isLoading={isLoading} // @type {boolean} - 로딩 중 여부
      />
      {/* @description 드래프트 불러오기 버튼 UI 렌더링 */}
      {/* @reason 사용자에게 불러오기 버튼 제공 */}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 불러오기 기능 사용 가능
// @analogy 도서관에서 불러오기 시스템을 공유
export default PostFetchDraft;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useFetchDraft` 훅 호출: 드래프트 불러오기 로직 실행 준비.
// 3. `handleLoad` 함수 정의: 사용자 요청 시 `fetchDraft` 호출.
// 4. `DraftLoadButton` 컴포넌트 렌더링: 불러오기 버튼과 상태 표시.
// 5. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 6. 상위 컴포넌트에서 `PostFetchDraft`를 사용하여 드래프트 불러오기 기능 통합.
// @reason 드래프트 불러오기 기능과 사용자 피드백을 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장된 대여 기록을 불러오고 버튼으로 알림.

/**
 * @file initialDraftState.ts
 * @description 드래프트 데이터의 초기 상태를 정의하는 파일
 * @reason 초기 상태를 별도로 분리하여 Zustand 스토어에서 재사용 가능
 * @analogy 도서관에서 새 책 대여 기록부를 초기화하는 것과 같음
 */

// 드래프트 데이터 타입 정의
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 대여 기록부의 형식을 미리 정의

export interface DraftState {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그 배열
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  custom: { [key: string]: any }; // @type {Object} - 사용자 정의 데이터
  draftId: string; // @type {string} - 드래프트 고유 ID
  createdAt: Date; // @type {Date} - 생성 시간
  updatedAt: Date; // @type {Date} - 업데이트 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
  updateDraft: (draft: DraftState) => void; // @type {Function} - 드래프트 업데이트 함수
}

// 초기 상태 정의
// @description 드래프트 데이터의 초기값을 설정
// @reason 스토어 초기화 시 기본값 제공, 앱 시작 시 데이터 구조 보장
// @analogy 도서관에서 새 대여 기록부를 비어있는 상태로 준비
const initialDraftState: DraftState = {
  postTitle: '', // @type {string} - 초기값: 빈 문자열
  // @description 포스트 제목 초기화
  // @reason 사용자 입력 전 기본값 설정
  postDesc: '', // @type {string} - 초기값: 빈 문자열
  // @description 포스트 설명 초기화
  // @reason 사용자 입력 전 기본값 설정
  postContent: '', // @type {string} - 초기값: 빈 문자열
  // @description 포스트 본문 초기화
  // @reason 사용자 입력 전 기본값 설정
  tags: [], // @type {string[]} - 초기값: 빈 배열
  // @description 포스트 태그 배열 초기화
  // @reason 태그가 없을 경우 빈 배열로 시작
  imageUrls: [], // @type {string[]} - 초기값: 빈 배열
  // @description 이미지 URL 배열 초기화
  // @reason 이미지가 없을 경우 빈 배열로 시작
  custom: {}, // @type {Object} - 초기값: 빈 객체
  // @description 사용자 정의 데이터 초기화
  // @reason 사용자 커스텀 데이터가 없을 경우 빈 객체로 시작
  draftId: '', // @type {string} - 초기값: 빈 문자열
  // @description 드래프트 ID 초기화
  // @reason 드래프트 생성 전 ID 없음
  createdAt: new Date(), // @type {Date} - 초기값: 현재 시간
  // @description 생성 시간 초기화
  // @reason 드래프트 생성 시점 기록
  updatedAt: new Date(), // @type {Date} - 초기값: 현재 시간
  // @description 업데이트 시간 초기화
  // @reason 드래프트 업데이트 시점 기록
  isTemporary: false, // @type {boolean} - 초기값: false
  // @description 임시저장 여부 초기화
  // @reason 기본적으로 임시저장이 아님
  updateDraft: (_draft: DraftState) => {}, // @type {Function} - 드래프트 업데이트 함수
};

// 초기 상태 내보내기
// @description 초기 상태를 다른 파일에서 사용할 수 있도록 내보냄
// @reason Zustand 스토어에서 초기 상태로 사용
// @analogy 도서관에서 초기화된 대여 기록부를 공유
export default initialDraftState;

// **작동 매커니즘**
// 1. `initialDraftState` 객체가 생성됨: DraftState 타입을 기반으로 초기값 설정.
// 2. 각 속성에 대해 타입과 초기값을 명시하여 TypeScript 타입 안정성 보장.
// 3. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 4. Zustand 스토어(`draftStore.ts`)에서 이 초기 상태를 가져와 스토어 초기화에 사용.
// @reason 초기 상태를 별도로 분리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 초기화된 대여 기록부를 다른 부서에서 재사용.

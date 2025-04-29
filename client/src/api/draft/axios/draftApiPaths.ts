/**
 * @file draftApiPaths.ts
 * @description API 엔드포인트 경로를 정의하는 상수 파일
 * @reason API 경로를 중앙에서 관리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 모든 자료 요청 경로를 한 곳에 정리
 */

// API 경로 정의 객체
// @type {Object} - API 경로 상수
// @description API 경로를 상수로 정의
// @reason 경로를 중앙에서 관리하여 유지보수성 향상
const draftApiPaths = {
  autoSave: '/draft/auto-save', // @type {string} - 자동저장 경로
  // @description 자동저장 API 경로
  // @reason 자동저장 요청 시 사용

  temporarySave: '/draft/temporary-save', // @type {string} - 임시저장 경로
  // @description 임시저장 API 경로
  // @reason 임시저장 요청 시 사용

  fetchDraft: '/draft/fetch/:draftId', // @type {string} - 드래프트 불러오기 경로
  // @description 드래프트 불러오기 API 경로, :draftId는 동적 파라미터
  // @reason 특정 드래프트 조회 시 사용
} as const; // @description 객체를 상수로 고정
// @reason 경로 값 변경 방지

// 경로 상수 내보내기
// @description 경로 상수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason API 요청 모듈에서 경로 사용 가능
// @analogy 도서관에서 자료 요청 경로를 공유
export default draftApiPaths;

// **작동 매커니즘**
// 1. `draftApiPaths` 객체 정의: 자동저장, 임시저장, 드래프트 불러오기 경로를 상수로 정의.
// 2. `as const` 사용: 객체를 상수로 고정하여 값 변경 방지.
// 3. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 4. 다른 API 요청 파일에서 `draftApiPaths`를 import하여 경로 사용.
// @reason API 경로를 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 모든 자료 요청 경로를 한 곳에 정리.

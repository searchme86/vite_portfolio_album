/**
 * @file initialDraftState.ts
 * @description 드래프트 상태 타입 정의
 * @reason 타입을 별도로 정의하여 재사용성과 유지보수성 향상
 * @analogy 도서관에서 대여 기록의 데이터 구조를 정의
 */

export type DraftStateType = {
  // 상태 필드
  postTitle: string; // @type {string} - 포스트 제목
  // @description 포스트의 제목
  // @reason 포스트 제목 관리
  postDesc: string; // @type {string} - 포스트 설명
  // @description 포스트의 설명
  // @reason 포스트 설명 관리
  postContent: string; // @type {string} - 포스트 본문
  // @description 포스트의 본문
  // @reason 포스트 본문 관리
  tags: string[]; // @type {string[]} - 태그 배열
  // @description 포스트의 태그 배열
  // @reason 태그 관리
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  // @description 포스트의 이미지 URL 배열
  // @reason 이미지 URL 관리
  custom: { [key: string]: any }; // @type {Object} - 커스텀 데이터
  // @description 유연한 커스텀 데이터 저장
  // @reason 추가적인 데이터 저장
  draftId: string; // @type {string} - 드래프트 ID
  // @description 드래프트의 고유 식별자
  // @reason 드래프트 식별
  createdAt: Date; // @type {Date} - 생성 시간
  // @description 드래프트 생성 시간
  // @reason 생성 시간 기록
  updatedAt: Date; // @type {Date} - 수정 시간
  // @description 드래프트 수정 시간
  // @reason 수정 시간 기록
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
  // @description 임시저장 여부 플래그
  // @reason 자동저장과 임시저장 구분
};

export type DraftStateActions = {
  // 상태 변경 함수 (draftSetters.ts에서 정의)
  updateDraft: (draft: Partial<DraftState>) => void; // @type {Function} - 드래프트 업데이트 함수
  // @description 드래프트 데이터를 부분적으로 업데이트
  // @reason 새로운 데이터로 상태 갱신
  resetDraft: () => void; // @type {Function} - 드래프트 초기화 함수
  // @description 드래프트 데이터를 초기 상태로 리셋
  // @reason 드래프트 작업 초기화

  // 상태 조회 함수 (draftGetters.ts에서 정의)
  getPostTitle: () => string; // @type {Function} - 포스트 제목 조회 함수
  // @description 포스트 제목 반환
  // @reason 컴포넌트에서 제목 표시
  getPostDesc: () => string; // @type {Function} - 포스트 설명 조회 함수
  // @description 포스트 설명 반환
  // @reason 컴포넌트에서 설명 표시
  getPostContent: () => string; // @type {Function} - 포스트 본문 조회 함수
  // @description 포스트 본문 반환
  // @reason 컴포넌트에서 본문 표시
  getTags: () => string[]; // @type {Function} - 태그 조회 함수
  // @description 태그 배열 반환
  // @reason 컴포넌트에서 태그 표시
  getImageUrls: () => string[]; // @type {Function} - 이미지 URL 조회 함수
  // @description 이미지 URL 배열 반환
  // @reason 컴포넌트에서 이미지 표시
  getCustom: () => { [key: string]: any }; // @type {Function} - 커스텀 데이터 조회 함수
  // @description 커스텀 데이터 반환
  // @reason 컴포넌트에서 커스텀 데이터 표시
  getDraftId: () => string; // @type {Function} - 드래프트 ID 조회 함수
  // @description 드래프트 ID 반환
  // @reason 컴포넌트에서 드래프트 ID 표시
  getCreatedAt: () => Date; // @type {Function} - 생성 시간 조회 함수
  // @description 생성 시간 반환
  // @reason 컴포넌트에서 생성 시간 표시
  getUpdatedAt: () => Date; // @type {Function} - 수정 시간 조회 함수
  // @description 수정 시간 반환
  // @reason 컴포넌트에서 수정 시간 표시
  getIsTemporary: () => boolean; // @type {Function} - 임시저장 여부 조회 함수
  // @description 임시저장 여부 반환
  // @reason 컴포넌트에서 임시저장 상태 표시
};

export type DraftState = DraftStateType & DraftStateActions;

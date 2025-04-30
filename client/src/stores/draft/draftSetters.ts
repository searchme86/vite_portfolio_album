/**
 * @file draftSetters.ts
 * @description 드래프트 상태를 변경하는 Zustand 액션 함수
 * @reason 드래프트 상태를 관리
 * @analogy 도서관에서 대여 장부를 업데이트하는 함수
 */

// 드래프트 상태 타입 정의 (draftGetters.ts와 동일)
// @type {Object} - 드래프트 상태 구조
// @description Zustand 스토어의 상태 타입 정의
// @reason 타입 안정성 보장
interface DraftState {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 태그 배열
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  custom: { [key: string]: any }; // @type {Object} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date; // @type {Date} - 생성 시간
  updatedAt: Date; // @type {Date} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 드래프트 상태를 변경하는 함수 정의
// @description set과 get 함수를 사용하여 상태 변경 로직 정의
// @reason 상태 변경 로직 캡슐화
// @analogy 도서관에서 대여 장부를 업데이트
export const draftSetters = (
  set: (fn: (state: DraftState) => DraftState) => void,
  get: () => DraftState
) => ({
  // updateDraft: 드래프트 데이터 업데이트
  // @type {(draft: Partial<DraftState>) => void}
  // @description 드래프트 데이터를 업데이트
  // @reason 새로운 드래프트 데이터로 상태 갱신
  // @analogy 도서관에서 대여 기록을 새로운 정보로 갱신
  updateDraft: (draft: Partial<DraftState>): void => {
    const currentState = get(); // @type {DraftState} - 현재 Zustand 스토어 상태
    // @description 현재 Zustand 스토어 상태 가져오기
    // @reason 상태 변경 전 현재 상태 확인
    // @analogy 도서관에서 대여 장부 현재 상태 확인

    // 업데이트된 상태 생성
    // @description 새로운 드래프트 데이터와 기존 상태 병합
    // @reason 새로운 데이터로 상태 갱신
    const updatedState: DraftState = {
      postTitle:
        draft.postTitle !== undefined
          ? draft.postTitle
          : currentState.postTitle, // @type {string} - 새로운 제목
      // @description 새로운 제목이 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      postDesc:
        draft.postDesc !== undefined ? draft.postDesc : currentState.postDesc, // @type {string} - 새로운 설명
      // @description 새로운 설명이 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      postContent:
        draft.postContent !== undefined
          ? draft.postContent
          : currentState.postContent, // @type {string} - 새로운 본문
      // @description 새로운 본문이 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      tags: draft.tags !== undefined ? draft.tags : currentState.tags, // @type {string[]} - 새로운 태그 배열
      // @description 새로운 태그 배열이 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      imageUrls:
        draft.imageUrls !== undefined
          ? draft.imageUrls
          : currentState.imageUrls, // @type {string[]} - 새로운 이미지 URL 배열
      // @description 새로운 이미지 URL 배열이 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      custom: draft.custom !== undefined ? draft.custom : currentState.custom, // @type {Object} - 새로운 커스텀 데이터
      // @description 새로운 커스텀 데이터가 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      draftId:
        draft.draftId !== undefined ? draft.draftId : currentState.draftId, // @type {string} - 새로운 드래프트 ID
      // @description 새로운 드래프트 ID가 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      createdAt:
        draft.createdAt !== undefined
          ? draft.createdAt
          : currentState.createdAt, // @type {Date} - 새로운 생성 시간
      // @description 새로운 생성 시간이 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
      updatedAt: draft.updatedAt !== undefined ? draft.updatedAt : new Date(), // @type {Date} - 새로운 수정 시간
      // @description 새로운 수정 시간이 있으면 업데이트, 없으면 현재 시간으로 설정
      // @reason 상태 업데이트 시 수정 시간 갱신
      isTemporary:
        draft.isTemporary !== undefined
          ? draft.isTemporary
          : currentState.isTemporary, // @type {boolean} - 새로운 임시저장 여부
      // @description 새로운 임시저장 여부가 있으면 업데이트, 없으면 기존 값 유지
      // @reason 상태 일부만 업데이트 가능
    };

    set(() => updatedState); // @description Zustand 스토어 상태 업데이트
    // @reason 새로운 드래프트 데이터로 상태 갱신
    // @analogy 도서관에서 대여 장부 업데이트
  },

  // resetDraft: 드래프트 데이터 초기화
  // @type {() => void}
  // @description 드래프트 데이터를 초기 상태로 리셋
  // @reason 드래프트 작업 초기화
  // @analogy 도서관에서 대여 장부를 초기화
  resetDraft: (): void => {
    set(() => ({
      postTitle: '', // @type {string} - 초기 제목
      postDesc: '', // @type {string} - 초기 설명
      postContent: '', // @type {string} - 초기 본문
      tags: [], // @type {string[]} - 초기 태그 배열
      imageUrls: [], // @type {string[]} - 초기 이미지 URL 배열
      custom: {}, // @type {Object} - 초기 커스텀 데이터
      draftId: '', // @type {string} - 초기 드래프트 ID
      createdAt: new Date(), // @type {Date} - 초기 생성 시간
      updatedAt: new Date(), // @type {Date} - 초기 수정 시간
      isTemporary: false, // @type {boolean} - 초기 임시저장 여부
    })); // @description 초기 상태로 리셋
    // @reason 드래프트 데이터 초기화
    // @analogy 도서관에서 장부 초기화
  },
});

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: Zustand 스토어의 상태 구조 명시.
// 2. `draftSetters` 함수 정의: `set`과 `get` 함수를 사용하여 상태 변경 로직 정의.
// 3. `updateDraft` 함수 구현: 새로운 드래프트 데이터로 상태를 부분적으로 업데이트, `updatedAt`은 항상 갱신.
// 4. `resetDraft` 함수 구현: 드래프트 데이터를 초기 상태로 리셋.
// 5. `export`로 내보내기: `draftStore.ts`에서 사용 가능.
// @reason 드래프트 상태 변경 로직을 캡슐화하여 재사용성 및 유지보수성 향상.
// @analogy 도서관에서 대여 장부를 업데이트.

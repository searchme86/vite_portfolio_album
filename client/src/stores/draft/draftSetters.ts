/**
 * @file draftSetters.ts
 * @description 드래프트 데이터를 업데이트하는 Setter 함수를 정의하는 파일
 * @reason 데이터 업데이트 로직을 별도로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록부를 업데이트하는 창구를 별도로 마련
 */

// 드래프트 상태 타입 정의 (initialDraftState.ts와 동일)
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
}

// Setter 함수 타입 정의
// @type {Object} - Setter 함수들의 객체
// @description Setter 함수들의 타입을 정의
// @reason Setter 함수의 입력값과 반환값 타입 명시
// @analogy 도서관에서 대여 기록 업데이트 요청의 형식을 정의
interface DraftSetters {
  setPostTitle: (title: string) => void;
  setPostDesc: (desc: string) => void;
  setPostContent: (content: string) => void;
  setTags: (tags: string[]) => void;
  setImageUrls: (urls: string[]) => void;
  setCustom: (custom: { [key: string]: any }) => void;
  setDraftId: (id: string) => void;
  setCreatedAt: (date: Date) => void;
  setUpdatedAt: (date: Date) => void;
  setIsTemporary: (isTemp: boolean) => void;
  setDraft: (draft: Partial<DraftState>) => void;
}

// Setter 함수 생성
// @description 스토어 상태를 업데이트하는 Setter 함수 정의
// @reason 상태 업데이트 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상
// @analogy 도서관에서 대여 기록 업데이트 창구를 통해 기록을 수정
const createDraftSetters = (
  set: (fn: (state: DraftState) => DraftState) => void
): DraftSetters => ({
  setPostTitle: (title) => {
    const safeTitle = title || ''; // @type {string} - Fallback: 빈 문자열
    // @description 포스트 제목 업데이트, 없으면 빈 문자열
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setPostTitle:', safeTitle); // @description 디버깅용 로그
    set((state) => ({ ...state, postTitle: safeTitle, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setPostDesc: (desc) => {
    const safeDesc = desc || ''; // @type {string} - Fallback: 빈 문자열
    // @description 포스트 설명 업데이트, 없으면 빈 문자열
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setPostDesc:', safeDesc); // @description 디버깅용 로그
    set((state) => ({ ...state, postDesc: safeDesc, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setPostContent: (content) => {
    const safeContent = content || ''; // @type {string} - Fallback: 빈 문자열
    // @description 포스트 본문 업데이트, 없으면 빈 문자열
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setPostContent:', safeContent); // @description 디버깅용 로그
    set((state) => ({
      ...state,
      postContent: safeContent,
      updatedAt: new Date(),
    }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setTags: (tags) => {
    const safeTags = tags || []; // @type {string[]} - Fallback: 빈 배열
    // @description 포스트 태그 배열 업데이트, 없으면 빈 배열
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setTags:', safeTags); // @description 디버깅용 로그
    set((state) => ({ ...state, tags: safeTags, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setImageUrls: (urls) => {
    const safeUrls = urls || []; // @type {string[]} - Fallback: 빈 배열
    // @description 이미지 URL 배열 업데이트, 없으면 빈 배열
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setImageUrls:', safeUrls); // @description 디버깅용 로그
    set((state) => ({ ...state, imageUrls: safeUrls, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setCustom: (custom) => {
    const safeCustom = custom || {}; // @type {Object} - Fallback: 빈 객체
    // @description 사용자 정의 데이터 업데이트, 없으면 빈 객체
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setCustom:', safeCustom); // @description 디버깅용 로그
    set((state) => ({ ...state, custom: safeCustom, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setDraftId: (id) => {
    const safeId = id || ''; // @type {string} - Fallback: 빈 문자열
    // @description 드래프트 ID 업데이트, 없으면 빈 문자열
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setDraftId:', safeId); // @description 디버깅용 로그
    set((state) => ({ ...state, draftId: safeId, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setCreatedAt: (date) => {
    const safeDate = date || new Date(); // @type {Date} - Fallback: 현재 시간
    // @description 생성 시간 업데이트, 없으면 현재 시간
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setCreatedAt:', safeDate); // @description 디버깅용 로그
    set((state) => ({ ...state, createdAt: safeDate, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setUpdatedAt: (date) => {
    const safeDate = date || new Date(); // @type {Date} - Fallback: 현재 시간
    // @description 업데이트 시간 업데이트, 없으면 현재 시간
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setUpdatedAt:', safeDate); // @description 디버깅용 로그
    set((state) => ({ ...state, updatedAt: safeDate }));
    // @description 상태를 업데이트
    // @reason 최신 업데이트 시간 기록
  },
  setIsTemporary: (isTemp) => {
    const safeIsTemp = isTemp || false; // @type {boolean} - Fallback: false
    // @description 임시저장 여부 업데이트, 없으면 false
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setIsTemporary:', safeIsTemp); // @description 디버깅용 로그
    set((state) => ({
      ...state,
      isTemporary: safeIsTemp,
      updatedAt: new Date(),
    }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
  setDraft: (draft) => {
    const safeDraft = draft || {}; // @type {Partial<DraftState>} - Fallback: 빈 객체
    // @description 전체 드래프트 데이터 업데이트, 없으면 빈 객체
    // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
    console.log('setDraft:', safeDraft); // @description 디버깅용 로그
    set((state) => ({ ...state, ...safeDraft, updatedAt: new Date() }));
    // @description 상태를 업데이트하고 updatedAt 갱신
    // @reason 최신 업데이트 시간 기록
  },
});

// Setter 함수 내보내기
// @description Setter 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason Zustand 스토어에서 Setter로 사용
// @analogy 도서관에서 대여 기록 업데이트 창구를 공유
export default createDraftSetters;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `DraftSetters` 타입 정의: Setter 함수의 입력값과 반환값 타입 명시.
// 3. `createDraftSetters` 함수가 Zustand의 `set` 함수를 받아 Setter 객체 생성.
// 4. 각 Setter 함수는 입력값을 안전하게 처리(Fallback) 후 상태 업데이트, `updatedAt` 갱신.
// 5. `console.log`로 디버깅 가능하도록 출력.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 7. Zustand 스토어(`draftStore.ts`)에서 이 Setter 함수를 통합하여 사용.
// @reason 데이터 업데이트 로직을 별도로 분리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 대여 기록 업데이트 창구를 통해 기록을 수정.

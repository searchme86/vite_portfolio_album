/**
 * @file useGetDraftState.ts
 * @description Zustand 스토어에서 드래프트 데이터를 가져오는 커스텀 훅
 * @location src/stores/draft/useGetDraftState.ts
 */
import useDraftStore from './draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 스토어 접근
// @reason 상태 가져오기

// 드래프트 상태 타입 정의
interface DraftState {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  custom: Record<string, any>; // @type {Record<string, any>} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date; // @type {Date | string | undefined} - 생성 시간
  updatedAt: Date; // @type {Date | string | undefined} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 커스텀 훅 정의
const useGetDraftState = (): DraftState => {
  const {
    postTitle = '', // @type {string} - Fallback: 빈 문자열
    postDesc = '', // @type {string} - Fallback: 빈 문자열
    postContent = '', // @type {string} - Fallback: 빈 문자열
    tags = [], // @type {string[]} - Fallback: 빈 배열
    imageUrls = [], // @type {string[]} - Fallback: 빈 배열
    custom = {}, // @type {Record<string, any>} - Fallback: 빈 객체
    draftId = 'default', // @type {string} - Fallback: 기본 ID
    createdAt = new Date(), // @type {Date} - Fallback: 현재 시간
    updatedAt = new Date(), // @type {Date} - Fallback: 현재 시간
    isTemporary = false, // @type {boolean} - Fallback: false
  } = useDraftStore(); // @description Zustand 스토어에서 드래프트 데이터 가져오기

  return {
    postTitle, // @type {string}
    postDesc, // @type {string}
    postContent, // @type {string}
    tags, // @type {string[]}
    imageUrls, // @type {string[]}
    custom, // @type {Record<string, any>}
    draftId, // @type {string}
    createdAt, // @type {Date | string | undefined}
    updatedAt, // @type {Date | string | undefined}
    isTemporary, // @type {boolean}
  }; // @description 드래프트 상태 객체 반환
};

// **작동 매커니즘**
// 1. `useDraftStore` 호출: Zustand 스토어에서 상태와 메서드 가져오기.
// 2. 구조 분해 할당: 상태 필드 추출 및 기본값 설정.
// 3. 객체 반환: 드래프트 상태를 객체로 구성하여 반환.
export default useGetDraftState;

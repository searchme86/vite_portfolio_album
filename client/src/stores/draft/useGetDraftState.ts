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
  createdAt: Date; // @type {Date} - 생성 시간
  updatedAt: Date; // @type {Date} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 커스텀 훅 정의
const useGetDraftState = (): DraftState => {
  const {
    postTitle = () => '', // Fallback: 빈 문자열 반환 함수
    postDesc = () => '', // Fallback: 빈 문자열 반환 함수
    postContent = () => '', // Fallback: 빈 문자열 반환 함수
    tags = () => [], // Fallback: 빈 배열 반환 함수
    imageUrls = () => [], // Fallback: 빈 배열 반환 함수
    custom = () => ({}), // Fallback: 빈 객체 반환 함수
    draftId = () => 'default', // Fallback: 기본 ID 반환 함수
    createdAt = () => new Date(), // Fallback: 현재 시간 반환 함수
    updatedAt = () => new Date(), // Fallback: 현재 시간 반환 함수
    isTemporary = () => false, // Fallback: false 반환 함수
  } = useDraftStore.use; // Zustand 셀렉터
  // @description Zustand 스토어에서 드래프트 데이터 가져오기
  // @reason 상태 접근

  return {
    postTitle: postTitle(), // @type {string} - 셀렉터 호출로 실제 값 추출
    // @description postTitle 셀렉터 호출하여 문자열 값 반환
    // @reason 타입 일치
    postDesc: postDesc(), // @type {string} - 셀렉터 호출로 실제 값 추출
    // @description postDesc 셀렉터 호출하여 문자열 값 반환
    // @reason 타입 일치
    postContent: postContent(), // @type {string} - 셀렉터 호출로 실제 값 추출
    // @description postContent 셀렉터 호출하여 문자열 값 반환
    // @reason 타입 일치
    tags: tags(), // @type {string[]} - 셀렉터 호출로 실제 값 추출
    // @description tags 셀렉터 호출하여 배열 값 반환
    // @reason 타입 일치
    imageUrls: imageUrls(), // @type {string[]} - 셀렉터 호출로 실제 값 추출
    // @description imageUrls 셀렉터 호출하여 배열 값 반환
    // @reason 타입 일치
    custom: custom(), // @type {Record<string, any>} - 셀렉터 호출로 실제 값 추출
    // @description custom 셀렉터 호출하여 객체 값 반환
    // @reason 타입 일치
    draftId: draftId(), // @type {string} - 셀렉터 호출로 실제 값 추출
    // @description draftId 셀렉터 호출하여 문자열 값 반환
    // @reason 타입 일치
    createdAt: createdAt(), // @type {Date} - 셀렉터 호출로 실제 값 추출
    // @description createdAt 셀렉터 호출하여 Date 값 반환
    // @reason 타입 일치
    updatedAt: updatedAt(), // @type {Date} - 셀렉터 호출로 실제 값 추출
    // @description updatedAt 셀렉터 호출하여 Date 값 반환
    // @reason 타입 일치
    isTemporary: isTemporary(), // @type {boolean} - 셀렉터 호출로 실제 값 추출
    // @description isTemporary 셀렉터 호출하여 불리언 값 반환
    // @reason 타입 일치
  }; // @description 드래프트 상태 객체 반환
  // @reason 컴포넌트에서 사용
};

// **작동 매커니즘**
// 1. `useDraftStore.use`로 Zustand 스토어에서 셀렉터 가져오기: 각 속성에 대한 셀렉터 함수 추출.
// 2. Fallback 값 설정: 각 속성이 없는 경우 기본값 반환 함수 제공.
// 3. 셀렉터 호출: 각 셀렉터를 호출하여 실제 값을 추출.
// 4. 객체 반환: 드래프트 상태를 객체로 구성하여 반환.
// @reason Zustand 스토어에서 드래프트 데이터를 타입 안전하게 가져옴.

export default useGetDraftState;

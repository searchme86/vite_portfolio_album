/**
 * @file useAutoSaveMutation.ts
 * @description React Query를 사용하여 자동저장 mutation을 처리하는 커스텀 훅
 * @reason 자동저장 mutation 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 주기적으로 저장하는 시스템
 */

import { useMutation } from '@tanstack/react-query'; // @type {Function} - React Query 훅
// @description useMutation 훅 가져오기
// @reason 비동기 mutation 처리
// @analogy 도서관에서 저장 요청을 처리하는 도구 사용

import autoSaveAxios from '../axios/autoSaveAxios'; // @type {Function} - 자동저장 API 요청 함수
// @description 자동저장 API 요청 함수 가져오기
// @reason 자동저장 요청 실행
// @analogy 도서관에서 자동저장 시스템 연결

// 드래프트 데이터 타입 정의 (draftStore.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
interface DraftData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 태그 배열
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  custom: { [key: string]: any }; // @type {Object} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: string; // @type {string} - 생성 시간 (ISO 문자열)
  updatedAt: string; // @type {string} - 수정 시간 (ISO 문자열)
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// API 응답 타입 정의 (autoSaveAxios.ts와 동일)
// @type {Object} - API 응답 구조
// @description API 응답의 타입 정의
// @reason 응답 데이터 타입 안정성 보장
interface AutoSaveResponse {
  success: boolean; // @type {boolean} - 요청 성공 여부
  draftId: string; // @type {string} - 저장된 드래프트 ID
  message: string; // @type {string} - 응답 메시지
}

// 커스텀 훅 정의
// @description React Query를 사용하여 자동저장 mutation 처리
// @reason 비동기 저장 작업 관리
// @analogy 도서관에서 주기적 저장 요청 관리
const useAutoSaveMutation = () => {
  // React Query mutation 훅 사용
  // @description 자동저장 요청을 mutation으로 처리
  // @reason 비동기 작업 상태 관리 및 에러 처리
  const mutation = useMutation<AutoSaveResponse, Error, DraftData>({
    mutationFn: (draftData: DraftData) => autoSaveAxios(draftData), // @description mutation 함수 정의
    // @reason autoSaveAxios를 호출하여 자동저장 실행
    onSuccess: (data) => {
      console.log('useAutoSaveMutation - Auto-save succeeded:', data); // @description 디버깅용 로그
      // @description 성공 상태 디버깅
      // @reason 성공 상태 확인
    },
    onError: (error) => {
      console.error('useAutoSaveMutation - Auto-save failed:', error); // @description 에러 로그
      // @description 실패 상태 디버깅
      // @reason 문제 해결 지원
    },
    onSettled: () => {
      console.log('useAutoSaveMutation - Mutation settled'); // @description 디버깅용 로그
      // @description mutation 완료 디버깅
      // @reason mutation 상태 확인
    },
  }); // @type {Object} - React Query mutation 객체

  // Fallback 처리: mutation 실패 시 기본 동작
  // @description mutation 상태를 기반으로 추가 처리
  // @reason 애플리케이션 충돌 방지
  const handleAutoSave = (draftData: DraftData) => {
    if (!draftData.draftId) {
      console.warn('useAutoSaveMutation - Draft ID is missing'); // @description 경고 로그
      // @description draftId 누락 디버깅
      // @reason 문제 해결 지원
      return;
    }

    mutation.mutate(draftData); // @description mutation 실행
    // @reason 자동저장 요청 트리거
  };

  return {
    autoSave: handleAutoSave, // @type {Function} - 자동저장 함수
    isLoading: mutation.isLoading, // @type {boolean} - 로딩 상태
    error: mutation.error, // @type {Error | null} - 에러 상태
    data: mutation.data, // @type {AutoSaveResponse | undefined} - 응답 데이터
  }; // @type {Object} - mutation 상태와 함수 반환
  // @description 자동저장 함수와 상태 반환
  // @reason 컴포넌트에서 자동저장 기능 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 자동저장 mutation 사용 가능
// @analogy 도서관에서 자동저장 시스템을 공유
export default useAutoSaveMutation;

// **작동 매커니즘**
// 1. `DraftData` 타입 정의: 요청 데이터 구조 명시.
// 2. `AutoSaveResponse` 타입 정의: 응답 데이터 구조 명시.
// 3. `useMutation` 훅 호출: React Query를 사용하여 자동저장 mutation 정의.
// 4. `mutationFn`으로 `autoSaveAxios` 호출: 자동저장 API 요청 실행.
// 5. `onSuccess`, `onError`, `onSettled` 콜백 정의: mutation 상태 디버깅.
// 6. `handleAutoSave` 함수 정의: mutation 실행 및 Fallback 처리.
// 7. `autoSave`, `isLoading`, `error`, `data` 반환: 컴포넌트에서 상태와 함수 사용 가능.
// 8. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 자동저장 mutation 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 자료를 주기적으로 저장.

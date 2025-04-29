/**
 * @file useFetchDraft.ts
 * @description 저장된 드래프트 데이터를 불러오는 커스텀 훅
 * @reason 드래프트 불러오기 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 저장된 대여 기록을 불러오는 시스템
 */

import { useState } from 'react'; // @type {Function} - React 훅
// @description useState 훅 가져오기
// @reason 불러오기 상태 관리
// @analogy 도서관에서 불러오기 상태를 관리하는 도구 사용

import useDraftStore from '../../../../../stores/draft/draftStore'; // @type {Object} - Zustand 스토어
// @description Zustand 스토어 가져오기
// @reason 드래프트 데이터 상태 업데이트
// @analogy 도서관에서 중앙 대여 기록 시스템에 접근

// 드래프트 데이터 타입 정의 (draftStore.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 대여 기록부의 형식을 미리 정의
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
  updateDraft: (draft: DraftState) => void; // @type {Function} - 드래프트 업데이트 함수
}

// 커스텀 훅 정의
// @description 저장된 드래프트 데이터를 불러옴
// @reason 이전 작업 복원 및 사용자 편의 제공
// @analogy 도서관에서 저장된 대여 기록을 불러옴
const useFetchDraft = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false); // @type {boolean} - 로딩 중 여부
  // @description 로딩 상태 관리
  // @reason UI에서 로딩 상태 표시

  // Zustand 스토어에서 드래프트 업데이트 함수 가져오기
  // @description 스토어에서 드래프트 업데이트 함수 추출
  // @reason 불러온 드래프트 데이터로 상태 업데이트
  const updateDraft = useDraftStore((state: DraftState) => state.updateDraft); // @type {Function} - 드래프트 업데이트 함수
  // @description Zustand 스토어의 업데이트 함수 가져오기
  // @reason 불러온 데이터로 스토어 상태 동기화

  // 드래프트 불러오기 함수
  // @description 저장된 드래프트 데이터를 로드
  // @reason 사용자 요청에 따라 드래프트 복원
  const fetchDraft = async () => {
    try {
      setIsLoading(true); // @description 로딩 상태를 true로 설정
      // @reason 사용자에게 로딩 중임을 알림

      console.log('useFetchDraft - Fetching draft...'); // @description 디버깅용 로그
      // @description 불러오기 시작 디버깅
      // @reason 불러오기 상태 확인

      // TODO: 실제 불러오기 API 호출 (예: localStorage, 서버 요청)
      // @description 실제 불러오기 로직 (현재는 더미 데이터로 대체)
      // @reason 불러오기 기능 구현 예정
      // @analogy 도서관에서 저장된 대여 기록을 조회
      await new Promise((resolve) => setTimeout(resolve, 1000)); // @description 가짜 지연
      // @reason 불러오기 작업 시뮬레이션

      // 더미 드래프트 데이터 (실제 구현에서는 API 응답으로 대체)
      // @description 불러온 드래프트 데이터 시뮬레이션
      // @reason 테스트 및 개발 용이성
      const fetchedDraft: DraftState = {
        postTitle: '불러온 제목', // @type {string} - Fallback: 더미 데이터
        postDesc: '불러온 설명', // @type {string} - Fallback: 더미 데이터
        postContent: '불러온 본문', // @type {string} - Fallback: 더미 데이터
        tags: ['태그1', '태그2'], // @type {string[]} - Fallback: 더미 데이터
        imageUrls: ['https://example.com/image1.jpg'], // @type {string[]} - Fallback: 더미 데이터
        custom: {}, // @type {Object} - Fallback: 빈 객체
        draftId: '12345', // @type {string} - Fallback: 더미 데이터
        createdAt: new Date(), // @type {Date} - Fallback: 현재 날짜
        updatedAt: new Date(), // @type {Date} - Fallback: 현재 날짜
        isTemporary: false, // @type {boolean} - Fallback: false
      }; // @description 더미 드래프트 데이터 생성
      // @reason 실제 API 호출 전 테스트 데이터 제공

      updateDraft(fetchedDraft); // @description 스토어 상태 업데이트
      // @reason 불러온 데이터로 스토어 동기화
    } catch (error) {
      console.error('useFetchDraft - Fetch failed:', error); // @description 에러 로그
      // @description 불러오기 실패 디버깅
      // @reason 문제 해결 지원

      // Fallback 처리: 불러오기 실패 시 기본 드래프트 데이터로 복구
      // @description 기본 드래프트 데이터로 상태 복구
      // @reason 애플리케이션 충돌 방지
      const fallbackDraft: DraftState = {
        postTitle: '', // @type {string} - Fallback: 빈 문자열
        postDesc: '', // @type {string} - Fallback: 빈 문자열
        postContent: '', // @type {string} - Fallback: 빈 문자열
        tags: [], // @type {string[]} - Fallback: 빈 배열
        imageUrls: [], // @type {string[]} - Fallback: 빈 배열
        custom: {}, // @type {Object} - Fallback: 빈 객체
        draftId: '', // @type {string} - Fallback: 빈 문자열
        createdAt: new Date(), // @type {Date} - Fallback: 현재 날짜
        updatedAt: new Date(), // @type {Date} - Fallback: 현재 날짜
        isTemporary: false, // @type {boolean} - Fallback: false
      }; // @description 기본 드래프트 데이터 생성
      // @reason 에러 발생 시 기본값 제공

      updateDraft(fallbackDraft); // @description 기본 데이터로 스토어 상태 업데이트
      // @reason 에러 발생 시 데이터 복구
    } finally {
      setIsLoading(false); // @description 로딩 상태를 false로 설정
      // @reason 로딩 완료 후 상태 복구
    }
  };

  return { fetchDraft, isLoading }; // @type {Object} - 불러오기 함수와 상태 반환
  // @description 드래프트 불러오기 함수와 상태 반환
  // @reason 컴포넌트에서 불러오기 기능 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 드래프트 불러오기 기능 사용 가능
// @analogy 도서관에서 불러오기 시스템을 공유
export default useFetchDraft;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useState`로 `isLoading` 상태 관리: 로딩 상태 추적.
// 3. `useDraftStore` 훅 호출: Zustand 스토어에서 업데이트 함수 가져옴.
// 4. `fetchDraft` 함수 정의: 드래프트 데이터 불러오기 및 스토어 업데이트.
// 5. `console.log`로 디버깅 가능하도록 출력.
// 6. 에러 발생 시 Fallback 처리: 기본 드래프트 데이터로 복구.
// 7. `isLoading`과 `fetchDraft` 반환: 컴포넌트에서 상태와 함수 사용 가능.
// @reason 드래프트 불러오기 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장된 대여 기록을 불러옴.

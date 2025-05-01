/**
 * @file useAxiosErrorHandler.ts
 * @description axios 에러를 처리하는 커스텀 훅
 * @location src/hooks/useAxiosErrorHandler.ts
 * @reason 에러 처리 로직을 중앙화하여 재사용성 향상
 * @analogy 도서관에서 에러 편지를 처리하는 전담 직원
 */

import { useCallback } from 'react'; // @type {Function} - React 훅
// @description useCallback 훅 가져오기
// @reason 에러 처리 함수 메모이제이션
// @analogy 도서관에서 직원의 작업 방식 기억

import { AxiosError, isCancel } from 'axios'; // @type {Class, Function} - axios 에러 타입과 취소 확인 함수
// @description AxiosError 클래스와 isCancel 함수 가져오기
// @reason axios 에러 타입 확인 및 취소 여부 판단
// @analogy 도서관에서 우체부의 에러 편지 형식과 중단 신호 확인

// 에러 처리 결과 타입 정의
// @type {Object} - 에러 처리 결과 타입
// @description 에러 메시지와 추가 정보 구조 정의
// @reason 타입 안정성 보장
// @analogy 도서관에서 에러 편지 처리 결과 형식
interface ErrorDetails {
  message: string; // @type {string} - 에러 메시지
  // @description 에러 메시지
  // @reason 사용자에게 전달할 메시지
  status?: number; // @type {number | undefined} - HTTP 상태 코드
  // @description 서버 응답의 상태 코드
  // @reason 디버깅 정보 제공
  data?: unknown; // @type {unknown | undefined} - 서버 응답 데이터
  // @description 서버 응답 데이터
  // @reason 추가 에러 정보 제공
}

// 커스텀 훅 정의
// @description axios 에러를 처리하는 함수 제공
// @reason 에러 처리 로직 중앙화
// @analogy 도서관에서 에러 편지를 처리하는 직원
export function useAxiosErrorHandler() {
  // 에러 처리 함수
  const handleAxiosError = useCallback(
    (error: unknown): ErrorDetails => {
      // axios 요청 취소 확인
      if (isCancel(error)) {
        console.warn('useAxiosErrorHandler - Request was canceled:', error);
        // @description 요청 취소 로그
        // @reason 디버깅
        // @analogy 도서관에서 우체부가 중단된 이유 알림
        return {
          message: 'Request was canceled due to timeout', // @type {string} - 취소 메시지
          // @description 취소된 이유 반환
          // @reason 사용자 피드백 제공
        };
      }

      // AxiosError 타입 확인
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Unknown error occurred'; // @type {string} - 에러 메시지
        // @description 서버 응답 메시지, axios 메시지, 기본 메시지 중 하나 선택
        // @reason 명확한 에러 메시지 제공
        // @analogy 도서관에서 에러 편지 내용 정리
        console.error('useAxiosErrorHandler - Axios error:', {
          message: errorMessage,
          status: error.response?.status,
          data: error.response?.data,
        }); // @description 에러 로그
        // @reason 디버깅 및 상세 정보 기록
        // @analogy 도서관에서 에러 편지 상세 기록
        return {
          message: errorMessage, // @type {string} - 에러 메시지
          // @description 에러 메시지 반환
          status: error.response?.status, // @type {number | undefined} - 상태 코드
          // @description 상태 코드 반환
          data: error.response?.data, // @type {unknown | undefined} - 응답 데이터
          // @description 응답 데이터 반환
        };
      }

      // 일반 Error 타입 확인
      if (error instanceof Error) {
        console.error('useAxiosErrorHandler - General error:', {
          message: error.message,
          stack: error.stack,
        }); // @description 에러 로그
        // @reason 디버깅
        // @analogy 도서관에서 일반 에러 편지 기록
        return {
          message: error.message || 'Unknown error occurred', // @type {string} - 에러 메시지
          // @description 에러 메시지 반환
          // @reason 사용자 피드백 제공
        };
      }

      // 알 수 없는 에러 처리 (Fallback)
      console.error('useAxiosErrorHandler - Unknown error:', error); // @description 알 수 없는 에러 로그
      // @reason 디버깅
      // @analogy 도서관에서 알 수 없는 편지 기록
      return {
        message: 'Unknown error occurred', // @type {string} - 기본 메시지
        // @description 기본 에러 메시지 반환
        // @reason 애플리케이션 충돌 방지
      };
    },
    [] // @type {Array} - 의존성 배열 (빈 배열)
    // @description 의존성 없음
    // @reason 함수 메모이제이션
  );

  return { handleAxiosError }; // @type {Object} - 에러 처리 함수 반환
  // @description 에러 처리 함수 반환
  // @reason 컴포넌트에서 에러 처리 가능
  // @analogy 도서관에서 에러 처리 직원 제공
}

// **작동 매커니즘**
// 1. `useCallback`으로 `handleAxiosError` 함수 정의: 에러 처리 함수 메모이제이션.
// 2. `isCancel`로 요청 취소 확인: 취소된 경우 메시지 반환.
// 3. `AxiosError` 타입 확인: axios 에러 처리 및 상세 정보 반환.
// 4. `Error` 타입 확인: 일반 에러 처리.
// 5. 알 수 없는 에러 처리: 기본 메시지 반환.
// 6. `handleAxiosError` 함수 반환: 컴포넌트에서 사용 가능.
// @reason axios 에러 처리를 중앙화하여 코드 재사용성 향상.
// @analogy 도서관에서 에러 편지를 처리하는 전담 직원.

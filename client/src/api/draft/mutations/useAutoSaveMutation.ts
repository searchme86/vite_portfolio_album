/**
 * @file useAutoSaveMutation.ts
 * @description React Query를 사용하여 자동저장 mutation을 처리하는 커스텀 훅
 * @location src/api/draft/mutations/useAutoSaveMutation.ts
 * @reason 자동저장 mutation 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 책을 주기적으로 저장하는 시스템
 */

import { useMutation } from '@tanstack/react-query'; // @type {Function} - React Query 훅
// @description React Query의 useMutation 훅 가져오기
// @reason 비동기 mutation 처리 (자동저장 요청 관리)
// @analogy 도서관에서 책 저장 요청을 처리하는 도구

import axios from 'axios'; // @type {Function} - HTTP 요청 라이브러리
// @description axios로 HTTP 요청 처리
// @reason 서버로 자동저장 요청 전송
// @analogy 도서관에서 책 저장 요청을 보내는 우체부

import { useAuth } from '@clerk/clerk-react'; // @type {Function} - Clerk의 인증 훅
// @description Clerk 인증 상태와 토큰 가져오기
// @reason 사용자 인증 상태 및 토큰 관리
// @analogy 도서관에서 회원증 확인

import draftApiPaths from '../axios/draftApiPaths'; // @type {Object} - API 경로 상수
// @description API 경로 가져오기
// @reason 자동저장 요청 경로 사용
// @analogy 도서관에서 책 저장 위치 확인

import type { DraftState } from '../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장
// @analogy 도서관에서 책의 형식 확인

// API 응답 타입 정의
// @type {Object} - API 응답 구조
// @description 자동저장 API 응답의 타입 정의
// @reason 응답 데이터 타입 안정성 보장
// @analogy 도서관에서 저장 확인 메시지의 형식
interface AutoSaveResponse {
  success: boolean; // @type {boolean} - 요청 성공 여부
  // @description 저장 성공 여부 확인
  // @reason 성공 여부 판단
  draftId: string; // @type {string} - 저장된 드래프트 ID
  // @description 저장된 드래프트의 고유 ID
  // @reason 저장된 데이터 식별
  message: string; // @type {string} - 응답 메시지
  // @description 서버에서 보낸 메시지
  // @reason 사용자 피드백 제공
}

// 커스텀 훅 정의
// @description React Query를 사용하여 자동저장 mutation 처리
// @reason 비동기 저장 작업 관리
// @analogy 도서관에서 책 저장 요청 관리
export default function useAutoSaveMutation() {
  // useAuth 훅으로 인증 상태와 토큰 가져오기
  const { isSignedIn, getToken } = useAuth(); // @type {Object} - 인증 상태와 토큰 함수
  // @description Clerk의 useAuth 훅으로 로그인 상태와 토큰 함수 가져오기
  // @reason 인증 상태 확인 및 토큰 획득
  // @analogy 도서관에서 회원증과 회원증 발급 함수 가져오기

  // React Query mutation 훅 사용
  // @description 자동저장 요청을 mutation으로 처리
  // @reason 비동기 작업 상태 관리 및 에러 처리
  const mutation = useMutation<AutoSaveResponse, Error, DraftState>({
    mutationFn: async (draftData: DraftState) => {
      console.log(
        'useAutoSaveMutation - Mutation started for draft:',
        draftData
      ); // @description 디버깅용 로그
      // @description mutation 시작 로그
      // @reason 요청 상태 확인
      // @analogy 도서관에서 책 저장 시작 알림

      // 로그인 상태 확인
      if (isSignedIn === undefined) {
        console.warn('useAutoSaveMutation - Authentication state is undefined');
        // @description 로그인 상태 불명 로그
        // @reason 인증 상태 확인
        // @analogy 도서관에서 회원증 상태 불명 알림
        throw new Error('Authentication state is undefined'); // @description 인증 상태 불명 에러
        // @reason 인증 상태 불명 시 에러 발생
        // @analogy 도서관에서 회원증 상태 불명이면 저장 불가
      }

      if (!isSignedIn) {
        console.warn('useAutoSaveMutation - User not signed in, skipping save');
        // @description 로그인 상태 확인 로그
        // @reason 인증 필요
        // @analogy 도서관에서 회원증 없음을 알림
        throw new Error('User is not authenticated'); // @description 인증 실패 에러
        // @reason 인증되지 않은 경우 에러 발생
        // @analogy 도서관에서 회원증 없으면 저장 불가
      }

      // 토큰 가져오기
      const token = await getToken(); // @type {string | null} - 인증 토큰
      // @description getToken으로 토큰 동적으로 가져오기
      // @reason 인증된 요청을 위해 토큰 필요
      // @analogy 도서관에서 회원증 번호 확인
      console.log('useAutoSaveMutation - Retrieved token:', token); // @description 토큰 디버깅 로그
      // @reason 토큰 상태 확인
      // @analogy 도서관에서 회원증 번호 확인 로그

      if (!token) {
        console.warn('useAutoSaveMutation - Token is missing, skipping save');
        // @description 토큰 없음 로그
        // @reason 토큰 필수
        // @analogy 도서관에서 회원증 번호 없음을 알림
        throw new Error('Token is missing'); // @description 토큰 누락 에러
        // @reason 토큰 없으면 에러 발생
        // @analogy 도서관에서 회원증 번호 없으면 저장 불가
      }

      // draftId 확인 (이미 상위에서 보장됨)
      if (!draftData.draftId) {
        console.warn(
          'useAutoSaveMutation - Draft ID is missing, but proceeding'
        );
        // @description draftId 누락 경고 로그
        // @reason 상위에서 draftId 생성 보장됨
        // @analogy 도서관에서 책 번호 없음 경고 (이미 확인됨)
      }

      // 요청 취소 컨트롤러 생성
      const controller = new AbortController(); // @type {AbortController} - 요청 취소 컨트롤러
      // @description 요청 취소를 위한 컨트롤러 생성
      // @reason 요청 중단 가능하도록 설정
      // @analogy 도서관에서 우체부에게 중단 신호 준비

      // 타임아웃 설정 (10초)
      const timeoutId = setTimeout(() => {
        controller.abort(); // @description 타임아웃 시 요청 취소
        // @reason 요청이 너무 오래 걸리면 중단
        // @analogy 도서관에서 우체부에게 10분 안에 안 오면 돌아오라고 명령
        console.warn(
          'useAutoSaveMutation - Request timed out after 10 seconds'
        );
        // @description 타임아웃 로그
        // @reason 디버깅
      }, 10000); // @type {number} - 타임아웃 시간 (10초)

      try {
        // axios로 자동저장 요청
        const response = await axios.post<AutoSaveResponse>(
          draftApiPaths.autoSave, // @type {string} - 자동저장 API 경로
          // @description draftApiPaths에서 자동저장 경로 사용
          // @reason 중앙에서 관리된 경로 사용
          // @analogy 도서관에서 책 저장 위치
          draftData, // @type {DraftState} - 전송할 드래프트 데이터
          // @description 저장할 드래프트 데이터
          // @reason 서버에 전송할 데이터
          // @analogy 도서관에서 저장할 책
          {
            headers: {
              Authorization: `Bearer ${token}`, // @type {string} - 인증 헤더
              // @description 토큰을 헤더에 추가
              // @reason 인증된 요청
              // @analogy 도서관에서 회원증 제시
              'Content-Type': 'application/json', // @type {string} - 요청 형식
              // @description JSON 형식으로 요청
              // @reason 데이터 형식 지정
              // @analogy 도서관에서 책 형식 지정
            },
            signal: controller.signal, // @type {AbortSignal} - 요청 취소 신호
            // @description 요청 취소 신호 추가
            // @reason 요청 중단 가능하도록 설정
            // @analogy 도서관에서 우체부에게 중단 신호 연결
          }
        ); // @type {AxiosResponse<AutoSaveResponse>} - axios 응답
        // @description axios로 POST 요청 전송
        // @reason 서버에 드래프트 데이터 저장
        // @analogy 도서관에서 책 저장 요청 보내기

        console.log('useAutoSaveMutation - Mutation response:', response.data); // @description 응답 디버깅 로그
        // @reason 응답 상태 확인
        // @analogy 도서관에서 저장 결과 확인

        return response.data; // @type {AutoSaveResponse} - 응답 데이터 반환
        // @description 서버 응답 반환
        // @reason 상위 함수에서 응답 사용
        // @analogy 도서관에서 저장 확인 메시지 반환
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn(
            'useAutoSaveMutation - Request was canceled:',
            error.message
          );
          // @description 요청 취소 로그
          // @reason 디버깅
          // @analogy 도서관에서 우체부가 중단된 이유 알림
          throw new Error('Request was canceled due to timeout'); // @description 취소 에러
          // @reason 상위로 에러 전달
        }
        console.error('useAutoSaveMutation - Request failed:', error); // @description 요청 실패 로그
        // @reason 디버깅
        // @analogy 도서관에서 책 저장 실패 알림
        throw error; // @description 에러 전달
        // @reason 상위로 에러 전달
      } finally {
        clearTimeout(timeoutId); // @description 타임아웃 정리
        // @reason 리소스 정리
        // @analogy 도서관에서 우체부 명령 정리
      }
    },
    onSuccess: (data) => {
      console.log('useAutoSaveMutation - Auto-save succeeded:', data); // @description 성공 로그
      // @description 성공 상태 디버깅
      // @reason 성공 상태 확인
      // @analogy 도서관에서 책 저장 성공 알림
    },
    onError: (error) => {
      console.error('useAutoSaveMutation - Auto-save failed:', {
        message: error.message,
        stack: error.stack,
      }); // @description 에러 로그
      // @description 실패 상태 디버깅
      // @reason 문제 해결 지원
      // @analogy 도서관에서 책 저장 실패 알림
    },
    onSettled: () => {
      console.log('useAutoSaveMutation - Mutation settled'); // @description 완료 로그
      // @description mutation 완료 디버깅
      // @reason mutation 상태 확인
      // @analogy 도서관에서 저장 작업 완료 알림
    },
  }); // @type {Object} - React Query mutation 객체
  // @description useMutation으로 mutation 정의
  // @reason 비동기 작업 관리
  // @analogy 도서관에서 책 저장 시스템 설정

  // Fallback 처리: mutation 실패 시 기본 동작
  // @description mutation 실행 함수 정의
  // @reason 애플리케이션 충돌 방지
  // @analogy 도서관에서 저장 요청 실행 함수
  const handleAutoSave = (draftData: DraftState) => {
    mutation.mutate(draftData); // @description mutation 실행
    // @reason 자동저장 요청 트리거
    // @analogy 도서관에서 책 저장 요청 실행
  };

  return {
    autoSave: handleAutoSave, // @type {Function} - 자동저장 함수
    // @description 자동저장 실행 함수
    // @reason 컴포넌트에서 자동저장 호출
    isLoading: mutation.isLoading, // @type {boolean} - 로딩 상태
    // @description mutation 로딩 상태
    // @reason UI에서 로딩 표시
    error: mutation.error, // @type {Error | null} - 에러 상태
    // @description mutation 에러 상태
    // @reason 에러 처리
    data: mutation.data, // @type {AutoSaveResponse | undefined} - 응답 데이터
    // @description mutation 응답 데이터
    // @reason 성공 데이터 사용
  }; // @type {Object} - mutation 상태와 함수 반환
  // @description 자동저장 함수와 상태 반환
  // @reason 컴포넌트에서 자동저장 기능 사용 가능
  // @analogy 도서관에서 책 저장 시스템과 상태 반환
}

// **작동 매커니즘**
// 1. `useAuth`로 인증 상태 가져오기: Clerk에서 로그인 상태와 `getToken` 함수 가져옴.
// 2. `DraftState` 타입 사용: `initialDraftState`에서 가져온 드래프트 데이터 타입 사용.
// 3. `AutoSaveResponse` 타입 정의: 서버 응답 데이터 구조 정의.
// 4. `useMutation` 훅 호출: React Query로 자동저장 mutation 정의.
// 5. `getToken`으로 토큰 가져오기: 인증된 요청을 위해 토큰 동적으로 획득.
// 6. `isSignedIn` 및 토큰 검증: 인증되지 않거나 토큰 없으면 에러 발생.
// 7. `AbortController`로 요청 관리: 요청 취소 가능하도록 설정.
// 8. `axios.post`로 요청: 타임아웃과 함께 `draftApiPaths.autoSave` 경로로 데이터 전송.
// 9. `onSuccess`, `onError`, `onSettled` 콜백 정의: mutation 상태 디버깅.
// 10. `handleAutoSave` 함수 정의: mutation 실행.
// 11. `autoSave`, `isLoading`, `error`, `data` 반환: 컴포넌트에서 상태와 함수 사용 가능.
// @reason 자동저장 mutation 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 책을 주기적으로 저장하는 시스템.

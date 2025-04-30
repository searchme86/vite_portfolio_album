/**
 * @file useCheckAuthToken.ts
 * @description 사용자 인증 상태와 토큰을 확인하는 커스텀 훅
 * @location src/hooks/useCheckAuthToken.ts
 */

import { useAuth } from '@clerk/clerk-react'; // @type {Function} - Clerk의 인증 훅
// @description Clerk 인증 상태와 토큰 가져오기
// @reason 인증 상태 관리

import { GetToken } from '@clerk/types'; // @type {Function} - Clerk 토큰 가져오기 타입
// @description 토큰 가져오기 타입 정의
// @reason 타입 안정성 보장

import { useEffect, useState } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 인증 상태 업데이트

// 인증 상태 타입 정의
type userAuthType = {
  isSignedIn: boolean | undefined; // @type {boolean | undefined} - 로그인 상태
  isAuthFetchingLoadingStatus: boolean; // @type {boolean} - 인증 로딩 상태
  token: string | null; // @type {string | null} - 인증 토큰
  getToken: GetToken; // @type {Function} - 토큰 가져오기 함수
  authStatusMessage: string | null; // @type {string | null} - 인증 상태 메시지
};

// 커스텀 훅 정의
export function useCheckAuthToken() {
  // 초기 상태 설정
  // @description 인증 상태 초기값 설정
  // @reason 안전한 초기값 제공
  const initialAuthState: userAuthType = {
    isSignedIn: undefined, // 초기 로그인 상태: 알 수 없음
    token: null, // 초기 토큰: 없음
    isAuthFetchingLoadingStatus: false, // 초기 로딩 상태: false
    getToken: () => Promise.resolve(null), // 초기 토큰 가져오기 함수: null 반환
    authStatusMessage: null, // 초기 메시지: 없음
  };

  const [authState, setAuthState] = useState<userAuthType>(initialAuthState); // @type {userAuthType} - 인증 상태
  // @description 인증 상태 관리
  // @reason 상태 업데이트

  // useAuth 호출
  // @description Clerk의 useAuth로 인증 정보 가져오기
  // @reason 인증 상태와 토큰 접근
  const { getToken, isSignedIn } = useAuth();

  // 인증 상태 업데이트
  useEffect(() => {
    const controller = new AbortController(); // @type {AbortController} - 비동기 작업 취소 컨트롤러
    // @description 비동기 작업 취소 관리
    // @reason StrictMode에서 상태 손상 방지

    // 초기 상태에서 실행 방지
    // @description isSignedIn이 undefined일 경우 초기 실행 방지
    // @reason 불필요한 상태 업데이트 방지
    if (isSignedIn === undefined) {
      return;
    }

    const processAuth = async () => {
      try {
        setAuthState((prevState) => ({
          ...prevState,
          isAuthFetchingLoadingStatus: true, // 로딩 상태 활성화
        }));

        let token: string | null = null;
        let authStatusMessage = '';

        if (isSignedIn) {
          try {
            token = await getToken(); // 토큰 가져오기
            authStatusMessage = '현재 유저가 로그인된 상태입니다.';
          } catch (error) {
            if (controller.signal.aborted) return; // 작업 취소 시 중지
            if (error instanceof Error) {
              console.error('getToken 오류:', error);
              authStatusMessage = error.message;
            }
          }
        } else {
          authStatusMessage =
            '현재 로그인에 실패한 상태입니다. 로그인 상태를 체크해주세요.';
        }

        if (controller.signal.aborted) return; // 작업 취소 시 중지

        setAuthState({
          isSignedIn, // 로그인 상태 업데이트
          token, // 토큰 업데이트
          getToken: getToken ?? (() => Promise.resolve(null)), // 토큰 가져오기 함수 업데이트
          authStatusMessage, // 메시지 업데이트
          isAuthFetchingLoadingStatus: false, // 로딩 상태 비활성화
        });
      } catch (error) {
        if (controller.signal.aborted) return; // 작업 취소 시 중지

        console.error('useCheckAuthToken - processAuth failed:', error);
        setAuthState((prev) => ({
          ...prev,
          authStatusMessage: '인증 처리 중 오류가 발생했습니다.',
          isAuthFetchingLoadingStatus: false,
        }));
      }
    };

    processAuth(); // 인증 처리 실행

    return () => {
      controller.abort(); // @description 컴포넌트 언마운트 시 비동기 작업 취소
      // @reason 상태 업데이트 방지
    };
  }, [isSignedIn, getToken]); // @description isSignedIn, getToken 변경 시 실행
  // @reason 인증 상태 변경 감지

  return authState; // 인증 상태 반환
}

// **작동 매커니즘**
// 1. `useAuth`로 인증 상태 가져오기: Clerk에서 로그인 상태와 토큰 함수 가져옴.
// 2. 초기 상태 설정: 안전한 초기값으로 `useState` 초기화.
// 3. `useEffect`로 인증 처리: `isSignedIn` 변경 시 비동기적으로 토큰 가져오고 상태 업데이트.
// 4. `AbortController`로 비동기 작업 관리: 컴포넌트 언마운트 시 작업 취소.
// 5. `authState` 반환: 로그인 상태, 토큰, 메시지 등을 반환.
// @reason Clerk를 사용하여 인증 상태를 관리하고, 토큰을 안전하게 가져옴.

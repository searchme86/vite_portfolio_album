// src/lib/auth/useSafeAuthToken.js

// ===여기부터 코드 작업시작======
// 1. 안전한 인증 토큰 훅
// 2. Clerk의 useAuth를 안전하게 사용
import { useAuth } from '@clerk/clerk-react';

// 1. useSafeAuthToken 훅 정의
// 2. 인증 토큰을 안전하게 가져오기
export const useSafeAuthToken = () => {
  // 1. 인증 훅 가져오기
  // 2. Clerk의 useAuth 사용
  const { getToken } = useAuth();

  // 1. getToken이 함수인지 확인
  // 2. 오류 방지를 위해 폴백 처리
  const safeGetToken =
    typeof getToken === 'function'
      ? getToken
      : () => {
          console.log('useSafeAuthToken - Fallback getToken called');
          return Promise.resolve('');
        };

  // 1. 콘솔 로그로 초기화 확인
  // 2. 디버깅을 위해 토큰 함수 상태 출력
  console.log('useSafeAuthToken - Initialized safeGetToken');

  // 1. 안전한 토큰 함수 반환
  // 2. 컴포넌트에서 사용 가능
  return safeGetToken;
};
// ===여기부터 코드 작업종료======

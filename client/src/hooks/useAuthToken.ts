// src/hooks/useAuthToken.js
import { useAuth } from '@clerk/clerk-react';

// 1. Clerk 인증 토큰을 가져오는 훅
// 2. useAuth를 사용하여 토큰을 반환
export function useAuthToken() {
  const { getToken } = useAuth(); // 1. useAuth 훅에서 getToken 함수 가져오기
  // 2. Clerk에서 제공하는 토큰 가져오기 함수 사용

  // 1. 토큰을 비동기적으로 가져오는 함수
  // 2. 인터셉터에서 사용할 수 있도록 반환
  const fetchToken = async () => {
    const token = await getToken(); // 1. 토큰 가져오기
    // 2. 비동기적으로 토큰을 반환
    console.log('Fetched token:', token); // 1. 디버깅용 로그
    // 2. 가져온 토큰 확인
    return token;
  };

  return fetchToken; // 1. 토큰 가져오기 함수 반환
  // 2. 다른 곳에서 사용 가능
}

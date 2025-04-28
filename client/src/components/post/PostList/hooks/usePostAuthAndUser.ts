import { useUser, useAuth } from '@clerk/clerk-react'; // @type {Object} - Clerk 훅
// @description Clerk 훅 가져오기
// @reason 사용자 정보와 인증 토큰 관리
// @analogy 도서관에서 사서 정보와 인증 관리 도구 가져오기

/**
 * @file usePostAuthAndUser.js
 * @description PostList 전용 인증 및 사용자 훅
 * @reason 사용자 인증 상태와 토큰 가져오기
 * @analogy 도서관에서 사서의 상태와 인증 도구 준비
 * @returns {{ isLoaded: boolean, isSignedIn: boolean, user: Object | null, getToken: Function }} - 인증 및 사용자 상태
 */
export const usePostAuthAndUser = () => {
  const { isLoaded, isSignedIn, user } = useUser(); // @type {{ isLoaded: boolean, isSignedIn: boolean, user: Object | null }} - Clerk 사용자 상태
  // @description Clerk 사용자 상태 가져오기
  // @reason 인증 상태에 따라 데이터 페칭 제어
  // @analogy 도서관에서 사서가 로그인했는지 확인

  const { getToken } = useAuth(); // @type {{ getToken: Function }} - Clerk의 useAuth 훅
  // @description Clerk의 useAuth 훅에서 getToken 메서드 가져오기
  // @reason 세션 토큰을 가져오기 위해 사용
  // @analogy 도서관에서 인증 관리자를 통해 인증 키 가져오기

  console.log('usePostAuthAndUser - Clerk State:', { isLoaded, isSignedIn }); // @description Clerk 상태 로깅
  // @reason 디버깅
  // @analogy 도서관에서 사서 상태 기록

  return { isLoaded, isSignedIn, user, getToken }; // @description 인증 및 사용자 상태 반환
  // @reason PostList에서 사용
  // @analogy 도서관에서 사서 상태와 인증 도구 반환
};

/**
 * @file usePostFetchToken.js
 * @description PostList 전용 토큰 페칭 훅
 * @reason 사용자 토큰을 페칭하고 Zustand 스토어에 저장
 * @analogy 도서관에서 사서의 인증 키 발급
 * @param {Object} params - 훅 매개변수
 * @param {boolean} params.isLoaded - Clerk 로딩 상태
 * @param {Object | null} params.user - Clerk 사용자 객체
 * @param {Function} params.getToken - 토큰 가져오기 함수
 * @returns {{ token: string | null, setToken: Function, postsData: { pages: Array<Array>, pageParams: Array<number> } | null }} - 토큰 및 포스트 데이터
 */
import { useEffect } from 'react'; // @type {Function} - React 훅
// @description useEffect 훅 가져오기
// @reason 사이드 이펙트 처리
// @analogy 도서관에서 인증 키 발급 작업 준비

// import { usePostStore } from '../../../../stores/post/postStore'; // @type {Object} - Zustand 스토어
import { usePostStore } from '@/stores/post/postStore';
// @description Zustand 스토어 가져오기
// @reason 상태 관리와 상태 업데이트
// @analogy 도서관에서 장부 관리 시스템 가져오기

export const usePostFetchToken = ({ isLoaded, user, getToken }) => {
  const token = usePostStore((state) => state.getToken()); // @type {string | null} - 사용자 토큰
  // @description Zustand 스토어에서 사용자 토큰 가져오기
  // @reason API 요청 시 인증 헤더에 사용
  // @analogy 도서관에서 인증 키 확인

  const postsData = usePostStore((state) => state.getPostsData()); // @type {{ pages: Array<Array>, pageParams: Array<number> } | null} - 포스트 데이터
  // @description Zustand 스토어에서 포스트 데이터 가져오기
  // @reason 포스트 목록 렌더링에 사용
  // @analogy 도서관에서 책 목록 확인

  const setToken = usePostStore((state) => state.setToken); // @type {Function} - 토큰 설정 함수
  // @description Zustand 스토어에서 토큰 설정 함수 가져오기
  // @reason 사용자 토큰 저장 및 업데이트
  // @analogy 도서관에서 인증 키 저장

  useEffect(() => {
    // @description 사용자 토큰 가져오기
    // @reason API 요청 시 인증에 필요
    // @analogy 도서관에서 사서 인증 키 발급
    const fetchToken = async () => {
      if (isLoaded && user) {
        try {
          const fetchedToken = await getToken(); // @type {string} - 세션 토큰
          // @description getToken으로 세션 토큰 가져오기
          // @reason Clerk SDK의 최신 방식으로 세션 토큰 가져오기
          // @analogy 도서관에서 인증 관리자를 통해 인증 키 가져오기
          setToken(fetchedToken); // @description Zustand 스토어에 토큰 저장
          // @reason 이후 API 요청에서 사용
          // @analogy 도서관에서 인증 키 저장
        } catch (error) {
          console.error(
            'usePostFetchToken - Failed to fetch token:',
            error.message
          ); // @description 토큰 페칭 실패 로깅
          // @reason 디버깅: 에러 원인 확인
          // @analogy 도서관에서 인증 키 발급 실패 기록
          setToken(null); // @description 실패 시 토큰 초기화
          // @reason 잘못된 토큰 사용 방지
          // @analogy 도서관에서 인증 키 초기화
        }
      } else {
        setToken(null); // @description 로딩 중이거나 사용자 없으면 토큰 초기화
        // @reason 인증 불가 시 토큰 없음
        // @analogy 도서관에서 사서 없으면 인증 키 초기화
      }
    };

    fetchToken(); // @description 토큰 페칭 실행
    // @reason 컴포넌트 마운트 또는 의존성 변경 시 실행
    // @analogy 도서관에서 인증 시작
  }, [isLoaded, user, getToken, setToken]); // @type {Array} - 의존성 배열
  // @description 의존성 배열
  // @reason isLoaded, user, getToken, setToken 변경 시 토큰 갱신
  // @analogy 도서관에서 사서 상태 변경 시 인증 키 갱신

  useEffect(() => {
    if (token) {
      // 간단한 토큰 형식 검증 (예: JWT 형식 확인)
      const isValidToken =
        typeof token === 'string' && token.split('.').length === 3; // @type {boolean} - 토큰 유효성
      // @description 토큰이 문자열이고 JWT 형식인지 확인 (3개의 점으로 구분된 구조)
      // @reason 유효하지 않은 토큰으로 API 요청 방지
      // @analogy 도서관에서 인증 키 형식이 맞는지 확인
      if (!isValidToken) {
        console.error('usePostFetchToken - Invalid token format:', token); // @description 유효하지 않은 토큰 로깅
        // @reason 디버깅: 토큰 형식 문제 확인
        // @analogy 도서관에서 잘못된 인증 키 기록
        setToken(null); // @description 유효하지 않으면 토큰 초기화
        // @reason 잘못된 토큰 사용 방지
        // @analogy 도서관에서 잘못된 인증 키 폐기
      }
    }
  }, [token, setToken]); // @type {Array} - 의존성 배열
  // @description 토큰 변경 시 실행
  // @reason 토큰 유효성 검사
  // @analogy 도서관에서 인증 키 변경 시 확인

  return { token, setToken, postsData }; // @description 토큰 및 포스트 데이터 반환
  // @reason PostList에서 사용
  // @analogy 도서관에서 인증 키와 책 목록 반환
};

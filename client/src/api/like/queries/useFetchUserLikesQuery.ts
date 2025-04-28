/**
 * @file useFetchUserLikesQuery.js
 * @description 사용자별 좋아요 데이터를 페칭하는 React Query 훅
 * @reason 서버에서 사용자별 좋아요 데이터 가져오기 및 캐싱
 * @analogy 도서관에서 손님별 대여 기록 가져오기
 */
import { useQuery } from '@tanstack/react-query'; // @type {Function} - React Query 훅
// @description React Query의 useQuery 훅 가져오기
// @reason 데이터 페칭 및 캐싱
// @analogy 도서관에서 대여 기록 가져오기 및 캐싱

import { axiosGetUserLikes } from '../axios/axiosGetUserLikes.js'; // @type {Function} - 사용자별 좋아요 데이터 페칭 함수
// @description 사용자별 좋아요 데이터 페칭 함수 가져오기
// @reason 서버와 통신
// @analogy 도서관에서 대여 기록 서버와 통신

/**
 * @param {string} token - 인증 토큰
 * @param {string} userId - 사용자 ID
 * @param {string} sessionId - 세션 ID
 * @returns {{ data: Array, isLoading: boolean, error: Error|null }} - 사용자별 좋아요 데이터와 상태
 */
export const useFetchUserLikesQuery = (token, userId, sessionId) => {
  return useQuery({
    queryKey: ['userLikes', token, userId, sessionId], // @type {Array} - 쿼리 키
    // @description 쿼리 캐싱 키, 토큰과 userId, sessionId에 따라 캐싱
    // @reason 동일한 인증 정보로 동일 데이터 캐싱
    // @analogy 도서관에서 동일 손님의 대여 기록 캐싱
    queryFn: () => axiosGetUserLikes(token, userId, sessionId), // @type {Function} - 데이터 페칭 함수
    // @description 서버에서 좋아요 데이터 페칭, userId와 sessionId 전달
    // @reason 서버 요구사항 충족
    // @analogy 도서관에서 대여 기록 가져오기
    enabled: !!(token && userId && sessionId), // @type {boolean} - 쿼리 실행 조건
    // @description 토큰과 userId, sessionId가 모두 있을 때만 쿼리 실행
    // @reason 인증 정보 없으면 페칭 방지
    // @analogy 도서관에서 모든 인증 정보 없으면 요청 안 함
    staleTime: 5 * 60 * 1000, // @type {number} - 캐시 유효 시간 (5분)
    // @description 데이터가 신선한 상태로 유지되는 시간
    // @reason 자주 변하지 않는 데이터 캐싱
    // @analogy 도서관에서 대여 기록 5분간 캐싱
    retry: 1, // @type {number} - 재시도 횟수
    // @description 실패 시 재시도 횟수 제한
    // @reason 무한 재시도 방지 및 리소스 낭비 감소
    // @analogy 도서관에서 요청 실패 시 1번만 재시도
    retryDelay: 1000, // @type {number} - 재시도 간격 (1초)
    // @description 재시도 전 대기 시간
    // @reason 서버 부하 방지
    // @analogy 도서관에서 재시도 전 잠시 대기
    onError: (error) => {
      console.error('useFetchUserLikesQuery - Error:', {
        message: error.message,
        stack: error.stack,
      }); // @description 상세 에러 로깅
      // @reason 디버깅: 에러 원인 확인
      // @analogy 도서관에서 실패 원인 기록
    },
  });
};

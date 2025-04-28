/**
 * @file axiosGetUserLikes.js
 * @description 사용자별 좋아요 데이터를 가져오는 axios 함수
 * @reason 서버에서 사용자별 좋아요 데이터 조회
 * @analogy 도서관에서 손님별 대여 기록 서버와 통신
 */
import axios from 'axios'; // @type {Object} - HTTP 요청 라이브러리
// @description axios 라이브러리 가져오기
// @reason 서버와의 HTTP 요청
// @analogy 도서관에서 서버와 통신

import { likeApiPaths } from './likeApiPaths.js'; // @type {Object} - 좋아요 API 경로
// @description 좋아요 API 경로 가져오기
// @reason 중앙에서 관리된 경로 사용
// @analogy 도서관에서 주소록 참조

/**
 * @param {string} token - 인증 토큰
 * @param {string} userId - 사용자 ID
 * @param {string} sessionId - 세션 ID
 * @returns {Promise<Array>} - 사용자별 좋아요 데이터
 */
export const axiosGetUserLikes = async (token, userId, sessionId) => {
  if (!token) {
    throw new Error('Token is required to fetch user likes'); // @type {Error} - 토큰 누락 에러
    // @description 토큰이 없으면 에러 발생
    // @reason 인증 필요
    // @analogy 도서관에서 인증 키 없으면 요청 거부
  }

  if (!userId || !sessionId) {
    throw new Error('userId and sessionId are required to fetch user likes'); // @type {Error} - userId와 sessionId 누락 에러
    // @description userId와 sessionId가 없으면 에러 발생
    // @reason 서버 요구사항 충족
    // @analogy 도서관에서 손님 이름과 예약 번호 없으면 요청 거부
  }

  try {
    const response = await axios.get('http://localhost:3000/like/user', {
      headers: { Authorization: `Bearer ${token}` }, // @type {Object} - 인증 헤더
      // @description 요청에 토큰 추가
      // @reason 인증된 요청
      // @analogy 도서관에서 인증 키로 요청
      params: { userId, sessionId }, // @type {Object} - 쿼리 매개변수
      // @description userId와 sessionId를 쿼리 매개변수로 전달
      // @reason 서버가 요구하는 인증 정보 제공
      // @analogy 도서관에서 손님 이름과 예약 번호 제출
    });

    if (!response.data.success) {
      throw new Error(
        response.data.message || 'Failed to fetch user likes' // @type {Error} - 서버 응답 에러
        // @description 서버 응답 실패 시 에러 발생
        // @reason 클라이언트에 실패 전달
        // @analogy 도서관에서 서버 요청 실패 시 손님에게 알림
      );
    }

    return response.data.data; // @type {Array} - 사용자별 좋아요 데이터
    // @description 서버에서 받은 좋아요 데이터 반환
    // @reason 컴포넌트에서 사용
    // @analogy 도서관에서 대여 정보 반환
  } catch (error) {
    console.error('axiosGetUserLikes - Detailed Error:', {
      message: error.message,
      response: error.response
        ? {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
          }
        : 'No response received',
      request: error.request ? error.request : 'No request info available',
    }); // @description 상세 에러 로깅
    // @reason 디버깅: 에러 원인 확인
    // @analogy 도서관에서 실패 원인 상세 기록
    throw error; // @description 에러 상위로 전파
    // @reason 상위 컴포넌트에서 에러 처리
    // @analogy 도서관에서 실패 사유 상위로 보고
  }
};

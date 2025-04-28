/**
 * @file axiosToggleLikeForGuest.js
 * @description 비로그인 유저를 위한 좋아요 토글 API 호출
 * @reason 비로그인 유저의 좋아요 상태를 백엔드와 동기화
 * @analogy 도서관에서 임시 손님의 대여 요청을 서버에 전달
 */
import axios from 'axios'; // @type {Object} - Axios 라이브러리
// @description Axios 라이브러리 가져오기
// @reason HTTP 요청 처리
// @analogy 도서관에서 서버와 통신하기 위한 전화기

export const axiosToggleLikeForGuest = async (postId, token) => {
  console.log('axiosToggleLikeForGuest - Request initiated:', {
    postId,
    token,
  }); // @description 요청 시작 로깅
  // @reason 디버깅
  // @analogy 도서관에서 서버 요청 시작 확인

  try {
    const response = await axios.post(
      `http://localhost:3000/like/toggle-guest/${postId}`, // @type {string} - API 엔드포인트
      // @description 비로그인 유저용 좋아요 토글 API 엔드포인트
      // @reason 특정 포스트의 좋아요 상태 변경
      // @analogy 도서관에서 특정 책의 대여 상태를 변경하는 요청
      {},
      {
        withCredentials: true, // @type {boolean} - 쿠키 포함 설정
        // @description HttpOnly 쿠키로 sessionId 전달
        // @reason 비로그인 유저 인증
        // @analogy 도서관에서 임시 손님의 신분증을 쿠키로 전달
      }
    );

    console.log('axiosToggleLikeForGuest - Response:', response.data); // @description 응답 로깅
    // @reason 디버깅, 응답 확인
    // @analogy 도서관에서 서버 응답 확인

    return response.data; // @type {Object} - API 응답 데이터
    // @description API 응답 데이터 반환
    // @reason 상위 함수에서 응답 사용
    // @analogy 도서관에서 서버 응답을 손님에게 전달
  } catch (error) {
    console.error('axiosToggleLikeForGuest - Request failed:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null,
    }); // @description 요청 실패 로깅
    // @reason 디버깅, 에러 상세 확인
    // @analogy 도서관에서 서버 요청 실패 기록
    throw error; // @description 에러 전파
    // @reason 상위 함수에서 에러 처리
    // @analogy 도서관에서 실패 원인을 상위 관리자에게 전달
  }
};

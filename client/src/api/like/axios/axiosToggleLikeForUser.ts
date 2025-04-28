/**
 * @file axiosToggleLikeForUser.js
 * @description 좋아요 토글 API 호출
 * @reason 좋아요 상태를 백엔드와 동기화
 * @analogy 도서관에서 손님의 대여 요청을 서버에 전달
 */
import axios from 'axios'; // @type {Object} - Axios 라이브러리
// @description Axios 라이브러리 가져오기
// @reason HTTP 요청 처리
// @analogy 도서관에서 서버와 통신하기 위한 전화기

export const axiosToggleLikeForUser = async (postId, token) => {
  console.log('axiosToggleLikeForUser - Request initiated:', { postId, token }); // @description 요청 시작 로깅
  // @reason 디버깅
  // @analogy 도서관에서 서버 요청 시작 확인

  // 여기부터 시작===
  // <!---여기수정
  // 의미: token이 누락되었는지 확인
  // 이유: 인증 실패 방지
  // 비유: 도서관에서 회원증 번호가 누락되었는지 확인
  if (!token) {
    console.error('axiosToggleLikeForUser - Token is missing'); // @description 토큰 누락 디버깅
    // @reason 문제 원인 추적
    // @analogy 도서관에서 회원증 번호 누락 기록
    throw new Error('Authentication token is missing'); // @description 에러 발생
    // @reason 상위 함수에서 에러 처리
    // @analogy 도서관에서 회원증 없음을 알림
  }
  // 여기부터 끝===

  try {
    const response = await axios.post(
      `http://localhost:3000/like/toggle`, // @type {string} - API 엔드포인트
      // @description 좋아요 토글 API 엔드포인트
      // @reason 백엔드 라우터와 일치
      // @analogy 도서관에서 특정 책의 대여 상태를 변경하는 요청
      { postId }, // @type {Object} - 요청 바디
      // @description postId를 요청 바디로 전달
      // @reason 백엔드에서 postId를 바디에서 추출
      // @analogy 도서관에서 대여 요청서에 책 번호를 작성
      {
        headers: {
          Authorization: `Bearer ${token}`, // @type {string} - 인증 헤더
          // @description 요청에 인증 토큰 추가
          // @reason 로그인 유저 인증
          // @analogy 도서관에서 회원증 번호를 서버에 전달
        },
      }
    );

    console.log('axiosToggleLikeForUser - Response:', response.data); // @description 응답 로깅
    // @reason 디버깅, 응답 확인
    // @analogy 도서관에서 서버 응답 확인

    return response.data; // @type {Object} - API 응답 데이터
    // @description API 응답 데이터 반환
    // @reason 상위 함수에서 응답 사용
    // @analogy 도서관에서 서버 응답을 손님에게 전달
  } catch (error) {
    // 여기부터 시작===
    // <!---여기수정
    // 의미: 더 구체적인 에러 로깅 추가
    // 이유: 에러 원인 파악
    // 비유: 도서관에서 실패 원인을 더 자세히 기록
    console.error('axiosToggleLikeForUser - Request failed:', {
      message: error.message,
      stack: error.stack,
      response: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    }); // @description 요청 실패 로깅
    // @reason 디버깅, 에러 상세 확인
    // @analogy 도서관에서 서버 요청 실패 기록
    // 여기부터 끝===

    throw error; // @description 에러 전파
    // @reason 상위 함수에서 에러 처리
    // @analogy 도서관에서 실패 원인을 상위 관리자에게 전달
  }
};

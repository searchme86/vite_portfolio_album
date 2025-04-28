// src/api/like/axios/axiosToggleLike.js

import axios from 'axios'; // 의미: Axios 라이브러리 가져오기
// 이유: HTTP 요청 처리
// 비유: 도서관에서 대출 요청을 보내는 우체부

// 의미: 좋아요 토글 함수
// 이유: 포스트의 좋아요 상태를 변경 요청
// 비유: 도서관에서 책 대출/반납 요청
export const axiosToggleLike = async (postId, token) => {
  console.log('axiosToggleLike - Request params:', { postId, token }); // 의미: 요청 파라미터 디버깅
  // 이유: 요청 데이터 확인
  // 비유: 대출 요청 정보 확인 로그

  try {
    // 여기부터 시작===
    // <!---여기수정
    const response = await axios.post(
      `http://localhost:3000/like/toggle`, // 의미: 좋아요 토글 엔드포인트 URL
      // 이유: 백엔드와 통신
      // 비유: 도서관 대출 창구로 요청
      { postId }, // 의미: 요청 바디에 postId만 전달
      // 이유: 백엔드에서 userId를 요청 객체에서 추출하도록 변경
      // 비유: 대출 요청 시 책 ID만 전달
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined, // 의미: 인증 토큰 추가, 없으면 생략
          // 이유: 로그인 유저 인증, 비로그인 시 생략
          // 비유: 회원증 코드로 인증, 없으면 임시 손님으로 처리
        },
        withCredentials: true, // 의미: 쿠키를 요청에 포함
        // 이유: 비로그인 유저의 sessionId 쿠키를 백엔드로 전달
        // 비유: 임시 회원증을 요청과 함께 전달
      }
    );
    // 여기부터 끝===

    console.log('axiosToggleLike - Response:', response.data); // 의미: 응답 디버깅
    // 이유: 응답 데이터 확인
    // 비유: 대출 요청 결과 확인 로그

    return response.data; // 의미: 응답 데이터 반환
    // 이유: 컴포넌트에서 사용
    // 비유: 대출 결과 반환
  } catch (error) {
    console.error('axiosToggleLike - Error for post', postId, ':', error); // 의미: 에러 디버깅
    // 이유: 문제 원인 추적
    // 비유: 대출 실패 원인 로그

    throw new Error(error.response?.data?.message || 'Failed to toggle like'); // 의미: 에러 메시지 전달
    // 이유: 사용자에게 실패 원인 전달
    // 비유: 손님에게 대출 실패 이유 안내
  }
};

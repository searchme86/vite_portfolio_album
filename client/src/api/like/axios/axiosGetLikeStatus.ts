// src/api/like/axios/axiosGetLikeStatus.js

import axios from 'axios'; // 의미: Axios 라이브러리 가져오기
// 이유: HTTP 요청 처리
// 비유: 도서관에서 대출 상태 확인 요청을 보내는 우체부

// 의미: 좋아요 상태 조회 함수
// 이유: 포스트의 좋아요 상태 확인 요청
// 비유: 도서관에서 책 대출 상태 확인 요청
export const axiosGetLikeStatus = async (postId, token) => {
  try {
    // 여기부터 시작===
    // <!---여기수정
    const response = await axios.get(
      `http://localhost:3000/like/${postId}/status`, // 의미: 좋아요 상태 조회 엔드포인트 URL
      // 이유: 백엔드와 통신
      // 비유: 도서관 대출 상태 확인 창구로 요청
      {
        headers: {
          Authorization: `Bearer ${token}`, // 의미: 인증 토큰 추가
          // 이유: 로그인 유저 인증
          // 비유: 회원증 코드로 인증
        },
      }
    );
    // 여기부터 끝===

    console.log('axiosGetLikeStatus - Response:', response.data); // 의미: 응답 디버깅
    // 이유: 응답 데이터 확인
    // 비유: 대출 상태 확인 결과 로그

    return response.data; // 의미: 응답 데이터 반환
    // 이유: 컴포넌트에서 사용
    // 비유: 대출 상태 결과 반환
  } catch (error) {
    console.error('axiosGetLikeStatus - Error for post', postId, ':', error); // 의미: 에러 디버깅
    // 이유: 문제 원인 추적
    // 비유: 대출 상태 확인 실패 로그

    throw error; // 의미: 에러 전달
    // 이유: 호출자에게 에러 전달
    // 비유: 실패 원인을 손님에게 전달
  }
};

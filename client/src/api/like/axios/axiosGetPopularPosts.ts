// src/api/like/axios/axiosGetPopularPosts.js

import axios from 'axios'; // 의미: Axios 라이브러리 가져오기
// 이유: HTTP 요청 처리
// 비유: 도서관에서 데이터를 주고받는 통신 도구

// 의미: 인기 포스트 조회 API 함수
// 이유: 백엔드에서 인기 포스트 가져오기
// 비유: 도서관에서 인기 책 목록 요청
export const axiosGetPopularPosts = async (page = 1, limit = 5, token) => {
  try {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } } // 의미: 인증 토큰이 있으면 헤더에 추가
      : // 이유: 로그인 유저의 요청 인증
        // 비유: 회원증 코드로 인증
        {}; // 의미: 토큰이 없으면 빈 설정
    // 이유: 비로그인 유저도 요청 가능
    // 비유: 임시 손님도 확인 가능

    const response = await axios.get(
      `http://localhost:3000/like/popular?page=${page}&limit=${limit}`,
      config
    ); // 의미: 인기 포스트 조회 요청
    // 이유: 백엔드에서 인기 포스트 목록 가져오기
    // 비유: 도서관에서 인기 책 목록 요청

    console.log('axiosGetPopularPosts - Raw response:', response.data); // 의미: 원시 응답 데이터 디버깅
    // 이유: 응답 확인
    // 비유: 도서관에서 받은 원본 책 목록 확인 로그

    const backendData = response.data.data; // 의미: 응답에서 data 객체 추출
    // 이유: 백엔드 응답 구조에 맞게 데이터 접근
    // 비유: 도서관 응답에서 실제 책 목록 부분 추출

    // 여기부터 시작===
    // <!---여기수정
    const formattedData = {
      posts: backendData.posts || [], // 의미: posts 필드가 없으면 빈 배열로 설정
      // 이유: 프론트엔드에서 기대하는 구조로 변환
      // 비유: 책 목록이 없으면 빈 목록으로 처리
      totalPosts: backendData.totalPopularPosts || 0, // 의미: totalPopularPosts를 totalPosts로 매핑
      // 이유: 프론트엔드에서 기대하는 필드명으로 변경
      // 비유: 도서관의 "인기 책 총 개수"를 "총 책 개수"로 이름 변경
      hasMore: backendData.hasMore || false, // 의미: hasMore 필드가 없으면 false로 설정
      // 이유: 프론트엔드에서 기대하는 구조로 변환
      // 비유: 더 가져올 책이 없으면 false로 설정
    };

    console.log('axiosGetPopularPosts - Formatted response:', formattedData); // 의미: 변환된 응답 데이터 디버깅
    // 이유: 변환 결과 확인
    // 비유: 변환된 책 목록 확인 로그

    return formattedData; // 의미: 변환된 데이터 반환
    // 이유: 컴포넌트에서 사용
    // 비유: 손님에게 최종 책 목록 반환
    // 여기부터 끝===
  } catch (error) {
    console.error('axiosGetPopularPosts - Error:', error); // 의미: 에러 디버깅
    // 이유: 문제 원인 추적
    // 비유: 인기 책 목록 요청 실패 로그
    throw error; // 의미: 에러 전파
    // 이유: 상위 컴포넌트에서 에러 처리
    // 비유: 인기 책 목록 요청 실패 문제 알림
  }
};

// src/api/like/axios/axiosGetPosts.js

import axios from 'axios'; // 의미: Axios 라이브러리 가져오기
// 이유: HTTP 요청 처리
// 비유: 도서관에서 책 목록을 요청하는 메신저

// 의미: 포스트 목록 조회 함수 정의
// 이유: 백엔드에서 포스트 데이터를 가져오기
// 비유: 도서관에서 책 목록을 요청
export const axiosGetPosts = async (page, limit, token) => {
  console.log('axiosGetPosts - Request params:', { page, limit, token }); // 의미: 요청 파라미터 디버깅
  // 이유: 전달된 파라미터 확인
  // 비유: 도서관에 요청한 페이지와 책 개수 확인 로그

  // 의미: 요청 URL 생성
  // 이유: 백엔드 엔드포인트에 맞는 URL 구성
  // 비유: 도서관에서 책 목록을 요청할 정확한 주소 작성
  const url = `http://localhost:3000/posts?page=${page}&limit=${limit}`;
  console.log('axiosGetPosts - Constructed URL:', url); // 의미: 생성된 URL 디버깅
  // 이유: URL 확인
  // 비유: 도서관 주소 확인 로그

  try {
    // 의미: 백엔드에 GET 요청 전송
    // 이유: 포스트 데이터 조회
    // 비유: 도서관에 책 목록 요청 보내기
    const response = await axios.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}, // 의미: 인증 토큰 헤더 추가 (토큰이 있을 경우)
      // 이유: 인증된 요청임을 보장
      // 비유: 손님의 회원증을 보여줌 (회원증이 있을 경우에만)
    });

    console.log('axiosGetPosts - Response:', response.data); // 의미: 응답 데이터 디버깅
    // 이유: 응답 데이터 확인
    // 비유: 도서관에서 받은 책 목록 확인 로그

    // 의미: 응답 데이터 구조 분해 및 검증
    // 이유: 백엔드 응답이 예상된 형식이 맞는지 확인
    // 비유: 도서관에서 받은 책 목록이 제대로 된 형식인지 확인
    const { data } = response;
    if (!data || !data.posts) {
      throw new Error('Invalid response structure');
    }
    return data; // 의미: 응답 데이터 반환
    // 이유: 훅에서 사용
    // 비유: 손님에게 책 목록 전달
  } catch (error) {
    console.error('axiosGetPosts - Error:', error); // 의미: 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 책 목록 요청 실패 시 문제 기록
    throw error; // 의미: 에러抛出
    // 이유: 상위 컴포넌트에서 에러 처리
    // 비유: 손님에게 문제 발생 알림
  }
};

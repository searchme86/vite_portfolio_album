// api/interceptor/combineInterceptors.js

import { requestInterceptors } from './requestInterceptors'; // 의미: 요청 인터셉터 가져오기
// 이유: 요청 인터셉터 적용
// 비유: 도서관에서 요청서 처리 직원 호출

import { responseInterceptors } from './responseInterceptors'; // 의미: 응답 인터셉터 가져오기
// 이유: 응답 에러 처리 인터셉터 적용
// 비유: 도서관에서 요청 결과 처리 직원 호출

// 여기부터 시작===
// 의미: 모든 인터셉터를 결합하여 Axios 인스턴스에 적용, safeGetToken 인자 제거
// 이유: 인증 토큰을 직접 헤더에 추가하므로 인터셉터에서 처리하지 않음
// 비유: 도서관에서 요청서 처리와 결과 처리 직원을 배치, 회원증 확인은 별도로 진행
export const combineInterceptors = (axiosInstance) => {
  requestInterceptors(axiosInstance); // 의미: 요청 인터셉터 적용 <!---여기수정
  // 이유: 인증 토큰 추가 로직 제거
  // 비유: 도서관에서 요청서 처리 작업 배치

  responseInterceptors(axiosInstance); // 의미: 응답 인터셉터 적용
  // 이유: 응답 에러 처리
  // 비유: 도서관에서 요청 결과 처리 작업 배치
};
// 여기부터 끝===

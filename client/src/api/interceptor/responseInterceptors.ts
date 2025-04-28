// src/api/interceptor/responseInterceptors.js

import { handleApiError } from '../like/utils/handleErrorUtil'; // 의미: 에러 처리 유틸 가져오기
// 이유: 에러 메시지 변환
// 비유: 도서관에서 에러를 손님에게 친화적으로 설명

// 여기부터 시작===
import { handleNetworkError } from '../utils/networkStatusUtil'; // 의미: 네트워크 에러 처리 유틸 가져오기 <!---여기추가
// 이유: 네트워크 에러 및 메시지 커스터마이징
// 비유: 도서관에서 네트워크 상태 확인 및 에러 메시지 전달
// 여기부터 끝===

// 의미: 응답 인터셉터를 정의하는 함수
// 이유: 모든 API 응답 후 공통 로직 추가
// 비유: 도서관에서 모든 요청서 처리 후 결과를 손님에게 전달
export const responseInterceptors = (instance) => {
  instance.interceptors.response.use(
    (response) => {
      console.log('Response Interceptor - Success:', {
        url: response.config.url, // 의미: 응답 URL 로깅
        // 이유: 어떤 요청에 대한 응답인지 확인
        // 비유: 도서관에서 처리된 요청서의 책 정보 기록
        status: response.status, // 의미: 응답 상태 코드 로깅
        // 이유: 응답 상태 확인
        // 비유: 도서관에서 요청 처리 성공 여부 기록
        data: response.data, // 의미: 응답 데이터 로깅
        // 이유: 반환된 데이터 확인
        // 비유: 도서관에서 손님에게 전달된 결과 기록
      });

      return response; // 의미: 성공 응답 반환
      // 이유: 요청 성공 시 상위 로직으로 전달
      // 비유: 도서관에서 요청 처리 결과를 손님에게 전달
    },
    (error) => {
      console.error('Response Interceptor - Error:', {
        url: error.config?.url, // 의미: 에러 발생 요청 URL 로깅
        // 이유: 어떤 요청에서 에러가 발생했는지 확인
        // 비유: 도서관에서 에러가 발생한 요청서의 책 정보 기록
        status: error.response?.status, // 의미: 에러 상태 코드 로깅
        // 이유: 에러 상태 확인
        // 비유: 도서관에서 에러 원인 기록
        message: error.message, // 의미: 에러 메시지 로깅
        // 이유: 에러 세부 사항 확인
        // 비유: 도서관에서 에러 세부 사항 기록
      });

      // 여기부터 시작===
      const networkError = handleNetworkError(error); // 의미: 네트워크 에러 처리 및 메시지 커스터마이징 <!---여기수정
      // 이유: 네트워크 연결 문제 및 다양한 에러 상황에 따른 피드백 제공
      // 비유: 도서관에서 네트워크 상태 확인 및 에러 메시지 전달

      if (error.response?.status === 401) {
        return Promise.reject(
          new Error('Authentication failed: Session expired')
        ); // 의미: 401 에러 반환
        // 이유: 컴포넌트에서 인증 실패 처리
        // 비유: 도서관에서 손님에게 세션 만료를 알리고 추가 처리를 위임
      }

      return Promise.reject(networkError); // 의미: 네트워크 에러 반환 <!---여기수정
      // 이유: 상위 로직에서 네트워크 에러 처리
      // 비유: 도서관에서 손님에게 네트워크 에러 알림
      // 여기부터 끝===
    }
  );
};

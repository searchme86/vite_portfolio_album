// src/api/interceptor/requestInterceptors.js

import { axiosGetCsrfToken } from '../axios/axiosGetCsrfToken'; // 의미: CSRF 토큰 가져오기
// 이유: 요청 보안 강화
// 비유: 도서관에서 요청서 제출 시 신분증 확인
import { axiosGetSessionId } from '../axios/axiosGetSessionId'; // 의미: 세션 ID 가져오기
// 이유: 사용자 세션 확인
// 비유: 도서관에서 손님의 방문 기록 확인
import { axiosVerifySession } from '../axios/axiosVerifySession'; // 의미: 세션 유효성 검증
// 이유: 세션 만료 여부 확인
// 비유: 도서관에서 손님의 방문 기록 유효성 확인
import { handleAuthFailure } from '../utils/handleAuthFailureUtil'; // 의미: 인증 실패 처리
// 이유: 인증 실패 시 처리 로직
// 비유: 도서관에서 인증 실패 시 대응
import { cancelRequest } from '../utils/cancelRequestUtil'; // 의미: 요청 취소 유틸
// 이유: 중복 요청 방지
// 비유: 도서관에서 중복된 요청서 취소
import { getServerSession } from '../utils/serverSessionUtil'; // 의미: 서버 세션 가져오기
// 이유: 서버 세션 확인
// 비유: 도서관에서 서버 기록 확인

// 의미: 요청 인터셉터를 정의하는 함수
// 이유: 모든 API 요청 전 공통 로직 추가
// 비유: 도서관에서 모든 요청서 처리 전 확인 절차
export const requestInterceptors = (instance) => {
  instance.interceptors.request.use(
    async (config) => {
      // 여기부터 시작=== <!---여기수정
      // console.log(`Request Interceptro[unkown]- config,,,`, config); // 의미: 요청 정보 로깅 제거
      // 이유: 무한 로그 방지
      // 비유: 도서관에서 불필요한 요청 기록 중지
      // 여기부터 끝===

      const sessionId = await axiosGetSessionId(); // 의미: 세션 ID 가져오기
      // 이유: 요청에 세션 ID 추가
      // 비유: 도서관에서 손님의 방문 기록 확인

      if (sessionId) {
        config.headers['X-Session-Id'] = sessionId; // 의미: 세션 ID를 헤더에 추가
        // 이유: 서버에서 세션 확인
        // 비유: 도서관에서 요청서에 손님 ID 추가
      }

      const serverSession = await getServerSession(); // 의미: 서버 세션 가져오기
      // 이유: 서버 세션 확인
      // 비유: 도서관에서 서버 기록 확인

      if (serverSession) {
        const sessionValid = await axiosVerifySession(serverSession); // 의미: 세션 유효성 검증
        // 이유: 세션 만료 여부 확인
        // 비유: 도서관에서 손님의 방문 기록 유효성 확인
        if (!sessionValid) {
          handleAuthFailure(); // 의미: 인증 실패 처리
          // 이유: 세션이 유효하지 않을 경우 처리
          // 비유: 도서관에서 인증 실패 시 대응
          cancelRequest(config); // 의미: 요청 취소
          // 이유: 유효하지 않은 세션으로 요청 방지
          // 비유: 도서관에서 잘못된 요청서 취소
          return Promise.reject(new Error('Session invalid'));
        }
      }

      const token = await axiosGetCsrfToken(); // 의미: CSRF 토큰 가져오기
      // 이유: 요청 보안 강화
      // 비유: 도서관에서 요청서 제출 시 신분증 확인

      if (token) {
        config.headers['X-CSRF-Token'] = token; // 의미: CSRF 토큰을 헤더에 추가
        // 이유: 서버에서 CSRF 보호 확인
        // 비유: 도서관에서 요청서에 보안 코드 추가
      }

      return config; // 의미: 수정된 요청 설정 반환
      // 이유: 요청 진행
      // 비유: 도서관에서 확인된 요청서를 처리로 전달
    },
    (error) => {
      console.error('Request Interceptor - Error:', error); // 의미: 요청 에러 로깅
      // 이유: 디버깅 목적
      // 비유: 도서관에서 요청 처리 중 에러 기록

      return Promise.reject(error); // 의미: 에러 반환
      // 이유: 상위 로직에서 에러 처리
      // 비유: 도서관에서 에러를 손님에게 알림
    }
  );
};

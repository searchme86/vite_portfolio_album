// src/api/utils/handleAuthFailureUtil.js

import { useClerk } from '@clerk/clerk-react'; // 의미: Clerk 훅 가져오기
// 이유: 로그아웃 처리
// 비유: 도서관에서 손님의 회원증을 회수하는 도구

import { useNavigate } from 'react-router-dom'; // 의미: 라우팅 훅 가져오기
// 이유: 리다이렉트 처리
// 비유: 도서관에서 손님을 로그인 창구로 안내

import { toast } from 'react-toastify'; // 의미: 토스트 알림 라이브러리 가져오기
// 이유: 사용자에게 인증 실패 알림 표시
// 비유: 도서관에서 손님에게 알림 메시지 전달

import { cancelRequest, createCancelToken } from './cancelRequestUtil'; // 의미: 요청 취소 유틸 가져오기
// 이유: 인증 실패 시 모든 요청 취소
// 비유: 도서관에서 불필요한 요청 중단

import { axiosBase } from '../base/axiosBase'; // 의미: 기본 axios 인스턴스 가져오기
// 이유: 서버 세션 초기화 요청
// 비유: 도서관에서 서버 요청 도구 가져오기

import { clearCsrfToken } from './csrfTokenUtil'; // 의미: CSRF 토큰 초기화 유틸 가져오기
// 이유: 로그아웃 시 CSRF 토큰 제거
// 비유: 도서관에서 인증 코드 폐기

// 여기부터 시작=== <!---여기추가
// 의미: 인증 실패 시 공통 처리 로직
// 이유: 인터셉터에서 호출 가능하도록 순수 함수로 분리
// 비유: 도서관에서 인증 실패 시 기본 절차 처리
export const handleAuthFailure = async () => {
  const cancelSource = createCancelToken(); // 의미: 취소 토큰 소스 생성
  // 이유: 모든 요청 취소 가능하도록 준비
  // 비유: 도서관에서 취소 티켓 준비

  cancelRequest(cancelSource, 'Canceled due to authentication failure'); // 의미: 모든 요청 취소
  // 이유: 인증 실패 후 불필요한 요청 방지
  // 비유: 도서관에서 인증 실패 후 모든 요청 중단

  try {
    await axiosBase.delete('/api/session'); // 의미: 서버 세션 초기화 요청
    // 이유: 서버에서 세션 ID 삭제 및 쿠키 제거
    // 비유: 도서관에서 임시 손님의 회원증 번호 폐기
  } catch (error) {
    console.error('Failed to clear server session:', error); // 의미: 에러 로깅
    // 이유: 디버깅
    // 비유: 도서관에서 세션 초기화 실패 시 기록
  }

  clearCsrfToken(); // 의미: CSRF 토큰 초기화
  // 이유: 로그아웃 시 CSRF 토큰 제거
  // 비유: 도서관에서 인증 코드 폐기

  // React 훅 의존 로직은 제거: toast, clerk.signOut, navigate는 컴포넌트에서 처리
};
// 여기부터 끝===

// 의미: 인증 실패 시 로그아웃 및 리다이렉트를 처리하는 커스텀 훅
// 이유: 401 에러 발생 시 세션 정리 및 로그인 페이지로 이동, React Hooks 규칙 준수
// 비유: 도서관에서 회원증이 만료되었을 때 손님을 재로그인 창구로 안내하는 사서
export const useHandleAuthFailure = () => {
  const clerk = useClerk(); // 의미: Clerk 인스턴스 가져오기
  // 이유: 로그아웃 처리
  // 비유: 도서관에서 손님의 회원증 회수 준비
  const navigate = useNavigate(); // 의미: 네비게이션 함수 가져오기
  // 이유: 리다이렉트 처리
  // 비유: 도서관에서 손님을 안내할 경로 준비

  // 의미: 인증 실패 처리 함수 반환
  // 이유: 컴포넌트에서 호출 가능하도록 함수 제공
  // 비유: 도서관에서 손님 안내를 위한 절차 준비
  const handleAuthFailureWithRedirect = async () => {
    await handleAuthFailure(); // 의미: 공통 인증 실패 처리 호출
    // 이유: 요청 취소 및 세션 정리
    // 비유: 도서관에서 기본 인증 실패 절차 수행

    toast.error('Session expired. Please log in again.'); // 의미: 사용자에게 인증 실패 알림 표시
    // 이유: 사용자 경험 개선
    // 비유: 도서관에서 손님에게 세션 만료 메시지 전달

    await clerk.signOut(); // 의미: Clerk를 통해 로그아웃 처리
    // 이유: 사용자 세션 정리
    // 비유: 도서관에서 손님의 회원증 회수

    navigate('/login'); // 의미: 로그인 페이지로 리다이렉트
    // 이유: 사용자가 다시 로그인하도록 유도
    // 비유: 도서관에서 손님을 로그인 창구로 안내
  };

  return handleAuthFailureWithRedirect; // 의미: 인증 실패 처리 함수 반환
  // 이유: 외부에서 호출 가능
  // 비유: 도서관에서 안내 절차를 다른 부서에 전달
};

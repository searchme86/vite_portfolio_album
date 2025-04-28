// hooks/useSessionManager.js

import { useState, useEffect } from 'react'; // 의미: React 훅 가져오기
// 이유: 상태 관리와 쿠키 읽기/저장을 위해 사용
// 비유: 도서관에서 손님의 임시 회원증(세션 ID)을 관리하기 위한 도구

import Cookies from 'js-cookie'; // 의미: 쿠키 관리 라이브러리 가져오기
// 이유: 브라우저 쿠키에서 세션 ID를 읽고 저장
// 비유: 도서관에서 손님의 임시 회원증을 보관하는 서랍

export const useSessionManager = () => {
  const [sessionId, setSessionId] = useState(null); // 의미: 세션 ID 상태 관리
  // 이유: 현재 세션 ID를 저장하고 업데이트
  // 비유: 도서관에서 손님의 현재 임시 회원증 번호를 기록

  useEffect(() => {
    const savedSessionId = Cookies.get('sessionId'); // 의미: 쿠키에서 세션 ID 가져오기
    // 이유: 백엔드에서 설정한 세션 ID를 가져옴
    // 비유: 도서관 서랍에서 손님의 임시 회원증 번호 확인
    if (savedSessionId) {
      setSessionId(savedSessionId); // 의미: 세션 ID 상태 업데이트
      // 이유: 가져온 세션 ID를 상태로 저장
      // 비유: 손님의 임시 회원증 번호를 기록지에 업데이트
    }
  }, []); // 의미: 컴포넌트 마운트 시 한 번만 실행
  // 이유: 페이지 로드 시 쿠키에서 세션 ID를 읽음
  // 비유: 도서관 문을 열 때 손님의 임시 회원증 확인

  return sessionId; // 의미: 세션 ID 반환
  // 이유: 다른 컴포넌트에서 세션 ID 사용 가능
  // 비유: 손님의 임시 회원증 번호를 다른 직원에게 전달
};

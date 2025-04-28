// src/api/like/utils/handleErrorUtil.js

// 의미: API 에러를 처리하여 사용자 친화적인 메시지로 변환하는 함수
// 이유: 백엔드 에러를 클라이언트에서 이해하기 쉽게 변환
// 비유: 도서관에서 손님 요청 실패 시 안내 메시지를 쉽게 설명
export const handleApiError = (error) => {
  if (error.response) {
    // 의미: HTTP 응답 에러 처리
    // 이유: 백엔드에서 반환한 에러 상태 코드별 처리
    // 비유: 도서관에서 요청 실패 원인을 상태 코드로 확인
    if (error.response.status === 401) {
      return 'Authentication failed: Invalid or expired token.'; // 의미: 401 에러 메시지 반환
      // 이유: 인증 실패 시 사용자 친화적 메시지 제공
      // 비유: 도서관에서 손님에게 회원증 문제 알림
    }
    // 여기부터 시작===
    if (error.response.status === 429) {
      return 'Too many requests: Please try again later.'; // 의미: 429 에러 메시지 반환 <!---여기추가
      // 이유: 요청 제한 초과 시 사용자 친화적 메시지 제공
      // 비유: 도서관에서 손님에게 요청이 너무 많아 잠시 기다리라고 알림
    }
    // 여기부터 끝===

    return (
      error.response.data.message || 'API request failed' // 의미: 백엔드 에러 메시지 반환
      // 이유: 백엔드에서 제공한 에러 메시지 사용, 기본 메시지 제공
      // 비유: 도서관에서 손님 요청 실패 시 백엔드의 안내 메시지 전달
    );
  }
  return error.message || 'Unknown error occurred'; // 의미: 일반 에러 메시지 반환
  // 이유: 네트워크 에러 등 기타 에러 처리
  // 비유: 도서관에서 알 수 없는 문제 발생 시 기본 안내 메시지 전달
};

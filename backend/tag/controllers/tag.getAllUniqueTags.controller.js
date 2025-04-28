import { fetchAllUniqueTags } from '../services/tag.getAllUniqueTags.service.js'; // 의미: 고유 태그 조회 서비스 가져오기
// 이유: 데이터 조회 및 가공 로직을 서비스로 분리
// 비유: 도서관에서 책 목록을 가져오는 전문가 호출

export const getAllUniqueTags = async (req, res) => {
  // 의미: 모든 포스트에서 고유 태그를 조회하는 컨트롤러 함수
  // 이유: 클라이언트 요청을 처리하고 응답 제공
  // 비유: 도서관 데스크에서 손님 요청 처리
  try {
    const uniqueTags = await fetchAllUniqueTags(); // 의미: 서비스에서 고유 태그 조회
    // 이유: 데이터 조회 및 가공 로직을 서비스에 위임
    // 비유: 전문가에게 책 주제 목록을 요청

    if (!Array.isArray(uniqueTags)) {
      // 의미: 결과가 배열인지 확인
      // 이유: 예상치 못한 결과 방어
      // 비유: 받은 목록이 제대로 된 책 목록인지 확인
      throw new Error('Unique tags result is not an array');
    }

    console.log('getAllUniqueTags - Returning unique tags:', uniqueTags); // 의미: 반환할 태그 로그
    // 이유: 디버깅 용이성
    // 비유: 손님에게 줄 책 목록 확인

    res.status(200).json(uniqueTags); // 의미: 클라이언트에 고유 태그 반환
    // 이유: 요청이 성공했음을 알리고 데이터 제공
    // 비유: 손님에게 정리된 책 주제 목록 전달
  } catch (error) {
    console.error('getAllUniqueTags - Error:', error.message); // 의미: 에러 로그
    // 이유: 문제 원인 추적
    // 비유: 문제 발생 시 일지에 기록
    const errorMessage = error.message || 'Unknown server error'; // 의미: 에러 메시지 설정
    // 이유: 메시지 없으면 기본값 제공
    // 비유: 원인을 모르면 "알 수 없음" 적기
    res.status(500).json({
      // 의미: 에러 응답
      message: 'Server error occurred', // 의미: 사용자 친화적 메시지
      // 이유: 클라이언트가 이해하기 쉽게
      // 비유: "문제 생겼어요"라고 말해줌
      error: errorMessage, // 의미: 개발자용 상세 메시지
      // 이유: 디버깅 용이성
      // 비유: 전문가에게 문제 설명
    });
  }
};

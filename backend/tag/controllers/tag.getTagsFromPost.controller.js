import { fetchTagsFromPost } from '../services/tag.getTagsFromPost.service.js'; // 의미: 태그 조회 서비스 가져오기
// 이유: 데이터 조회 로직을 서비스로 분리
// 비유: 도서관에서 책 주제 목록을 가져오는 전문가 호출
import { validateInput } from '../utils/tag.validateInput.util.js'; // 의미: 입력값 유효성 검사 유틸 가져오기
// 이유: 공통 유효성 검사 로직 사용
// 비유: 도서관에서 책 번호가 맞는지 확인하는 다기능 도구
import { formatErrorMessage } from '../utils/tag.formatErrorMessage.util.js'; // 의미: 에러 메시지 포맷팅 유틸 가져오기
// 이유: 에러 메시지 포맷팅 로직 분리
// 비유: 문제를 깔끔하게 설명하는 도구

export const getTagsFromPost = async (req, res) => {
  // 의미: 특정 포스트의 태그 목록을 조회하는 컨트롤러 함수
  // 이유: 클라이언트 요청 처리 및 응답 제공
  // 비유: 도서관 데스크에서 손님 요청 처리
  const { postId } = req.params; // 의미: URL 파라미터에서 postId 추출
  // 이유: 조회할 포스트 식별
  // 비유: 손님이 말한 책 번호를 확인

  console.log(`getTagsFromPost - Fetching tags for post: ${postId}`); // 의미: 요청된 postId 로그
  // 이유: 디버깅 용이성
  // 비유: 손님이 원하는 책 번호를 기록

  try {
    // 여기부터 시작===
    // <!---여기수정
    const validationResult = validateInput(postId); // 의미: postId 유효성 검사
    // 이유: 유효하지 않은 요청 조기 차단, 공통 유틸리티 사용
    // 비유: 책 번호가 맞는지 확인
    if (!validationResult.isValid) {
      // 의미: postId가 유효하지 않으면 에러 응답
      // 이유: 잘못된 요청 처리
      // 비유: 잘못된 책 번호면 "다시 확인해줘"라고 말함
      console.log(
        'getTagsFromPost - Validation failed:',
        validationResult.message
      ); // 의미: 유효성 검사 실패 로그
      // 이유: 디버깅 용이성
      // 비유: 문제 기록
      return res.status(400).json({ message: validationResult.message }); // 의미: 클라이언트에 에러 전달
      // 이유: 사용자에게 문제 알림
      // 비유: "책 번호가 잘못됐어요"라고 답변
    }
    // 여기부터 끝===

    const tags = await fetchTagsFromPost(postId); // 의미: 서비스에서 태그 조회
    // 이유: 데이터 조회 로직을 서비스에 위임
    // 비유: 전문가에게 책 주제 목록 요청

    if (!Array.isArray(tags)) {
      // 의미: 태그가 배열인지 확인
      // 이유: 예상치 못한 결과 방어
      // 비유: 받은 목록이 주제 목록인지 확인
      throw new Error('Tags result is not an array');
    }

    console.log(`getTagsFromPost - Tags fetched: ${tags}`); // 의미: 조회된 태그 로그
    // 이유: 디버깅 용이성
    // 비유: 가져온 주제 목록 확인

    return res.status(200).json(tags); // 의미: 포스트의 태그 배열 반환
    // 이유: 클라이언트에 성공 응답
    // 비유: 손님에게 책 주제 목록 전달
  } catch (error) {
    console.error('getTagsFromPost - Error:', error.message); // 의미: 에러 로그
    // 이유: 문제 원인 추적
    // 비유: 문제 발생 시 일지에 기록
    const formattedError = formatErrorMessage(error); // 의미: 에러 메시지 포맷팅
    // 이유: 보안 및 가독성 향상
    // 비유: 문제를 깔끔하게 정리해서 설명
    return res
      .status(500)
      .json({ message: 'Server error', error: formattedError }); // 의미: 에러 응답
    // 이유: 클라이언트에 안전한 에러 메시지 전달
    // 비유: "문제 생겼어요"라고 말하며 원인 설명
  }
};

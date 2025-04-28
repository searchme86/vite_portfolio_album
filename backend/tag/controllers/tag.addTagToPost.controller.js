import { addTagToPostService } from '../services/tag.addTagToPost.service.js'; // 의미: 태그 추가 서비스 가져오기
// 이유: 데이터 수정 로직을 서비스로 분리
// 비유: 도서관에서 책에 주제를 추가하는 전문가 호출
import { validateInput } from '../utils/tag.validateInput.util.js'; // 의미: 입력값 유효성 검사 유틸 가져오기
// 이유: 공통 유효성 검사 로직 사용
// 비유: 도서관에서 책 번호와 주제가 맞는지 확인하는 다기능 도구
import { formatErrorMessage } from '../utils/tag.formatErrorMessage.util.js'; // 의미: 에러 메시지 포맷팅 유틸 가져오기
// 이유: 에러 메시지 포맷팅 로직 분리
// 비유: 문제를 깔끔하게 설명하는 도구

export const addTagToPost = async (req, res) => {
  // 의미: 특정 포스트에 태그를 추가하는 컨트롤러 함수
  // 이유: 클라이언트 요청 처리 및 응답 제공
  // 비유: 도서관 데스크에서 손님 요청 처리
  const { postId } = req.params; // 의미: URL 파라미터에서 postId 추출
  // 이유: 조회할 포스트 식별
  // 비유: 손님이 말한 책 번호를 확인
  const { tag } = req.body; // 의미: 요청 본문에서 태그 값 추출
  // 이유: 추가할 태그 가져오기
  // 비유: 손님이 말한 책 주제를 확인

  console.log(`addTagToPost - Adding tag: ${tag} to post: ${postId}`); // 의미: 요청된 태그와 postId 로그
  // 이유: 디버깅 용이성
  // 비유: 손님이 원하는 책 번호와 주제를 기록

  try {
    // 여기부터 시작===
    // <!---여기수정
    const validationResult = validateInput(postId, tag); // 의미: postId와 tag 유효성 검사
    // 이유: 유효하지 않은 요청 조기 차단, 공통 유틸리티 사용
    // 비유: 책 번호와 주제가 맞는지 확인
    if (!validationResult.isValid) {
      // 의미: 유효성 검사 실패 시 에러 응답
      // 이유: 잘못된 요청 처리
      // 비유: 잘못된 책 번호나 주제면 "다시 확인해줘"라고 말함
      console.log(
        'addTagToPost - Validation failed:',
        validationResult.message
      ); // 의미: 유효성 검사 실패 로그
      // 이유: 디버깅 용이성
      // 비유: 문제 기록
      return res.status(400).json({ message: validationResult.message }); // 의미: 클라이언트에 에러 전달
      // 이유: 사용자에게 문제 알림
      // 비유: "책 번호나 주제가 잘못됐어요"라고 답변
    }
    // 여기부터 끝===

    const updatedPost = await addTagToPostService(postId, tag); // 의미: 서비스에서 태그 추가
    // 이유: 데이터 수정 로직을 서비스에 위임
    // 비유: 전문가에게 책에 주제 추가 요청

    console.log(`addTagToPost - Tag added: ${tag} to post: ${postId}`); // 의미: 태그 추가 성공 로그
    // 이유: 디버깅 용이성
    // 비유: 주제 추가 성공 확인

    return res.status(200).json(updatedPost); // 의미: 업데이트된 포스트 반환
    // 이유: 클라이언트에 성공 응답
    // 비유: 손님에게 주제가 추가된 책 전달
  } catch (error) {
    console.error('addTagToPost - Error:', error.message); // 의미: 에러 로그
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

import mongoose from 'mongoose'; // 의미: Mongoose 라이브러리 가져오기
// 이유: ObjectId 유효성 검사에 필요
// 비유: 도서관에서 책 번호 형식이 맞는지 확인하는 규칙 가져오기

export const validateInput = (postId, tag = null) => {
  // 의미: postId와 선택적으로 tag를 검증하는 공통 유틸리티 함수
  // 이유: 중복된 유효성 검사 로직을 통합하고 재사용 가능하게 함
  // 비유: 책 번호와 주제를 한 번에 확인하는 다기능 도구
  if (!postId || typeof postId !== 'string') {
    // 의미: postId가 문자열인지 확인
    // 이유: postId가 없거나 문자열이 아니면 유효하지 않음
    // 비유: 책 번호가 없거나 숫자가 아닌지 확인
    return { isValid: false, message: 'Invalid postId: must be a string' };
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(postId); // 의미: postId가 유효한 ObjectId인지 확인
  // 이유: Mongoose의 ObjectId 형식에 맞는지 확인
  // 비유: 책 번호가 도서관 규칙에 맞는지 확인
  if (!isValidObjectId) {
    // 의미: ObjectId 유효성 검사 실패
    // 이유: 유효하지 않은 postId 처리
    // 비유: 책 번호가 규칙에 안 맞으면 에러
    return { isValid: false, message: 'Invalid postId: not a valid ObjectId' };
  }

  if (tag !== null) {
    // 의미: tag가 제공된 경우 유효성 검사
    // 이유: tag가 필요 없는 경우(tag가 null)에는 검사 생략
    // 비유: 주제가 없어도 괜찮지만, 있으면 제대로 된 주제인지 확인
    if (!tag || typeof tag !== 'string' || tag.trim() === '') {
      // 의미: tag가 유효한 문자열인지 확인
      // 이유: tag가 없거나 빈 문자열이면 유효하지 않음
      // 비유: 주제가 없거나 빈 종이인지 확인
      return {
        isValid: false,
        message: 'Invalid tag: must be a non-empty string',
      };
    }
  }

  return { isValid: true, message: 'Valid input' }; // 의미: 유효성 검사 결과 반환
  // 이유: 컨트롤러에서 사용
  // 비유: 책 번호와 주제가 맞는지 확인 결과 알려줌
};

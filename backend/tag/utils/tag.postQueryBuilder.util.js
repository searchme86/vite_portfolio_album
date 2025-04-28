export const buildQueryCondition = (tagValue) => {
  // 의미: 태그 기반 쿼리 조건을 생성하는 유틸리티 함수
  // 이유: 쿼리 생성 로직을 분리해 단일 책임 준수
  // 비유: 책 찾기 조건을 적는 노트 작성기
  if (!tagValue || typeof tagValue !== 'string' || tagValue.trim() === '') {
    // 의미: 태그 값 유효성 확인
    // 이유: 유효하지 않은 태그 방어
    // 비유: 노트에 주제가 제대로 적혔는지 확인
    return null; // 의미: 유효하지 않으면 null 반환
    // 이유: 상위 함수에서 처리하도록 위임
    // 비유: 빈 노트를 주면 "다시 써"라고 돌려줌
  }

  const queryCondition = { tags: tagValue }; // 의미: 태그 기반 쿼리 조건 설정
  // 이유: MongoDB에서 해당 태그가 포함된 포스트만 찾기 위해
  // 비유: "이 주제의 책만 찾아줘"라고 조건 적음
  return queryCondition; // 의미: 생성된 조건 반환
  // 이유: 데이터 조회에 사용
  // 비유: 완성된 노트를 넘겨줌
};

import Post from '../../models/post.model.js'; // 의미: Post 모델 가져오기
// 이유: 슬러그 중복 확인에 필요
// 비유: 도서관에서 책 번호 중복 확인을 위해 사서 호출

export const generateUniqueSlug = async (title) => {
  // 의미: 제목을 기반으로 고유한 슬러그를 생성하는 유틸리티 함수
  // 이유: 슬러그 생성 및 중복 처리 로직 분리
  // 비유: 책 제목으로 고유 번호 만드는 도구
  if (!title || typeof title !== 'string') {
    // 의미: 제목 유효성 검사
    // 이유: 제목이 없거나 문자열이 아니면 에러
    // 비유: 책 제목이 없으면 번호 못 만듦
    throw new Error('Title must be a non-empty string');
  }

  let slug = title.replace(/ /g, '-').toLowerCase(); // 의미: 제목을 슬러그 형식으로 변환
  // 이유: 공백을 하이픈으로 바꾸고 소문자로 변환
  // 비유: 책 제목을 간단한 번호로 바꾸기
  let existingPost = await Post.findOne({ slug }); // 의미: 슬러그 중복 확인
  // 이유: 동일한 슬러그가 있는지 확인
  // 비유: 같은 번호가 있는지 확인
  let counter = 2; // 의미: 중복 시 사용할 카운터 초기화
  // 이유: 중복된 경우 숫자를 붙여 고유하게 만듦
  // 비유: 같은 번호면 숫자를 붙여 구분

  while (existingPost) {
    // 의미: 중복된 슬러그가 있으면 반복
    // 이유: 고유한 슬러그를 찾을 때까지 반복
    // 비유: 번호가 중복이면 새 번호 만들기
    slug = `${slug}-${counter}`; // 의미: 슬러그에 숫자 추가
    // 이유: 중복 방지
    // 비유: 번호 뒤에 숫자 붙이기
    existingPost = await Post.findOne({ slug }); // 의미: 새 슬러그로 다시 중복 확인
    // 이유: 새 슬러그가 고유한지 확인
    // 비유: 새 번호가 중복인지 다시 확인
    counter++; // 의미: 카운터 증가
    // 이유: 다음 숫자 준비
    // 비유: 다음 번호 준비
  }

  return slug; // 의미: 고유한 슬러그 반환
  // 이유: 서비스에서 사용
  // 비유: 고유 번호 넘겨줌
};

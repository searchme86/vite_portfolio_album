import Post from '../../models/post.model.js'; // 의미: Post 모델 가져오기
// 이유: 데이터베이스와 상호작용하기 위해 필요
// 비유: 도서관에서 책을 찾기 위해 사서 호출

export const fetchTagsFromPost = async (postId) => {
  // 의미: 특정 포스트의 태그를 조회하는 서비스 함수
  // 이유: 데이터 조회 로직을 컨트롤러에서 분리
  // 비유: 도서관에서 특정 책의 주제를 찾는 전문가
  try {
    const post = await Post.findById(postId); // 의미: postId로 포스트 조회
    // 이유: 해당 포스트의 태그를 가져오기 위해
    // 비유: 책 번호로 책을 찾아옴

    if (!post) {
      // 의미: 포스트 존재 여부 확인
      // 이유: 포스트가 없으면 에러 발생
      // 비유: 책이 없으면 "없다"고 알림
      console.log(`fetchTagsFromPost - Post not found: ${postId}`); // 의미: 포스트 없음 로그
      // 이유: 디버깅 용이성
      // 비유: 문제 기록
      throw new Error('Post not found');
    }

    if (!Array.isArray(post.tags)) {
      // 의미: 태그가 배열인지 확인
      // 이유: 예상치 못한 데이터 형식 방어
      // 비유: 책 주제가 목록인지 확인
      return [];
    }

    return post.tags; // 의미: 포스트의 태그 배열 반환
    // 이유: 컨트롤러에서 사용
    // 비유: 책 주제 목록 넘겨줌
  } catch (error) {
    throw new Error(`Failed to fetch tags: ${error.message}`); // 의미: 에러 발생 시 상위로 전달
    // 이유: 컨트롤러에서 에러 처리 위임
    // 비유: 책을 못 찾으면 "문제 있다"고 상사에게 말하기
  }
};

import Post from '../../models/post.model.js'; // 의미: Post 모델 가져오기
// 이유: 데이터베이스와 상호작용하기 위해 필요
// 비유: 도서관에서 책을 찾기 위해 사서 호출

export const addTagToPostService = async (postId, tag) => {
  // 의미: 특정 포스트에 태그를 추가하는 서비스 함수
  // 이유: 데이터 수정 로직을 컨트롤러에서 분리
  // 비유: 도서관에서 특정 책에 주제를 추가하는 전문가
  try {
    const post = await Post.findById(postId); // 의미: postId로 포스트 조회
    // 이유: 태그를 추가할 포스트 가져오기
    // 비유: 책 번호로 책을 찾아옴

    if (!post) {
      // 의미: 포스트 존재 여부 확인
      // 이유: 포스트가 없으면 에러 발생
      // 비유: 책이 없으면 "없다"고 알림
      console.log(`addTagToPostService - Post not found: ${postId}`); // 의미: 포스트 없음 로그
      // 이유: 디버깅 용이성
      // 비유: 문제 기록
      throw new Error('Post not found');
    }

    if (!Array.isArray(post.tags)) {
      // 의미: 태그 배열 초기화
      // 이유: 태그 필드가 없거나 배열이 아니면 초기화
      // 비유: 책에 주제 목록이 없으면 새로 만들기
      post.tags = [];
    }

    if (!post.tags.includes(tag)) {
      // 의미: 태그 중복 확인
      // 이유: 중복 태그 추가 방지
      // 비유: 책에 이미 있는 주제인지 확인
      post.tags.push(tag); // 의미: 태그 배열에 새로운 태그 추가
      // 이유: 새로운 태그 추가
      // 비유: 책에 새 주제 붙이기
      await post.save(); // 의미: 변경된 포스트 저장
      // 이유: DB에 업데이트 반영
      // 비유: 책에 주제 추가 후 도서관에 저장
    }

    return post; // 의미: 업데이트된 포스트 반환
    // 이유: 컨트롤러에서 사용
    // 비유: 주제가 추가된 책 넘겨줌
  } catch (error) {
    throw new Error(`Failed to add tag: ${error.message}`); // 의미: 에러 발생 시 상위로 전달
    // 이유: 컨트롤러에서 에러 처리 위임
    // 비유: 책을 못 찾거나 문제가 있으면 "문제 있다"고 상사에게 말하기
  }
};

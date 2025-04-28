// 여기부터 시작===
// <!---여기수정
import User from '../../models/user.model.js'; // 의미: User 모델 가져오기
// 이유: 사용자 정보를 조회하기 위해 필요
// 비유: 도서관에서 저자 정보를 찾기 위해 저자 목록 가져오기
// 여기부터 끝===

export const populateUserDataForPosts = async (postsToPopulate) => {
  // 의미: 포스트에 사용자 정보를 추가하는 유틸리티 함수
  // 이유: populate 로직을 분리해 단일 책임 준수
  // 비유: 책에 저자 이름 스티커 붙이는 작업
  const populatedPosts = []; // 의미: 사용자 정보를 포함한 포스트 배열 초기화
  // 이유: 결과를 저장하기 위해
  // 비유: 스티커 붙인 책을 담을 빈 상자

  if (!Array.isArray(postsToPopulate)) {
    // 의미: 입력값이 배열인지 확인
    // 이유: 예상치 못한 입력 방어
    // 비유: 책 목록이 아닌 엉뚱한 걸 받았는지 확인
    return [];
  }

  for (const post of postsToPopulate) {
    // 의미: 각 포스트 순회
    // 이유: 개별적으로 사용자 정보 추가
    // 비유: 책 하나씩 확인하며 작업
    if (post && post.user) {
      // 의미: 포스트와 사용자 데이터 유효성 확인
      // 이유: null/undefined 방어
      // 비유: 책과 저자가 제대로 있는지 확인
      try {
        // 여기부터 시작===
        // <!---여기수정
        const userId = post.user.toString(); // 의미: 사용자 ID를 문자열로 변환
        // 이유: Mongoose에서 ObjectId를 문자열로 변환해 사용
        // 비유: 저자 번호를 이름으로 바꿀 준비
        const userData = await User.findById(userId).select(
          'username clerkUserId'
        ); // 의미: 사용자 정보 조회
        // 이유: Mongoose의 findById 메서드로 사용자 조회
        // 비유: 저자 번호로 저자 정보 찾기
        // 여기부터 끝===

        if (userData) {
          // 의미: 사용자 데이터 유효성 확인
          // 이유: 잘못된 데이터 방어
          // 비유: 저자 정보가 제대로 왔는지 확인
          post.user = userData; // 의미: 포스트에 사용자 정보 추가
          // 이유: 클라이언트에 필요한 데이터 포함
          // 비유: 책에 저자 이름 스티커 붙임
          populatedPosts.push(post); // 의미: 결과 배열에 추가
          // 이유: 최종 데이터 준비
          // 비유: 정리된 책을 상자에 넣음
        } else {
          console.warn(
            'populateUserDataForPosts - User not found for ID:',
            userId
          ); // 의미: 사용자 없음 경고 로그
          // 이유: 디버깅 용이성
          // 비유: 저자가 없다고 기록
        }
      } catch (error) {
        console.error(
          'populateUserDataForPosts - Error for post ID:',
          post._id,
          'Error:',
          error.message
        ); // 의미: 에러 로그
        // 이유: 디버깅 용이성
        // 비유: 문제 발생 시 기록
      }
    } else {
      console.warn(
        'populateUserDataForPosts - Invalid post or user data for post ID:',
        post?._id
      ); // 의미: 포스트 또는 사용자 데이터 없음 경고
      // 이유: 디버깅 용이성
      // 비유: 책이나 저자 정보가 없다고 기록
    }
  }

  return populatedPosts; // 의미: 사용자 정보가 추가된 포스트 반환
  // 이유: 상위 함수에서 사용
  // 비유: 스티커 붙인 책 목록 넘겨줌
};

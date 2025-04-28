// src/services/post.deletePost.service.js

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조작하기 위해 필요
import Post from '../../models/post.model.js';

// User 모델을 가져옴
// 사용자 인증 및 권한 확인을 위해 필요
import User from '../../models/user.model.js';

// 포스트 삭제 비즈니스 로직
// 사용자 인증 및 포스트 삭제 처리
export const deletePostService = async (postId, clerkUserId) => {
  // 사용자 조회
  // 인증된 사용자가 DB에 존재하는지 확인
  let user = await User.findOne({ clerkUserId });
  console.log('deletePostService - Initial user lookup:', user);
  // 1. 사용자 조회 결과 출력
  // 2. 사용자 존재 여부 확인

  // 사용자가 없을 경우 새 사용자 생성
  // 인증된 사용자가 DB에 없으면 새로 생성
  if (!user) {
    console.log(
      'deletePostService - User not found, creating new user for:',
      clerkUserId
    );
    // 1. 사용자가 없음을 출력
    // 2. 새로운 사용자 생성 전 확인

    const email = req.auth.sessionClaims?.email || 'unknown@example.com'; // 타입스크립트 대비: fallback 값 추가
    const username = req.auth.sessionClaims?.username || `user_${clerkUserId}`; // 타입스크립트 대비: fallback 값 추가
    user = new User({
      clerkUserId,
      username,
      email,
    });
    await user.save();
    console.log('deletePostService - New user created:', user);
    // 1. 새로 생성된 사용자 출력
    // 2. 사용자 생성 확인
  } else {
    console.log('deletePostService - Found user:', user);
    // 1. 기존 사용자 출력
    // 2. 사용자 조회 확인
  }

  // 포스트 삭제
  // 사용자가 작성한 포스트만 삭제 가능
  const deletedPost = await Post.findOneAndDelete({
    _id: postId,
    user: user._id,
  });
  console.log('deletePostService - Deletion result:', deletedPost);
  // 1. 삭제 결과 출력
  // 2. 삭제된 포스트 확인

  // 삭제 실패 시 (포스트가 없거나 권한 없음)
  // 삭제 조건에 맞지 않음을 반환
  if (!deletedPost) {
    return {
      success: false,
      status: 403,
      message: 'You can delete only your posts!',
    };
  }

  // 삭제 성공
  // 성공 결과 반환
  return {
    success: true,
    status: 200,
    message: 'Post has been deleted',
  };
};

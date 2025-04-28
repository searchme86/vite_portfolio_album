// src/services/post.updatePost.service.js

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조작하기 위해 필요
import Post from '../../models/post.model.js';

// User 모델을 가져옴
// 사용자 인증 및 권한 확인을 위해 필요
import User from '../../models/user.model.js';

// 포스트 업데이트 비즈니스 로직
// 사용자 인증, 포스트 업데이트 처리
export const updatePostService = async (postId, clerkUserId, postData) => {
  // 사용자 조회
  // 인증된 사용자가 DB에 존재하는지 확인
  let user = await User.findOne({ clerkUserId });
  console.log('updatePostService - Initial user lookup:', user);
  // 1. 사용자 조회 결과 출력
  // 2. 사용자 존재 여부 확인

  // 사용자가 없을 경우 새 사용자 생성
  // 인증된 사용자가 DB에 없으면 새로 생성
  if (!user) {
    console.log(
      'updatePostService - User not found, creating new user for:',
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
    console.log('updatePostService - New user created:', user);
    // 1. 새로 생성된 사용자 출력
    // 2. 사용자 생성 확인
  } else {
    console.log('updatePostService - Found user:', user);
    // 1. 기존 사용자 출력
    // 2. 사용자 조회 확인
  }

  // 포스트 조회
  // 업데이트할 포스트가 존재하는지 확인
  const post = await Post.findById(postId);
  console.log('updatePostService - Fetched post:', post);
  // 1. 조회된 포스트 출력
  // 2. 포스트 존재 여부 확인

  // 포스트가 없을 경우 에러 반환
  // 업데이트 대상이 없음을 알림
  if (!post) {
    return {
      success: false,
      status: 404,
      message: 'Post not found!',
    };
  }

  // 권한 확인
  // 사용자가 포스트 작성자인지 확인
  if (post.user.toString() !== user._id.toString()) {
    return {
      success: false,
      status: 403,
      message: 'You can only edit your own posts!',
    };
  }

  // 제목 유효성 검사
  // 제목은 필수 입력값
  if (!postData.title) {
    return {
      success: false,
      status: 400,
      message: 'Title is required!',
    };
  }

  // 슬러그 생성
  // 제목을 기반으로 고유한 슬러그 생성
  let slug = postData.title.replace(/ /g, '-').toLowerCase();
  let existingPost = await Post.findOne({ slug, _id: { $ne: postId } });
  let counter = 2;
  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug, _id: { $ne: postId } });
    counter++;
  }
  console.log('updatePostService - Generated slug:', slug);
  // 1. 생성된 슬러그 출력
  // 2. 슬러그 고유성 확인

  // 이미지 유효성 검사
  // 유효한 이미지 URL만 필터링
  const images = Array.isArray(postData.img)
    ? postData.img
    : postData.img
    ? [postData.img]
    : post.img;
  const validImages = images
    .filter(
      (img) =>
        typeof img === 'string' && !img.startsWith('blob:') && img.trim() !== ''
    )
    .filter((img) => img.startsWith('https://ik.imagekit.io'));
  console.log('updatePostService - Valid images after filtering:', validImages);
  // 1. 필터링된 이미지 URL 출력
  // 2. 유효한 이미지 확인

  // 포스트 업데이트
  // 새로운 데이터로 포스트 업데이트
  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { ...postData, slug, img: validImages },
    { new: true }
  );
  console.log('updatePostService - Updated post:', updatedPost);
  // 1. 업데이트된 포스트 출력
  // 2. 업데이트 결과 확인

  // 업데이트 성공
  // 성공 결과 반환
  return {
    success: true,
    status: 200,
    updatedPost,
  };
};

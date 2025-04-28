// post.getPost.service.js
import mongoose from 'mongoose'; // MongoDB 연결을 위한 mongoose 모듈
import Post from '../../models/post.model.js'; // 포스트 모델

// 포스트를 slug로 조회하는 함수
export const findPostBySlug = async (slug) => {
  console.log('findPostBySlug - Requested slug:', slug);
  // 1. 요청된 slug를 출력하여 디버깅
  // 2. 클라이언트가 보낸 slug 값 확인

  console.log(
    'findPostBySlug - MongoDB Connection State:',
    mongoose.connection.readyState
  );
  // 1. MongoDB 연결 상태 출력 (0: disconnected, 1: connected, 2: connecting, 3: disconnecting)
  // 2. 데이터베이스 연결 상태 확인

  try {
    const post = await Post.findOne({ slug }).populate(
      'user',
      'username img clerkUserId'
    );
    console.log('findPostBySlug - Fetched post:', post);
    // 1. 조회된 포스트 데이터 출력
    // 2. 데이터가 올바르게 조회되었는지 확인

    return post;
  } catch (error) {
    console.error('findPostBySlug - Error fetching post:', error);
    // 1. 포스트 조회 중 발생한 에러 출력
    // 2. 에러 원인 추적

    throw new Error(`Error fetching post: ${error.message}`);
    // 1. 에러를 상위 호출자에게 전달
    // 2. 컨트롤러에서 에러 처리 가능하도록
  }
};

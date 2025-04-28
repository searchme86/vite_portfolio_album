// post.getPost.controller.js
import { findPostBySlug } from '../services/post.getPost.service.js'; // 포스트 조회 서비스

// 포스트 조회 컨트롤러
export const getPost = async (req, res) => {
  console.log('getPost - Starting request handling for slug:', req.params.slug);
  // 1. 요청 시작 로그 출력
  // 2. 요청 흐름 추적

  //====여기부터 수정됨====
  try {
    const post = await findPostBySlug(req.params.slug);
    console.log('getPost - Service result:', post);
    // 1. 서비스에서 반환된 포스트 데이터 출력
    // 2. 서비스 호출 결과 확인

    if (!post) {
      console.log('getPost - Post not found for slug:', req.params.slug);
      // 1. 포스트가 없을 경우 로그 출력
      // 2. 404 응답 전 상태 확인

      return res.status(404).json({ message: 'Post not found!' });
      // 1. 클라이언트에 404 상태와 메시지 반환
      // 2. 포스트가 없음을 알림
    }

    console.log('getPost - Sending response for slug:', req.params.slug);
    // 1. 응답 전송 전 로그 출력
    // 2. 성공 응답 확인

    res.status(200).json(post);
    // 1. 조회된 포스트를 클라이언트에 반환
    // 2. 성공 응답 처리
  } catch (error) {
    console.error('getPost - Controller error:', error);
    // 1. 컨트롤러에서 발생한 에러 출력
    // 2. 에러 원인 추적

    res
      .status(500)
      .json({ message: 'Error fetching post', error: error.message });
    // 1. 클라이언트에 500 상태와 에러 메시지 반환
    // 2. 서버 에러 알림
  }
  //====여기까지 수정됨====
};

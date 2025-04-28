// src/controllers/post.getPostById.controller.js

// mongoose를 가져옴
// MongoDB 연결 상태를 확인하기 위해 필요
import mongoose from 'mongoose';

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { getPostByIdService } from '../services/post.getPostById.service.js';

// getPostById 컨트롤러 함수
// 특정 ID로 포스트 조회 요청을 처리
export const getPostById = async (req, res) => {
  // 요청에서 포스트 ID 추출
  // 조회할 포스트를 식별하기 위해 사용
  const postId = req.params.id || null; // 타입스크립트 대비: null fallback 추가

  console.log('getPostById - Requested ID:', postId);
  // 1. 요청된 포스트 ID 출력
  // 2. 클라이언트가 보낸 ID 확인

  console.log(
    'getPostById - MongoDB Connection State:',
    mongoose.connection.readyState
  );
  // 1. MongoDB 연결 상태 출력 (0: disconnected, 1: connected, 2: connecting, 3: disconnecting)
  // 2. MongoDB 연결 문제 여부 확인

  try {
    // 서비스 함수 호출하여 포스트 조회
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await getPostByIdService(postId);

    // 조회 실패 시 에러 응답
    // 포스트가 없을 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 성공 응답
    // 클라이언트에 조회된 포스트 반환
    res.status(200).json(result.post);
  } catch (error) {
    console.error('getPostById - Error fetching post:', error);
    // 1. 포스트 조회 중 발생한 에러 출력
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res
      .status(500)
      .json({ message: 'Error fetching post', error: error.message });
  }
};

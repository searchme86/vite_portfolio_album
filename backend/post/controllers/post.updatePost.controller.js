// src/controllers/post.updatePost.controller.js

//====여기부터 수정됨====

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조작하기 위해 필요
import Post from '../../models/post.model.js';

// User 모델을 가져옴
// 사용자 인증 및 권한 확인을 위해 필요
import User from '../../models/user.model.js';

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { updatePostService } from '../services/post.updatePost.service.js';

// 캐시 유틸 가져옴
// 캐시 관리 기능을 분리하여 재사용 가능하도록 함
import { clearPostCache } from '../utils/post.updatePost.cache.util.js';

// updatePost 컨트롤러 함수
// 포스트 업데이트 요청을 처리
export const updatePost = async (req, res) => {
  // 요청에서 인증된 사용자 ID 추출
  // 인증 여부 확인을 위해 사용
  const clerkUserId = req.auth.userId || null; // 타입스크립트 대비: null fallback 추가

  // 인증되지 않은 경우 에러 응답
  // 사용자 인증이 필수이므로 확인
  if (!clerkUserId) {
    console.log('updatePost - Authentication failed: No clerkUserId');
    return res.status(401).json('Not authenticated!');
  }

  // 요청에서 포스트 ID 추출
  // 업데이트할 포스트를 식별하기 위해 사용
  const postId = req.params.id || null; // 타입스크립트 대비: null fallback 추가

  console.log('updatePost - Clerk User ID:', clerkUserId);
  // 1. Clerk 사용자 ID 출력
  // 2. 인증 정보 확인

  console.log('updatePost - Request auth:', req.auth);
  // 1. 요청 인증 정보 출력
  // 2. 인증 정보 확인

  console.log('updatePost - Requested postId:', postId);
  // 1. 요청된 포스트 ID 출력
  // 2. 포스트 ID 확인

  try {
    // 서비스 함수 호출하여 업데이트 처리
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await updatePostService(postId, clerkUserId, req.body);

    // 업데이트 실패 시 에러 응답
    // 업데이트 조건에 맞지 않거나 포스트가 없을 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 캐시 초기화
    // 캐시된 데이터가 최신 상태를 반영하도록 갱신
    clearPostCache();
    // <!---여기수정
    // 1. 유틸 함수로 캐시 초기화
    // 2. 캐시 관리 로직을 유틸로 분리

    console.log('updatePost - Updated post:', result.updatedPost);
    // 1. 업데이트된 포스트 출력
    // 2. 업데이트 결과 확인

    // 성공 응답
    // 클라이언트에 업데이트된 포스트 반환
    res.status(200).json(result.updatedPost);
  } catch (error) {
    console.error('updatePost - Error during update:', error);
    // 1. 업데이트 중 발생한 에러 출력
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//====여기까지 수정됨====

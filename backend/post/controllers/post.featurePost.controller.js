// src/controllers/post.featurePost.controller.js

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { featurePostService } from '../services/post.featurePost.service.js';

// 캐시 유틸 가져옴
// 캐시 관리 기능을 분리하여 재사용 가능하도록 함
import { postCache } from '../utils/post.featurePost.cache.util.js';

// featurePost 컨트롤러 함수
// 포스트의 추천 상태를 토글하는 요청을 처리
export const featurePost = async (req, res) => {
  // 요청에서 Clerk 사용자 ID 추출
  // 인증 확인을 위해 사용
  const clerkUserId = req.auth.userId || null; // 타입스크립트 대비: null fallback 추가

  // 요청 본문에서 포스트 ID 추출
  // 추천 상태를 변경할 포스트 식별
  const postId = req.body.postId || null; // 타입스크립트 대비: null fallback 추가

  console.log('featurePost - Clerk User ID:', clerkUserId);
  // 1. Clerk 사용자 ID 출력
  // 2. 인증 정보 확인

  console.log('featurePost - Request auth:', req.auth);
  // 1. 요청 인증 정보 출력
  // 2. 인증 정보 확인

  console.log('featurePost - Requested postId:', postId);
  // 1. 요청된 포스트 ID 출력
  // 2. 요청 데이터 확인

  // 인증 확인
  // Clerk 사용자 ID가 없으면 인증 실패
  if (!clerkUserId) {
    return res.status(401).json('Not authenticated!');
  }

  // 사용자 역할 추출
  // 권한 확인을 위해 사용
  const role = req.auth.sessionClaims?.metadata?.role || 'user';
  console.log('featurePost - User role:', role);
  // 1. 사용자 역할 출력
  // 2. 권한 확인

  // 관리자 권한 확인
  // 관리자가 아니면 추천 기능 사용 불가
  if (role !== 'admin') {
    return res.status(403).json('You cannot feature posts!');
  }

  try {
    // 서비스 함수 호출하여 포스트 추천 상태 토글
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await featurePostService(postId);

    // 포스트 조회 실패 시 에러 응답
    // 포스트가 없을 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 캐시 클리어
    // 추천 상태 변경 후 캐시 갱신
    postCache.clear();
    console.log('featurePost - Cache cleared after feature update');
    // 1. 캐시 클리어 출력
    // 2. 캐시 갱신 확인

    // 성공 응답
    // 클라이언트에 업데이트된 포스트 반환
    res.status(200).json(result.updatedPost);
  } catch (error) {
    console.error('featurePost - Error updating post:', error);
    // 1. 포스트 업데이트 중 발생한 에러 출력
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res
      .status(500)
      .json({ message: 'Error updating post', error: error.message });
  }
};

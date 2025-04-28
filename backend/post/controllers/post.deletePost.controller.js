// src/controllers/post.deletePost.controller.js

//====여기부터 수정됨====

// Post 모델을 가져옴
// MongoDB에서 포스트 데이터를 조작하기 위해 필요
import Post from '../../models/post.model.js';

// User 모델을 가져옴
// 사용자 인증 및 권한 확인을 위해 필요
import User from '../../models/user.model.js';

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { deletePostService } from '../services/post.deletePost.service.js';

// 캐시 유틸 가져옴
// 캐시 관리 기능을 분리하여 재사용 가능하도록 함
import {
  postCache,
  clearPostCache,
} from '../utils/post.deletePost.cache.util.js';

// deletePost 컨트롤러 함수
// 포스트 삭제 요청을 처리
export const deletePost = async (req, res) => {
  // 요청에서 인증된 사용자 ID 추출
  // 인증 여부 확인을 위해 사용
  const clerkUserId = req.auth.userId || null; // 타입스크립트 대비: null fallback 추가

  // 인증되지 않은 경우 에러 응답
  // 사용자 인증이 필수이므로 확인
  if (!clerkUserId) {
    console.log('deletePost - Authentication failed: No clerkUserId');
    return res.status(401).json('Not authenticated!');
  }

  console.log('deletePost - Clerk User ID:', clerkUserId);
  // 1. Clerk 사용자 ID 출력
  // 2. 인증 정보 확인

  console.log('deletePost - Request auth:', req.auth);
  // 1. 요청 인증 정보 출력
  // 2. 인증 정보 확인

  // 요청에서 역할 정보 추출 (기본값 'user')
  // 관리자 권한 확인을 위해 사용
  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  // 관리자일 경우 바로 삭제 처리
  // 관리자는 모든 포스트 삭제 가능
  if (role === 'admin') {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    console.log('deletePost - Admin delete attempted, result:', deletedPost);
    // 1. 관리자 삭제 시도 결과 출력
    // 2. 삭제된 포스트 확인

    // 포스트가 존재하지 않을 경우 에러 응답
    // 삭제 대상이 없음을 클라이언트에 알림
    if (!deletedPost) {
      return res.status(404).json('Post not found!');
    }

    // 캐시 초기화
    // 캐시된 데이터가 최신 상태를 반영하도록 갱신
    clearPostCache();
    // <!---여기수정
    // 1. 유틸 함수로 캐시 초기화
    // 2. 캐시 관리 로직을 유틸로 분리

    return res.status(200).json('Post has been deleted');
  }

  try {
    // 서비스 함수 호출하여 삭제 처리
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await deletePostService(req.params.id, clerkUserId);

    // 삭제 실패 시 에러 응답
    // 삭제 조건에 맞지 않거나 포스트가 없을 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 캐시 초기화
    // 캐시된 데이터가 최신 상태를 반영하도록 갱신
    clearPostCache();
    // <!---여기수정
    // 1. 유틸 함수로 캐시 초기화
    // 2. 캐시 관리 로직을 유틸로 분리

    // 성공 응답
    // 클라이언트에 삭제 완료 알림
    res.status(200).json('Post has been deleted');
  } catch (error) {
    console.error('deletePost - Error during deletion:', error);
    // 1. 삭제 중 발생한 에러 출력
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//====여기까지 수정됨====

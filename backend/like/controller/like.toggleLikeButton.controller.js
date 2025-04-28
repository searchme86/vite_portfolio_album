//====여기부터 수정됨====

// toggleLike 서비스 함수를 임포트
// - 의미: toggleLike 서비스 함수를 가져와 좋아요 토글 로직을 실행
// - 이유: controller에서 서비스 함수를 호출해 비즈니스 로직을 처리
// - 비유: 도서관에서 필요한 책(toggleLike)을 빌려오는 과정
import { toggleLike } from '../services/like.toggleLike.service.js';

export const toggleLikeButton = async (req, res, next) => {
  console.log('toggleLikeButton controller req', req);
  try {
    const auth = req.auth;
    // auth 객체와 sessionId 값을 확인
    // - 의미: 요청에서 인증 정보를 추출해 사용자 확인
    // - 이유: 좋아요 기능은 인증된 사용자만 사용할 수 있음
    console.log('toggleLikeButton - auth details:', {
      auth,
      sessionId: auth?.sessionId,
    });

    const postId = req.body.postId;
    // 요청 처리 로그
    // - 의미: 현재 처리 중인 사용자와 게시물 ID를 기록
    // - 이유: 디버깅 및 추적을 용이하게 하기 위함
    console.log('Route /toggle - Processing for logged-in user:', {
      userId: auth.userId,
      postId,
    });

    if (!postId) {
      console.error('Route /toggle - Missing postId');
      return res.status(400).json({ error: 'postId is required' });
    }

    // toggleLike 호출 직전 파라미터 확인
    // - 의미: 서비스 함수 호출 전에 전달할 인자 확인
    // - 이유: 잘못된 인자가 전달되었는지 확인하여 에러 방지
    console.log('toggleLikeButton - Calling toggleLike with params:', {
      postId,
      userId: auth.userId,
      sessionId: auth?.sessionId || null,
    });
    const result = await toggleLike(
      postId,
      auth.userId,
      auth?.sessionId || null
    );

    if (!result.success) {
      return res.status(result.status).json({ error: result.message });
    }

    return res.status(200).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    // 에러 로그
    // - 의미: 발생한 에러의 상세 정보를 기록
    // - 이유: 문제 해결 및 디버깅을 위해 필요
    console.error('Route /toggle - Error:', {
      message: error.message,
      stack: error.stack,
    });
    next(error);
  }
};

//====여기까지 수정됨====

// src/controllers/post.uploadAuth.controller.js

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { uploadAuthService } from '../services/post.uploadAuth.service.js';

// uploadAuth 컨트롤러 함수
// ImageKit 인증 파라미터 생성 요청을 처리
export const uploadAuth = async (req, res) => {
  try {
    // 서비스 함수 호출하여 ImageKit 인증 파라미터 생성
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await uploadAuthService();

    // 인증 파라미터 생성 실패 시 에러 응답
    // 유효하지 않은 파라미터일 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 성공 응답
    // 클라이언트에 인증 파라미터 반환
    res.status(200).json(result.authParams);
  } catch (error) {
    console.error('uploadAuth - Error generating auth params:', error);
    // 1. 인증 파라미터 생성 중 발생한 에러 출력
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res.status(500).json({
      message: 'Failed to generate auth params',
      error: error.message,
    });
  }
};

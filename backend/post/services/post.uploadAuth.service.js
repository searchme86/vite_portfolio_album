// src/services/post.uploadAuth.service.js

// ImageKit 인스턴스를 가져옴
// ImageKit 인증 파라미터 생성을 위해 필요
import { imagekit } from '../utils/post.uploadAuth.imagekit.util.js';

// ImageKit 인증 파라미터 생성 비즈니스 로직
// ImageKit 업로드에 필요한 인증 파라미터를 생성
export const uploadAuthService = async () => {
  // ImageKit 인증 파라미터 생성
  // 업로드 인증을 위해 필요한 토큰, 서명, 만료 시간 생성
  const authParams = imagekit.getAuthenticationParameters();
  console.log(
    'uploadAuthService - Generated ImageKit auth params:',
    authParams
  );
  // 1. 생성된 인증 파라미터 출력
  // 2. 인증 파라미터 확인

  // 인증 파라미터 유효성 검사
  // 필수 필드가 누락된 경우 에러 반환
  if (!authParams.token || !authParams.signature || !authParams.expire) {
    return {
      success: false,
      status: 400,
      message: { message: 'Invalid ImageKit auth parameters' },
    };
  }

  // 생성 성공
  // 인증 파라미터 반환
  return {
    success: true,
    status: 200,
    authParams,
  };
};

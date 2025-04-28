// src/utils/post.uploadAuth.imagekit.util.js

// ImageKit 라이브러리 가져옴
// ImageKit 인증 및 업로드 기능 사용을 위해 필요
import ImageKit from 'imagekit';

// ImageKit 인스턴스 생성
// 환경 변수를 사용하여 ImageKit 설정 초기화
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT || '', // 타입스크립트 대비: 빈 문자열 fallback
  publicKey: process.env.IK_PUBLIC_KEY || '', // 타입스크립트 대비: 빈 문자열 fallback
  privateKey: process.env.IK_PRIVATE_KEY || '', // 타입스크립트 대비: 빈 문자열 fallback
});

// 환경 변수 확인
// ImageKit 설정이 올바르게 로드되었는지 확인
console.log('ImageKit Config:', {
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY ? '[REDACTED]' : undefined,
});
// 1. ImageKit 환경 변수 출력
// 2. 환경 변수 로드 확인

// ImageKit 인스턴스 내보내기
// 다른 모듈에서 ImageKit 인스턴스를 공유하기 위해 사용
export { imagekit };

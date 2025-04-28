// src/api/post/write/createPostApi.js

// ===여기부터 코드 작업시작======
// 1. axios를 사용하여 포스트 생성 API 요청
// 2. 서버로 새 포스트 데이터를 전송
import axios from 'axios';

// 1. createPostApi 함수 정의
// 2. 포스트 데이터를 받아 API 요청
export const createPostApi = async (newPost, token) => {
  // 1. newPost가 객체인지 확인
  // 2. 오류 방지를 위해 기본값 설정
  const safeNewPost =
    typeof newPost === 'object' && newPost !== null ? newPost : {};
  console.log('createPostApi - Sending new post to server:', safeNewPost);

  // 1. token이 문자열인지 확인
  // 2. 유효하지 않은 token에 대한 폴백 처리
  const safeToken =
    typeof token === 'string' && token.trim() !== '' ? token : '';
  console.log('createPostApi - Using token:', safeToken || 'No token provided');

  // 여기부터 시작===
  // 1. API 요청을 try-catch로 감싸 에러 처리
  // 2. 네트워크 에러, 서버 에러 등을 캐치
  try {
    // 1. API 요청 실행
    // 2. 환경 변수에서 URL 가져오거나 기본값 사용
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/posts/create`,
      safeNewPost,
      {
        headers: { Authorization: `Bearer ${safeToken}` },
      }
    );

    // 1. 응답 데이터가 유효한지 확인
    // 2. 유효하지 않을 경우 폴백 데이터 반환
    const responseData =
      response && response.data
        ? response.data
        : { success: false, message: 'No data returned from server' };
    console.log('createPostApi - Response:', responseData);

    // 1. 응답 데이터 반환
    // 2. 뮤테이션에서 사용
    return responseData;
  } catch (error) {
    // 1. 에러 객체 생성
    // 2. 에러 메시지와 상태 코드를 포함
    const errorResponse = {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        'Failed to create post due to an unknown error',
      status: error.response?.status || 500,
    };
    console.error('createPostApi - Error:', errorResponse);

    // 1. 에러를 상위로 throw
    // 2. React Query의 onError 핸들러에서 처리 가능하도록
    throw errorResponse;
  }
  // 여기부터 끝===
  // <!---여기수정: try-catch와 폴백 코드를 추가하여 에러 처리 강화
};
// ===여기부터 코드 작업종료======

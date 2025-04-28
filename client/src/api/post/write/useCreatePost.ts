// src/api/post/write/useCreatePost.js

// ===여기부터 코드 작업시작======
// 1. 포스트 생성을 위한 최종 훅
// 2. useCreatePostMutation을 감싸서 사용
import { useCreatePostMutation } from './useCreatePostMutation';

// 1. useCreatePost 훅 정의
// 2. 폼 데이터를 받아 뮤테이션 실행
export const useCreatePost = (
  title,
  desc,
  content,
  imageUrls,
  tempTags,
  safeGetToken,
  safeNavigate
) => {
  // 1. 뮤테이션 훅 호출
  // 2. safeGetToken과 safeNavigate 주입
  const mutation = useCreatePostMutation(safeGetToken, safeNavigate);

  // 1. 폼 제출 핸들러 정의
  // 2. 뮤테이션 실행
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. imageUrls가 배열인지 확인
    // 2. 오류 방지를 위해 빈 배열로 폴백
    const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
    console.log('useCreatePost - safeImageUrls:', safeImageUrls);

    // 1. tempTags가 배열인지 확인
    // 2. 오류 방지를 위해 빈 배열로 폴백
    const safeTempTags = Array.isArray(tempTags) ? tempTags : [];
    console.log('useCreatePost - safeTempTags:', safeTempTags);

    // 1. 입력 데이터 유효성 검사
    // 2. 필수 필드가 비어있는지 확인
    if (!title || !desc || !content) {
      console.error(
        'useCreatePost - Validation failed: Required fields are missing'
      );
      // 1. 에러 메시지 설정
      // 2. Write.jsx에서 표시 가능하도록
      mutation.error = new Error(
        'Title, description, and content are required'
      );
      return;
    }

    // 1. 이미지 URL 배열 생성
    // 2. 유효한 URL만 포함, 추가 폴백 처리
    const urlsToSubmit = safeImageUrls.map((item) => {
      // 1. item이 객체인지 확인
      // 2. 객체가 아니면 빈 문자열로 폴백
      if (typeof item !== 'object' || item === null) {
        console.warn('useCreatePost - Invalid image item:', item);
        return '';
      }
      // 1. url 속성이 존재하는지 확인
      // 2. 없으면 빈 문자열로 폴백
      const url = item.url || '';
      console.log('useCreatePost - Processed image URL:', url);
      return url;
    });

    console.log(
      'useCreatePost - Submitting form with tags:',
      safeTempTags,
      'imageUrls:',
      urlsToSubmit
    );

    // 1. 뮤테이션 실행을 try-catch로 감싸기
    // 2. 비동기 에러 처리
    try {
      // 1. 뮤테이션 실행
      // 2. 포스트 데이터 전송
      mutation.mutate({
        title: title || '',
        desc: desc || '',
        content: content || '',
        img: urlsToSubmit,
        tags: safeTempTags,
      });
    } catch (error) {
      // 1. 에러 발생 시 콘솔 출력
      // 2. 디버깅 용도
      console.error('useCreatePost - Error during mutation:', error);
      // 1. 에러 메시지 설정
      // 2. Write.jsx에서 표시 가능하도록
      mutation.error = error;
    }
  };

  // 1. 뮤테이션 상태와 핸들러 반환
  // 2. Write.jsx에서 사용
  return {
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error,
    // 여기부터 시작===
    // 1. 에러 메시지 추가
    // 2. Write.jsx에서 사용자 피드백 제공 가능
    errorMessage: mutation.error ? mutation.error.message : null,
    // 여기부터 끝===
    handleSubmit,
  };
};
// ===여기부터 코드 작업종료======

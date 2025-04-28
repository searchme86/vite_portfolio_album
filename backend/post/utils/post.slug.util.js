// utils/post.slug.util.js

// slug 값 검증 함수
export const validateSlug = (slug) => {
  console.log('validateSlug - Validating slug:', slug);
  // 1. 검증할 slug 값 출력
  // 2. slug 값 확인

  const isValid = typeof slug === 'string' && slug.trim().length > 0;
  console.log('validateSlug - Validation result:', isValid);
  // 1. 검증 결과 출력
  // 2. slug 유효성 확인

  return isValid;
  // 1. slug의 유효성 여부 반환
  // 2. 서비스나 컨트롤러에서 사용 가능하도록
};

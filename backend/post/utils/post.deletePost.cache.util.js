// src/utils/post.deletePost.cache.util.js

// 캐시 저장용 Map, 쿼리 결과를 메모리에 저장
// 캐시를 통해 성능 최적화
const postCache = new Map();

// 캐시 초기화 함수
// 캐시된 데이터를 갱신하기 위해 사용
export const clearPostCache = () => {
  postCache.clear();
  console.log('clearPostCache - Cache cleared');
  // 1. 캐시 클리어 출력
  // 2. 캐시 갱신 확인
};

// 캐시 객체 내보내기
// 다른 모듈에서 캐시를 공유하기 위해 사용
export { postCache };

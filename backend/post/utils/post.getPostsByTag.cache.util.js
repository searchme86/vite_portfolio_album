// src/utils/post.getPostsByTag.cache.util.js

// 캐시 저장용 Map, 쿼리 결과를 메모리에 저장
// 캐시를 통해 성능 최적화
const postCache = new Map();

// 5분 TTL, 캐시 유효 기간 설정
// 캐시 데이터의 유효 시간을 정의
const CACHE_TTL = 5 * 60 * 1000;

// 캐시 객체와 TTL 내보내기
// 다른 모듈에서 캐시와 TTL을 공유하기 위해 사용
export { postCache, CACHE_TTL };

// backend/like/utils/like.cache.util.js

// 의미: 캐시 TTL 환경 변수로 정의
// 이유: 환경별로 캐시 지속 시간 조정 가능
// 비유: 도서관 환경에 따라 책 대여 기록 보관 기간 조정
export const CACHE_TTL = process.env.CACHE_TTL
  ? parseInt(process.env.CACHE_TTL)
  : 5 * 60 * 1000; // 의미: 환경 변수에서 CACHE_TTL 가져오기, 기본값 5분
// 이유: 환경별 설정 가능, 기본값으로 5분 설정
// 비유: 기본적으로 5분 동안 기록 보관, 환경에 따라 조정 가능

// 여기부터 수정===
// 의미: 캐시 최대 크기 정의
// 이유: 메모리 사용량 제한
// 비유: 선반에 보관할 수 있는 책 목록 수 제한
export const CACHE_MAX_SIZE = process.env.CACHE_MAX_SIZE
  ? parseInt(process.env.CACHE_MAX_SIZE)
  : 1000; // 의미: 환경 변수에서 최대 캐시 크기 가져오기, 기본값 1000
// 이유: 메모리 과사용 방지
// 비유: 선반에 너무 많은 책이 쌓이지 않도록 제한
// 여기부터 끝===

// 의미: 캐시 저장용 Map 초기화
// 이유: 메모리 내 캐싱 구현
// 비유: 자주 요청받는 책 목록을 보관할 선반 준비
const likeCache = new Map();

// 의미: 캐시에서 데이터 조회 함수
// 이유: 캐시 히트 여부 확인
// 비유: 선반에서 요청받은 책 목록 확인
export const getCachedData = (key) => {
  console.log('getCachedData - Checking cache for key:', key); // 의미: 캐시 키 디버깅
  // 이유: 캐시 조회 확인
  // 비유: 선반에서 책 목록 찾기 로그
  const cached = likeCache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    console.log('getCachedData - Cache hit for key:', key); // 의미: 캐시 히트 디버깅
    // 이유: 캐시 히트 확인
    // 비유: 선반에서 책 목록 찾음 로그
    return cached.data;
  }
  console.log('getCachedData - Cache miss for key:', key); // 의미: 캐시 미스 디버깅
  // 이유: 캐시 미스 확인
  // 비유: 선반에 책 목록 없음 로그
  return null;
};

// 의미: 캐시에 데이터 저장 함수
// 이유: 새 데이터 캐싱
// 비유: 선반에 새 책 목록 추가
export const setCachedData = (key, data) => {
  console.log('setCachedData - Caching data for key:', key); // 의미: 캐싱 디버깅
  // 이유: 캐싱 확인
  // 비유: 선반에 책 목록 추가 로그
  // 여기부터 수정===
  if (likeCache.size >= CACHE_MAX_SIZE) {
    const firstKey = likeCache.keys().next().value; // 의미: 가장 오래된 캐시 키 가져오기
    // 이유: 캐시 크기 제한 초과 시 오래된 항목 제거
    // 비유: 선반이 가득 차면 가장 오래된 책 제거
    likeCache.delete(firstKey);
    console.log(
      'setCachedData - Cache size limit reached, removed key:',
      firstKey
    ); // 의미: 캐시 크기 제한 디버깅
    // 이유: 캐시 크기 관리 확인
    // 비유: 오래된 책 제거 로그
  }
  // 여기부터 끝===
  likeCache.set(key, { data, timestamp: Date.now() });
};

// 의미: 캐시 초기화 함수
// 이유: 데이터 갱신 시 캐시 무효화
// 비유: 선반 정리 후 새 책 목록 준비
export const clearCache = () => {
  console.log('clearCache - Clearing all cached data'); // 의미: 캐시 초기화 디버깅
  // 이유: 캐시 초기화 확인
  // 비유: 선반 정리 로그
  likeCache.clear();
};

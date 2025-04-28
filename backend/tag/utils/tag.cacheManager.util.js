// 캐시 데이터를 관리하는 유틸리티 모듈
const postCache = new Map(); // 의미: 캐시 데이터를 저장할 Map 객체 생성
// 이유: 키-값 쌍으로 캐시를 효율적으로 관리하기 위해 Map 사용
// 비유: 도서관 대출 기록을 빠르게 찾기 위해 이름표와 책을 쌍으로 보관하는 서랍장

const CACHE_TTL = 5 * 60 * 1000; // 의미: 캐시 유효 기간을 5분(밀리초)으로 설정
// 이유: 캐시가 너무 오래 남아 메모리 낭비를 막고 최신성을 유지하기 위함
// 비유: 책 대출 기간을 5일로 정해서 너무 오래 빌리지 않게 하는 규칙

export const getCachedData = (cacheKey) => {
  // 의미: 주어진 키로 캐시된 데이터를 조회
  // 이유: 캐시 히트를 확인해 DB 조회를 줄이기 위해
  // 비유: 서랍장에서 이름표를 보고 이미 빌린 책이 있는지 확인
  const cachedResult = postCache.get(cacheKey); // 의미: 캐시에서 데이터 가져오기
  // 이유: Map의 get 메서드로 빠르게 값을 조회
  if (!cachedResult) {
    // 의미: 캐시에 데이터가 없는지 확인
    // 이유: 캐시 미스 시 null 반환으로 후속 로직 처리
    // 비유: 서랍이 비었으면 "없다"고 알려줌
    return null;
  }
  const isCacheValid = Date.now() - cachedResult.timestamp < CACHE_TTL; // 의미: 캐시가 유효한지 확인
  // 이유: TTL을 초과하면 캐시를 무효화하기 위해
  // 비유: 대출 기간이 지났는지 확인
  return isCacheValid ? cachedResult.data : null; // 의미: 유효하면 데이터 반환, 아니면 null
  // 이유: 최신 데이터만 제공하기 위해
  // 비유: 대출 기간 내 책만 꺼내줌
};

export const setCachedData = (cacheKey, data) => {
  // 의미: 캐시에 데이터를 저장
  // 이유: 다음 요청에서 DB 대신 캐시를 사용해 성능 개선
  // 비유: 새로 빌린 책을 서랍장에 넣어 다음에 쉽게 찾게 함
  const cacheEntry = { data, timestamp: Date.now() }; // 의미: 데이터와 저장 시간 객체 생성
  // 이유: TTL 체크를 위해 타임스탬프 포함
  // 비유: 책에 대출 날짜를 적어서 언제 빌렸는지 알게 함
  postCache.set(cacheKey, cacheEntry); // 의미: Map에 캐시 데이터 저장
  // 이유: 빠른 조회를 위해 Map 사용
  // 비유: 서랍장에 이름표와 책을 넣음
};

export const clearCache = () => {
  // 의미: 캐시를 초기화
  // 이유: 메모리 낭비를 막고 새로운 요청에 대비하기 위해
  // 비유: 서랍장을 비워서 새로운 책을 넣을 준비
  postCache.clear(); // 의미: Map의 모든 데이터 삭제
  // 이유: 메모리 해제 및 초기화
  // 비유: 서랍장을 깨끗하게 청소
};

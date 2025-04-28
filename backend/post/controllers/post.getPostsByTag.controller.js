// src/controllers/post.getPostsByTag.controller.js

// 서비스 함수를 가져옴
// 비즈니스 로직을 분리하여 컨트롤러는 요청/응답 처리만 담당
import { getPostsByTagService } from '../services/post.getPostsByTag.service.js';

// 캐시 유틸 가져옴
// 캐시 관리 기능을 분리하여 재사용 가능하도록 함
import {
  postCache,
  CACHE_TTL,
} from '../utils/post.getPostsByTag.cache.util.js';

// getPostsByTag 컨트롤러 함수
// 태그로 포스트 목록 조회 요청을 처리
export const getPostsByTag = async (req, res) => {
  // 요청 쿼리에서 페이지 번호 추출 (기본값 1)
  // 페이지네이션을 위해 사용
  const page = parseInt(req.query.page) || 1; // 타입스크립트 대비: parseInt로 타입 안정성 확보

  // 요청 쿼리에서 페이지당 포스트 수 추출 (기본값 2)
  // 페이지네이션을 위해 사용
  const limit = parseInt(req.query.limit) || 2; // 타입스크립트 대비: parseInt로 타입 안정성 확보

  // 요청 쿼리에서 태그 추출
  // 조회할 태그를 식별하기 위해 사용
  const tag = req.query.tag || null; // 타입스크립트 대비: null fallback 추가

  console.log('getPostsByTag - Requested tag:', tag);
  // 1. 요청된 태그 출력
  // 2. 요청된 태그 확인

  // 태그 유효성 검사
  // 태그가 없거나 빈 문자열인 경우 에러 반환
  if (!tag || tag.trim() === '') {
    console.log('getPostsByTag - Invalid tag:', tag);
    // 1. 디버깅 로그
    // 2. 유효하지 않은 태그 확인
    return res.status(400).json({ message: 'Tag is required' });
  }

  // 캐시 키 생성
  // 태그, 페이지, 제한 수를 기반으로 캐싱
  const cacheKey = JSON.stringify({ tag, page, limit });
  console.log('getPostsByTag - Generated cacheKey:', cacheKey);
  // 1. 생성된 캐시 키 출력
  // 2. 캐시 키 확인

  // 캐시에서 결과 조회
  // 캐시 히트 여부 확인
  const cachedResult = postCache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    console.log('getPostsByTag - Returning cached result for:', cacheKey);
    // 1. 디버깅 로그
    // 2. 캐시 히트 확인
    return res.status(200).json(cachedResult.data);
  }

  try {
    // 서비스 함수 호출하여 태그로 포스트 조회
    // 비즈니스 로직을 서비스로 분리하여 컨트롤러는 요청/응답만 처리
    const result = await getPostsByTagService(tag, page, limit);

    // 조회 실패 시 에러 응답
    // 태그에 해당하는 포스트가 없을 경우
    if (!result.success) {
      return res.status(result.status).json(result.message);
    }

    // 캐시에 결과 저장
    // 캐싱으로 성능 최적화
    postCache.set(cacheKey, { data: result.response, timestamp: Date.now() });
    console.log('getPostsByTag - Cached result for:', cacheKey);
    // 1. 캐시에 저장된 결과 출력
    // 2. 캐싱 확인

    // 성공 응답
    // 클라이언트에 조회된 포스트와 페이지네이션 정보 반환
    res.status(200).json(result.response);
  } catch (error) {
    console.error('getPostsByTag - Error fetching posts:', error);
    // 1. 디버깅 로그
    // 2. 에러 원인 확인

    // 서버 에러 응답
    // 클라이언트에 에러 메시지 전달
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

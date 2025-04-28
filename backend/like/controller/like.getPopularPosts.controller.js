// backend/like/controller/like.getPopularPosts.controller.js

import { getPopularPosts } from '../services/like.getPopularPosts.service.js'; // 의미: 인기 포스트 조회 서비스 가져오기
// 이유: 인기 포스트 조회 로직 호출
// 비유: 도서관 데스크에서 사서(서비스)를 불러오기

import { getCachedData, setCachedData } from '../utils/like.cache.util.js'; // 의미: 캐싱 유틸 가져오기
// 이유: 캐싱 로직 적용
// 비유: 도서관 데스크에서 선반(캐시) 활용

// 의미: 좋아요 수 기준 상위 포스트 목록 조회 컨트롤러
// 이유: HTTP 요청 처리 및 응답 제공
// 비유: 도서관 데스크에서 손님 요청 처리
export const getPopularPostsController = async (req, res) => {
  console.log('getPopularPostsController - Request received'); // 의미: 요청 수신 로그
  // 이유: 컨트롤러 호출 확인
  // 비유: 도서관 데스크에서 손님 요청 도착 확인

  console.log('getPopularPostsController - Request query:', req.query); // 의미: 요청 쿼리 디버깅
  // 이유: 페이지네이션 파라미터 확인
  // 비유: 손님의 페이지 요청 정보 확인 로그

  try {
    const page = parseInt(req.query.page) || 1; // 의미: 페이지 번호 추출 (기본값 1)
    // 이유: 페이지네이션 적용
    // 비유: 손님이 보려는 페이지 번호 확인
    const limit = parseInt(req.query.limit) || 10; // 의미: 페이지당 항목 수 추출 (기본값 10)
    // 이유: 페이지네이션 적용
    // 비유: 손님이 한 페이지에 보려는 항목 수 확인

    // 의미: 캐시 키 생성
    // 이유: 동일한 요청 캐싱
    // 비유: 손님 요청을 선반에 저장할 위치 확인
    const cacheKey = `popularPosts:page:${page}:limit:${limit}`;
    console.log('getPopularPostsController - Generated cache key:', cacheKey); // 의미: 캐시 키 디버깅
    // 이유: 캐시 키 확인
    // 비유: 선반 위치 확인 로그

    // 의미: 캐시에서 결과 조회
    // 이유: 캐시 히트 시 DB 조회 생략
    // 비유: 선반에서 인기 책 목록 확인
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
      console.log(
        'getPopularPostsController - Returning cached result for:',
        cacheKey
      ); // 의미: 캐시 히트 디버깅
      // 이유: 캐시 히트 확인
      // 비유: 선반에서 바로 결과 반환 로그
      return res.status(200).json({
        message: 'Popular posts retrieved successfully',
        data: cachedResult,
      });
    }

    // 의미: 인기 포스트 조회 서비스 호출
    // 이유: 인기 포스트 목록과 페이지네이션 정보 계산
    // 비유: 사서에게 인기 책 목록 요청
    const { popularPosts, totalPopularPosts, hasMore } = await getPopularPosts(
      page,
      limit
    );
    console.log('getPopularPostsController - Service result:', {
      popularPosts,
      totalPopularPosts,
      hasMore,
    }); // 의미: 서비스 결과 디버깅
    // 이유: 결과 확인
    // 비유: 사서의 처리 결과 확인 로그

    // 여기부터 시작===
    // <!---여기수정
    // 의미: 응답 데이터 구조 조정
    // 이유: 클라이언트에서 기대하는 구조로 맞추기 위해 (posts, totalPosts, hasMore)
    // 비유: 손님이 원하는 형식으로 책 목록 정리
    const responseData = {
      posts: popularPosts || [], // 의미: 포스트 목록, undefined 방지
      // 이유: 클라이언트에서 posts로 접근하므로 구조 일치
      // 비유: 책 목록을 손님이 원하는 이름으로 전달
      totalPosts: totalPopularPosts, // 의미: 전체 포스트 수
      // 이유: 클라이언트에서 totalPosts로 접근
      // 비유: 전체 책 수를 손님이 원하는 이름으로 전달
      hasMore, // 의미: 더 가져올 데이터 여부
      // 이유: 페이지네이션 정보 제공
      // 비유: 더 가져올 책이 있는지 알려주기
    };
    // 여기부터 끝===

    // 의미: 결과를 캐시에 저장
    // 이유: 이후 동일 요청 시 캐시 사용
    // 비유: 선반에 인기 책 목록 기록
    setCachedData(cacheKey, responseData);
    console.log('getPopularPostsController - Cached result for:', cacheKey); // 의미: 캐싱 디버깅
    // 이유: 캐싱 확인
    // 비유: 선반에 결과 저장 로그

    // 의미: 성공 응답 반환
    // 이유: 클라이언트에 결과 전달
    // 비유: 손님에게 인기 책 목록과 페이지 정보 알려주기
    return res.status(200).json({
      message: 'Popular posts retrieved successfully',
      data: responseData,
    });
  } catch (error) {
    console.error('getPopularPostsController - Error:', error.message); // 의미: 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 문제 발생 시 일지에 기록
    return res.status(500).json({ message: error.message });
  }
};

// backend/like/controller/like.getLikeCount.controller.js

import { getLikeCount } from '../services/like.getLikeCount.service.js'; // 의미: 좋아요 수 조회 서비스 가져오기
// 이유: 좋아요 수 조회 로직 호출
// 비유: 도서관 데스크에서 사서(서비스)를 불러오기

// 여기부터 수정===
import { getCachedData, setCachedData } from '../utils/like.cache.util.js'; // 의미: 캐싱 유틸 가져오기 <!---여기추가
// 이유: 캐싱 로직 적용
// 비유: 도서관 데스크에서 선반(캐시) 활용
// 여기부터 끝===

// 의미: 특정 포스트의 좋아요 수 조회 컨트롤러
// 이유: HTTP 요청 처리 및 응답 제공
// 비유: 도서관 데스크에서 손님 요청 처리
export const getLikeCountController = async (req, res) => {
  console.log('getLikeCountController - Request params:', req.params); // 의미: 요청 파라미터 디버깅
  // 이유: 요청 데이터 확인
  // 비유: 손님의 요청 정보 확인 로그

  try {
    const { postId } = req.params; // 의미: 요청 파라미터에서 postId 추출
    // 이유: 좋아요 수를 조회할 포스트 ID 필요
    // 비유: 손님이 확인하려는 책 정보 확인

    // 의미: postId 유효성 검사
    // 이유: 유효하지 않은 postId로 요청 방지
    // 비유: 손님이 요청한 책이 도서관에 있는지 확인
    if (!postId) {
      console.log('getLikeCountController - Invalid postId:', postId); // 의미: 유효성 검사 실패 디버깅
      // 이유: 에러 원인 추적
      // 비유: 잘못된 책 요청 로그
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // 여기부터 수정===
    // 의미: 캐시 키 생성
    // 이유: 동일한 요청 캐싱
    // 비유: 손님 요청을 선반에 저장할 위치 확인
    const cacheKey = `likeCount:${postId}`;
    console.log('getLikeCountController - Generated cache key:', cacheKey); // 의미: 캐시 키 디버깅
    // 이유: 캐시 키 확인
    // 비유: 선반 위치 확인 로그

    // 의미: 캐시에서 결과 조회
    // 이유: 캐시 히트 시 DB 조회 생략
    // 비유: 선반에서 책 대여 횟수 확인
    const cachedResult = getCachedData(cacheKey);
    if (cachedResult) {
      console.log(
        'getLikeCountController - Returning cached result for:',
        cacheKey
      ); // 의미: 캐시 히트 디버깅
      // 이유: 캐시 히트 확인
      // 비유: 선반에서 바로 결과 반환 로그
      return res.status(200).json({
        message: 'Like count retrieved successfully',
        data: { postId, likeCount: cachedResult },
      });
    }
    // 여기부터 끝===

    // 의미: 좋아요 수 조회 서비스 호출
    // 이유: 좋아요 수 계산
    // 비유: 사서에게 책 대여 횟수 확인 요청
    const likeCount = await getLikeCount(postId);
    console.log('getLikeCountController - Service result:', likeCount); // 의미: 서비스 결과 디버깅
    // 이유: 결과 확인
    // 비유: 사서의 처리 결과 확인 로그

    // 여기부터 수정===
    // 의미: 결과를 캐시에 저장
    // 이유: 이후 동일 요청 시 캐시 사용
    // 비유: 선반에 책 대여 횟수 기록
    setCachedData(cacheKey, likeCount);
    console.log('getLikeCountController - Cached result for:', cacheKey); // 의미: 캐싱 디버깅
    // 이유: 캐싱 확인
    // 비유: 선반에 결과 저장 로그
    // 여기부터 끝===

    // 의미: 성공 응답 반환
    // 이유: 클라이언트에 결과 전달
    // 비유: 손님에게 대여 횟수 알려주기
    return res.status(200).json({
      message: 'Like count retrieved successfully',
      data: { postId, likeCount },
    });
  } catch (error) {
    console.error('getLikeCountController - Error:', error.message); // 의미: 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 문제 발생 시 일지에 기록
    return res.status(500).json({ message: error.message });
  }
};

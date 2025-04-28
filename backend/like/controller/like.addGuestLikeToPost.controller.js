import { toggleLike } from '../services/like.toggleLike.service.js'; // 의미: 좋아요 토글 서비스 가져오기
// 이유: 좋아요 추가/제거 로직 호출
// 비유: 도서관 데스크에서 사서(서비스)를 불러오기

import { generateSessionId } from '../lib/like.generateSessionId.lib.js'; // 의미: 세션 ID 생성 유틸 가져오기
// 이유: 비로그인 유저 식별
// 비유: 임시 손님에게 임시 회원증 발급

import { clearCache } from '../utils/like.cache.util.js'; // 의미: 캐시 초기화 유틸 가져오기
// 이유: 좋아요 변경 시 캐시 갱신
// 비유: 도서관 데스크에서 선반(캐시) 정리

// 의미: 비로그인 유저의 좋아요 추가/제거 컨트롤러
// 이유: HTTP 요청 처리 및 응답 제공
// 비유: 도서관 데스크에서 임시 손님 요청 처리
export const addGuestLikeToPost = async (req, res) => {
  console.log('addGuestLikeToPost - Request body:', req.body); // 의미: 요청 본문 디버깅
  // 이유: 요청 데이터 확인
  // 비유: 임시 손님의 요청 정보 확인 로그

  try {
    const { postId } = req.body; // 의미: 요청 본문에서 postId 추출
    // 이유: 좋아요를 추가/제거할 포스트 ID 필요
    // 비유: 임시 손님이 대여하려는 책 정보 확인

    const sessionId = req.cookies?.sessionId || null; // 의미: 쿠키에서 세션 ID 추출, undefined 방지
    // 이유: req.cookies가 undefined일 경우 에러 방지
    // 비유: 손님의 가방이 없으면(null) 임시 회원증 확인 없이 진행

    // 의미: postId 유효성 검사
    // 이유: 유효하지 않은 postId로 요청 방지
    // 비유: 임시 손님이 요청한 책이 도서관에 있는지 확인
    if (!postId) {
      console.log('addGuestLikeToPost - Invalid postId:', postId); // 의미: 유효성 검사 실패 디버깅
      // 이유: 에러 원인 추적
      // 비유: 잘못된 책 요청 로그
      return res.status(400).json({ message: 'Post ID is required' });
    }

    // 의미: 세션 ID 확인 및 생성
    // 이유: 비로그인 유저 식별
    // 비유: 임시 손님에게 임시 회원증 발급
    let newSessionId = sessionId;
    if (!sessionId) {
      newSessionId = generateSessionId(); // 의미: 새로운 세션 ID 생성
      // 이유: 비로그인 유저 식별을 위해 새 ID 생성
      // 비유: 임시 손님에게 새 임시 회원증 발급

      const isProduction = process.env.NODE_ENV === 'production'; // 의미: 프로덕션 환경 여부 확인
      // 이유: 프로덕션에서는 secure 쿠키 옵션 필요
      // 비유: 도서관이 공식 운영 중인지 확인

      const sessionMaxAge = process.env.SESSION_MAX_AGE
        ? parseInt(process.env.SESSION_MAX_AGE)
        : 30 * 24 * 60 * 60 * 1000; // 의미: 세션 유효 기간 설정, 기본값 30일
      // 이유: 쿠키 유효 기간 환경별 설정
      // 비유: 임시 회원증의 유효 기간 설정

      res.cookie('sessionId', newSessionId, {
        httpOnly: true, // 의미: 클라이언트 스크립트 접근 방지
        // 이유: 보안 강화
        // 비유: 임시 회원증을 손님의 손이 아닌 안전한 곳에 보관
        secure: isProduction, // 의미: 프로덕션에서만 secure 쿠키 사용
        // 이유: HTTPS 환경에서만 쿠키 전송
        // 비유: 안전한 환경에서만 회원증 전달
        sameSite: isProduction ? 'Strict' : 'Lax', // 의미: CSRF 공격 방지
        // 이유: 프로덕션에서는 Strict, 개발에서는 Lax로 설정
        // 비유: 외부 도서관에서 온 손님의 접근 제한
        maxAge: sessionMaxAge, // 의미: 쿠키 유효 기간 설정
        // 이유: 세션 만료 시간 관리
        // 비유: 임시 회원증의 유효 기간 설정
      }); // 의미: 세션 ID를 쿠키에 저장
      // 이유: 이후 요청에서 재사용
      // 비유: 임시 회원증을 손님에게 전달

      console.log('addGuestLikeToPost - Generated sessionId:', newSessionId); // 의미: 세션 ID 생성 디버깅
      // 이유: 세션 ID 확인
      // 비유: 임시 회원증 발급 로그
    }

    // 의미: 좋아요 토글 서비스 호출
    // 이유: 좋아요 추가/제거 처리
    // 비유: 사서에게 책 대여/반납 요청
    const result = await toggleLike(postId, null, newSessionId);

    console.log('addGuestLikeToPost - Service result:', result); // 의미: 서비스 결과 디버깅
    // 이유: 결과 확인
    // 비유: 사서의 처리 결과 확인 로그

    // 의미: 처리 결과에 따른 응답
    // 이유: 클라이언트에 결과 전달
    // 비유: 임시 손님에게 대여/반납 결과 알려주기
    if (!result.success) {
      return res.status(result.status).json({ message: result.message });
    }

    // 의미: 캐시 초기화
    // 이유: 좋아요 변경 시 캐시 갱신
    // 비유: 선반 정리 후 새 대여 기록 반영
    clearCache();
    console.log('addGuestLikeToPost - Cache cleared after like toggle'); // 의미: 캐시 초기화 디버깅
    // 이유: 캐시 초기화 확인
    // 비유: 선반 정리 확인 로그

    return res.status(200).json({
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    console.error('addGuestLikeToPost - Error:', error.message); // 의미: 에러 디버깅
    // 이유: 에러 원인 추적
    // 비유: 문제 발생 시 일지에 기록
    return res.status(500).json({ message: error.message });
  }
};

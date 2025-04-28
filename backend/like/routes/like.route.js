/**
 * @file like.route.js
 * @description 좋아요 관련 라우팅 설정
 * @reason 좋아요 관련 API 엔드포인트 정의
 * @analogy 도서관에서 좋아요 관련 안내 표지판 설치
 */
import express from 'express'; // @type {Object} - Express 라우터
// @description Express 라우터 가져오기
// @reason 라우팅 설정
// @analogy 도서관에서 안내 표지판 준비

import { addLikeToPost } from '../controller/like.addLikeToPost.controller.js'; // @type {Function} - 좋아요 추가 컨트롤러
// @description 좋아요 추가 컨트롤러 가져오기
// @reason 좋아요 토글 처리
// @analogy 도서관에서 대여 요청 처리

import { getLikeCountController } from '../controller/like.getLikeCount.controller.js'; // @type {Function} - 좋아요 카운트 조회 컨트롤러
// @description 좋아요 카운트 조회 컨트롤러 가져오기
// @reason 포스트별 좋아요 수 조회
// @analogy 도서관에서 책별 대여 횟수 확인

import { getLikesByPostController } from '../controller/like.getLikesByPost.controller.js'; // @type {Function} - 포스트별 좋아요 목록 조회 컨트롤러
// @description 포스트별 좋아요 목록 조회 컨트롤러 가져오기
// @reason 포스트별 좋아요 목록 조회
// @analogy 도서관에서 책별 대여 목록 확인

import { getPopularPostsController } from '../controller/like.getPopularPosts.controller.js'; // @type {Function} - 인기 포스트 조회 컨트롤러
// @description 인기 포스트 조회 컨트롤러 가져오기
// @reason 좋아요 많은 포스트 조회
// @analogy 도서관에서 인기 책 목록 확인

import { checkLikeStatusController } from '../controller/like.checkLikeStatus.controller.js'; // @type {Function} - 좋아요 상태 확인 컨트롤러
// @description 좋아요 상태 확인 컨트롤러 가져오기
// @reason 사용자별 좋아요 상태 확인
// @analogy 도서관에서 손님의 대여 상태 확인

import { getUserLikes } from '../controller/like.getUserLikes.controller.js'; // @type {Function} - 사용자별 좋아요 상태 조회 컨트롤러
// @description 사용자별 좋아요 상태 조회 컨트롤러 가져오기
// @reason 사용자별 좋아요 상태와 카운트 동기화
// @analogy 도서관에서 손님별 대여 상태와 횟수 확인

import { requireAuth } from '@clerk/express'; // @type {Function} - Clerk 인증 미들웨어
// @description Clerk 인증 미들웨어 가져오기
// @reason 인증된 사용자만 접근 가능
// @analogy 도서관에서 회원증 확인

const router = express.Router(); // @type {Object} - Express 라우터 인스턴스
// @description Express 라우터 인스턴스 생성
// @reason 라우팅 경로 설정
// @analogy 도서관에서 안내 표지판 설치 시작

router.post('/toggle', requireAuth(), addLikeToPost); // @description 좋아요 토글 엔드포인트
// @reason 포스트에 좋아요 추가/제거
// @analogy 도서관에서 대여 요청 처리

router.get('/:postId/count', getLikeCountController); // @description 포스트별 좋아요 카운트 조회 엔드포인트
// @reason 포스트별 좋아요 수 조회
// @analogy 도서관에서 책별 대여 횟수 확인

router.get('/:postId/list', getLikesByPostController); // @description 포스트별 좋아요 목록 조회 엔드포인트
// @reason 포스트별 좋아요 목록 조회
// @analogy 도서관에서 책별 대여 목록 확인

router.get('/popular', getPopularPostsController); // @description 인기 포스트 조회 엔드포인트
// @reason 좋아요 많은 포스트 조회
// @analogy 도서관에서 인기 책 목록 확인

router.get('/:postId/status', checkLikeStatusController); // @description 좋아요 상태 확인 엔드포인트
// @reason 사용자별 좋아요 상태 확인
// @analogy 도서관에서 손님의 대여 상태 확인

console.log('router, /user');
router.get('/user', requireAuth(), getUserLikes); // @description 사용자별 좋아요 상태 조회 엔드포인트
// @reason 사용자별 좋아요 상태와 카운트 동기화
// @analogy 도서관에서 손님별 대여 상태와 횟수 확인

export default router; // @description 라우터 내보내기
// @reason 다른 파일에서 사용 가능하도록
// @analogy 도서관에서 안내 표지판 공유

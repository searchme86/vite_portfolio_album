/**
 * @file draft.route.js
 * @description 드래프트 관련 라우팅 설정
 * @reason 드래프트 관련 API 엔드포인트 정의
 * @analogy 도서관에서 드래프트 관련 안내 표지판 설치
 */
import express from 'express'; // @type {Object} - Express 라우터
// @description Express 라우터 가져오기
// @reason 라우팅 설정
// @analogy 도서관에서 안내 표지판 준비

import { autoSaveDraftController } from '../controller/draft.autoSaveDraft.controller.js'; // @type {Function} - 자동저장 컨트롤러
// @description 자동저장 컨트롤러 가져오기
// @reason 드래프트 자동저장 처리
// @analogy 도서관에서 자료 자동저장 요청 처리

import { temporarySaveDraftController } from '../controller/draft.temporarySaveDraft.controller.js'; // @type {Function} - 임시저장 컨트롤러
// @description 임시저장 컨트롤러 가져오기
// @reason 드래프트 임시저장 처리
// @analogy 도서관에서 자료 임시저장 요청 처리

import { fetchDraftController } from '../controller/draft.fetchDraft.controller.js'; // @type {Function} - 드래프트 조회 컨트롤러
// @description 드래프트 조회 컨트롤러 가져오기
// @reason 특정 드래프트 데이터 조회
// @analogy 도서관에서 특정 자료 조회 요청 처리

import { requireAuth } from '@clerk/express'; // @type {Function} - Clerk 인증 미들웨어
// @description Clerk 인증 미들웨어 가져오기
// @reason 인증된 사용자만 접근 가능
// @analogy 도서관에서 회원증 확인

const router = express.Router(); // @type {Object} - Express 라우터 인스턴스
// @description Express 라우터 인스턴스 생성
// @reason 라우팅 경로 설정
// @analogy 도서관에서 안내 표지판 설치 시작

router.post('/auto-save', requireAuth(), autoSaveDraftController); // @description 자동저장 엔드포인트
// @reason 드래프트 데이터를 자동저장
// @analogy 도서관에서 자료 자동저장 요청 처리

router.post('/temporary-save', requireAuth(), temporarySaveDraftController); // @description 임시저장 엔드포인트
// @reason 드래프트 데이터를 임시저장
// @analogy 도서관에서 자료 임시저장 요청 처리

router.get('/fetch/:draftId', requireAuth(), fetchDraftController); // @description 드래프트 조회 엔드포인트
// @reason 특정 드래프트 데이터 조회
// @analogy 도서관에서 특정 자료 조회 요청 처리

console.log('router, /draft'); // @description 라우터 설정 디버깅
// @reason 라우터 설정 상태 확인
// @analogy 도서관에서 안내 표지판 설치 완료 확인

export default router; // @description 라우터 내보내기
// @reason 다른 파일에서 사용 가능하도록
// @analogy 도서관에서 안내 표지판 공유

// **작동 매커니즘**
// 1. `express.Router()`로 라우터 인스턴스 생성: 라우팅 경로를 정의할 준비.
// 2. `requireAuth` 미들웨어 적용: 인증된 사용자만 접근 가능하도록 설정.
// 3. `/auto-save` POST 라우트: `autoSaveDraftController`를 통해 자동저장 처리.
// 4. `/temporary-save` POST 라우트: `temporarySaveDraftController`를 통해 임시저장 처리.
// 5. `/fetch/:draftId` GET 라우트: `fetchDraftController`를 통해 특정 드래프트 조회 처리.
// 6. 라우터 디버깅 로그: 라우터 설정 상태 확인.
// 7. `export default`로 라우터 내보내기: 다른 파일에서 라우터 사용 가능.
// @reason 드래프트 관련 API 엔드포인트를 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 드래프트 관련 안내 표지판 설치.

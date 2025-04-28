import { Router } from 'express';
import { sessionCreateSessionController } from '../controller/session.CreateSession.controller.js';
// 의미: 세션 생성 컨트롤러
// 이유: 사용자가 로그인할 때 세션을 생성하기 위해
// 비유: 도서관에서 회원가입할 때 회원증 발급
import { sessionGetCsrfTokenController } from '../controller/session.GetCsrfToken.controller.js';
// 의미: CSRF 토큰 가져오기 컨트롤러
// 이유: 클라이언트에서 CSRF 공격 방지하기 위해
// 비유: 도서관에서 요청서에 인증 코드 발급`
import { sessionVerifySessionController } from '../controller/session.VerifySession.controller.js';
// 의미: 세션 검증 컨트롤러
// 이유: 사용자가 로그인 상태인지 확인하기 위해
// 비유: 도서관에서 회원증으로 대출 가능 여부 확인
// 의미: 세션 삭제 컨트롤러
// 이유: 사용자가 로그아웃할 때 세션을 삭제하기 위해
// 비유: 도서관에서 회원증 반납
import { sessionDeleteSessionController } from '../controller/session.DeleteSession.controller.js';
import { sessionMiddlewareCsrfUtil } from '../middlewares/session.MiddlewareCsrf.middleware.js';
// 의미: CSRF 미들웨어
// 이유: CSRF 공격 방지하기 위해
// 비유: 도서관에서 요청서에 인증 코드 확인
// 의미: 세션 미들웨어
// 이유: 세션 관리하기 위해
// 비유: 도서관에서 회원증 관리

const router = Router();

router.post('/session', sessionCreateSessionController);
router.get(
  '/csrf-token',
  sessionMiddlewareCsrfUtil,
  sessionGetCsrfTokenController
);
router.get(
  '/session/verify',
  sessionMiddlewareCsrfUtil,
  sessionVerifySessionController
);
router.delete(
  '/session',
  sessionMiddlewareCsrfUtil,
  sessionDeleteSessionController
);

export default router;

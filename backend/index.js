// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import webhookRouter from './routes/webhook.route.js';
import tagRoute from './tag/routes/tag.route.js';
import likeRouter from './like/routes/like.route.js';
import sessionRouter from './session/routes/session.route.js';
import { clerkMiddleware } from '@clerk/express';
import { configureCors } from './lib/corsConfig.js';
import { clerkHandshakeMiddleware } from './middlewares/clerkHandshakeMiddleware.js';
import { errorHandlerMiddleware } from './middlewares/errorHandlerMiddleware.js';
import { startServer } from './middlewares/startServer.js';
import cookieParser from 'cookie-parser'; // 의미: 쿠키 파싱 미들웨어 가져오기
// 이유: 요청에서 쿠키 파싱
// 비유: 손님의 가방에서 임시 회원증 확인 도구

dotenv.config(); // 의미: 환경 변수 로드
// 이유: .env 파일에서 설정값 가져오기
// 비유: 도서관 운영 규칙(.env) 읽어오기

const app = express(); // 의미: Express 앱 인스턴스 생성
// 이유: 서버 설정 및 라우팅 준비
// 비유: 도서관 시스템 준비
app.use(cookieParser()); // 의미: 쿠키 파싱 미들웨어 설정
// 이유: 요청에서 쿠키를 파싱하여 req.cookies로 접근 가능
// 비유: 손님의 가방을 열어 임시 회원증 확인 가능
// 의미: CORS 설정 적용
// 이유: 클라이언트 요청 허용 정책 설정
// 비유: 도서관 입장 규칙 적용
app.use(configureCors());

// 의미: JSON 요청 본문 파싱
// 이유: 클라이언트 요청 데이터 처리
// 비유: 손님의 요청서를 읽을 수 있도록 준비
app.use(express.json());

// 의미: Clerk handshake 미들웨어 적용
// 이유: Clerk 관련 쿼리 파라미터 정리
// 비유: 손님 요청서 정리
app.use(clerkHandshakeMiddleware);

app.use(clerkMiddleware()); // 의미: Clerk 인증 미들웨어 설정
// 이유: 사용자 인증 처리
// 비유: 도서관 입구에서 손님의 회원증 확인

app.use('/webhooks', webhookRouter); // 의미: 웹훅 라우터 등록
// 이유: 웹훅 엔드포인트 처리
// 비유: 도서관에 웹훅 안내 표지판 설치
app.use('/users', userRouter); // 의미: 유저 라우터 등록
// 이유: 유저 관련 엔드포인트 처리
// 비유: 도서관에 유저 안내 표지판 설치
app.use('/posts', postRouter); // 의미: 포스트 라우터 등록
// 이유: 포스트 관련 엔드포인트 처리
// 비유: 도서관에 포스트 안내 표지판 설치
app.use('/comments', commentRouter); // 의미: 댓글 라우터 등록
// 이유: 댓글 관련 엔드포인트 추가
// 비유: 도서관에 댓글 안내 표지판 설치
app.use('/api/tags', tagRoute); // 의미: 태그 라우터 등록
// 이유: 태그 관련 엔드포인트 처리
// 비유: 도서관에 태그 안내 표지판 설치
app.use('/like', likeRouter); // 의미: 좋아요 라우터 등록
// 이유: 좋아요 관련 엔드포인트 처리
// 비유: 도서관에 좋아요 안내 표지판 설치

app.use('/api/session', sessionRouter);

app.use(errorHandlerMiddleware); // 의미: 전역 에러 핸들링 미들웨어 등록

// 의미: 서버 시작 실행
// 이유: 애플리케이션 실행 시작
// 비유: 도서관 문 열기 시작
startServer(app);

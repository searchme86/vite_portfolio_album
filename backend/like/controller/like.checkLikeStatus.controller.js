import mongoose from 'mongoose'; // 의미: Mongoose 라이브러리 가져오기
// 이유: MongoDB와 상호작용
// 비유: 도서관 데이터베이스 관리 도구

import Like from '../model/like.model.js'; // 의미: Like 모델 가져오기
// 이유: 좋아요 데이터 조회
// 비유: 도서관 대출 기록부

// 의미: 좋아요 상태 조회 컨트롤러
// 이유: 포스트의 좋아요 상태 확인
// 비유: 도서관에서 책 대출 상태 확인
export const checkLikeStatusController = async (req, res, next) => {
  try {
    const { postId } = req.params; // 의미: 요청 파라미터에서 postId 추출
    // 이유: 조회 대상 포스트 ID
    // 비유: 확인할 책 ID 가져오기

    const userId = req.auth?.userId; // 의미: 요청에서 인증된 userId 추출
    // 이유: 좋아요 상태를 확인할 유저 ID
    // 비유: 대출 상태를 확인할 손님 ID

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' }); // 의미: 인증 실패 응답
      // 이유: 로그인하지 않은 경우 요청 거부
      // 비유: 회원증 없으면 확인 불가
    }

    // 여기부터 시작===
    // <!---여기수정
    const like = await Like.findOne({
      postId: new mongoose.Types.ObjectId(postId), // 의미: postId를 ObjectId로 변환
      // 이유: MongoDB 쿼리에서 ObjectId 타입 필요
      // 비유: 책 ID를 데이터베이스 형식으로 변환
      userId: userId, // 의미: userId를 그대로 사용
      // 이유: 백엔드에서 userId를 문자열로 처리하도록 스키마 정의
      // 비유: 손님 ID를 그대로 사용
    });
    // 여기부터 끝===

    const isLiked = !!like; // 의미: 좋아요 여부 확인
    // 이유: 좋아요 상태 반환
    // 비유: 책이 대출되었는지 확인

    return res.status(200).json({ isLiked }); // 의미: 좋아요 상태 응답
    // 이유: 프론트엔드에 결과 전달
    // 비유: 손님에게 대출 상태 알려줌
  } catch (error) {
    console.error('checkLikeStatusController - Error:', error); // 의미: 에러 디버깅
    // 이유: 문제 원인 추적
    // 비유: 확인 실패 원인 로그
    next(error); // 의미: 에러를 다음 미들웨어로 전달
    // 이유: 에러 처리
    // 비유: 문제 발생 시 관리자에게 전달
  }
};

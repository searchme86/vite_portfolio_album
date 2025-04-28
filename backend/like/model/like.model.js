/**
 * @file like.model.js
 * @description 좋아요 데이터의 Mongoose 스키마 정의
 * @reason 좋아요 데이터 구조 정의 및 인덱스 설정
 * @analogy 도서관에서 대여 기록의 데이터 구조 정의
 */
import mongoose from 'mongoose'; // @type {Object} - Mongoose 라이브러리
// @description Mongoose 가져오기
// @reason 스키마 및 모델 정의
// @analogy 도서관에서 데이터베이스 시스템 사용

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
      required: true,
    }, // @type {String} - 포스트 ID
    // @description 좋아요가 연결된 포스트 ID
    // @reason 포스트와 좋아요 관계 설정
    // @analogy 도서관에서 대여된 책 ID
    userId: {
      type: String,
      default: null,
    }, // @type {String} - 사용자 ID
    // @description 좋아요를 누른 사용자 ID
    // @reason 인증된 사용자의 좋아요 식별
    // @analogy 도서관에서 대여한 손님 ID
    sessionId: {
      type: String,
      default: null,
    }, // @type {String} - 세션 ID
    // @description 비인증 사용자의 세션 ID
    // @reason 비인증 사용자의 좋아요 식별
    // @analogy 도서관에서 세션 기반 대여 식별
  },
  {
    timestamps: true, // @description 생성/업데이트 시간 자동 기록
    // @reason 데이터 변경 추적
    // @analogy 도서관에서 대여 시간 기록
  }
);

//====여기부터 수정됨====
likeSchema.index({ sessionId: 1, postId: 1 }, { unique: true }); // @description sessionId와 postId 복합 고유 인덱스
// @reason 중복 좋아요 방지
// @analogy 도서관에서 같은 손님이 같은 책을 중복 대여하지 못하도록 설정
//====여기까지 수정됨====

const Like = mongoose.model('Like', likeSchema);

export default Like;

import { Schema } from 'mongoose'; // 의미: Mongoose 스키마 가져오기
// 이유: 데이터베이스 스키마 정의
// 비유: 도서관에서 책 정보 기록 양식 가져오기

import mongoose from 'mongoose'; // 의미: Mongoose 라이브러리 가져오기
// 이유: MongoDB와 상호작용
// 비유: 도서관 데이터베이스 관리 도구

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // 의미: user 필드 타입 정의
      // 이유: 유저 ID를 ObjectId로 저장
      // 비유: 책의 저자 ID 저장
      ref: 'User', // 의미: User 모델 참조
      // 이유: 유저와 관계 설정
      // 비유: 저자 정보와 연결
      required: true, // 의미: 필수 필드 설정
      // 이유: 유저 ID 없으면 포스트 생성 불가
      // 비유: 저자 없으면 책 등록 불가
    },
    img: {
      type: [String], // 의미: img 필드 타입 정의 (문자열 배열)
      // 이유: 다중 이미지를 저장하기 위해 배열로 설정
      // 비유: 책 표지 이미지 여러 개 저장
      default: [], // 의미: 기본값 빈 배열 설정
      // 이유: 초기화
      // 비유: 표지 이미지 없으면 빈 상태로 시작
    },
    title: {
      type: String, // 의미: title 필드 타입 정의
      // 이유: 포스트 제목 저장
      // 비유: 책 제목 저장
      required: true, // 의미: 필수 필드 설정
      // 이유: 제목 없으면 포스트 생성 불가
      // 비유: 제목 없으면 책 등록 불가
    },
    slug: {
      type: String, // 의미: slug 필드 타입 정의
      // 이유: URL 친화적 식별자 저장
      // 비유: 책 고유 URL 코드 저장
      required: true, // 의미: 필수 필드 설정
      // 이유: slug 없으면 포스트 생성 불가
      // 비유: URL 코드 없으면 책 등록 불가
      unique: true, // 의미: 고유값 설정
      // 이유: 중복 slug 방지
      // 비유: 동일한 URL 코드 방지
    },
    desc: {
      type: String, // 의미: desc 필드 타입 정의
      // 이유: 포스트 설명 저장
      // 비유: 책 요약 저장
    },
    category: {
      type: String, // 의미: category 필드 타입 정의
      // 이유: 포스트 카테고리 저장
      // 비유: 책 장르 저장
      default: 'general', // 의미: 기본값 설정
      // 이유: 카테고리 미지정 시 기본값 사용
      // 비유: 장르 없으면 일반 장르로 설정
    },
    content: {
      type: String, // 의미: content 필드 타입 정의
      // 이유: 포스트 본문 저장
      // 비유: 책 내용 저장
      required: true, // 의미: 필수 필드 설정
      // 이유: 내용 없으면 포스트 생성 불가
      // 비유: 내용 없으면 책 등록 불가
    },
    isFeatured: {
      type: Boolean, // 의미: isFeatured 필드 타입 정의
      // 이유: 추천글 여부 저장
      // 비유: 추천 책 여부 저장
      default: false, // 의미: 기본값 설정
      // 이유: 추천글 미지정 시 기본값 사용
      // 비유: 추천 설정 없으면 일반 책으로 설정
    },
    visit: {
      type: Number, // 의미: visit 필드 타입 정의
      // 이유: 조회수 저장
      // 비유: 책 방문 횟수 저장
      default: 0, // 의미: 기본값 설정
      // 이유: 조회수 초기화
      // 비유: 방문 횟수 0으로 시작
    },
    tags: {
      type: [String], // 의미: tags 필드 타입 정의 (문자열 배열)
      // 이유: 태그를 배열로 저장
      // 비유: 책 태그 여러 개 저장
      default: [], // 의미: 기본값 빈 배열 설정
      // 이유: 태그 없으면 빈 상태로 시작
      // 비유: 태그 없으면 빈 상태로 시작
    },
    // 여기부터 시작===
    // <!---여기추가
    likesCount: {
      type: Number, // 의미: likesCount 필드 타입 정의
      // 이유: 포스트의 좋아요 수 저장
      // 비유: 책의 대출 횟수 저장
      default: 0, // 의미: 기본값 설정 (Fallback)
      // 이유: 좋아요 수 초기화, 데이터 누락 시 0 반환
      // 비유: 대출 횟수 0으로 시작
    },
    // 여기부터 끝===
  },
  { timestamps: true } // 의미: 생성 및 업데이트 시간 자동 기록
  // 이유: 포스트 생성/수정 시간 추적
  // 비유: 책 등록/수정 시간 기록
);

// 인덱스 설정으로 쿼리 성능 향상
postSchema.index({ createdAt: -1 }); // 의미: createdAt 필드에 내림차순 인덱스 설정
// 이유: 최신순 정렬 쿼리 속도 개선
// 비유: 최신 책 목록 조회 속도 향상
postSchema.index({ isFeatured: 1 }); // 의미: isFeatured 필드에 오름차순 인덱스 설정
// 이유: 추천글 필터링 쿼리 속도 개선
// 비유: 추천 책 조회 속도 향상
postSchema.index({ visit: -1 }); // 의미: visit 필드에 내림차순 인덱스 설정
// 이유: 조회수순 정렬 쿼리 속도 개선
// 비유: 인기 책 목록 조회 속도 향상
postSchema.index({ category: 1 }); // 의미: category 필드에 오름차순 인덱스 설정
// 이유: 카테고리별 필터링 쿼리 속도 개선
// 비유: 장르별 책 조회 속도 향상
postSchema.index({ title: 'text' }); // 의미: title 필드에 텍스트 인덱스 설정
// 이유: 검색어 기반 쿼리 속도 개선
// 비유: 책 제목 검색 속도 향상
postSchema.index({ tags: 1 }); // 의미: tags 필드에 오름차순 인덱스 설정
// 이유: 태그별 포스트 조회 쿼리 속도 개선
// 비유: 태그별 책 조회 속도 향상
// 여기부터 시작===
// <!---여기추가
postSchema.index({ likesCount: -1 }); // 의미: likesCount 필드에 내림차순 인덱스 설정
// 이유: 좋아요 수 기준 정렬 쿼리 속도 개선
// 비유: 대출 횟수순 책 목록 조회 속도 향상
// 여기부터 끝===

// 여기부터 시작===
// <!---여기추가
// 의미: 스키마 정의 후 구조 확인을 위한 디버깅 로그
// 이유: likesCount 필드가 제대로 추가되었는지 확인
// 비유: 도서관에서 책 정보 양식에 대출 횟수欄이 추가되었는지 확인
console.log(
  'post.model.js - Post schema fields:',
  Object.keys(postSchema.paths)
);
// 여기부터 끝===

export default mongoose.model('Post', postSchema); // 의미: Post 모델 내보내기
// 이유: 다른 파일에서 사용
// 비유: 책 정보 양식을 도서관 시스템에 등록

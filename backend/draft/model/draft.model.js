/**
 * @file draft.model.js
 * @description 드래프트 데이터의 데이터베이스 모델을 정의하는 파일
 * @reason 데이터베이스 스키마와 CRUD 작업을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 저장하는 저장소
 */

import mongoose from 'mongoose'; // @type {Object} - Mongoose 라이브러리
// @description Mongoose 가져오기
// @reason MongoDB와의 연결 및 스키마 정의
// @analogy 도서관에서 자료 저장소를 관리하는 도구

// 드래프트 스키마 정의
// @description 드래프트 데이터의 구조를 정의
// @reason 데이터베이스에 저장할 데이터 형식 지정
const draftSchema = new mongoose.Schema(
  {
    draftId: {
      type: String, // @type {string} - 드래프트 ID
      required: true, // @description 필수 필드
      unique: true, // @description 고유 값
      // @reason 데이터 식별자
    },
    userId: {
      type: String, // @type {string} - 사용자 ID
      required: true, // @description 필수 필드
      // @reason 사용자별 데이터 관리
    },
    postTitle: {
      type: String, // @type {string} - 포스트 제목
      required: true, // @description 필수 필드
      // @reason 드래프트의 핵심 정보
    },
    postDesc: {
      type: String, // @type {string} - 포스트 설명
      default: '', // @description 기본값 빈 문자열
      // @reason 선택적 필드, 데이터 없으면 빈 문자열
    },
    postContent: {
      type: String, // @type {string} - 포스트 본문
      required: true, // @description 필수 필드
      // @reason 드래프트의 핵심 정보
    },
    tags: {
      type: [String], // @type {string[]} - 태그 배열
      default: [], // @description 기본값 빈 배열
      // @reason 선택적 필드, 데이터 없으면 빈 배열
    },
    imageUrls: {
      type: [String], // @type {string[]} - 이미지 URL 배열
      default: [], // @description 기본값 빈 배열
      // @reason 선택적 필드, 데이터 없으면 빈 배열
    },
    custom: {
      type: mongoose.Schema.Types.Mixed, // @type {Object} - 커스텀 데이터
      default: {}, // @description 기본값 빈 객체
      // @reason 유연한 데이터 저장 가능
    },
    createdAt: {
      type: String, // @type {string} - 생성 시간 (ISO 문자열)
      required: true, // @description 필수 필드
      // @reason 데이터 생성 시간 기록
    },
    updatedAt: {
      type: String, // @type {string} - 수정 시간 (ISO 문자열)
      required: true, // @description 필수 필드
      // @reason 데이터 업데이트 시간 기록
    },
    isTemporary: {
      type: Boolean, // @type {boolean} - 임시저장 여부
      default: false, // @description 기본값 false
      // @reason 자동저장과 임시저장 구분
    },
  },
  {
    timestamps: false, // @description Mongoose 자동 타임스탬프 비활성화
    // @reason createdAt, updatedAt을 수동으로 관리
  }
);

// 복합 인덱스 설정
// @description userId와 draftId로 복합 인덱스 생성
// @reason 조회 성능 최적화
draftSchema.index({ userId: 1, draftId: 1 }, { unique: true }); // @description 복합 인덱스 정의
// @description userId와 draftId 조합으로 고유성 보장
// @reason 동일한 사용자가 동일한 draftId를 중복 생성하지 않도록

// 모델 생성
// @description Mongoose 모델 생성
// @reason 데이터베이스 작업에 사용
const DraftModel = mongoose.model('Draft', draftSchema); // @type {Object} - 드래프트 모델
// @description 'Draft' 컬렉션에 매핑
// @reason 서비스에서 데이터베이스 작업 수행

// 모델 내보내기
// @description 모델을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 서비스에서 모델 사용 가능
// @analogy 도서관에서 자료 저장소를 공유
export default DraftModel;

// **작동 매커니즘**
// 1. `mongoose.Schema`로 스키마 정의: `DraftData` 구조에 맞춰 필드 정의 (draftId, userId, postTitle 등).
// 2. 필드 속성 설정: 각 필드의 타입, 필수 여부, 기본값 설정.
// 3. 복합 인덱스 설정: `userId`와 `draftId`로 고유성 보장 및 조회 성능 최적화.
// 4. `mongoose.model`로 모델 생성: 'Draft' 컬렉션에 매핑된 모델 생성.
// 5. `export default`로 모델 내보내기: 서비스 파일에서 사용 가능.
// @reason 드래프트 데이터의 데이터베이스 스키마를 정의하여 데이터 작업을 일관성 있게 처리.
// @analogy 도서관에서 자료를 저장하는 저장소.

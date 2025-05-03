/**
 * @file draft.model.js
 * @description 드래프트 데이터의 데이터베이스 모델을 정의하는 파일
 * @reason 데이터베이스 스키마와 CRUD 작업을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 저장하는 저장소
 */

import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema(
  {
    draftId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    postTitle: { type: String, required: true },
    postDesc: { type: String, default: '' },
    postContent: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageUrls: { type: [String], default: [] },
    custom: { type: mongoose.Schema.Types.Mixed, default: {} },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    isTemporary: { type: Boolean, default: false },
  },
  { timestamps: false }
);

draftSchema.index({ userId: 1, draftId: 1 }, { unique: true });

const DraftModel = mongoose.model('Draft', draftSchema);

export default DraftModel;

/**
 * @file draft.autoSaveDraft.service.js
 * @description 드래프트 자동저장 비즈니스 로직을 처리하는 서비스
 * @reason 자동저장 로직을 서비스로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 자동저장하는 시스템
 */

import DraftModel from '../model/draft.model.js';

// 자동저장 서비스 함수
const autoSaveDraftService = async (userId, draftData) => {
  try {
    console.log(
      'autoSaveDraftService - Processing auto-save for user:',
      userId
    );

    if (!draftData.draftId || !draftData.postTitle || !draftData.postContent) {
      console.error(
        'autoSaveDraftService - Missing required fields:',
        draftData
      );
      throw new Error('Required fields are missing');
    }

    const draftToSave = {
      ...draftData,
      userId,
      updatedAt: new Date().toISOString(),
      createdAt: draftData.createdAt || new Date().toISOString(),
      isTemporary: draftData.isTemporary || false,
    };

    //====여기부터 수정됨====
    // 기존 드래프트 확인 (인덱스 활용으로 최적화)
    const existingDraft = await DraftModel.findOne({
      draftId: draftData.draftId,
      userId,
    }).lean();
    // @description lean()으로 쿼리 최적화
    // @reason 불필요한 Mongoose 문서 변환 방지
    // @why DB 응답 지연 문제 해결

    let savedDraft;
    if (existingDraft) {
      savedDraft = await DraftModel.updateOne(
        { draftId: draftData.draftId, userId },
        { $set: draftToSave },
        { runValidators: true }
      );
      console.log('autoSaveDraftService - Draft updated:', savedDraft);
    } else {
      savedDraft = await DraftModel.create(draftToSave);
      console.log('autoSaveDraftService - Draft created:', savedDraft);
    }

    // 오래된 드래프트 삭제 (7일 이상 경과 시)
    await DraftModel.deleteMany({
      userId,
      updatedAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });
    // @description 7일 이상 지난 드래프트 삭제
    // @reason 이전 데이터 정리
    // @why DB에 누적된 데이터 방지
    //====여기까지 수정됨====

    return draftToSave;
  } catch (error) {
    console.error('autoSaveDraftService - Auto-save failed:', {
      message: error.message,
      stack: error.stack,
    });
    const fallbackDraft = {
      ...draftData,
      userId,
      updatedAt: new Date().toISOString(),
      createdAt: draftData.createdAt || new Date().toISOString(),
      isTemporary: draftData.isTemporary || false,
    };
    throw new Error(error.message || 'Failed to auto-save draft');
  }
};

export { autoSaveDraftService };

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
    // 동일 userId를 가진 모든 이전 드래프트 삭제
    await DraftModel.deleteMany({
      userId,
      draftId: { $ne: draftData.draftId },
    });
    // @description 동일 userId에 다른 draftId를 가진 데이터 삭제
    // @reason 최신 데이터만 유지
    // @why 이전 데이터 누적으로 인한 문제 해결

    // 최신 데이터 저장
    const result = await DraftModel.updateOne(
      { draftId: draftData.draftId, userId },
      { $set: draftToSave },
      { upsert: true, runValidators: true }
    );
    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      throw new Error('Database update failed, no document matched or created');
    }
    console.log('autoSaveDraftService - Draft saved:', {
      draftId: draftData.draftId,
      userId,
    });
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
    throw error;
  }
};

export { autoSaveDraftService };

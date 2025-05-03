/**
 * @file draft.autoSaveDraft.controller.js
 * @description 드래프트 자동저장 요청을 처리하는 컨트롤러
 * @reason 자동저장 로직을 컨트롤러로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 자동저장하는 직원
 */

import { autoSaveDraftService } from '../service/draft.autoSaveDraft.service.js';

const autoSaveDraftController = async (req, res) => {
  try {
    console.log('autoSaveDraftController - Request received:', req.body);

    const userId = req.auth?.userId;

    if (!userId) {
      console.error('autoSaveDraftController - User ID is missing');
      return res.status(401).json({
        success: false,
        draftId: '',
        message: 'User authentication failed',
      });
    }

    const draftData = req.body;

    if (!draftData.draftId || !draftData.postTitle || !draftData.postContent) {
      console.warn(
        'autoSaveDraftController - Missing required fields:',
        draftData
      );
      return res.status(400).json({
        success: false,
        draftId: draftData.draftId || '',
        message: 'Required fields are missing',
      });
    }

    const savedDraft = await autoSaveDraftService(userId, draftData);

    console.log('autoSaveDraftController - Draft saved:', savedDraft);

    return res.status(200).json({
      success: true,
      draftId: savedDraft.draftId,
      message: 'Draft auto-saved successfully',
    });
  } catch (error) {
    console.error('autoSaveDraftController - Auto-save failed:', {
      message: error.message,
      stack: error.stack,
    });
    const fallbackResponse = {
      success: false,
      draftId: req.body?.draftId || '',
      message: error.message || 'Failed to auto-save draft',
    };
    return res.status(500).json(fallbackResponse);
  }
};

export { autoSaveDraftController };

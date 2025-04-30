/**
 * @file draft.temporarySaveDraft.service.js
 * @description 드래프트 임시저장 비즈니스 로직을 처리하는 서비스
 * @reason 임시저장 로직을 서비스로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 임시저장하는 시스템
 */

import DraftModel from '../model/draft.model.js'; // @type {Object} - 드래프트 모델
// @description 드래프트 모델 가져오기
// @reason 데이터베이스 작업 처리
// @analogy 도서관에서 자료 저장소 연결

// 임시저장 서비스 함수
// @description 드래프트 데이터를 받아 임시저장 처리
// @reason 데이터베이스에 드래프트 데이터를 저장
// @analogy 도서관에서 자료를 임시저장
const temporarySaveDraftService = async (userId, draftData) => {
  try {
    console.log(
      'temporarySaveDraftService - Processing temporary-save for user:',
      userId
    ); // @description 디버깅용 로그
    // @description 임시저장 시작 디버깅
    // @reason 처리 상태 확인

    // draftData 검증 및 기본값 설정
    // @description 필수 필드가 누락되지 않았는지 확인
    // @reason 데이터 무결성 보장
    if (!draftData.draftId || !draftData.postTitle || !draftData.postContent) {
      console.error(
        'temporarySaveDraftService - Missing required fields:',
        draftData
      ); // @description 에러 로그
      // @reason 문제 원인 추적
      throw new Error('Required fields are missing');
    }

    // draftData에 사용자 정보와 메타데이터 추가
    // @description 데이터 저장 전 필요한 메타데이터 추가
    // @reason 데이터베이스 저장 형식 맞추기
    const draftToSave = {
      ...draftData,
      userId: userId, // @type {string} - 사용자 ID
      // @description 드래프트 데이터에 사용자 ID 추가
      // @reason 사용자별 데이터 관리
      updatedAt: new Date().toISOString(), // @type {string} - 수정 시간
      // @description 현재 시간을 ISO 형식으로 추가
      // @reason 데이터 업데이트 시간 기록
      createdAt: draftData.createdAt || new Date().toISOString(), // @type {string} - 생성 시간
      // @description 기존 createdAt이 없으면 현재 시간 추가
      // @reason 데이터 생성 시간 기록
      isTemporary: true, // @type {boolean} - 임시저장 여부
      // @description 임시저장 플래그 설정
      // @reason 자동저장과 임시저장 구분
    };

    // 데이터베이스에서 기존 드래프트 확인
    // @description 동일한 draftId로 기존 데이터가 있는지 확인
    // @reason 데이터 중복 방지 및 업데이트 처리
    const existingDraft = await DraftModel.findOne({
      draftId: draftData.draftId,
      userId,
    }); // @type {Object | null} - 기존 드래프트
    // @description DraftModel로 데이터 조회
    // @reason 기존 데이터 확인

    let savedDraft;
    if (existingDraft) {
      // 기존 드래프트 업데이트
      // @description 기존 데이터가 있으면 업데이트
      // @reason 데이터 덮어쓰기
      savedDraft = await DraftModel.updateOne(
        { draftId: draftData.draftId, userId },
        { $set: draftToSave }
      ); // @type {Object} - 업데이트 결과
      // @description DraftModel로 데이터 업데이트
      // @reason 기존 데이터 갱신
      console.log('temporarySaveDraftService - Draft updated:', savedDraft); // @description 디버깅용 로그
      // @description 업데이트 성공 디버깅
      // @reason 성공 상태 확인
    } else {
      // 새로운 드래프트 생성
      // @description 기존 데이터가 없으면 새로 생성
      // @reason 신규 데이터 저장
      savedDraft = await DraftModel.create(draftToSave); // @type {Object} - 저장된 드래프트
      // @description DraftModel로 데이터 생성
      // @reason 새 데이터 저장
      console.log('temporarySaveDraftService - Draft created:', savedDraft); // @description 디버깅용 로그
      // @description 생성 성공 디버깅
      // @reason 성공 상태 확인
    }

    // 저장된 드래프트 반환
    // @description 컨트롤러로 저장된 데이터 반환
    // @reason 상위 로직에서 사용
    return draftToSave; // @type {Object} - 저장된 드래프트 데이터
    // @description 최종 저장된 데이터 반환
    // @reason 컨트롤러에서 응답 생성에 사용
  } catch (error) {
    // 에러 로깅
    // @description 에러 상세 정보 기록
    // @reason 문제 해결 지원
    console.error('temporarySaveDraftService - Temporary-save failed:', {
      message: error.message,
      stack: error.stack,
    }); // @description 에러 로그
    // @description 실패 상태 디버깅

    // Fallback 처리: 에러 발생 시 기본값 반환
    // @description 에러 발생 시 기본 데이터 반환
    // @reason 애플리케이션 충돌 방지
    const fallbackDraft = {
      ...draftData,
      userId: userId,
      updatedAt: new Date().toISOString(),
      createdAt: draftData.createdAt || new Date().toISOString(),
      isTemporary: true,
    }; // @type {Object} - 기본 드래프트 데이터
    // @description 에러 발생 시 원본 데이터에 메타데이터 추가
    // @reason 컨트롤러에서 Fallback 처리 가능하도록

    throw new Error(error.message || 'Failed to temporarily save draft'); // @description 에러 던지기
    // @reason 컨트롤러에서 에러 처리
  }
};

// 서비스 내보내기
// @description 서비스 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컨트롤러에서 서비스 사용 가능
// @analogy 도서관에서 임시저장 시스템을 공유
export { temporarySaveDraftService };

// **작동 매커니즘**
// 1. `draftData` 검증: 필수 필드(`draftId`, `postTitle`, `postContent`) 확인.
// 2. 메타데이터 추가: `userId`, `updatedAt`, `createdAt`, `isTemporary` 추가.
// 3. 기존 드래프트 확인: `DraftModel.findOne`으로 동일한 `draftId`와 `userId`를 가진 데이터 조회.
// 4. 데이터 업데이트 또는 생성: 기존 데이터가 있으면 `updateOne`, 없으면 `create` 호출.
// 5. 저장된 데이터 반환: 컨트롤러로 저장된 드래프트 데이터 반환.
// 6. 에러 발생 시 처리: 에러 로깅 후 Fallback 데이터 반환 및 에러 던지기.
// 7. `export`로 서비스 내보내기: `draft.temporarySaveDraft.controller.js`에서 사용 가능.
// @reason 임시저장 비즈니스 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 자료를 임시저장하는 시스템.

/**
 * @file draft.fetchDraft.service.js
 * @description 드래프트 조회 비즈니스 로직을 처리하는 서비스
 * @reason 드래프트 조회 로직을 서비스로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 특정 자료를 조회하는 시스템
 */

import DraftModel from '../model/draft.model.js'; // @type {Object} - 드래프트 모델
// @description 드래프트 모델 가져오기
// @reason 데이터베이스 작업 처리
// @analogy 도서관에서 자료 저장소 연결

// 드래프트 조회 서비스 함수
// @description 사용자 ID와 드래프트 ID를 받아 드래프트 데이터 조회
// @reason 데이터베이스에서 드래프트 데이터를 조회
// @analogy 도서관에서 특정 자료 조회
const fetchDraftService = async (userId, draftId) => {
  try {
    console.log(
      'fetchDraftService - Processing fetch for user:',
      userId,
      'draftId:',
      draftId
    ); // @description 디버깅용 로그
    // @description 드래프트 조회 시작 디버깅
    // @reason 처리 상태 확인

    // 입력값 검증
    // @description userId와 draftId가 누락되지 않았는지 확인
    // @reason 데이터 유효성 보장
    if (!userId || !draftId) {
      console.error('fetchDraftService - Missing userId or draftId:', {
        userId,
        draftId,
      }); // @description 에러 로그
      // @reason 문제 원인 추적
      throw new Error('User ID and Draft ID are required');
    }

    // 데이터베이스에서 드래프트 조회
    // @description userId와 draftId를 기준으로 데이터 조회
    // @reason 특정 드래프트 데이터 반환
    const draftData = await DraftModel.findOne({ draftId, userId }); // @type {Object | null} - 조회된 드래프트
    // @description DraftModel로 데이터 조회
    // @reason 데이터베이스에서 데이터 검색

    if (!draftData) {
      console.warn('fetchDraftService - Draft not found for ID:', draftId); // @description 경고 로그
      // @description 드래프트 데이터 없음 디버깅
      // @reason 문제 해결 지원
      return null; // @type {null} - 드래프트 없음 반환
      // @description 컨트롤러에서 404 처리 가능하도록
    }

    console.log('fetchDraftService - Draft fetched:', draftData); // @description 디버깅용 로그
    // @description 조회 성공 디버깅
    // @reason 성공 상태 확인

    // 조회된 드래프트 반환
    // @description 컨트롤러로 조회된 데이터 반환
    // @reason 상위 로직에서 사용
    return draftData; // @type {Object} - 조회된 드래프트 데이터
    // @description 조회된 데이터 반환
    // @reason 컨트롤러에서 응답 생성에 사용
  } catch (error) {
    // 에러 로깅
    // @description 에러 상세 정보 기록
    // @reason 문제 해결 지원
    console.error('fetchDraftService - Fetch failed:', {
      message: error.message,
      stack: error.stack,
    }); // @description 에러 로그
    // @description 실패 상태 디버깅

    // Fallback 처리: 에러 발생 시 null 반환
    // @description 에러 발생 시 기본값 반환
    // @reason 애플리케이션 충돌 방지
    return null; // @type {null} - 기본값
    // @description 에러 발생 시 null 반환
    // @reason 컨트롤러에서 Fallback 처리 가능하도록

    throw new Error(error.message || 'Failed to fetch draft'); // @description 에러 던지기
    // @reason 컨트롤러에서 에러 처리
  }
};

// 서비스 내보내기
// @description 서비스 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컨트롤러에서 서비스 사용 가능
// @analogy 도서관에서 드래프트 조회 시스템을 공유
export { fetchDraftService };

// **작동 매커니즘**
// 1. 입력값 검증: `userId`와 `draftId`가 누락되지 않았는지 확인.
// 2. 데이터 조회: `DraftModel.findOne`으로 `userId`와 `draftId`를 기준으로 데이터 조회.
// 3. 데이터 존재 여부 확인: 데이터가 없으면 `null` 반환.
// 4. 조회된 데이터 반환: 컨트롤러로 조회된 드래프트 데이터 반환.
// 5. 에러 발생 시 처리: 에러 로깅 후 Fallback으로 `null` 반환 및 에러 던지기.
// 6. `export`로 서비스 내보내기: `draft.fetchDraft.controller.js`에서 사용 가능.
// @reason 드래프트 조회 비즈니스 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 특정 자료를 조회하는 시스템.

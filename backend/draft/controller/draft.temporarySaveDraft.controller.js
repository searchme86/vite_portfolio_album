/**
 * @file draft.temporarySaveDraft.controller.js
 * @description 드래프트 임시저장 요청을 처리하는 컨트롤러
 * @reason 임시저장 로직을 컨트롤러로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 임시저장하는 직원
 */

import { temporarySaveDraftService } from '../service/draft.temporarySaveDraft.service.js'; // @type {Function} - 임시저장 서비스
// @description 임시저장 서비스 가져오기
// @reason 비즈니스 로직 처리
// @analogy 도서관에서 자료 임시저장 담당 부서 연결

// 임시저장 컨트롤러 함수
// @description 클라이언트의 임시저장 요청 처리
// @reason 드래프트 데이터를 받아 임시저장 후 응답
// @analogy 도서관에서 자료 임시저장 요청 접수
const temporarySaveDraftController = async (req, res) => {
  try {
    console.log('temporarySaveDraftController - Request received:', req.body); // @description 디버깅용 로그
    // @description 요청 데이터 디버깅
    // @reason 요청 상태 확인

    // 사용자 인증 정보 확인
    // @description req.auth에서 사용자 정보 추출
    // @reason 인증된 사용자 확인
    const userId = req.auth?.userId; // @type {string} - 사용자 ID
    // @description Clerk에서 제공하는 사용자 ID
    // @reason 사용자별 데이터 저장

    if (!userId) {
      console.error('temporarySaveDraftController - User ID is missing'); // @description 인증 실패 로그
      // @reason 문제 원인 추적
      // @analogy 도서관에서 회원증 확인 실패 기록
      return res.status(401).json({
        success: false,
        draftId: '',
        message: 'User authentication failed',
      }); // @description 인증 실패 응답
      // @reason 클라이언트에 에러 전달
    }

    // 요청 본문에서 드래프트 데이터 추출
    // @description 클라이언트에서 보낸 드래프트 데이터
    // @reason 저장할 데이터 준비
    const draftData = req.body; // @type {Object} - 드래프트 데이터
    // @description 요청 본문에서 데이터 추출
    // @reason 클라이언트 데이터 사용

    // 필수 필드 검증
    // @description 필수 데이터가 누락되었는지 확인
    // @reason 데이터 유효성 보장
    if (!draftData.draftId || !draftData.postTitle || !draftData.postContent) {
      console.warn(
        'temporarySaveDraftController - Missing required fields:',
        draftData
      ); // @description 경고 로그
      // @description 누락된 필드 디버깅
      // @reason 문제 해결 지원
      return res.status(400).json({
        success: false,
        draftId: draftData.draftId || '',
        message: 'Required fields are missing',
      }); // @description 유효성 검사 실패 응답
      // @reason 클라이언트에 에러 전달
    }

    // isTemporary 플래그 설정
    // @description 임시저장임을 표시
    // @reason 데이터 상태 관리
    draftData.isTemporary = true; // @type {boolean} - 임시저장 여부
    // @description 드래프트 데이터에 임시저장 플래그 추가
    // @reason 임시저장과 자동저장의 구분

    // 서비스 호출하여 드래프트 임시저장
    // @description temporarySaveDraftService로 데이터 저장 요청
    // @reason 비즈니스 로직 실행
    const savedDraft = await temporarySaveDraftService(userId, draftData); // @type {Object} - 저장된 드래프트 데이터
    // @description 서비스에서 반환된 결과
    // @reason 저장 결과 반환

    console.log(
      'temporarySaveDraftController - Draft temporarily saved:',
      savedDraft
    ); // @description 디버깅용 로그
    // @description 저장 성공 디버깅
    // @reason 성공 상태 확인

    // 성공 응답 반환
    // @description 클라이언트에 임시저장 성공 응답
    // @reason 요청 완료 알림
    return res.status(200).json({
      success: true,
      draftId: savedDraft.draftId,
      message: 'Draft temporarily saved successfully',
    }); // @type {Object} - 성공 응답
    // @description TemporarySaveResponse 형식의 응답
    // @reason 클라이언트에 결과 전달
  } catch (error) {
    // 에러 로깅
    // @description 에러 상세 정보 기록
    // @reason 문제 해결 지원
    console.error('temporarySaveDraftController - Temporary-save failed:', {
      message: error.message,
      stack: error.stack,
    }); // @description 에러 로그
    // @description 실패 상태 디버깅

    // Fallback 처리: 에러 발생 시 기본 응답 반환
    // @description 에러 발생 시 기본 응답 생성
    // @reason 애플리케이션 충돌 방지
    const fallbackResponse = {
      success: false,
      draftId: req.body?.draftId || '',
      message: error.message || 'Failed to temporarily save draft',
    }; // @type {Object} - 기본 응답
    // @description TemporarySaveResponse 형식의 기본 응답
    // @reason 에러 발생 시 기본값 제공

    return res.status(500).json(fallbackResponse); // @description 에러 응답 반환
    // @reason 클라이언트에 에러 전달
  }
};

// 컨트롤러 내보내기
// @description 컨트롤러 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 라우터에서 컨트롤러 사용 가능
// @analogy 도서관에서 임시저장 담당 직원을 공유
export { temporarySaveDraftController };

// **작동 매커니즘**
// 1. `req.auth`에서 사용자 ID 추출: Clerk 인증 미들웨어를 통해 사용자 인증 확인.
// 2. 요청 본문에서 드래프트 데이터 추출: 클라이언트에서 보낸 데이터를 받아 처리 준비.
// 3. 필수 필드 검증: `draftId`, `postTitle`, `postContent`가 누락되지 않았는지 확인.
// 4. `isTemporary` 플래그 설정: 임시저장임을 표시.
// 5. `temporarySaveDraftService` 호출: 사용자 ID와 드래프트 데이터를 전달하여 저장 요청.
// 6. 성공 응답 반환: `TemporarySaveResponse` 형식으로 성공 응답 전달.
// 7. 에러 발생 시 처리: 에러 로깅 후 Fallback 응답 반환으로 충돌 방지.
// 8. `export`로 컨트롤러 내보내기: `draft.route.js`에서 사용 가능.
// @reason 임시저장 요청을 처리하는 컨트롤러 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 자료를 임시저장하는 직원.

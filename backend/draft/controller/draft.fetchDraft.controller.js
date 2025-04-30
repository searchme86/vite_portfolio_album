/**
 * @file draft.fetchDraft.controller.js
 * @description 드래프트 조회 요청을 처리하는 컨트롤러
 * @reason 드래프트 조회 로직을 컨트롤러로 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 특정 자료를 조회하는 직원
 */

import { fetchDraftService } from '../service/draft.fetchDraft.service.js'; // @type {Function} - 드래프트 조회 서비스
// @description 드래프트 조회 서비스 가져오기
// @reason 비즈니스 로직 처리
// @analogy 도서관에서 자료 조회 담당 부서 연결

// 드래프트 조회 컨트롤러 함수
// @description 클라이언트의 드래프트 조회 요청 처리
// @reason draftId를 받아 드래프트 데이터를 조회 후 응답
// @analogy 도서관에서 특정 자료 조회 요청 접수
const fetchDraftController = async (req, res) => {
  try {
    console.log('fetchDraftController - Request received:', req.params); // @description 디버깅용 로그
    // @description 요청 파라미터 디버깅
    // @reason 요청 상태 확인

    // 사용자 인증 정보 확인
    // @description req.auth에서 사용자 정보 추출
    // @reason 인증된 사용자 확인
    const userId = req.auth?.userId; // @type {string} - 사용자 ID
    // @description Clerk에서 제공하는 사용자 ID
    // @reason 사용자별 데이터 조회

    if (!userId) {
      console.error('fetchDraftController - User ID is missing'); // @description 인증 실패 로그
      // @reason 문제 원인 추적
      // @analogy 도서관에서 회원증 확인 실패 기록
      return res.status(401).json({
        success: false,
        data: null,
        message: 'User authentication failed',
      }); // @description 인증 실패 응답
      // @reason 클라이언트에 에러 전달
    }

    // URL 파라미터에서 draftId 추출
    // @description 클라이언트에서 보낸 드래프트 ID
    // @reason 조회할 데이터 식별
    const draftId = req.params.draftId; // @type {string} - 드래프트 ID
    // @description URL 파라미터에서 draftId 추출
    // @reason 클라이언트 요청에서 식별자 사용

    // draftId 유효성 검증
    // @description draftId가 누락되었는지 확인
    // @reason 데이터 유효성 보장
    if (!draftId) {
      console.warn('fetchDraftController - Draft ID is missing'); // @description 경고 로그
      // @description draftId 누락 디버깅
      // @reason 문제 해결 지원
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Draft ID is required',
      }); // @description 유효성 검사 실패 응답
      // @reason 클라이언트에 에러 전달
    }

    // 서비스 호출하여 드래프트 조회
    // @description fetchDraftService로 데이터 조회 요청
    // @reason 비즈니스 로직 실행
    const draftData = await fetchDraftService(userId, draftId); // @type {Object | null} - 조회된 드래프트 데이터
    // @description 서비스에서 반환된 결과
    // @reason 조회 결과 반환

    if (!draftData) {
      console.warn('fetchDraftController - Draft not found for ID:', draftId); // @description 경고 로그
      // @description 드래프트 데이터 없음 디버깅
      // @reason 문제 해결 지원
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Draft not found',
      }); // @description 데이터 없음 응답
      // @reason 클라이언트에 에러 전달
    }

    console.log('fetchDraftController - Draft fetched:', draftData); // @description 디버깅용 로그
    // @description 조회 성공 디버깅
    // @reason 성공 상태 확인

    // 성공 응답 반환
    // @description 클라이언트에 조회 성공 응답
    // @reason 요청 완료 알림
    return res.status(200).json({
      success: true,
      data: draftData,
      message: 'Draft fetched successfully',
    }); // @type {Object} - 성공 응답
    // @description FetchDraftResponse 형식의 응답
    // @reason 클라이언트에 결과 전달
  } catch (error) {
    // 에러 로깅
    // @description 에러 상세 정보 기록
    // @reason 문제 해결 지원
    console.error('fetchDraftController - Fetch failed:', {
      message: error.message,
      stack: error.stack,
    }); // @description 에러 로그
    // @description 실패 상태 디버깅

    // Fallback 처리: 에러 발생 시 기본 응답 반환
    // @description 에러 발생 시 기본 응답 생성
    // @reason 애플리케이션 충돌 방지
    const fallbackResponse = {
      success: false,
      data: null,
      message: error.message || 'Failed to fetch draft',
    }; // @type {Object} - 기본 응답
    // @description FetchDraftResponse 형식의 기본 응답
    // @reason 에러 발생 시 기본값 제공

    return res.status(500).json(fallbackResponse); // @description 에러 응답 반환
    // @reason 클라이언트에 에러 전달
  }
};

// 컨트롤러 내보내기
// @description 컨트롤러 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 라우터에서 컨트롤러 사용 가능
// @analogy 도서관에서 드래프트 조회 담당 직원을 공유
export { fetchDraftController };

// **작동 매커니즘**
// 1. `req.auth`에서 사용자 ID 추출: Clerk 인증 미들웨어를 통해 사용자 인증 확인.
// 2. URL 파라미터에서 `draftId` 추출: 클라이언트 요청에서 조회할 드래프트 ID 획득.
// 3. `draftId` 유효성 검증: `draftId`가 누락되지 않았는지 확인.
// 4. `fetchDraftService` 호출: 사용자 ID와 `draftId`를 전달하여 드래프트 데이터 조회.
// 5. 조회 결과 검증: 데이터가 없으면 404 응답 반환.
// 6. 성공 응답 반환: `FetchDraftResponse` 형식으로 성공 응답 전달.
// 7. 에러 발생 시 처리: 에러 로깅 후 Fallback 응답 반환으로 충돌 방지.
// 8. `export`로 컨트롤러 내보내기: `draft.route.js`에서 사용 가능.
// @reason 드래프트 조회 요청을 처리하는 컨트롤러 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 특정 자료를 조회하는 직원.

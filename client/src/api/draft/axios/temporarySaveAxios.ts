/**
 * @file temporarySaveAxios.ts
 * @description 임시저장 API 요청을 처리하는 함수
 * @reason 임시저장 요청 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 자료를 임시로 저장하는 시스템
 */

import { axiosBase } from '../../base/axiosBase';
import draftApiPaths from './draftApiPaths'; // @type {Object} - API 경로 상수
// @description API 경로 상수 가져오기
// @reason 임시저장 경로 사용
// @analogy 도서관에서 자료 저장 경로 확인

// 드래프트 데이터 타입 정의 (draftStore.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
interface DraftData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 태그 배열
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  custom: { [key: string]: any }; // @type {Object} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: string; // @type {string} - 생성 시간 (ISO 문자열)
  updatedAt: string; // @type {string} - 수정 시간 (ISO 문자열)
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// API 응답 타입 정의
// @type {Object} - API 응답 구조
// @description API 응답의 타입 정의
// @reason 응답 데이터 타입 안정성 보장
interface TemporarySaveResponse {
  success: boolean; // @type {boolean} - 요청 성공 여부
  draftId: string; // @type {string} - 저장된 드래프트 ID
  message: string; // @type {string} - 응답 메시지
}

// 임시저장 요청 함수
// @description 드래프트 데이터를 임시저장 API로 전송
// @reason 사용자가 의도적으로 드래프트 데이터를 임시저장
// @analogy 도서관에서 자료를 임시로 저장
const temporarySaveAxios = async (
  draftData: DraftData
): Promise<TemporarySaveResponse> => {
  try {
    console.log(
      'temporarySaveAxios - Sending temporary-save request:',
      draftData
    ); // @description 디버깅용 로그
    // @description 요청 데이터 디버깅
    // @reason 요청 상태 확인

    // Axios를 사용한 POST 요청
    // @description 임시저장 API로 데이터 전송
    // @reason 드래프트 데이터 임시저장
    const response = await axiosBase.post<TemporarySaveResponse>(
      draftApiPaths.temporarySave,
      draftData,
      {
        headers: {
          'Content-Type': 'application/json', // @description 요청 헤더 설정
          // @reason JSON 데이터 전송
        },
      }
    ); // @type {AxiosResponse<TemporarySaveResponse>} - API 응답

    // 응답 데이터 검증
    // @description 응답이 성공적인지 확인
    // @reason 실패 시 에러 처리
    if (!response.data.success) {
      throw new Error(response.data.message || '임시저장에 실패했습니다.'); // @description 에러 발생
      // @reason 사용자에게 실패 알림
    }

    console.log(
      'temporarySaveAxios - Temporary-save successful:',
      response.data
    ); // @description 디버깅용 로그
    // @description 성공 응답 디버깅
    // @reason 성공 상태 확인

    return response.data; // @type {TemporarySaveResponse} - 성공 응답 반환
    // @description 성공 응답 반환
    // @reason 호출자에게 결과 전달
  } catch (error) {
    console.error('temporarySaveAxios - Temporary-save failed:', error); // @description 에러 로그
    // @description 요청 실패 디버깅
    // @reason 문제 해결 지원

    // Fallback 처리: 에러 발생 시 기본 응답 반환
    // @description 에러 발생 시 기본 응답 생성
    // @reason 애플리케이션 충돌 방지
    const fallbackResponse: TemporarySaveResponse = {
      success: false, // @type {boolean} - 실패 상태
      draftId: draftData.draftId || '', // @type {string} - Fallback: 기존 ID
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 에러가 발생했습니다.', // @type {string} - 에러 메시지
    }; // @description 기본 응답 데이터 생성
    // @reason 에러 발생 시 기본값 제공

    return fallbackResponse; // @description 기본 응답 반환
    // @reason 호출자에게 에러 결과 전달
  }
};

// 함수 내보내기
// @description 임시저장 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason mutation에서 임시저장 요청 가능
// @analogy 도서관에서 임시저장 시스템을 공유
export default temporarySaveAxios;

// **작동 매커니즘**
// 1. `DraftData` 타입 정의: 요청 데이터 구조 명시.
// 2. `TemporarySaveResponse` 타입 정의: 응답 데이터 구조 명시.
// 3. `temporarySaveAxios` 함수 정의: Axios를 사용하여 임시저장 API 요청.
// 4. `axios.post` 호출: 드래프트 데이터를 API로 전송.
// 5. 응답 검증: 성공 여부 확인 후 결과 반환.
// 6. 에러 발생 시 Fallback 처리: 기본 응답 반환으로 충돌 방지.
// 7. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 임시저장 요청 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 자료를 임시로 저장.

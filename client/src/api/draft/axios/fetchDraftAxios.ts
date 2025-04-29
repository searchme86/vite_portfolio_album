/**
 * @file fetchDraftAxios.ts
 * @description 드래프트 데이터를 불러오는 API 요청 함수
 * @reason 드래프트 불러오기 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 저장된 자료를 불러오는 시스템
 */

import { axiosBase } from '../../base/axiosBase';

import draftApiPaths from './draftApiPaths'; // @type {Object} - API 경로 상수
// @description API 경로 상수 가져오기
// @reason 드래프트 불러오기 경로 사용
// @analogy 도서관에서 자료 조회 경로 확인

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
interface FetchDraftResponse {
  success: boolean; // @type {boolean} - 요청 성공 여부
  data: DraftData | null; // @type {DraftData | null} - 드래프트 데이터
  message: string; // @type {string} - 응답 메시지
}

// 드래프트 불러오기 요청 함수
// @description 특정 드래프트 데이터를 API에서 조회
// @reason 저장된 드래프트 데이터를 불러옴
// @analogy 도서관에서 특정 자료를 조회
const fetchDraftAxios = async (
  draftId: string
): Promise<FetchDraftResponse> => {
  try {
    console.log('fetchDraftAxios - Fetching draft with ID:', draftId); // @description 디버깅용 로그
    // @description 요청 ID 디버깅
    // @reason 요청 상태 확인

    // 동적 경로 생성
    // @description draftId를 경로에 삽입
    // @reason 특정 드래프트 조회
    const url = draftApiPaths.fetchDraft.replace(':draftId', draftId); // @type {string} - 동적 URL
    // @description :draftId를 실제 ID로 치환
    // @reason API 요청 경로 생성

    // Axios를 사용한 GET 요청
    // @description 드래프트 데이터를 조회
    // @reason 저장된 드래프트 데이터 가져오기
    const response = await axiosBase.get<FetchDraftResponse>(url, {
      headers: {
        'Content-Type': 'application/json', // @description 요청 헤더 설정
        // @reason JSON 데이터 요청
      },
    }); // @type {AxiosResponse<FetchDraftResponse>} - API 응답

    // 응답 데이터 검증
    // @description 응답이 성공적인지 확인
    // @reason 실패 시 에러 처리
    if (!response.data.success) {
      throw new Error(
        response.data.message || '드래프트 불러오기에 실패했습니다.'
      ); // @description 에러 발생
      // @reason 사용자에게 실패 알림
    }

    console.log('fetchDraftAxios - Fetch successful:', response.data); // @description 디버깅용 로그
    // @description 성공 응답 디버깅
    // @reason 성공 상태 확인

    return response.data; // @type {FetchDraftResponse} - 성공 응답 반환
    // @description 성공 응답 반환
    // @reason 호출자에게 결과 전달
  } catch (error) {
    console.error('fetchDraftAxios - Fetch failed:', error); // @description 에러 로그
    // @description 요청 실패 디버깅
    // @reason 문제 해결 지원

    // Fallback 처리: 에러 발생 시 기본 응답 반환
    // @description 에러 발생 시 기본 응답 생성
    // @reason 애플리케이션 충돌 방지
    const fallbackResponse: FetchDraftResponse = {
      success: false, // @type {boolean} - 실패 상태
      data: null, // @type {DraftData | null} - Fallback: null
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
// @description 드래프트 불러오기 함수를 다른 파일에서 사용할 수 있도록 내보냄
// @reason query에서 드래프트 불러오기 요청 가능
// @analogy 도서관에서 자료 조회 시스템을 공유
export default fetchDraftAxios;

// **작동 매커니즘**
// 1. `DraftData` 타입 정의: 응답 데이터 구조 명시.
// 2. `FetchDraftResponse` 타입 정의: 응답 데이터 구조 명시.
// 3. `fetchDraftAxios` 함수 정의: Axios를 사용하여 드래프트 불러오기 API 요청.
// 4. 동적 경로 생성: `draftId`를 경로에 삽입하여 URL 생성.
// 5. `axios.get` 호출: 드래프트 데이터를 API에서 조회.
// 6. 응답 검증: 성공 여부 확인 후 결과 반환.
// 7. 에러 발생 시 Fallback 처리: 기본 응답 반환으로 충돌 방지.
// 8. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 드래프트 불러오기 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장된 자료를 조회.

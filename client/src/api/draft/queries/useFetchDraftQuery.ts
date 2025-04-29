/**
 * @file useFetchDraftQuery.ts
 * @description React Query를 사용하여 드래프트 데이터를 불러오는 커스텀 훅
 * @reason 드래프트 불러오기 query 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 저장된 자료를 조회하는 시스템
 */

import { useQuery } from '@tanstack/react-query'; // @type {Function} - React Query 훅
// @description useQuery 훅 가져오기
// @reason 비동기 query 처리
// @analogy 도서관에서 자료 조회 요청을 처리하는 도구 사용

import fetchDraftAxios from '../axios/fetchDraftAxios'; // @type {Function} - 드래프트 불러오기 API 요청 함수
// @description 드래프트 불러오기 API 요청 함수 가져오기
// @reason 드래프트 데이터 조회 실행
// @analogy 도서관에서 자료 조회 시스템 연결

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

// API 응답 타입 정의 (fetchDraftAxios.ts와 동일)
// @type {Object} - API 응답 구조
// @description API 응답의 타입 정의
// @reason 응답 데이터 타입 안정성 보장
interface FetchDraftResponse {
  success: boolean; // @type {boolean} - 요청 성공 여부
  data: DraftData | null; // @type {DraftData | null} - 드래프트 데이터
  message: string; // @type {string} - 응답 메시지
}

// 커스텀 훅 정의
// @description React Query를 사용하여 드래프트 데이터 조회
// @reason 비동기 조회 작업 관리
// @analogy 도서관에서 자료 조회 요청 관리
const useFetchDraftQuery = (draftId: string) => {
  // React Query query 훅 사용
  // @description 드래프트 데이터를 query로 조회
  // @reason 비동기 작업 상태 관리 및 캐싱
  const query = useQuery<FetchDraftResponse, Error>({
    queryKey: ['draft', draftId], // @type {Array<string>} - 쿼리 키
    // @description 고유 쿼리 키 설정
    // @reason 캐싱 및 쿼리 식별
    queryFn: () => fetchDraftAxios(draftId), // @description 쿼리 함수 정의
    // @reason fetchDraftAxios를 호출하여 드래프트 조회
    enabled: !!draftId, // @description draftId가 있을 때만 쿼리 실행
    // @reason 불필요한 요청 방지
    onSuccess: (data) => {
      console.log('useFetchDraftQuery - Fetch succeeded:', data); // @description 디버깅용 로그
      // @description 성공 상태 디버깅
      // @reason 성공 상태 확인
    },
    onError: (error) => {
      console.error('useFetchDraftQuery - Fetch failed:', error); // @description 에러 로그
      // @description 실패 상태 디버깅
      // @reason 문제 해결 지원
    },
  }); // @type {Object} - React Query query 객체

  // Fallback 처리: 쿼리 실패 시 기본 데이터 반환
  // @description 쿼리 상태를 기반으로 추가 처리
  // @reason 애플리케이션 충돌 방지
  const draftData =
    query.data?.success && query.data.data ? query.data.data : null; // @type {DraftData | null} - Fallback: null
  // @description 성공 응답에서 데이터 추출, 실패 시 null 반환
  // @reason 데이터 가용성 보장

  return {
    draftData, // @type {DraftData | null} - 조회된 드래프트 데이터
    isLoading: query.isLoading, // @type {boolean} - 로딩 상태
    error: query.error, // @type {Error | null} - 에러 상태
    isSuccess: query.isSuccess, // @type {boolean} - 성공 상태
  }; // @type {Object} - 쿼리 상태와 데이터 반환
  // @description 드래프트 데이터와 쿼리 상태 반환
  // @reason 컴포넌트에서 드래프트 조회 기능 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 드래프트 조회 query 사용 가능
// @analogy 도서관에서 자료 조회 시스템을 공유
export default useFetchDraftQuery;

// **작동 매커니즘**
// 1. `DraftData` 타입 정의: 응답 데이터 구조 명시.
// 2. `FetchDraftResponse` 타입 정의: 응답 데이터 구조 명시.
// 3. `useQuery` 훅 호출: React Query를 사용하여 드래프트 조회 query 정의.
// 4. `queryKey` 설정: 고유 키로 캐싱 및 쿼리 식별.
// 5. `queryFn`으로 `fetchDraftAxios` 호출: 드래프트 데이터 조회 실행.
// 6. `enabled` 옵션 설정: `draftId`가 있을 때만 쿼리 실행.
// 7. `onSuccess`, `onError` 콜백 정의: 쿼리 상태 디버깅.
// 8. `draftData` 추출 및 Fallback 처리: 성공 시 데이터 반환, 실패 시 null.
// 9. `draftData`, `isLoading`, `error`, `isSuccess` 반환: 컴포넌트에서 상태와 데이터 사용 가능.
// 10. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 드래프트 조회 query 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장된 자료를 조회.

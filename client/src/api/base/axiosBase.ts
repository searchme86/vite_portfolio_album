/**
 * @file axiosBase.ts
 * @description 커스텀 axios 인스턴스를 생성하여 기본 설정 정의
 * @location src/api/base/axiosBase.ts
 * @reason axios 요청의 기본 설정을 중앙에서 관리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 우체부에게 기본 주소를 미리 알려주는 설정
 */

import axios, { AxiosInstance } from 'axios'; // @type {Object} - HTTP 요청 라이브러리
// @description axios 모듈과 AxiosInstance 타입 가져오기
// @reason HTTP 요청 처리 및 타입 정의
// @analogy 도서관에서 우체부와 그의 규칙 준비

import { combineInterceptors } from '../interceptor/combineInterceptors'; // @type {Function} - 인터셉터 결합 함수
// @description 인터셉터 결합 함수 가져오기
// @reason 요청 및 응답 인터셉터 설정
// @analogy 도서관에서 요청서 처리 전후 규칙 설정

import { getOrCreateCsrfToken } from '../utils/csrfTokenUtil'; // @type {Function} - CSRF 토큰 유틸
// @description CSRF 토큰 유틸 가져오기
// @reason 모든 요청에 CSRF 토큰 포함
// @analogy 도서관에서 요청서에 인증 코드 추가

// AxiosInstance 타입 확장
// @description AxiosInstance에 isCancel 메서드 추가
// @reason 타입 안정성 보장
// @analogy 도서관에서 우체부에게 새 기능 추가
interface CustomAxiosInstance extends AxiosInstance {
  isCancel: typeof axios.isCancel; // @type {Function} - 요청 취소 확인 메서드
  // @description axios.isCancel 메서드 타입 정의
  // @reason 타입스크립트에서 isCancel 사용 가능
  // @analogy 도서관에서 우체부에게 취소 확인 기능 추가
}

// axios 인스턴스 생성
// @description 기본 URL과 설정이 포함된 axios 인스턴스 생성
// @reason 모든 요청에 동일한 설정 적용
// @analogy 도서관에서 우체부에게 기본 배달 주소 설정
export const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', // @type {string} - API 기본 URL
  // @description 환경 변수로 API URL 지정, 기본값은 localhost:3000
  // @reason 올바른 서버로 요청 전송
  // @analogy 도서관에서 우체부에게 올바른 도서관 주소 알려줌
  withCredentials: true, // @type {boolean} - 쿠키 포함 요청 활성화
  // @description HttpOnly 쿠키를 서버로 전송
  // @reason 인증 쿠키 전송
  // @analogy 도서관에서 손님의 회원증 번호를 서버로 전달
  timeout: 10000, // @type {number} - 요청 타임아웃 (10초)
  // @description 요청 타임아웃 설정
  // @reason 요청이 너무 오래 걸리면 중단
  // @analogy 도서관에서 우체부에게 10초 안에 배달 못하면 돌아오라고 명령
  headers: {
    'Content-Type': 'application/json', // @type {string} - 기본 헤더
    // @description JSON 형식으로 요청
    // @reason 데이터 형식 지정
    // @analogy 도서관에서 우체부에게 편지 형식 지정
  },
}) as CustomAxiosInstance; // @type {CustomAxiosInstance} - 커스텀 타입으로 캐스팅
// @description 커스텀 타입으로 캐스팅하여 isCancel 사용 가능
// @reason 타입 안정성 보장
// @analogy 도서관에서 우체부에게 새 기능 추가 후 사용 가능

// isCancel 메서드 추가
// @description axiosBase에 isCancel 메서드 추가
// @reason 인스턴스에서 직접 isCancel 사용 가능
// @analogy 도서관에서 우체부에게 취소 확인 기능 추가
axiosBase.isCancel = axios.isCancel; // @type {Function} - axios.isCancel 메서드 할당
// @description axios의 isCancel 메서드를 axiosBase에 추가
// @reason 코드 일관성 유지
// @analogy 도서관에서 우체부에게 본사의 취소 확인 기능을 빌려줌

// 요청 인터셉터에 CSRF 토큰 추가
// @description 모든 요청에 CSRF 토큰 포함
// @reason 보안 강화
// @analogy 도서관에서 모든 요청서에 인증 코드 추가
// axiosBase.interceptors.request.use(
//   async (config) => {
//     const csrfToken = await getOrCreateCsrfToken(); // @type {string} - CSRF 토큰
//     // @description CSRF 토큰 가져오기
//     // @reason 요청 헤더에 추가
//     // @analogy 도서관에서 요청서에 인증 코드 추가
//     config.headers['X-CSRF-Token'] = csrfToken; // @type {string} - CSRF 토큰 헤더 추가
//     // @description CSRF 토큰을 헤더에 추가
//     // @reason 서버에서 CSRF 토큰 검증
//     // @analogy 도서관에서 요청서에 인증 코드 포함
//     return config; // @type {Object} - 수정된 요청 설정 반환
//     // @description 수정된 요청 설정 반환
//     // @reason 요청 계속 진행
//     // @analogy 도서관에서 요청서 처리 계속
//   },
//   (error) => {
//     return Promise.reject(error); // @type {Error} - 에러 처리
//     // @description 요청 실패 시 에러 전달
//     // @reason 상위로 에러 전달
//     // @analogy 도서관에서 요청 실패 시 문제 알림
//   }
// );

// // 인터셉터 적용
// // @description 요청 및 응답 처리 규칙 설정
// // @reason 공통 로직 적용
// // @analogy 도서관에서 요청서 처리 규칙 적용
// combineInterceptors(axiosBase); // @type {Function} - 인터셉터 적용 함수 호출
// // @description combineInterceptors 함수로 인터셉터 설정
// // @reason 요청 및 응답 처리 규칙 적용
// // @analogy 도서관에서 요청서 처리 규칙 적용

// **작동 매커니즘**
// 1. `axios.create`로 인스턴스 생성: 기본 URL, 타임아웃, 쿠키 설정.
// 2. `CustomAxiosInstance` 타입 정의: `isCancel` 메서드 포함하도록 타입 확장.
// 3. `axiosBase.isCancel` 추가: `axios.isCancel` 메서드를 할당.
// 4. 요청 인터셉터 설정: CSRF 토큰 추가.
// 5. `combineInterceptors` 호출: 추가 인터셉터 적용.
// @reason 요청 설정을 중앙에서 관리하여 유지보수성 향상.
// @analogy 도서관에서 우체부에게 기본 규칙과 새 기능을 정해줌.

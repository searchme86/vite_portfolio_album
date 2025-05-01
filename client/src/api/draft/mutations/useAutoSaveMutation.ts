/**
 * @file useAutoSaveMutation.ts
 * @description React Query를 사용하여 자동저장 mutation을 처리하는 커스텀 훅
 * @location src/api/draft/mutations/useAutoSaveMutation.ts
 * @reason 자동저장 mutation 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 책을 주기적으로 저장하는 시스템
 */

import { useMutation } from '@tanstack/react-query'; // @type {Function} - React Query 훅
// @description React Query의 useMutation 훅 가져오기
// @reason 비동기 mutation 처리 (자동저장 요청 관리)
// @analogy 도서관에서 책 저장 요청을 처리하는 도구

import { axiosBase } from '../../base/axiosBase'; // @type {Object} - 커스텀 axios 인스턴스
// @description 커스텀 axios 인스턴스 가져오기
// @reason 서버로 자동저장 요청 전송 (기본 URL 포함)
// @analogy 도서관에서 미리 설정된 우체부 사용

import { useAuth } from '@clerk/clerk-react'; // @type {Function} - Clerk의 인증 훅
// @description Clerk 인증 상태와 토큰 가져오기
// @reason 사용자 인증 상태 및 토큰 관리
// @analogy 도서관에서 회원증 확인

import draftApiPaths from '../axios/draftApiPaths'; // @type {Object} - API 경로 상수
// @description API 경로 가져오기
// @reason 자동저장 요청 경로 사용
// @analogy 도서관에서 책 저장 위치 확인

import type { DraftState } from '../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장
// @analogy 도서관에서 책의 형식 확인

import { useAxiosErrorHandler } from '../../../hooks/useAxiosErrorHandler'; // @type {Function} - 에러 처리 커스텀 훅
// @description axios 에러 처리 훅 가져오기
// @reason 에러 처리 중앙화
// @analogy 도서관에서 에러 편지 처리 직원 호출

// API 응답 타입 정의
// @type {Object} - API 응답 구조
// @description 자동저장 API 응답의 타입 정의
// @reason 응답 데이터 타입 안정성 보장
// @analogy 도서관에서 저장 확인 메시지의 형식
interface AutoSaveResponse {
  success: boolean; // @type {boolean} - 요청 성공 여부
  // @description 저장 성공 여부 확인
  // @reason 성공 여부 판단
  draftId: string; // @type {string} - 저장된 드래프트 ID
  // @description 저장된 드래프트의 고유 ID
  // @reason 저장된 데이터 식별
  message: string; // @type {string} - 응답 메시지
  // @description 서버에서 보낸 메시지
  // @reason 사용자 피드백 제공
}

// 반환 타입 정의
// @type {Object} - 훅 반환 타입
// @description 훅이 반환하는 객체의 타입 정의
// @reason 타입 안정성 보장
// @analogy 도서관에서 반환할 정보의 형식
interface AutoSaveMutationResult {
  autoSave: (draftData: DraftState) => void; // @type {Function} - 자동저장 함수
  // @description 자동저장 실행 함수
  // @reason 컴포넌트에서 자동저장 호출
  isPending: boolean; // @type {boolean} - 대기 상태
  // @description mutation 대기 상태 (React Query v5에서 isLoading → isPending)
  // @reason UI에서 대기 상태 표시
  error: Error | null; // @type {Error | null} - 에러 상태
  // @description mutation 에러 상태
  // @reason 에러 처리
  data: AutoSaveResponse | undefined; // @type {AutoSaveResponse | undefined} - 응답 데이터
  // @description mutation 응답 데이터
  // @reason 성공 데이터 사용
}

// 커스텀 훅 정의
// @description React Query를 사용하여 자동저장 mutation 처리
// @reason 비동기 저장 작업 관리
// @analogy 도서관에서 책 저장 요청 관리
export default function useAutoSaveMutation(): AutoSaveMutationResult {
  // useAuth 훅으로 인증 상태와 토큰 가져오기
  const { isSignedIn, getToken } = useAuth(); // @type {Object} - 인증 상태와 토큰 함수
  // @description Clerk의 useAuth 훅으로 로그인 상태와 토큰 함수 가져오기
  // @reason 인증 상태 확인 및 토큰 획득
  // @analogy 도서관에서 회원증과 회원증 발급 함수 가져오기

  // 에러 처리 훅 사용
  const { handleAxiosError } = useAxiosErrorHandler(); // @type {Object} - 에러 처리 함수
  // @description axios 에러 처리 함수 가져오기
  // @reason 에러 처리 중앙화
  // @analogy 도서관에서 에러 처리 직원 호출

  // React Query mutation 훅 사용
  // @description 자동저장 요청을 mutation으로 처리
  // @reason 비동기 작업 상태 관리 및 에러 처리
  const mutation = useMutation<AutoSaveResponse, Error, DraftState>({
    mutationFn: async (draftData: DraftState): Promise<AutoSaveResponse> => {
      console.log(
        'useAutoSaveMutation - Mutation started for draft:',
        draftData
      ); // @description 디버깅용 로그
      // @description mutation 시작 로그
      // @reason 요청 상태 확인
      // @analogy 도서관에서 책 저장 시작 알림

      // 로그인 상태 확인
      if (isSignedIn === undefined) {
        console.warn('useAutoSaveMutation - Authentication state is undefined');
        // @description 로그인 상태 불명 로그
        // @reason 인증 상태 확인
        // @analogy 도서관에서 회원증 상태 불명 알림
        return {
          success: false,
          draftId: '',
          message: 'Authentication state is undefined',
        }; // @type {AutoSaveResponse} - 실패 응답 반환
        // @description 인증 상태 불명 시 실패 응답 반환
        // @reason mutationFn이 항상 AutoSaveResponse 반환하도록 보장
        // @analogy 도서관에서 회원증 상태 불명 시 실패 편지 보냄
      }

      if (!isSignedIn) {
        console.warn('useAutoSaveMutation - User not signed in, skipping save');
        // @description 로그인 상태 확인 로그
        // @reason 인증 필요
        // @analogy 도서관에서 회원증 없음을 알림
        return {
          success: false,
          draftId: '',
          message: 'User is not authenticated',
        }; // @type {AutoSaveResponse} - 실패 응답 반환
        // @description 인증 실패 시 실패 응답 반환
        // @reason mutationFn이 항상 AutoSaveResponse 반환하도록 보장
        // @analogy 도서관에서 회원증 없으면 실패 편지 보냄
      }

      // 토큰 가져오기
      const token = await getToken(); // @type {string | null} - 인증 토큰
      // @description getToken으로 토큰 동적으로 가져오기
      // @reason 인증된 요청을 위해 토큰 필요
      // @analogy 도서관에서 회원증 번호 확인
      console.log('useAutoSaveMutation - Retrieved token:', token); // @description 토큰 디버깅 로그
      // @reason 토큰 상태 확인
      // @analogy 도서관에서 회원증 번호 확인 로그

      if (!token) {
        console.warn('useAutoSaveMutation - Token is missing, skipping save');
        // @description 토큰 없음 로그
        // @reason 토큰 필수
        // @analogy 도서관에서 회원증 번호 없음을 알림
        return {
          success: false,
          draftId: '',
          message: 'Token is missing',
        }; // @type {AutoSaveResponse} - 실패 응답 반환
        // @description 토큰 누락 시 실패 응답 반환
        // @reason mutationFn이 항상 AutoSaveResponse 반환하도록 보장
        // @analogy 도서관에서 회원증 번호 없으면 실패 편지 보냄
      }

      // 데이터 검증: postTitle과 postDesc가 비어 있으면 요청 스킵
      if (!draftData.postTitle || draftData.postTitle.trim() === '') {
        console.log('useAutoSaveMutation - postTitle is empty, skipping save');
        // @description postTitle 빈 값 로그
        // @reason 저장 요청 스킵 (사용자가 아직 입력하지 않은 상태)
        // @analogy 도서관에서 책 제목이 없으면 저장 안 함
        return {
          success: false,
          draftId: '',
          message: 'postTitle is empty',
        }; // @type {AutoSaveResponse} - 실패 응답 반환
        // @description 에러 대신 실패 응답 반환
        // @reason 상위에서 에러로 처리되지 않도록
        // @analogy 도서관에서 저장 안 했다고 조용히 알림
      }

      if (!draftData.postDesc || draftData.postDesc.trim() === '') {
        console.log('useAutoSaveMutation - postDesc is empty, skipping save');
        // @description postDesc 빈 값 로그
        // @reason 저장 요청 스킵 (사용자가 아직 입력하지 않은 상태)
        // @analogy 도서관에서 책 설명이 없으면 저장 안 함
        return {
          success: false,
          draftId: '',
          message: 'postDesc is empty',
        }; // @type {AutoSaveResponse} - 실패 응답 반환
        // @description 에러 대신 실패 응답 반환
        // @reason 상위에서 에러로 처리되지 않도록
        // @analogy 도서관에서 저장 안 했다고 조용히 알림
      }

      // 요청 취소 컨트롤러 생성
      const controller = new AbortController(); // @type {AbortController} - 요청 취소 컨트롤러
      // @description 요청 취소를 위한 컨트롤러 생성
      // @reason 요청 중단 가능하도록 설정
      // @analogy 도서관에서 우체부에게 중단 신호 준비

      // 타임아웃 설정 (10초)
      const timeoutId = setTimeout(() => {
        controller.abort(); // @description 타임아웃 시 요청 취소
        // @reason 요청이 너무 오래 걸리면 중단
        // @analogy 도서관에서 우체부에게 10초 안에 안 오면 돌아오라고 명령
        console.warn(
          'useAutoSaveMutation - Request timed out after 10 seconds'
        );
        // @description 타임아웃 로그
        // @reason 디버깅
      }, 10000); // @type {number} - 타임아웃 시간 (10초)

      try {
        // axios로 자동저장 요청
        const response = await axiosBase.post<AutoSaveResponse>(
          draftApiPaths.autoSave, // @type {string} - 자동저장 API 경로
          // @description draftApiPaths에서 자동저장 경로 사용
          // @reason 중앙에서 관리된 경로 사용
          // @analogy 도서관에서 책 저장 위치
          draftData, // @type {DraftState} - 전송할 드래프트 데이터
          // @description 저장할 드래프트 데이터
          // @reason 서버에 전송할 데이터
          // @analogy 도서관에서 저장할 책
          {
            headers: {
              Authorization: `Bearer ${token}`, // @type {string} - 인증 헤더
              // @description 토큰을 헤더에 추가
              // @reason 인증된 요청
              // @analogy 도서관에서 회원증 제시
            },
            signal: controller.signal, // @type {AbortSignal} - 요청 취소 신호
            // @description 요청 취소 신호 추가
            // @reason 요청 중단 가능하도록 설정
            // @analogy 도서관에서 우체부에게 중단 신호 연결
          }
        ); // @type {AxiosResponse<AutoSaveResponse>} - axios 응답
        // @description axiosBase로 POST 요청 전송
        // @reason 서버에 드래프트 데이터 저장
        // @analogy 도서관에서 책 저장 요청 보내기

        console.log('useAutoSaveMutation - Mutation response:', response.data); // @description 응답 디버깅 로그
        // @reason 응답 상태 확인
        // @analogy 도서관에서 저장 결과 확인

        return response.data; // @type {AutoSaveResponse} - 응답 데이터 반환
        // @description 서버 응답 반환
        // @reason 상위 함수에서 응답 사용
        // @analogy 도서관에서 저장 확인 메시지 반환
      } catch (error: unknown) {
        //====여기부터 수정됨====
        if (error instanceof Error) {
          // 에러 처리: useAxiosErrorHandler 사용
          const errorDetails = handleAxiosError(error); // @type {Object} - 에러 세부 정보
          // @description 에러 처리 훅으로 에러 정보 추출
          // @reason 에러 처리 중앙화 및 타입 안전성 보장
          // @analogy 도서관에서 에러 처리 직원에게 에러 편지 전달
          return {
            success: false,
            draftId: '',
            message: errorDetails.message,
          }; // @type {AutoSaveResponse} - 실패 응답 반환
          // @description 에러 메시지를 포함한 실패 응답 반환
          // @reason mutationFn이 항상 AutoSaveResponse 반환하도록 보장
          // @analogy 도서관에서 실패 편지 보냄
        }

        // Fallback: 알 수 없는 에러 처리
        return {
          success: false,
          draftId: '',
          message: 'Unknown error occurred',
        }; // @type {AutoSaveResponse} - 기본 실패 응답 반환
        // @description 알 수 없는 에러 시 기본 실패 응답 반환
        // @reason mutationFn이 항상 AutoSaveResponse 반환하도록 보장
        // @analogy 도서관에서 알 수 없는 문제로 실패 편지 보냄
        //====여기까지 수정됨====
      } finally {
        clearTimeout(timeoutId); // @description 타임아웃 정리
        // @reason 리소스 정리
        // @analogy 도서관에서 우체부 명령 정리
      }
    },
    onSuccess: (data) => {
      console.log('useAutoSaveMutation - Auto-save succeeded:', data); // @description 성공 로그
      // @description 성공 상태 디버깅
      // @reason 성공 상태 확인
      // @analogy 도서관에서 책 저장 성공 알림
    },
    onError: (error) => {
      console.error('useAutoSaveMutation - Auto-save failed:', {
        message: error.message,
        stack: error.stack,
      }); // @description 에러 로그
      // @description 실패 상태 디버깅
      // @reason 문제 해결 지원
      // @analogy 도서관에서 책 저장 실패 알림

      // 사용자에게 에러 메시지 전달 (예: toast 알림 또는 UI 업데이트)
      // 이 부분은 실제 UI 라이브러리(toast, alert 등)에 따라 구현 필요
      console.log('useAutoSaveMutation - Notify user:', error.message); // @description 사용자 알림
      // @reason 사용자 피드백 제공
      // @analogy 도서관에서 사용자에게 저장 실패 이유 알림
    },
    onSettled: () => {
      console.log('useAutoSaveMutation - Mutation settled'); // @description 완료 로그
      // @description mutation 완료 디버깅
      // @reason mutation 상태 확인
      // @analogy 도서관에서 저장 작업 완료 알림
    },
  }); // @type {Object} - React Query mutation 객체
  // @description useMutation으로 mutation 정의
  // @reason 비동기 작업 관리
  // @analogy 도서관에서 책 저장 시스템 설정

  // Fallback 처리: mutation 실패 시 기본 동작
  // @description mutation 실행 함수 정의
  // @reason 애플리케이션 충돌 방지
  // @analogy 도서관에서 저장 요청 실행 함수
  const handleAutoSave = (draftData: DraftState) => {
    mutation.mutate(draftData); // @description mutation 실행
    // @reason 자동저장 요청 트리거
    // @analogy 도서관에서 책 저장 요청 실행
  };

  return {
    autoSave: handleAutoSave, // @type {Function} - 자동저장 함수
    // @description 자동저장 실행 함수
    // @reason 컴포넌트에서 자동저장 호출
    isPending: mutation.isPending, // @type {boolean} - 대기 상태
    // @description mutation 대기 상태 (React Query v5에서 isLoading → isPending)
    // @reason UI에서 대기 상태 표시
    error: mutation.error, // @type {Error | null} - 에러 상태
    // @description mutation 에러 상태
    // @reason 에러 처리
    data: mutation.data, // @type {AutoSaveResponse | undefined} - 응답 데이터
    // @description mutation 응답 데이터
    // @reason 성공 데이터 사용
  }; // @type {AutoSaveMutationResult} - mutation 상태와 함수 반환
  // @description 자동저장 함수와 상태 반환
  // @reason 컴포넌트에서 자동저장 기능 사용 가능
  // @analogy 도서관에서 책 저장 시스템과 상태 반환
}

// **작동 매커니즘**
// 1. `useAuth`로 인증 상태 가져오기: Clerk에서 로그인 상태와 `getToken` 함수 가져옴.
// 2. `useAxiosErrorHandler` 호출: 에러 처리 함수 가져옴.
// 3. `DraftState` 타입 사용: `initialDraftState`에서 가져온 드래프트 데이터 타입 사용.
// 4. `AutoSaveResponse` 타입 정의: 서버 응답 데이터 구조 정의.
// 5. `useMutation` 훅 호출: React Query로 자동저장 mutation 정의.
// 6. 인증 및 데이터 검증: `isSignedIn`, 토큰, `postTitle`, `postDesc` 확인 후 실패 응답 반환.
// 7. `getToken`으로 토큰 가져오기: 인증된 요청을 위해 토큰 동적으로 획득.
// 8. `AbortController`로 요청 관리: 요청 취소 가능하도록 설정.
// 9. `axiosBase.post`로 요청: `http://localhost:3000/draft/auto-save`로 데이터 전송.
// 10. `handleAxiosError`로 에러 처리: 에러 발생 시 실패 응답 반환.
// 11. `onSuccess`, `onError`, `onSettled` 콜백 정의: mutation 상태 디버깅 및 사용자 피드백.
// 12. `handleAutoSave` 함수 정의: mutation 실행.
// 13. `autoSave`, `isPending`, `error`, `data` 반환: 컴포넌트에서 상태와 함수 사용 가능.
// @reason 자동저장 mutation 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 책을 주기적으로 저장하는 시스템.

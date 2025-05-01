/**
 * @file useAutoSave.ts
 * @description 드래프트 데이터를 localStorage와 서버에 자동저장하는 커스텀 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSave.ts
 * @reason 자동저장 로직을 캡슐화하여 재사용성과 유지보수성 향상
 * @analogy 도서관에서 책을 로컬과 서버에 저장하는 시스템
 */
import { useRef, useEffect } from 'react'; // @type {Function} - React 훅
// @description useRef, useEffect 훅 가져오기
// @reason 이전 드래프트 데이터 저장 및 변경 감지
// @analogy 도서관에서 이전 책 정보를 저장하는 메모장

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장
// @analogy 도서관에서 책의 형식 확인

import { useAutoSaveLocalStorage } from './useAutoSaveLocalStorage'; // @type {Function} - localStorage 저장 훅
// @description localStorage 저장 로직
// @reason 로컬 저장 분리
// @analogy 도서관에서 책을 로컬 서랍에 저장

import useAutoSaveServerSync from './useAutoSaveServerSync'; // @type {Function} - 서버 동기화 훅
// @description 서버 동기화 로직
// @reason 서버 저장 분리
// @analogy 도서관에서 책을 서버에 저장

import { useAutoSaveNetworkStatus } from './useAutoSaveNetworkStatus'; // @type {Function} - 네트워크 상태 훅
// @description 네트워크 상태 감지
// @reason 네트워크 상태 관리
// @analogy 도서관에서 인터넷 연결 상태 확인

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지
// @why 로그가 과도하게 출력되지 않도록 제어
// @mechanism
// 1. `process.env.NODE_ENV`로 환경 확인.
// 2. 개발 환경에서만 로그 출력.

// 반환 타입 정의
interface AutoSaveResult {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  // @description 로컬 또는 서버 저장 진행 상태
  // @reason UI에서 로딩 상태 표시
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간 (수정됨)
  // @description 마지막으로 저장된 시간
  // @reason 사용자에게 마지막 저장 시간 표시
  // @why Date 타입으로 변경하여 AutoSaveNotification과 일치
}

// 커스텀 훅 정의
export function useAutoSave(
  draft: DraftState, // @type {Object} - 드래프트 데이터 (타입 명시 추가)
  // @description 자동저장할 드래프트 데이터
  // @reason 저장할 데이터 전달
  isSignedIn?: boolean, // @type {boolean | undefined} - 로그인 상태
  // @description 로그인 상태 확인
  // @reason 서버 저장 시 인증 필요
  getToken?: () => Promise<string | null> // @type {Function | undefined} - 토큰 가져오기 함수 (타입 수정)
  // @description 비동기적으로 토큰 가져오기
  // @reason 서버 요청 시 토큰 필요
  // @why Promise를 반환하는 함수로 변경하여 getToken의 비동기 특성 반영
): AutoSaveResult {
  const previousDraftRef = useRef<DraftState | null>(null); // @type {Object | null} - 이전 드래프트 데이터
  // @description 이전 드래프트 데이터 저장
  // @reason 변경 감지
  // @analogy 도서관에서 이전 책 정보를 저장하는 메모장

  const isOnline = useAutoSaveNetworkStatus(); // @type {boolean} - 네트워크 상태
  // @description 네트워크 상태 가져오기
  // @reason 서버 저장 제어
  // @analogy 도서관에서 인터넷 연결 상태 확인

  const { isSaving: isLocalSaving } = useAutoSaveLocalStorage(draft); // @type {Object} - localStorage 저장 상태
  // @description localStorage 저장 실행 및 상태 가져오기
  // @reason 로컬 저장 관리
  // @analogy 도서관에서 책을 로컬 서랍에 저장

  const { isSaving: isServerSaving, lastSaved } = useAutoSaveServerSync(
    draft, // @description 서버에 저장할 드래프트 데이터
    isOnline, // @description 네트워크 상태 전달
    isSignedIn, // @description 로그인 상태 전달
    getToken // @description 토큰 가져오기 함수 전달
  ); // @type {Object} - 서버 동기화 상태
  // @description 서버 동기화 실행 및 상태 가져오기
  // @reason 서버 저장 관리
  // @analogy 도서관에서 책을 서버에 저장

  // 데이터 변경 감지
  const hasChanged = () => {
    if (!previousDraftRef.current) return true; // @type {boolean} - 처음 호출 시 true 반환
    // @description 초기 저장 보장
    // @reason 첫 실행 시 저장 트리거
    const prev = JSON.stringify(previousDraftRef.current); // @type {string} - 이전 데이터 직렬화
    // @description 이전 데이터를 직렬화하여 비교 가능하게 만듦
    // @reason 객체 비교를 위해 직렬화
    const curr = JSON.stringify(draft); // @type {string} - 현재 데이터 직렬화
    // @description 현재 데이터를 직렬화하여 비교 가능하게 만듦
    // @reason 객체 비교를 위해 직렬화
    return prev !== curr; // @type {boolean} - 변경 여부 반환
    // @description 이전 데이터와 현재 데이터 비교
    // @reason 변경 여부 확인
  };

  useEffect(() => {
    if (hasChanged()) {
      // 디버깅 로그: 변경 감지 (디버깅 모드에서만 출력)
      if (isDebugMode) {
        console.log('useAutoSave - Changes detected:', {
          previous: previousDraftRef.current,
          current: draft,
        }); // @description 변경 감지 로그
        // @reason 변경 상태 확인
        // @analogy 도서관에서 책 변경 확인 로그
      }

      // 디버깅 로그: draft 데이터 확인 (디버깅 모드에서만 출력)
      if (isDebugMode) {
        console.log('useAutoSave - Draft data:', {
          postTitle: draft.postTitle,
          postDesc: draft.postDesc,
          postContent: draft.postContent,
        }); // @description 드래프트 데이터 로그
        // @reason 데이터 상태 확인
        // @analogy 도서관에서 책 내용 확인 로그
      }

      previousDraftRef.current = draft; // @type {DraftState} - 이전 데이터 업데이트
      // @description 현재 드래프트 데이터를 이전 데이터로 저장
      // @reason 다음 변경 감지 준비
      // @analogy 도서관에서 현재 책을 메모장에 저장
    }
  }, [draft]); // @description draft 변경 시 실행
  // @reason 변경 감지 및 저장 트리거
  // @why draft 변경 시 변경 감지 로직 실행
  // @mechanism
  // 1. `draft` 변경 감지.
  // 2. `hasChanged` 호출로 변경 여부 확인.
  // 3. 변경 시 `previousDraftRef` 업데이트.

  // isSaving이 항상 정의되도록 보장
  const finalIsSaving = isLocalSaving || isServerSaving || false; // @type {boolean} - 최종 저장 상태
  // @description isLocalSaving과 isServerSaving이 undefined일 경우 false로 대체
  // @reason isSaving이 undefined가 되지 않도록 보장
  // @why undefined 상태를 방지하여 안정적인 상태 반환
  // @analogy 도서관에서 저장 중 상태를 항상 명확히 확인

  return { isSaving: finalIsSaving, lastSaved }; // @type {AutoSaveResult} - 저장 상태와 마지막 저장 시간 반환
  // @description 저장 상태와 마지막 저장 시간 반환
  // @reason 컴포넌트에서 사용
  // @analogy 도서관에서 저장 진행 상태와 마지막 저장 시간 반환
}

// **작동 매커니즘**
// 1. `useRef`로 previousDraftRef 생성: 이전 드래프트 데이터를 저장.
// 2. `useAutoSaveNetworkStatus` 호출: 네트워크 상태 확인.
// 3. `useAutoSaveLocalStorage` 호출: 로컬 저장 실행 및 상태 가져오기.
// 4. `useAutoSaveServerSync` 호출: 서버 동기화 실행 및 상태 가져오기.
// 5. `hasChanged`로 데이터 변경 감지: 이전 데이터와 현재 데이터 비교.
// 6. `useEffect`로 변경 감지 및 로그 출력.
// 7. `finalIsSaving` 계산: 로컬 또는 서버 저장 중 여부 확인.
// 8. `isSaving`과 `lastSaved` 반환: 컴포넌트에서 상태 사용.
// @reason 드래프트 데이터를 로컬과 서버에 자동저장하여 데이터 손실 방지
// @analogy 도서관에서 책을 로컬 서랍과 서버에 저장하는 시스템

/**
 * @file useAutoSaveServerSync.ts
 * @description 드래프트 데이터를 주기적으로 서버에 동기화하는 커스텀 훅
 * @location src/api/draft/sync/useAutoSaveServerSync.ts
 * @reason 주기적 동기화 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 책을 정기적으로 저장하는 타이머
 */
import { useEffect, useRef, useState } from 'react'; // @type {Function} - React 훅
// @description useEffect, useRef, useState 훅 가져오기
// @reason 컴포넌트 생명주기 관리, 참조 유지, 상태 관리
// @analogy 도서관에서 타이머, 메모장, 시계 준비

import useAutoSaveMutation from '../../../../../api/draft/mutations/useAutoSaveMutation'; // @type {Function} - 자동저장 mutation 훅
// @description 자동저장 mutation 훅 가져오기
// @reason 서버로 데이터 저장
// @analogy 도서관에서 책 저장 도구 가져오기

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장
// @analogy 도서관에서 책의 형식 확인

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지
// @why 로그가 과도하게 출력되지 않도록 제어
// @mechanism
// 1. `process.env.NODE_ENV`로 환경 확인.
// 2. 개발 환경에서만 로그 출력.

// 반환 타입 정의
interface AutoSaveServerSyncResult {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  // @description 서버 저장 진행 상태
  // @reason UI에서 로딩 상태 표시
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간 (수정됨)
  // @description 마지막으로 저장된 시간
  // @reason 사용자에게 마지막 저장 시간 표시
  // @why Date 타입으로 변경하여 AutoSaveNotification과 일치
}

// 커스텀 훅 정의
export default function useAutoSaveServerSync(
  draftData: DraftState, // @type {Object} - 드래프트 데이터
  // @description 서버에 저장할 드래프트 데이터
  // @reason 저장할 데이터 전달
  isOnline: boolean, // @type {boolean} - 네트워크 상태
  // @description 네트워크 연결 상태
  // @reason 네트워크 상태에 따라 저장 제어
  isSignedIn?: boolean, // @type {boolean | undefined} - 로그인 상태
  // @description 로그인 상태 확인
  // @reason 서버 저장 시 인증 필요
  getToken?: () => Promise<string | null> // @type {Function | undefined} - 토큰 가져오기 함수 (타입 수정)
  // @description 비동기적으로 토큰 가져오기
  // @reason 서버 요청 시 토큰 필요
  // @why Promise를 반환하는 함수로 변경하여 getToken의 비동기 특성 반영
): AutoSaveServerSyncResult {
  const { autoSave, isPending, error, data } = useAutoSaveMutation(); // @type {Object} - 자동저장 함수, 상태
  // @description useAutoSaveMutation 훅으로 자동저장 함수와 상태 가져오기
  // @reason 서버 저장, 대기 상태, 에러 상태, 응답 데이터 확인
  // @analogy 도서관에서 책 저장 도구, 진행 상태, 실패 상태, 저장 결과 확인

  const [lastSaved, setLastSaved] = useState<Date | null>(null); // @type {Date | null} - 마지막 저장 시간 상태 (수정됨)
  // @description 마지막 저장 시간을 저장하는 상태
  // @reason 사용자에게 마지막 저장 시간 표시
  // @why Date 객체로 저장하여 AutoSaveNotification과 일치
  // @analogy 도서관에서 마지막 저장 시간을 기록하는 시계

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // @type {RefObject<NodeJS.Timeout | null>} - setInterval 참조
  // @description setInterval ID를 저장하기 위한 참조
  // @reason interval 관리 및 정리
  // @analogy 도서관에서 타이머 ID 메모

  const previousDraftRef = useRef<string | null>(null); // @type {RefObject<string | null>} - 이전 드래프트 데이터
  // @description 이전 드래프트 데이터를 직렬화하여 저장
  // @reason 변경 감지

  // 서버에 저장하는 함수 (내부용)
  const saveToServer = async () => {
    if (!isOnline) {
      if (isDebugMode) {
        console.log('useAutoSaveServerSync - Offline, skipping server save'); // @description 오프라인 로그
        // @reason 불필요한 경고 줄이기
        // @analogy 도서관에서 인터넷이 없어 저장 안 함 알림
      }
      return;
    }

    if (isSignedIn !== true) {
      if (isDebugMode) {
        console.log(
          'useAutoSaveServerSync - Not signed in, skipping server save'
        ); // @description 로그인 상태 로그
        // @reason 불필요한 경고 줄이기
        // @analogy 도서관에서 로그인하지 않아 저장 안 함 알림
      }
      return;
    }

    const token = getToken ? await getToken() : null; // @type {string | null} - 토큰 가져오기 (비동기 처리 추가)
    // @description 비동기적으로 토큰 가져오기
    // @reason 서버 요청 시 토큰 필요
    // @why await으로 비동기 처리하여 Promise 해결
    if (!token) {
      if (isDebugMode) {
        console.log('useAutoSaveServerSync - No token, skipping server save'); // @description 토큰 없음 로그
        // @reason 불필요한 경고 줄이기
        // @analogy 도서관에서 인증 토큰이 없어 저장 안 함 알림
      }
      return;
    }

    // 변경 감지
    const currentDraft = JSON.stringify(draftData); // @type {string} - 현재 데이터 직렬화
    // @description 현재 데이터를 직렬화하여 비교 가능하게 만듦
    // @reason 변경 감지를 위해 직렬화
    if (previousDraftRef.current === currentDraft) {
      if (isDebugMode) {
        console.log('useAutoSaveServerSync - No changes, skipping server save'); // @description 변경 없음 로그
        // @reason 불필요한 저장 방지
        // @analogy 도서관에서 변경 없으면 저장 안 함 알림
      }
      return;
    }

    if (isDebugMode) {
      console.log(
        'useAutoSaveServerSync - Attempting to save draft to server:',
        draftData
      ); // @description 저장 시도 로그
      // @reason 동기화 상태 확인
      // @analogy 도서관에서 책 저장 시도 알림
    }

    autoSave(draftData); // @type {Function} - 자동저장 실행
    // @description autoSave 함수로 서버에 데이터 저장
    // @reason 서버 동기화
    // @analogy 도서관에서 책 저장 요청

    previousDraftRef.current = currentDraft; // @type {string} - 이전 데이터 업데이트
    // @description 현재 드래프트 데이터를 이전 데이터로 저장
    // @reason 다음 변경 감지 준비
    // @analogy 도서관에서 현재 책 정보를 메모장에 저장
  };

  // 저장 성공 시 lastSaved 업데이트
  useEffect(() => {
    if (data?.success) {
      const now = new Date(); // @type {Date} - 현재 시간 (수정됨)
      // @description 현재 시간을 Date 객체로 가져오기
      // @reason 마지막 저장 시간 기록
      // @why Date 객체로 저장하여 AutoSaveNotification과 일치
      // @analogy 도서관에서 저장 시간 기록
      setLastSaved(now); // @description lastSaved 상태 업데이트
      // @reason 마지막 저장 시간 저장
      // @analogy 도서관에서 시계에 시간 기록
      if (isDebugMode) {
        console.log('useAutoSaveServerSync - Last saved updated:', now); // @description 마지막 저장 시간 로그
        // @reason 디버깅
        // @analogy 도서관에서 저장 시간 로그 남기기
      }
    }
  }, [data]); // @type {Array} - 의존성 배열
  // @description data 변경 시 useEffect 실행
  // @reason 저장 성공 시 시간 업데이트
  // @why data 변경 시 lastSaved 업데이트
  // @mechanism
  // 1. `data` 변경 감지.
  // 2. `data.success` 확인 후 현재 시간으로 `lastSaved` 업데이트.

  useEffect(() => {
    if (isDebugMode) {
      console.log('useAutoSaveServerSync - Setting up auto-save interval'); // @description interval 설정 로그
      // @reason 동기화 설정 확인
      // @analogy 도서관에서 타이머 설정 알림
    }

    // 1분마다 자동저장 실행
    intervalRef.current = setInterval(async () => {
      await saveToServer(); // @description 주기적 저장 실행 (비동기 처리 추가)
      // @reason 1분마다 서버 동기화
      // @why async/await으로 비동기 처리
      // @analogy 도서관에서 1분마다 책 저장
    }, 60000); // @type {number} - 1분 간격 (60000ms)

    // 에러 발생 시에도 interval 중단하지 않음
    if (error) {
      if (isDebugMode) {
        console.log(
          'useAutoSaveServerSync - Error occurred, but continuing auto-save:',
          error.message
        ); // @description 에러 로그
        // @reason postTitle 등이 비어 있는 것은 정상 상태이므로 interval 중단 불필요
        // @analogy 도서관에서 저장 실패해도 타이머 계속 돌림
      }
    }

    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      if (intervalRef.current) {
        if (isDebugMode) {
          console.log('useAutoSaveServerSync - Cleaning up auto-save interval'); // @description 정리 로그
          // @reason 리소스 정리
          // @analogy 도서관에서 타이머 정리 알림
        }
        clearInterval(intervalRef.current); // @description interval 정리
        // @reason 리소스 정리
        // @analogy 도서관에서 타이머 끄기
      }
    };
  }, [draftData, error, isOnline, isSignedIn, getToken]); // @type {Array} - 의존성 배열
  // @description draftData, error, isOnline 변경 시 useEffect 실행
  // @reason 데이터 변경, 에러 발생, 네트워크 상태 변경 시 동기화 제어
  // @why 의존성 배열에 getToken 추가로 함수 참조 변경 시 반영
  // @mechanism
  // 1. 의존성 변경 감지.
  // 2. `setInterval`로 주기적 저장 설정.
  // 3. 언마운트 시 정리.

  return {
    isSaving: isPending, // @type {boolean} - 저장 중 여부
    // @description useAutoSaveMutation의 isPending 상태를 isSaving으로 사용
    // @reason 서버 저장 진행 상태 표시
    lastSaved, // @type {Date | null} - 마지막 저장 시간 (수정됨)
    // @description 마지막 저장 시간 반환
    // @reason 사용자에게 마지막 저장 시간 표시
  }; // @type {AutoSaveServerSyncResult} - 반환 객체
  // @description isSaving, lastSaved 반환
  // @reason 컴포넌트에서 자동저장 상태 사용 가능
  // @analogy 도서관에서 진행 상태와 마지막 저장 시간 반환
}

// **작동 매커니즘**
// 1. `useAutoSaveMutation` 훅 호출: 자동저장 mutation 함수와 상태(isPending, error, data) 가져옴.
// 2. `useState`로 lastSaved 관리: 저장 성공 시 마지막 저장 시간을 Date 객체로 저장.
// 3. `useRef`로 interval 관리: `setInterval` ID를 저장.
// 4. `previousDraftRef`로 변경 감지: 이전 데이터와 비교.
// 5. `saveToServer` 함수 정의 (내부용): 네트워크 상태, 로그인 상태, 토큰 확인 후 서버에 드래프트 데이터 저장.
// 6. `useEffect`로 lastSaved 업데이트: 저장 성공 시 현재 시간 저장.
// 7. `useEffect`로 주기적 저장 설정: 1분마다 `saveToServer` 실행.
// 8. 에러 발생 시에도 interval 유지: 정상적인 에러(postTitle 빈 상태 등)는 무시.
// 9. 컴포넌트 언마운트 시 정리: 리소스 누수 방지.
// 10. `isSaving`, `lastSaved` 반환: 자동저장 상태 제공.
// @reason 주기적 서버 동기화를 통해 데이터 손실 방지
// @analogy 도서관에서 책을 정기적으로 저장하는 타이머

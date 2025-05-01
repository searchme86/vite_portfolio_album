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

// 반환 타입 정의
// @type {Object} - 훅 반환 타입
// @description 훅이 반환하는 객체의 타입 정의
// @reason 타입 안정성 보장
// @analogy 도서관에서 반환할 정보의 형식
interface AutoSaveServerSyncResult {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  // @description 서버 저장 진행 상태
  // @reason UI에서 로딩 상태 표시
  lastSaved: string | null; // @type {string | null} - 마지막 저장 시간
  // @description 마지막으로 저장된 시간
  // @reason 사용자에게 마지막 저장 시간 표시
}

// 커스텀 훅 정의
// @description 주기적으로 드래프트 데이터를 서버에 동기화
// @reason 자동저장 기능 제공
// @analogy 도서관에서 책을 정기적으로 저장
export default function useAutoSaveServerSync(
  draftData: DraftState, // @type {Object} - 드래프트 데이터
  // @description 서버에 저장할 드래프트 데이터
  // @reason 저장할 데이터 전달
  isOnline: boolean // @type {boolean} - 네트워크 상태
  // @description 네트워크 연결 상태
  // @reason 네트워크 상태에 따라 저장 제어
): AutoSaveServerSyncResult {
  const { autoSave, isPending, error, data } = useAutoSaveMutation(); // @type {Object} - 자동저장 함수, 상태
  // @description useAutoSaveMutation 훅으로 자동저장 함수와 상태 가져오기
  // @reason 서버 저장, 대기 상태, 에러 상태, 응답 데이터 확인
  // @analogy 도서관에서 책 저장 도구, 진행 상태, 실패 상태, 저장 결과 확인

  const [lastSaved, setLastSaved] = useState<string | null>(null); // @type {string | null} - 마지막 저장 시간 상태
  // @description 마지막 저장 시간을 저장하는 상태
  // @reason 사용자에게 마지막 저장 시간 표시
  // @analogy 도서관에서 마지막 저장 시간을 기록하는 시계

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // @type {RefObject<NodeJS.Timeout | null>} - setInterval 참조
  // @description setInterval ID를 저장하기 위한 참조
  // @reason interval 관리 및 정리
  // @analogy 도서관에서 타이머 ID 메모

  // 서버에 저장하는 함수 (내부용)
  const saveToServer = () => {
    if (!isOnline) {
      console.log('useAutoSaveServerSync - Offline, skipping server save'); // @description 오프라인 로그
      // @description 네트워크 오프라인 상태 로그
      // @reason 불필요한 경고 줄이기
      // @analogy 도서관에서 인터넷이 없어 저장 안 함 알림
      return;
    }

    console.log(
      'useAutoSaveServerSync - Attempting to save draft to server:',
      draftData
    ); // @description 저장 시도 로그
    // @description 저장 시도 디버깅
    // @reason 동기화 상태 확인
    // @analogy 도서관에서 책 저장 시도 알림

    autoSave(draftData); // @type {Function} - 자동저장 실행
    // @description autoSave 함수로 서버에 데이터 저장
    // @reason 서버 동기화
    // @analogy 도서관에서 책 저장 요청
  };

  // 저장 성공 시 lastSaved 업데이트
  useEffect(() => {
    if (data?.success) {
      const now = new Date().toISOString(); // @type {string} - 현재 시간
      // @description 현재 시간을 ISO 형식으로 가져오기
      // @reason 마지막 저장 시간 기록
      // @analogy 도서관에서 저장 시간 기록
      setLastSaved(now); // @description lastSaved 상태 업데이트
      // @reason 마지막 저장 시간 저장
      // @analogy 도서관에서 시계에 시간 기록
      console.log('useAutoSaveServerSync - Last saved updated:', now); // @description 마지막 저장 시간 로그
      // @reason 디버깅
    }
  }, [data]); // @type {Array} - 의존성 배열
  // @description data 변경 시 useEffect 실행
  // @reason 저장 성공 시 시간 업데이트
  // @analogy 도서관에서 저장 성공 시 시간 기록

  useEffect(() => {
    console.log('useAutoSaveServerSync - Setting up auto-save interval'); // @description interval 설정 로그
    // @description interval 설정 디버깅
    // @reason 동기화 설정 확인
    // @analogy 도서관에서 타이머 설정 알림

    // 30초마다 자동저장 실행
    intervalRef.current = setInterval(() => {
      saveToServer(); // @description 주기적 저장 실행
      // @reason 30초마다 서버 동기화
      // @analogy 도서관에서 30초마다 책 저장
    }, 30000); // @type {number} - 30초 간격

    // 에러 발생 시에도 interval 중단하지 않음
    if (error) {
      console.log(
        'useAutoSaveServerSync - Error occurred, but continuing auto-save:',
        error.message
      ); // @description 에러 로그
      // @description 에러 발생 시 로그만 남기고 계속 진행
      // @reason postTitle 등이 비어 있는 것은 정상 상태이므로 interval 중단 불필요
      // @analogy 도서관에서 저장 실패해도 타이머 계속 돌림
    }

    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      if (intervalRef.current) {
        console.log('useAutoSaveServerSync - Cleaning up auto-save interval'); // @description 정리 로그
        // @description interval 정리 디버깅
        // @reason 리소스 정리
        // @analogy 도서관에서 타이머 정리 알림
        clearInterval(intervalRef.current); // @description interval 정리
        // @reason 리소스 정리
        // @analogy 도서관에서 타이머 끄기
      }
    };
  }, [draftData, error, isOnline]); // @type {Array} - 의존성 배열
  // @description draftData, error, isOnline 변경 시 useEffect 실행
  // @reason 데이터 변경, 에러 발생, 네트워크 상태 변경 시 동기화 제어
  // @analogy 도서관에서 책 내용, 실패 상태, 인터넷 상태 변경 시 동작

  return {
    isSaving: isPending, // @type {boolean} - 저장 중 여부
    // @description useAutoSaveMutation의 isPending 상태를 isSaving으로 사용
    // @reason 서버 저장 진행 상태 표시
    lastSaved, // @type {string | null} - 마지막 저장 시간
    // @description 마지막 저장 시간 반환
    // @reason 사용자에게 마지막 저장 시간 표시
  }; // @type {AutoSaveServerSyncResult} - 반환 객체
  // @description isSaving, lastSaved 반환
  // @reason 컴포넌트에서 자동저장 상태 사용 가능
  // @analogy 도서관에서 진행 상태와 마지막 저장 시간 반환
}

// **작동 매커니즘**
// 1. `useAutoSaveMutation` 훅 호출: 자동저장 mutation 함수와 상태(isPending, error, data) 가져옴.
// 2. `useState`로 lastSaved 관리: 저장 성공 시 마지막 저장 시간을 저장.
// 3. `useRef`로 interval 관리: `setInterval` ID를 저장.
// 4. `saveToServer` 함수 정의 (내부용): 네트워크 상태 확인 후 서버에 드래프트 데이터 저장.
// 5. `useEffect`로 lastSaved 업데이트: 저장 성공 시 현재 시간 저장.
// 6. `useEffect`로 주기적 저장 설정: 30초마다 `saveToServer` 실행.
// 7. 에러 발생 시에도 interval 유지: 정상적인 에러(postTitle 빈 상태 등)는 무시.
// 8. 컴포넌트 언마운트 시 정리: 리소스 누수 방지.
// 9. `isSaving`, `lastSaved` 반환: 자동저장 상태 제공.
// @reason 주기적 서버 동기화를 통해 데이터 손실 방지.
// @analogy 도서관에서 책을 정기적으로 저장하는 타이머.

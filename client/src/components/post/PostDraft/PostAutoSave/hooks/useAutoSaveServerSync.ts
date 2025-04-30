/**
 * @file useAutoSaveServerSync.ts
 * @description 드래프트 데이터를 주기적으로 서버에 동기화하는 커스텀 훅
 * @location src/api/draft/sync/useAutoSaveServerSync.ts
 * @reason 주기적 동기화 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 책을 정기적으로 저장하는 타이머
 */

import { useEffect, useRef } from 'react'; // @type {Function} - React 훅
// @description useEffect와 useRef 훅 가져오기
// @reason 컴포넌트 생명주기 관리 및 참조 유지
// @analogy 도서관에서 타이머와 메모장 준비

import useAutoSaveMutation from '../../../../../api/draft/mutations/useAutoSaveMutation'; // @type {Function} - 자동저장 mutation 훅
// @description 자동저장 mutation 훅 가져오기
// @reason 서버로 데이터 저장
// @analogy 도서관에서 책 저장 도구 가져오기

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장
// @analogy 도서관에서 책의 형식 확인

// 커스텀 훅 정의
// @description 주기적으로 드래프트 데이터를 서버에 동기화
// @reason 자동저장 기능 제공
// @analogy 도서관에서 책을 정기적으로 저장
export default function useAutoSaveServerSync(draftData: DraftState) {
  const { autoSave, error } = useAutoSaveMutation(); // @type {Object} - 자동저장 함수와 에러 상태
  // @description useAutoSaveMutation 훅으로 자동저장 함수와 에러 상태 가져오기
  // @reason 서버 저장 및 에러 상태 확인
  // @analogy 도서관에서 책 저장 도구와 실패 상태 확인

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // @type {RefObject<NodeJS.Timeout | null>} - setInterval 참조
  // @description setInterval ID를 저장하기 위한 참조
  // @reason interval 관리 및 정리
  // @analogy 도서관에서 타이머 ID 메모

  // 서버에 저장하는 함수
  const saveToServer = () => {
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

    //====여기부터 수정됨====
    // 에러 발생 시 interval 중단
    if (error) {
      console.warn(
        'useAutoSaveServerSync - Error occurred, stopping auto-save:',
        error.message
      ); // @description 에러로 interval 중단 로그
      // @reason 반복 실패 방지
      // @analogy 도서관에서 저장 실패 시 타이머 중단
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // @description interval 정리
        // @reason 리소스 정리 및 반복 요청 중단
        // @analogy 도서관에서 타이머 끄기
        intervalRef.current = null; // @description 참조 초기화
        // @reason 참조 정리
      }
    }
    //====여기까지 수정됨====

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
  }, [draftData, error]); // @type {Array} - 의존성 배열
  // @description draftData 또는 error 변경 시 useEffect 실행
  // @reason 데이터 변경 시 동기화 및 에러 처리
  // @analogy 도서관에서 책 내용이나 실패 상태 변경 시 동작

  return { saveToServer }; // @type {Object} - 저장 함수 반환
  // @description 수동 저장 함수 반환
  // @reason 수동 저장 가능하도록 제공
  // @analogy 도서관에서 수동으로 책 저장 가능
}

// **작동 매커니즘**
// 1. `useAutoSaveMutation` 훅 호출: 자동저장 mutation 함수와 에러 상태 가져옴.
// 2. `useRef`로 interval 관리: `setInterval` ID를 저장.
// 3. `saveToServer` 함수 정의: 서버에 드래프트 데이터 저장.
// 4. `useEffect`로 주기적 저장 설정: 30초마다 `saveToServer` 실행.
// 5. 에러 발생 시 interval 중단: 반복 실패 방지.
// 6. 컴포넌트 언마운트 시 정리: 리소스 누수 방지.
// 7. `saveToServer` 반환: 수동 저장 가능.
// @reason 주기적 서버 동기화를 통해 데이터 손실 방지.
// @analogy 도서관에서 책을 정기적으로 저장하는 타이머.

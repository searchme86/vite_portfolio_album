/**
 * @file useAutoSave.ts
 * @description 드래프트 데이터를 주기적으로 자동저장하는 커스텀 훅
 * @reason 자동저장 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록을 주기적으로 자동 저장하는 시스템
 */

import { useState, useEffect } from 'react';
import type { DraftState } from '../../../../../stores/draft/initialDraftState';

// 자동저장 간격 상수
// @description 자동저장 주기 (밀리초 단위)
// @reason 사용자 수정 가능하도록 상수로 분리

const AUTO_SAVE_INTERVAL = 15000;

// 커스텀 훅 정의
// @description 드래프트 데이터를 주기적으로 자동저장
// @reason 데이터 손실 방지 및 사용자 편의 제공
// @analogy 도서관에서 대여 기록을 주기적으로 저장
const useAutoSave = (draft: DraftState) => {
  // @type {boolean} - 저장 중 여부
  // @description 저장 상태 관리
  // @reason UI에서 저장 상태 표시
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // @type {Date | null} - 마지막 저장 시간
  // @description 마지막 저장 시간 관리
  // @reason 사용자에게 마지막 저장 시간 표시
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // 드래프트 저장 함수
  // @description 드래프트 데이터를 저장하는 함수
  // @reason 실제 저장 로직 구현
  const saveDraft = async (draftData: DraftState) => {
    try {
      setIsSaving(true); // @description 저장 상태를 true로 설정
      // @reason 사용자에게 저장 중임을 알림

      console.log('useAutoSave - Saving draft:', draftData); // @description 디버깅용 로그
      // @description 저장 데이터 디버깅
      // @reason 저장 데이터 확인

      // TODO: 실제 저장 API 호출 (예: localStorage, 서버 요청)
      // @description 실제 저장 로직 (현재는 콘솔 로그로 대체)
      // @reason 저장 기능 구현 예정
      // @analogy 도서관에서 대여 기록을 저장소에 저장
      await new Promise((resolve) => setTimeout(resolve, 1000)); // @description 가짜 지연
      // @reason 저장 작업 시뮬레이션

      setLastSaved(new Date()); // @description 마지막 저장 시간 업데이트
      // @reason 사용자에게 최신 저장 시간 표시
    } catch (error) {
      console.error('useAutoSave - Save failed:', error); // @description 에러 로그
      // @description 저장 실패 디버깅
      // @reason 문제 해결 지원
    } finally {
      setIsSaving(false); // @description 저장 상태를 false로 설정
      // @reason 저장 완료 후 상태 복구
    }
  };

  useEffect(() => {
    // 드래프트 데이터 유효성 검사
    // @description 드래프트 데이터가 유효한지 확인
    // @reason 빈 데이터 저장 방지
    const isDraftValid = draft.postTitle || draft.postDesc || draft.postContent; // @type {boolean} - 드래프트 유효성
    // @description 제목, 설명, 본문 중 하나라도 있으면 유효
    // @reason 불필요한 저장 방지

    if (!isDraftValid) {
      console.log('useAutoSave - Draft is empty, skipping save'); // @description 디버깅용 로그
      // @description 빈 드래프트 스킵 디버깅
      // @reason 불필요한 저장 방지
      return;
    }

    // 자동저장 타이머 설정
    // @description 주기적으로 saveDraft 호출
    // @reason 데이터 손실 방지
    const intervalId = setInterval(() => {
      saveDraft(draft); // @description 드래프트 저장 호출
      // @reason 주기적 자동저장 실행
    }, AUTO_SAVE_INTERVAL); // @description 30초 간격으로 실행
    // @reason 설정된 주기마다 저장

    // 초기 저장
    // @description 컴포넌트 마운트 시 즉시 저장
    // @reason 초기 데이터 손실 방지
    saveDraft(draft); // @description 초기 드래프트 저장
    // @reason 컴포넌트 마운트 시 저장

    return () => {
      clearInterval(intervalId); // @description 타이머 정리
      // @reason 컴포넌트 언마운트 시 리소스 정리
      // @analogy 도서관에서 자동 저장 타이머 중지
    };
  }, [draft]); // @description draft 의존성 추가
  // @reason 드래프트 데이터 변경 시 자동저장 업데이트

  return { isSaving, lastSaved }; // @type {Object} - 저장 상태와 마지막 저장 시간 반환
  // @description 자동저장 상태 반환
  // @reason 컴포넌트에서 상태 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 자동저장 기능 사용 가능
// @analogy 도서관에서 자동 저장 시스템을 공유
export default useAutoSave;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useState`로 `isSaving`과 `lastSaved` 상태 관리: 저장 상태와 시간 추적.
// 3. `saveDraft` 함수 정의: 드래프트 데이터 저장 로직 (현재는 가짜 API 호출로 대체).
// 4. `useEffect`로 자동저장 설정:
//    - 드래프트 유효성 검사 후 저장 실행.
//    - `setInterval`로 30초마다 `saveDraft` 호출.
//    - 컴포넌트 마운트 시 초기 저장.
// 5. `console.log`로 디버깅 가능하도록 출력.
// 6. 컴포넌트 언마운트 시 타이머 정리.
// 7. `isSaving`과 `lastSaved` 반환: 컴포넌트에서 상태 사용 가능.
// @reason 자동저장 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 대여 기록을 주기적으로 저장.

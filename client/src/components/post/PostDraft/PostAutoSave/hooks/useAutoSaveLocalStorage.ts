/**
 * @file useAutoSaveLocalStorage.ts
 * @description 드래프트 데이터를 localStorage에 자동저장하는 커스텀 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveLocalStorage.ts
 */
import { useEffect, useState } from 'react';
import type { DraftState } from '../../../../../stores/draft/initialDraftState';

interface AutoSaveLocalStorageResult {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
}

// 로컬 스토리지 키 정의
const DRAFT_STORAGE_KEY = 'draft_data'; // @type {string} - 로컬 스토리지 키
// @description 로컬 스토리지에 저장할 키 이름
// @reason 고유한 키로 데이터 저장

// 커스텀 훅 정의
export function useAutoSaveLocalStorage(
  draft: DraftState // @type {DraftState} - 드래프트 데이터
): AutoSaveLocalStorageResult {
  const [isSaving, setIsSaving] = useState(false); // @type {boolean} - 저장 중 상태
  // @description 로컬 저장 진행 상태 관리
  // @reason 저장 상태를 UI에 반영

  // 드래프트 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    const saveToLocalStorage = async () => {
      try {
        setIsSaving(true); // @description 저장 시작 시 상태 업데이트
        // @reason UI에 저장 중임을 표시

        //====여기부터 수정됨====
        // 기존 데이터 삭제
        localStorage.removeItem(DRAFT_STORAGE_KEY); // @type {Function} - 로컬 스토리지에서 기존 데이터 삭제
        // @description 이전 드래프트 데이터 제거
        // @reason 최신 데이터만 유지하기 위해
        // @why 이전 데이터를 삭제하지 않으면 로컬 스토리지에 누적됨
        // @analogy 도서관에서 오래된 책을 치우고 새 책만 남김
        //====여기까지 수정됨====

        // 새로운 데이터 저장
        const serializedDraft = JSON.stringify({
          ...draft,
          updatedAt: new Date(), // @type {Date} - 업데이트 시간 갱신
          // @description 저장 시 현재 시간으로 업데이트
          // @reason 최신 상태 반영
        });
        localStorage.setItem(DRAFT_STORAGE_KEY, serializedDraft); // @type {Function} - 로컬 스토리지에 저장
        // @description 드래프트 데이터를 JSON 문자열로 변환하여 저장
        // @reason 로컬 스토리지에 데이터 지속

        console.log('useAutoSaveLocalStorage - Saved to localStorage:', draft);
        // @description 저장 완료 로그
        // @reason 디버깅
      } catch (error) {
        console.error('useAutoSaveLocalStorage - Failed to save:', error);
        // @description 저장 실패 로그
        // @reason 에러 디버깅
      } finally {
        setIsSaving(false); // @description 저장 완료 후 상태 업데이트
        // @reason UI에 저장 완료 표시
      }
    };

    saveToLocalStorage(); // @description 로컬 스토리지 저장 실행
    // @reason 드래프트 변경 시 저장
  }, [draft]); // @description draft 변경 시 실행
  // @reason 데이터 변경 감지

  return {
    isSaving, // @type {boolean} - 저장 중 여부 반환
  };
}

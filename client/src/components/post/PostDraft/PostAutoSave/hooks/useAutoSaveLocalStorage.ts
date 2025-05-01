/**
 * @file useAutoSaveLocalStorage.ts
 * @description 드래프트 데이터를 localStorage에 저장하는 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveLocalStorage.ts
 */
import { useEffect, useState } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 주기적 저장 실행 및 저장 상태 관리

import { v4 as uuidv4 } from 'uuid'; // @type {Function} - UUID 생성 함수
// @description 고유 ID 생성
// @reason draftId가 없을 경우 고유 ID 생성

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지

const AUTO_SAVE_INTERVAL = 10000; // @type {number} - localStorage 저장 주기 (10초로 변경)
// @description localStorage 저장 주기 설정
// @reason 주기적 저장으로 데이터 손실 방지, 10초로 늘려 빈도 감소

export function useAutoSaveLocalStorage(draft: DraftState) {
  const [isSaving, setIsSaving] = useState<boolean>(false); // @type {boolean} - 저장 중 여부
  // @description localStorage 저장 중 여부 관리
  // @reason 저장 상태 확인 및 UI 업데이트

  // localStorage에 저장하는 함수
  const saveToLocalStorage = (draftData: DraftState) => {
    try {
      setIsSaving(true); // @description 저장 상태 활성화
      // @reason 저장 중임을 표시

      // draftId가 없으면 고유 ID 생성
      const safeDraftId = draftData.draftId || uuidv4(); // @type {string} - 고유 드래프트 ID
      // @description draftId가 없으면 UUID로 생성
      // @reason localStorage 저장 시 고유 ID 보장

      const draftKey = `draft_${safeDraftId}`; // @type {string} - localStorage 키
      // @description 드래프트 데이터 저장 키 생성
      // @reason 고유한 키로 데이터 저장

      // 이전 데이터와 비교
      const previousDraft = localStorage.getItem(draftKey); // @type {string | null} - 이전 데이터
      const currentDraft = JSON.stringify({
        postTitle: draftData.postTitle || '',
        postDesc: draftData.postDesc || '',
        postContent: draftData.postContent || '',
        tags: draftData.tags || [],
        imageUrls: draftData.imageUrls || [],
        custom: draftData.custom || {},
        draftId: safeDraftId,
        createdAt: draftData.createdAt
          ? draftData.createdAt instanceof Date
            ? draftData.createdAt.toISOString()
            : new Date(draftData.createdAt).toISOString()
          : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isTemporary: draftData.isTemporary || false,
      }); // @type {string} - 현재 데이터 직렬화

      if (previousDraft === currentDraft) {
        if (isDebugMode) {
          console.log('useAutoSaveLocalStorage - No changes, skipping save');
        }
        setIsSaving(false);
        return; // @description 변경 없으면 저장 건너뛰기
      }

      // createdAt을 Date 객체로 변환하거나 기본값 제공
      const createdAtValue = draftData.createdAt
        ? draftData.createdAt instanceof Date
          ? draftData.createdAt.toISOString()
          : new Date(draftData.createdAt).toISOString()
        : new Date().toISOString(); // @type {string} - 생성 시간
      // @description createdAt을 Date 객체로 변환하거나 기본값 설정
      // @reason toISOString 호출 전 Date 객체 보장

      const draftToSave = {
        postTitle: draftData.postTitle || '', // @type {string} - 제목
        postDesc: draftData.postDesc || '', // @type {string} - 설명
        postContent: draftData.postContent || '', // @type {string} - 본문
        tags: draftData.tags || [], // @type {string[]} - 태그
        imageUrls: draftData.imageUrls || [], // @type {string[]} - 이미지 URL
        custom: draftData.custom || {}, // @type {Record<string, any>} - 커스텀 데이터
        draftId: safeDraftId, // @type {string} - 드래프트 ID
        createdAt: createdAtValue, // @type {string} - 생성 시간
        updatedAt: new Date().toISOString(), // @type {string} - 수정 시간
        isTemporary: draftData.isTemporary || false, // @type {boolean} - 임시저장 여부
      }; // @type {Object} - 저장할 드래프트 데이터
      // @description localStorage에 저장할 데이터 준비
      // @reason 데이터 직렬화 준비

      localStorage.setItem(draftKey, JSON.stringify(draftToSave)); // @description localStorage에 저장
      // @reason 데이터 지속성 보장

      if (isDebugMode) {
        console.log(
          'useAutoSaveLocalStorage - Saved to localStorage:',
          draftKey
        );
      }
    } catch (error) {
      console.error(
        'useAutoSaveLocalStorage - Failed to save to localStorage:',
        error
      ); // @description 저장 실패 로그
      // @reason 디버깅 및 오류 추적
      // Fallback: 저장 실패 시 로그만 남김
    } finally {
      setIsSaving(false); // @description 저장 상태 비활성화
      // @reason 저장 완료 표시
    }
  };

  useEffect(() => {
    if (!draft) {
      if (isDebugMode) {
        console.warn('useAutoSaveLocalStorage - No draft data provided');
      }
      return; // @description 드래프트 데이터 없으면 실행 중지
    }

    const isDraftValid = draft.postTitle || draft.postDesc || draft.postContent;
    if (!isDraftValid) {
      if (isDebugMode) {
        console.log('useAutoSaveLocalStorage - Draft is empty, skipping save');
      }
      return; // @description 드래프트 데이터가 비어 있으면 저장 건너뛰기
    }

    saveToLocalStorage(draft); // @description 최초 localStorage 저장
    // @reason 초기 데이터 보존

    const localStorageInterval = setInterval(() => {
      saveToLocalStorage(draft); // @description 10초 간격으로 localStorage 저장
      // @reason 데이터 손실 방지
    }, AUTO_SAVE_INTERVAL);

    return () => {
      clearInterval(localStorageInterval); // @description 인터벌 정리
      // @reason 컴포넌트 언마운트 시 리소스 정리
      if (isDebugMode) {
        console.log('useAutoSaveLocalStorage - Cleanup completed');
      }
    };
  }, [
    draft.postTitle,
    draft.postDesc,
    draft.postContent,
    draft.tags,
    draft.imageUrls,
    draft.custom,
    draft.draftId,
    draft.createdAt,
    draft.updatedAt,
    draft.isTemporary,
  ]); // @description 드래프트 데이터 속성별 의존
  // @reason 변경 감지

  return { isSaving }; // @description 저장 상태 반환
  // @reason 상위 훅에서 사용
}

// **작동 매커니즘**
// 1. `useState`로 isSaving 상태 관리.
// 2. `saveToLocalStorage` 함수 정의: localStorage에 데이터 저장.
// 3. 이전 데이터와 비교하여 변경 없으면 저장 건너뛰기.
// 4. `useEffect`로 주기적 저장 설정: 10초마다 저장.
// 5. 컴포넌트 언마운트 시 인터벌 정리.
// 6. `isSaving` 반환.

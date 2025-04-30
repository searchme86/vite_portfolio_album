/**
 * @file useAutoSaveLocalStorage.ts
 * @description 드래프트 데이터를 localStorage에 저장하는 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveLocalStorage.ts
 */
import { useEffect, useState } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 주기적 저장 실행 및 저장 상태 관리

import type { DraftState } from '../../../../../stores/draft/initialDraftState'; // @type {Object} - 드래프트 상태 타입
// @description 드래프트 상태 타입 가져오기
// @reason 타입 안정성 보장

const AUTO_SAVE_INTERVAL = 5000; // @type {number} - localStorage 저장 주기 (5초)
// @description localStorage 저장 주기 설정
// @reason 주기적 저장으로 데이터 손실 방지

export function useAutoSaveLocalStorage(draft: DraftState) {
  const [isSaving, setIsSaving] = useState<boolean>(false); // @type {boolean} - 저장 중 여부
  // @description localStorage 저장 중 여부 관리
  // @reason 저장 상태 확인 및 UI 업데이트

  // localStorage에 저장하는 함수
  const saveToLocalStorage = (draftData: DraftState) => {
    try {
      setIsSaving(true); // 저장 상태 활성화
      // @description 저장 시작 시 상태 업데이트
      // @reason 저장 중임을 표시
      const draftKey = `draft_${draftData.draftId || 'default'}`; // @type {string} - localStorage 키
      // @description 드래프트 데이터 저장 키 생성
      // @reason 고유한 키로 데이터 저장

      // createdAt을 Date 객체로 변환하거나 기본값 제공
      const createdAtValue = draftData.createdAt
        ? draftData.createdAt instanceof Date
          ? draftData.createdAt.toISOString() // Date 객체이면 toISOString 호출
          : new Date(draftData.createdAt).toISOString() // string이면 Date로 변환
        : new Date().toISOString(); // 없으면 현재 시간
      // @description createdAt을 Date 객체로 변환하거나 기본값 설정
      // @reason toISOString 호출 전 Date 객체 보장

      const draftToSave = {
        postTitle: draftData.postTitle || '', // @type {string} - 제목
        postDesc: draftData.postDesc || '', // @type {string} - 설명
        postContent: draftData.postContent || '', // @type {string} - 본문
        tags: draftData.tags || [], // @type {string[]} - 태그
        imageUrls: draftData.imageUrls || [], // @type {string[]} - 이미지 URL
        custom: draftData.custom || {}, // @type {Record<string, any>} - 커스텀 데이터
        draftId: draftData.draftId || '', // @type {string} - 드래프트 ID
        createdAt: createdAtValue, // @type {string} - 생성 시간
        updatedAt: new Date().toISOString(), // @type {string} - 수정 시간
        isTemporary: draftData.isTemporary || false, // @type {boolean} - 임시저장 여부
      }; // @type {Object} - 저장할 드래프트 데이터
      // @description localStorage에 저장할 데이터 준비
      // @reason 데이터 직렬화 준비
      localStorage.setItem(draftKey, JSON.stringify(draftToSave)); // localStorage에 저장
      // @description localStorage에 데이터 저장
      // @reason 데이터 지속성 보장
      console.log('useAutoSaveLocalStorage - Saved to localStorage:', draftKey);
      // @description 저장 성공 로그
      // @reason 저장 확인
    } catch (error) {
      console.error(
        'useAutoSaveLocalStorage - Failed to save to localStorage:',
        error
      );
      // @description 저장 실패 로그
      // @reason 디버깅 및 오류 추적
      // Fallback: 저장 실패 시 로그만 남김
    } finally {
      setIsSaving(false); // 저장 상태 비활성화
      // @description 저장 완료 후 상태 업데이트
      // @reason 저장 완료 표시
    }
  };

  useEffect(() => {
    if (!draft) {
      console.warn('useAutoSaveLocalStorage - No draft data provided');
      // @description 드래프트 데이터 없음 경고
      // @reason 데이터 유효성 확인
      return; // 드래프트 데이터 없으면 실행 중지
    }

    const isDraftValid = draft.postTitle || draft.postDesc || draft.postContent;
    if (!isDraftValid) {
      console.log('useAutoSaveLocalStorage - Draft is empty, skipping save');
      // @description 드래프트 데이터 비어 있음 로그
      // @reason 불필요한 저장 방지
      return; // 드래프트 데이터가 비어 있으면 저장 건너뛰기
    }

    saveToLocalStorage(draft); // 최초 localStorage 저장
    // @description 초기 저장 실행
    // @reason 초기 데이터 보존

    const localStorageInterval = setInterval(() => {
      saveToLocalStorage(draft); // 주기적으로 localStorage에 저장
      // @description 5초 간격으로 localStorage 저장
      // @reason 데이터 손실 방지
    }, AUTO_SAVE_INTERVAL);

    return () => {
      clearInterval(localStorageInterval); // 인터벌 정리
      // @description 인터벌 정리
      // @reason 컴포넌트 언마운트 시 리소스 정리
      console.log('useAutoSaveLocalStorage - Cleanup completed');
      // @description 정리 완료 로그
      // @reason 정리 확인
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

  return { isSaving }; // 저장 상태 반환
  // @description localStorage 저장 상태 반환
  // @reason 상위 훅에서 사용
}

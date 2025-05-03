/**
 * @file useAutoSaveServerSync.ts
 * @description 드래프트 데이터를 서버에 자동저장하는 커스텀 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveServerSync.ts
 */
import { useEffect, useRef, useState } from 'react';
import useAutoSaveMutation from '../../../../../api/draft/mutations/useAutoSaveMutation';
import type { DraftState } from '../../../../../stores/draft/initialDraftState';

interface AutoSaveServerSyncResult {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장a 시간
}

// 커스텀 훅 정의
export default function useAutoSaveServerSync(
  draftData: DraftState, // @type {DraftState} - 드래프트 데이터
  isOnline: boolean, // @type {boolean} - 네트워크 상태
  isSignedIn: boolean | undefined, // @type {boolean | undefined} - 로그인 상태
  getToken: () => Promise<string | null> // @type {Function} - 토큰 가져오기 함수
): AutoSaveServerSyncResult {
  const { autoSave, isPending, error, data } = useAutoSaveMutation(); // @type {Object} - 뮤테이션 상태
  // @description TanStack Query 뮤테이션 훅 호출
  // @reason 서버 요청 관리
  // @analogy 도서관에서 서버 저장 도구 가져오기

  const [lastSaved, setLastSaved] = useState<Date | null>(new Date()); // @type {Date | null} - 마지막 저장 시간
  // @description 마지막 저장 시간 상태 초기화 (null이 아닌 기본값)
  // @reason lastSaved가 null로 유지되지 않도록 보장
  // @analogy 도서관에서 처음 저장 시간을 현재 시간으로 설정
  // <----여기문제있었음: 초기값이 null로 설정되어 lastSaved가 null로 남음

  const intervalRef = useRef<NodeJS.Timeout | null>(null); // @type {NodeJS.Timeout | null} - 인터벌 참조
  // @description 주기적 저장을 위한 인터벌 참조
  // @reason 주기적 저장 관리
  // @analogy 도서관에서 주기적 저장 타이머

  // 서버 저장 함수
  const saveToServer = async () => {
    // 네트워크 상태 확인
    if (!isOnline) {
      console.log('useAutoSaveServerSync - Offline, skipping server save');
      // @description 오프라인 상태 로그
      // @reason 서버 저장 스킵
      return;
    }

    // 로그인 상태 확인
    if (isSignedIn !== true) {
      console.log(
        'useAutoSaveServerSync - Not signed in, skipping server save'
      );
      // @description 로그인 안됨 로그
      // @reason 서버 저장 스킵
      return;
    }

    // 토큰 확인
    const token = await getToken();
    if (!token) {
      console.log('useAutoSaveServerSync - No token, skipping server save');
      // @description 토큰 없음 로그
      // @reason 서버 저장 스킵
      return;
    }

    // 필수 필드 유효성 검사
    if (
      !draftData.postTitle ||
      !draftData.postContent ||
      !draftData.tags ||
      !draftData.imageUrls
    ) {
      console.log(
        'useAutoSaveServerSync - Missing required fields, skipping server save:',
        draftData
      );
      // @description 필수 필드 누락 로그
      // @reason 요청 실패 방지
      return;
    }

    // 서버 저장 시도
    console.log(
      'useAutoSaveServerSync - Attempting to save draft to server:',
      draftData
    );
    // @description 서버 저장 시도 로그
    // @reason 요청 데이터 확인
    autoSave(draftData); // @description 뮤테이션 호출
    // @reason 서버에 드래프트 데이터 저장
  };

  // 뮤테이션 결과 처리
  useEffect(() => {
    if (data?.success) {
      const now = new Date();
      setLastSaved(now);
      console.log('useAutoSaveServerSync - Last saved updated:', now);
      // @description 성공 시 마지막 저장 시간 업데이트
      // @reason 사용자에게 최신 저장 시간 표시
    } else if (!data && !error) {
      // 데이터도 없고 에러도 없으면 기본값 설정
      setLastSaved(new Date());
      console.log('useAutoSaveServerSync - No data, setting default lastSaved');
      // @description 기본값 설정 로그
      // @reason lastSaved가 null이 되지 않도록 보장
    } else if (error) {
      console.log('useAutoSaveServerSync - Save failed:', error.message);
      setLastSaved(new Date()); // 에러 발생 시에도 기본값 설정
      // @description 에러 발생 시 기본값 설정
      // @reason lastSaved가 null이 되지 않도록 보장
    }
  }, [data, error]);

  // 주기적 저장 설정
  useEffect(() => {
    console.log('useAutoSaveServerSync - Setting up auto-save interval');
    // @description 인터벌 설정 로그
    // @reason 주기적 저장 시작

    intervalRef.current = setInterval(async () => {
      await saveToServer();
    }, 30000); // 30초마다 저장

    if (error) {
      console.log(
        'useAutoSaveServerSync - Error occurred, but continuing auto-save:',
        error.message
      );
      // @description 에러 발생 시 로그
      // @reason 에러에도 불구하고 저장 지속
    }

    // cleanup
    return () => {
      if (intervalRef.current) {
        console.log('useAutoSaveServerSync - Cleaning up auto-save interval');
        clearInterval(intervalRef.current);
        // @description 인터벌 정리 로그
        // @reason 메모리 누수 방지
      }
    };
  }, [draftData, error, isOnline, isSignedIn]);

  return {
    isSaving: isPending, // @type {boolean} - 저장 진행 상태
    lastSaved, // @type {Date | null} - 마지막 저장 시간
  };
}

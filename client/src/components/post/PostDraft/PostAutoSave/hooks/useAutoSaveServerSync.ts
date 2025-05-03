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
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간
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

  const [isSavingLocal, setIsSavingLocal] = useState(false); // @type {boolean} - 로컬 저장 상태
  // @description 로컬에서 관리하는 isSaving 상태
  // @reason 에러 발생 시도 애니메이션 유지
  // @analogy 도서관에서 저장 중 표시 유지

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
      setIsSavingLocal(false);
      return;
    }

    // 로그인 상태 확인
    if (isSignedIn !== true) {
      console.log(
        'useAutoSaveServerSync - Not signed in, skipping server save'
      );
      // @description 로그인 안됨 로그
      // @reason 서버 저장 스킵
      setIsSavingLocal(false);
      return;
    }

    // 토큰 확인
    const token = await getToken();
    if (!token) {
      console.log('useAutoSaveServerSync - No token, skipping server save');
      // @description 토큰 없음 로그
      // @reason 서버 저장 스킵
      setIsSavingLocal(false);
      return;
    }

    // 필수 필드 유효성 검사 (완화된 조건)
    //====여기부터 수정됨====
    const isPostContentEmpty =
      draftData.postContent.trim() === '' ||
      draftData.postContent === '<p><br></p>';
    if (
      !draftData.postTitle ||
      draftData.postTitle.trim() === '' ||
      !draftData.postContent ||
      isPostContentEmpty
    ) {
      console.log(
        'useAutoSaveServerSync - Missing required fields (title or content), skipping server save:',
        draftData
      );
      // @description 필수 필드 누락 로그 (title과 content만 확인)
      // @reason 요청 실패 방지
      // @why tags와 imageUrls는 백엔드에서 필수로 요구하지 않음
      // @analogy 도서관에서 책 제목과 내용만 확인
      setIsSavingLocal(false);
      return;
    }
    //====여기까지 수정됨====

    // 서버 저장 시도
    setIsSavingLocal(true); // 저장 시작
    console.log(
      'useAutoSaveServerSync - Attempting to save draft to server:',
      draftData
    );
    // @description 서버 저장 시도 로그
    // @reason 요청 데이터 확인
    await autoSave(draftData); // @description 뮤테이션 호출
    // @reason 서버에 드래프트 데이터 저장
  };

  // 뮤테이션 결과 처리
  useEffect(() => {
    if (data?.success) {
      const now = new Date();
      setLastSaved(now);
      setIsSavingLocal(false);
      console.log('useAutoSaveServerSync - Last saved updated:', now);
      // @description 성공 시 마지막 저장 시간 업데이트
      // @reason 사용자에게 최신 저장 시간 표시
    } else if (error) {
      console.log('useAutoSaveServerSync - Save failed:', error.message);
      setLastSaved(new Date()); // 에러 발생 시에도 기본값 설정
      setIsSavingLocal(false); // 에러 후 저장 중지
      // @description 에러 발생 시 기본값 설정
      // @reason lastSaved가 null이 되지 않도록 보장
    } else if (!data && !error) {
      // 데이터도 없고 에러도 없으면 기본값 유지
      console.log('useAutoSaveServerSync - No data, keeping default lastSaved');
      // @description 기본값 유지 로그
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
    isSaving: isSavingLocal || isPending, // @type {boolean} - 저장 진행 상태
    // @description 로컬 상태 또는 뮤테이션 대기 상태로 isSaving 결정
    // @reason 에러 발생 시도 애니메이션 유지
    lastSaved, // @type {Date | null} - 마지막 저장 시간
  };
}

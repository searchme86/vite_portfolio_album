/**
 * @file usePostWriteDraftSync.ts
 * @description 폼 데이터와 Zustand 스토어를 동기화하는 커스텀 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteDraftSync.ts
 */
import { useEffect, useCallback } from 'react'; // @type {Function} - React 훅
// @description useEffect와 useCallback 훅을 가져옴
// @reason useEffect로 데이터 동기화, useCallback으로 함수 참조 안정화
// @analogy 도서관에서 책 정보가 바뀔 때마다 기록부를 업데이트하는 직원

import { UseFormReturn } from 'react-hook-form'; // @type {Type} - React Hook Form의 폼 메서드 타입
// @description 폼 상태 및 메서드의 타입 정의
// @reason 타입 안전성을 보장하기 위해 사용
// @analogy 도서관에서 책 정보를 기록할 때 필요한 양식의 형식

import useDraftStore from '../../../../stores/draft/draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 데이터를 관리하는 Zustand 스토어에 접근
// @reason 중앙에서 드래프트 데이터를 관리하고 업데이트하기 위해 사용
// @analogy 도서관의 중앙 기록 시스템에 접근

// 폼 데이터의 타입 정의
interface PostWriteFormData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그 배열
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
}

// 드래프트 데이터의 타입 정의
interface DraftData {
  postTitle: string; // @type {string} - 드래프트 제목
  postDesc: string; // @type {string} - 드래프트 설명
  postContent: string; // @type {string} - 드래프트 본문
  tags: string[]; // @type {string[]} - 드래프트 태그 배열
  imageUrls: string[]; // @type {string[]} - 드래프트 이미지 URL 배열
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date | undefined; // @type {Date | undefined} - 생성 시간
  updatedAt: Date | undefined; // @type {Date | undefined} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 커스텀 훅 정의
export function usePostWriteDraftSync(
  form: UseFormReturn<PostWriteFormData>, // @type {UseFormReturn} - 폼 메서드
  // @description React Hook Form에서 제공하는 폼 상태 및 메서드
  // @reason 폼 데이터를 실시간으로 감지하고 동기화하기 위해 사용
  draftData: DraftData // @type {DraftData} - 드래프트 데이터
  // @description 초기 드래프트 데이터
  // @reason 기존 드래프트 데이터를 기반으로 업데이트를 시작하기 위해 사용
) {
  // Zustand 스토어에서 메서드 가져오기
  const { updateDraft, resetDraft } = useDraftStore(); // @type {Object} - Zustand 스토어 객체에서 메서드 추출
  // @description useDraftStore를 호출하여 스토어 객체를 가져오고, 그 안에서 updateDraft와 resetDraft 메서드를 추출
  // @reason 스토어 객체에서 직접 메서드에 접근

  const { watch } = form; // @type {Function} - 폼 감시 메서드
  // @description React Hook Form의 watch 메서드를 사용하여 폼 데이터를 실시간으로 감지
  // @reason 사용자 입력을 실시간으로 추적하기 위해 사용

  // 실시간 폼 데이터 감지 - 개별 필드 감지로 참조 안정화
  const postTitle = watch('postTitle') || ''; // @type {string} - 포스트 제목 감지
  const postDesc = watch('postDesc') || ''; // @type {string} - 포스트 설명 감지
  const postContent = watch('postContent') || ''; // @type {string} - 포스트 본문 감지
  const tags = watch('tags') || []; // @type {string[]} - 포스트 태그 감지
  const imageUrls = watch('imageUrls') || []; // @type {string[]} - 이미지 URL 감지

  // 디버깅 로그 추가: watch로 감지된 데이터 확인
  console.log('usePostWriteDraftSync - Watched formData:', {
    postTitle,
    postDesc,
    postContent,
    tags,
    imageUrls,
  });
  // @description 현재 감지된 폼 데이터를 콘솔에 출력
  // @reason 데이터가 제대로 감지되는지 확인하기 위해 사용

  // 드래프트 업데이트 함수
  const updateDraftNow = useCallback(
    (draft: Partial<DraftData>) => {
      // 현재 스토어 상태 가져오기
      const currentState = useDraftStore.getState();
      // @description Zustand 스토어의 현재 상태 가져오기
      // @reason 변경 여부 확인

      // 디버깅 로그: draft와 currentState 확인
      console.log('updateDraftNow - draft.createdAt:', draft.createdAt);
      console.log(
        'updateDraftNow - currentState.createdAt:',
        currentState.createdAt
      );
      // @description draft와 currentState의 createdAt 값 출력
      // @reason 타입 확인 및 디버깅

      // 변경 여부 확인 (타입 안전성 보장)
      const hasChanges =
        (draft.postTitle !== undefined &&
          draft.postTitle !== currentState.postTitle) ||
        (draft.postDesc !== undefined &&
          draft.postDesc !== currentState.postDesc) ||
        (draft.postContent !== undefined &&
          draft.postContent !== currentState.postContent) ||
        (draft.tags !== undefined &&
          JSON.stringify(draft.tags) !== JSON.stringify(currentState.tags)) ||
        (draft.imageUrls !== undefined &&
          JSON.stringify(draft.imageUrls) !==
            JSON.stringify(currentState.imageUrls)) ||
        (draft.draftId !== undefined &&
          draft.draftId !== currentState.draftId) ||
        (draft.isTemporary !== undefined &&
          draft.isTemporary !== currentState.isTemporary) ||
        (draft.createdAt !== undefined &&
          draft.createdAt instanceof Date &&
          currentState.createdAt instanceof Date &&
          draft.createdAt.getTime() !== currentState.createdAt.getTime()) ||
        (draft.updatedAt !== undefined &&
          draft.updatedAt instanceof Date &&
          currentState.updatedAt instanceof Date &&
          draft.updatedAt.getTime() !== currentState.updatedAt.getTime());
      // @description 상태 변경 여부 확인
      // @reason 불필요한 업데이트 방지로 무한 루프 방지
      // @why instanceof Date로 타입 확인 후 getTime() 호출

      if (!hasChanges) {
        console.log(
          'usePostWriteDraftSync - No changes detected, skipping update'
        );
        return; // 변경 없으면 업데이트 중단
      }

      updateDraft(draft); // @description 즉시 updateDraft 호출
      // @reason Zustand 스토어 상태를 즉시 업데이트
      console.log(
        'usePostWriteDraftSync - Draft updated with form data and image URLs'
      );
      // @description 드래프트 업데이트 완료 로그
    },
    [updateDraft] // @description 의존성 배열: updateDraft 변경 시 새로운 함수 생성
  );
  // @description 즉시 업데이트 함수 생성
  // @reason 불필요한 업데이트 방지

  // 폼 데이터와 이미지 URL 동기화
  useEffect(() => {
    const draftUpdate = {
      postTitle: postTitle || draftData.postTitle || '', // @type {string} - 폼에서 가져온 제목
      postDesc: postDesc || draftData.postDesc || '', // @type {string} - 폼에서 가져온 설명
      postContent: postContent || draftData.postContent || '', // @type {string} - 폼에서 가져온 본문
      tags: tags || draftData.tags || [], // @type {string[]} - 폼에서 가져온 태그
      imageUrls: imageUrls || draftData.imageUrls || [], // @type {string[]} - 폼에서 가져온 이미지 URL
      draftId: draftData.draftId || '', // @type {string} - 드래프트 ID
      createdAt: draftData.createdAt || new Date(), // @type {Date} - 생성 시간
      updatedAt: new Date(), // @type {Date} - 수정 시간
      isTemporary: draftData.isTemporary || false, // @type {boolean} - 임시저장 여부
    };

    updateDraftNow(draftUpdate); // @description 즉시 드래프트 업데이트
    // @reason 실시간 반영

    // 디버깅 로그: 이미지 URL 업데이트 확인
    console.log(
      'usePostWriteDraftSync - Image URLs updated in draft:',
      imageUrls
    );
    // @description 이미지 URL이 드래프트에 반영되었는지 콘솔에 출력
    // @reason 이미지 데이터 동기화가 제대로 이루어졌는지 확인
  }, [
    postTitle,
    postDesc,
    postContent,
    tags,
    imageUrls,
    draftData.postTitle,
    draftData.postDesc,
    draftData.postContent,
    draftData.tags,
    draftData.imageUrls,
    draftData.draftId,
    draftData.createdAt,
    draftData.isTemporary,
    updateDraftNow,
  ]);
  // @description 의존성 배열: 개별 필드와 draftData의 필드 포함
  // @reason 참조 변경으로 인한 무한 루프 방지

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      resetDraft(); // @description 드래프트 데이터를 초기화
      // @reason 컴포넌트가 언마운트될 때 드래프트 데이터를 초기 상태로 되돌림
      console.log('usePostWriteDraftSync - Cleanup completed');
      // @description 정리 작업이 완료되었음을 콘솔에 출력
    };
  }, [resetDraft]);
  // @description 의존성 배열: resetDraft 메서드만 포함
  // @reason 컴포넌트 언마운트 시 정리 로직 실행
}

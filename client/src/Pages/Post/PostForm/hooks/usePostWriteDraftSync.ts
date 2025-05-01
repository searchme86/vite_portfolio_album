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

import debounce from 'lodash/debounce'; // @type {Function} - 디바운싱 함수
// @description 상태 업데이트를 지연시켜 빈번한 호출 방지
// @reason 무한 업데이트 루프 방지
// @analogy 도서관에서 사서가 너무 자주 기록부를 업데이트하지 않도록 일정 시간 기다림

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지

// 폼 데이터의 타입 정의
interface PostWriteFormData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그 배열
}

// 드래프트 데이터의 타입 정의
interface DraftData {
  postTitle: string; // @type {string} - 드래프트 제목
  postDesc: string; // @type {string} - 드래프트 설명
  postContent: string; // @type {string} - 드래프트 본문
  tags: string[]; // @type {string[]} - 드래프트 태그 배열
  imageUrls: string[]; // @type {string[]} - 드래프트 이미지 URL 배열
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date; // @type {Date} - 생성 시간
  updatedAt: Date; // @type {Date} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 커스텀 훅 정의
export function usePostWriteDraftSync(
  form: UseFormReturn<PostWriteFormData>, // @type {UseFormReturn} - 폼 메서드
  imageUrls: string[], // @type {string[]} - 이미지 URL 배열
  draftData: DraftData // @type {DraftData} - 드래프트 데이터
) {
  const { updateDraft, resetDraft } = useDraftStore(); // @type {Object} - Zustand 스토어 메서드
  const { watch } = form; // @type {Function} - 폼 감시 메서드

  // 실시간 폼 데이터 감지 - 개별 필드 감지로 참조 안정화
  const postTitle = watch('postTitle') || ''; // @type {string} - 포스트 제목 감지
  const postDesc = watch('postDesc') || ''; // @type {string} - 포스트 설명 감지
  const postContent = watch('postContent') || ''; // @type {string} - 포스트 본문 감지
  const tags = watch('tags') || []; // @type {string[]} - 포스트 태그 감지

  // 디버깅 로그 추가: watch로 감지된 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('usePostWriteDraftSync - Watched formData:', {
      postTitle,
      postDesc,
      postContent,
      tags,
    });
  }

  // 드래프트 업데이트 함수 디바운싱 (시간 2000ms로 조정)
  const debouncedUpdateDraft = useCallback(
    debounce((draft: Partial<DraftData>) => {
      // 이전 드래프트와 비교하여 변경 여부 확인
      const currentDraft = useDraftStore.getState(); // @type {DraftData} - 현재 Zustand 상태
      const hasChanges =
        draft.postTitle !== currentDraft.postTitle ||
        draft.postDesc !== currentDraft.postDesc ||
        draft.postContent !== currentDraft.postContent ||
        JSON.stringify(draft.tags) !== JSON.stringify(currentDraft.tags) ||
        JSON.stringify(draft.imageUrls) !==
          JSON.stringify(currentDraft.imageUrls);
      // @description 변경 여부 확인
      // @reason 불필요한 업데이트 방지

      if (!hasChanges) {
        if (isDebugMode) {
          console.log(
            'usePostWriteDraftSync - No changes detected, skipping update'
          );
        }
        return; // @description 변경 없으면 업데이트 중단
      }

      updateDraft(draft); // @description Zustand 스토어 상태 업데이트
      if (isDebugMode) {
        console.log(
          'usePostWriteDraftSync - Draft updated with form data and image URLs'
        );
      }
    }, 2000), // @description 2000ms(2초)로 디바운싱 시간 조정
    [updateDraft]
  );

  // 폼 데이터와 이미지 URL 동기화
  useEffect(() => {
    const draftUpdate = {
      postTitle: postTitle || draftData.postTitle || '',
      postDesc: postDesc || draftData.postDesc || '',
      postContent: postContent || draftData.postContent || '',
      tags: tags || draftData.tags || [],
      imageUrls: imageUrls || draftData.imageUrls || [],
      draftId: draftData.draftId || '',
      createdAt: draftData.createdAt || new Date(),
      updatedAt: new Date(),
      isTemporary: draftData.isTemporary || false,
    };

    debouncedUpdateDraft(draftUpdate); // @description 디바운싱된 함수로 드래프트 업데이트

    if (isDebugMode) {
      console.log(
        'usePostWriteDraftSync - Image URLs updated in draft:',
        imageUrls
      );
    }

    return () => {
      debouncedUpdateDraft.cancel(); // @description 디바운싱 취소
    };
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
  ]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      resetDraft(); // @description 드래프트 데이터 초기화
      if (isDebugMode) {
        console.log('usePostWriteDraftSync - Cleanup completed');
      }
    };
  }, [resetDraft]);
}

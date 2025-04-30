/**
 * @file usePostWriteDraftSync.ts
 * @description 드래프트 데이터와 폼 값을 동기화하는 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteDraftSync.ts
 */
import { useEffect } from 'react'; // @type {Function} - React 훅
// @description 이펙트 관리
// @reason 폼 값 변경 감지

import { debounce } from 'lodash'; // @type {Function} - 디바운싱 유틸리티
// @description 입력값 변경 시 디바운싱 적용
// @reason 과도한 업데이트 방지

import { UseFormReturn } from 'react-hook-form'; // @type {Object} - React Hook Form 타입
// @description 폼 상태 타입
// @reason 타입 안정성 보장

import type { PostWriteFormData } from './usePostWriteState'; // @type {Object} - 폼 데이터 타입
// @description 폼 데이터 타입 정의
// @reason 타입 안정성 보장

import useDraftStore from '../../../../stores/draft/draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 스토어 접근
// @reason 상태 업데이트

export function usePostWriteDraftSync(
  form: UseFormReturn<PostWriteFormData>,
  imageUrls: string[],
  draftData: {
    postTitle: string;
    postDesc: string;
    postContent: string;
    tags: string[];
    imageUrls: string[];
    custom: Record<string, any>;
    draftId: string;
    createdAt: Date;
    isTemporary: boolean;
  }
) {
  const updateDraft = useDraftStore.use.updateDraft(); // 드래프트 업데이트 함수
  // @description Zustand 스토어의 드래프트 업데이트 함수
  // @reason 상태 업데이트

  const { watch } = form; // 폼 감시 메서드
  // @description 폼 값 변경 감지
  // @reason 드래프트 동기화

  // 폼 값 변경 감지 및 Zustand 스토어 업데이트
  useEffect(() => {
    const updateDraftDebounced = debounce((formValues: PostWriteFormData) => {
      console.log('usePostWriteDraftSync - Form values changed:', formValues);
      // @description 폼 값 변경 로그
      // @reason 변경 확인
      updateDraft({
        postTitle: formValues.postTitle || '', // 제목 업데이트
        postDesc: formValues.postDesc || '', // 설명 업데이트
        postContent: formValues.postContent || '', // 본문 업데이트
        tags: formValues.tags || [], // 태그 업데이트
        imageUrls: imageUrls, // 이미지 URL 동기화
        custom: draftData.custom, // 커스텀 데이터 유지
        draftId: draftData.draftId, // 드래프트 ID 유지
        createdAt: draftData.createdAt, // 생성 시간 유지
        updatedAt: new Date(), // 수정 시간 업데이트
        isTemporary: draftData.isTemporary, // 임시저장 여부 유지
      }); // @description 드래프트 데이터 업데이트
      // @reason Zustand 스토어 동기화
      console.log('usePostWriteDraftSync - Draft updated with form values');
      // @description 드래프트 업데이트 로그
      // @reason 업데이트 확인
    }, 500); // 500ms 지연

    const subscription = watch((value) => {
      updateDraftDebounced(value); // 폼 값 변경 시 디바운싱 후 업데이트
      // @description 폼 값 변경 시 디바운싱 실행
      // @reason 과도한 업데이트 방지
    });

    return () => {
      subscription.unsubscribe(); // 구독 해제
      // @description watch 구독 해제
      // @reason 리소스 정리
      updateDraftDebounced.cancel(); // 디바운싱 취소
      // @description 디바운싱 예약 취소
      // @reason 리소스 정리
      console.log('usePostWriteDraftSync - Cleanup completed');
      // @description 정리 완료 로그
      // @reason 정리 확인
    };
  }, [watch, updateDraft, imageUrls, draftData]); // @description 필요한 값만 의존
  // @reason 무한 렌더링 방지

  // imageUrls 변경 시 Zustand 스토어 업데이트
  useEffect(() => {
    console.log(
      'usePostWriteDraftSync - Image URLs updated in draft:',
      imageUrls
    );
    // @description 이미지 URL 변경 로그
    // @reason 변경 확인
    updateDraft({
      postTitle: draftData.postTitle, // 제목 유지
      postDesc: draftData.postDesc, // 설명 유지
      postContent: draftData.postContent, // 본문 유지
      tags: draftData.tags, // 태그 유지
      imageUrls: imageUrls, // 이미지 URL 업데이트
      custom: draftData.custom, // 커스텀 데이터 유지
      draftId: draftData.draftId, // 드래프트 ID 유지
      createdAt: draftData.createdAt, // 생성 시간 유지
      updatedAt: new Date(), // 수정 시간 업데이트
      isTemporary: draftData.isTemporary, // 임시저장 여부 유지
    }); // @description 드래프트 데이터 업데이트
    // @reason Zustand 스토어 동기화
    console.log('usePostWriteDraftSync - Draft updated with image URLs');
    // @description 드래프트 업데이트 로그
    // @reason 업데이트 확인
  }, [imageUrls, updateDraft, draftData]); // @description 필요한 값만 의존
  // @reason 무한 렌더링 방지
}

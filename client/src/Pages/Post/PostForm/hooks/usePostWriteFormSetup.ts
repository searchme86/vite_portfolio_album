/**
 * @file usePostWriteFormSetup.ts
 * @description 폼 상태 및 초기화 관리 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteFormSetup.ts
 */
import { useState, useEffect, useMemo } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 폼 상태 및 초기화

import { useForm } from 'react-hook-form'; // @type {Function} - React Hook Form 훅
// @description 폼 상태 관리 및 유효성 검사
// @reason 폼 입력 관리

import {
  postWriteFormDefaultValues,
  PostWriteFormData,
} from './usePostWriteState'; // @type {Object} - 폼 기본값 및 타입
// @description 폼 초기값 및 타입 정의
// @reason 초기 폼 상태 설정

import useDraftStore from '../../../../stores/draft/draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 스토어 접근
// @reason 상태 업데이트 및 가져오기

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지

export function usePostWriteFormSetup() {
  const [imageUrls, setImageUrls] = useState<string[]>([]); // @type {string[]} - 이미지 URL 상태
  // @description 이미지 URL 관리
  // @reason 이미지 업로드 상태 관리
  // @analogy 도서관에서 책 이미지 목록 관리

  // Zustand 셀렉터로 직접 값 가져오기
  const postTitle = useDraftStore((state) => state.postTitle || ''); // @type {string} - 포스트 제목
  // @description 제목 가져오기
  // @reason 초기값 설정
  const postDesc = useDraftStore((state) => state.postDesc || ''); // @type {string} - 포스트 설명
  // @description 설명 가져오기
  // @reason 초기값 설정
  const postContent = useDraftStore((state) => state.postContent || ''); // @type {string} - 포스트 본문
  // @description 본문 가져오기
  // @reason 초기값 설정
  const tags = useDraftStore((state) => state.tags || []); // @type {string[]} - 포스트 태그
  // @description 태그 가져오기
  // @reason 초기값 설정
  const draftImageUrls = useDraftStore((state) => state.imageUrls || []); // @type {string[]} - 이미지 URL
  // @description 이미지 URL 가져오기
  // @reason 초기값 설정
  const custom = useDraftStore((state) => state.custom || {}); // @type {Record<string, any>} - 커스텀 데이터
  // @description 커스텀 데이터 가져오기
  // @reason 초기값 설정
  const draftId = useDraftStore((state) => state.draftId || ''); // @type {string} - 드래프트 ID
  // @description 드래프트 ID 가져오기
  // @reason 초기값 설정
  const createdAt = useDraftStore((state) => state.createdAt || new Date()); // @type {Date} - 생성 시간
  // @description 생성 시간 가져오기
  // @reason 초기값 설정
  const isTemporary = useDraftStore((state) => state.isTemporary || false); // @type {boolean} - 임시저장 여부
  // @description 임시저장 여부 가져오기
  // @reason 초기값 설정

  // 디버깅 로그: Zustand 스토어에서 가져온 초기 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('usePostWriteFormSetup - Zustand 스토어 데이터:', {
      postTitle,
      postDesc,
      postContent,
      tags,
      draftImageUrls,
      custom,
      draftId,
      createdAt,
      isTemporary,
    });
  }

  // 디버깅 로그: postWriteFormDefaultValues 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log(
      'usePostWriteFormSetup - postWriteFormDefaultValues:',
      postWriteFormDefaultValues
    );
  }

  const form = useForm<PostWriteFormData>({
    mode: 'onChange', // @type {string} - 폼 변경 시 유효성 검사
    // @description 폼 변경 시 즉시 유효성 검사
    // @reason 실시간 유효성 검사
    defaultValues: {
      ...postWriteFormDefaultValues, // @description 기본값 병합
      postTitle, // @description 초기 제목 설정
      postDesc, // @description 초기 설명 설정
      postContent, // @description 초기 본문 설정
      tags, // @description 초기 태그 설정
    },
  });

  const { reset } = form; // @type {Function} - 폼 리셋 메서드
  // @description 폼 리셋 메서드
  // @reason 초기화 제어

  // 폼 초기화 및 동기화
  useEffect(() => {
    const initialFormValues = {
      ...postWriteFormDefaultValues, // @description 기본값 병합
      postTitle, // @description 드래프트 제목 초기값
      postDesc, // @description 드래프트 설명 초기값
      postContent, // @description 드래프트 본문 초기값
      tags, // @description 드래프트 태그 초기값
    };
    reset(initialFormValues); // @description 폼 초기값 리셋
    // @reason 초기 로드 시 드래프트 데이터 반영

    // 디버깅 로그: 폼 초기화 데이터 확인 (디버깅 모드에서만 출력)
    if (isDebugMode) {
      console.log(
        'usePostWriteFormSetup - Form reset with data:',
        initialFormValues
      );
    }
  }, [postTitle, postDesc, postContent, tags, reset]); // @description 의존성 배열에 초기값 포함
  // @reason 초기 데이터 변경 시 폼 리셋
  // @why 의존성 배열에 초기값을 추가하여 데이터 변경 시 폼이 업데이트되도록 함
  // @mechanism
  // 1. Zustand 스토어에서 데이터 변경 시 의존성 배열 감지.
  // 2. `reset` 호출로 폼 초기값 업데이트.

  // 반환 데이터 메모이제이션
  const draftData = useMemo(
    () => ({
      postTitle, // @description 드래프트 제목
      postDesc, // @description 드래프트 설명
      postContent, // @description 드래프트 본문
      tags, // @description 드래프트 태그
      imageUrls: draftImageUrls, // @description 드래프트 이미지 URL
      custom, // @description 드래프트 커스텀 데이터
      draftId, // @description 드래프트 ID
      createdAt, // @description 드래프트 생성 시간
      isTemporary, // @description 드래프트 임시저장 여부
    }),
    [
      postTitle,
      postDesc,
      postContent,
      tags,
      draftImageUrls,
      custom,
      draftId,
      createdAt,
      isTemporary,
    ]
  ); // @type {Object} - 드래프트 데이터
  // @description 반환 데이터 메모이제이션
  // @reason 불필요한 객체 생성 방지
  // @why useMemo를 사용하여 동일한 값일 경우 객체 재생성 방지
  // @mechanism
  // 1. `draftData` 객체 생성.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.

  // 디버깅 로그: 반환 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('usePostWriteFormSetup - Returned draftData:', draftData);
  }

  return {
    form, // @description 폼 상태 및 메서드
    imageUrls, // @description 이미지 URL 상태
    setImageUrls, // @description 이미지 URL 설정 함수
    draftData, // @description 드래프트 데이터
  };
}

// **작동 매커니즘**
// 1. `useState`로 imageUrls 상태 관리.
// 2. `useDraftStore`로 Zustand 스토어에서 데이터 가져오기.
// 3. `useForm`으로 폼 초기화, 기본값 설정.
// 4. `useEffect`로 폼 초기화 및 동기화.
// 5. `useMemo`로 draftData 메모이제이션.
// 6. `form`, `imageUrls`, `setImageUrls`, `draftData` 반환.

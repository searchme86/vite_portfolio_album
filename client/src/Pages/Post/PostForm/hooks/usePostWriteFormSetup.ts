/**
 * @file usePostWriteFormSetup.ts
 * @description 폼 상태 및 초기화 관리 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteFormSetup.ts
 */
import { useState, useEffect } from 'react'; // @type {Function} - React 훅
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

export function usePostWriteFormSetup() {
  const [imageUrls, setImageUrls] = useState<string[]>([]); // @type {string[]} - 이미지 URL 상태
  // @description 이미지 URL 관리
  // @reason 이미지 업로드 상태 관리

  // Zustand 셀렉터로 직접 값 가져오기
  const postTitle = useDraftStore.use.postTitle(); // @type {string} - 포스트 제목
  // @description 제목 가져오기
  // @reason 초기값 설정
  const postDesc = useDraftStore.use.postDesc(); // @type {string} - 포스트 설명
  // @description 설명 가져오기
  // @reason 초기값 설정
  const postContent = useDraftStore.use.postContent(); // @type {string} - 포스트 본문
  // @description 본문 가져오기
  // @reason 초기값 설정
  const tags = useDraftStore.use.tags(); // @type {string[]} - 포스트 태그
  // @description 태그 가져오기
  // @reason 초기값 설정
  const draftImageUrls = useDraftStore.use.imageUrls(); // @type {string[]} - 이미지 URL
  // @description 이미지 URL 가져오기
  // @reason 초기값 설정
  const custom = useDraftStore.use.custom(); // @type {Record<string, any>} - 커스텀 데이터
  // @description 커스텀 데이터 가져오기
  // @reason 초기값 설정
  const draftId = useDraftStore.use.draftId(); // @type {string} - 드래프트 ID
  // @description 드래프트 ID 가져오기
  // @reason 초기값 설정
  const createdAt = useDraftStore.use.createdAt(); // @type {Date} - 생성 시간
  // @description 생성 시간 가져오기
  // @reason 초기값 설정
  const isTemporary = useDraftStore.use.isTemporary(); // @type {boolean} - 임시저장 여부
  // @description 임시저장 여부 가져오기
  // @reason 초기값 설정

  const form = useForm<PostWriteFormData>({
    mode: 'onChange', // @type {string} - 폼 변경 시 유효성 검사
    // @description 폼 변경 시 즉시 유효성 검사
    // @reason 실시간 유효성 검사
    defaultValues: {
      ...postWriteFormDefaultValues, // 기본값 병합
      postTitle: postTitle || '', // 초기 제목 설정
      postDesc: postDesc || '', // 초기 설명 설정
      postContent: postContent || '', // 초기 본문 설정
      tags: tags || [], // 초기 태그 설정
    }, // @description 폼 초기값 설정
    // @reason 초기 로드 시 드래프트 데이터 반영
  });

  const { reset } = form; // 폼 리셋 메서드
  // @description 폼 리셋 메서드
  // @reason 초기화 제어

  // 초기 로드 시 드래프트 데이터로 폼 초기화
  useEffect(() => {
    reset({
      ...postWriteFormDefaultValues, // 기본값 병합
      postTitle: postTitle || '', // 드래프트 제목 초기값
      postDesc: postDesc || '', // 드래프트 설명 초기값
      postContent: postContent || '', // 드래프트 본문 초기값
      tags: tags || [], // 드래프트 태그 초기값
    }); // 폼 초기값 리셋
    // @description 폼 초기값 설정
    // @reason 초기 로드 시 드래프트 데이터 반영
    console.log('usePostWriteFormSetup - Form reset with draft data');
    // @description 초기화 로그
    // @reason 초기화 확인
  }, [reset]); // @description reset 함수만 의존
  // @reason 무한 렌더링 방지

  return {
    form, // 폼 상태 및 메서드
    imageUrls, // 이미지 URL 상태
    setImageUrls, // 이미지 URL 설정 함수
    draftData: {
      postTitle, // 드래프트 제목
      postDesc, // 드래프트 설명
      postContent, // 드래프트 본문
      tags, // 드래프트 태그
      imageUrls: draftImageUrls, // 드래프트 이미지 URL
      custom, // 드래프트 커스텀 데이터
      draftId, // 드래프트 ID
      createdAt, // 드래프트 생성 시간
      isTemporary, // 드래프트 임시저장 여부
    }, // 드래프트 데이터
  };
}

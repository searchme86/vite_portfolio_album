/**
 * @file usePostWriteFormSetup.ts
 * @description 폼 상태 및 초기화 관리 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteFormSetup.ts
 */
import { useMemo, useEffect } from 'react'; // @type {Function} - React 훅
// @description useMemo와 useEffect 훅 사용
// @reason 셀렉터 캐싱 및 이펙트 관리

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
  // Zustand 셀렉터 결과 캐싱
  const draftValues = useMemo(() => {
    const state = useDraftStore.getState(); // @type {Object} - Zustand 스토어 상태
    // @description Zustand 스토어의 현재 상태 가져오기
    // @reason 셀렉터 캐싱
    return {
      postTitle: state.postTitle, // @type {string} - 포스트 제목
      postDesc: state.postDesc, // @type {string} - 포스트 설명
      postContent: state.postContent, // @type {string} - 포스트 본문
      tags: state.tags, // @type {string[]} - 포스트 태그
      imageUrls: state.imageUrls, // @type {string[]} - 이미지 URL
      custom: state.custom, // @type {Record<string, any>} - 커스텀 데이터
      draftId: state.draftId, // @type {string} - 드래프트 ID
      createdAt: state.createdAt, // @type {Date} - 생성 시간
      updatedAt: state.updatedAt, // @type {Date} - 수정 시간
      isTemporary: state.isTemporary, // @type {boolean} - 임시저장 여부
    };
  }, []); // @description 의존성 배열: 빈 배열로 마운트 시 한 번만 실행
  // @reason 매 렌더링마다 새로운 객체 생성 방지
  // @why Zustand 셀렉터 결과 캐싱으로 무한 루프 방지

  // **디버깅 로그 추가**: Zustand 스토어에서 가져온 초기 데이터 확인
  console.log('usePostWriteFormSetup - Zustand 스토어 데이터:', draftValues);
  // @description Zustand 스토어에서 가져온 데이터 출력
  // @reason 초기 데이터가 제대로 설정되었는지 확인
  // @analogy 도서관에서 책 정보를 가져오는 과정 확인

  // **디버깅 로그 추가**: postWriteFormDefaultValues 확인
  console.log(
    'usePostWriteFormSetup - postWriteFormDefaultValues:',
    postWriteFormDefaultValues
  );
  // @description 폼 기본값 출력
  // @reason 기본값이 올바른지 확인
  // @analogy 도서관에서 책의 기본 정보 템플릿 확인

  const form = useForm<PostWriteFormData>({
    mode: 'onChange', // @type {string} - 폼 변경 시 유효성 검사
    // @description 폼 변경 시 즉시 유효성 검사
    // @reason 실시간 유효성 검사
    defaultValues: {
      ...postWriteFormDefaultValues, // 기본값 병합
      postTitle: draftValues.postTitle || '', // 초기 제목 설정
      postDesc: draftValues.postDesc || '', // 초기 설명 설정
      postContent: draftValues.postContent || '', // 초기 본문 설정
      tags: draftValues.tags || [], // 초기 태그 설정
      imageUrls: draftValues.imageUrls || [], // 초기 이미지 URL 설정
      // @description draftImageUrls를 초기값으로 설정
      // @reason 리프레쉬 후 이미지 URL 복원
    }, // @description 폼 초기값 설정
    // @reason 초기 로드 시 드래프트 데이터 반영
  });

  const { reset, setValue } = form; // 폼 리셋 및 값 설정 메서드
  // @description 폼 리셋 및 값 설정 메서드
  // @reason 초기화 및 동적 값 업데이트

  useEffect(() => {
    // 초기 로드 시 드래프트 데이터로 폼 초기화 (한 번만 실행)
    const initialFormValues = {
      ...postWriteFormDefaultValues, // 기본값 병합
      postTitle: draftValues.postTitle || '', // 드래프트 제목 초기값
      postDesc: draftValues.postDesc || '', // 드래프트 설명 초기값
      postContent: draftValues.postContent || '', // 드래프트 본문 초기값
      tags: draftValues.tags || [], // 드래프트 태그 초기값
      imageUrls: draftValues.imageUrls || [], // 드래프트 이미지 URL 초기값
      // @description draftImageUrls를 초기값으로 설정
      // @reason 리프레쉬 후 이미지 URL 복원
    };
    reset(initialFormValues); // 폼 초기값 리셋
    // @description 폼 초기값 설정
    // @reason 초기 로드 시 드래프트 데이터 반영

    // **디버깅 로그 추가**: 폼 초기화 데이터 확인
    console.log(
      'usePostWriteFormSetup - Form reset with data:',
      initialFormValues
    );
    // @description 초기화된 폼 데이터 출력
    // @reason 초기화가 제대로 이루어졌는지 확인
    // @analogy 도서관에서 책 정보를 초기화하는 과정 확인
  }, [reset]); // @description 의존성 배열: reset 메서드만 포함
  // @reason 컴포넌트 마운트 시 한 번만 실행

  // **디버깅 로그 추가**: 반환 데이터 확인
  const draftData = {
    postTitle: draftValues.postTitle, // 드래프트 제목
    postDesc: draftValues.postDesc, // 드래프트 설명
    postContent: draftValues.postContent, // 드래프트 본문
    tags: draftValues.tags, // 드래프트 태그
    imageUrls: draftValues.imageUrls, // 드래프트 이미지 URL
    custom: draftValues.custom, // 드래프트 커스텀 데이터
    draftId: draftValues.draftId, // 드래프트 ID
    updatedAt: draftValues.updatedAt,
    createdAt: draftValues.createdAt, // 드래프트 생성 시간
    isTemporary: draftValues.isTemporary, // 드래프트 임시저장 여부
  };
  console.log('usePostWriteFormSetup - Returned draftData:', draftData);
  // @description 반환된 드래프트 데이터 출력
  // @reason 반환 데이터가 올바른지 확인

  return {
    form, // 폼 상태 및 메서드
    setImageUrls: (urls: string[]) => {
      setValue('imageUrls', urls); // form 상태로 imageUrls 업데이트
      // @description form의 imageUrls 필드 업데이트
      // @reason watch()로 감지 가능하도록 설정
    }, // 이미지 URL 설정 함수
    draftData, // 드래프트 데이터
  };
}

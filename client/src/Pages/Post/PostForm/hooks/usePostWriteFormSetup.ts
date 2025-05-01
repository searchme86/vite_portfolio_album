/**
 * @file usePostWriteFormSetup.ts
 * @description 폼 상태 및 초기화 관리 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteFormSetup.ts
 */
import { useState, useEffect, useMemo } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 폼 상태 및 초기화
// @why useState로 상태 관리, useEffect로 초기화, useMemo로 메모이제이션
// @mechanism
// 1. `useState`로 상태 생성.
// 2. `useEffect`로 부수 효과 처리.
// 3. `useMemo`로 객체 재생성 방지.
// @analogy 도서관에서 책 상태 관리, 초기화, 데이터 최적화

import { useForm } from 'react-hook-form'; // @type {Function} - React Hook Form 훅
// @description 폼 상태 관리 및 유효성 검사
// @reason 폼 입력 관리
// @why react-hook-form으로 폼 상태와 유효성 검사 중앙 관리
// @mechanism
// 1. `useForm` 호출로 폼 상태와 메서드 생성.
// 2. 폼 입력 관리 및 유효성 검사 수행.
// @analogy 도서관에서 책 입력 양식 관리

import {
  postWriteFormDefaultValues,
  PostWriteFormData,
} from './usePostWriteState'; // @type {Object} - 폼 기본값 및 타입
// @description 폼 초기값 및 타입 정의
// @reason 초기 폼 상태 설정
// @why 초기값과 타입을 별도 파일에서 관리하여 재사용성 향상
// @mechanism
// 1. `postWriteFormDefaultValues`로 초기값 가져오기.
// 2. `PostWriteFormData`로 타입 정의.
// @analogy 도서관에서 책 입력 양식 기본값과 규격 가져오기

import useDraftStore from '../../../../stores/draft/draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 스토어 접근
// @reason 상태 업데이트 및 가져오기
// @why Zustand로 중앙 상태 관리
// @mechanism
// 1. `useDraftStore` 호출로 스토어 상태와 메서드 접근.
// 2. 상태 값을 컴포넌트에서 사용.
// @analogy 도서관에서 책 데이터를 중앙 저장소에서 가져오기

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지
// @why 운영 환경에서 불필요한 로그 출력 방지
// @mechanism
// 1. `process.env.NODE_ENV`로 환경 확인.
// 2. 개발 환경('development')일 경우 true 반환.
// @analogy 도서관에서 테스트 중에만 기록 남기기

export function usePostWriteFormSetup() {
  const [imageUrls, setImageUrls] = useState<string[]>([]); // @type {string[]} - 이미지 URL 상태
  // @description 이미지 URL 관리
  // @reason 이미지 업로드 상태 관리
  // @why useState로 이미지 URL 동적 관리
  // @mechanism
  // 1. `useState`로 `imageUrls`와 `setImageUrls` 생성.
  // 2. 이미지 업로드 시 `setImageUrls`로 상태 업데이트.
  // @analogy 도서관에서 책 이미지 목록 관리

  // Zustand 셀렉터로 직접 값 가져오기
  const postTitle = useDraftStore((state) => state.postTitle || ''); // @type {string} - 포스트 제목
  // @description 제목 가져오기, 없으면 빈 문자열로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `postTitle` 가져오기.
  // 2. 값이 없으면 빈 문자열 반환.
  const postDesc = useDraftStore((state) => state.postDesc || ''); // @type {string} - 포스트 설명
  // @description 설명 가져오기, 없으면 빈 문자열로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `postDesc` 가져오기.
  // 2. 값이 없으면 빈 문자열 반환.
  const postContent = useDraftStore((state) => state.postContent || ''); // @type {string} - 포스트 본문
  // @description 본문 가져오기, 없으면 빈 문자열로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `postContent` 가져오기.
  // 2. 값이 없으면 빈 문자열 반환.
  const tags = useDraftStore((state) => state.tags || []); // @type {string[]} - 포스트 태그
  // @description 태그 가져오기, 없으면 빈 배열로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `tags` 가져오기.
  // 2. 값이 없으면 빈 배열 반환.
  const draftImageUrls = useDraftStore((state) => state.imageUrls || []); // @type {string[]} - 이미지 URL
  // @description 이미지 URL 가져오기, 없으면 빈 배열로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `imageUrls` 가져오기.
  // 2. 값이 없으면 빈 배열 반환.
  const custom = useDraftStore((state) => state.custom || {}); // @type {Record<string, any>} - 커스텀 데이터
  // @description 커스텀 데이터 가져오기, 없으면 빈 객체로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `custom` 가져오기.
  // 2. 값이 없으면 빈 객체 반환.
  const draftId = useDraftStore((state) => state.draftId || ''); // @type {string} - 드래프트 ID
  // @description 드래프트 ID 가져오기, 없으면 빈 문자열로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `draftId` 가져오기.
  // 2. 값이 없으면 빈 문자열 반환.
  //====여기부터 수정됨====
  const createdAt = useDraftStore(
    (state) => new Date(state.createdAt || Date.now())
  ); // @type {Date} - 생성 시간
  // @description 생성 시간 가져오기, Date 타입으로 보장
  // @reason 초기값 설정 및 타입 에러 방지
  // @why `createdAt`을 항상 `Date` 타입으로 보장하여 타입 에러 해결
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `createdAt` 가져오기.
  // 2. 값이 없거나 유효하지 않으면 현재 시간으로 폴백.
  // 3. `new Date()`로 `Date` 타입 보장.
  const updatedAt = useDraftStore(
    (state) => new Date(state.updatedAt || Date.now())
  ); // @type {Date} - 수정 시간
  // @description 수정 시간 가져오기, Date 타입으로 보장
  // @reason 초기값 설정 및 타입 에러 방지
  // @why `updatedAt`을 항상 `Date` 타입으로 보장하여 일관성 유지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `updatedAt` 가져오기.
  // 2. 값이 없거나 유효하지 않으면 현재 시간으로 폴백.
  // 3. `new Date()`로 `Date` 타입 보장.
  //====여기까지 수정됨====
  const isTemporary = useDraftStore((state) => state.isTemporary || false); // @type {boolean} - 임시저장 여부
  // @description 임시저장 여부 가져오기, 없으면 false로 폴백
  // @reason 초기값 설정 및 데이터 손실 방지
  // @why 폴백으로 애플리케이션 깨짐 방지
  // @mechanism
  // 1. `useDraftStore`로 스토어에서 `isTemporary` 가져오기.
  // 2. 값이 없으면 false 반환.

  // 디버깅 로그: Zustand 스토어에서 가져온 초기 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('usePostWriteFormSetup - Zustand 스토어 데이터:', {
      postTitle, // @type {string} - 제목 로그
      // @description 제목 상태 확인
      // @reason 디버깅 시 데이터 추적
      postDesc, // @type {string} - 설명 로그
      // @description 설명 상태 확인
      // @reason 디버깅 시 데이터 추적
      postContent, // @type {string} - 본문 로그
      // @description 본문 상태 확인
      // @reason 디버깅 시 데이터 추적
      tags, // @type {string[]} - 태그 로그
      // @description 태그 상태 확인
      // @reason 디버깅 시 데이터 추적
      draftImageUrls, // @type {string[]} - 이미지 URL 로그
      // @description 이미지 URL 상태 확인
      // @reason 디버깅 시 데이터 추적
      custom, // @type {Record<string, any>} - 커스텀 데이터 로그
      // @description 커스텀 데이터 상태 확인
      // @reason 디버깅 시 데이터 추적
      draftId, // @type {string} - 드래프트 ID 로그
      // @description 드래프트 ID 상태 확인
      // @reason 디버깅 시 데이터 추적
      createdAt, // @type {Date} - 생성 시간 로그 (수정됨)
      // @description 생성 시간 상태 확인
      // @reason 디버깅 시 데이터 추적
      updatedAt, // @type {Date} - 수정 시간 로그 (수정됨)
      // @description 수정 시간 상태 확인
      // @reason 디버깅 시 데이터 추적
      isTemporary, // @type {boolean} - 임시저장 여부 로그
      // @description 임시저장 여부 상태 확인
      // @reason 디버깃 시 데이터 추적
    }); // @type {void} - 로그 출력
    // @description Zustand 스토어 데이터 로그 출력
    // @reason 디버깅 시 데이터 상태 확인
    // @why 초기 데이터 상태를 추적하여 문제 파악
    // @analogy 도서관에서 책 데이터 상태를 기록
  }

  // 디버깅 로그: postWriteFormDefaultValues 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log(
      'usePostWriteFormSetup - postWriteFormDefaultValues:',
      postWriteFormDefaultValues
    ); // @type {void} - 기본값 로그 출력
    // @description 폼 기본값 로그 출력
    // @reason 디버깅 시 기본값 확인
    // @why 초기 폼 값이 올바른지 확인
    // @analogy 도서관에서 책 입력 양식 기본값 확인
  }

  const form = useForm<PostWriteFormData>({
    mode: 'onChange', // @type {string} - 폼 변경 시 유효성 검사
    // @description 폼 변경 시 즉시 유효성 검사
    // @reason 실시간 유효성 검사
    // @why 사용자 입력 즉시 피드백 제공
    defaultValues: {
      ...postWriteFormDefaultValues, // @type {Object} - 기본값 병합
      // @description 기본값 병합
      // @reason 초기 폼 값 설정
      postTitle, // @type {string} - 초기 제목 설정
      // @description 드래프트 제목으로 초기화
      // @reason 초기값 반영
      postDesc, // @type {string} - 초기 설명 설정
      // @description 드래프트 설명으로 초기화
      // @reason 초기값 반영
      postContent, // @type {string} - 초기 본문 설정
      // @description 드래프트 본문으로 초기화
      // @reason 초기값 반영
      tags, // @type {string[]} - 초기 태그 설정
      // @description 드래프트 태그로 초기화
      // @reason 초기값 반영
    },
  }); // @type {Object} - 폼 상태 객체
  // @description react-hook-form으로 폼 상태 관리
  // @reason 폼 입력 관리 및 유효성 검사
  // @why useForm으로 폼 상태 중앙 관리
  // @mechanism
  // 1. `useForm` 호출로 폼 상태와 메서드 생성.
  // 2. `defaultValues`로 초기값 설정.
  // @analogy 도서관에서 책 입력 양식 준비

  const { reset } = form; // @type {Function} - 폼 리셋 메서드
  // @description 폼 리셋 메서드 추출
  // @reason 초기화 제어
  // @why reset으로 폼 값을 동적으로 초기화
  // @mechanism
  // 1. `form`에서 `reset` 메서드 추출.
  // 2. 폼 초기화 시 사용.

  // 폼 초기화 및 동기화
  useEffect(() => {
    const initialFormValues = {
      ...postWriteFormDefaultValues, // @type {Object} - 기본값 병합
      // @description 기본값 병합
      // @reason 초기 폼 값 설정
      postTitle, // @type {string} - 드래프트 제목 초기값
      // @description 드래프트 제목으로 초기화
      // @reason 초기값 반영
      postDesc, // @type {string} - 드래프트 설명 초기값
      // @description 드래프트 설명으로 초기화
      // @reason 초기값 반영
      postContent, // @type {string} - 드래프트 본문 초기값
      // @description 드래프트 본문으로 초기화
      // @reason 초기값 반영
      tags, // @type {string[]} - 드래프트 태그 초기값
      // @description 드래프트 태그로 초기화
      // @reason 초기값 반영
    }; // @type {Object} - 초기 폼 값
    // @description 초기 폼 값 객체 생성
    // @reason 폼 초기화
    reset(initialFormValues); // @type {void} - 폼 초기값 리셋
    // @description 폼 초기값으로 리셋
    // @reason 초기 로드 시 드래프트 데이터 반영
    // @why 드래프트 데이터로 폼 초기화
    // @mechanism
    // 1. `initialFormValues` 객체 생성.
    // 2. `reset` 호출로 폼 초기화.

    // 디버깅 로그: 폼 초기화 데이터 확인 (디버깅 모드에서만 출력)
    if (isDebugMode) {
      console.log(
        'usePostWriteFormSetup - Form reset with data:',
        initialFormValues
      ); // @type {void} - 초기화 데이터 로그 출력
      // @description 초기화 데이터 로그 출력
      // @reason 디버깅 시 초기화 데이터 확인
      // @why 초기 폼 값이 올바른지 확인
      // @analogy 도서관에서 책 입력 양식 초기화 데이터 확인
    }
  }, [postTitle, postDesc, postContent, tags, reset]); // @type {Array} - 의존성 배열
  // @description 의존성 배열에 초기값 포함
  // @reason 초기 데이터 변경 시 폼 리셋
  // @why 의존성 배열로 데이터 변경 감지
  // @mechanism
  // 1. Zustand 스토어에서 데이터 변경 시 의존성 배열 감지.
  // 2. `reset` 호출로 폼 초기값 업데이트.
  // @analogy 도서관에서 책 데이터 변경 시 양식 업데이트

  // 반환 데이터 메모이제이션
  const draftData = useMemo(
    () => ({
      postTitle, // @type {string} - 드래프트 제목
      // @description 드래프트 제목 설정
      // @reason 드래프트 데이터 반환
      postDesc, // @type {string} - 드래프트 설명
      // @description 드래프트 설명 설정
      // @reason 드래프트 데이터 반환
      postContent, // @type {string} - 드래프트 본문
      // @description 드래프트 본문 설정
      // @reason 드래프트 데이터 반환
      tags, // @type {string[]} - 드래프트 태그
      // @description 드래프트 태그 설정
      // @reason 드래프트 데이터 반환
      imageUrls: draftImageUrls, // @type {string[]} - 드래프트 이미지 URL
      // @description 드래프트 이미지 URL 설정
      // @reason 드래프트 데이터 반환
      custom, // @type {Record<string, any>} - 드래프트 커스텀 데이터
      // @description 드래프트 커스텀 데이터 설정
      // @reason 드래프트 데이터 반환
      draftId, // @type {string} - 드래프트 ID
      // @description 드래프트 ID 설정
      // @reason 드래프트 데이터 반환
      createdAt, // @type {Date} - 드래프트 생성 시간 (수정됨)
      // @description 드래프트 생성 시간 설정
      // @reason 드래프트 데이터 반환
      updatedAt, // @type {Date} - 드래프트 수정 시간 (수정됨)
      // @description 드래프트 수정 시간 설정
      // @reason 드래프트 데이터 반환
      isTemporary, // @type {boolean} - 드래프트 임시저장 여부
      // @description 드래프트 임시저장 여부 설정
      // @reason 드래프트 데이터 반환
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
      updatedAt,
      isTemporary,
    ]
  ); // @type {Object} - 드래프트 데이터
  // @description 반환 데이터 메모이제이션
  // @reason 불필요한 객체 생성 방지
  // @why useMemo로 동일한 값일 경우 객체 재생성 방지
  // @mechanism
  // 1. `draftData` 객체 생성.
  // 2. `useMemo`로 동일한 값일 경우 객체 재생성 방지.
  // @analogy 도서관에서 책 데이터를 한 번 정리한 후 같은 정보는 다시 정리하지 않음

  // 디버깅 로그: 반환 데이터 확인 (디버깅 모드에서만 출력)
  if (isDebugMode) {
    console.log('usePostWriteFormSetup - Returned draftData:', draftData); // @type {void} - 반환 데이터 로그 출력
    // @description 반환 데이터 로그 출력
    // @reason 디버깅 시 반환 데이터 확인
    // @why 반환 값이 올바른지 확인
    // @analogy 도서관에서 반환된 책 데이터 확인
  }

  return {
    form, // @type {Object} - 폼 상태 및 메서드
    // @description 폼 상태와 메서드 반환
    // @reason 폼 관리
    imageUrls, // @type {string[]} - 이미지 URL 상태
    // @description 현재 이미지 URL 반환
    // @reason 이미지 상태 공유
    setImageUrls, // @type {Function} - 이미지 URL 설정 함수
    // @description 이미지 URL 업데이트 함수 반환
    // @reason 이미지 상태 업데이트
    draftData, // @type {Object} - 드래프트 데이터
    // @description 드래프트 데이터 반환
    // @reason 드래프트 동기화에 사용
  }; // @type {Object} - 훅 반환 객체
  // @description 폼 상태, 이미지 URL, 드래프트 데이터 반환
  // @reason 상위 컴포넌트에서 사용
  // @analogy 도서관에서 책 입력 양식과 관련 데이터를 반환
}

// **작동 매커니즘**
// 1. `useState`로 imageUrls 상태 관리: 이미지 URL 배열과 설정 함수 생성.
// 2. `useDraftStore`로 Zustand 스토어에서 데이터 가져오기: 드래프트 데이터 추출.
// 3. `useForm`으로 폼 초기화, 기본값 설정: react-hook-form으로 폼 상태 관리.
// 4. `useEffect`로 폼 초기화 및 동기화: 드래프트 데이터로 폼 초기화.
// 5. `useMemo`로 draftData 메모이제이션: 불필요한 객체 생성 방지.
// 6. `form`, `imageUrls`, `setImageUrls`, `draftData` 반환: 상위 컴포넌트에서 사용.
// @reason 폼 상태와 초기 데이터를 중앙에서 관리하여 컴포넌트 간 데이터 공유
// @analogy 도서관에서 책 입력 양식과 초기 데이터를 준비하는 시스템

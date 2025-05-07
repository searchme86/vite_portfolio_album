/**
 * @file PostAutoSave.tsx
 * @description 포스트 자동저장 컴포넌트
 * @location src/components/post/PostDraft/PostAutoSave/PostAutoSave.tsx
 */
import { useAutoSave } from './hooks/useAutoSave'; // @type {Function} - 자동저장 훅
// @description 자동저장 로직 관리
// @reason 드래프트 저장

import AutoSaveNotification from './parts/AutoSaveNotification'; // @type {Component} - 자동저장 알림 컴포넌트
// @description 저장 상태 알림 UI
// @reason 사용자 피드백 제공

import useGetDraftState from '@/stores/draft/useGetDraftState'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 데이터 가져오기
// @reason 기존 드래프트 데이터 참조

import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken'; // @type {Function} - 인증 상태 훅
// @description 인증 상태와 토큰 가져오기
// @reason 서버 요청 시 인증 필요

import { v4 as uuidv4 } from 'uuid'; // @type {Function} - UUID 생성 함수
// @description 고유 ID 생성
// @reason draftId 생성

interface PostWriteFormData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
}

interface ImageUrlObject {
  url: string; // @type {string} - 이미지 URL
  isNew: boolean; // @type {boolean} - 새 이미지 여부
}

interface PostAutoSaveProps {
  formData: PostWriteFormData; // @type {PostWriteFormData} - 폼 데이터
  // @description 폼 데이터 (imageUrls 포함)
  // @reason 자동저장 시 데이터 참조
}

function PostAutoSave({ formData }: PostAutoSaveProps) {
  // 디버깅 로그: 입력 데이터 확인
  console.log('PostAutoSave - formData:', formData);
  // @description 입력된 폼 데이터 출력
  // @reason 데이터가 제대로 전달되었는지 확인
  // @analogy 도서관에서 책 정보를 확인

  const { isSignedIn, getToken } = useCheckAuthToken(); // @type {Object} - 인증 상태와 토큰
  // @description 인증 상태와 토큰 가져오기
  // @reason 서버 요청 시 토큰 필요
  // @analogy 도서관에서 대여를 위해 회원증 확인

  const draftFromStore = useGetDraftState(); // @type {DraftState} - Zustand 스토어에서 드래프트 데이터
  // @description 스토어에서 드래프트 데이터 가져오기
  // @reason 기존 드래프트 데이터와 병합
  // @analogy 도서관에서 기존 기록부 가져오기

  // 디버깅 로그: 스토어 데이터 확인
  console.log('PostAutoSave - draftFromStore:', draftFromStore);
  // @description 스토어 데이터 출력
  // @reason 스토어 데이터가 올바른지 확인

  console.log(
    'PostAutoSave - draftFromStore.imageUrls:',
    draftFromStore.imageUrls
  );
  console.log('PostAutoSave - formData.imageUrls:', formData.imageUrls);

  // 드래프트 객체 생성 (필수 필드 유효성 보장)
  const draft = {
    ...draftFromStore, // 기존 스토어 데이터 병합
    postTitle:
      (formData.postTitle || draftFromStore.postTitle || '').trim() ||
      'Untitled', // @type {string} - 제목 (필수)
    // @description 폼에서 제목 가져오기, 없으면 스토어에서, 빈 문자열 제거 후 기본값 'Untitled'
    // @reason 백엔드 요구 필수 필드 보장 및 400 에러 방지
    postDesc: (formData.postDesc || draftFromStore.postDesc || '').trim() || '', // @type {string} - 설명
    // @description 폼에서 설명 가져오기, 없으면 스토어에서, 빈 문자열 제거
    // @reason 백엔드 요구 선택 필드 보장
    postContent:
      (formData.postContent || draftFromStore.postContent || '').trim() ||
      'No content', // @type {string} - 본문 (필수)
    // @description 폼에서 본문 가져오기, 없으면 스토어에서, 빈 문자열 제거 후 기본값 'No content'
    // @reason 백엔드 요구 필수 필드 보장 및 400 에러 방지
    tags: (formData.tags || draftFromStore.tags || []).filter(
      (tag) => tag.trim() !== ''
    ), // @type {string[]} - 태그 (필수)
    // @description 폼에서 태그 가져오기, 없으면 스토어에서, 빈 태그 제거
    // @reason 백엔드 요구 필수 필드 보장
    //====여기부터 수정됨====
    imageUrls: [
      ...(formData.imageUrls || []),
      ...(() => {
        const wrappedUrls = (draftFromStore.imageUrls || []).map((url) => ({
          url,
        }));
        return wrappedUrls
          .filter(
            (item) => typeof item.url === 'string' && item.url.trim() !== ''
          )
          .map((item) => item.url); // 다시 string[]로 만들고 싶을 경우
      })(),
    ],
    // @description formData와 draftFromStore의 url을 병합
    // @reason imageUrls를 string[]로 유지
    // @analogy 도서관에서 사진 정보(객체)에서 파일 이름(문자열)만 추려 목록에 추가
    //====여기까지 수정됨====
    draftId:
      draftFromStore.draftId && draftFromStore.draftId.trim() !== ''
        ? draftFromStore.draftId
        : uuidv4(), // @type {string} - 드래프트 ID (필수)
    // @description draftId가 비어 있거나 유효하지 않으면 새 UUID 생성
    // @reason 백엔드에서 draftId를 필수 필드로 요구, 400 에러 방지
    // @analogy 도서관에서 책 번호가 없으면 새 번호 부여
  };

  // 디버깅 로그: 드래프트 데이터 확인
  console.log('PostAutoSave - draft:', draft);
  // @description 생성된 드래프트 데이터 출력
  // @reason 데이터가 제대로 구성되었는지 확인
  // @analogy 도서관에서 책 정보를 기록하기 전 확인

  const { isSaving, lastSaved } = useAutoSave(draft, isSignedIn, getToken); // @type {Object} - 자동저장 상태
  // @description 자동저장 훅 호출
  // @reason 로컬 및 서버에 드래프트 저장
  // @analogy 도서관에서 책 정보를 저장소에 저장

  // 디버깅 로그: 자동저장 상태 확인
  console.log('PostAutoSave - isSaving:', isSaving, 'lastSaved:', lastSaved);
  // @description 자동저장 상태와 마지막 저장 시간 출력
  // @reason 상태가 제대로 반영되었는지 확인
  // @analogy 도서관에서 저장 상태 확인

  return <AutoSaveNotification isSaving={isSaving} lastSaved={lastSaved} />;
  // @description 알림 컴포넌트 렌더링
  // @reason 사용자에게 저장 상태 표시
  // @analogy 도서관에서 사용자에게 저장 완료 알림
}

export default PostAutoSave;

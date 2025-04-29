/**
 * @file useCustomDataHandler.ts
 * @description 입력 이벤트를 처리하고 Zustand 스토어를 업데이트하는 커스텀 훅
 * @reason 이벤트 처리와 스토어 업데이트 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록 입력을 받아 중앙 시스템에 저장하는 창구
 */

import { useCallback } from 'react'; // @type {Function} - React 훅
// @description useCallback 훅 가져오기
// @reason 이벤트 핸들러 메모이제이션으로 성능 최적화
// @analogy 도서관에서 자주 사용하는 안내 문구를 메모해둠

import useDraftStore from '../../stores/draft/draftStore'; // @type {Object} - Zustand 스토어
// @description Zustand 스토어 가져오기
// @reason 드래프트 데이터 상태 관리 및 업데이트
// @analogy 도서관에서 중앙 대여 기록 시스템에 접근

// 드래프트 상태 타입 정의 (draftStore.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 대여 기록부의 형식을 미리 정의
interface DraftState {
  postTitle: string;
  postDesc: string;
  postContent: string;
  tags: string[];
  imageUrls: string[];
  custom: { [key: string]: any };
  draftId: string;
  createdAt: Date;
  updatedAt: Date;
  isTemporary: boolean;
}

// 커스텀 훅 정의
// @description 입력 이벤트를 처리하고 스토어를 업데이트하는 훅
// @reason 이벤트 처리와 상태 업데이트를 중앙에서 관리
// @analogy 도서관에서 대여 기록 입력 창구를 통해 데이터를 처리
const useCustomDataHandler = () => {
  // Zustand 스토어에서 Setter 함수 가져오기
  // @description 스토어에서 필요한 Setter 함수 추출
  // @reason 상태 업데이트에 필요한 함수 사용
  const {
    setPostTitle,
    setPostDesc,
    setPostContent,
    setTags,
    setImageUrls,
    setCustom,
    setDraftId,
    setIsTemporary,
  } = useDraftStore(); // @type {Object} - Zustand 스토어의 Setter 함수들
  // @description Zustand 훅을 사용하여 Setter 함수 가져오기
  // @reason 스토어 상태 업데이트를 위해 필요
  // @analogy 도서관에서 중앙 시스템의 업데이트 기능 사용

  // 제목 변경 핸들러
  // @description 제목 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const title = e.target?.value || ''; // @type {string} - Fallback: 빈 문자열
      // @description 입력값 추출, 없으면 빈 문자열
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleTitleChange - Title:', title); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setPostTitle(title); // @description 스토어에 제목 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setPostTitle]
  ); // @description setPostTitle 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 설명 변경 핸들러
  // @description 설명 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleDescChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const desc = e.target?.value || ''; // @type {string} - Fallback: 빈 문자열
      // @description 입력값 추출, 없으면 빈 문자열
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleDescChange - Desc:', desc); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setPostDesc(desc); // @description 스토어에 설명 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setPostDesc]
  ); // @description setPostDesc 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 본문 변경 핸들러
  // @description 본문 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = e.target?.value || ''; // @type {string} - Fallback: 빈 문자열
      // @description 입력값 추출, 없으면 빈 문자열
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleContentChange - Content:', content); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setPostContent(content); // @description 스토어에 본문 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setPostContent]
  ); // @description setPostContent 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 태그 변경 핸들러
  // @description 태그 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleTagsChange = useCallback(
    (tags: string[]) => {
      const safeTags = tags || []; // @type {string[]} - Fallback: 빈 배열
      // @description 태그 배열 추출, 없으면 빈 배열
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleTagsChange - Tags:', safeTags); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setTags(safeTags); // @description 스토어에 태그 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setTags]
  ); // @description setTags 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 이미지 URL 변경 핸들러
  // @description 이미지 URL 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleImageUrlsChange = useCallback(
    (urls: string[]) => {
      const safeUrls = urls || []; // @type {string[]} - Fallback: 빈 배열
      // @description 이미지 URL 배열 추출, 없으면 빈 배열
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleImageUrlsChange - URLs:', safeUrls); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setImageUrls(safeUrls); // @description 스토어에 이미지 URL 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setImageUrls]
  ); // @description setImageUrls 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 커스텀 데이터 변경 핸들러
  // @description 커스텀 데이터 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleCustomChange = useCallback(
    (custom: { [key: string]: any }) => {
      const safeCustom = custom || {}; // @type {Object} - Fallback: 빈 객체
      // @description 커스텀 데이터 추출, 없으면 빈 객체
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleCustomChange - Custom:', safeCustom); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setCustom(safeCustom); // @description 스토어에 커스텀 데이터 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setCustom]
  ); // @description setCustom 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 드래프트 ID 변경 핸들러
  // @description 드래프트 ID 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleDraftIdChange = useCallback(
    (id: string) => {
      const safeId = id || ''; // @type {string} - Fallback: 빈 문자열
      // @description 드래프트 ID 추출, 없으면 빈 문자열
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleDraftIdChange - ID:', safeId); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setDraftId(safeId); // @description 스토어에 드래프트 ID 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setDraftId]
  ); // @description setDraftId 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 임시저장 여부 변경 핸들러
  // @description 임시저장 여부 입력 이벤트를 처리하고 스토어 업데이트
  // @reason 사용자 입력을 실시간으로 반영
  const handleIsTemporaryChange = useCallback(
    (isTemp: boolean) => {
      const safeIsTemp = isTemp || false; // @type {boolean} - Fallback: false
      // @description 임시저장 여부 추출, 없으면 false
      // @reason 입력값이 유효하지 않을 경우 애플리케이션 충돌 방지
      console.log('handleIsTemporaryChange - IsTemporary:', safeIsTemp); // @description 디버깅용 로그
      // @description 입력값 디버깅
      // @reason 입력값 확인
      setIsTemporary(safeIsTemp); // @description 스토어에 임시저장 여부 업데이트
      // @reason 사용자 입력을 스토어에 반영
    },
    [setIsTemporary]
  ); // @description setIsTemporary 의존성 추가
  // @reason useCallback으로 메모이제이션, 불필요한 재생성 방지

  // 핸들러 객체 반환
  // @description 모든 핸들러 함수를 객체로 반환
  // @reason 컴포넌트에서 필요한 핸들러를 쉽게 사용 가능
  return {
    handleTitleChange, // @type {Function} - 제목 변경 핸들러
    handleDescChange, // @type {Function} - 설명 변경 핸들러
    handleContentChange, // @type {Function} - 본문 변경 핸들러
    handleTagsChange, // @type {Function} - 태그 변경 핸들러
    handleImageUrlsChange, // @type {Function} - 이미지 URL 변경 핸들러
    handleCustomChange, // @type {Function} - 커스텀 데이터 변경 핸들러
    handleDraftIdChange, // @type {Function} - 드래프트 ID 변경 핸들러
    handleIsTemporaryChange, // @type {Function} - 임시저장 여부 변경 핸들러
  };
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 이벤트 처리 및 상태 업데이트 가능
// @analogy 도서관에서 대여 기록 입력 창구를 공유
export default useCustomDataHandler;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useDraftStore` 훅 호출: Zustand 스토어에서 Setter 함수 가져옴.
// 3. `useCallback`으로 각 핸들러 함수 생성: 입력 이벤트 처리 및 스토어 업데이트.
// 4. 각 핸들러는 입력값을 안전하게 처리(Fallback) 후 스토어 업데이트.
// 5. `console.log`로 디버깅 가능하도록 출력.
// 6. 핸들러 객체 반환: 컴포넌트에서 사용 가능.
// 7. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 8. 컴포넌트에서 `useCustomDataHandler`를 사용하여 이벤트 처리 및 스토어 업데이트.
// @reason 이벤트 처리와 상태 업데이트 로직을 중앙에서 관리하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 대여 기록 입력 창구를 통해 데이터를 처리.

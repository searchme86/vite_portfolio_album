/**
 * @file useImagePreview.ts
 * @description 이미지 미리보기 상태와 로직을 관리하는 커스텀 훅
 * @reason 미리보기 상태 관리 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진 미리보기를 관리하는 시스템
 */

import { useState, useEffect } from 'react'; // @type {Function} - React 훅
// @description useState와 useEffect 훅 가져오기
// @reason 미리보기 상태 관리 및 초기화
// @analogy 도서관에서 미리보기 상태를 관리하는 도구 사용

import useDraftStore from '../../../../stores/draft/draftStore'; // @type {Object} - Zustand 스토어
// @description Zustand 스토어 가져오기
// @reason 드래프트 데이터 상태 업데이트
// @analogy 도서관에서 중앙 기록 시스템에 접근

// 드래프트 데이터 타입 정의 (draftStore.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
interface DraftState {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 태그 배열
  imageUrls: string[]; // @type {string[]} - 이미지 URL 배열
  custom: { [key: string]: any }; // @type {Object} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date; // @type {Date} - 생성 시간
  updatedAt: Date; // @type {Date} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
  updateDraft: (draft: DraftState) => void; // @type {Function} - 드래프트 업데이트 함수
}

// 커스텀 훅 정의
// @description 미리보기 상태와 이미지 목록 관리
// @reason 미리보기 상태 캡슐화 및 로직 제공
// @analogy 도서관에서 사진 미리보기 상태 관리
const useImagePreview = (imageUrls: string[]) => {
  const [currentImage, setCurrentImage] = useState<string | null>(null); // @type {string | null} - 현재 선택된 이미지 URL
  // @description 현재 선택된 이미지 상태 관리
  // @reason 미리보기 영역에 표시할 이미지 지정

  // Zustand 스토어에서 드래프트 업데이트 함수 가져오기
  // @description 스토어에서 드래프트 업데이트 함수 추출
  // @reason 이미지 목록 변경 시 상태 동기화
  const updateDraft = useDraftStore((state: DraftState) => state.updateDraft); // @type {Function} - 드래프트 업데이트 함수
  // @description Zustand 스토어의 업데이트 함수 가져오기
  // @reason 이미지 목록 업데이트 후 스토어 동기화

  // 초기 선택 이미지 설정
  // @description 이미지 목록이 있을 경우 첫 번째 이미지 선택
  // @reason 사용자 경험 개선
  useEffect(() => {
    if (imageUrls.length > 0 && !currentImage) {
      setCurrentImage(imageUrls[0]); // @description 첫 번째 이미지 선택
      // @reason 초기 미리보기 이미지 설정
      // @analogy 도서관에서 첫 번째 사진을 기본으로 미리 보기
    } else if (imageUrls.length === 0) {
      setCurrentImage(null); // @description 이미지 목록이 없으면 null 설정
      // @reason 미리보기 초기화
    }
  }, [imageUrls, currentImage]); // @description imageUrls와 currentImage 의존성 추가
  // @reason 이미지 목록 변경 시 초기화 트리거

  // 이미지 삭제 함수
  // @description 특정 이미지를 목록에서 삭제
  // @reason 사용자가 불필요한 이미지 제거
  const removeImage = (url: string) => {
    try {
      console.log('useImagePreview - Removing image:', url); // @description 디버깅용 로그
      // @description 이미지 삭제 디버깅
      // @reason 삭제 상태 확인

      // 새로운 이미지 목록 생성
      // @description 삭제할 이미지를 제외한 목록 생성
      // @reason 스토어 상태 업데이트 준비
      const updatedImageUrls = imageUrls.filter((imageUrl) => imageUrl !== url); // @type {string[]} - 필터링된 이미지 URL 목록
      // @description 삭제할 URL 제외
      // @reason 이미지 목록 갱신

      // 드래프트 상태 업데이트
      // @description 새로운 이미지 목록으로 스토어 업데이트
      // @reason 삭제된 이미지 반영
      const updatedDraft = {
        imageUrls: updatedImageUrls, // @type {string[]} - 업데이트된 이미지 URL 목록
        updatedAt: new Date(), // @type {Date} - 수정 시간 업데이트
      }; // @description 업데이트된 드래프트 데이터 생성
      // @reason 최신 상태로 저장

      updateDraft(updatedDraft); // @description 스토어 상태 업데이트
      // @reason 삭제 후 스토어 동기화

      // 현재 선택된 이미지가 삭제된 경우 초기화
      // @description 삭제된 이미지가 현재 선택된 이미지라면 null 설정
      // @reason 미리보기 상태 일관성 유지
      if (currentImage === url) {
        setCurrentImage(
          updatedImageUrls.length > 0 ? updatedImageUrls[0] : null
        ); // @type {string | null} - Fallback: null
        // @description 다음 이미지 선택 또는 null 설정
        // @reason 사용자 경험 유지
      }
    } catch (err) {
      console.error('useImagePreview - Remove failed:', err); // @description 에러 로그
      // @description 삭제 실패 디버깅
      // @reason 문제 해결 지원

      // Fallback 처리: 에러 발생 시 스토어 상태 유지
      // @description 에러 발생 시 기존 상태 유지
      // @reason 애플리케이션 충돌 방지
      const fallbackDraft = {
        imageUrls: imageUrls || [], // @type {string[]} - Fallback: 기존 목록
        updatedAt: new Date(), // @type {Date} - 수정 시간 업데이트
      }; // @description 기본 드래프트 데이터 생성
      // @reason 에러 발생 시 기본값 제공

      updateDraft(fallbackDraft); // @description 기본 데이터로 스토어 상태 업데이트
      // @reason 에러 발생 시 데이터 복구
    }
  };

  return { currentImage, setCurrentImage, removeImage }; // @type {Object} - 미리보기 상태와 함수 반환
  // @description 현재 이미지, 설정 함수, 삭제 함수 반환
  // @reason 컴포넌트에서 미리보기 상태와 기능 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 미리보기 상태 관리 기능 사용 가능
// @analogy 도서관에서 사진 미리보기 시스템을 공유
export default useImagePreview;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useState`로 `currentImage` 상태 관리: 현재 선택된 이미지 추적.
// 3. `useEffect`로 초기 이미지 설정: 이미지 목록 변경 시 첫 번째 이미지 선택.
// 4. `removeImage` 함수 정의: 이미지 삭제 및 스토어 상태 업데이트.
// 5. `console.log`와 `console.error`로 디버깅 가능하도록 출력.
// 6. 에러 발생 시 Fallback 처리: 기존 상태 유지.
// 7. `currentImage`, `setCurrentImage`, `removeImage` 반환: 컴포넌트에서 상태와 함수 사용 가능.
// @reason 미리보기 상태와 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 사진 미리보기를 관리.

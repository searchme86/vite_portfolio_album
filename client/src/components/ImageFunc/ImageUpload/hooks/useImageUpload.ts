/**
 * @file useImageUpload.ts
 * @description 이미지 파일을 업로드하고 상태를 관리하는 커스텀 훅
 * @reason 이미지 업로드 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진을 업로드하고 기록하는 시스템
 */

import { useState } from 'react'; // @type {Function} - React 훅
// @description useState 훅 가져오기
// @reason 업로드 상태 관리
// @analogy 도서관에서 업로드 상태를 관리하는 도구 사용

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
// @description 이미지 파일 업로드 및 상태 관리
// @reason 이미지 업로드 로직 캡슐화
// @analogy 도서관에서 사진 업로드 로직 관리
const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false); // @type {boolean} - 업로드 중 여부
  // @description 업로드 상태 관리
  // @reason UI에서 업로드 상태 표시

  const [error, setError] = useState<string | null>(null); // @type {string | null} - 에러 메시지
  // @description 에러 상태 관리
  // @reason 사용자에게 업로드 실패 알림

  // Zustand 스토어에서 드래프트 데이터와 업데이트 함수 가져오기
  // @description 스토어에서 이미지 URL 목록과 업데이트 함수 추출
  // @reason 업로드된 이미지 URL 저장 및 상태 동기화
  const { imageUrls, updateDraft } = useDraftStore((state: DraftState) => ({
    imageUrls: state.imageUrls || [], // @type {string[]} - Fallback: 빈 배열
    updateDraft: state.updateDraft, // @type {Function} - 드래프트 업데이트 함수
  })); // @description Zustand 스토어에서 필요한 값 추출
  // @reason 업로드 후 상태 동기화
  // @analogy 도서관에서 사진 목록과 기록 업데이트 도구 가져오기

  // 이미지 업로드 함수
  // @description 이미지 파일을 업로드하고 URL 저장
  // @reason 사용자가 선택한 이미지 파일 처리
  const handleImageUpload = async (file: File) => {
    try {
      setIsUploading(true); // @description 업로드 상태를 true로 설정
      // @reason 사용자에게 업로드 중임을 알림
      setError(null); // @description 에러 상태 초기화
      // @reason 새로운 업로드 시 이전 에러 제거

      console.log('useImageUpload - Uploading file:', file.name); // @description 디버깅용 로그
      // @description 업로드 파일 디버깅
      // @reason 업로드 상태 확인

      // 파일 형식 및 크기 검증
      // @description 파일이 이미지 형식인지 확인
      // @reason 잘못된 파일 업로드 방지
      if (!file.type.startsWith('image/')) {
        throw new Error('이미지 파일만 업로드 가능합니다.'); // @description 에러 발생
        // @reason 사용자에게 잘못된 파일 형식 알림
      }

      // 파일 크기 제한 (5MB)
      // @description 파일 크기 제한 확인
      // @reason 과도한 파일 크기로 인한 문제 방지
      const maxSizeInBytes = 5 * 1024 * 1024; // @type {number} - 5MB
      if (file.size > maxSizeInBytes) {
        throw new Error('파일 크기는 5MB를 초과할 수 없습니다.'); // @description 에러 발생
        // @reason 사용자에게 파일 크기 제한 알림
      }

      // TODO: 실제 서버 업로드 로직 (예: AWS S3, Firebase Storage)
      // @description 실제 업로드 로직 (현재는 더미 URL로 대체)
      // @reason 업로드 기능 구현 예정
      // @analogy 도서관에서 사진을 저장소에 업로드
      await new Promise((resolve) => setTimeout(resolve, 1000)); // @description 가짜 지연
      // @reason 업로드 작업 시뮬레이션

      // 더미 URL 생성 (실제 구현에서는 서버 응답으로 대체)
      // @description 업로드된 이미지의 URL 시뮬레이션
      // @reason 테스트 및 개발 용이성
      const imageUrl = URL.createObjectURL(file); // @type {string} - 로컬 URL 생성
      // @description 파일 객체를 URL로 변환
      // @reason 브라우저에서 이미지 표시 가능

      // 드래프트 상태 업데이트
      // @description 새로운 이미지 URL을 스토어에 추가
      // @reason 업로드된 이미지 상태 저장
      const updatedDraft = {
        imageUrls: [...imageUrls, imageUrl], // @type {string[]} - 기존 URL에 새 URL 추가
        updatedAt: new Date(), // @type {Date} - 수정 시간 업데이트
      }; // @description 업데이트된 드래프트 데이터 생성
      // @reason 최신 상태로 저장

      updateDraft(updatedDraft); // @description 스토어 상태 업데이트
      // @reason 업로드 후 스토어 동기화
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.'; // @type {string} - Fallback: 기본 메시지
      // @description 에러 메시지 추출 또는 기본 메시지 설정
      // @reason 사용자 피드백 제공
      setError(errorMessage); // @description 에러 상태 업데이트
      // @reason 사용자에게 에러 알림
      console.error('useImageUpload - Upload failed:', err); // @description 에러 로그
      // @description 업로드 실패 디버깅
      // @reason 문제 해결 지원
    } finally {
      setIsUploading(false); // @description 업로드 상태를 false로 설정
      // @reason 업로드 완료 후 상태 복구
    }
  };

  return { handleImageUpload, isUploading, error }; // @type {Object} - 업로드 함수와 상태 반환
  // @description 이미지 업로드 함수와 상태 반환
  // @reason 컴포넌트에서 업로드 기능 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 이미지 업로드 기능 사용 가능
// @analogy 도서관에서 사진 업로드 시스템을 공유
export default useImageUpload;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useState`로 `isUploading`과 `error` 상태 관리: 업로드 상태와 에러 추적.
// 3. `useDraftStore` 훅 호출: Zustand 스토어에서 이미지 URL과 업데이트 함수 가져옴.
// 4. `handleImageUpload` 함수 정의: 파일 검증, 업로드, 스토어 업데이트.
// 5. 파일 형식 및 크기 검증: 잘못된 파일 업로드 방지.
// 6. 더미 URL 생성: 실제 서버 업로드 전 테스트 용도.
// 7. 에러 발생 시 Fallback 처리: 사용자에게 에러 메시지 제공.
// 8. `isUploading`, `error`, `handleImageUpload` 반환: 컴포넌트에서 상태와 함수 사용 가능.
// @reason 이미지 업로드 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 사진을 업로드하고 기록.

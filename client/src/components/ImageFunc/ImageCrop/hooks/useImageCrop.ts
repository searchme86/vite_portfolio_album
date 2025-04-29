/**
 * @file useImageCrop.ts
 * @description 이미지 크롭 상태와 로직을 관리하는 커스텀 훅
 * @reason 크롭 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진 자르기 로직 관리
 */

import { useState } from 'react'; // @type {Function} - React 훅
// @description useState 훅 가져오기
// @reason 크롭 상태 관리
// @analogy 도서관에서 크롭 상태를 관리하는 도구 사용

import { PixelCrop } from 'react-image-crop'; // @type {Object} - React Crop 타입
// @description PixelCrop 타입 가져오기
// @reason 크롭 상태 타입 정의
// @analogy 도서관에서 자르기 영역 정의 도구 가져오기

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
// @description 이미지 크롭 상태와 로직 관리
// @reason 크롭 상태 캡슐화 및 로직 제공
// @analogy 도서관에서 사진 자르기 로직 관리
const useImageCrop = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // @type {string | null} - 선택된 이미지 URL
  // @description 현재 선택된 이미지 상태 관리
  // @reason 크롭할 이미지 지정

  const [crop, setCrop] = useState<PixelCrop | undefined>(undefined); // @type {PixelCrop | undefined} - 크롭 상태
  // @description 크롭 영역 상태 관리
  // @reason 사용자 크롭 조정 반영

  const [croppedImage, setCroppedImage] = useState<string | null>(null); // @type {string | null} - 크롭된 이미지 URL
  // @description 크롭된 이미지 결과 관리
  // @reason 크롭 결과 저장 및 표시

  const [isCropping, setIsCropping] = useState<boolean>(false); // @type {boolean} - 크롭 중 여부
  // @description 크롭 진행 상태 관리
  // @reason UI에서 크롭 상태 표시

  const [error, setError] = useState<string | null>(null); // @type {string | null} - 에러 메시지
  // @description 에러 상태 관리
  // @reason 사용자에게 크롭 실패 알림

  // Zustand 스토어에서 드래프트 데이터와 업데이트 함수 가져오기
  // @description 스토어에서 이미지 URL 목록과 업데이트 함수 추출
  // @reason 크롭된 이미지 URL 저장 및 상태 동기화
  const { imageUrls, updateDraft } = useDraftStore((state: DraftState) => ({
    imageUrls: state.imageUrls || [], // @type {string[]} - Fallback: 빈 배열
    updateDraft: state.updateDraft, // @type {Function} - 드래프트 업데이트 함수
  })); // @description Zustand 스토어에서 필요한 값 추출
  // @reason 크롭 후 상태 동기화
  // @analogy 도서관에서 사진 목록과 기록 업데이트 도구 가져오기

  // 크롭 완료 핸들러
  // @description 크롭 완료 시 호출
  // @reason 크롭된 이미지를 저장하고 스토어 업데이트
  const handleCropComplete = async (croppedImageUrl: string) => {
    try {
      setIsCropping(true); // @description 크롭 상태를 true로 설정
      // @reason 사용자에게 크롭 중임을 알림
      setError(null); // @description 에러 상태 초기화
      // @reason 새로운 크롭 시 이전 에러 제거

      console.log('useImageCrop - Cropping complete, URL:', croppedImageUrl); // @description 디버깅용 로그
      // @description 크롭 완료 디버깅
      // @reason 크롭 상태 확인

      // 선택된 이미지 교체
      // @description 기존 이미지를 크롭된 이미지로 교체
      // @reason 크롭된 결과를 반영
      if (!selectedImage) {
        throw new Error('선택된 이미지가 없습니다.'); // @description 에러 발생
        // @reason 사용자에게 이미지 누락 알림
      }

      const updatedImageUrls = imageUrls.map((url) =>
        url === selectedImage ? croppedImageUrl : url
      ); // @type {string[]} - 크롭된 이미지로 교체
      // @description 선택된 이미지 URL을 크롭된 URL로 교체
      // @reason 이미지 목록 갱신

      // 드래프트 상태 업데이트
      // @description 새로운 이미지 목록으로 스토어 업데이트
      // @reason 크롭된 이미지 반영
      const updatedDraft = {
        imageUrls: updatedImageUrls, // @type {string[]} - 업데이트된 이미지 URL 목록
        updatedAt: new Date(), // @type {Date} - 수정 시간 업데이트
      }; // @description 업데이트된 드래프트 데이터 생성
      // @reason 최신 상태로 저장

      updateDraft(updatedDraft); // @description 스토어 상태 업데이트
      // @reason 크롭 후 스토어 동기화

      setCroppedImage(croppedImageUrl); // @description 크롭된 이미지 상태 업데이트
      // @reason 크롭 결과 표시
      setSelectedImage(null); // @description 선택된 이미지 초기화
      // @reason 크롭 완료 후 선택 상태 리셋
      setCrop(undefined); // @description 크롭 상태 초기화
      // @reason 다음 크롭 준비
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '이미지 크롭에 실패했습니다.'; // @type {string} - Fallback: 기본 메시지
      // @description 에러 메시지 추출 또는 기본 메시지 설정
      // @reason 사용자 피드백 제공
      setError(errorMessage); // @description 에러 상태 업데이트
      // @reason 사용자에게 에러 알림
      console.error('useImageCrop - Crop failed:', err); // @description 에러 로그
      // @description 크롭 실패 디버깅
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
    } finally {
      setIsCropping(false); // @description 크롭 상태를 false로 설정
      // @reason 크롭 완료 후 상태 복구
    }
  };

  return {
    selectedImage,
    setSelectedImage,
    crop,
    setCrop,
    handleCropComplete,
    croppedImage,
    isCropping,
    error,
  }; // @type {Object} - 크롭 상태와 함수 반환
  // @description 크롭 관련 상태와 함수 반환
  // @reason 컴포넌트에서 크롭 기능 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 크롭 기능 사용 가능
// @analogy 도서관에서 사진 크롭 시스템을 공유
export default useImageCrop;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useState`로 상태 관리: `selectedImage`, `crop`, `croppedImage`, `isCropping`, `error` 상태 추적.
// 3. `useDraftStore` 훅 호출: Zustand 스토어에서 이미지 URL과 업데이트 함수 가져옴.
// 4. `handleCropComplete` 함수 정의: 크롭 완료 시 이미지 교체 및 스토어 업데이트.
// 5. 에러 발생 시 Fallback 처리: 기존 상태 유지 및 사용자 피드백 제공.
// 6. `selectedImage`, `setSelectedImage`, `crop`, `setCrop`, `handleCropComplete`, `croppedImage`, `isCropping`, `error` 반환: 컴포넌트에서 상태와 함수 사용 가능.
// @reason 크롭 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 사진을 자르고 결과를 관리.

import { useCallback } from 'react'; // @type {Function} - React 훅
// @description 함수 안정화 도구
// @reason 재사용성 보장
import { useImageUploadStore } from '@/stores/imageUploadStore'; // @type {Function} - Zustand 스토어 훅
// @description 이미지 업로드 상태 관리
// @reason 데이터 접근

//====여기부터 수정됨====
interface ImageItem {
  url: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새 이미지인지 확인
  // @reason 상태 관리
}

// Zustand 스토어의 타입 정의
interface ImageUploadState {
  imageUrls: ImageItem[]; // @type {ImageItem[]} - 이미지 URL 배열
  // @description 스토어에서 관리되는 이미지 목록
  // @reason 상태 구조화
  minImages: number; // @type {number} - 최소 이미지 수
  // @description 스토어에서 관리되는 최소 이미지 수
  // @reason 규칙 적용
  setImageUrls: (urls: ImageItem[]) => void; // @type {(urls: ImageItem[]) => void} - 이미지 URL 설정 함수
  // @description 이미지 목록 업데이트
  // @reason 상태 변경
}

export default function useImagePreviewEventHandling() {
  const imageUrls = useImageUploadStore(
    (state: ImageUploadState) => state.imageUrls || []
  ); // @type {ImageItem[]} - 이미지 URL 배열
  // @description Zustand 스토어에서 이미지 URL 가져오기, 없으면 빈 배열
  // @reason 상태 접근
  // @why ImageItem 적용: 타입 안전성 보장, imageUrls가 ImageItem[] 형태임을 명확히 함
  const setImageUrls = useImageUploadStore(
    (state: ImageUploadState) => state.setImageUrls
  ); // @type {(urls: ImageItem[]) => void} - 이미지 URL 설정 함수
  // @description Zustand 스토어에서 이미지 URL 업데이트 함수 가져오기
  // @reason 상태 변경
  // @why ImageItem 적용: setImageUrls가 ImageItem[]을 인자로 받음을 명확히 함

  const handleRemoveImage = useCallback(
    (index: number) => {
      if (index < 0 || index >= imageUrls.length) {
        console.warn('Invalid index for removal:', index); // @type {void} - 경고 로그
        // @description 잘못된 인덱스 처리
        // @reason 에러 방지
        return;
      }

      const updatedUrls = imageUrls.filter((_, i) => i !== index); // @type {ImageItem[]} - 필터링된 이미지 목록
      // @description 인덱스에 해당하는 이미지 제거
      // @reason 이미지 삭제

      setImageUrls(updatedUrls); // @type {void} - Zustand 스토어에 업데이트된 이미지 목록 저장
      // @description 새로운 이미지 목록으로 상태 업데이트
      // @reason UI 반영
    },
    [imageUrls, setImageUrls] // @description 의존성 배열
    // @reason imageUrls와 setImageUrls 변경 시 함수 재생성
  );

  return { handleRemoveImage }; // @type {{ handleRemoveImage: (index: number) => void }} - 이벤트 핸들러 객체
  // @description 삭제 핸들러 반환
  // @reason 상위 사용
}
//====여기까지 수정됨====

import { useState } from 'react'; // @type {Function} - React 상태 훅
// @description 상태 관리 도구
// @reason 상태 추출
import { useImageManagementStore } from './imageManagementStore'; // @type {Function} - Zustand 스토어
// @description 이미지 관리 스토어 접근
// @reason 상태 사용

interface ImageItem {
  url: string; // @type {string} - 이미지 URL
  // @description 이미지 주소
  // @reason 표시
  isNew: boolean; // @type {boolean} - 새 이미지 여부
  // @description 새 이미지인지 확인
  // @reason 상태 관리
}

interface ImageManagementState {
  imageUrls: ImageItem[]; // @type {ImageItem[]} - 이미지 URL 배열
  // @description 스토어에서 관리되는 이미지 목록
  // @reason 상태 구조화
  minImages: number; // @type {number} - 최소 이미지 수
  // @description 스토어에서 관리되는 최소 이미지 수
  // @reason 규칙 적용
}

export const useGetImageManagementState = <T>(
  selector: (state: ImageManagementState) => T
): T => {
  const state = useImageManagementStore(selector); // @type {T} - 선택된 상태
  // @description 스토어에서 선택된 상태 가져오기
  // @reason 상태 추출
  const [value] = useState(state); // @type {T} - 상태 값
  // @description 상태를 React 상태로 캐싱
  // @reason 안정성 보장

  return value; // @type {T} - 반환된 상태
  // @description 선택된 상태 반환
  // @reason 상위 사용
};

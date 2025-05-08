import { create } from 'zustand'; // @type {Function} - Zustand 스토어 생성 함수
// @description Zustand 스토어 생성 도구
// @reason 상태 관리
import { persist, createJSONStorage } from 'zustand/middleware'; // @type {Function} - Zustand 미들웨어
// @description 상태를 영속적으로 저장
// @reason 리프레쉬 후 상태 유지
import { setImageUrls, setMinImages } from './imageManagementSetters'; // @type {Function} - 상태 setter
// @description 상태 setter 가져오기
// @reason 상태 변경
import { initialImageManagementState } from './initialImageManagementState'; // @type {Object} - 초기 상태
// @description 초기 상태 정의 가져오기
// @reason 상태 초기화

interface ImageManagementState {
  imageUrls: { url: string; isNew: boolean }[]; // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
  // @description 스토어에서 관리되는 이미지 목록
  // @reason 상태 구조화
  minImages: number; // @type {number} - 최소 이미지 수
  // @description 스토어에서 관리되는 최소 이미지 수
  // @reason 규칙 적용
  setImageUrls: (urls: { url: string; isNew: boolean }[]) => void; // @type {(urls: { url: string; isNew: boolean }[]) => void} - 이미지 URL 설정 함수
  // @description 이미지 목록 업데이트 함수
  // @reason 상태 변경
  setMinImages: (count: number) => void; // @type {(count: number) => void} - 최소 이미지 수 설정 함수
  // @description 최소 이미지 수 업데이트 함수
  // @reason 상태 변경
}

export const useImageManagementStore = create<
  ImageManagementState,
  [['zustand/persist', unknown]]
>(
  persist(
    (set) => ({
      ...initialImageManagementState,
      setImageUrls: setImageUrls(set),
      setMinImages: setMinImages(set),
    }),
    {
      name: 'image-management-store', // @type {string} - 스토리지 키
      // @description localStorage에 저장될 키 이름
      // @reason 상태 영속성
      storage: createJSONStorage(() => localStorage), // @type {Storage} - 스토리지 타입
      // @description localStorage 사용
      // @reason 브라우저 리프레쉬 후 상태 복원
    }
  )
);

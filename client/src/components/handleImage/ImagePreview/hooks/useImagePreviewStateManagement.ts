// import { useCallback } from 'react'; // @type {Function} - React 훅
// // @description 함수 안정화 도구
// // @reason 재사용성 보장
// import { useImageUploadStore } from '@/stores/imageUploadStore'; // @type {Function} - Zustand 스토어 훅
// // @description 이미지 업로드 상태 관리
// // @reason 데이터 접근

// // Zustand 스토어 상태 타입 정의
// interface ImageUploadState {
//   imageUrls: { url: string; isNew: boolean }[]; // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
//   // @description 스토어에서 관리되는 이미지 목록
//   // @reason 상태 구조화
//   minImages: number; // @type {number} - 최소 이미지 수
//   // @description 스토어에서 관리되는 최소 이미지 수
//   // @reason 규칙 적용
// }

// export default function useImagePreviewStateManagement() {
//   const selectImageUploadStore = useCallback(
//     (state: ImageUploadState) => ({
//       imageUrls: state.imageUrls || [], // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
//       // @description 스토어에서 이미지 URL 가져오기, 없으면 빈 배열
//       // @reason fallback 제공
//       minImages: state.minImages || 1, // @type {number} - 최소 이미지 수
//       // @description 스토어에서 최소 이미지 수 가져오기, 없으면 1
//       // @reason fallback 제공
//     }),
//     [] // @description 빈 의존성 배열
//     // @reason 안정적 참조 보장
//   );

//   const imageUploadStore = useImageUploadStore(selectImageUploadStore); // @type {ImageUploadState} - Zustand 스토어 데이터
//   // @description 안정화된 selector로 상태 선택
//   // @reason 불필요한 리렌더링 방지

//   return imageUploadStore; // @type {ImageUploadState} - 반환된 상태
//   // @description 상태 객체 반환
//   // @reason 상위 사용
// }

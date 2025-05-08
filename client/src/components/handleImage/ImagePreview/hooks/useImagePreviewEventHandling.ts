// import { useCallback } from 'react'; // @type {Function} - React 훅
// // @description 함수 안정화 도구
// // @reason 재사용성 보장
// import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore'; // @type {Function} - Zustand 스토어
// // @description 이미지 관리 스토어 접근
// // @reason 상태 사용
// import { useGetImageManagementState } from '@/stores/imageManagement/useGetImageManagementState'; // @type {Function} - 이미지 상태 가져오기 훅
// // @description 이미지 상태 관리
// // @reason 상태 분리

// export default function useImagePreviewEventHandling() {
//   const imageUrls = useGetImageManagementState(
//     (state) => state.imageUrls || []
//   ); // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
//   // @description Zustand 스토어에서 이미지 URL 가져오기, 없으면 빈 배열
//   // @reason 상태 접근
//   // @why: 타입 안전성 보장, imageUrls가 { url: string; isNew: boolean }[] 형태임을 명확히 함
//   const setImageUrls = useImageManagementStore((state) => state.setImageUrls); // @type {(urls: { url: string; isNew: boolean }[]) => void} - 이미지 URL 설정 함수
//   // @description Zustand 스토어에서 이미지 URL 업데이트 함수 가져오기
//   // @reason 상태 변경
//   // @why: setImageUrls가 { url: string; isNew: boolean }[]을 인자로 받음을 명확히 함

//   const handleRemoveImage = useCallback(
//     (index: number) => {
//       if (index < 0 || index >= imageUrls.length) {
//         console.warn('Invalid index for removal:', index); // @type {void} - 경고 로그
//         // @description 잘못된 인덱스 처리
//         // @reason 에러 방지
//         return;
//       }

//       const updatedUrls = imageUrls.filter((_, i) => i !== index); // @type {{ url: string; isNew: boolean }[]} - 필터링된 이미지 목록
//       // @description 인덱스에 해당하는 이미지 제거
//       // @reason 이미지 삭제

//       setImageUrls(updatedUrls); // @type {void} - Zustand 스토어에 업데이트된 이미지 목록 저장
//       // @description 새로운 이미지 목록으로 상태 업데이트
//       // @reason UI 반영
//     },
//     [imageUrls, setImageUrls] // @description 의존성 배열
//     // @reason imageUrls와 setImageUrls 변경 시 함수 재생성
//   );

//   return { handleRemoveImage }; // @type {{ handleRemoveImage: (index: number) => void }} - 이벤트 핸들러 객체
//   // @description 삭제 핸들러 반환
//   // @reason 상위 사용
// }

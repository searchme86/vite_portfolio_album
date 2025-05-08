import { useCallback } from 'react'; // @type {Function} - React 훅
// @description 함수 안정화 도구
// @reason 재사용성 보장

export default function useImagePreviewEventHandling(
  onDelete: (index: number) => void
) {
  const handleRemoveImage = useCallback(
    (index: number) => {
      onDelete(index); // @type {void} - 상위 컴포넌트로 삭제 요청 위임
      // @description 인덱스 기반 삭제 로직 위임
      // @reason 무한 루프 방지
    },
    [onDelete] // @description 의존성 배열
    // @reason onDelete 변경 시 함수 재생성
  );

  return { handleRemoveImage }; // @type {{ handleRemoveImage: (index: number) => void }} - 이벤트 핸들러 객체
  // @description 삭제 핸들러 반환
  // @reason 상위 사용
}

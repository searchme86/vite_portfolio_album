import { useMemo, useEffect } from 'react';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

// useImageFilePreviewUrls: 미리보기 URL 관리 훅
// 의미: 미리보기 URL 생성 및 메모리 정리
// 이유: 메모리 누수 방지 및 연산 최적화
export function useImageFilePreviewUrls() {
  const { tempFiles, imageUrls } = useImageManagementStore(); // @type {{ tempFiles: File[], imageUrls: ImageUrl[] }}
  // @description Zustand 상태에서 임시 파일과 업로드된 이미지 가져오기
  // @reason 데이터 접근

  // previewUrls: 임시 파일의 미리보기 URL 생성
  // 의미: 임시 파일을 기반으로 URL 생성
  // 이유: 미리보기 표시
  const previewUrls = useMemo(() => {
    return (
      (tempFiles || [])
        .filter((file): file is File => file instanceof File)
        // 의미: tempFiles에서 유효한 File 객체만 골라냄
        // 이유: null/손상 데이터로 인해 createObjectURL 실패 방지
        .map((file) => URL.createObjectURL(file))
    ); // @type {string[]}
    // @description File 객체를 URL로 변환
    // @reason 브라우저에서 미리보기 가능
  }, [tempFiles]);

  // formattedImageUrls: 업로드된 이미지 URL 추출
  // 의미: imageUrls에서 URL만 추출
  // 이유: 미리보기 표시용 데이터 정제
  const formattedImageUrls = useMemo(() => {
    return (imageUrls || []).map((img) => img.url); // @type {string[]}
    // @description imageUrls에서 URL만 추출, 기본값으로 빈 배열 설정
    // @reason undefined 방지 및 데이터 정제
  }, [imageUrls]);

  // 메모리 정리
  // 의미: 생성된 URL 해제
  // 이유: 메모리 누수 방지
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url)); // @type {void}
      // @description Blob URL 해제
      // @reason 메모리 누수 방지
    };
  }, [previewUrls]);

  return { previewUrls, formattedImageUrls };
}

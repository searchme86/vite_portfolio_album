// usePrepareExistingFileNames 훅: 기존 파일명 추출 및 중복 확인 준비
// 단일 책임: 현재 이미지 URL과 파일명 추출 로직 제공
import { useImageUploadStore, ImageUrl } from '@/stores/imageUploadStore';
import useExtractFileName from './useExtractFileName';

function usePrepareExistingFileNames(): {
  prepareExistingFileNames: () => {
    currentUrls: string[];
    existingBaseNames: string[];
  };
} {
  const { imageUrls } = useImageUploadStore();
  const { extractFileNameFromUrl } = useExtractFileName();

  // prepareExistingFileNames 함수: 현재 URL과 파일명 준비
  // 의미: 중복 확인을 위한 데이터 생성
  // 이유: 업로드 파일 검증
  const prepareExistingFileNames = (): {
    currentUrls: string[];
    existingBaseNames: string[];
  } => {
    const safeImageUrls = Array.isArray(imageUrls) ? imageUrls : [];
    // 타입: ImageUrl[] - 안전한 이미지 URL 배열
    // 의미: null/undefined 방지
    // 이유: 타입 안전성

    const currentUrls = safeImageUrls.map((item: ImageUrl) => item.url || '');
    // 타입: string[] - 현재 URL 배열
    // 의미: URL 추출
    // 이유: 중복 확인 준비

    const existingBaseNames = safeImageUrls.map((item: ImageUrl) => {
      const fileName = extractFileNameFromUrl(item.url || '');
      // 타입: string - 파일명
      // 의미: URL에서 파일명 추출
      // 이유: 중복 확인용

      const lastDotIndex = fileName.lastIndexOf('.');
      const extension =
        lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
      // 타입: string - 파일 확장자
      // 의미: 확장자 추출
      // 이유: 기본 파일명 생성

      const nameWithoutExtension =
        lastDotIndex !== -1 ? fileName.substring(0, lastDotIndex) : fileName;
      // 타입: string - 확장자 제외 파일명
      // 의미: 파일명 분리
      // 이유: 기본 파일명 생성

      const firstUnderscoreIndex = nameWithoutExtension.indexOf('_');
      const baseName =
        firstUnderscoreIndex !== -1
          ? nameWithoutExtension.substring(0, firstUnderscoreIndex) + extension
          : fileName;
      // 타입: string - 기본 파일명
      // 의미: 파일명 규칙에 따라 생성
      // 이유: 중복 확인 기준

      return baseName;
    });

    return { currentUrls, existingBaseNames };
    // 타입: { currentUrls: string[], existingBaseNames: string[] }
    // 의미: 중복 확인용 데이터 반환
    // 이유: 상위 로직에 전달
  };

  return { prepareExistingFileNames };
  // 타입: { prepareExistingFileNames: () => { currentUrls: string[]; existingBaseNames: string[] } }
  // 의미: 파일명 준비 함수 반환
  // 이유: 재사용 가능성
}

export default usePrepareExistingFileNames;
//====여기까지 수정됨====

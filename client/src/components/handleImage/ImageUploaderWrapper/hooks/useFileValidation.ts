// useFileValidation 훅: 파일 중복 검증 처리
// 의미: 파일 목록에서 중복 여부 확인
// 이유: 중복 업로드 방지
interface ValidationResult {
  duplicateFiles: File[];
  newFiles: File[];
}

function useFileValidation(): {
  validateFiles: (
    files: FileList | File[],
    existingFileNames: string[]
  ) => ValidationResult;
} {
  // validateFiles 함수: 파일 중복 검증
  // 의미: 파일 목록과 기존 파일명 비교
  // 이유: 중복 파일 필터링
  const validateFiles = (
    files: FileList | File[],
    existingFileNames: string[]
  ): ValidationResult => {
    const safeFiles =
      files instanceof FileList || Array.isArray(files)
        ? Array.from(files)
        : [];
    // 타입: File[] - 안전한 파일 배열
    // 의미: FileList 또는 배열 처리
    // 이유: 일관된 배열 형태 유지

    const safeExistingFileNames = Array.isArray(existingFileNames)
      ? existingFileNames
      : [];
    // 타입: string[] - 안전한 기존 파일명 배열
    // 의미: null/undefined 방지
    // 이유: 타입 안전성

    const duplicateFiles = safeFiles.filter(
      (file) =>
        file &&
        typeof file.name === 'string' &&
        safeExistingFileNames.includes(file.name)
    );
    // 타입: File[] - 중복 파일
    // 의미: 기존 파일명과 중복 여부 확인
    // 이유: 중복 제거

    const newFiles = safeFiles.filter((file) => !duplicateFiles.includes(file));
    // 타입: File[] - 새로운 파일
    // 의미: 중복 제외 파일 추출
    // 이유: 업로드 대상 필터링

    return { duplicateFiles, newFiles };
    // 타입: ValidationResult - 검증 결과
    // 의미: 중복 및 새 파일 반환
    // 이유: 상위 로직에 전달
  };

  return { validateFiles };
  // 타입: { validateFiles: (files: FileList | File[], existingFileNames: string[]) => ValidationResult }
  // 의미: 검증 함수 반환
  // 이유: 재사용 가능성
}

export default useFileValidation;
//====여기까지 수정됨====

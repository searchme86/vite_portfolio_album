//====여기부터 수정됨====
// useFileValidation 훅: 파일 중복 검증 처리
// 단일 책임: 파일 중복 여부 확인 및 결과 반환
function useFileValidation() {
  // validateFiles 함수: 파일 중복 검증
  // files와 existingFileNames를 받아 중복 여부 확인
  const validateFiles = (files, existingFileNames) => {
    // files가 FileList 또는 배열인지 확인, 그렇지 않으면 빈 배열로 대체
    // FileList는 Array.from으로 변환 가능, 타입 오류 방지
    const safeFiles =
      files instanceof FileList || Array.isArray(files) ? files : [];
    // 디버깅: safeFiles 확인
    // files가 올바르게 처리되었는지 확인
    console.log('useFileValidation - safeFiles:', safeFiles);

    // files를 배열로 변환
    // Array.from으로 안전하게 처리
    const newFiles = Array.from(safeFiles);
    // 디버깅: newFiles 이름 확인
    // 파일 이름이 올바르게 추출되었는지 확인
    console.log(
      'useFileValidation - Files selected for upload:',
      newFiles.map((file) =>
        file && typeof file.name === 'string' ? file.name : 'unknown'
      )
    );

    // existingFileNames가 배열이 아닌 경우 빈 배열로 대체
    // includes 메서드 오류 방지
    const safeExistingFileNames = Array.isArray(existingFileNames)
      ? existingFileNames
      : [];
    // 디버깅: safeExistingFileNames 확인
    // existingFileNames가 올바르게 처리되었는지 확인
    console.log(
      'useFileValidation - safeExistingFileNames:',
      safeExistingFileNames
    );

    // 중복 파일 검증
    // safeExistingFileNames와 비교
    const duplicateFiles = newFiles.filter((file) => {
      // file 객체가 유효한지 확인
      // name 속성이 문자열인지 확인
      const localFileName =
        file && typeof file.name === 'string' ? file.name : '';
      // 디버깅: 비교 로그
      // 파일 이름 비교 과정 확인
      console.log(
        'useFileValidation - Comparing local file name:',
        localFileName,
        'with base server file names:',
        safeExistingFileNames
      );

      // 중복 여부 확인
      // includes로 파일명 비교
      const isDuplicate = safeExistingFileNames.includes(localFileName);
      // 디버깅: 중복 여부 확인
      // 중복 파일 여부 로그
      console.log(
        'useFileValidation - Is local file duplicate with server?:',
        isDuplicate
      );

      return isDuplicate;
    });

    // 디버깅: 중복 파일 결과 확인
    // 중복 파일 목록 로그
    console.log(
      'useFileValidation - Duplicate files detected:',
      duplicateFiles.map((file) =>
        file && typeof file.name === 'string' ? file.name : 'unknown'
      )
    );

    // 중복 파일과 새로운 파일 반환
    // 객체 형태로 반환, 반환값 타입 보장
    const result = {
      duplicateFiles: Array.isArray(duplicateFiles) ? duplicateFiles : [],
      newFiles: Array.isArray(newFiles) ? newFiles : [],
    };
    // 디버깅: result 확인
    // 반환값이 올바른지 확인
    console.log('useFileValidation - Result:', result);

    return result;
  };

  // validateFiles 함수 반환
  // 컴포넌트에서 호출 가능
  return { validateFiles };
}

// 훅 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default useFileValidation;
//====여기까지 수정됨====

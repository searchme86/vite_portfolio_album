// useExtractFileName 훅: URL에서 파일명 추출
// 의미: URL에서 파일명을 추출하여 중복 확인에 사용
// 이유: 파일명 추출 로직을 재사용 가능하게 단일화
function useExtractFileName(): {
  extractFileNameFromUrl: (url: string) => string;
} {
  // extractFileNameFromUrl 함수: URL에서 파일명 추출
  // 의미: URL을 파싱해 파일명 반환
  // 이유: 안전한 파싱 및 타입 보장
  const extractFileNameFromUrl = (url: string): string => {
    const safeUrl = typeof url === 'string' ? url : '';
    // 타입: string - 안전한 URL
    // 의미: null/undefined 방지
    // 이유: 타입 안전성 확보

    const parts = safeUrl.split('/').filter((part) => part.length > 0);
    // 타입: string[] - URL 분할 결과
    // 의미: '/'로 분리한 배열 생성
    // 이유: 파일명 추출 준비

    const fileNameWithQuery = parts.length > 0 ? parts[parts.length - 1] : '';
    // 타입: string - 파일명(쿼리 포함 가능)
    // 의미: 마지막 부분 추출
    // 이유: 파일명 위치

    return fileNameWithQuery || '';
    // 타입: string - 최종 파일명
    // 의미: 기본값 제공
    // 이유: 빈 문자열 fallback
  };

  return { extractFileNameFromUrl };
  // 타입: { extractFileNameFromUrl: (url: string) => string }
  // 의미: 파일명 추출 함수 반환
  // 이유: 재사용 가능성 제공
}

export default useExtractFileName;
//====여기까지 수정됨====

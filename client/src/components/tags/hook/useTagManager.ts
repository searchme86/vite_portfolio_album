// src/components/tags/hook/useTagManager.js

// ===여기부터 코드 작업시작======
// 1. 태그 관리 훅 정의
// 2. 태그 추가 및 삭제 로직 제공
export const useTagManager = (tempTags, setTempTags) => {
  // 1. 태그 추가 핸들러 정의
  // 2. PostTagManager에서 태그 추가 시 호출
  const handleAddTag = (tag) => {
    // 1. tag가 문자열인지 확인
    // 2. 오류 방지를 위해 안전한 값 설정
    const safeTag = typeof tag === 'string' ? tag : '';
    console.log('useTagManager - handleAddTag, tag:', safeTag);

    // 1. 태그가 존재하고 중복되지 않으면 추가
    // 2. 상태 업데이트
    if (safeTag && !tempTags.includes(safeTag)) {
      setTempTags((prevTags) => {
        // 1. prevTags가 배열인지 확인
        // 2. 오류 방지
        const safePrevTags = Array.isArray(prevTags) ? prevTags : [];
        const newTags = [...safePrevTags, safeTag];
        console.log(
          'useTagManager - Added tag:',
          safeTag,
          'New tempTags:',
          newTags
        );
        return newTags;
      });
    }
  };

  // 1. 태그 삭제 핸들러 정의
  // 2. PostTagManager에서 태그 삭제 시 호출
  const handleDeleteTag = (tag) => {
    // 1. tag가 문자열인지 확인
    // 2. 오류 방지를 위해 안전한 값 설정
    const safeTag = typeof tag === 'string' ? tag : '';
    console.log('useTagManager - handleDeleteTag, tag:', safeTag);

    // 1. 태그를 필터링하여 제거
    // 2. 상태 업데이트
    setTempTags((prevTags) => {
      // 1. prevTags가 배열인지 확인
      // 2. 오류 방지
      const safePrevTags = Array.isArray(prevTags) ? prevTags : [];
      const newTags = safePrevTags.filter((t) => t !== safeTag);
      console.log(
        'useTagManager - Deleted tag:',
        safeTag,
        'New tempTags:',
        newTags
      );
      return newTags;
    });
  };

  // 1. 태그 추가 및 삭제 핸들러 반환
  // 2. Write.jsx에서 사용 가능
  return { handleAddTag, handleDeleteTag };
};
// ===여기부터 코드 작업종료======

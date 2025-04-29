import { useCallback } from 'react';
import { UseFormSetValue } from 'react-hook-form';
import type { PostWriteFormData } from './usePostWriteState';

/**
 * 태그 관리 훅 속성 타입 정의
 * 역할: 훅 props의 타입 명시
 * 왜 사용: TypeScript로 타입 안전성 보장
 */
interface UsePostWriteTagManagerProps {
  setValue: UseFormSetValue<PostWriteFormData>;
  tempTags: string[];
}

/**
 * 태그 관리 훅 정의
 * 역할: 태그 추가 및 삭제 로직 제공
 * 왜 사용: React Hook Form과 통합된 태그 관리
 */
export function usePostWriteTagManager({
  setValue,
  tempTags,
}: UsePostWriteTagManagerProps) {
  // 태그 추가 핸들러 정의
  // 역할: 새로운 태그를 폼 상태에 추가
  // 왜 사용: 사용자 입력 태그 관리
  const handleAddTag = useCallback(
    (tag: string) => {
      const safeTag = typeof tag === 'string' ? tag.trim() : '';
      console.log('usePostWriteTagManager - handleAddTag, tag:', safeTag);
      if (safeTag && !tempTags.includes(safeTag)) {
        const newTags = [...tempTags, safeTag];
        setValue('tags', newTags, { shouldValidate: true });
        console.log(
          'usePostWriteTagManager - Added tag:',
          safeTag,
          'New tempTags:',
          newTags
        );
      }
    },
    [tempTags, setValue]
  );

  // 태그 삭제 핸들러 정의
  // 역할: 태그를 폼 상태에서 제거
  // 왜 사용: 사용자 요청 태그 삭제
  const handleDeleteTag = useCallback(
    (tag: string) => {
      const safeTag = typeof tag === 'string' ? tag : '';
      console.log('usePostWriteTagManager - handleDeleteTag, tag:', safeTag);
      const newTags = tempTags.filter((t: string) => t !== safeTag);
      setValue('tags', newTags, { shouldValidate: true });
      console.log(
        'usePostWriteTagManager - Deleted tag:',
        safeTag,
        'New tempTags:',
        newTags
      );
    },
    [tempTags, setValue]
  );

  return { handleAddTag, handleDeleteTag };
}

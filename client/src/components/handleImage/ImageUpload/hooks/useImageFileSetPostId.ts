import { useEffect } from 'react';
import { useImageManagementStore } from '@/stores/imageManagement/imageManagementStore';

// useImageFileSetPostId: Post ID 설정 훅
// 의미: postId를 Zustand 상태에 저장
// 이유: 다른 컴포넌트에서 사용 가능
function useImageFileSetPostId(postId: string) {
  const setPostId = useImageManagementStore((state) => state.setPostId);

  useEffect(() => {
    setPostId(postId);
    // 의미: Zustand 상태에 postId 저장
    // 이유: 상태 동기화
  }, [postId, setPostId]);
}

export default useImageFileSetPostId;

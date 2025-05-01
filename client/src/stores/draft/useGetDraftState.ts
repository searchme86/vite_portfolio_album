/**
 * @file useGetDraftState.ts
 * @description Zustand 스토어에서 드래프트 데이터를 가져오는 커스텀 훅
 * @location src/stores/draft/useGetDraftState.ts
 */
import useDraftStore from './draftStore';

interface DraftState {
  postTitle: string;
  postDesc: string;
  postContent: string;
  tags: string[];
  imageUrls: string[];
  custom: Record<string, any>;
  draftId: string;
  createdAt: Date | string | undefined;
  updatedAt: Date | string | undefined;
  isTemporary: boolean;
}

const useGetDraftState = (): DraftState => {
  const {
    postTitle = '',
    postDesc = '',
    postContent = '',
    tags = [],
    imageUrls = [],
    custom = {},
    draftId = 'default',
    createdAt = new Date(),
    updatedAt = new Date(),
    isTemporary = false,
  } = useDraftStore();

  return {
    postTitle,
    postDesc,
    postContent,
    tags,
    imageUrls,
    custom,
    draftId,
    createdAt,
    updatedAt,
    isTemporary,
  };
};

export default useGetDraftState;

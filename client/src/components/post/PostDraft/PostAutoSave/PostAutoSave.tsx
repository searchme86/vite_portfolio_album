import { useAutoSave } from './hooks/useAutoSave';
import AutoSaveNotification from './parts/AutoSaveNotification';
import useGetDraftState from '@/stores/draft/useGetDraftState';
import { useCheckAuthToken } from '@/hooks/useCheckUserAuthToken';

interface PostWriteFormData {
  postTitle: string;
  postDesc: string;
  postContent: string;
  tags: string[];
}

interface PostAutoSaveProps {
  formData: PostWriteFormData;
  imageUrls: string[];
}

function PostAutoSave({ formData, imageUrls }: PostAutoSaveProps) {
  const { isSignedIn, getToken } = useCheckAuthToken();
  const draftFromStore = useGetDraftState();

  const draft = {
    ...draftFromStore,
    postTitle: formData.postTitle || draftFromStore.postTitle,
    postDesc: formData.postDesc || draftFromStore.postDesc,
    postContent: formData.postContent || draftFromStore.postContent,
    tags: formData.tags || draftFromStore.tags,
    imageUrls: imageUrls || draftFromStore.imageUrls,
  };

  const { isSaving, lastSaved } = useAutoSave(draft, isSignedIn, getToken);

  console.log('PostAutoSave - draft:', draft);

  return <AutoSaveNotification isSaving={isSaving} lastSaved={lastSaved} />;
}

export default PostAutoSave;

/**
 * @file PostWriteForm.tsx
 * @description 포스트 작성 폼 컴포넌트
 * @location src/Pages/Post/PostForm/PostWriteForm.tsx
 */

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { debounce } from 'lodash'; // 디바운싱을 위한 lodash
import { Form } from '@/components/ui/form';
import PostWriteTitleInput from './parts/PostWriteTitleInput';
import PostWriteDescriptionTextarea from './parts/PostWriteDescriptionTextarea';
import PostWriteContentEditor from './parts/PostWriteContentEditor';
import PostWriteTagManager from './parts/PostWriteTagManager';
import PostWriteSubmitButton from './parts/PostWriteSubmitButton';
import ImageUploadManager from '@/components/handleImage/ImageUploadManager/ImageUploadManager';
import { useCreatePost } from '@/api/post/write/useCreatePost';
import { useSafeAuthToken } from '@/lib/auth/useSafeAuthToken';
import { usePostWriteNavigation } from './hooks/usePostWriteNavigation';
import { postWriteFormDefaultValues } from './hooks/usePostWriteState';
import PostAutoSave from '@/components/post/PostDraft/PostAutoSave/PostAutoSave';
import type { PostWriteFormData } from './hooks/usePostWriteState';
import useGetDraftState from '@/stores/draft/useGetDraftState';
import useDraftStore from '../../../stores/draft/draftStore';

// 폼 컴포넌트 속성 타입 정의
interface PostWriteFormProps {
  initialImageUrls?: string[];
}

function PostWriteForm({ initialImageUrls = [] }: PostWriteFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);
  const draft = useGetDraftState();
  // const updateDraft = useDraftStore((state) => state.updateDraft);
  const updateDraft = useDraftStore.use.updateDraft();
  const safeGetToken = useSafeAuthToken();

  const form = useForm<PostWriteFormData>({
    mode: 'onChange',
    defaultValues: {
      ...postWriteFormDefaultValues,
      postTitle: draft.postTitle || '',
      postDesc: draft.postDesc || '',
      postContent: draft.postContent || '',
      tags: draft.tags || [],
    },
  });

  const { handleSubmit, formState, watch } = form;
  const { safeNavigate } = usePostWriteNavigation();
  const {
    handleSubmit: createPostSubmit,
    isLoading,
    error,
  } = useCreatePost(
    watch('postTitle'),
    watch('postDesc'),
    watch('postContent'),
    imageUrls,
    watch('tags'),
    safeGetToken,
    safeNavigate
  );

  // 폼 값 변경 감지 및 Zustand 스토어 업데이트
  useEffect(() => {
    const updateDraftDebounced = debounce((formValues: PostWriteFormData) => {
      console.log('PostWriteForm - Form values changed:', formValues);
      // updateDraft({
      //   postTitle: formValues.postTitle || '',
      //   postDesc: formValues.postDesc || '',
      //   postContent: formValues.postContent || '',
      //   tags: formValues.tags || [],
      //   imageUrls: imageUrls, // imageUrls 동기화
      //   custom: draft.custom,
      //   draftId: draft.draftId,
      //   createdAt: draft.createdAt,
      //   updatedAt: new Date(),
      //   isTemporary: draft.isTemporary,
      // });
    }, 500); // 500ms 지연

    const subscription = watch((value) => {
      updateDraftDebounced(value);
    });

    return () => {
      subscription.unsubscribe();
      updateDraftDebounced.cancel();
    };
  }, [watch, updateDraft, draft, imageUrls]);

  // imageUrls 변경 시 Zustand 스토어 업데이트
  useEffect(() => {
    console.log('PostWriteForm - Image URLs updated in draft:', imageUrls);
    updateDraft({
      postTitle: draft.postTitle,
      postDesc: draft.postDesc,
      postContent: draft.postContent,
      tags: draft.tags,
      imageUrls: imageUrls,
      custom: draft.custom,
      draftId: draft.draftId,
      createdAt: draft.createdAt,
      updatedAt: new Date(),
      isTemporary: draft.isTemporary,
    });
  }, [imageUrls, updateDraft, draft]);

  const postFormSubmitHandler: SubmitHandler<PostWriteFormData> = (data) => {
    console.log('PostWriteForm - Submitted data:', data);
    createPostSubmit(new Event('submit') as any);
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">Create a New Post</h1>

        <PostAutoSave isSignedIn={true} getToken={safeGetToken} />
        <ImageUploadManager
          postId="temp"
          initialImageUrls={initialImageUrls}
          onImageUrlsChange={(urls) => {
            console.log('PostWriteForm - Image URLs updated:', urls);
            setImageUrls(urls || []);
          }}
          progressBarColor="bg-blue-600"
          minImages={1}
          maxImages={10}
          showSlide={false}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(postFormSubmitHandler)}
          className="flex flex-col gap-4"
        >
          <PostWriteTitleInput />
          <PostWriteDescriptionTextarea />
          <PostWriteContentEditor />
          <PostWriteTagManager />
          <PostWriteSubmitButton
            isLoading={isLoading}
            isDisabled={!formState.isValid || formState.isSubmitting}
          />
          {error && (
            <div className="text-red-500">
              {error.message || 'An error occurred while submitting the form'}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default PostWriteForm;

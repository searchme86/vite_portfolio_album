import { useForm, SubmitHandler } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import PostWriteTitleInput from './PostWriteTitleInput';
import PostWriteDescriptionTextarea from './PostWriteDescriptionTextarea';
import PostWriteContentEditor from './PostWriteContentEditor';
import PostWriteTagManager from './PostWriteTagManager';
import PostWriteSubmitButton from './PostWriteSubmitButton';
import ImageUploadManager from '@/components/handleImage/ImageUploadManager/ImageUploadManager';
import { useCreatePost } from '@/api/post/write/useCreatePost';
import { useSafeAuthToken } from '@/lib/auth/useSafeAuthToken';
import { usePostWriteNavigation } from '../hooks/usePostWriteNavigation';
import type { PostWriteFormData } from '../hooks/usePostWriteState';
import { postWriteFormDefaultValues } from '../hooks/usePostWriteState';
import { useState } from 'react';

// 폼 컴포넌트 속성 타입 정의
interface PostWriteFormProps {
  initialImageUrls?: string[];
}

function PostWriteForm({ initialImageUrls = [] }: PostWriteFormProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);
  const form = useForm<PostWriteFormData>({
    mode: 'onChange',
    defaultValues: postWriteFormDefaultValues,
  });
  const { handleSubmit, formState, watch } = form;
  const { safeNavigate } = usePostWriteNavigation();
  const safeGetToken = useSafeAuthToken();
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

  const postFormSubmitHandler: SubmitHandler<PostWriteFormData> = (data) => {
    console.log('PostWriteForm - Submitted data:', data);
    createPostSubmit(new Event('submit') as any);
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="mb-8">
        <h1 className="mb-4 text-2xl font-bold">Create a New Post</h1>
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

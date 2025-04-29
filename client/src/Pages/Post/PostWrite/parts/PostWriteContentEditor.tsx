import ReactQuill from 'react-quill-new';
import { useFormContext } from 'react-hook-form';
import type { PostWriteFormData } from '../hooks/usePostWriteState';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import 'react-quill-new/dist/quill.snow.css';

function PostWriteContentEditor() {
  const { control, setValue } = useFormContext<PostWriteFormData>();

  return (
    <FormField
      control={control}
      name="postContent"
      rules={{ required: 'Content is required' }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Content</FormLabel>
          <FormControl>
            <ReactQuill
              value={field.value || ''}
              onChange={(value) => {
                setValue('postContent', value, { shouldValidate: true });
                console.log('PostWriteContentEditor - Content changed:', value);
              }}
              placeholder="Write your post content here..."
              className="h-64 mb-4"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PostWriteContentEditor;

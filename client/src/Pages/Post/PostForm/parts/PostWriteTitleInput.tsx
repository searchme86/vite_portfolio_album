import { useFormContext } from 'react-hook-form';
import type { PostWriteFormData } from '../../PostForm/hooks/usePostWriteState';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

function PostWriteTitleInput() {
  const { control } = useFormContext<PostWriteFormData>();

  return (
    <FormField
      control={control}
      name="postTitle"
      rules={{ required: 'Title is required' }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input
              placeholder="Title"
              {...field}
              aria-label="Post title"
              onChange={(e) => {
                field.onChange(e);
                console.log(
                  'PostWriteTitleInput - Title changed:',
                  e.target.value
                );
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PostWriteTitleInput;

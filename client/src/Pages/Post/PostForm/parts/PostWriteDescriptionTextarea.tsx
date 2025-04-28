import { useFormContext } from 'react-hook-form';
import type { PostWriteFormData } from '../../PostForm/hooks/usePostWriteState';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

function PostWriteDescriptionTextarea() {
  const { control } = useFormContext<PostWriteFormData>();

  return (
    <FormField
      control={control}
      name="postDesc"
      rules={{ required: 'Description is required' }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Description"
              className="h-32"
              {...field}
              aria-label="Post description"
              onChange={(e) => {
                field.onChange(e);
                console.log(
                  'PostWriteDescriptionTextarea - Description changed:',
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

export default PostWriteDescriptionTextarea;

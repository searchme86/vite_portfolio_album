import { useFormContext } from 'react-hook-form';
import TagInput from './TagInput';
import TagWriteList from './TagWriteList';
import { usePostWriteTagManager } from '../../PostForm/hooks/usePostWriteTagManager';
import type { PostWriteFormData } from '../../PostForm/hooks/usePostWriteState';
import { FormField, FormItem, FormLabel } from '@/components/ui/form';

function PostWriteTagManager() {
  const { control, setValue } = useFormContext<PostWriteFormData>();

  return (
    <FormField
      control={control}
      name="tags"
      render={({ field }) => {
        const tempTags = field.value || [];
        const { handleAddTag, handleDeleteTag } = usePostWriteTagManager({
          setValue,
          tempTags,
        });

        return (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <div className="space-y-4">
              <TagInput onAddTag={handleAddTag} />
              <TagWriteList tempTags={tempTags} onDeleteTag={handleDeleteTag} />
            </div>
          </FormItem>
        );
      }}
    />
  );
}

export default PostWriteTagManager;

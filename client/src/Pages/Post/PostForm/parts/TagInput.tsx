import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface TagInputProps {
  onAddTag: (tag: string) => void;
}

function TagInput({ onAddTag }: TagInputProps) {
  const [tagInput, setTagInput] = useState<string>('');

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || '';
    setTagInput(value);
    console.log('TagInput - Tag input changed:', value);
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      onAddTag(tagInput.trim());
      setTagInput('');
      console.log('TagInput - Tag added:', tagInput.trim());
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        value={tagInput}
        onChange={handleTagInputChange}
        placeholder="Add a tag"
      />
      <Button type="button" onClick={handleAddTag}>
        Add Tag
      </Button>
    </div>
  );
}

export default TagInput;

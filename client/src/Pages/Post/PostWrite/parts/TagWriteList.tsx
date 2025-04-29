import { Button } from '@/components/ui/button';

interface TagWriteListProps {
  tempTags: string[];
  onDeleteTag: (tag: string) => void;
}

function TagWriteList({ tempTags, onDeleteTag }: TagWriteListProps) {
  if (!tempTags || tempTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tempTags.map((tag) => (
        <div
          key={tag}
          className="flex items-center gap-1 p-2 bg-gray-200 rounded"
        >
          <span>{tag}</span>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => onDeleteTag(tag)}
          >
            x
          </Button>
        </div>
      ))}
    </div>
  );
}

export default TagWriteList;

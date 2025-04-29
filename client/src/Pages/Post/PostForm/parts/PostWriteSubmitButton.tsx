import { Button } from '@/components/ui/button';

interface PostWriteSubmitButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}

function PostWriteSubmitButton({
  isLoading,
  isDisabled,
}: PostWriteSubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading || isDisabled}
      aria-label="Create post"
      className="w-full"
    >
      {isLoading ? 'Creating...' : 'Create Post'}
    </Button>
  );
}

export default PostWriteSubmitButton;

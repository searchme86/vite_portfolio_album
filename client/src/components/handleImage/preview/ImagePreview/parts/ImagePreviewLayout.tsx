import { ReactNode } from 'react';

function ImagePreviewLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className="p-4 border rounded-md"
      role="region"
      aria-label="Image preview layout"
    >
      {children}
    </div>
  );
}

export default ImagePreviewLayout;

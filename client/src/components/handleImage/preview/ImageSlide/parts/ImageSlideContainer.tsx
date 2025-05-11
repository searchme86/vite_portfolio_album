function ImageSlideContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full h-64"
      role="region"
      aria-label="Image slide container"
    >
      {children}
    </div>
  );
}

export default ImageSlideContainer;

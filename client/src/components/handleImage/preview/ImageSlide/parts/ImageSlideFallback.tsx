function ImageSlideFallback() {
  return (
    <li>
      <div className="flex items-center justify-center w-full h-full">
        <img
          src="https://via.placeholder.com/150"
          alt="Fallback image"
          className="object-cover w-full h-full"
        />
      </div>
    </li>
  );
}

export default ImageSlideFallback;

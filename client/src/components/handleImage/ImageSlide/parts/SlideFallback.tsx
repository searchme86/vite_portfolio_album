interface SlideFallbackProps {
  message?: string;
}

function SlideFallback({
  message = 'No images available',
}: SlideFallbackProps) {
  // message가 undefined이거나 문자열이 아닌 경우 기본 메시지로 fallback
  const safeMessage: string =
    typeof message === 'string' && message ? message : 'No images available';

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
      <p className="text-gray-500" role="alert">
        {safeMessage}
      </p>
    </div>
  );
}

export default SlideFallback;

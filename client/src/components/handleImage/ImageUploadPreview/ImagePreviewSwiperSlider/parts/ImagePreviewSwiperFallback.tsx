import React from 'react';

function ImagePreviewSwiperFallback() {
  return <div></div>;
}

export default ImagePreviewSwiperFallback;

// interface SlideFallbackProps {
//   message?: string; // @type {string} - 표시 메시지
//   // @description 사용자에게 보여줄 메시지
//   // @reason 사용자 피드백
// }

// function SlideFallback({
//   message = 'No images available',
// }: SlideFallbackProps) {
//   // message가 undefined이거나 문자열이 아닌 경우 기본 메시지로 fallback
//   const safeMessage: string =
//     typeof message === 'string' && message ? message : 'No images available'; // @type {string} - 안전한 메시지
//   // @description message가 유효하지 않으면 기본 메시지 사용
//   // @reason 애플리케이션 깨짐 방지

//   return (
//     <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
//       <p className="text-gray-500" role="alert">
//         {safeMessage} {/* @type {string} - 메시지 표시 */}
//         {/* @description 검증된 메시지 렌더링 */}
//         {/* @reason 사용자 피드백 */}
//       </p>
//     </div>
//   ); // @type {JSX.Element} - 폴백 UI 렌더링
//   // @description 이미지 없음 UI 반환
//   // @reason 화면 표시
// }

// export default SlideFallback;

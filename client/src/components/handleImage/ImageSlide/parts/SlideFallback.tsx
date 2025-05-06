// SlideFallback 컴포넌트: 이미지가 없을 때의 fallback UI 제공
// 단일 책임: 대체 UI 렌더링만 담당
function SlideFallback({ message = 'No images available' }) {
  //====여기부터 수정됨====
  // message가 undefined이거나 문자열이 아닌 경우 기본 메시지로 fallback
  // 타입스크립트 대비: string 타입으로 명확히 처리
  const safeMessage =
    typeof message === 'string' && message ? message : 'No images available'; // <!---여기수정
  // 디버깅: safeMessage 값 확인
  // safeMessage가 올바르게 처리되었는지 확인
  console.log('SlideFallback - safeMessage:', safeMessage); // <!---여기추가
  //====여기까지 수정됨====

  // message 값 확인을 위한 디버깅 로그
  // 디버깅: message가 올바르게 전달되었는지 확인
  console.log('SlideFallback - message:', message);

  // div 태그로 fallback UI 제공, flex로 중앙 정렬
  // 웹접근성: role="alert" 추가하여 스크린 리더가 경고로 인식
  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-md">
      <p className="text-gray-500" role="alert">
        {safeMessage}
      </p>
    </div>
  );
}

// 컴포넌트 내보내기
// 다른 파일에서 import하여 사용할 수 있도록 모듈화
export default SlideFallback;

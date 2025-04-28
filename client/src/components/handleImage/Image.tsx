// src/components/Image.jsx
import { IKImage } from 'imagekitio-react';
import { useState } from 'react';

// Image 컴포넌트: ImageKit을 사용해 이미지를 렌더링
function Image({ src, path, w, h, className, alt = '', onLoad }) {
  const imagePath = Array.isArray(src) ? src[0] : src; // src가 배열이면 첫 번째 이미지 사용
  // 1. src가 배열인지 확인하고, 배열이면 첫 번째 요소를 사용
  // 2. 단일 문자열이면 그대로 사용
  const [isLoaded, setIsLoaded] = useState(false); // 이미지 로딩 상태
  // 1. 이미지 로딩 상태를 추적
  // 2. 로딩 완료 시 Swiper 업데이트를 트리거

  const handleLoad = () => {
    setIsLoaded(true); // 이미지 로딩 완료
    // 1. 이미지가 로드되면 상태를 업데이트
    // 2. 로딩 완료를 부모 컴포넌트에 알림
    if (onLoad) onLoad(); // 부모 컴포넌트에 로딩 완료 이벤트 전달
    // 1. onLoad prop이 있으면 호출
    // 2. Swiper 업데이트를 위해 사용
  };

  return (
    <div className="relative w-full h-full">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" /> // 로딩 중 플레이스홀더
        // 1. 이미지가 로드되기 전에는 회색 플레이스홀더 표시
        // 2. 사용자 경험 개선 및 Swiper 크기 계산 방지
      )}
      <IKImage
        urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} // ImageKit URL 엔드포인트
        // 1. 환경 변수에서 ImageKit URL 엔드포인트를 가져옴
        // 2. 이미지 로드에 필요한 기본 URL 설정
        path={imagePath || path} // 이미지 경로
        // 1. src 또는 path를 사용해 이미지 경로 설정
        // 2. src가 우선순위, 없으면 path 사용
        transformation={w ? [{ width: w, height: h || w }] : []} // 이미지 변환 설정
        // 1. 너비와 높이를 기준으로 이미지 크기 조정
        // 2. w가 없으면 변환 적용 안 함
        className={className} // CSS 클래스
        // 1. 외부에서 전달된 CSS 클래스 적용
        // 2. 스타일 커스터마이징 가능
        alt={alt} // 대체 텍스트
        // 1. 이미지에 대한 대체 텍스트 설정
        // 2. 접근성을 위해 사용
        onLoad={handleLoad} // 이미지 로드 완료 이벤트
        // 1. 이미지가 로드되면 handleLoad 함수 호출
        // 2. 로딩 상태를 업데이트하고 부모 컴포넌트에 알림
        style={{ display: isLoaded ? 'block' : 'none' }} // 로딩 전에는 숨김
        // 1. 이미지가 로드되기 전에는 표시하지 않음
        // 2. Swiper가 잘못된 크기를 계산하는 것 방지
      />
    </div>
  );
}

export default Image;

/**
 * @file CropEditor.tsx
 * @description 이미지 크롭 UI 및 실시간 미리보기를 제공하는 컴포넌트
 * @reason 크롭 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진을 자르는 도구 UI 제공
 */

import React from 'react'; // @type {Object} - React 라이브러리
// @description React 가져오기
// @reason JSX 컴포넌트 작성
// @analogy 도서관에서 기본적인 UI 도구 가져오기

import ReactCrop, { PixelCrop } from 'react-image-crop'; // @type {Object} - React Crop 라이브러리
// @description ReactCrop 가져오기
// @reason 이미지 크롭 기능 구현
// @analogy 도서관에서 사진 자르기 도구 가져오기
import 'react-image-crop/dist/ReactCrop.css'; // @description ReactCrop 스타일 가져오기
// @reason 크롭 UI 스타일링

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface CropEditorProps {
  imageSrc: string; // @type {string} - 크롭할 이미지 URL
  crop: PixelCrop | undefined; // @type {PixelCrop | undefined} - 크롭 상태
  setCrop: (crop: PixelCrop | undefined) => void; // @type {Function} - 크롭 상태 업데이트 함수
  onCropComplete: (croppedImage: string) => void; // @type {Function} - 크롭 완료 핸들러
  isCropping: boolean; // @type {boolean} - 크롭 중 여부
}

// 크롭 UI 컴포넌트 정의
// @description 이미지 크롭 UI 및 실시간 미리보기 제공
// @reason 사용자에게 크롭 인터랙션 제공
// @analogy 도서관에서 사진을 자르는 도구 표시
function CropEditor({
  imageSrc,
  crop,
  setCrop,
  onCropComplete,
  isCropping,
}: CropEditorProps) {
  // 이미지 참조
  // @description 이미지 요소 참조
  // @reason 크롭된 이미지 데이터를 추출하기 위해 사용
  const imgRef = React.useRef<HTMLImageElement>(null); // @type {RefObject<HTMLImageElement>} - 이미지 참조

  // 크롭 완료 핸들러
  // @description 크롭 완료 시 호출
  // @reason 크롭된 이미지를 캔버스에 렌더링하여 URL 생성
  const handleCropComplete = (crop: PixelCrop) => {
    if (!imgRef.current || !crop.width || !crop.height) {
      console.warn('CropEditor - Invalid crop or image reference'); // @description 디버깅용 경고
      // @description 크롭 또는 이미지 참조 누락 디버깅
      // @reason 문제 해결 지원
      return;
    }

    // 캔버스 생성
    // @description 크롭된 이미지를 렌더링할 캔버스 생성
    // @reason 크롭된 이미지 데이터 추출
    const canvas = document.createElement('canvas'); // @type {HTMLCanvasElement} - 캔버스 요소
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width; // @type {number} - X축 스케일
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height; // @type {number} - Y축 스케일
    canvas.width = crop.width; // @description 캔버스 너비 설정
    canvas.height = crop.height; // @description 캔버스 높이 설정
    const ctx = canvas.getContext('2d'); // @type {CanvasRenderingContext2D | null} - 캔버스 컨텍스트

    if (!ctx) {
      console.warn('CropEditor - Failed to get canvas context'); // @description 디버깅용 경고
      // @description 컨텍스트 누락 디버깅
      // @reason 문제 해결 지원
      return;
    }

    // 캔버스에 크롭된 이미지 그리기
    // @description 크롭된 영역을 캔버스에 렌더링
    // @reason 크롭된 이미지 데이터 생성
    ctx.drawImage(
      imgRef.current, // @description 원본 이미지
      crop.x * scaleX, // @description 크롭 X 좌표
      crop.y * scaleY, // @description 크롭 Y 좌표
      crop.width * scaleX, // @description 크롭 너비
      crop.height * scaleY, // @description 크롭 높이
      0, // @description 캔버스 X 좌표
      0, // @description 캔버스 Y 좌표
      crop.width, // @description 캔버스에 그릴 너비
      crop.height // @description 캔버스에 그릴 높이
    );

    // 크롭된 이미지 URL 생성
    // @description 캔버스 데이터를 URL로 변환
    // @reason 크롭된 이미지 저장 및 표시
    const croppedImageUrl = canvas.toDataURL('image/jpeg'); // @type {string} - 크롭된 이미지 URL
    // @description JPEG 형식으로 URL 생성
    // @reason 브라우저에서 표시 가능

    onCropComplete(croppedImageUrl); // @description 크롭 완료 핸들러 호출
    // @reason 상위 컴포넌트에 크롭 결과 전달
  };

  return (
    <div className="crop-editor">
      {/* @description 크롭 에디터 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h4>이미지 크롭</h4>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <ReactCrop
        crop={crop} // @type {PixelCrop | undefined} - 현재 크롭 상태
        onChange={(newCrop) => setCrop(newCrop)} // @description 크롭 변경 시 상태 업데이트
        // @reason 사용자 크롭 조정 반영
        onComplete={handleCropComplete} // @description 크롭 완료 시 핸들러 호출
        // @reason 크롭 완료 후 처리
        disabled={isCropping} // @description 크롭 중일 때 비활성화
        // @reason 중복 크롭 방지
      >
        <img
          ref={imgRef} // @description 이미지 참조 연결
          // @reason 크롭 데이터 추출
          src={imageSrc} // @type {string} - 이미지 URL
          alt="Crop target" // @type {string} - 대체 텍스트
          style={{ maxWidth: '100%', maxHeight: '400px' }} // @description 이미지 스타일
          // @reason 이미지 크기 조정
          onError={() => console.error('CropEditor - Failed to load image')} // @description 이미지 로드 실패 로그
          // @description 이미지 로드 실패 디버깅
          // @reason 문제 해결 지원
        />
      </ReactCrop>
      {isCropping && (
        <p>크롭 중...</p>
        // @description 크롭 진행 중 메시지 표시
        // @reason 사용자 피드백 제공
      )}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 크롭 UI 사용 가능
// @analogy 도서관에서 사진 크롭 도구를 공유
export default CropEditor;

// **작동 매커니즘**
// 1. `CropEditorProps` 타입 정의: Props 타입 명시.
// 2. `imgRef`로 이미지 참조 생성: 크롭된 이미지 데이터를 추출하기 위해 사용.
// 3. `handleCropComplete` 함수 정의: 크롭 완료 시 캔버스에 렌더링 후 URL 생성.
// 4. `ReactCrop` 컴포넌트 렌더링: 사용자에게 크롭 UI 제공.
// 5. 크롭 상태 및 진행 메시지 표시: 사용자 인터랙션 및 피드백 제공.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 크롭 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 사진을 자르는 도구 제공.

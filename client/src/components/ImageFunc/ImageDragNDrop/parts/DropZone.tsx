/**
 * @file DropZone.tsx
 * @description 드래그 앤 드롭을 위한 드롭 영역 UI 컴포넌트
 * @reason 드롭 영역 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진을 드롭할 수 있는 공간 제공
 */

import React from 'react'; // @type {Object} - React 라이브러리
// @description React 가져오기
// @reason JSX 컴포넌트 작성
// @analogy 도서관에서 기본적인 UI 도구 가져오기

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface DropZoneProps {
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void; // @type {Function} - 드롭 이벤트 핸들러
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void; // @type {Function} - 드래그 오버 이벤트 핸들러
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void; // @type {Function} - 드래그 리브 이벤트 핸들러
  isDragging: boolean; // @type {boolean} - 드래그 중 여부
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
}

// 드롭 영역 UI 컴포넌트 정의
// @description 드래그 앤 드롭 드롭 영역 UI 제공
// @reason 사용자에게 드롭 영역 제공
// @analogy 도서관에서 사진을 드롭할 수 있는 공간 표시
function DropZone({
  onDrop,
  onDragOver,
  onDragLeave,
  isDragging,
  isUploading,
}: DropZoneProps) {
  return (
    <div
      className={`drop-zone ${isDragging ? 'dragging' : ''} ${
        isUploading ? 'uploading' : ''
      }`} // @description 동적 클래스 적용
      // @reason 드래그 및 업로드 상태에 따라 스타일 변경
      onDrop={onDrop} // @description 드롭 이벤트 핸들러 연결
      // @reason 드롭 시 이미지 업로드 실행
      onDragOver={onDragOver} // @description 드래그 오버 이벤트 핸들러 연결
      // @reason 드래그 중 상태 표시
      onDragLeave={onDragLeave} // @description 드래그 리브 이벤트 핸들러 연결
      // @reason 드래그 종료 상태 표시
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: isDragging ? '#e0e0e0' : '#f9f9f9',
      }} // @description 드롭 영역 스타일
      // @reason 사용자에게 드롭 영역 시각적 표시
    >
      <p>
        {isUploading
          ? '업로드 중...'
          : isDragging
          ? '여기에 드롭하세요'
          : '이미지를 드래그하여 업로드하세요'}
        {/* @description 드래그 및 업로드 상태에 따라 텍스트 변경 */}
        {/* @reason 사용자에게 현재 상태 알림 */}
      </p>
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 드롭 영역 UI 사용 가능
// @analogy 도서관에서 드롭 영역을 공유
export default DropZone;

// **작동 매커니즘**
// 1. `DropZoneProps` 타입 정의: Props 타입 명시.
// 2. `div` 요소 렌더링: 드래그 앤 드롭 이벤트 핸들러 연결.
// 3. 동적 클래스와 스타일 적용: `isDragging`과 `isUploading` 상태에 따라 스타일 변경.
// 4. 상태 메시지 표시: 드래그 및 업로드 상태에 따라 텍스트 변경.
// 5. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 6. 상위 컴포넌트에서 `DropZone`을 사용하여 드래그 앤 드롭 UI 제공.
// @reason 드롭 영역 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 사진을 드롭할 수 있는 공간 제공.

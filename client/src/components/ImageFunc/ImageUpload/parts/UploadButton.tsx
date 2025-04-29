/**
 * @file UploadButton.tsx
 * @description 이미지 업로드를 위한 버튼 UI 컴포넌트
 * @reason 업로드 버튼 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진 업로드를 위한 버튼 제공
 */

import React from 'react'; // @type {Object} - React 라이브러리
// @description React 가져오기
// @reason JSX 컴포넌트 작성
// @analogy 도서관에서 기본적인 UI 도구 가져오기

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface UploadButtonProps {
  onClick: () => void; // @type {Function} - 클릭 핸들러
  isUploading: boolean; // @type {boolean} - 업로드 중 여부
}

// 업로드 버튼 UI 컴포넌트 정의
// @description 이미지 업로드 버튼 UI 제공
// @reason 사용자에게 업로드 버튼 제공
// @analogy 도서관에서 업로드 버튼을 통해 사진 업로드 요청
function UploadButton({ onClick, isUploading }: UploadButtonProps) {
  return (
    <button
      type="button" // @description 버튼 타입 명시
      // @reason 기본 동작(예: submit) 방지
      onClick={onClick} // @description 클릭 핸들러 연결
      // @reason 버튼 클릭 시 파일 선택 창 열기
      disabled={isUploading} // @description 업로드 중일 때 버튼 비활성화
      // @reason 중복 업로드 방지
      className={`upload-button ${isUploading ? 'uploading' : ''}`} // @description 동적 클래스 적용
      // @reason 업로드 상태에 따라 스타일 변경
    >
      {isUploading ? '업로드 중...' : '이미지 업로드'}{' '}
      {/* @description 업로드 상태에 따라 텍스트 변경 */}
      {/* @reason 사용자에게 현재 상태 알림 */}
    </button>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 버튼 UI 사용 가능
// @analogy 도서관에서 업로드 버튼을 공유
export default UploadButton;

// **작동 매커니즘**
// 1. `UploadButtonProps` 타입 정의: Props 타입 명시.
// 2. `button` 요소 렌더링: `type="button"`으로 기본 동작 방지.
// 3. `onClick`에 핸들러 연결: 버튼 클릭 시 파일 선택 창 열기.
// 4. `disabled` 속성으로 `isUploading` 상태 반영: 업로드 중일 때 버튼 비활성화.
// 5. 동적 클래스와 텍스트로 상태 표시: 업로드 중일 때 "업로드 중..." 표시.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 7. 상위 컴포넌트에서 `UploadButton`을 사용하여 이미지 업로드 버튼 UI 제공.
// @reason 이미지 업로드 버튼 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 업로드 버튼을 통해 사진 업로드 요청.

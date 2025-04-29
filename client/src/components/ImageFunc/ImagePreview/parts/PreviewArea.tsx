/**
 * @file PreviewArea.tsx
 * @description 선택된 이미지의 미리보기를 표시하는 UI 컴포넌트
 * @reason 미리보기 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 선택한 사진을 확대해서 미리 보는 화면
 */

import React from 'react'; // @type {Object} - React 라이브러리
// @description React 가져오기
// @reason JSX 컴포넌트 작성
// @analogy 도서관에서 기본적인 UI 도구 가져오기

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface PreviewAreaProps {
  currentImage: string | null; // @type {string | null} - 현재 선택된 이미지 URL
}

// 미리보기 영역 UI 컴포넌트 정의
// @description 선택된 이미지 미리보기 UI 제공
// @reason 사용자에게 선택된 이미지 표시
// @analogy 도서관에서 선택한 사진을 확대해서 보여줌
function PreviewArea({ currentImage }: PreviewAreaProps) {
  // Fallback 처리: 이미지 URL이 없거나 유효하지 않을 경우
  // @description currentImage가 없거나 빈 문자열일 경우 기본 메시지 표시
  // @reason 애플리케이션 충돌 방지 및 사용자 피드백 제공
  const safeImageUrl =
    currentImage && currentImage.trim() !== '' ? currentImage : null; // @type {string | null} - Fallback: null
  // @description 유효한 이미지 URL인지 확인
  // @reason 잘못된 URL로 인한 에러 방지

  return (
    <div className="preview-area">
      {/* @description 미리보기 영역 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h4>미리보기</h4>
      {/* @description 미리보기 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      {safeImageUrl ? (
        <img
          src={safeImageUrl} // @type {string} - 이미지 URL
          alt="Selected preview" // @type {string} - 대체 텍스트
          style={{
            maxWidth: '300px',
            maxHeight: '300px',
            objectFit: 'contain',
          }} // @description 이미지 스타일
          // @reason 이미지 크기 및 비율 조정
        />
      ) : (
        <p>선택된 이미지가 없습니다.</p>
        // @description 이미지 미선택 시 메시지 표시
        // @reason 사용자 피드백 제공
      )}
      {/* @description 이미지 또는 메시지 렌더링 */}
      {/* @reason 사용자에게 선택된 이미지 표시 또는 상태 알림 */}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 미리보기 UI 사용 가능
// @analogy 도서관에서 사진 미리보기 화면을 공유
export default PreviewArea;

// **작동 매커니즘**
// 1. `PreviewAreaProps` 타입 정의: Props 타입 명시.
// 2. `safeImageUrl`로 Fallback 처리: 이미지 URL 유효성 검사 및 기본값 설정.
// 3. `img` 요소 또는 메시지 렌더링: `safeImageUrl` 존재 여부에 따라 조건부 렌더링.
// 4. 스타일링 적용: 이미지 크기 및 비율 조정.
// 5. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 6. 상위 컴포넌트에서 `PreviewArea`를 사용하여 선택된 이미지 미리보기 UI 제공.
// @reason 미리보기 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 선택한 사진을 확대해서 보여줌.

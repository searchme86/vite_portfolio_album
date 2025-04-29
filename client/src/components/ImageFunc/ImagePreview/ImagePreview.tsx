/**
 * @file ImagePreview.tsx
 * @description 업로드된 이미지의 미리보기를 표시하는 컴포넌트
 * @reason 이미지 미리보기 기능과 UI를 통합하여 단일 책임 원칙 준수
 * @analogy 도서관에서 업로드한 사진을 미리 보는 시스템
 */

import React from 'react'; // @type {Object} - React 라이브러리
// @description React 가져오기
// @reason JSX 컴포넌트 작성
// @analogy 도서관에서 기본적인 관리 도구 가져오기

import useImagePreview from './hooks/useImagePreview'; // @type {Function} - 이미지 미리보기 훅
// @description 이미지 미리보기 훅 가져오기
// @reason 미리보기 상태 관리 및 로직 사용
// @analogy 도서관에서 사진 미리보기 시스템 연결

import PreviewArea from './parts/PreviewArea'; // @type {Function} - 미리보기 영역 UI 컴포넌트
// @description 미리보기 영역 UI 컴포넌트 가져오기
// @reason 사용자에게 미리보기 UI 제공
// @analogy 도서관에서 사용자에게 사진 미리보기 영역 표시

import useDraftStore from '../../../stores/draft/draftStore'; // @type {Object} - Zustand 스토어
// @description Zustand 스토어 가져오기
// @reason 드래프트 데이터 상태 관리 및 가져오기
// @analogy 도서관에서 중앙 기록 시스템에 접근

// 드래프트 데이터 타입 정의 (draftStore.ts와 동일)
// @type {Object} - 드래프트 데이터의 구조
// @description 드래프트 데이터의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
interface DraftState {
  postTitle: string;
  postDesc: string;
  postContent: string;
  tags: string[];
  imageUrls: string[];
  custom: { [key: string]: any };
  draftId: string;
  createdAt: Date;
  updatedAt: Date;
  isTemporary: boolean;
  updateDraft: (draft: DraftState) => void;
}

// 이미지 미리보기 컴포넌트 정의
// @description 업로드된 이미지 미리보기 기능과 UI 제공
// @reason 사용자에게 이미지 미리보기 기능 제공
// @analogy 도서관에서 업로드한 사진을 미리 봄
function ImagePreview() {
  // Zustand 스토어에서 이미지 URL 가져오기
  // @description 스토어에서 현재 이미지 URL 목록 추출
  // @reason 미리볼 이미지 상태 관리
  const imageUrls = useDraftStore((state: DraftState) => state.imageUrls || []); // @type {string[]} - Fallback: 빈 배열
  // @description imageUrls가 없으면 빈 배열로 초기화
  // @reason 애플리케이션 충돌 방지
  // @analogy 도서관에서 기존 사진 목록 확인

  // 이미지 미리보기 훅 사용
  // @description 미리보기 상태 관리 및 로직 실행
  // @reason 현재 선택된 이미지 관리
  const { currentImage, setCurrentImage, removeImage } =
    useImagePreview(imageUrls); // @type {Object} - 미리보기 상태와 함수
  // @description 미리보기 훅에서 상태와 함수 가져오기
  // @reason UI 업데이트 및 사용자 인터랙션 처리

  // 이미지 선택 핸들러
  // @description 특정 이미지를 미리보기로 선택
  // @reason 사용자가 클릭한 이미지를 표시
  const handleImageSelect = (url: string) => {
    setCurrentImage(url); // @description 선택된 이미지 URL 설정
    // @reason 미리보기 영역에 선택된 이미지 표시
    // @analogy 도서관에서 특정 사진을 선택해 확대 보기
  };

  // 이미지 삭제 핸들러
  // @description 특정 이미지를 목록에서 삭제
  // @reason 사용자가 불필요한 이미지 제거
  const handleImageRemove = (url: string) => {
    removeImage(url); // @description 이미지 삭제 호출
    // @reason 이미지 목록과 미리보기 상태 업데이트
    // @analogy 도서관에서 특정 사진을 기록에서 제거
  };

  return (
    <div className="image-preview">
      {/* @description 이미지 미리보기 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h3>이미지 미리보기</h3>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <div className="image-list">
        {/* @description 이미지 목록 컨테이너 */}
        {/* @reason 업로드된 이미지 목록 표시 */}
        {imageUrls.length > 0 ? (
          imageUrls.map((url, index) => (
            <div key={index} className="image-item">
              {/* @description 개별 이미지 항목 컨테이너 */}
              {/* @reason 이미지와 버튼 그룹화 */}
              <img
                src={url} // @type {string} - 이미지 URL
                alt={`Preview ${index}`} // @type {string} - 대체 텍스트
                style={{ maxWidth: '100px', margin: '5px', cursor: 'pointer' }} // @description 이미지 스타일
                // @reason 이미지 크기 및 간격 조정, 클릭 가능 표시
                onClick={() => handleImageSelect(url)} // @description 이미지 선택 이벤트 핸들러 연결
                // @reason 클릭 시 미리보기 업데이트
              />
              <button
                type="button" // @description 버튼 타입 명시
                // @reason 기본 동작(예: submit) 방지
                onClick={() => handleImageRemove(url)} // @description 이미지 삭제 이벤트 핸들러 연결
                // @reason 클릭 시 이미지 삭제
                className="remove-button"
              >
                삭제
                {/* @description 삭제 버튼 텍스트 */}
                {/* @reason 사용자에게 삭제 기능 제공 */}
              </button>
            </div>
          ))
        ) : (
          <p>이미지가 없습니다.</p>
          // @description 이미지 목록이 없을 때 메시지 표시
          // @reason 사용자 피드백 제공
        )}
      </div>
      <PreviewArea currentImage={currentImage} />
      {/* @description 미리보기 영역 UI 렌더링 */}
      {/* @reason 사용자에게 선택된 이미지 미리보기 제공 */}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 이미지 미리보기 기능 사용 가능
// @analogy 도서관에서 사진 미리보기 시스템을 공유
export default ImagePreview;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useDraftStore` 훅 호출: Zustand 스토어에서 이미지 URL 목록 가져옴.
// 3. `useImagePreview` 훅 호출: 미리보기 상태 관리 및 로직 실행 준비.
// 4. `handleImageSelect` 함수 정의: 사용자가 클릭한 이미지 선택.
// 5. `handleImageRemove` 함수 정의: 사용자가 선택한 이미지 삭제.
// 6. 이미지 목록과 `PreviewArea` 렌더링: 사용자 인터랙션 제공.
// 7. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 이미지 미리보기 기능과 UI를 통합하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 업로드한 사진을 미리 보고 관리.

/**
 * @file ImageUpload.tsx
 * @description 이미지 업로드를 위한 컴포넌트
 * @reason 이미지 업로드 기능과 UI를 통합하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진을 업로드하여 기록하는 시스템
 */

import React from 'react'; // @type {Object} - React 라이브러리
// @description React 가져오기
// @reason JSX 컴포넌트 작성 및 상태 관리
// @analogy 도서관에서 기본적인 관리 도구 가져오기

import useImageUpload from './hooks/useImageUpload'; // @type {Function} - 이미지 업로드 훅
// @description 이미지 업로드 훅 가져오기
// @reason 이미지 업로드 로직 사용
// @analogy 도서관에서 사진 업로드 시스템 연결

import UploadButton from './parts/UploadButton'; // @type {Function} - 업로드 버튼 UI 컴포넌트
// @description 업로드 버튼 UI 컴포넌트 가져오기
// @reason 사용자에게 업로드 버튼 제공
// @analogy 도서관에서 사용자에게 업로드 버튼 표시

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

// 이미지 업로드 컴포넌트 정의
// @description 이미지 업로드 기능과 UI 제공
// @reason 사용자에게 이미지 업로드 기능 제공
// @analogy 도서관에서 사진을 업로드하여 기록
function ImageUpload() {
  // Zustand 스토어에서 이미지 URL 가져오기
  // @description 스토어에서 현재 이미지 URL 목록 추출
  // @reason 업로드된 이미지 상태 관리
  const imageUrls = useDraftStore((state: DraftState) => state.imageUrls || []); // @type {string[]} - Fallback: 빈 배열
  // @description imageUrls가 없으면 빈 배열로 초기화
  // @reason 애플리케이션 충돌 방지
  // @analogy 도서관에서 기존 사진 목록 확인

  // 이미지 업로드 훅 사용
  // @description 이미지 업로드 로직 실행
  // @reason 이미지 파일 업로드 및 상태 관리
  const { handleImageUpload, isUploading, error } = useImageUpload(); // @type {Object} - 업로드 함수와 상태
  // @description 업로드 훅에서 함수와 상태 가져오기
  // @reason UI 업데이트 및 사용자 피드백 제공

  // 파일 입력 핸들러
  // @description 파일 입력 이벤트 처리
  // @reason 사용자가 선택한 이미지 파일 업로드
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // @type {FileList | null} - 선택된 파일 목록
    // @description 이벤트에서 파일 목록 추출
    // @reason 업로드할 파일 준비
    if (files && files.length > 0) {
      handleImageUpload(files[0]); // @description 첫 번째 파일 업로드 호출
      // @reason 단일 파일 업로드 처리
      // @analogy 도서관에서 선택한 사진 업로드
    }
  };

  return (
    <div className="image-upload">
      {/* @description 이미지 업로드 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h3>이미지 업로드</h3>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange} // @description 파일 선택 이벤트 핸들러 연결
        // @reason 파일 선택 시 업로드 실행
        disabled={isUploading} // @description 업로드 중일 때 비활성화
        // @reason 중복 업로드 방지
        style={{ display: 'none' }} // @description 기본 파일 입력 숨김
        // @reason 커스텀 버튼 UI 사용
        id="image-upload-input"
      />
      {/* @description 파일 입력 요소 */}
      {/* @reason 사용자 파일 선택 허용 */}
      <UploadButton
        isUploading={isUploading} // @type {boolean} - 업로드 중 여부
        onClick={() => document.getElementById('image-upload-input')?.click()} // @description 파일 입력 트리거
        // @reason 커스텀 버튼으로 파일 선택 유도
      />
      {/* @description 업로드 버튼 UI 렌더링 */}
      {/* @reason 사용자에게 업로드 버튼 제공 */}
      {error && (
        <p className="error-message">{error}</p>
        // @description 에러 메시지 표시
        // @reason 사용자에게 업로드 실패 알림
      )}
      {imageUrls.length > 0 && (
        <div className="uploaded-images">
          {/* @description 업로드된 이미지 목록 컨테이너 */}
          {/* @reason 업로드된 이미지 표시 */}
          {imageUrls.map((url, index) => (
            <img
              key={index} // @type {number} - 고유 키
              src={url} // @type {string} - 이미지 URL
              alt={`Uploaded ${index}`} // @type {string} - 대체 텍스트
              style={{ maxWidth: '100px', margin: '5px' }} // @description 이미지 스타일
              // @reason 이미지 크기 및 간격 조정
            />
            // @description 업로드된 이미지 렌더링
            // @reason 사용자에게 업로드 결과 확인
          ))}
        </div>
      )}
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 이미지 업로드 기능 사용 가능
// @analogy 도서관에서 사진 업로드 시스템을 공유
export default ImageUpload;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useDraftStore` 훅 호출: Zustand 스토어에서 이미지 URL 목록 가져옴.
// 3. `useImageUpload` 훅 호출: 이미지 업로드 로직 실행 준비.
// 4. `onFileChange` 함수 정의: 파일 입력 이벤트 처리 및 업로드 호출.
// 5. 파일 입력 요소와 `UploadButton` 렌더링: 사용자 인터랙션 제공.
// 6. 업로드된 이미지 목록 표시: `imageUrls`를 기반으로 이미지 렌더링.
// 7. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 이미지 업로드 기능과 UI를 통합하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 사진을 업로드하고 기록.

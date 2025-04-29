/**
 * @file ImageDragNDrop.tsx
 * @description 드래그 앤 드롭을 통해 이미지를 업로드하는 컴포넌트
 * @reason 드래그 앤 드롭 기능과 UI를 통합하여 단일 책임 원칙 준수
 * @analogy 도서관에서 사진을 드래그해서 업로드하는 시스템
 */

import useDragNDrop from './hooks/useDragNDrop'; // @type {Function} - 드래그 앤 드롭 훅
// @description 드래그 앤 드롭 훅 가져오기
// @reason 드래그 앤 드롭 로직 사용
// @analogy 도서관에서 드래그 앤 드롭 시스템 연결

import DropZone from './parts/DropZone'; // @type {Function} - 드롭 영역 UI 컴포넌트
// @description 드롭 영역 UI 컴포넌트 가져오기
// @reason 사용자에게 드롭 영역 UI 제공
// @analogy 도서관에서 사용자에게 사진 드롭 영역 표시

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

// 드래그 앤 드롭 컴포넌트 정의
// @description 드래그 앤 드롭 이미지 업로드 기능과 UI 제공
// @reason 사용자에게 드래그 앤 드롭 업로드 기능 제공
// @analogy 도서관에서 사진을 드래그해서 업로드
function ImageDragNDrop() {
  // Zustand 스토어에서 이미지 URL 가져오기
  // @description 스토어에서 현재 이미지 URL 목록 추출
  // @reason 업로드된 이미지 상태 관리
  const imageUrls = useDraftStore((state: DraftState) => state.imageUrls || []); // @type {string[]} - Fallback: 빈 배열
  // @description imageUrls가 없으면 빈 배열로 초기화
  // @reason 애플리케이션 충돌 방지
  // @analogy 도서관에서 기존 사진 목록 확인

  // 드래그 앤 드롭 훅 사용
  // @description 드래그 앤 드롭 로직 실행
  // @reason 드래그 앤 드롭으로 이미지 업로드 처리
  const {
    handleDrop,
    handleDragOver,
    handleDragLeave,
    isDragging,
    isUploading,
    error,
  } = useDragNDrop(); // @type {Object} - 드래그 앤 드롭 상태와 함수
  // @description 드래그 앤 드롭 훅에서 상태와 함수 가져오기
  // @reason UI 업데이트 및 사용자 인터랙션 처리

  return (
    <div className="image-drag-n-drop">
      {/* @description 드래그 앤 드롭 섹션의 컨테이너 */}
      {/* @reason 스타일링 및 레이아웃 구성 */}
      <h3>드래그 앤 드롭으로 이미지 업로드</h3>
      {/* @description 섹션 제목 */}
      {/* @reason 사용자에게 섹션 목적 표시 */}
      <DropZone
        onDrop={handleDrop} // @type {Function} - 드롭 이벤트 핸들러
        onDragOver={handleDragOver} // @type {Function} - 드래그 오버 이벤트 핸들러
        onDragLeave={handleDragLeave} // @type {Function} - 드래그 리브 이벤트 핸들러
        isDragging={isDragging} // @type {boolean} - 드래그 중 여부
        isUploading={isUploading} // @type {boolean} - 업로드 중 여부
      />
      {/* @description 드롭 영역 UI 렌더링 */}
      {/* @reason 사용자에게 드래그 앤 드롭 인터랙션 제공 */}
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
// @reason 상위 컴포넌트에서 드래그 앤 드롭 기능 사용 가능
// @analogy 도서관에서 드래그 앤 드롭 업로드 시스템을 공유
export default ImageDragNDrop;

// **작동 매커니즘**
// 1. `DraftState` 타입 정의: 드래프트 데이터 구조 명시.
// 2. `useDraftStore` 훅 호출: Zustand 스토어에서 이미지 URL 목록 가져옴.
// 3. `useDragNDrop` 훅 호출: 드래그 앤 드롭 로직 실행 준비.
// 4. `DropZone` 컴포넌트 렌더링: 드래그 앤 드롭 이벤트 핸들러와 상태 전달.
// 5. 업로드된 이미지 목록 표시: `imageUrls`를 기반으로 이미지 렌더링.
// 6. 에러 메시지 표시: 업로드 실패 시 사용자 피드백 제공.
// 7. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 드래그 앤 드롭 업로드 기능과 UI를 통합하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 사진을 드래그해서 업로드.

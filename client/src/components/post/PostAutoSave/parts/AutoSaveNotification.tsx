/**
 * @file AutoSaveNotification.tsx
 * @description 자동저장 상태와 애니메이션을 표시하는 알림 UI 컴포넌트
 * @reason 자동저장 상태 표시 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록 저장 상태를 사용자에게 알리는 게시판
 */

import React from 'react'; // @type {Object} - React 라이브러리
// @description React 가져오기
// @reason JSX 컴포넌트 작성 및 상태 관리
// @analogy 도서관에서 기본적인 관리 도구 가져오기

// 애니메이션 속성 타입 정의
// @type {Object} - GSAP 애니메이션 속성
// @description 애니메이션 속성의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 게시판 업데이트 효과의 형식을 정의
interface AnimationProps {
  opacity?: number; // @type {number} - 투명도
  scale?: number; // @type {number} - 크기 변화
  duration?: number; // @type {number} - 애니메이션 지속 시간
}

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface AutoSaveNotificationProps {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간
  animationProps: AnimationProps; // @type {AnimationProps} - 애니메이션 속성
}

// 알림 UI 컴포넌트 정의
// @description 자동저장 상태와 애니메이션을 표시
// @reason 사용자에게 저장 상태 피드백 제공
// @analogy 도서관에서 저장 상태를 게시판에 표시
function AutoSaveNotification({
  isSaving,
  lastSaved,
  animationProps,
}: AutoSaveNotificationProps) {
  // 애니메이션 속성 Fallback 처리
  // @description 애니메이션 속성 값 확인, 없으면 기본값 사용
  // @reason 애플리케이션 충돌 방지
  const safeAnimationProps = {
    opacity: animationProps.opacity || 1, // @type {number} - Fallback: 1
    scale: animationProps.scale || 1, // @type {number} - Fallback: 1
    duration: animationProps.duration || 0.5, // @type {number} - Fallback: 0.5초
  }; // @description 안전한 애니메이션 속성 객체 생성
  // @reason 애니메이션 속성 누락 시 기본값 제공

  // 마지막 저장 시간 포맷팅
  // @description 마지막 저장 시간을 읽기 쉬운 형식으로 변환
  // @reason 사용자에게 명확한 정보 제공
  const formattedLastSaved = lastSaved
    ? lastSaved.toLocaleTimeString() // @type {string} - 시간 문자열
    : '아직 저장되지 않음'; // @type {string} - Fallback: 메시지
  // @description lastSaved가 있으면 시간 포맷, 없으면 기본 메시지
  // @reason 사용자 피드백 개선

  return (
    <div
      className="auto-save-notification"
      style={{
        opacity: safeAnimationProps.opacity, // @description 투명도 적용
        transform: `scale(${safeAnimationProps.scale})`, // @description 크기 변화 적용
        transition: `all ${safeAnimationProps.duration}s ease-in-out`, // @description 애니메이션 전환 효과
      }}
    >
      {/* @description 알림 UI 컨테이너 */}
      {/* @reason 스타일링 및 애니메이션 적용 */}
      <p>
        {isSaving ? '저장 중...' : `마지막 저장: ${formattedLastSaved}`}
        {/* @description 저장 상태 메시지 표시 */}
        {/* @reason 사용자에게 현재 상태 알림 */}
      </p>
    </div>
  );
}

// 컴포넌트 내보내기
// @description 컴포넌트를 다른 파일에서 사용할 수 있도록 내보냄
// @reason 상위 컴포넌트에서 알림 UI 사용 가능
// @analogy 도서관에서 게시판을 공유
export default AutoSaveNotification;

// **작동 매커니즘**
// 1. `AnimationProps`와 `AutoSaveNotificationProps` 타입 정의: Props 타입 명시.
// 2. `safeAnimationProps`로 애니메이션 속성 Fallback 처리: 기본값 제공.
// 3. `lastSaved`를 포맷팅하여 사용자 친화적 메시지 생성.
// 4. `div.auto-save-notification`에 스타일과 애니메이션 적용: 시각적 피드백 제공.
// 5. `isSaving` 상태에 따라 메시지 표시: 저장 중 또는 마지막 저장 시간 표시.
// 6. `export default`로 외부에서 사용할 수 있도록 내보냄.
// 7. 상위 컴포넌트에서 `AutoSaveNotification`를 사용하여 자동저장 상태 표시.
// @reason 자동저장 상태 표시 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장 상태를 게시판에 표시.

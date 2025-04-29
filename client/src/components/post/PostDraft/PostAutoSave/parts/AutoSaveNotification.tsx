/**
 * @file AutoSaveNotification.tsx
 * @description 자동저장 상태와 애니메이션을 표시하는 알림 UI 컴포넌트
 * @reason 자동저장 상태 표시 UI를 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 대여 기록 저장 상태를 사용자에게 알리는 게시판
 */

import { useRef } from 'react'; // @type {Object} - React 라이브러리
// @description React와 useRef, useEffect 훅 가져오기
// @reason JSX 컴포넌트 작성 및 DOM 참조 관리
// @analogy 도서관에서 기본적인 관리 도구와 게시판 참조 도구 가져오기

import useAutoSaveAnimation from '../hooks/useAutoSaveAnimation'; // @type {Function} - 애니메이션 훅
// @description 자동저장 애니메이션 훅 가져오기
// @reason 저장 시 애니메이션 효과 적용
// @analogy 도서관에서 저장 알림에 시각적 효과 추가

// 컴포넌트 Props 타입 정의
// @type {Object} - 컴포넌트 속성
// @description 컴포넌트 Props 타입 정의
// @reason 타입 안정성 보장
interface AutoSaveNotificationProps {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간
}

// 알림 UI 컴포넌트 정의
// @description 자동저장 상태 표시
// @reason 사용자에게 저장 상태 피드백 제공
// @analogy 도서관에서 저장 상태를 게시판에 표시
function AutoSaveNotification({
  isSaving,
  lastSaved,
}: AutoSaveNotificationProps) {
  // DOM 요소 참조 생성
  // @description 애니메이션을 적용할 DOM 요소 참조
  // @reason GSAP가 DOM 요소에 직접 애니메이션 적용
  const notificationRef = useRef<HTMLDivElement>(null); // @type {RefObject<HTMLDivElement>} - DOM 참조
  // @description useRef로 DOM 참조 생성
  // @reason 애니메이션 대상 지정

  // 자동저장 애니메이션 훅 사용
  // @description 저장 시 애니메이션 효과 적용
  // @reason 사용자에게 시각적 피드백 제공
  useAutoSaveAnimation(isSaving, notificationRef); // @description 애니메이션 훅 호출
  // @reason DOM 참조와 저장 상태 전달

  // 마지막 저장 시간 포맷팅
  // @description 마지막 저장 시간을 읽기 쉬운 형식으로 변환
  // @reason 사용자에게 명확한 정보 제공
  const formattedLastSaved = lastSaved
    ? lastSaved.toLocaleTimeString() // @type {string} - 시간 문자열
    : '아직 저장되지 않음'; // @type {string} - Fallback: 메시지
  // @description lastSaved가 있으면 시간 포맷, 없으면 기본 메시지
  // @reason 사용자 피드백 개선

  return (
    <div ref={notificationRef} className="auto-save-notification">
      {/* @description 알림 UI 컨테이너, ref로 참조 설정 */}
      {/* @reason 애니메이션 적용 및 스타일링 */}
      <p>
        {isSaving
          ? '포스트 내용이 저장 중입니다.'
          : `마지막 저장: ${formattedLastSaved}`}
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
// 1. `AutoSaveNotificationProps` 타입 정의: Props 타입 명시.
// 2. `useRef`로 `notificationRef` 생성: 애니메이션 대상 DOM 참조.
// 3. `useAutoSaveAnimation` 훅 호출: `isSaving`과 `notificationRef` 전달.
// 4. `lastSaved`를 포맷팅하여 사용자 친화적 메시지 생성.
// 5. `div.auto-save-notification`에 `ref` 설정: GSAP가 조작할 DOM 요소 지정.
// 6. `isSaving` 상태에 따라 메시지 표시: 저장 중 또는 마지막 저장 시간 표시.
// 7. `export default`로 외부에서 사용할 수 있도록 내보냄.
// @reason 자동저장 상태 표시 UI를 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장 상태를 게시판에 표시.

/**
 * @file AutoSaveNotification.tsx
 * @description 자동저장 상태와 애니메이션을 표시하는 알림 UI 컴포넌트
 * @location src/components/post/PostDraft/PostAutoSave/parts/AutoSaveNotification.tsx
 */
import { memo, useRef, useEffect } from 'react'; // @type {Function} - React와 memo 가져오기
// @description React의 useRef, useEffect 훅과 memo 가져오기
// @reason useRef로 DOM 참조, useEffect로 부수 효과 관리, memo로 리렌더링 최적화
// @why useRef는 DOM 요소 참조, useEffect는 상태 변경 시 로깅, memo는 불필요한 리렌더링 방지
// @analogy 도서관에서 책 위치를 기록(useRef), 책 변경 시 기록부 업데이트(useEffect), 같은 책 정보는 다시 확인하지 않음(memo)

import useAutoSaveAnimation from '../hooks/useAutoSaveAnimation'; // @type {Function} - 자동저장 애니메이션 훅
// @description lastSaved 변경 시 애니메이션 트리거
// @reason 저장 완료 시 사용자에게 시각적 피드백 제공
// @why 애니메이션으로 저장 상태를 직관적으로 알림
// @analogy 도서관에서 책 저장 완료 시 깃발을 흔들어 알림

import './AutoSaveNotification.css'; // @type {CSS} - 스타일 파일 가져오기
// @description 컴포넌트 스타일 정의
// @reason 인라인 스타일 대신 CSS 파일로 분리하여 유지보수성 향상
// @why CSS 파일로 분리하면 스타일 관리와 재사용이 쉬워짐
// @analogy 도서관에서 스타일을 별도 규칙집으로 관리

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지
// @why 로그가 운영 환경에서 불필요하게 출력되지 않도록 제어
// @mechanism
// 1. `process.env.NODE_ENV`로 환경 확인.
// 2. 개발 환경('development')일 경우 true 반환.

interface AutoSaveNotificationProps {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  // @description 로컬 또는 서버 저장 진행 상태
  // @reason UI에서 저장 진행 상태 표시
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간
  // @description 마지막으로 저장된 시간
  // @reason UI에서 마지막 저장 시간 표시
}

// 컴포넌트 정의
function AutoSaveNotification({
  isSaving,
  lastSaved,
}: AutoSaveNotificationProps) {
  const notificationRef = useRef<HTMLDivElement | null>(null); // @type {RefObject<HTMLDivElement | null>} - 알림 요소 참조
  // @description 알림 div 요소를 참조하기 위한 useRef 훅
  // @reason useAutoSaveAnimation 훅에서 DOM 요소에 애니메이션 적용
  // @why notificationRef를 통해 DOM 요소에 직접 접근
  // @mechanism
  // 1. `useRef`로 DOM 요소 참조 생성.
  // 2. `ref` 속성으로 div 요소와 연결.
  // @analogy 도서관에서 특정 책 위치를 기억하기 위해 메모장 사용

  // 디버깅: isSaving과 lastSaved 값 확인 (디버깅 모드에서만 출력)
  useEffect(() => {
    if (isDebugMode) {
      console.log('AutoSaveNotification - isSaving:', isSaving); // @description 저장 중 여부 로그
      // @reason isSaving 상태 확인
      // @why 디버깅 시 상태 추적
      console.log('AutoSaveNotification - lastSaved:', lastSaved); // @description 마지막 저장 시간 로그
      // @reason lastSaved 상태 확인
      // @why 디버깅 시 시간 추적
    }
  }, [isSaving, lastSaved]); // @type {Array} - 의존성 배열
  // @description isSaving 또는 lastSaved 변경 시 로그 출력
  // @reason 상태 변경 시 로그로 추적
  // @why 의존성 배열로 변경 감지
  // @mechanism
  // 1. `isSaving`, `lastSaved` 변경 감지.
  // 2. 변경 시 콘솔에 로그 출력.
  // @analogy 도서관에서 책 상태 변경 시 기록부에 기록

  // useAutoSaveAnimation 훅 호출 (lastSaved 기반으로 애니메이션 트리거)
  useAutoSaveAnimation(lastSaved, notificationRef); // @type {void} - 애니메이션 훅 호출
  // @description lastSaved 변경 시 애니메이션 실행
  // @reason 저장 완료 시 사용자에게 시각적 피드백 제공
  // @why lastSaved가 변경될 때마다 애니메이션 트리거
  // @mechanism
  // 1. `lastSaved`와 `notificationRef`를 `useAutoSaveAnimation`에 전달.
  // 2. 훅 내부에서 `lastSaved` 변경 감지 후 애니메이션 적용.
  // @analogy 도서관에서 책 저장 완료 시 깃발 흔들기

  // 마지막 저장 시간 포맷팅
  const timeFormattedLastSaved = lastSaved
    ? lastSaved.toLocaleTimeString() // @type {string} - 시간을 로컬 형식으로 변환
    : // @description Date 객체를 사용자 친화적인 시간 문자열로 변환
      // @reason UI에서 시간을 보기 쉽게 표시
      '아직 저장되지 않았습니다.'; // @type {string} - 폴백 메시지
  // @description lastSaved가 null일 경우 기본 메시지 제공
  // @reason 사용자에게 명확한 상태 전달
  // @why lastSaved가 없으면 사용자에게 아직 저장되지 않았음을 알림
  // @mechanism
  // 1. `lastSaved`가 존재하면 `toLocaleTimeString`으로 변환.
  // 2. 없으면 기본 메시지 반환.
  // @analogy 도서관에서 책 저장 시간이 없으면 "아직 저장 안 됨" 안내

  // 표시 메시지 결정
  const displayMessage = isSaving
    ? '포스트 내용이 저장 중입니다.' // @type {string} - 저장 중 메시지
    : // @description 저장 중일 때 표시할 메시지
    // @reason 사용자에게 저장 진행 중임을 알림
    lastSaved
    ? `자동저장 완료 (${timeFormattedLastSaved})` // @type {string} - 저장 완료 메시지
    : // @description 저장 완료 시 시간과 함께 메시지 표시
      // @reason 사용자에게 저장 완료와 시간을 알림
      '포스트 내용이 아직 저장되지 않았습니다.'; // @type {string} - 저장 안 됨 메시지
  // @description 저장 안 됨 상태일 때 메시지
  // @reason 사용자에게 명확한 상태 전달
  // @why 조건문으로 상태에 따라 적절한 메시지 선택
  // @mechanism
  // 1. `isSaving`이 true면 "저장 중" 메시지.
  // 2. `lastSaved`가 있으면 "저장 완료"와 시간 표시.
  // 3. 둘 다 없으면 "저장 안 됨" 메시지.
  // @analogy 도서관에서 책 상태에 따라 적절한 안내 메시지 제공

  return (
    <div
      ref={notificationRef} // @type {RefObject} - 알림 요소 참조 연결
      // @description notificationRef를 div 요소에 연결
      // @reason 애니메이션 훅에서 DOM 조작
      className="auto-save-notification" // @type {string} - CSS 클래스 적용
      // @description 스타일링을 위한 CSS 클래스
      // @reason CSS 파일에서 스타일 정의
    >
      {/* 알림 메시지 표시 */}
      {displayMessage} {/* @type {string} - 상태 메시지 */}
      {/* @description 상태에 따라 결정된 메시지 렌더링 */}
      {/* @reason 사용자에게 현재 저장 상태 표시 */}
      {/* @why displayMessage로 상태별 메시지 동적 표시 */}
    </div>
  ); // @type {JSX.Element} - 알림 UI 반환
  // @description 알림 UI를 렌더링
  // @reason 사용자에게 저장 상태를 시각적으로 표시
  // @mechanism
  // 1. `notificationRef`를 통해 div 참조.
  // 2. `className`으로 스타일 적용.
  // 3. `displayMessage`를 기반으로 메시지 표시.
  // @analogy 도서관에서 저장 상태를 게시판에 표시
}

export default memo(AutoSaveNotification); // @type {Function} - memo로 감싸 리렌더링 최적화
// @description memo로 감싸 불필요한 리렌더링 방지
// @reason props가 변경되지 않으면 리렌더링 방지
// @why memo를 사용하여 성능 최적화
// @mechanism
// 1. `memo`가 props를 비교.
// 2. 동일하면 리렌더링 건너뜀.
// @analogy 도서관에서 동일한 책 정보를 반복적으로 확인하지 않도록 기억

// **작동 매커니즘**
// 1. `useRef`로 notificationRef 생성: 알림 div 요소 참조.
// 2. `useEffect`로 isSaving, lastSaved 로그 출력: 디버깅 모드에서만 실행.
// 3. `useAutoSaveAnimation` 훅 호출: lastSaved 변경 시 애니메이션 트리거.
// 4. `lastSaved`를 포맷팅: timeFormattedLastSaved로 사용자 친화적 시간 생성.
// 5. 상태에 따라 메시지 결정: displayMessage로 적절한 메시지 선택.
// 6. 알림 UI 렌더링: div 요소에 메시지와 스타일 적용.
// 7. `memo`로 리렌더링 최적화: 불필요한 리렌더링 방지.
// @reason 저장 상태를 사용자에게 시각적으로 알리고 애니메이션으로 피드백 제공
// @analogy 도서관에서 책 저장 상태를 게시판에 표시하고 깃발로 알림

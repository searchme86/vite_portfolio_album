/**
 * @file AutoSaveNotification.tsx
 * @description 자동저장 상태와 애니메이션을 표시하는 알림 UI 컴포넌트
 */

import { useRef } from 'react';
import useAutoSaveAnimation from '../hooks/useAutoSaveAnimation';

interface AutoSaveNotificationProps {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간
}

function AutoSaveNotification({
  isSaving,
  lastSaved,
}: AutoSaveNotificationProps) {
  const notificationRef = useRef<HTMLDivElement | null>(null); // @type
  // @description 애니메이션 훅 호출
  useAutoSaveAnimation(isSaving, notificationRef);

  // 마지막 저장 시간 포맷팅
  // @description 마지막 저장 시간을 읽기 쉬운 형식으로 변환
  // @reason 사용자에게 명확한 정보 제공
  const timeFormattedLastSaved = lastSaved
    ? lastSaved.toLocaleTimeString() // @type {string} - 시간 문자열
    : '아직 저장되지 않음'; // @type {string} - Fallback: 메시지
  // @description lastSaved가 있으면 시간 포맷, 없으면 기본 메시지

  return (
    <div ref={notificationRef} className="">
      <p className="">
        {isSaving
          ? '포스트 내용이 저장 중입니다.'
          : `마지막 저장시간: ${timeFormattedLastSaved}`}
      </p>
    </div>
  );
}

export default AutoSaveNotification;

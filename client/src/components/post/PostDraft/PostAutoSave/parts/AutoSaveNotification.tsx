/**
 * @file AutoSaveNotification.tsx
 * @description 자동저장 상태와 애니메이션을 표시하는 알림 UI 컴포넌트
 */

import { useRef, useEffect } from 'react';
import useAutoSaveAnimation from '../hooks/useAutoSaveAnimation';

interface AutoSaveNotificationProps {
  isSaving: boolean; // @type {boolean} - 저장 중 여부
  lastSaved: Date | null; // @type {Date | null} - 마지막 저장 시간
}

function AutoSaveNotification({
  isSaving,
  lastSaved,
}: AutoSaveNotificationProps) {
  const notificationRef = useRef<HTMLDivElement | null>(null);

  // 디버깅: isSaving과 lastSaved 값 확인
  useEffect(() => {
    console.log('AutoSaveNotification - isSaving:', isSaving);
    console.log('AutoSaveNotification - lastSaved:', lastSaved);
  }, [isSaving, lastSaved]);

  // useAutoSaveAnimation 훅 호출 (lastSaved 기반으로 애니메이션 트리거)
  useAutoSaveAnimation(lastSaved, notificationRef);

  const timeFormattedLastSaved = lastSaved
    ? lastSaved.toLocaleTimeString()
    : '아직 저장되지 않음';

  return (
    <div
      ref={notificationRef}
      style={{
        opacity: 0, // 초기 투명도 설정
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 128, 0, 0.8)', // 녹색 배경
        color: 'white',
        textAlign: 'center',
        padding: '8px',
      }}
    >
      {isSaving ? '포스트 내용이 저장 중입니다.' : '자동저장 완료'}
    </div>
  );
}

export default AutoSaveNotification;

/**
 * @file AutoSaveNotification.tsx
 * @description 자동저장 상태와 애니메이션을 표시하는 알림 UI 컴포넌트
 * @location src/components/post/PostDraft/PostAutoSave/parts/AutoSaveNotification.tsx
 */
import { useRef, useEffect } from 'react';

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

  // 애니메이션 로직 직접 구현
  //====여기부터 수정됨====
  useEffect(() => {
    if (notificationRef.current) {
      if (isSaving) {
        // 저장 중일 때 애니메이션 표시
        notificationRef.current.style.opacity = '1'; // @type {string} - 투명도 설정
        // @description 저장 중임을 알리기 위해 알림 표시
        // @reason 사용자에게 저장 상태 피드백
        // @analogy 도서관에서 "저장 중" 표지판 올리기
        notificationRef.current.style.transition = 'opacity 0.3s ease-in'; // @type {string} - 전환 효과
        // @description 부드러운 페이드인 효과
        // @reason 시각적 부드러움 제공
      } else if (lastSaved) {
        // 저장 완료 시 애니메이션
        notificationRef.current.style.opacity = '1'; // @type {string} - 투명도 설정
        // @description 저장 완료 알림 표시
        // @reason 사용자에게 완료 피드백
        setTimeout(() => {
          if (notificationRef.current) {
            notificationRef.current.style.opacity = '0'; // @type {string} - 투명도 설정
            // @description 일정 시간 후 알림 숨김
            // @reason 불필요한 UI 방해 방지
            notificationRef.current.style.transition = 'opacity 0.5s ease-out'; // @type {string} - 전환 효과
            // @description 부드러운 페이드아웃 효과
            // @reason 시각적 부드러움 제공
          }
        }, 2000); // 2초 후 숨김
      }
    }
  }, [isSaving, lastSaved]);
  // @description isSaving 또는 lastSaved 변경 시 애니메이션 실행
  // @reason 저장 상태 변화에 반응
  // @why 애니메이션 동작 보장
  // @analogy 도서관에서 저장 상태에 따라 표지판 업데이트
  //====여기까지 수정됨====

  const timeFormattedLastSaved = lastSaved
    ? lastSaved.toLocaleTimeString()
    : '아직 저장되지 않음';

  return (
    <div
      ref={notificationRef}
      style={{
        opacity: 0, // 초기 투명도 설정
        // position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 128, 0, 0.8)', // 녹색 배경
        color: 'white',
        textAlign: 'center',
        padding: '8px',
      }}
    >
      {isSaving
        ? '포스트 내용이 저장 중입니다.'
        : `자동저장 완료 (${timeFormattedLastSaved})`}
    </div>
  );
}

export default AutoSaveNotification;

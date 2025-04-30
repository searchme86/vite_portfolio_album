/**
 * @file useAutoSaveNetworkStatus.ts
 * @description 네트워크 상태를 감지하는 훅
 * @location src/components/post/PostDraft/PostAutoSave/hooks/useAutoSaveNetworkStatus.ts
 */
import { useState, useEffect } from 'react'; // @type {Function} - React 훅
// @description 상태와 이펙트 관리
// @reason 네트워크 상태 추적

export function useAutoSaveNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine); // @type {boolean} - 네트워크 상태
  // @description 네트워크 상태 관리
  // @reason 오프라인 시 서버 저장 건너뛰기

  useEffect(() => {
    const handleOnline = () => {
      console.log('useAutoSaveNetworkStatus - Network status: Online');
      // @description 온라인 상태 로그
      // @reason 상태 변경 확인
      setIsOnline(true); // 온라인 상태로 업데이트
      // @description 네트워크 상태를 온라인으로 설정
      // @reason 서버 저장 활성화
    };
    const handleOffline = () => {
      console.log('useAutoSaveNetworkStatus - Network status: Offline');
      // @description 오프라인 상태 로그
      // @reason 상태 변경 확인
      setIsOnline(false); // 오프라인 상태로 업데이트
      // @description 네트워크 상태를 오프라인으로 설정
      // @reason 서버 저장 비활성화
    };

    window.addEventListener('online', handleOnline); // 온라인 이벤트 리스너 추가
    // @description 온라인 이벤트 감지
    // @reason 네트워크 상태 업데이트
    window.addEventListener('offline', handleOffline); // 오프라인 이벤트 리스너 추가
    // @description 오프라인 이벤트 감지
    // @reason 네트워크 상태 업데이트

    return () => {
      window.removeEventListener('online', handleOnline); // 이벤트 리스너 제거
      // @description 온라인 리스너 정리
      // @reason 리소스 정리
      window.removeEventListener('offline', handleOffline); // 이벤트 리스너 제거
      // @description 오프라인 리스너 정리
      // @reason 리소스 정리
      console.log('useAutoSaveNetworkStatus - Cleanup completed');
      // @description 정리 완료 로그
      // @reason 정리 확인
    };
  }, []); // @description 의존성 배열: 빈 배열
  // @reason 최초 렌더링 시에만 실행

  return isOnline;
}

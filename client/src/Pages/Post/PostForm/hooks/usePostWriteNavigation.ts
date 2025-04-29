import { useNavigate } from 'react-router-dom';

/**
 * 네비게이션 훅 정의
 * 역할: 안전한 네비게이션 함수 제공
 * 왜 사용: 네비게이션 오류 방지 및 디버깅
 */
export function usePostWriteNavigation() {
  // 네비게이션 함수 가져오기
  // 역할: react-router-dom의 useNavigate 사용
  // 왜 사용: 페이지 이동 기능 제공
  const navigate = useNavigate();

  // 안전한 네비게이션 함수
  // 역할: navigate가 함수인지 확인 후 폴백 처리
  // 왜 사용: 오류 방지 및 안정성 확보
  const safeNavigate =
    typeof navigate === 'function'
      ? navigate
      : (path: string) => {
          console.log(
            'usePostWriteNavigation - Fallback navigate called with path:',
            path
          );
        };

  console.log('usePostWriteNavigation - Initialized safeNavigate');

  // 네비게이션 함수 반환
  // 역할: 컴포넌트에서 사용 가능하도록
  // 왜 사용: 네비게이션 기능 제공
  return { safeNavigate };
}

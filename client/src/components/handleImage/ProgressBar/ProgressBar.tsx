// src/components/handleImage/ProgressBar/ProgressBar.jsx
import { useProgressBar } from './hooks/useProgressBar';

// 1. ProgressBar 컴포넌트: 업로드 진행률 표시
// 2. 단일 책임: 진행률 UI 렌더링, Context는 ImageUploadManager에서 제공
function ProgressBar({ progressBarColor }) {
  // 1. useProgressBar 훅에서 displayProgress 가져옴
  // 2. Context 값은 ImageUploadManager의 Provider를 통해 전달됨
  const { displayProgress } = useProgressBar();

  // 1. progressBarColor가 문자열이 아닌 경우 기본값 설정
  // 2. 클래스 이름 오류 방지
  const safeProgressBarColor =
    typeof progressBarColor === 'string' ? progressBarColor : 'bg-blue-600';

  // 1. displayProgress가 숫자가 아닌 경우 기본값 설정
  // 2. UI 렌더링 오류 방지
  const safeDisplayProgress = Number.isFinite(displayProgress)
    ? displayProgress
    : 0;

  return (
    <div className="mb-4">
      {/* 1. 진행률 바 표시 */}
      {/* 2. 동적 색상 적용 */}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${safeProgressBarColor}`}
          style={{ width: `${safeDisplayProgress}%` }}
        ></div>
      </div>
      {/* 1. 진행률 퍼센트 표시 */}
      {/* 2. 사용자 피드백 제공 */}
      <p className="mt-1 text-sm text-gray-500">{safeDisplayProgress}%</p>
    </div>
  );
}

export default ProgressBar;

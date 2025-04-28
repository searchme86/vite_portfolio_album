// src/components/handleImage/ProgressBar/hooks/useProgressBar.js
// import { useImageUploadContext } from '../../context/ImageUploadContext';
import { useImageUploadContext } from '../../context/ImageUploadContext';

// 1. useProgressBar 훅: 진행률 계산 및 표시 로직 관리
// 2. 단일 책임: 진행률 표시값 계산, Context는 ImageUploadManager에서 제공
export const useProgressBar = () => {
  // 1. useImageUploadContext 훅으로 Context 값 가져옴
  // 2. ImageUploadManager에서 Provider를 통해 전달된 값을 사용
  const { progress } = useImageUploadContext();

  // 1. progress가 숫자가 아닌 경우 기본값 설정
  // 2. 계산 오류 방지
  const safeProgress = Number.isFinite(progress) ? progress : 0;

  // 1. displayProgress 계산: 진행률을 0~100 사이로 제한
  // 2. UI에 표시할 값 보정
  const displayProgress = Math.min(Math.max(safeProgress, 0), 100);
  console.log('useProgressBar - Display progress:', displayProgress);

  return { displayProgress };
};

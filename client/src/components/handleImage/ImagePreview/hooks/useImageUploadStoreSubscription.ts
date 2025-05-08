import { useMemo } from 'react'; // @type {Function} - React 훅
// @description 계산 결과 캐싱
// @reason 성능 최적화
import { useImageUploadStore } from '@/stores/imageUploadStore'; // @type {Function} - Zustand 스토어 훅
// @description 이미지 업로드 상태 관리
// @reason 데이터 접근

// Zustand 스토어 상태 타입 정의
interface ImageUploadState {
  imageUrls: { url: string; isNew: boolean }[]; // @type {{ url: string; isNew: boolean }[]} - 이미지 URL 배열
  // @description 스토어에서 관리되는 이미지 목록
  // @reason 상태 구조화
  minImages: number; // @type {number} - 최소 이미지 수
  // @description 스토어에서 관리되는 최소 이미지 수
  // @reason 규칙 적용
}

// 제네릭 타입을 사용하여 selector의 반환 타입 정의
type Selector<T> = (state: ImageUploadState) => T; // @type {(state: ImageUploadState) => T} - 상태 선택 함수
// @description Zustand 상태에서 특정 값을 선택하는 함수
// @reason 타입 안전성 보장
// @generic T: selector가 반환하는 값의 타입
// @why 제네릭 사용: 다양한 타입의 값을 선택할 수 있도록 유연하게 설계
// @benefit 타입 안정성과 재사용성 향상

export default function useImageUploadStoreSubscription<T>(
  selector: Selector<T>
): T {
  const selectedValue = useImageUploadStore(selector); // @type {T} - 선택된 값
  // @description Zustand 스토어에서 selector로 값 선택
  // @reason 상태 구독

  const memoizedValue = useMemo(() => selectedValue, [selectedValue]); // @type {T} - 메모이제이션된 값
  // @description 선택된 값을 메모이제이션하여 참조 안정화
  // @reason 무한 루프 방지 및 성능 최적화

  return memoizedValue; // @type {T} - 반환된 값
  // @description 안정화된 값 반환
  // @reason 상위 사용
}

/**
 * @file useAutoSaveAnimation.ts
 * @description 자동저장 완료 시 GSAP 애니메이션 효과를 적용하는 커스텀 훅
 * @reason 애니메이션 로직을 분리하여 단일 책임 원칙 준수
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { RefObject } from 'react';

// 커스텀 훅 정의
const useAutoSaveAnimation = (
  lastSaved: Date | null,
  elementRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    // 디버깅: lastSaved 값 확인
    console.log('useAutoSaveAnimation - lastSaved:', lastSaved);

    // DOM 요소 참조 확인
    if (!elementRef.current) {
      console.warn('useAutoSaveAnimation - No element reference provided');
      return;
    }

    // lastSaved가 변경될 때 애니메이션 실행
    if (lastSaved) {
      console.log('useAutoSaveAnimation - Applying save animation');

      // 나타나는 애니메이션
      gsap.to(elementRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      // 3초 후 사라지는 애니메이션
      gsap.to(elementRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 3, // 3초 후 사라짐
        ease: 'power2.inOut',
      });
    }
  }, [lastSaved, elementRef]); // lastSaved와 elementRef 의존성 추가
};

// 훅 내보내기
export default useAutoSaveAnimation;

// **작동 매커니즘**
// 1. `lastSaved` 값 감지: `lastSaved`가 변경될 때 애니메이션 실행.
// 2. `gsap.to`로 애니메이션 적용: 나타나고(0.5초), 3초 후 사라짐.
// 3. 디버깅 로그 추가: `lastSaved` 값과 애니메이션 실행 여부 확인.
// @reason 애니메이션 로직을 캡슐화하여 재사용성과 유지보수성 향상.

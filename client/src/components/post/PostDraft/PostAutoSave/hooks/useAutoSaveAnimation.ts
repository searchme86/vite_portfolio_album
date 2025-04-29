/**
 * @file useAutoSaveAnimation.ts
 * @description 자동저장 시 GSAP 애니메이션 효과를 적용하는 커스텀 훅
 * @reason 애니메이션 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 저장 알림에 깜빡이는 효과를 추가하는 것
 */

import { useState, useEffect } from 'react'; // @type {Function} - React 훅
// @description useState와 useEffect 훅 가져오기
// @reason 애니메이션 상태 관리 및 트리거
// @analogy 도서관에서 알림 효과를 관리하는 도구 사용

import { gsap } from 'gsap'; // @type {Object} - GSAP 라이브러리
// @description GSAP 가져오기
// @reason 애니메이션 효과 구현
// @analogy 도서관에서 깜빡이는 알림 효과를 위한 도구 가져오기

// 애니메이션 속성 타입 정의
// @type {Object} - 애니메이션 속성
// @description 애니메이션 속성의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 알림 효과의 형식을 미리 정의
interface AnimationProps {
  opacity: number; // @type {number} - 투명도
  scale: number; // @type {number} - 크기 변화
  duration: number; // @type {number} - 애니메이션 지속 시간
}

// 커스텀 훅 정의
// @description 자동저장 시 애니메이션 속성 반환
// @reason 저장 상태에 따라 애니메이션 효과 제공
// @analogy 도서관에서 저장 시 알림이 깜빡이도록 설정
const useAutoSaveAnimation = (isSaving: boolean) => {
  const [animationProps, setAnimationProps] = useState<AnimationProps>({
    opacity: 1, // @type {number} - 초기 투명도
    scale: 1, // @type {number} - 초기 크기
    duration: 0.5, // @type {number} - 초기 지속 시간
  }); // @description 애니메이션 속성 상태 관리
  // @reason 애니메이션 속성 동적 변경

  useEffect(() => {
    if (isSaving) {
      // 저장 중일 때 애니메이션
      // @description 저장 중 상태에 따른 애니메이션 설정
      // @reason 사용자에게 저장 중임을 시각적으로 알림
      console.log('useAutoSaveAnimation - Applying save animation'); // @description 디버깅용 로그
      // @description 애니메이션 시작 디버깅
      // @reason 애니메이션 상태 확인

      gsap.to(animationProps, {
        opacity: 0.5, // @description 투명도 변경
        scale: 1.1, // @description 크기 확대
        duration: 0.5, // @description 지속 시간 설정
        onUpdate: () => {
          setAnimationProps({ ...animationProps }); // @description 애니메이션 속성 업데이트
          // @reason 컴포넌트에서 최신 속성 반영
        },
        onComplete: () => {
          // 저장 완료 후 원래 상태로 복귀
          // @description 애니메이션 완료 후 속성 복구
          // @reason 자연스러운 시각적 피드백
          gsap.to(animationProps, {
            opacity: 1, // @description 투명도 복구
            scale: 1, // @description 크기 복구
            duration: 0.5, // @description 지속 시간 설정
            onUpdate: () => {
              setAnimationProps({ ...animationProps }); // @description 애니메이션 속성 업데이트
              // @reason 컴포넌트에서 최신 속성 반영
            },
          });
        },
      });
    }
  }, [isSaving]); // @description isSaving 의존성 추가
  // @reason 저장 상태 변경 시 애니메이션 트리거

  // Fallback 처리
  // @description 애니메이션 속성 확인, 없으면 기본값 사용
  // @reason 애플리케이션 충돌 방지
  const safeAnimationProps = {
    opacity: animationProps.opacity || 1, // @type {number} - Fallback: 1
    scale: animationProps.scale || 1, // @type {number} - Fallback: 1
    duration: animationProps.duration || 0.5, // @type {number} - Fallback: 0.5
  }; // @description 안전한 애니메이션 속성 객체 생성
  // @reason 속성 누락 시 기본값 제공

  return { animationProps: safeAnimationProps }; // @type {Object} - 애니메이션 속성 반환
  // @description 안전한 애니메이션 속성 반환
  // @reason 컴포넌트에서 애니메이션 속성 사용 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 애니메이션 효과 사용 가능
// @analogy 도서관에서 깜빡이는 알림 효과를 공유
export default useAutoSaveAnimation;

// **작동 매커니즘**
// 1. `AnimationProps` 타입 정의: 애니메이션 속성 구조 명시.
// 2. `useState`로 `animationProps` 상태 관리: 애니메이션 속성 동적 변경.
// 3. `useEffect`로 `isSaving` 상태 감지:
//    - `isSaving`이 `true`일 때 GSAP 애니메이션 실행 (투명도 감소, 크기 확대).
//    - 애니메이션 완료 후 원래 상태로 복구.
// 4. `console.log`로 디버깅 가능하도록 출력.
// 5. `safeAnimationProps`로 Fallback 처리: 기본값 제공.
// 6. `animationProps` 반환: 컴포넌트에서 애니메이션 속성 사용 가능.
// @reason 애니메이션 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장 시 알림이 깜빡이도록 설정.

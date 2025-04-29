/**
 * @file useAutoSaveAnimation.ts
 * @description 자동저장 시 GSAP 애니메이션 효과를 적용하는 커스텀 훅
 * @reason 애니메이션 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 저장 알림에 깜빡이는 효과를 추가하는 것
 */

import { useEffect } from 'react'; // @type {Function} - React 훅
// @description useEffect 훅 가져오기
// @reason 저장 상태 변경 시 애니메이션 트리거
// @analogy 도서관에서 알림 상태 변화를 감지하는 도구 사용

import gsap from 'gsap'; // @type {Object} - GSAP 라이브러리
// @description GSAP 가져오기
// @reason 애니메이션 효과 구현
// @analogy 도서관에서 깜빡이는 알림 효과를 위한 도구 가져오기

import { RefObject } from 'react'; // @type {Object} - React Ref 타입
// @description RefObject 타입 가져오기
// @reason DOM 요소 참조 타입 정의
// @analogy 도서관에서 알림판의 위치를 참조하는 도구

// 커스텀 훅 정의
// @description 자동저장 시 애니메이션 실행
// @reason 저장 상태에 따라 애니메이션 효과 제공
// @analogy 도서관에서 저장 시 알림이 깜빡이도록 설정
const useAutoSaveAnimation = (
  isSaving: boolean,
  elementRef: RefObject<HTMLElement>
) => {
  useEffect(() => {
    // DOM 요소 참조 확인
    // @description elementRef.current가 존재하는지 확인
    // @reason 유효하지 않은 참조로 인한 에러 방지
    if (!elementRef.current) {
      console.warn('useAutoSaveAnimation - No element reference provided'); // @description 디버깅용 경고
      // @description 참조 누락 디버깅
      // @reason 문제 해결 지원
      return;
    }

    if (isSaving) {
      // 저장 중일 때 애니메이션
      // @description 저장 중 상태에 따른 애니메이션 설정
      // @reason 사용자에게 저장 중임을 시각적으로 알림
      console.log('useAutoSaveAnimation - Applying save animation'); // @description 디버깅용 로그
      // @description 애니메이션 시작 디버깅
      // @reason 애니메이션 상태 확인

      // 초기 상태 설정: 보이지 않음, 아래 위치
      // @description 요소를 처음에 보이지 않게 설정
      // @reason 애니메이션 시작점 설정
      gsap.from(elementRef.current, {
        opacity: 0, // @description 투명도 설정 (보이지 않음)
        translateY: 100, // @description 아래 위치에서 시작
        duration: 1, // @description 즉시 적용
      });

      // 나타나는 애니메이션: 보이게 되며 원래 위치로 이동
      // @description 요소를 보이게 하고 원래 위치로 이동
      // @reason 사용자에게 저장 중임을 시각적으로 알림
      gsap.to(elementRef.current, {
        opacity: 1, // @description 투명도 변경 (보이게 됨)
        translateY: 0, // @description 원래 위치로 이동
        duration: 1.2, // @description 지속 시간 설정
        ease: 'power2.inOut', // @description 이징 효과 추가
        onComplete: () => {
          // 사라지는 애니메이션: 다시 보이지 않게 아래로 이동
          // @description 애니메이션 완료 후 요소를 다시 숨김
          // @reason 자연스러운 시각적 피드백
          gsap.to(elementRef.current, {
            opacity: 0, // @description 투명도 복구 (보이지 않음)
            translateY: 100, // @description 아래로 이동
            ease: 'power2.inOut', // @description 이징 효과 추가
          });
        },
      });
    }
  }, [isSaving, elementRef]); // @description isSaving과 elementRef 의존성 추가
  // @reason 저장 상태 변경 및 참조 변경 시 애니메이션 트리거
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 컴포넌트에서 애니메이션 효과 사용 가능
// @analogy 도서관에서 깜빡이는 알림 효과를 공유
export default useAutoSaveAnimation;

// **작동 매커니즘**
// 1. `RefObject` 타입 정의: DOM 요소 참조 타입 명시 (HTMLElement로 유연하게 변경).
// 2. `useEffect`로 `isSaving` 상태 감지:
//    - `isSaving`이 `true`일 때 GSAP 애니메이션 실행.
//    - `gsap.from`으로 초기 상태 설정 (`opacity: 0`, `translateY: 100`).
//    - `gsap.to`로 나타나는 효과 적용 (`opacity: 1`, `translateY: 0`).
//    - `onComplete`에서 `gsap.to`로 사라지는 효과 적용 (`opacity: 0`, `translateY: 100`).
// 3. `console.log`와 `console.warn`으로 디버깅 가능하도록 출력.
// 4. `elementRef` 유효성 검사: 참조 누락 시 경고 출력.
// @reason 애니메이션 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 저장 시 알림판이 아래에서 올라왔다가 다시 내려가며 사라지도록 설정.

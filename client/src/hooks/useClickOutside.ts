/**
 * @file useClickOutside.ts
 * @description 지정된 요소 외부를 클릭했을 때 콜백 함수를 호출하는 커스텀 훅
 * @reason 모달 및 바텀 시트 외부 클릭 감지 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 문이 닫히는 소리를 듣고 문 밖에서 누가 있는지 확인하는 것
 */

import { useEffect, useRef } from 'react'; // @type {Function} - React 훅
// @description useEffect와 useRef 훅 가져오기
// @reason 외부 클릭 이벤트 리스너 관리 및 요소 참조
// @analogy 도서관에서 문 밖 소리를 감지하는 장치 설치

// 커스텀 훅 정의
// @description 요소 외부 클릭을 감지하는 훅
// @reason 모달/바텀 시트 닫기 기능 구현
// @analogy 도서관에서 문 밖 소리를 감지하여 문을 닫는 로직
const useClickOutside = (
  handler: () => void // @type {Function} - 외부 클릭 시 호출될 콜백 함수
  // @description 외부 클릭 시 실행할 함수
  // @reason 모달/바텀 시트 닫기 등의 동작 수행
) => {
  const ref = useRef<HTMLDivElement | null>(null); // @type {RefObject<HTMLDivElement>} - Fallback: null
  // @description 감지 대상 요소를 참조하기 위한 ref
  // @reason 클릭 이벤트를 감지할 요소 지정
  // @analogy 도서관에서 감지할 문을 지정

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // @description 클릭 이벤트 처리 함수
      // @reason 요소 외부 클릭 여부 확인
      const target = event.target as Node; // @type {Node} - 이벤트 대상
      // @description 클릭된 요소를 Node 타입으로 변환
      // @reason contains 메서드 사용을 위해 필요

      const currentRef = ref.current || null; // @type {HTMLDivElement | null} - Fallback: null
      // @description ref.current 값 가져오기, 없으면 null
      // @reason ref.current가 없을 경우 애플리케이션 충돌 방지

      if (currentRef && !currentRef.contains(target)) {
        // @description 요소 외부 클릭 여부 확인
        // @reason 외부 클릭 시 콜백 호출
        console.log('useClickOutside - Clicked outside:', target); // @description 디버깅용 로그
        // @description 외부 클릭 디버깅
        // @reason 클릭 위치 확인
        handler(); // @description 외부 클릭 시 핸들러 호출
        // @reason 모달/바텀 시트 닫기 등의 동작 수행
      }
    };

    const safeHandler = handler || (() => console.log('Fallback handler')); // @type {Function} - Fallback: 로그 출력
    // @description 핸들러 함수 확인, 없으면 기본 함수
    // @reason 핸들러가 없을 경우 애플리케이션 충돌 방지
    // @analogy 도서관에서 문 밖 소리가 없으면 기본 알림으로 대체

    document.addEventListener('mousedown', handleClickOutside); // @description 클릭 이벤트 리스너 추가
    // @reason 외부 클릭 감지 시작
    // @analogy 도서관에서 문 밖 소리 감지 시작

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // @description 클릭 이벤트 리스너 제거
      // @reason 컴포넌트 언마운트 시 리스너 정리
      // @analogy 도서관에서 문 밖 소리 감지 중지
    };
  }, [handler]); // @description handler 의존성 추가
  // @reason handler 변경 시 이벤트 리스너 업데이트

  return ref; // @type {RefObject<HTMLDivElement>} - 참조 객체 반환
  // @description 감지 대상 요소에 연결할 ref 반환
  // @reason 컴포넌트에서 ref를 요소에 연결 가능
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 모달/바텀 시트 컴포넌트에서 외부 클릭 감지 가능
// @analogy 도서관에서 문 밖 소리 감지 장치를 공유
export default useClickOutside;

// **작동 매커니즘**
// 1. `useRef`로 감지 대상 요소를 참조하기 위한 ref 생성.
// 2. `useEffect`로 클릭 이벤트 리스너를 문서에 추가.
// 3. `handleClickOutside` 함수가 클릭 이벤트를 처리:
//    - 클릭된 요소(`event.target`)가 ref 요소 내부에 있는지 확인.
//    - 외부 클릭 시 `handler` 콜백 호출.
// 4. `console.log`로 디버깅 가능하도록 출력.
// 5. 컴포넌트 언마운트 시 이벤트 리스너 제거.
// 6. `ref`를 반환하여 컴포넌트에서 감지 대상 요소에 연결 가능.
// @reason 외부 클릭 감지 로직을 캡슐화하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 문 밖 소리를 감지하여 문을 닫는 로직.

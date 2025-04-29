/**
 * @file useMediaQuery.ts
 * @description 뷰포트 사이즈에 따라 스타일을 동적으로 반환하는 커스텀 훅
 * @reason 뷰포트 사이즈 감지 및 스타일 적용 로직을 분리하여 단일 책임 원칙 준수
 * @analogy 도서관에서 창문 크기를 확인하여 문의 열림 정도를 다르게 설정하는 것
 */

import { useState, useEffect, useCallback } from 'react'; // @type {Function} - React 훅
// @description useState, useEffect, useCallback 훅 가져오기
// @reason 뷰포트 상태 관리, 미디어 쿼리 감지, 핸들러 메모이제이션
// @analogy 도서관에서 창문 크기 변화를 감지하는 장치 설치

//====여기부터 수정됨====
// 미디어 쿼리 브레이크포인트 정의
// @description 다양한 뷰포트 크기 기준값
// @reason 브레이크포인트별 스타일 적용 가능하도록 설정
// @analogy 도서관에서 창문 크기 기준을 여러 단계로 나눔
const BREAKPOINTS = {
  mobile: '(max-width: 576px)', // @type {string} - 모바일 브레이크포인트
  tablet: '(max-width: 768px)', // @type {string} - 태블릿 브레이크포인트
  desktop: '(max-width: 1200px)', // @type {string} - 데스크톱 브레이크포인트
  large: '(min-width: 1201px)', // @type {string} - 대형 화면
} as const;

// 스타일 객체 타입 정의
// @type {Object} - 스타일 객체의 구조
// @description 스타일 객체의 타입을 정의하여 TypeScript에서 타입 안정성 보장
// @reason 타입 오류 방지 및 코드 가독성 향상
// @analogy 도서관에서 문의 열림 정도를 정의하는 형식
interface MediaStyles {
  modalWidth: string; // @type {string} - 모달 너비
  modalHeight: string; // @type {string} - 모달 높이
  fontSize: string; // @type {string} - 폰트 크기
  padding: string; // @type {string} - 패딩
}

// 브레이크포인트별 스타일 정의
// @description 각 브레이크포인트에 맞는 스타일 객체
// @reason 뷰포트 크기에 따라 적절한 스타일 반환
// @analogy 도서관에서 창문 크기에 따라 문의 열림 정도를 다르게 설정
const STYLES: Record<keyof typeof BREAKPOINTS, MediaStyles> = {
  mobile: {
    modalWidth: '90%', // @type {string} - 모바일에서 모달 너비
    modalHeight: '80%', // @type {string} - 모바일에서 모달 높이
    fontSize: '14px', // @type {string} - 모바일에서 폰트 크기
    padding: '10px', // @type {string} - 모바일에서 패딩
  },
  tablet: {
    modalWidth: '80%', // @type {string} - 태블릿에서 모달 너비
    modalHeight: '70%', // @type {string} - 태블릿에서 모달 높이
    fontSize: '16px', // @type {string} - 태블릿에서 폰트 크기
    padding: '15px', // @type {string} - 태블릿에서 패딩
  },
  desktop: {
    modalWidth: '60%', // @type {string} - 데스크톱에서 모달 너비
    modalHeight: '60%', // @type {string} - 데스크톱에서 모달 높이
    fontSize: '18px', // @type {string} - 데스크톱에서 폰트 크기
    padding: '20px', // @type {string} - 데스크톱에서 패딩
  },
  large: {
    modalWidth: '50%', // @type {string} - 대형 화면에서 모달 너비
    modalHeight: '50%', // @type {string} - 대형 화면에서 모달 높이
    fontSize: '20px', // @type {string} - 대형 화면에서 폰트 크기
    padding: '25px', // @type {string} - 대형 화면에서 패딩
  },
};

// 상태 타입 정의
// @type {Object} - 각 브레이크포인트의 매칭 여부
// @description 미디어 쿼리 매칭 상태를 관리
// @reason 각 브레이크포인트별 매칭 여부 추적
// @analogy 도서관에서 각 창문 크기 기준에 따라 문의 상태를 기록
interface MediaQueryState {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
  large: boolean;
}
//====여기까지 수정됨====

// 커스텀 훅 정의
// @description 뷰포트 사이즈에 따라 스타일을 반환하는 훅
// @reason 모달/바텀 시트 스타일 동적 변경
// @analogy 도서관에서 창문 크기에 따라 문의 열림 정도를 조정
const useMediaQuery = () => {
  //====여기부터 수정됨====
  // 초기 상태 설정
  // @description 각 브레이크포인트의 초기 매칭 여부 설정
  // @reason 컴포넌트 마운트 시 초기값 설정
  const initialState: MediaQueryState = {
    mobile: window.matchMedia(BREAKPOINTS.mobile).matches, // @type {boolean} - 초기 모바일 매칭 여부
    tablet: window.matchMedia(BREAKPOINTS.tablet).matches, // @type {boolean} - 초기 태블릿 매칭 여부
    desktop: window.matchMedia(BREAKPOINTS.desktop).matches, // @type {boolean} - 초기 데스크톱 매칭 여부
    large: window.matchMedia(BREAKPOINTS.large).matches, // @type {boolean} - 초기 대형 화면 매칭 여부
  };

  const [mediaState, setMediaState] = useState<MediaQueryState>(initialState); // @type {MediaQueryState} - 상태 관리
  // @description 미디어 쿼리 상태 관리
  // @reason 뷰포트 상태 변경 시 업데이트

  // 현재 뷰포트에 맞는 스타일 결정
  // @description 브레이크포인트별 매칭 여부를 기반으로 스타일 반환
  // @reason 뷰포트 크기에 따라 적절한 스타일 적용
  // @analogy 도서관에서 창문 크기에 따라 문의 열림 정도 결정
  const getCurrentStyle = useCallback((): MediaStyles => {
    const { mobile, tablet, desktop, large } = mediaState;

    if (mobile) {
      console.log('useMediaQuery - Style: mobile'); // @description 디버깅용 로그
      // @description 현재 스타일 디버깅
      // @reason 적용된 스타일 확인
      return STYLES.mobile; // @type {MediaStyles} - 모바일 스타일 반환
    }
    if (tablet) {
      console.log('useMediaQuery - Style: tablet'); // @description 디버깅용 로그
      // @description 현재 스타일 디버깅
      // @reason 적용된 스타일 확인
      return STYLES.tablet; // @type {MediaStyles} - 태블릿 스타일 반환
    }
    if (desktop) {
      console.log('useMediaQuery - Style: desktop'); // @description 디버깅용 로그
      // @description 현재 스타일 디버깅
      // @reason 적용된 스타일 확인
      return STYLES.desktop; // @type {MediaStyles} - 데스크톱 스타일 반환
    }
    if (large) {
      console.log('useMediaQuery - Style: large'); // @description 디버깅용 로그
      // @description 현재 스타일 디버깅
      // @reason 적용된 스타일 확인
      return STYLES.large; // @type {MediaStyles} - 대형 화면 스타일 반환
    }

    // Fallback 스타일
    // @description 모든 조건에 매칭되지 않을 경우 기본 스타일 반환
    // @reason 애플리케이션 충돌 방지
    return STYLES.large; // @type {MediaStyles} - Fallback: 대형 화면 스타일
  }, [mediaState]); // @description mediaState 의존성 추가
  // @reason mediaState 변경 시 스타일 재계산

  // 각 브레이크포인트별 미디어 쿼리 감지
  useEffect(() => {
    const mediaQueries = {
      mobile: window.matchMedia(BREAKPOINTS.mobile), // @type {MediaQueryList} - 모바일 쿼리
      tablet: window.matchMedia(BREAKPOINTS.tablet), // @type {MediaQueryList} - 태블릿 쿼리
      desktop: window.matchMedia(BREAKPOINTS.desktop), // @type {MediaQueryList} - 데스크톱 쿼리
      large: window.matchMedia(BREAKPOINTS.large), // @type {MediaQueryList} - 대형 화면 쿼리
    };

    // Fallback 처리
    // @description 미디어 쿼리 객체 확인, 없으면 기본 객체
    // @reason window.matchMedia가 없을 경우 애플리케이션 충돌 방지
    const safeMediaQueries = Object.keys(mediaQueries).reduce((acc, key) => {
      const media = mediaQueries[key as keyof typeof mediaQueries];
      acc[key as keyof typeof mediaQueries] = media || {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      }; // @type {MediaQueryList} - Fallback: 기본 객체
      return acc;
    }, {} as Record<keyof typeof BREAKPOINTS, MediaQueryList>);

    // 초기 상태 설정
    // @description 컴포넌트 마운트 시 초기 매칭 여부 설정
    // @reason 초기 뷰포트 상태 반영
    setMediaState({
      mobile: safeMediaQueries.mobile.matches, // @type {boolean} - 초기 모바일 매칭 여부
      tablet: safeMediaQueries.tablet.matches, // @type {boolean} - 초기 태블릿 매칭 여부
      desktop: safeMediaQueries.desktop.matches, // @type {boolean} - 초기 데스크톱 매칭 여부
      large: safeMediaQueries.large.matches, // @type {boolean} - 초기 대형 화면 매칭 여부
    });

    // 미디어 쿼리 변경 핸들러
    // @description 각 브레이크포인트별 변경 이벤트 핸들러
    // @reason 뷰포트 상태 변경 시 상태 업데이트
    const handleChange =
      (breakpoint: keyof MediaQueryState) => (e: MediaQueryListEvent) => {
        const newMatches = e.matches || false; // @type {boolean} - Fallback: false
        // @description 미디어 쿼리 매칭 여부 추출
        // @reason 매칭 여부가 없으면 기본값 사용
        console.log(`useMediaQuery - ${breakpoint} Matches:`, newMatches); // @description 디버깅용 로그
        // @description 매칭 여부 디버깅
        // @reason 뷰포트 상태 확인
        setMediaState((prev) => ({
          ...prev,
          [breakpoint]: newMatches, // @type {boolean} - 해당 브레이크포인트 상태 업데이트
        }));
      };

    // 각 브레이크포인트별 리스너 추가
    // @description 미디어 쿼리 변경 감지 시작
    // @reason 뷰포트 상태 변경 시 업데이트
    safeMediaQueries.mobile.addEventListener('change', handleChange('mobile'));
    safeMediaQueries.tablet.addEventListener('change', handleChange('tablet'));
    safeMediaQueries.desktop.addEventListener(
      'change',
      handleChange('desktop')
    );
    safeMediaQueries.large.addEventListener('change', handleChange('large'));

    return () => {
      // 리스너 제거
      // @description 컴포넌트 언마운트 시 리스너 정리
      // @reason 메모리 누수 방지
      safeMediaQueries.mobile.removeEventListener(
        'change',
        handleChange('mobile')
      );
      safeMediaQueries.tablet.removeEventListener(
        'change',
        handleChange('tablet')
      );
      safeMediaQueries.desktop.removeEventListener(
        'change',
        handleChange('desktop')
      );
      safeMediaQueries.large.removeEventListener(
        'change',
        handleChange('large')
      );
    };
  }, []); // @description 의존성 배열 비움
  // @reason 컴포넌트 마운트/언마운트 시에만 실행

  return getCurrentStyle(); // @type {MediaStyles} - 현재 스타일 객체 반환
  // @description 현재 뷰포트에 맞는 스타일 반환
  // @reason 컴포넌트에서 스타일 적용 가능
  //====여기까지 수정됨====
};

// 훅 내보내기
// @description 커스텀 훅을 다른 파일에서 사용할 수 있도록 내보냄
// @reason 모달/바텀 시트 컴포넌트에서 스타일 동적 적용 가능
// @analogy 도서관에서 창문 크기 감지 장치를 공유
export default useMediaQuery;

// **작동 매커니즘**
// 1. `BREAKPOINTS`와 `STYLES` 정의: 브레이크포인트와 이에 대응하는 스타일 설정.
// 2. `useState`로 각 브레이크포인트의 매칭 상태(`mediaState`) 관리.
// 3. `useEffect`로 각 브레이크포인트별 미디어 쿼리 감지:
//    - `window.matchMedia`로 각 브레이크포인트에 대한 쿼리 객체 생성.
//    - `change` 이벤트 리스너 추가하여 뷰포트 상태 변경 감지.
//    - 상태 변경 시 `setMediaState`로 상태 업데이트.
// 4. `getCurrentStyle` 함수로 현재 뷰포트에 맞는 스타일 결정:
//    - `mediaState`를 기반으로 조건문을 통해 적절한 스타일 객체 반환.
// 5. `console.log`로 디버깅 가능하도록 출력.
// 6. 컴포넌트 언마운트 시 리스너 제거.
// 7. 현재 스타일 객체를 반환하여 컴포넌트에서 사용 가능.
// @reason 뷰포트 사이즈에 따라 스타일을 동적으로 적용하여 코드 재사용성과 유지보수성 향상.
// @analogy 도서관에서 창문 크기에 따라 문의 열림 정도를 조정.

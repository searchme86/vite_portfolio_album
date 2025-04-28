// @file postSetters.js
// @description Zustand 스토어에서 상태를 설정하는 함수 정의
// @reason 상태 업데이트 로직을 분리하여 관리
// @analogy 도서관에서 장부를 업데이트하는 도구 제공
// @param {Function} set - Zustand의 set 함수
// @returns {Object} - 상태를 설정하는 함수들
// @typescript {(set: Function) => Object} - 함수 타입
export const postSetters = (set) => ({
  // setToken: 사용자 인증 토큰 설정
  // @type {(token: string | null) => void}
  // @description 사용자 인증 토큰을 설정
  // @reason API 요청 시 인증에 필요
  // @analogy 도서관에서 인증 키 저장
  // @typescript {(token: string | null) => void} - 함수 타입
  setToken: (token) => set({ token }),

  // addPostsData: 포스트 데이터 추가
  // @type {({ pages: Array<Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>>, pageParams: Array<number> }) => void}
  // @description 기존 데이터에 새 데이터를 추가해 상태 업데이트, 중복 페이지 방지
  // @reason 포스트 목록을 확장하면서 중복 방지
  // @analogy 도서관에서 기존 책 목록에 새 책 추가, 중복 책 제외
  // @typescript {(data: { pages: Array<Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>>, pageParams: number[] }) => void} - 함수 타입
  addPostsData: ({ pages, pageParams }) =>
    set((state) => {
      const safePages = state.postsData?.pages || []; // @type {Array<Array>} - 이전 페이지 데이터
      // @description 안전하게 이전 데이터 접근
      // @reason 데이터가 없을 경우 빈 배열로 초기화
      // @analogy 도서관에서 기존 책 목록 확인
      // @typescript {Array<Array<{ _id: string, title: string, content: string, img: string[], likesCount: number }>>} - 타입

      const safePageParams = state.postsData?.pageParams || []; // @type {Array<number>} - 이전 페이지 파라미터
      // @description 안전하게 이전 파라미터 접근
      // @reason 데이터가 없을 경우 빈 배열로 초기화
      // @analogy 도서관에서 기존 페이지 정보 확인
      // @typescript {Array<number>} - 타입

      // @description 상태 관리 최적화 부족 문제 해결: 데이터 유효성 검증 추가
      // @reason 유효하지 않은 데이터로 인해 상태가 손상되는 것 방지
      // @improvement 상태 관리 안정성 향상, 중복 데이터 축적 방지
      // @analogy 도서관에서 책 목록 추가 전 유효성 확인
      if (
        !pages ||
        !pageParams ||
        !Array.isArray(pages) ||
        !Array.isArray(pageParams)
      ) {
        console.warn('Invalid pages or pageParams:', { pages, pageParams });
        return state; // @description 유효하지 않은 데이터면 상태 변경하지 않음
        // @reason 상태 손상 방지
        // @analogy 도서관에서 잘못된 책 목록은 추가하지 않음
      }

      // @description 동일한 pageParams를 가진 데이터가 이미 존재하는지 확인
      // @reason 중복 페이지 데이터를 방지하기 위해
      // @analogy 도서관에서 같은 페이지의 책 목록이 이미 있는지 확인
      const existingPageIndex = safePageParams.findIndex(
        (param, index) =>
          param === pageParams[0] && index < safePageParams.length
      );

      let updatedPages = [...safePages];
      let updatedPageParams = [...safePageParams];

      if (existingPageIndex !== -1) {
        // @description 동일한 페이지가 이미 존재하면 덮어쓰기
        // @reason 중복 데이터 방지
        // @analogy 도서관에서 같은 페이지의 책 목록을 덮어씌움
        updatedPages[existingPageIndex] = pages[0];
        updatedPageParams[existingPageIndex] = pageParams[0];
      } else {
        // @description 새로운 페이지면 추가
        // @reason 새로운 데이터를 기존 데이터에 추가
        // @analogy 도서관에서 새로운 페이지의 책 목록 추가
        updatedPages = [...safePages, ...pages];
        updatedPageParams = [...safePageParams, ...pageParams];
      }

      return {
        postsData: {
          pages: updatedPages,
          pageParams: updatedPageParams,
        },
      }; // @type {Object} - 업데이트된 상태
      // @description 업데이트된 상태 반환
      // @reason Zustand 상태 업데이트
      // @analogy 도서관에서 업데이트된 장부 반환
      // @typescript {{ postsData: { pages: Array<Array>, pageParams: Array<number> } }} - 반환 타입
    }),
});

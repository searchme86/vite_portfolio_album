/**
 * @file likeSetters.js
 * @description 좋아요 상태를 변경하는 Zustand 액션 함수
 * @reason 좋아요 상태와 카운트를 관리
 * @analogy 도서관에서 대여 장부를 업데이트하는 함수
 */
export const likeSetters = (set, get) => ({
  toggleLike: async (entityId, mutate, invalidate) => {
    const currentState = get(); // @type {Object} - 현재 Zustand 스토어 상태
    // @description 현재 Zustand 스토어 상태 가져오기
    // @reason 상태 변경 전 현재 상태 확인
    // @analogy 도서관에서 대여 장부 현재 상태 확인
    const currentStatuses = currentState.likeStatuses; // @type {Object} - 현재 좋아요 상태
    // @description 현재 좋아요 상태 객체 가져오기
    // @reason 좋아요 상태 변경을 위해 현재 값 필요
    // @analogy 도서관에서 책별 대여 상태 확인
    const currentCounts = currentState.likeCounts; // @type {Object} - 현재 좋아요 카운트
    // @description 현재 좋아요 카운트 객체 가져오기
    // @reason 카운트 업데이트를 위해 현재 값 필요
    // @analogy 도서관에서 책별 대여 횟수 확인
    const originalCounts = currentState.originalLikeCounts; // @type {Object} - 원래 좋아요 카운트
    // @description 서버에서 받은 원래 좋아요 카운트 가져오기
    // @reason 좋아요 취소 시 원래 값으로 복원
    // @analogy 도서관에서 백업된 대여 횟수 확인

    const isCurrentlyLiked = currentStatuses[entityId] || false; // @type {boolean} - 현재 좋아요 상태
    // @description 현재 포스트의 좋아요 상태 확인
    // @reason 상태 반전을 위해 현재 값 필요
    // @analogy 도서관에서 책의 현재 대여 여부 확인
    const newLikeStatuses = {
      ...currentStatuses,
      [entityId]: !isCurrentlyLiked, // @type {boolean} - 새로운 좋아요 상태
      // @description 해당 포스트의 좋아요 상태를 반전
      // @reason 낙관적 업데이트로 UI 즉시 반영
      // @analogy 도서관에서 대여 상태를 즉시 반전 표시
    };

    const currentCount = currentCounts[entityId] || 0; // @type {number} - 현재 좋아요 카운트
    // @description 현재 포스트의 좋아요 카운트 가져오기, 없으면 0
    // @reason 카운트 업데이트를 위해 현재 값 필요
    // @analogy 도서관에서 책의 대여 횟수 확인
    const newCount = !isCurrentlyLiked
      ? currentCount + 1
      : originalCounts[entityId] || 0; // @type {number} - 새로운 좋아요 카운트
    // @description 좋아요 추가 시 count + 1, 취소 시 원래 값으로 복원
    // @reason 좋아요 취소 시 서버 상태로 복원
    // @analogy 도서관에서 대여 시 횟수 증가, 반납 시 서버 기록으로 복원
    const newLikeCounts = {
      ...currentCounts,
      [entityId]: newCount >= 0 ? newCount : 0, // @type {Object} - 새로운 좋아요 카운트 객체
      // @description 카운트가 음수가 되지 않도록 보장
      // @reason 잘못된 카운트 방지
      // @analogy 도서관에서 대여 횟수가 음수가 되지 않도록
    };

    set({
      likeStatuses: newLikeStatuses, // @description 좋아요 상태 업데이트
      // @reason UI에 새로운 좋아요 상태 반영
      // @analogy 도서관에서 대여 상태 업데이트
      likeCounts: newLikeCounts, // @description 좋아요 카운트 업데이트
      // @reason UI에 새로운 카운트 반영
      // @analogy 도서관에서 대여 횟수 업데이트
    });

    try {
      if (mutate) {
        const response = await mutate(entityId); // @type {Object} - 서버 응답
        // @description 서버에 좋아요 토글 요청
        // @reason 서버와 상태 동기화
        // @analogy 도서관에서 대여 요청 서버로 전송

        const serverLikeCount = response.data.likeCount ?? 0; // @type {number} - 서버에서 받은 좋아요 카운트
        // @description 서버 응답에서 좋아요 카운트 추출, 없으면 0
        // @reason 서버 상태로 동기화
        // @analogy 도서관에서 서버의 대여 횟수 확인
        const serverLikedStatus = response.data.liked ?? !isCurrentlyLiked; // @type {boolean} - 서버에서 받은 좋아요 상태
        // @description 서버 응답의 좋아요 상태 추출, 없으면 낙관적 상태 유지
        // @reason 서버와 상태 동기화
        // @analogy 도서관에서 서버의 대여 상태 확인

        set((state) => ({
          likeStatuses: {
            ...state.likeStatuses,
            [entityId]: serverLikedStatus, // @type {boolean} - 서버에서 받은 좋아요 상태
            // @description 서버 응답의 좋아요 상태로 업데이트
            // @reason 서버와 상태 동기화
            // @analogy 도서관에서 서버의 대여 상태로 장부 업데이트
          },
          likeCounts: {
            ...state.likeCounts,
            [entityId]: serverLikeCount, // @type {number} - 서버에서 받은 좋아요 카운트
            // @description 서버 응답의 좋아요 카운트로 업데이트
            // @reason 서버와 카운트 동기화
            // @analogy 도서관에서 서버의 대여 횟수로 장부 업데이트
          },
          originalLikeCounts: {
            ...state.originalLikeCounts,
            [entityId]: serverLikeCount, // @type {number} - 서버에서 받은 최신 좋아요 카운트
            // @description 서버에서 받은 최신 좋아요 카운트로 원래 값 업데이트
            // @reason 서버와의 동기화 유지
            // @analogy 도서관에서 서버의 최신 대여 횟수로 백업 업데이트
          },
        }));

        if (invalidate) {
          await invalidate(); // @description 캐시 무효화 실행
          // @reason 캐시 갱신으로 최신 데이터 가져오기
          // @analogy 도서관에서 게시판 갱신
        }
      } else {
        throw new Error('Mutate function not provided'); // @description 뮤테이션 함수 누락 에러
        // @reason 뮤테이션 함수 없으면 에러 발생
        // @analogy 도서관에서 대여 요청 도구 없으면 요청 거부
      }
    } catch (error) {
      set({
        likeStatuses: currentStatuses, // @description 이전 상태로 롤백
        // @reason 에러 발생 시 원래 상태 복원
        // @analogy 도서관에서 대여 실패 시 장부 원래대로 복원
        likeCounts: currentCounts, // @description 이전 카운트로 롤백
        // @reason 에러 발생 시 원래 카운트 복원
        // @analogy 도서관에서 대여 횟수 원래대로 복원
      });
      throw error; // @description 에러 상위로 전파
      // @reason 상위 컴포넌트에서 에러 처리
      // @analogy 도서관에서 실패 사유 상위로 보고
    }
  },

  setInitialLikes: (userLikes) =>
    set((state) => {
      if (!userLikes || !Array.isArray(userLikes) || userLikes.length === 0) {
        return state; // @description 유효하지 않은 데이터면 상태 유지
        // @reason 불필요한 업데이트 방지
        // @analogy 도서관에서 대여 정보 없으면 장부 변경 안 함
      }

      const initialLikeStatuses = { ...state.likeStatuses }; // @type {Object} - 초기 좋아요 상태
      // @description 기존 좋아요 상태 복사
      // @reason 기존 상태 유지하며 서버 데이터 병합
      // @analogy 도서관에서 기존 대여 상태 유지하며 업데이트
      const initialLikeCounts = { ...state.likeCounts }; // @type {Object} - 초기 좋아요 카운트
      // @description 기존 좋아요 카운트 복사
      // @reason 기존 카운트 유지하며 서버 데이터 병합
      // @analogy 도서관에서 기존 대여 횟수 유지하며 업데이트
      const initialOriginalLikeCounts = { ...state.originalLikeCounts }; // @type {Object} - 초기 원래 좋아요 카운트
      // @description 기존 원래 좋아요 카운트 복사
      // @reason 기존 백업 데이터 유지하며 서버 데이터 병합
      // @analogy 도서관에서 기존 백업 유지하며 업데이트

      userLikes.forEach((like) => {
        const entityId = like.postId; // @type {string} - 포스트 ID
        // @description 좋아요 객체에서 포스트 ID 추출
        // @reason 상태와 카운트 설정에 ID 필요
        // @analogy 도서관에서 책 ID 확인
        const liked = like.liked ?? false; // @type {boolean} - 사용자별 좋아요 여부
        // @description 사용자가 해당 포스트를 좋아요 했는지 확인
        // @reason UI 스타일 동기화
        // @analogy 도서관에서 손님이 책을 빌렸는지 확인
        const likesCount = like.likesCount ?? 0; // @type {number} - 포스트의 좋아요 수
        // @description 포스트의 전체 좋아요 수 추출, 없으면 0
        // @reason 초기 카운트 설정
        // @analogy 도서관에서 책의 대여 횟수 확인

        if (!entityId) {
          return; // @description ID 없으면 스킵
          // @reason 유효하지 않은 데이터 무시
          // @analogy 도서관에서 잘못된 정보 스킵
        }

        // 기존 상태가 없거나 서버 데이터로 초기화해야 할 경우에만 업데이트
        if (!(entityId in initialLikeStatuses)) {
          initialLikeStatuses[entityId] = liked; // @type {boolean} - 사용자별 초기 좋아요 상태
          // @description 서버에서 받은 사용자별 좋아요 상태로 설정
          // @reason 사용자별 UI 상태 동기화
          // @analogy 도서관에서 손님의 대여 상태 설정
        }

        if (!(entityId in initialLikeCounts)) {
          initialLikeCounts[entityId] = likesCount; // @type {number} - 초기 좋아요 카운트
          // @description 서버에서 받은 전체 좋아요 수로 설정
          // @reason 서버와 카운트 동기화
          // @analogy 도서관에서 서버의 대여 횟수로 장부 설정
        }

        if (!(entityId in initialOriginalLikeCounts)) {
          initialOriginalLikeCounts[entityId] = likesCount; // @type {number} - 초기 원래 좋아요 카운트
          // @description 서버에서 받은 좋아요 수로 원래 값 설정
          // @reason 좋아요 취소 시 복원용 데이터 설정
          // @analogy 도서관에서 서버의 대여 횟수 백업
        }
      });

      return {
        likeStatuses: initialLikeStatuses, // @description 초기 좋아요 상태 설정
        // @reason Zustand 스토어에 상태 반영
        // @analogy 도서관에서 대여 상태 장부에 반영
        likeCounts: initialLikeCounts, // @description 초기 좋아요 카운트 설정
        // @reason Zustand 스토어에 카운트 반영
        // @analogy 도서관에서 대여 횟수 장부에 반영
        originalLikeCounts: initialOriginalLikeCounts, // @description 초기 원래 좋아요 카운트 설정
        // @reason Zustand 스토어에 원래 카운트 반영
        // @analogy 도서관에서 서버 대여 횟수 백업 반영
      };
    }),
});

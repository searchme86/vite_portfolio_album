/**
 * @file usePostWriteDraftSync.ts
 * @description 폼 데이터와 드래프트 데이터를 동기화하는 커스텀 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteDraftSync.ts
 */
import { useEffect } from 'react'; // @type {Function} - React 훅
// @description useEffect 훅 가져오기
// @reason 부수 효과 관리
// @analogy 도서관에서 책 데이터 변경 시 동기화

import { debounce } from 'lodash'; // @type {Function} - 디바운싱 유틸리티
// @description 함수 호출 지연
// @reason 성능 최적화
// @analogy 도서관에서 책 업데이트를 일정 시간 후 처리

import useDraftStore from '../../../../stores/draft/draftStore'; // @type {Function} - 드래프트 스토어 훅
// @description Zustand 스토어에서 드래프트 데이터 관리
// @reason 드래프트 데이터 동기화
// @analogy 도서관에서 저장된 책 데이터를 관리

// 드래프트 데이터 인터페이스 정의
interface DraftData {
  postTitle: string; // @type {string} - 드래프트 제목
  postDesc: string; // @type {string} - 드래프트 설명
  postContent: string; // @type {string} - 드래프트 본문
  tags: string[]; // @type {string[]} - 드래프트 태그
  imageUrls: string[]; // @type {string[]} - 드래프트 이미지 URL
  custom: Record<string, any>; // @type {Record<string, any>} - 커스텀 데이터
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date; // @type {Date} - 생성 시간 (이미 Date로 정의됨)
  updatedAt: Date; // @type {Date} - 수정 시간 (이미 Date로 정의됨)
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 디버깅 모드 설정
const isDebugMode = process.env.NODE_ENV === 'development'; // @type {boolean} - 디버깅 모드 여부
// @description 개발 환경에서만 로그 출력
// @reason 로그 과다 출력 방지

// 커스텀 훅 정의
export function usePostWriteDraftSync(
  form: any, // @type {Object} - react-hook-form 객체
  imageUrls: string[], // @type {string[]} - 이미지 URL 배열
  draftData: DraftData // @type {DraftData} - 드래프트 데이터
) {
  const { setDraftData } = useDraftStore(); // @type {Function} - 드래프트 데이터 설정 함수
  // @description Zustand 스토어의 드래프트 데이터 업데이트
  // @reason 드래프트 데이터 동기화

  const { watch } = form; // @type {Function} - 폼 데이터 감시 메서드
  // @description 폼 필드 값을 실시간으로 감시
  // @reason 데이터 변경 감지

  // 초기 드래프트 데이터 설정
  useEffect(() => {
    setDraftData(draftData); // @type {void} - 초기 드래프트 데이터 설정
    // @description 초기 드래프트 데이터를 스토어에 설정
    // @reason 초기값 동기화
  }, [draftData, setDraftData]); // @type {Array} - 의존성 배열
  // @description draftData 변경 시 실행
  // @reason 초기 데이터 변경 감지

  // 폼 데이터와 드래프트 동기화 (디바운싱 적용)
  useEffect(() => {
    const subscription = watch(
      debounce((formData: any) => {
        const updatedDraft: DraftData = {
          postTitle: formData.postTitle || '', // @type {string} - 제목, 빈 문자열로 폴백
          postDesc: formData.postDesc || '', // @type {string} - 설명, 빈 문자열로 폴백
          postContent: formData.postContent || '', // @type {string} - 본문, 빈 문자열로 폴백
          tags: formData.tags || [], // @type {string[]} - 태그, 빈 배열로 폴백
          imageUrls: imageUrls || [], // @type {string[]} - 이미지 URL, 빈 배열로 폴백
          custom: draftData.custom || {}, // @type {Record<string, any>} - 커스텀 데이터
          draftId: draftData.draftId || 'default_draft', // @type {string} - 드래프트 ID
          createdAt: draftData.createdAt || new Date(), // @type {Date} - 생성 시간
          updatedAt: new Date(), // @type {Date} - 수정 시간
          isTemporary: draftData.isTemporary || true, // @type {boolean} - 임시저장 여부
        }; // @type {DraftData} - 업데이트된 드래프트 데이터

        setDraftData(updatedDraft); // @type {void} - 드래프트 데이터 업데이트
        // @description 스토어에 업데이트된 드래프트 데이터 저장
        // @reason 폼 데이터와 드래프트 동기화

        if (isDebugMode) {
          console.log(
            'usePostWriteDraftSync - Synced draft data:',
            updatedDraft
          ); // @description 동기화 데이터 로그
          // @reason 동기화 상태 확인
        }
      }, 1000) // @type {number} - 디바운싱 지연 시간 (1초)
      // @description 1초 동안 추가 입력이 없으면 동기화
      // @reason 성능 최적화
    );

    return () => {
      subscription.unsubscribe(); // @type {void} - 구독 해제
      // @description watch 구독 해제
      // @reason 리소스 정리
    };
  }, [watch, imageUrls, draftData, setDraftData]); // @type {Array} - 의존성 배열
  // @description watch, imageUrls, draftData 변경 시 실행
  // @reason 데이터 변경 감지 및 동기화
}

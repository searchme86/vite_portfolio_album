/**
 * @file usePostWriteDraftSync.ts
 * @description 폼 데이터와 Zustand 스토어를 동기화하는 커스텀 훅
 * @location src/Pages/Post/PostForm/hooks/usePostWriteDraftSync.ts
 */
import { useEffect } from 'react'; // @type {Function} - React 훅
// @description React의 useEffect 훅을 가져옴
// @reason 컴포넌트 생명주기 동안 데이터 동기화를 관리하기 위해 사용
// @analogy 도서관에서 책 정보가 바뀔 때마다 기록부를 업데이트하는 직원

import { UseFormReturn } from 'react-hook-form'; // @type {Type} - React Hook Form의 폼 메서드 타입
// @description 폼 상태 및 메서드의 타입 정의
// @reason 타입 안전성을 보장하기 위해 사용
// @analogy 도서관에서 책 정보를 기록할 때 필요한 양식의 형식

import useDraftStore from '../../../../stores/draft/draftStore'; // @type {Function} - Zustand 스토어 훅
// @description 드래프트 데이터를 관리하는 Zustand 스토어에 접근
// @reason 중앙에서 드래프트 데이터를 관리하고 업데이트하기 위해 사용
// @analogy 도서관의 중앙 기록 시스템에 접근

// 폼 데이터의 타입 정의
interface PostWriteFormData {
  postTitle: string; // @type {string} - 포스트 제목
  postDesc: string; // @type {string} - 포스트 설명
  postContent: string; // @type {string} - 포스트 본문
  tags: string[]; // @type {string[]} - 포스트 태그 배열
}

// 드래프트 데이터의 타입 정의
interface DraftData {
  postTitle: string; // @type {string} - 드래프트 제목
  postDesc: string; // @type {string} - 드래프트 설명
  postContent: string; // @type {string} - 드래프트 본문
  tags: string[]; // @type {string[]} - 드래프트 태그 배열
  imageUrls: string[]; // @type {string[]} - 드래프트 이미지 URL 배열
  draftId: string; // @type {string} - 드래프트 ID
  createdAt: Date; // @type {Date} - 생성 시간
  updatedAt: Date; // @type {Date} - 수정 시간
  isTemporary: boolean; // @type {boolean} - 임시저장 여부
}

// 커스텀 훅 정의
export function usePostWriteDraftSync(
  form: UseFormReturn<PostWriteFormData>, // @type {UseFormReturn} - 폼 메서드
  // @description React Hook Form에서 제공하는 폼 상태 및 메서드
  // @reason 폼 데이터를 실시간으로 감지하고 동기화하기 위해 사용
  // @analogy 도서관에서 사서가 작성한 책 정보를 받아오는 도구
  imageUrls: string[], // @type {string[]} - 이미지 URL 배열
  // @description 업로드된 이미지 URL 목록
  // @reason 드래프트 데이터에 이미지 URL을 포함시키기 위해 사용
  // @analogy 도서관에서 책 표지 사진을 기록하는 리스트
  draftData: DraftData // @type {DraftData} - 드래프트 데이터
  // @description 초기 드래프트 데이터
  // @reason 기존 드래프트 데이터를 기반으로 업데이트를 시작하기 위해 사용
  // @analogy 도서관에서 기존에 작성된 책 정보를 기반으로 수정 시작
) {
  // Zustand 스토어에서 메서드 가져오기
  const { updateDraft, resetDraft } = useDraftStore(); // @type {Object} - Zustand 스토어 객체에서 메서드 추출
  // @description useDraftStore를 호출하여 스토어 객체를 가져오고, 그 안에서 updateDraft와 resetDraft 메서드를 추출
  // @reason createSelectors 제거로 스토어 객체에서 직접 메서드에 접근 가능
  // @analogy 도서관의 중앙 기록 시스템에서 직접 업데이트 도구와 초기화 도구를 꺼내옴

  const { watch } = form; // @type {Function} - 폼 감시 메서드
  // @description React Hook Form의 watch 메서드를 사용하여 폼 데이터를 실시간으로 감지
  // @reason 사용자 입력을 실시간으로 추적하기 위해 사용
  // @analogy 도서관에서 사서가 작성하는 책 정보를 실시간으로 확인하는 감시자

  // 실시간 폼 데이터 감지
  const formData = watch(); // @type {PostWriteFormData} - 감지된 폼 데이터
  // @description watch를 통해 폼의 모든 필드 값을 실시간으로 가져옴
  // @reason 최신 폼 데이터를 기반으로 스토어를 업데이트하기 위해 사용
  // @analogy 도서관에서 사서가 작성한 최신 책 정보를 가져옴

  // 디버깅 로그 추가: watch로 감지된 데이터 확인
  console.log('usePostWriteDraftSync - Watched formData:', formData);
  // @description 현재 감지된 폼 데이터를 콘솔에 출력
  // @reason 데이터가 제대로 감지되는지 확인하기 위해 사용
  // @analogy 도서관에서 사서가 작성한 정보를 확인하는 로그

  // 폼 데이터와 이미지 URL 동기화
  useEffect(() => {
    // 드래프트 업데이트
    updateDraft({
      postTitle: formData.postTitle || draftData.postTitle || '', // @type {string} - 폼에서 가져온 제목
      // @description 폼에서 가져온 제목을 설정, 없으면 draftData에서 가져오고, 그것도 없으면 빈 문자열로 대체 (fallback)
      // @reason 최신 제목을 반영하며, 값이 없으면 기존 데이터를 사용하거나 빈 문자열 설정
      postDesc: formData.postDesc || draftData.postDesc || '', // @type {string} - 폼에서 가져온 설명
      // @description 폼에서 가져온 설명을 설정, 없으면 draftData에서 가져오고, 그것도 없으면 빈 문자열로 대체 (fallback)
      // @reason 최신 설명을 반영하며, 값이 없으면 기존 데이터를 사용하거나 빈 문자열 설정
      postContent: formData.postContent || draftData.postContent || '', // @type {string} - 폼에서 가져온 본문
      // @description 폼에서 가져온 본문을 설정, 없으면 draftData에서 가져오고, 그것도 없으면 빈 문자열로 대체 (fallback)
      // @reason 최신 본문을 반영하며, 값이 없으면 기존 데이터를 사용하거나 빈 문자열 설정
      tags: formData.tags || draftData.tags || [], // @type {string[]} - 폼에서 가져온 태그
      // @description 폼에서 가져온 태그를 설정, 없으면 draftData에서 가져오고, 그것도 없으면 빈 배열로 대체 (fallback)
      // @reason 최신 태그를 반영하며, 값이 없으면 기존 데이터를 사용하거나 빈 배열 설정
      imageUrls: imageUrls || draftData.imageUrls || [], // @type {string[]} - 전달받은 이미지 URL
      // @description 전달받은 이미지 URL을 설정, 없으면 draftData에서 가져오고, 그것도 없으면 빈 배열로 대체 (fallback)
      // @reason 최신 이미지 URL을 반영하며, 값이 없으면 기존 데이터를 사용하거나 빈 배열 설정
      draftId: draftData.draftId || '', // @type {string} - 드래프트 ID
      // @description draftData에서 가져온 드래프트 ID를 설정, 없으면 빈 문자열로 대체 (fallback)
      // @reason 드래프트 ID를 유지하며, 값이 없으면 애플리케이션이 깨지지 않도록 빈 문자열 설정
      createdAt: draftData.createdAt || new Date(), // @type {Date} - 생성 시간
      // @description draftData에서 가져온 생성 시간을 설정, 없으면 현재 시간으로 대체 (fallback)
      // @reason 생성 시간을 유지하며, 값이 없으면 현재 시간을 사용
      updatedAt: new Date(), // @type {Date} - 수정 시간
      // @description 현재 시간으로 수정 시간을 업데이트
      // @reason 데이터가 변경될 때마다 최신 수정 시간을 반영
      isTemporary: draftData.isTemporary || false, // @type {boolean} - 임시저장 여부
      // @description draftData에서 가져온 임시저장 여부를 설정, 없으면 false로 대체 (fallback)
      // @reason 임시저장 여부를 유지하며, 값이 없으면 기본값으로 설정
    });
    // @description updateDraft를 호출하여 스토어의 상태를 업데이트
    // @reason 폼 데이터와 draftData를 병합하여 드래프트 데이터를 동기화
    // @analogy 도서관에서 사서가 작성한 최신 정보와 기존 기록을 병합하여 중앙 기록부에 반영

    // 디버깅 로그: 이미지 URL 업데이트 확인
    console.log(
      'usePostWriteDraftSync - Image URLs updated in draft:',
      imageUrls
    );
    // @description 이미지 URL이 드래프트에 반영되었는지 콘솔에 출력
    // @reason 이미지 데이터 동기화가 제대로 이루어졌는지 확인
    // @analogy 도서관에서 책 표지 사진이 기록부에 잘 추가되었는지 확인

    // 디버깅 로그: 드래프트 업데이트 확인
    console.log(
      'usePostWriteDraftSync - Draft updated with form data and image URLs'
    );
    // @description 드래프트가 성공적으로 업데이트되었음을 콘솔에 출력
    // @reason 동기화 과정이 완료되었음을 확인
    // @analogy 도서관에서 기록부 업데이트가 완료되었음을 알림
  }, [
    formData.postTitle, // @type {string} - 제목 변경 감지
    formData.postDesc, // @type {string} - 설명 변경 감지
    formData.postContent, // @type {string} - 본문 변경 감지
    formData.tags, // @type {string[]} - 태그 변경 감지
    imageUrls, // @type {string[]} - 이미지 URL 변경 감지
    updateDraft, // @type {Function} - 스토어 업데이트 메서드 변경 감지
    draftData, // @type {DraftData} - 초기 드래프트 데이터 변경 감지
  ]);
  // @description 의존성 배열: 폼 데이터, 이미지 URL, draftData가 변경될 때마다 useEffect 실행
  // @reason 데이터 변경 시 스토어를 동기화하기 위해 사용
  // @analogy 도서관에서 책 정보가 바뀔 때마다 기록부를 업데이트

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      resetDraft(); // @description 드래프트 데이터를 초기화
      // @reason 컴포넌트가 언마운트될 때 드래프트 데이터를 초기 상태로 되돌림
      // @analogy 도서관 문을 닫을 때 기록부를 초기화

      console.log('usePostWriteDraftSync - Cleanup completed');
      // @description 정리 작업이 완료되었음을 콘솔에 출력
      // @reason 정리 과정이 제대로 이루어졌는지 확인
      // @analogy 도서관에서 정리 작업이 끝났음을 알림
    };
  }, [resetDraft]);
  // @description 의존성 배열: resetDraft 메서드가 변경될 때마다 실행
  // @reason 컴포넌트 언마운트 시 정리 로직을 실행하기 위해 사용
  // @analogy 도서관 문을 닫을 때 정리 작업 수행
}

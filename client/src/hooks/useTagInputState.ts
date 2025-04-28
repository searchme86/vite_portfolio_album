// src/hooks/useTagInputState.js
import { useState } from 'react';

// 1. 태그 입력 상태 관리 훅
// 2. 태그 입력값과 추가 로직을 처리
export function useTagInputState() {
  const [tagInput, setTagInput] = useState(''); // 1. 태그 입력값 상태
  // 2. 사용자가 입력한 태그를 저장

  // 1. 태그 입력값 변경 핸들러
  // 2. 입력값을 상태에 반영
  const handleTagInputChange = (e) => {
    const value = e.target.value;
    setTagInput(value);
    console.log('Tag input changed:', value); // 1. 디버깅용 로그
    // 2. 입력값 변경 확인
  };

  // 1. 태그 입력값 초기화
  // 2. 태그 추가 후 입력값을 비움
  const resetTagInput = () => {
    setTagInput('');
    console.log('Tag input reset'); // 1. 디버깅용 로그
    // 2. 입력값 초기화 확인
  };

  return {
    tagInput, // 1. 현재 태그 입력값
    // 2. 컴포넌트에서 사용
    handleTagInputChange, // 1. 입력값 변경 함수
    // 2. 입력 이벤트 핸들링
    resetTagInput, // 1. 입력값 초기화 함수
    // 2. 태그 추가 후 초기화
  };
}

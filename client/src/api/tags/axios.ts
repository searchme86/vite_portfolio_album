// frontend/api/tags/axios.js
import { createAxiosInstance } from '../axios/base.js'; // 1. Axios 인스턴스 생성 함수 임포트
// 2. 기본 설정된 Axios 사용

const axiosInstance = createAxiosInstance(); // 1. Axios 인스턴스 생성
// 2. 태그 관련 요청에 사용

// 1. 모든 고유 태그를 가져오는 함수
// 2. GET 요청으로 고유 태그 리스트 반환
export const fetchAllTagsAxios = async () => {
  const response = await axiosInstance.get('/api/tags/all'); // 1. /tags 경로로 GET 요청
  // 2. 고유 태그 리스트 조회
  console.log('fetchAllTagsAxios - Response:', response.data); // 1. 디버깅 로그
  // 2. 반환된 데이터 확인
  return response.data; // 1. 응답 데이터 반환
  // 2. 고유 태그 리스트 제공
};

// 1. 특정 태그를 가진 포스트를 가져오는 함수
// 2. GET 요청으로 태그별 포스트 리스트 반환
export const fetchPostsByTagAxios = async (tag, page) => {
  const response = await axiosInstance.get('/api/tags/by-tag', {
    params: { tag, page }, // 1. 쿼리 파라미터로 tag와 page 전달
    // 2. 태그와 페이지네이션 정보 포함
  });
  console.log(`fetchPostsByTagAxios - Response for tag ${tag}:`, response.data); // 1. 디버깅 로그
  // 2. 반환된 데이터 확인
  return response.data; // 1. 응답 데이터 반환
  // 2. 포스트 리스트와 페이지네이션 정보 제공
};

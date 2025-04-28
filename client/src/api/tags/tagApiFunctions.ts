// src/api/tags/tagApiFunctions.js
import axiosInstance from '../axios/axiosInterceptor'; // 1. Axios 인스턴스 가져오기

// 1. 포스트에 태그 추가 API 호출
// 2. POST 요청으로 태그 추가
export const addTag = async (postId, tag) => {
  const response = await axiosInstance.post(`/tags/${postId}`, { tag }); // 1. 태그 추가 요청
  // 2. postId와 tag를 서버에 전송
  console.log('Add tag response:', response.data); // 1. 디버깅용 로그
  // 2. 서버 응답 확인
  return response.data;
};

// 1. 포스트에서 태그 삭제 API 호출
// 2. DELETE 요청으로 태그 삭제
export const deleteTag = async (postId, tag) => {
  const response = await axiosInstance.delete(`/tags/${postId}/${tag}`); // 1. 태그 삭제 요청
  // 2. postId와 tag를 서버에 전송
  console.log('Delete tag response:', response.data); // 1. 디버깅용 로그
  // 2. 서버 응답 확인
  return response.data;
};

// 1. 포스트의 태그 목록 조회 API 호출
// 2. GET 요청으로 태그 조회
export const fetchTags = async (postId) => {
  const response = await axiosInstance.get(`/tags/${postId}`); // 1. 태그 조회 요청
  // 2. postId를 서버에 전송
  console.log('Fetch tags response:', response.data); // 1. 디버깅용 로그
  // 2. 서버 응답 확인
  return response.data;
};

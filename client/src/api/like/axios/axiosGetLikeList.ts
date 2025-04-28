// src/api/like/axios/axiosGetLikeList.js

import { axiosBase } from '../../base/axiosBase'; // 의미: 기본 Axios 인스턴스 가져오기
// 이유: API 요청을 위한 설정된 Axios 사용
// 비유: 도서관에서 기본 요청서를 준비
import { likeApiPaths } from './likeApiPaths'; // 의미: 경로 매핑 객체 가져오기
// 이유: 요청 경로를 중앙에서 관리
// 비유: 도서관에서 주소록 가져오기

// 의미: token과 페이지네이션 파라미터를 받아 특정 포스트의 좋아요 목록 조회
// 이유: 백엔드와 일치하는 엔드포인트 및 쿼리 파라미터 전달
// 비유: 도서관에서 요청서에 회원증 번호 추가, 책에 좋아요를 누른 손님 목록 확인
export const axiosGetLikeList = async (postId, token, page = 1, limit = 10) => {
  const response = await axiosBase.get(
    likeApiPaths.getLikeList(postId), // 의미: 매핑 객체에서 경로 가져오기
    // 이유: /like/${postId}/list 경로로 요청
    // 비유: 도서관에서 주소록에서 특정 책에 좋아요를 누른 손님 목록 확인 주소 가져오기
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {}, // 의미: 토큰이 있으면 헤더에 추가
      // 이유: 백엔드에서 인증 확인
      // 비유: 도서관 요청서에 손님의 회원증 번호 추가
      params: { page, limit }, // 의미: 페이지와 제한 파라미터 전달
      // 이유: 백엔드에서 페이지네이션 처리
      // 비유: 도서관에서 페이지 번호와 목록 수를 요청서에 추가
    }
  ); // 의미: GET 요청 전송
  // 이유: 백엔드의 /like/{postId}/list 엔드포인트 호출
  // 비유: 도서관에서 손님의 요청서를 제출

  return response.data; // 의미: 응답 데이터 반환
  // 이유: 요청 결과를 상위 로직에서 사용 (좋아요 사용자 목록)
  // 비유: 도서관에서 좋아요 사용자 목록 확인서를 반환
};

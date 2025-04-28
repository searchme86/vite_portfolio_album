import { createPostService } from '../services/post.createPost.service.js'; // 의미: 포스트 생성 서비스 가져오기
// 이유: 비즈니스 로직을 서비스로 분리
// 비유: 도서관에서 책을 등록하는 전문가 호출
import { validateImages } from '../utils/post.validateImages.util.js'; // 의미: 이미지 유효성 검사 유틸 가져오기
// 이유: 이미지 유효성 검사 로직 분리
// 비유: 도서관에서 책 표지가 규격에 맞는지 확인하는 도구
import { formatErrorMessage } from '../utils/post.formatErrorMessage.util.js'; // 의미: 에러 메시지 포맷팅 유틸 가져오기
// 이유: 에러 메시지 포맷팅 로직 분리
// 비유: 문제를 깔끔하게 설명하는 도구

export const createPost = async (req, res) => {
  // 의미: 새로운 포스트를 생성하는 컨트롤러 함수
  // 이유: 클라이언트 요청 처리 및 응답 제공
  // 비유: 도서관 데스크에서 손님 요청 처리
  const clerkUserId = req.auth?.userId; // 의미: 요청에서 Clerk 사용자 ID 추출
  // 이유: 사용자 인증 확인
  // 비유: 손님의 회원증 확인

  console.log(`createPost - Clerk User ID: ${clerkUserId}`); // 의미: 요청된 사용자 ID 로그
  // 이유: 디버깅 용이성
  // 비유: 손님의 회원증 번호 기록

  try {
    if (!clerkUserId) {
      // 의미: 사용자 인증 여부 확인
      // 이유: 인증되지 않은 요청 차단
      // 비유: 회원증 없으면 입장 불가
      return res.status(401).json({ message: 'Not authenticated!' });
    }

    if (!req.body.title) {
      // 의미: 제목 유효성 검사
      // 이유: 제목은 필수 입력값
      // 비유: 책 제목 없으면 등록 불가
      return res.status(400).json({ message: 'Title is required!' });
    }

    const images = Array.isArray(req.body.img) // 의미: 이미지 데이터 추출 및 배열화
      ? req.body.img
      : req.body.img
      ? [req.body.img]
      : []; // 이유: 단일 이미지와 배열 이미지를 모두 처리
    // 비유: 책 표지가 한 장이든 여러 장이든 준비

    const validImages = validateImages(images); // 의미: 이미지 유효성 검사
    // 이유: 유효하지 않은 이미지 걸러내기
    // 비유: 책 표지가 규격에 맞는지 확인

    const postData = {
      // 의미: 포스트 데이터 객체 생성
      title: req.body.title,
      content: req.body.content || '',
      img: validImages,
      ...req.body,
    }; // 이유: 서비스에 전달할 데이터 준비
    // 비유: 책 등록에 필요한 정보 모으기

    const newPost = await createPostService(clerkUserId, postData, req.auth); // 의미: 서비스에서 포스트 생성
    // 이유: 비즈니스 로직을 서비스에 위임
    // 비유: 전문가에게 책 등록 요청

    console.log('createPost - Post created:', newPost); // 의미: 생성된 포스트 로그
    // 이유: 디버깅 용이성
    // 비유: 새로 등록된 책 확인

    return res.status(200).json(newPost); // 의미: 생성된 포스트 반환
    // 이유: 클라이언트에 성공 응답
    // 비유: 손님에게 새 책 정보 전달
  } catch (error) {
    console.error('createPost - Error:', error.message); // 의미: 에러 로그
    // 이유: 문제 원인 추적
    // 비유: 문제 발생 시 일지에 기록
    const formattedError = formatErrorMessage(error); // 의미: 에러 메시지 포맷팅
    // 이유: 보안 및 가독성 향상
    // 비유: 문제를 깔끔하게 정리해서 설명
    return res
      .status(500)
      .json({ message: 'Server error', error: formattedError }); // 의미: 에러 응답
    // 이유: 클라이언트에 안전한 에러 메시지 전달
    // 비유: "문제 생겼어요"라고 말하며 원인 설명
  }
};

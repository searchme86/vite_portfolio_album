import Post from '../../models/post.model.js'; // 의미: Post 모델 가져오기
// 이유: 데이터베이스와 상호작용하기 위해 필요
// 비유: 도서관에서 책을 등록하기 위해 사서 호출
import User from '../../models/user.model.js'; // 의미: User 모델 가져오기
// 이유: 사용자 조회 및 생성에 필요
// 비유: 도서관에서 회원 정보를 확인하는 사서 호출
import { generateUniqueSlug } from '../utils/post.generateUniqueSlug.util.js'; // 의미: 고유 슬러그 생성 유틸 가져오기
// 이유: 슬러그 생성 로직 분리
// 비유: 책 제목으로 고유 번호 만드는 도구

// 캐시 저장용 Map, 쿼리 결과를 메모리에 저장
const postCache = new Map(); // 의미: 포스트 캐시 저장소 초기화
// 이유: 캐싱으로 성능 최적화
// 비유: 자주 찾는 책을 가까운 선반에 보관

export const createPostService = async (clerkUserId, postData, auth) => {
  // 의미: 새로운 포스트를 생성하는 서비스 함수
  // 이유: 비즈니스 로직을 컨트롤러에서 분리
  // 비유: 도서관에서 책을 등록하는 전문가
  try {
    let user = await User.findOne({ clerkUserId }); // 의미: Clerk 사용자 ID로 사용자 조회
    // 이유: 포스트 작성자 확인
    // 비유: 회원증 번호로 회원 찾기
    if (!user) {
      // 의미: 사용자가 없으면 새로 생성
      // 이유: 작성자가 없으면 새로 등록
      // 비유: 회원이 없으면 새 회원 등록
      console.log(
        `createPostService - User not found, creating new user for: ${clerkUserId}`
      ); // 의미: 사용자 없음 로그
      // 이유: 디버깅 용이성
      // 비유: 회원 없음을 기록
      const email = auth.sessionClaims?.email || 'unknown@example.com'; // 의미: 이메일 추출 (기본값 설정)
      // 이유: 사용자 정보 없으면 기본값 사용
      // 비유: 이메일 없으면 임시로 적기
      const username = auth.sessionClaims?.username || `user_${clerkUserId}`; // 의미: 사용자 이름 추출 (기본값 설정)
      // 이유: 사용자 이름 없으면 기본값 사용
      // 비유: 이름 없으면 임시 이름 만들기
      user = new User({ clerkUserId, username, email }); // 의미: 새 사용자 객체 생성
      // 이유: 데이터베이스에 저장할 사용자 준비
      // 비유: 새 회원 정보 작성
      await user.save(); // 의미: 사용자 저장
      // 이유: 데이터베이스에 새 사용자 등록
      // 비유: 회원 정보 저장
      console.log('createPostService - New user created:', user); // 의미: 새 사용자 생성 로그
      // 이유: 디버깅 용이성
      // 비유: 새 회원 등록 확인
    } else {
      console.log('createPostService - Found user:', user); // 의미: 기존 사용자 조회 로그
      // 이유: 디버깅 용이성
      // 비유: 기존 회원 확인
    }

    const slug = await generateUniqueSlug(postData.title); // 의미: 고유 슬러그 생성
    // 이유: 중복되지 않는 슬러그 생성 로직 분리
    // 비유: 책 제목으로 고유 번호 만들기

    const newPost = new Post({
      // 의미: 새 포스트 객체 생성
      user: user._id,
      title: postData.title,
      slug,
      content: postData.content,
      img: postData.img,
      ...postData,
    }); // 이유: 데이터베이스에 저장할 포스트 준비
    // 비유: 새 책 정보 작성

    const post = await newPost.save(); // 의미: 포스트 저장
    // 이유: 데이터베이스에 새 포스트 등록
    // 비유: 새 책 도서관에 등록

    postCache.clear(); // 의미: 캐시 초기화
    // 이유: 새 포스트 추가로 캐시 갱신 필요
    // 비유: 선반 정리 후 새 책 추가
    console.log('createPostService - Cache cleared after post creation'); // 의미: 캐시 초기화 로그
    // 이유: 디버깅 용이성
    // 비유: 선반 정리 확인

    return post; // 의미: 생성된 포스트 반환
    // 이유: 컨트롤러에서 사용
    // 비유: 새 책 정보 넘겨줌
  } catch (error) {
    throw new Error(`Failed to create post: ${error.message}`); // 의미: 에러 발생 시 상위로 전달
    // 이유: 컨트롤러에서 에러 처리 위임
    // 비유: 책 등록 실패 시 "문제 있다"고 상사에게 말하기
  }
};

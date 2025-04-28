// src/controllers/post.controller.js
import ImageKit from 'imagekit';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

// 캐시 저장용 Map, 쿼리 결과를 메모리에 저장
const postCache = new Map();
// 5분 TTL, 캐시 유효 기간 설정
const CACHE_TTL = 5 * 60 * 1000;

// ImageKit 설정
const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

// 환경 변수 확인
console.log('ImageKit Config:', {
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY ? '[REDACTED]' : undefined,
});

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const query = {};

  // console.log('getPosts - Request query:', req.query);
  // 1. 요청 쿼리 파라미터 출력
  // 2. 클라이언트가 보낸 쿼리 확인

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  const cacheKey = JSON.stringify({ ...req.query, page, limit });
  const cachedResult = postCache.get(cacheKey);
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    // console.log('getPosts - Returning cached result for:', cacheKey);
    // 1. 캐시된 결과가 있는 경우 출력
    // 2. 캐시 히트 여부 확인
    return res.status(200).json(cachedResult.data);
  }

  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: 'i' };
  }

  if (author) {
    const user = await User.findOne({ username: author }).select('_id');
    if (!user) {
      return res.status(404).json('No post found for this author!');
    }
    query.user = user._id;
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'oldest':
        sortObj = { createdAt: 1 };
        break;
      case 'popular':
        sortObj = { visit: -1 };
        break;
      case 'trending':
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;
  }

  // console.log('getPosts - Query conditions:', query);
  // 1. MongoDB 쿼리 조건 출력
  // 2. 쿼리 조건 확인
  // console.log('getPosts - Sort conditions:', sortObj);
  // 1. 정렬 조건 출력
  // 2. 정렬 조건 확인

  const posts = await Post.find(query)
    .populate('user', 'username clerkUserId')
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);

  // console.log('getPosts - Fetched posts from DB:', posts);
  // 1. DB에서 조회한 포스트 출력
  // 2. 조회 결과 확인

  const totalPosts = await Post.countDocuments(query);
  const hasMore = page * limit < totalPosts;

  // console.log(
  //   'getPosts - Total posts (filtered):',
  //   totalPosts,
  //   'Has more:',
  //   hasMore
  // );
  // 1. 필터링된 총 포스트 수와 더보기 여부 출력
  // 2. 페이지네이션 정보 확인

  const response = { posts, hasMore };
  postCache.set(cacheKey, { data: response, timestamp: Date.now() });

  res.status(200).json(response);
};

//======== <--------여기추가
// 1. 태그로 포스트를 조회하는 함수
// 2. 쿼리 파라미터로 전달된 태그를 기준으로 포스트 반환
export const getPostsByTag = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // 1. 페이지 번호 설정 (기본값 1)
  // 2. 페이지네이션 지원
  const limit = parseInt(req.query.limit) || 2; // 1. 페이지당 포스트 수 설정 (기본값 2)
  // 2. 페이지네이션 지원
  const { tag } = req.query; // 1. 쿼리 파라미터에서 태그 추출
  // 2. 요청된 태그 가져오기

  console.log('getPostsByTag - Requested tag:', tag); // 1. 디버깅 로그
  // 2. 요청된 태그 확인

  // 1. 태그 유효성 검사
  // 2. 태그가 없거나 빈 문자열인 경우 에러 반환
  if (!tag || tag.trim() === '') {
    console.log('getPostsByTag - Invalid tag:', tag); // 1. 디버깅 로그
    // 2. 유효하지 않은 태그 확인
    return res.status(400).json({ message: 'Tag is required' });
  }

  const cacheKey = JSON.stringify({ tag, page, limit }); // 1. 캐시 키 생성
  // 2. 태그, 페이지, 제한 수를 기반으로 캐싱
  const cachedResult = postCache.get(cacheKey); // 1. 캐시에서 결과 조회
  // 2. 캐시 히트 여부 확인
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL) {
    console.log('getPostsByTag - Returning cached result for:', cacheKey); // 1. 디버깅 로그
    // 2. 캐시 히트 확인
    return res.status(200).json(cachedResult.data);
  }

  try {
    const query = { tags: tag }; // 1. 태그를 기준으로 쿼리 조건 설정
    // 2. MongoDB에서 태그가 포함된 포스트 조회
    const posts = await Post.find(query)
      .populate('user', 'username clerkUserId') // 1. 작성자 정보 포함
      // 2. user 필드를 populate
      .sort({ createdAt: -1 }) // 1. 최신순으로 정렬
      // 2. 기본 정렬 기준
      .limit(limit) // 1. 페이지당 포스트 수 제한
      // 2. 페이지네이션 적용
      .skip((page - 1) * limit); // 1. 페이지에 맞는 포스트 건너뛰기
    // 2. 페이지네이션 적용

    console.log('getPostsByTag - Fetched posts from DB:', posts); // 1. 디버깅 로그
    // 2. 조회된 포스트 확인

    const totalPosts = await Post.countDocuments(query); // 1. 태그에 해당하는 총 포스트 수 계산
    // 2. 페이지네이션 정보 제공
    const hasMore = page * limit < totalPosts; // 1. 더 많은 포스트가 있는지 확인
    // 2. 페이지네이션 정보 제공

    console.log(
      'getPostsByTag - Total posts (filtered):',
      totalPosts,
      'Has more:',
      hasMore
    ); // 1. 디버깅 로그
    // 2. 페이지네이션 정보 확인

    const response = { posts, hasMore }; // 1. 응답 객체 생성
    // 2. 포스트 리스트와 페이지네이션 정보 포함
    postCache.set(cacheKey, { data: response, timestamp: Date.now() }); // 1. 캐시에 결과 저장
    // 2. 캐싱으로 성능 최적화

    res.status(200).json(response); // 1. 클라이언트에 응답
    // 2. 조회된 포스트와 페이지네이션 정보 반환
  } catch (error) {
    console.error('getPostsByTag - Error fetching posts:', error); // 1. 디버깅 로그
    // 2. 에러 원인 확인
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
//========

export const getPost = async (req, res) => {
  console.log('getPost - Requested slug:', req.params.slug); // 디버깅 로그 추가
  // 1. 요청된 포스트 슬러그 출력
  // 2. 클라이언트가 보낸 slug 확인
  console.log(
    'getPost - MongoDB Connection State:',
    mongoose.connection.readyState
  ); // 디버깅 로그 추가
  // 1. MongoDB 연결 상태 출력 (0: disconnected, 1: connected, 2: connecting, 3: disconnecting)
  // 2. MongoDB 연결 문제 여부 확인
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      'user',
      'username img clerkUserId'
    );
    console.log('getPost - Fetched post:', post); // 디버깅 로그
    // 1. 조회된 포스트 출력
    // 2. 데이터 확인
    if (!post) {
      return res.status(404).json('Post not found!');
    }
    res.status(200).json(post);
  } catch (error) {
    console.error('getPost - Error fetching post:', error); // 에러 로그 추가
    // 1. 포스트 조회 중 발생한 에러 출력
    // 2. 에러 원인 확인
    res
      .status(500)
      .json({ message: 'Error fetching post', error: error.message });
  }
};

// export const createPost = async (req, res) => {
//   const clerkUserId = req.auth.userId;
//   if (!clerkUserId) {
//     return res.status(401).json('Not authenticated!');
//   }

//   // console.log('createPost - Clerk User ID:', clerkUserId);
//   // 1. Clerk 사용자 ID 출력
//   // 2. 인증 정보 확인
//   // console.log('createPost - Request auth:', req.auth);
//   // 1. 요청 인증 정보 출력
//   // 2. 인증 정보 확인

//   let user = await User.findOne({ clerkUserId });
//   if (!user) {
//     // console.log(
//     //   'createPost - User not found, creating new user for:',
//     //   clerkUserId
//     // );
//     // 1. 사용자가 없음을 출력
//     // 2. 새로운 사용자 생성 전 확인
//     const email = req.auth.sessionClaims?.email || 'unknown@example.com';
//     const username = req.auth.sessionClaims?.username || `user_${clerkUserId}`;
//     user = new User({
//       clerkUserId,
//       username,
//       email,
//     });
//     await user.save();
//     // console.log('createPost - New user created:', user);
//     // 1. 새로 생성된 사용자 출력
//     // 2. 사용자 생성 확인
//   } else {
//     // console.log('createPost - Found user:', user);
//     // 1. 기존 사용자 출력
//     // 2. 사용자 조회 확인
//   }

//   if (!req.body.title) {
//     return res.status(400).json('Title is required!');
//   }

//   let slug = req.body.title.replace(/ /g, '-').toLowerCase();
//   let existingPost = await Post.findOne({ slug });
//   let counter = 2;
//   while (existingPost) {
//     slug = `${slug}-${counter}`;
//     existingPost = await Post.findOne({ slug });
//     counter++;
//   }

//   const images = Array.isArray(req.body.img)
//     ? req.body.img
//     : req.body.img
//     ? [req.body.img]
//     : [];

//   const validImages = images
//     .filter(
//       (img) =>
//         typeof img === 'string' && !img.startsWith('blob:') && img.trim() !== ''
//     )
//     .filter((img) => img.startsWith('https://ik.imagekit.io'));
//   // console.log('createPost - Valid images after filtering:', validImages);
//   // 1. 필터링된 이미지 URL 출력
//   // 2. 유효한 이미지 확인

//   const newPost = new Post({
//     user: user._id,
//     title: req.body.title,
//     slug,
//     content: req.body.content || '',
//     img: validImages,
//     ...req.body,
//   });

//   const post = await newPost.save();
//   postCache.clear();
//   // console.log('createPost - Cache cleared after post creation');
//   // 1. 캐시 클리어 출력
//   // 2. 캐시 갱신 확인

//   res.status(200).json(post);
// };

export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  if (!clerkUserId) {
    return res.status(401).json('Not authenticated!');
  }

  console.log('deletePost - Clerk User ID:', clerkUserId);
  // 1. Clerk 사용자 ID 출력
  // 2. 인증 정보 확인
  console.log('deletePost - Request auth:', req.auth);
  // 1. 요청 인증 정보 출력
  // 2. 인증 정보 확인

  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  if (role === 'admin') {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json('Post not found!');
    }
    postCache.clear();
    console.log('deletePost - Cache cleared after admin delete');
    // 1. 캐시 클리어 출력
    // 2. 캐시 갱신 확인
    return res.status(200).json('Post has been deleted');
  }

  let user = await User.findOne({ clerkUserId });
  if (!user) {
    console.log(
      'deletePost - User not found, creating new user for:',
      clerkUserId
    );
    // 1. 사용자가 없음을 출력
    // 2. 새로운 사용자 생성 전 확인
    const email = req.auth.sessionClaims?.email || 'unknown@example.com';
    const username = req.auth.sessionClaims?.username || `user_${clerkUserId}`;
    user = new User({
      clerkUserId,
      username,
      email,
    });
    await user.save();
    console.log('deletePost - New user created:', user);
    // 1. 새로 생성된 사용자 출력
    // 2. 사용자 생성 확인
  } else {
    console.log('deletePost - Found user:', user);
    // 1. 기존 사용자 출력
    // 2. 사용자 조회 확인
  }

  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res.status(403).json('You can delete only your posts!');
  }

  postCache.clear();
  console.log('deletePost - Cache cleared after user delete');
  // 1. 캐시 클리어 출력
  // 2. 캐시 갱신 확인

  res.status(200).json('Post has been deleted');
};

export const featurePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json('Not authenticated!');
  }

  console.log('featurePost - Clerk User ID:', clerkUserId);
  // 1. Clerk 사용자 ID 출력
  // 2. 인증 정보 확인
  console.log('featurePost - Request auth:', req.auth);
  // 1. 요청 인증 정보 출력
  // 2. 인증 정보 확인

  const role = req.auth.sessionClaims?.metadata?.role || 'user';

  if (role !== 'admin') {
    return res.status(403).json('You cannot feature posts!');
  }

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json('Post not found!');
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  postCache.clear();
  console.log('featurePost - Cache cleared after feature update');
  // 1. 캐시 클리어 출력
  // 2. 캐시 갱신 확인

  res.status(200).json(updatedPost);
};

export const getPostById = async (req, res) => {
  console.log('getPostById - Requested ID:', req.params.id); // 디버깅 로그
  // 1. 요청된 포스트 ID 출력
  // 2. 클라이언트가 보낸 ID 확인
  console.log(
    'getPostById - MongoDB Connection State:',
    mongoose.connection.readyState
  ); // 디버깅 로그
  // 1. MongoDB 연결 상태 출력 (0: disconnected, 1: connected, 2: connecting, 3: disconnecting)
  // 2. MongoDB 연결 문제 여부 확인
  try {
    const post = await Post.findById(req.params.id).populate(
      'user',
      'username img clerkUserId'
    );
    console.log('getPostById - Fetched post:', post); // 디버깅 로그
    // 1. 조회된 포스트 출력 (null일 수도 있음)
    // 2. 데이터 조회 결과 확인
    if (!post) return res.status(404).json('Post not found!');
    res.status(200).json(post);
  } catch (error) {
    console.error('getPostById - Error fetching post:', error); // 에러 로그
    // 1. 포스트 조회 중 발생한 에러 출력
    // 2. 에러 원인 확인
    res
      .status(500)
      .json({ message: 'Error fetching post', error: error.message });
  }
};

export const updatePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.params.id;

  if (!clerkUserId) return res.status(401).json('Not authenticated!');

  console.log('updatePost - Clerk User ID:', clerkUserId);
  // 1. Clerk 사용자 ID 출력
  // 2. 인증 정보 확인
  console.log('updatePost - Request auth:', req.auth);
  // 1. 요청 인증 정보 출력
  // 2. 인증 정보 확인

  let user = await User.findOne({ clerkUserId });
  if (!user) {
    console.log(
      'updatePost - User not found, creating new user for:',
      clerkUserId
    );
    // 1. 사용자가 없음을 출력
    // 2. 새로운 사용자 생성 전 확인
    const email = req.auth.sessionClaims?.email || 'unknown@example.com';
    const username = req.auth.sessionClaims?.username || `user_${clerkUserId}`;
    user = new User({
      clerkUserId,
      username,
      email,
    });
    await user.save();
    console.log('updatePost - New user created:', user);
    // 1. 새로 생성된 사용자 출력
    // 2. 사용자 생성 확인
  } else {
    console.log('updatePost - Found user:', user);
    // 1. 기존 사용자 출력
    // 2. 사용자 조회 확인
  }

  console.log('---!!!!!여기 postId는 무엇??---', postId);
  const post = await Post.findById(postId);

  if (!post) return res.status(404).json('Post not found!');
  if (post.user.toString() !== user._id.toString()) {
    return res.status(403).json('You can only edit your own posts!');
  }

  if (!req.body.title) return res.status(400).json('Title is required!');

  let slug = req.body.title.replace(/ /g, '-').toLowerCase();
  let existingPost = await Post.findOne({ slug, _id: { $ne: postId } });
  let counter = 2;
  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug, _id: { $ne: postId } });
    counter++;
  }

  const images = Array.isArray(req.body.img)
    ? req.body.img
    : req.body.img
    ? [req.body.img]
    : post.img;

  const validImages = images
    .filter(
      (img) =>
        typeof img === 'string' && !img.startsWith('blob:') && img.trim() !== ''
    )
    .filter((img) => img.startsWith('https://ik.imagekit.io'));
  console.log('updatePost - Valid images after filtering:', validImages);
  // 1. 필터링된 이미지 URL 출력
  // 2. 유효한 이미지 확인

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { ...req.body, slug, img: validImages },
    { new: true }
  );

  postCache.clear();
  console.log('updatePost - Cache cleared after post update');
  // 1. 캐시 클리어 출력
  // 2. 캐시 갱신 확인

  console.log('업데이트된 포트스튼?!!updatePost - Updated post:', updatedPost);

  res.status(200).json(updatedPost);
};

export const uploadAuth = async (req, res) => {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    console.log('uploadAuth - Generated ImageKit auth params:', authParams);
    // 1. ImageKit 인증 파라미터 출력
    // 2. 인증 파라미터 확인
    if (!authParams.token || !authParams.signature || !authParams.expire) {
      throw new Error('Invalid ImageKit auth parameters');
    }
    res.status(200).json(authParams);
  } catch (error) {
    console.error(
      'uploadAuth - Failed to generate ImageKit auth params:',
      error
    );
    // 1. ImageKit 인증 파라미터 생성 실패 출력
    // 2. 에러 원인 확인
    res.status(500).json({
      message: 'Failed to generate auth params',
      error: error.message,
    });
  }
};

export const uploadImage = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const imageUrl = req.body.imageUrl;
    if (
      !imageUrl ||
      typeof imageUrl !== 'string' ||
      !imageUrl.startsWith('https://ik.imagekit.io')
    ) {
      return res.status(400).json({ message: 'Invalid image URL' });
    }
    post.img = post.img || [];
    post.img.push(imageUrl);
    await post.save();

    postCache.clear();
    console.log('uploadImage - Cache cleared after image upload');
    // 1. 캐시 클리어 출력
    // 2. 캐시 갱신 확인

    res.status(200).json({ message: 'Image uploaded', imageUrl });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to upload image', error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const postId = req.params.id;
    const imageUrl = req.body.imageUrl;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.img = post.img.filter((img) => img !== imageUrl);
    await post.save();

    postCache.clear();
    console.log('deleteImage - Cache cleared after image delete');
    // 1. 캐시 클리어 출력
    // 2. 캐시 갱신 확인

    res.status(200).json({ message: 'Image deleted' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete image', error: error.message });
  }
};

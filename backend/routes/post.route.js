// src/routes/post.route.js
import express from 'express';
import // deletePost,
// uploadAuth,
// featurePost,
// getPostById,
// updatePost,
// uploadImage,
// deleteImage,
// getPostsByTag,
'../controllers/post.controller.js';

import { createPost } from '../post/controllers/post.createPost.controller.js';
import { getPost } from '../post/controllers/post.getPost.controller.js';
import { getPosts } from '../post/controllers/post.getPosts.controller.js';
import { getPostById } from '../post/controllers/post.getPostById.controller.js';
import { getPostsByTag } from '../post/controllers/post.getPostsByTag.controller.js';
import { deletePost } from '../post/controllers/post.deletePost.controller.js';
import { updatePost } from '../post/controllers/post.updatePost.controller.js';
import { featurePost } from '../post/controllers/post.featurePost.controller.js';
import { uploadAuth } from '../post/controllers/post.uploadAuth.controller.js';
import { uploadImage } from '../post/controllers/post.uploadImage.controller.js';
import { deleteImage } from '../post/controllers/post.deleteImage.controller.js';

import increaseVisit from '../middlewares/increaseVisit.js';
import { requireAuth } from '@clerk/express'; // Clerk 인증 미들웨어

const router = express.Router();

router.get('/upload-auth', uploadAuth); // ImageKit 인증 엔드포인트
router.get('/', getPosts); // 포스트 목록 조회 (홈페이지용)
router.get('/by-tag', getPostsByTag); // 1. 태그별 포스트 조회 경로 추가 <--------여기추가
// 2. /posts/by-tag?tag={tag}로 태그별 포스트 조회
router.get('/:slug', increaseVisit, getPost); // 특정 포스트 조회 (조회수 증가 미들웨어 적용)
router.get('/id/:id', getPostById); // ID로 포스트 조회

router.post('/create', requireAuth(), createPost); // 포스트 생성 (인증 필요)

router.delete('/:id', requireAuth(), deletePost); // 포스트 삭제 (인증 필요)
router.patch('/feature', requireAuth(), featurePost); // 포스트 추천 (인증 필요)
router.patch('/:id', requireAuth(), updatePost); // 포스트 수정 (인증 필요)
router.post('/:id/upload-image', requireAuth(), uploadImage); // 이미지 업로드 (인증 필요)
router.delete('/:id/delete-image', requireAuth(), deleteImage); // 이미지 삭제 (인증 필요)

export default router;

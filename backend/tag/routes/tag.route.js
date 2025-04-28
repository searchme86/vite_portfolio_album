// src/routes/tag.route.js
import express from 'express';

import { addTagToPost } from '../controllers/tag.addTagToPost.controller.js';
import { deleteTagFromPost } from '../controllers/tag.deleteTagFromPost.controller.js';
import { getTagsFromPost } from '../controllers/tag.getTagsFromPost.controller.js';
import { getAllUniqueTags } from '../controllers/tag.getAllUniqueTags.controller.js';
import { getPostsByTagName } from '../controllers/tags.getPostByTag.controller.js';

import { requireAuth } from '@clerk/express'; // 1. 인증 미들웨어 임포트

const router = express.Router();

// 고유 태그 리스트 조회 경로
// Homepage에 포스트 태그를 보여주는 처리를 하는 컨트롤러
router.get('/all', getAllUniqueTags);
// 태그별 포스트 조회
// Homepage에 클릭한 태그에 해당하는 포스트를 보여주는 처리를 하는 컨트롤러
router.get('/by-tag', getPostsByTagName);
// 1. 태그 조회 라우트 (GET /api/tags/:postId)
// 2. 특정 포스트의 태그 목록 조회
router.get('/:postId', getTagsFromPost);
// 1. 태그 추가 라우트 (POST /api/tags/:postId)
// 2. 특정 포스트에 태그를 추가
router.post('/:postId', requireAuth, addTagToPost);
// 1. 태그 삭제 라우트 (DELETE /api/tags/:postId/:tag)
// 2. 특정 포스트에서 태그를 삭제
router.delete('/:postId/:tag', requireAuth, deleteTagFromPost);

export default router; // 1. 라우터 내보내기
// 2. 메인 서버에서 사용 가능하도록 설정

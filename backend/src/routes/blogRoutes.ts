import {addCommentToBlog, createBlog, getPaginatedBlogs, getBlogById, getFirst10BlogsByCreator, createCategory} from '../controllers/blogController';
import express from 'express';
import { blogPostSchema } from '../schemas/blogSchema';
import { zodPostMiddleware } from '../middlewares/zodMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware as any, zodPostMiddleware(blogPostSchema), createBlog as express.RequestHandler);
router.get('/', authMiddleware as any, getPaginatedBlogs as express.RequestHandler);
router.get('/creator', getFirst10BlogsByCreator as express.RequestHandler);
router.get('/:id',authMiddleware as any, getBlogById as express.RequestHandler);
router.post('/:id/comment', authMiddleware as any, addCommentToBlog as express.RequestHandler);
router.post('/category', authMiddleware as any, createCategory as express.RequestHandler);

export default router
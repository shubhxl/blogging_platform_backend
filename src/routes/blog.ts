import { Router } from 'express';
import { createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost } from '../controller/blog';

const router = Router();

router.post('/blog_posts', createBlogPost);
router.get('/blog_posts', getBlogPosts);
router.get('/blog_posts/:post_id', getBlogPostById);
router.put('/blog_posts/:post_id', updateBlogPost);
router.delete('/blog_posts', deleteBlogPost);

export default router;

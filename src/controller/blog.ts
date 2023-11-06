import express, { Request, Response } from 'express';
import { db } from '../utils/database';

// CREATE a new blog post
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, content, author_id } = req.body;
    const query = `
      INSERT INTO blog_post (title, content, author_id)
      VALUES ($1, $2, $3)
      RETURNING post_id
    `;
    const result = await db.one(query, [title, content, author_id]);
    res.status(201).json({ post_id: result.post_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating a blog post' });
  }
};

// READ all blog posts
export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const { author_id } = req.body;
    const posts = await db.any('SELECT * FROM blog_post where author_id = $1', [author_id]);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching blog posts' });
  }
};

// READ a specific blog post by post_id
export const getBlogPostById = async (req: Request, res: Response) => {
  const post_id = req.params.post_id;
  try {
    const post = await db.oneOrNone('SELECT * FROM blog_post WHERE post_id = $1', [post_id]);
    if (!post) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(post);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching the blog post' });
  }
};

// UPDATE a blog post by post_id
export const updateBlogPost = async (req: Request, res: Response) => {
  const post_id = req.params.post_id;
  const { title, content } = req.body;
  try {
    const result = await db.result(
      'UPDATE blog_post SET title = $1, content = $2 WHERE post_id = $3',
      [title, content, post_id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json({ message: 'Blog post updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating the blog post' });
  }
};

// DELETE a blog post by post_id
export const deleteBlogPost = async (req: Request, res: Response) => {
  const post_id = req.params.post_id;
  try {
    const result = await db.result('DELETE FROM blog_post WHERE post_id = $1', [post_id]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json({ message: 'Blog post deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting the blog post' });
  }
};

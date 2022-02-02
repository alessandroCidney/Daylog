import CloudStorage, { ICloudStorage } from "../storage";
import Database, { IDatabase } from "../database";
import Utils, { IUtils } from '@/utils';
import { TPost, TPostComment, TPostLike } from '@/types/posts';
import { v1 as uuid } from 'uuid';

type IncompletePostComment = {
  author_id: string;
  created_at: number;
  content: string;
  likes: TPostLike[] | undefined | null;
};

export interface IPostService {
  storage: ICloudStorage;
  database: IDatabase;
  utils: IUtils;
  fetchPosts: () => Promise<TPost[]>;
  fetchPost: (id: string) => Promise<TPost | undefined>;
  savePost: (
    title: string,
    content: string,
    author: string,
    authorEmail: string,
    authorPhotoURL: string,
    thumb: File | null
  ) => Promise<string | null | undefined>;
  fetchPostsWhere: (key: string, value: string) => Promise<Record<string, TPost>>;
  deletePostsWhere: (key: string, value: string) => Promise<boolean | null>;
  toggleLike: (postKey: string, userId: string) => Promise<boolean>;
  searchPosts: (title: string) => Promise<TPost[]>;
  sendComment: (postKey: string, comment: IncompletePostComment) => Promise<void>;
};

class PostsService {
  storage;
  database;
  utils;

  constructor () {
    this.storage = new CloudStorage('posts');
    this.database = new Database('posts');
    this.utils = new Utils();
  };

  async fetchPosts () {
    const posts: Record<string, TPost> = await this.database.get();

    if (!posts) {
      return [];
    };

    const postsArr = Object.values(posts);

    return !!postsArr ? postsArr : [] as TPost[];
  };

  async fetchPostsWhere (key: string, value: string) {
    const posts: Record<string, TPost> = await this.database.getWhere(key, value);

    if (!posts) {
      return {};
    };

    return !!posts ? posts : {} as Record<string, TPost>;
  };

  async fetchPost (id: string) {
    const post: Record<string, TPost> = await this.database.getWhere('id', id);

    return post ? post[id] : undefined;
  };

  async savePost (
    title: string,
    content: string,
    author: string,
    authorEmail: string,
    authorPhotoURL: string,
    thumb: File | null,
  ) {

    try {
      const postKey = await this.database.push({
        title,
        formatted_title: this.utils.clearString(title),
        content,
        author,
        author_email: authorEmail,
        thumbnail: null,
        created_at: (new Date()).getTime(),
        likes: []
      });
  
      if (!postKey) {
        return;
      };
  
      if (thumb) {
        const thumbURL = await this.storage.uploadFile(thumb, postKey);
        
        if (!thumbURL) {
          return;
        };
  
        await this.database.update({
          thumbnail: thumbURL,
          id: postKey,
          author_photo_url: authorPhotoURL
        }, postKey);

      } else {

        await this.database.update({
          thumbnail: '',
          id: postKey,
          author_photo_url: authorPhotoURL
        }, postKey);

      };

      return postKey;
    } catch (err) {
      console.log('Error on post service (SAVE POST)', err);
      return null
    };
  };

  async deletePostsWhere (key: string, value: string) {
    try {
      const posts: Record<string, TPost> = await this.database.getWhere(key, value);

      if (!posts) {
        return null;
      };

      const postKeys = Object.keys(posts);

      await Promise.all(postKeys.map(postKey => this.database.remove(postKey)));
      await Promise.all(postKeys.map(postKey => this.storage.deleteFiles(postKey)));

      return true;
    } catch (err) {
      console.log('Error on posts service (DELETE POSTS WHERE)', err);
      return false;
    }
  };

  async searchPosts (title: string) {
    const posts: Record<string, TPost> | null = await this.database.search(
      'formatted_title',
      title.toLowerCase(),
      5
    );

    return !!posts ? Object.values(posts) : [];
  };

  async toggleLike (postKey: string, userId: string) {
    try {
      const post = await this.database.get(postKey) as TPost | undefined | null;

      if (!post) {
        throw new Error('Post not found');
      };

      let likes = post.likes;

      if (!likes) {
        likes = [];
      }

      const alreadyExistsIndex = likes.findIndex((like) => like.author_id === userId);

      if (alreadyExistsIndex === -1) {
        likes.push({
          author_id: userId,
          created_at: (new Date()).getTime()
        });
      } else if (likes.length > 0) {
        likes.splice(alreadyExistsIndex, 1);
      };

      await this.database.update({
        likes
      }, postKey);
      
      return true;
    } catch (error) {
      console.log('Error on posts service (ADD LIKE)', error);
      return false;
    }
  };

  async sendComment (postKey: string, comment: IncompletePostComment) {
    const post = await this.database.get(postKey) as TPost | undefined | null;

    if (!post) {
      throw new Error('Post not found');
    };

    let comments: TPostComment[] | undefined | null = post.comments;

    if (!comments) {
      comments = [];
    };

    comments.push({
      ...comment,
      id: uuid()
    });

    await this.database.update({
      comments
    }, postKey);
  };
};

export default PostsService;
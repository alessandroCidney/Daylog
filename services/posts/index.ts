import CloudStorage, { ICloudStorage } from "../storage";
import Database, { IDatabase } from "../database";
import { TPost } from '@/types/posts';

export interface IPostService {
  storage: ICloudStorage;
  database: IDatabase;
  fetchPosts: () => Promise<TPost[]>;
  fetchPost: (id: string) => Promise<TPost>;
  savePost: (
    title: string,
    content: string,
    author: string,
    authorEmail: string,
    authorPhotoURL: string,
    thumb: File | null
  ) => Promise<string | null | undefined>;
  fetchPostsWhere: (key: string, value: string) => Promise<Record<string, TPost>>
};

class PostsService {
  storage;
  database;
  
  constructor () {
    this.storage = new CloudStorage('posts');
    this.database = new Database('posts');
  };

  async fetchPosts () {
    const posts: Record<string, TPost> = await this.database.get();

    const postsArr = Object.values(posts);

    return !!postsArr ? postsArr : [] as TPost[];
  };

  async fetchPostsWhere (key: string, value: string) {
    const posts: Record<string, TPost> = await this.database.getWhere(key, value);

    return !!posts ? posts : {} as Record<string, TPost>;
  };

  async fetchPost (id: string) {
    const post: Record<string, TPost> = await this.database.getWhere('id', id);

    return post[id];
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
        content,
        author,
        author_email: authorEmail,
        thumbnail: null,
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
};

export default PostsService;
import CloudStorage, { ICloudStorage } from "../storage";
import Database, { IDatabase } from "../database";
import { TPost } from '@/types/posts';

export interface IPostService {
  storage: ICloudStorage;
  database: IDatabase;
  fetchPosts: () => Promise<TPost[]>
  savePost: (
    title: string,
    content: string,
    author: string,
    authorEmail: string,
    authorPhotoURL: string,
    thumb: File | null
  ) => Promise<void>;
};

class PostsService {
  storage;
  database;
  
  constructor () {
    this.storage = new CloudStorage('posts');
    this.database = new Database('posts');
  };

  async fetchPosts () {
    const posts: TPost[] | null = await this.database.get();

    return !!posts ? posts : [] as TPost[];
  };

  async savePost (
    title: string,
    content: string,
    author: string,
    authorEmail: string,
    authorPhotoURL: string,
    thumb: File | null,
  ) {
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
  };
};

export default PostsService;
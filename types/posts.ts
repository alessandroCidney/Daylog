export type TPostLikes = {
  author_id: string;
  created_at: number;
};

export type TPost = {
  id: string;
  author: string;
  author_email: string;
  author_photo_url: string;
  content: string;
  title: string;
  thumbnail: string | undefined | null;
  created_at: number;
  likes: TPostLikes[] | undefined | null;
};
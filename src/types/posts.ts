export type TPostLike = {
  author_id: string;
  created_at: number;
};

export type TPostComment = {
  id: string;
  author_id: string;
  created_at: number;
  content: string;
  likes: TPostLike[] | undefined | null;
};

export type TPost = {
  id: string;
  author: string;
  author_email: string;
  author_photo_url?: string;
  content: string;
  title: string;
  formatted_title: string;
  thumbnail?: string;
  created_at: number;
  updated_at: number | undefined | null;
  likes: TPostLike[] | undefined | null;
  comments: TPostComment[] | undefined | null;
};

export type TValidatedPost = TPost & {
  alreadyLiked: boolean;
  alreadySaved: boolean;
};
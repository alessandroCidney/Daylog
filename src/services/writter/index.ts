import { DAYLOG_LOCAL_STORAGE_EDITOR_KEY } from "@/data/constants/webStorage";

export type TWritterServicePost = {
  title?: string;
  content?: string;
};

export class WritterService {
  savePost (post: TWritterServicePost) {
    localStorage.setItem(DAYLOG_LOCAL_STORAGE_EDITOR_KEY, JSON.stringify(post));
  };

  getPost (): TWritterServicePost | undefined {
    const data = localStorage.getItem(DAYLOG_LOCAL_STORAGE_EDITOR_KEY);
    return data ? JSON.parse(data) : undefined;
  };

  getPostAndClear (): TWritterServicePost | undefined {
    const content = this.getPost();
    localStorage.removeItem(DAYLOG_LOCAL_STORAGE_EDITOR_KEY);
    return content;
  };
};
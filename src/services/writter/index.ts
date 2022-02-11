import { DAYLOG_LOCAL_STORAGE_EDITOR_KEY } from "@/data/constants/webStorage";

export class WritterService {
  saveContent (contentHTML: string) {
    localStorage.setItem(DAYLOG_LOCAL_STORAGE_EDITOR_KEY, contentHTML);
  };

  getContent () {
    return localStorage.getItem(DAYLOG_LOCAL_STORAGE_EDITOR_KEY) || '';
  };
};
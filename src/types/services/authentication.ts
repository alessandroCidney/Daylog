import { ICloudStorage } from "@/services/storage";
import { IDatabase } from "@/services/database";

import { IUtils } from "@/utils";
import { TApplicationMessage } from "@/types/messages";

import { Auth } from "firebase/auth";

export interface IAuthentication {
  database: IDatabase;
  storage: ICloudStorage;
  auth: Auth;
  utils: IUtils;
  signInWithGoogle: () => void;
  signOut: () => Promise<boolean>;
  signUpWithEmail: (
    signUpEmail: string,
    signUpPassword: string,
    username: string,
    acceptedAll: boolean
  ) => Promise<TApplicationMessage>;
  signInWithEmail: (email: string, password: string) => Promise<TApplicationMessage>;
  deleteAccount: (userId: string, userEmail: string) => Promise<void>;
};
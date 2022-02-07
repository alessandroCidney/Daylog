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
    email: string,
    password: string,
    username: string,
    profilePhoto: File | undefined,
    profileBackground: File | undefined,
    aceptedTerms: boolean,
    aceptedPrivacy: boolean,
  ) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<TApplicationMessage>;
  deleteAccount: (userId: string, userEmail: string) => Promise<void>;
};
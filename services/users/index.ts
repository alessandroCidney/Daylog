import Utils, { IUtils } from '@/utils';
import Database, { IDatabase } from '../database';
import CloudStorage, { ICloudStorage } from '../storage';
import * as CloudStorageConstants from '@/data/constants/storage';
import { FirestoreUser } from '@/types/users';

export interface IUsers {
  userId: string;
  utils: IUtils;
  database: IDatabase;
  storage: ICloudStorage;
  changeProfilePhoto: (file: File) => Promise<boolean>;
  changeProfileBackgroundPhoto: (file: File) => Promise<boolean>;
  changeUsername: (username: string) => Promise<boolean>;
  changeTheme: (dark: boolean) => Promise<boolean>;
  toggleSavedPost: (postId: string) => Promise<boolean>;
};

class Users implements IUsers {
  userId;
  utils;
  database;
  storage;
  
  constructor (userId: string) {
    this.userId = userId;
    this.utils = new Utils();
    this.database = new Database('users');
    this.storage = new CloudStorage('users');
  };

  async changeUsername (username: string) {
    if (!username) {
      return false;
    };

    try {
      await this.database.update({ username }, this.userId);
      return true;
    } catch (error) {
      console.log('Error on users service (CHANGE USERNAME)', error);
      return false;
    }
  };

  async changeProfilePhoto (file: File) {
    try {

      const renamedFile = this.utils.renameFile(
        file,
        CloudStorageConstants.USER_PROFILE_PHOTO_FILENAME
      );

      const newProfilePhotoURL = await this.storage.uploadFile(
        renamedFile,
        this.userId
      );

      if (!newProfilePhotoURL) {
        return false;
      };

      await this.database.update({
        profile_photo: newProfilePhotoURL
      }, this.userId);

      return true;
    } catch (error) {
      console.log('Error on users service (CHANGE PROFILE PHOTO)', error);
      return false;
    };
  };

  async changeProfileBackgroundPhoto (file: File) {
    try {

      const renamedFile = this.utils.renameFile(
        file,
        CloudStorageConstants.USER_PROFILE_BACKGROUND_PHOTO_FILENAME
      );

      const newProfileBackgroundPhotoURL = await this.storage.uploadFile(
        renamedFile,
        this.userId
      );

      if (!newProfileBackgroundPhotoURL) {
        return false;
      };

      await this.database.update({
        profile_background: newProfileBackgroundPhotoURL
      }, this.userId);

      return true;
    } catch (error) {
      console.log('Error on users service (CHANGE PROFILE BACKGROUND PHOTO)', error);
      return false;
    };
  };

  async changeTheme (dark: boolean) {
    try {

      await this.database.update({
        theme: dark ? 'dark' : 'light'
      }, this.userId);

      return true;
    } catch (error) {
      console.log('Error on users service (CHANGE THEME)', error);
      return false;
    };
  };

  async toggleSavedPost (postId: string) {
    try {

      const user = await this.database.get(
        this.userId
      ) as FirestoreUser | undefined | null;

      if (!user) {
        return false;
      };

      let savedPosts = user.savedPosts;

      if (!savedPosts) {
        savedPosts = [];
      };

      const savedIndex = savedPosts.indexOf(postId);

      if (savedIndex === -1) {
        savedPosts.push(postId);
      } else {
        savedPosts.splice(savedIndex, 1);
      };

      await this.database.update({
        savedPosts
      }, this.userId);

      return true;
    } catch (error) {
      console.log('Error on users service (SAVE POST)', error);
      return false;
    };
  };
};

export default Users;
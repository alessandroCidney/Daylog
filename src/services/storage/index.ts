import {
  getStorage,
  ref as StorageRef,
  StorageReference,
  FirebaseStorage,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
  getBlob
} from 'firebase/storage';

import { TApplicationMessage } from '@/types/messages';

export interface ICloudStorage {
  storage: FirebaseStorage;
  reference: StorageReference;
  uploadFile: (file: File, childPath?: string) => Promise<string | null>;
  getFiles: (childPath?: string) => Promise<Blob[] | TApplicationMessage>;
  deleteFiles: (childPath?: string) => Promise<boolean>;
};

class CloudStorage implements ICloudStorage {
  storage;
  reference;
  
  constructor (path?: string) {
    this.storage = getStorage();
    
    if (path) {
      this.reference = StorageRef(this.storage, path);
    } else {
      this.reference = StorageRef(this.storage);
    };
  };

  async uploadFile (file: File, childPath?: string) {
    const fileReference = StorageRef(
      this.storage,
      `${this.reference.name}/${!!childPath ? `${childPath}/`: ''}${file.name}`
    );

    try {

      await uploadBytes(fileReference, file);
      return await getDownloadURL(fileReference);

    } catch (err) {

      console.log('Error on storage service (UPLOAD)', err);
      return null;
    };
  };

  async getFiles (childPath?: string): Promise<Blob[] | TApplicationMessage> {
    try {
      let reference = this.reference;

      if (!!childPath) {
        reference = StorageRef(
          this.storage,
          `${this.reference.name}/${childPath}`
        );
      };

      const { items: fileRefs } = await listAll(reference);

      const results = await Promise.all(fileRefs.map(fileRef => getBlob(fileRef)))

      return results;
    } catch (error) {
      console.log('Error on storage service (getFiles)', error);
      return ({ status: 'error', message: 'Erro durante o download dos arquivos.' })
    };
  };

  async deleteFiles (childPath?: string) {
    try {
      let reference = this.reference;

      if (!!childPath) {
        reference = StorageRef(
          this.storage,
          `${this.reference.name}/${childPath}`
        );
      };

      const fileRefs = (await listAll(reference)).items;

      await Promise.all(fileRefs.map((fileRef) => deleteObject(fileRef)))

      return true;
    } catch (err) {
      console.log('Error on storage service (DELETE)', err);
      return false;
    }
  };
};

export default CloudStorage;
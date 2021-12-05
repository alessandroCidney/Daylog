import {
  getStorage,
  ref as StorageRef,
  StorageReference,
  FirebaseStorage,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject
} from 'firebase/storage';

export interface ICloudStorage {
  storage: FirebaseStorage;
  reference: StorageReference;
  uploadFile: (file: File, childPath?: string) => Promise<string | null>;
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

  async deleteFiles (childPath?: string) {
    try {
      let reference = this.reference;

      if (!!childPath) {
        reference = StorageRef(
          this.storage,
          `${this.reference.name}/${childPath}`
        );
      };

      const fileRefs = await (await listAll(reference)).items;

      await Promise.all(fileRefs.map((fileRef) => deleteObject(fileRef)))

      return true;
    } catch (err) {
      console.log('Error on storage service (DELETE)', err);
      return false;
    }
  };
};

export default CloudStorage;
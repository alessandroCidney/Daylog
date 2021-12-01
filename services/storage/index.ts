import {
  getStorage,
  ref as StorageRef,
  StorageReference,
  FirebaseStorage,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';

interface ICloudStorage {
  storage: FirebaseStorage;
  reference: StorageReference;
  uploadFile: (file: File) => Promise<string | null>; 
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

  async uploadFile (file: File) {
    const fileReference = StorageRef(
      this.storage,
      `${this.reference.name}/${file.name}`
    );

    try {

      await uploadBytes(fileReference, file);
      return await getDownloadURL(fileReference);

    } catch (err) {

      console.log('Error on storage service', err);
      return null;
    }
  };
};

export default CloudStorage;
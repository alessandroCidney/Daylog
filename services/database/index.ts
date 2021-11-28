import {
  getDatabase,
  Database as FirebaseDatabase,
  DatabaseReference,
  ref as DatabaseRef,
  get as DatabaseGet,
  set as DatabaseSet,
  child as DatabaseChild,
  DataSnapshot
} from 'firebase/database';

export interface IDatabase {
  database: FirebaseDatabase;
  reference: DatabaseReference;
  get: (childPath?: string) => Promise<DataSnapshot | null>;
  set: (content: any, childPath?: string) => Promise<boolean>;
};

class Database implements IDatabase {
  database;
  reference;

  constructor (path: string) {
    this.database = getDatabase();
    this.reference = DatabaseRef(this.database, path);
  };

  async get (childPath?: string) {
    try {
      let snapshot;

      if (!!childPath) {
        snapshot = await DatabaseGet(DatabaseChild(this.reference, childPath));
      } else {
        snapshot = await DatabaseGet(this.reference);
      }

      if (snapshot.exists()) {
        return snapshot;
      }

      return null;
    } catch (err) {
      console.log('Error on database service (GET)', err);
      return null;
    };
  };

  async set (content: any, childPath?: string) {
    try {
      if (!!childPath) {
        await DatabaseSet(DatabaseChild(this.reference, childPath), content);
      } else {
        await DatabaseSet(this.reference, content);
      };

      return true;
    } catch (err) {
      console.log('Error on database service (SET)', err);
      return false;
    }
  };

  async setIfNotExists (content: any, childPath?: string) {
    try {
      if (!!childPath) {
        const alreadyExists = await this.get(childPath);

        if (alreadyExists) {
          throw new Error('Data already exists');
        }

        await DatabaseSet(DatabaseChild(this.reference, childPath), content);
      } else {
        const alreadyExists = await this.get();

        if (alreadyExists) {
          throw new Error('Data already exists');
        }

        await DatabaseSet(this.reference, content);
      };

      return true;
    } catch (err) {
      console.log('Error on database service (SET)', err);
      return false;
    }
  };
};

export default Database;
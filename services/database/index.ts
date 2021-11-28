import {
  getDatabase,
  Database as FirebaseDatabase,
  DatabaseReference,
  ref as DatabaseRef,
  get as DatabaseGet,
  child as DatabaseChild,
  DataSnapshot
} from 'firebase/database';

export interface IDatabase {
  database: FirebaseDatabase;
  reference: DatabaseReference;
  get: (childPath?: string) => Promise<DataSnapshot | null>;
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
      console.log('Error on database service', err);
      return null;
    };
  };
};

export default Database;
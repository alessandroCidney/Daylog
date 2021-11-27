import {
  getDatabase,
  Database as FirebaseDatabase,
  DatabaseReference,
  ref as DatabaseRef,
  get as DatabaseGet,
  child as DatabaseChild,
  DataSnapshot
} from 'firebase/database';

interface IDatabase {
  database: FirebaseDatabase;
  reference: DatabaseReference;
  get: (childPath: string | undefined) => Promise<DataSnapshot | null>;
};

class Database implements IDatabase {
  database;
  reference;

  constructor (path: string) {
    this.database = getDatabase();
    this.reference = DatabaseRef(this.database, path);
  };

  async get (childPath: string = '') {
    try {
      const snapshot = await DatabaseGet(DatabaseChild(this.reference, childPath));

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
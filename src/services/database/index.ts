import {
  getDatabase,
  Database as FirebaseDatabase,
  DatabaseReference,
  ref as DatabaseRef,
  get as DatabaseGet,
  set as DatabaseSet,
  child as DatabaseChild,
  DataSnapshot,
  push as DatabasePush,
  query as DatabaseQuery,
  update as DatabaseUpdate,
  remove as DatabaseRemove,
  Query,
  orderByChild,
  limitToFirst,
  startAt,
  endAt,
  equalTo
} from 'firebase/database';

export interface IDatabase {
  database: FirebaseDatabase;
  reference: DatabaseReference;
  get: (childPath?: string) => Promise<any>;
  getWhere: (key: string, value: any, childPath?: string) => Promise<any>;
  set: (content: any, childPath?: string) => Promise<boolean>;
  push: (content: any, childPath?: string) => Promise<string | false | null>;
  update: (content: any, childPath?: string) => Promise<boolean>;
  remove: (childPath?: string | undefined) => Promise<void>;
  search: (orderedByKey: string, searchString: string, limit: number) => Promise<any>;
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
        return snapshot.val();
      }

      return null;
    } catch (err) {
      console.log('Error on database service (GET)', err);
      return null;
    };
  };

  async getWhere (key: string, value: any) {
    try {
      const query = DatabaseQuery(
        this.reference,
        orderByChild(key),
        equalTo(value)
      );

      const snapshot = await DatabaseGet(query);

      if (snapshot.exists()) {
        return snapshot.val();
      };

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

  async update (content: any, childPath?: string) {
    try {
      if (!!childPath) {
        await DatabaseUpdate(DatabaseChild(this.reference, childPath), content);
      } else {
        await DatabaseUpdate(this.reference, content);
      };

      return true;
    } catch (err) {
      console.log('Error on database service (UPDATE)', err);
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

  async push (content: any) {
    try {
      const newRef = DatabasePush(this.reference);

      await DatabaseSet(newRef, content);

      return newRef.key;
    } catch (err) {
      console.log('Error on database service (SET)', err);
      return false;
    }
  };

  async remove (childPath?: string) {
    try {
      if (!!childPath) {
        const child = DatabaseChild(this.reference, childPath);
        await DatabaseRemove(child);
      } else {
        await DatabaseRemove(this.reference);
      }
    } catch (err) {
      console.log('Error on database service (DELETE)', err);
    }
  };

  async search (orderedByKey: string, searchString: string, limit: number = 10) {
    try {
      const query = DatabaseQuery(
        this.reference,
        orderByChild(orderedByKey),
        startAt(searchString),
        endAt(searchString + "\uf8ff")
      );
  
      const snapshot = await DatabaseGet(query);
  
      if (snapshot.exists()) {
        return snapshot.val();
      };
  
      return null;
    } catch (error) {
      console.log('Error on database service (DELETE)', error);
      return null;
    }
  };
};

export default Database;
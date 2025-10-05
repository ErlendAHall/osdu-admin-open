export type IDBRecord<T> = {
  identifier: string;
  value: T;
};

export enum ObjectStores {
  OSDURecordStore = "OSDURecordStore",
  OSDUSchemaStore = "OSDUSchemaStore",
}

/* Provides agnostic CRUDs to IndexedDB. */
export class IndexedDbHandler {
  dbHandler: IDBDatabase | undefined;
  IDBIdentifier: string;
  objectStores: typeof ObjectStores;

  constructor() {
    this.IDBIdentifier = "OSDUAdminStore";
    this.objectStores = ObjectStores;

    this.openDB()
      .then((result) => (this.dbHandler = result))
      .catch((error) => {
        throw error;
      });
  }

  async upsert<T>(data: IDBRecord<T>, destination: ObjectStores) {
    return new Promise((resolve, reject) => {
      if (!this.dbHandler) {
        return reject("DBHandler is not initialised");
      }

      const writeRequest = this.dbHandler
        .transaction(destination, "readwrite")
        .objectStore(destination)
        .put(data.value, data.identifier);

      writeRequest.onsuccess = (event) => {
        resolve(`The record ${data.identifier} was updated.`);
        globalThis.dispatchEvent(new CustomEvent("upsert"));
      };

      writeRequest.onerror = () => {
        reject(`An error occured while writing ${data.identifier}`);
      };
    });
  }

  async delete(identifier: string, destination: ObjectStores) {
    return new Promise((resolve, reject) => {
      if (!this.dbHandler) {
        return reject("DBHandler is not initialised");
      }

      const writeRequest = this.dbHandler
        .transaction(destination, "readwrite")
        .objectStore(destination)
        .delete(identifier);

      writeRequest.onsuccess = (event) => {
        globalThis.dispatchEvent(new CustomEvent("dbdelete"));
        resolve(`The record ${identifier} was deleted.`);
      };

      writeRequest.onerror = () => {
        reject(`An error occured while deleting ${identifier}`);
      };
    });
  }

  async read<T>(identifier: string, destination: ObjectStores) {
    return new Promise((resolve, reject) => {
      if (!this.dbHandler) {
        return reject("DBHandler is not initialised.");
      }

      const readRequest = this.dbHandler
        .transaction(destination, "readwrite")
        .objectStore(destination)
        .get(identifier);

      readRequest.onsuccess = () => {
        resolve(readRequest.result as T);
      };

      readRequest.onerror = () => {
        reject(readRequest.error);
      };
    });
  }

  async readAll<T>(destination: ObjectStores): Promise<Array<T>> {
    return new Promise((resolve, reject) => {
      if (!this.dbHandler) {
        return reject("DBHandler is not initialised.");
      }

      const readRequest = this.dbHandler
        .transaction(destination, "readonly")
        .objectStore(destination)
        .getAll();

      readRequest.onsuccess = () => {
        resolve(readRequest.result);
      };

      readRequest.onerror = () => {
        reject(readRequest.error);
      };
    });
  }

  async readAllKeys(destination: ObjectStores): Promise<IDBValidKey[]> {
    return new Promise((resolve, reject) => {
      if (!this.dbHandler) {
        return reject("DBHandler is not initialised.");
      }

      const readRequest = this.dbHandler
        .transaction(destination, "readonly")
        .objectStore(destination)
        .getAllKeys();

      readRequest.onsuccess = () => {
        resolve(readRequest.result);
      };

      readRequest.onerror = () => {
        reject(readRequest.error);
      };
    });
  }

  async openDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const openRequest = globalThis.indexedDB.open(this.IDBIdentifier, 1);

      openRequest.onsuccess = () => {
        resolve(openRequest.result);
      };

      openRequest.onupgradeneeded = () => {
        openRequest.result.createObjectStore(this.objectStores.OSDUSchemaStore);
        openRequest.result.createObjectStore(this.objectStores.OSDURecordStore);
        resolve(openRequest.result);
      };

      openRequest.onerror = () => {
        reject(openRequest.error);
      };
    });
  }
}

// @ts-ignore
window.adminDb = IndexedDbHandler;

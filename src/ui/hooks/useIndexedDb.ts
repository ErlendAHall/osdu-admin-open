import { useEffect, useState } from "react";
import type { OSDURecord, OSDUSchema } from "../../types/osdu.ts";
import { ObjectStores } from "../../indexeddb/indexedDbHandler.ts";

const { osduAdminDb } = await import("../../indexeddb/osduAdminDb.ts");

/*
 * Provides a reference to a single OSDU record from IndexedDB.
 */
export function useRecord(identifier?: string) {
    const [osduRecord, setRecord] = useState<OSDURecord>();

    useEffect(() => {
        if (!identifier) return;
        osduAdminDb
            .readRecord(identifier)
            .then((records) => setRecord(records));
    }, [identifier]);

    return osduRecord;
}

export function useSchema(kind?: string) {
    const [schema, setSchema] = useState<OSDUSchema>();

    useEffect(() => {
        if (!kind) return;
        osduAdminDb.readSchema(kind).then((schema) => setSchema(schema));
    }, [kind]);

    return schema;
}

interface IIndexedDb<T> {
    data: T | undefined;
    error: Error | undefined;
    loading: boolean;
    getItem: (from: ObjectStores, identifier: string) => Promise<T>;
    writeItem: (item: T) => Promise<boolean>;
    deleteItem: (identifier: string) => Promise<boolean>;
}

export function useIndexedDb<T>(): IIndexedDb<T> {
    async function getItem(from: ObjectStores, identifier: string) {
        if (from === ObjectStores.OSDURecordStore) {
            return await osduAdminDb.readRecord(identifier);
        } else if (from === ObjectStores.OSDUSchemaStore) {
            return await osduAdminDb.readSchema(identifier);
        }
    }

    return {
        data: undefined,
        error: undefined,
        loading: false,
        getItem: function (from: ObjectStores, identifier: string): Promise<T> {
            throw new Error("Function not implemented.");
        },
        writeItem: function (item: T): Promise<boolean> {
            throw new Error("Function not implemented.");
        },
        deleteItem: function (identifier: string): Promise<boolean> {
            throw new Error("Function not implemented.");
        },
    };
}

import { useEffect, useState } from "react";
import { useIndexedDb } from "./useIndexedDb.ts";

/* Performs a IndexedDB lookup for schemas and returns a list of tab titles. */
export function useIdentifiers() {
    const [identifiers, setIdentifiers] = useState<string[]>([]);
    const { dbInstance } = useIndexedDb();

    useEffect(() => {
        if (dbInstance?.status === "ready") {
            dbInstance.readAllRecords().then((records) => {
                setIdentifiers(records.map((record) => record.id));
            });
        }
    }, [dbInstance]);

    return identifiers;
}

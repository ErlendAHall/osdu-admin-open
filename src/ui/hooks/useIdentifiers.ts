import { useEffect, useState } from "react";
import { useDbEvents } from "./useDbEvents.ts";

const { osduAdminDb } = await import("../../indexeddb/osduAdminDb");
/* Performs a IndexedDB lookup for schemas and returns a list of tab titles. */
export function useIdentifiers() {
    useDbEvents("useIdentifiers");
    const [identifiers, setIdentifiers] = useState<string[]>([]);
    console.log("%cidentifiers: ", "color:#f0f;", identifiers);

    useEffect(() => {
        osduAdminDb.readAllRecords().then((records) => {
            setIdentifiers(records.map((record) => record.id));
        });
    }, []);

    return identifiers;
}

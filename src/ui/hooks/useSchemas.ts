import { useIndexedDb } from "./useIndexedDb.ts";
import type { OSDUSchema } from "../../types/osdu.ts";
import { useEffectAsync } from "./useEffectAsync.ts";
import { ObjectStores } from "../../indexeddb/indexedDbHandler.ts";
import { useMemo, useState } from "react";

/*
 * Provides a reference to a selection of OSDU schemas from IndexedDB.
 */
export function useSchemas(kinds?: string[]): {
    schemas?: OSDUSchema[];
    loading: boolean;
} {
    const { getItems, data, dbInstance } = useIndexedDb<OSDUSchema>();

    // Todo: Use the loading state of useIndexedDb hook.
    const [loading, setIsLoading] = useState(() => Boolean(data));

    const kindsKey = useMemo(
        () => (kinds && kinds.length ? kinds.slice().sort().join("|") : ""),
        [kinds]
    );

    useEffectAsync(async () => {
        setIsLoading(true);
        // TODO: Write a function to return a set of records from IndexedDB.
        await getItems(ObjectStores.OSDUSchemaStore);
        setIsLoading(false);
    }, [kindsKey, dbInstance]);

    return {
        schemas:
            data?.filter((d) => kinds?.includes(d["x-osdu-schema-source"])) ??
            [],
        loading,
    };
}

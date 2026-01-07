import type { OSDUSchema } from "../../types/osdu.ts";
import { useIndexedDb } from "./useIndexedDb.ts";
import { useEffectAsync } from "./useEffectAsync.ts";
import { useState } from "react";
import { ObjectStores } from "../../types/db.ts";

export function useSchema(kind?: string) {
    const { data, getItem, dbInstance } = useIndexedDb<OSDUSchema>();
    // TODO: Use loading state from indexeddb instead.
    const [loading, setIsLoading] = useState(Boolean(data));

    useEffectAsync(async () => {
        setIsLoading(true);
        if (!kind) return;
        await getItem(kind, ObjectStores.OSDUSchemaStore);
        setIsLoading(false);
    }, [kind, dbInstance]);

    return { schema: data?.at(0), loading };
}

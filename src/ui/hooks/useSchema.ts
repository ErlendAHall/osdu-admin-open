import type { OSDUSchema } from "../../types/osdu.ts";
import { useIndexedDb } from "./useIndexedDb.ts";
import { ObjectStores } from "../../indexeddb/indexedDbHandler.ts";
import { useEffectAsync } from "./useEffectAsync.ts";
import { useState } from "react";

export function useSchema(kind?: string) {
    const { data, getItem, dbInstance } = useIndexedDb<OSDUSchema>();
    // kind = '"osdu:wks:master-data--TubularAssembly:2.0.0"';
    // TODO: Use loading state from indexeddb instead.
    const [loading, setIsLoading] = useState(Boolean(data));

    useEffectAsync(async () => {
        setIsLoading(true);
        if (!kind) return;
        await getItem(
            "osdu:wks:master-data--TubularAssembly:2.0.0",
            ObjectStores.OSDUSchemaStore
        );
        setIsLoading(false);
    }, [kind, dbInstance]);

    return { schema: data?.at(0), loading };
}

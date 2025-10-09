import bhaRunSchema from "../../assets/BHARun2.0.0.json";
import holeSectionSchema from "../../assets/HoleSection1.4.0.json";
import tubularAssemblySchema from "../../assets/TubularAssembly2.0.0.json";

import bhaRunRecord from "../../assets/BHARun2.0.0Vals.json";
import holeSectionRecord from "../../assets/HoleSectionRecord.1.4.0.json";
import tubularAssemblyRecord from "../../assets/TubularAssemblyRecord2.0.0.json";

import { useIndexedDb } from "./useIndexedDb.ts";
import { useEffect } from "react";

export function useDbSeeder() {
    const { dbInstance } = useIndexedDb();

    useEffect(() => {
        async function handleSeeding() {
            return await Promise.allSettled([
                // @ts-expect-error mock code
                dbInstance.writeSchema(bhaRunSchema),
                // @ts-expect-error mock code
                dbInstance.writeSchema(holeSectionSchema),
                // @ts-expect-error mock code
                dbInstance.writeSchema(tubularAssemblySchema),
                // @ts-expect-error mock code
                dbInstance.writeRecord(bhaRunRecord),
                // @ts-expect-error mock code
                dbInstance.writeRecord(holeSectionRecord),
                // @ts-expect-error mock code
                dbInstance.writeRecord(tubularAssemblyRecord),
            ]);
        }
        if (dbInstance?.status === "ready") {
            handleSeeding().then(() => console.info("Seeding is done."));
        }
    }, [dbInstance]);
}

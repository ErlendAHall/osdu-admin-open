import bhaRunSchema from "./BHARun2.0.0.json";
import holeSectionSchema from "./HoleSection1.4.0.json";
import tubularAssemblySchema from "./TubularAssembly2.0.0.json";

// import bhaRunRecord from "./BHARun2.0.0Vals.json";
import holeSectionRecord from "./HoleSectionRecord.1.4.0.json";
import tubularAssemblyRecord from "./TubularAssemblyRecord2.0.0.json";

const { osduAdminDb } = await import("../indexeddb/osduAdminDb.ts");

// @ts-ignore
globalThis.osduAdminDb = osduAdminDb;

await Promise.allSettled([
  // @ts-ignore
  osduAdminDb.writeSchema(bhaRunSchema),
  // @ts-ignore
  osduAdminDb.writeSchema(holeSectionSchema),
  // @ts-ignore
  osduAdminDb.writeSchema(tubularAssemblySchema),
  // @ts-ignore
  // osduAdminDb.writeRecord(bhaRunRecord),
  // @ts-ignore
  osduAdminDb.writeRecord(holeSectionRecord),
  // @ts-ignore
  osduAdminDb.writeRecord(tubularAssemblyRecord),
]);

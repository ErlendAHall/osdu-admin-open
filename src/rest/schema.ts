// TODO: Connect this to an acutal source.
export function fetchSchemaNames(): Promise<Array<string>> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                "osdu:wks:master-data--BHARun:2.0.0",
                "osdu:wks:master-data--HoleSection:1.4.0",
                "osdu:wks:master-data--TubularAssembly:2.0.0",
            ]);
        }, 1500);
    });
}

export function getSchema() {
    //  Fetch records if they exist in indexeddb
    // If they exist and are not > 2 days old
    // return
    // If they don't exist or are > 2 days old
    // await fetch
    // Overwrite indexeddb
    // return
}

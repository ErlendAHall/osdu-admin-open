import json from "../assets/BHARun2.0.0Vals.json";

export async function getEntityRecord<T>(): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(async () => {
            // @ts-ignore
            resolve(json);
        }, 2000);
    });
}

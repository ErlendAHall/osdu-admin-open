import type { OSDUField } from "./types.ts";

/* Recursively traverses through a OSDU schema to find all properties that are renderable in a HTML form.*/
export function collectNodesWithRequiredProps(root: unknown): OSDUField[] {
  const found: OSDUField[] = [];

  // These properties are required for the JSON node to be included.
  const required = ["description", "title", "type", "example"];

  function traverse(node: unknown) {
    if (node === null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const item of node) traverse(item);
      return;
    }
    const obj = node as OSDUField;
    const hasAll = required.every((k) =>
      Object.prototype.hasOwnProperty.call(obj, k),
    );
    if (hasAll) found.push(obj);
    for (const value of Object.values(obj)) traverse(value);
  }

  traverse(root);
  return found;
}

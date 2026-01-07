import { Autocomplete, Button } from "@equinor/eds-core-react";
import { useFormGenerator } from "../hooks/useFormGenerator";
import { useRef, useState, type FormEvent } from "react";
import { useSchemaKinds } from "../hooks/useSchemas";
import { useUnsavedRecord } from "../hooks/useUnsavedRecord";
import "./styles.css";
import type { UnsavedOSDURecord } from "../../types/osdu";
import { createNestedOSDURecord } from "../../utils/object";
export function NewRecordPage() {
    const [pickedSchema, setPickedSchema] = useState<string | undefined>();
    const kinds = useSchemaKinds();
    const formFields = useFormGenerator(pickedSchema);

    // A temporary identifier for the new record.
    // The record should be assigned a proper ID once it has been saved in OSDU.
    const tempIdentifier = useRef<string>(crypto.randomUUID());

    // Before saving, we need a temporary identifier.
    const { saveNewChanges } = useUnsavedRecord(tempIdentifier.current);

    function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const partial: UnsavedOSDURecord = {};
        const inputElements = Array.from(form).filter(
            (el) => el instanceof HTMLInputElement
        );

        inputElements.forEach((element) => {
            if (element.dataset.path === "root") {
                //@ts-expect-error: TODO: Fix this typing
                partial[element.id] = element.value;
            } else if (element.dataset.path) {
                const updated = createNestedOSDURecord(
                    partial,
                    element.dataset.path,
                    element.value
                );
                Object.assign(partial, updated);
            }
        });

        saveNewChanges(partial);
    }

    if (!pickedSchema && kinds.length > 0 && formFields.length === 0) {
        return (
            <section className="new-records-container">
                <div className="kind-picker">
                    <h5>Pick a schema from the dropdown to begin</h5>
                    <form>
                        <Autocomplete
                            label="Search for kind"
                            options={kinds}
                            onOptionsChange={({ selectedItems }) =>
                                setPickedSchema(selectedItems.at(0))
                            }
                        />
                    </form>
                </div>
            </section>
        );
    }

    return (
        <section className="new-records-container">
            <h3>Create new {pickedSchema}</h3>
            <form className="records-form" onSubmit={handleFormSubmit}>
                <FormControls />
                {formFields}
            </form>
        </section>
    );
}

export function FormControls() {
    return (
        <fieldset>
            <Button type="submit">Create</Button>
            <Button variant="outlined" disabled>
                Undo
            </Button>
        </fieldset>
    );
}

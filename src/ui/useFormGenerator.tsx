import { type ReactNode, useEffect, useState } from "react";
import {
  DatePicker,
  Input,
  Label,
  Switch,
  Tooltip,
} from "@equinor/eds-core-react";
import type { OSDUField } from "../types/form";

/* Accepts a list of OSDU fields and returns a list of ReactNodes ready to be rendered in a HTML form.*/
export function useFormGenerator(fields: OSDUField[]) {
  console.log("%cfields: ", "color:#f0f;", fields);
  const [formFields, setFormFields] = useState<ReactNode[]>([]);

  useEffect(() => {
    const nodes: ReactNode[] = [];
    const tooltipDelay = 1000; //ms

    fields.forEach((field, index) => {
      // Field is integer or number.
      if (field.type === "number" || field.type === "integer") {
        const id = `number-input-${index}`;
        nodes.push(
          <div key={field.title + index}>
            <Tooltip
              placement={"left-end"}
              enterDelay={tooltipDelay}
              title={field.description}
            >
              <Label htmlFor={id} label={field.title} />
            </Tooltip>
            <Input type="number" id={id} value={field.value} />
          </div>
        );

        // Field is string or date.
      } else if (field.type === "string") {
        const id = `string-input-${index}`;
        nodes.push(
          <div key={field.title + index}>
            <Tooltip
              placement={"left"}
              enterDelay={tooltipDelay}
              title={field.description}
            >
              <Label htmlFor={id} label={field.title} />
            </Tooltip>
            {field?.format === "date-time" && typeof field.value ? (
              <DatePicker id={id} />
            ) : (
              <Input
                id={id}
                autoComplete="off"
                value={field.value}
                onChange={() => {}}
              />
            )}
          </div>
        );

        // Field is a boolean.
      } else if (field.type === "boolean" && typeof field.value === "boolean") {
        const id = `boolean-input-${index}`;
        nodes.push(
          <div>
            <Tooltip
              placement={"left"}
              enterDelay={tooltipDelay}
              title={field.description}
            >
              <Switch id={id} label={field.title} checked={field.value} />
            </Tooltip>
          </div>
        );
      }
    });

    setFormFields(nodes);
  }, [fields]);

  return formFields;
}

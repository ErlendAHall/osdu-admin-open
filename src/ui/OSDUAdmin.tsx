import "./App.css";
import schema from "../assets/BHARun2.0.0.json";
import { useFormGenerator } from "./useFormGenerator.tsx";
import { Button } from "@equinor/eds-core-react";
import { collectNodesWithRequiredProps } from "../traverser.ts";

const fields = collectNodesWithRequiredProps(schema);
function OSDUAdmin() {
  const formFields = useFormGenerator(fields);

  return (
    <div className="outer">
      <menu>Menubar here with tabs</menu>
      <form>
        <fieldset className="inputs">
          {formFields.map((formField) => formField)}
        </fieldset>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
}

export default OSDUAdmin;

import {
  Autocomplete,
  Button,
  Checkbox,
  Search,
  Tabs,
  Typography,
} from "@equinor/eds-core-react";
import { useEffect, useState } from "react";
import "./styles.css";
import { fetchSchemaNames } from "../../rest/schema.ts";
import { getEntityRecord } from "../../rest/record.ts";
const { osduAdminDb } = await import("../../indexeddb/osduAdminDb.ts");

export function NewRecordPanel() {
  const [options, setOptions] = useState<string[]>([]);
  const [autogenIdEnabled, setAutogenIdEnabled] = useState(true);
  useEffect(() => {
    fetchSchemaNames().then(setOptions);
  }, []);

  // TODO: Provide error handling

  return (
    <Tabs.Panel>
      <section className="create_record">
        <form>
          <Typography variant="accordion_header" group="ui">
            Create a new record
          </Typography>
          <Autocomplete
            label=""
            placeholder="kind"
            id="new-record"
            options={options}
          />
          {!autogenIdEnabled && (
            <em>TODO: Provide textfield to manually set a id.</em>
          )}
          <fieldset className="record-create-fieldset">
            <Checkbox
              checked={autogenIdEnabled}
              label="Autogenerate record identifier"
              onChange={() => setAutogenIdEnabled(!autogenIdEnabled)}
            />
            <Button onClick={() => console.log("create record")}>Create</Button>
          </fieldset>
        </form>
      </section>

      <section className="edit_record">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const record = await getEntityRecord();
            console.log("%crecord: ", "color:#f0f;", record);
            // @ts-ignore
            await osduAdminDb.writeRecord(record);
          }}
        >
          <Typography variant="accordion_header" group="ui">
            Open an existing record
          </Typography>
          <Search
            placeholder={"identifier"}
            aria-label="Search by identifier"
          ></Search>
          <Button type={"submit"}>Open</Button>
        </form>
      </section>
    </Tabs.Panel>
  );
}

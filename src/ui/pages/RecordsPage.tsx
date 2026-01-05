import { Tabs } from "@equinor/eds-core-react";
import { RecordTable } from "../table/RecordTable";
import { useState } from "react";
import { useSchemaKinds } from "../hooks/useSchemas";

export function RecordsPage() {
    const kinds = useSchemaKinds();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs
            activeTab={activeTab}
            onChange={(index) => setActiveTab(Number(index))}
        >
            <Tabs.List>
                {kinds.map((tabTitle, index) => (
                    <Tabs.Tab key={index}>{String(tabTitle)}</Tabs.Tab>
                ))}
            </Tabs.List>
            <Tabs.Panels>
                {kinds.map((kind, index) => (
                    <Tabs.Panel key={"panel" + index}>
                        <RecordTable key={index} kind={kind} />
                    </Tabs.Panel>
                ))}
            </Tabs.Panels>
        </Tabs>
    );
}

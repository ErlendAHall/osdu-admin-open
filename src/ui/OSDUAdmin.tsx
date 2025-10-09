import "./App.css";
import { Tabs } from "@equinor/eds-core-react";
import { useState } from "react";
import { useIdentifiers } from "./hooks/useIdentifiers.ts";
import { RecordPanel } from "./RecordPanel.tsx";
import { NewRecordPanel } from "./NewRecordPanel/NewRecordPanel.tsx";
import { useDbSeeder } from "./hooks/useDbSeeder.ts";

function truncateTitle(title: string) {
    const entityName = title.split("--")[1].split(":")[0];
    const truncatedVersion = title.split(":")?.at(-1)?.split("-")?.at(-1);
    return entityName + ":" + truncatedVersion;
}

function OSDUAdmin() {
    useDbSeeder();
    const identifiers = useIdentifiers();
    const [activeTab, setActiveTab] = useState(0);

    return (
        <Tabs
            activeTab={activeTab}
            onChange={(index) => setActiveTab(Number(index))}
        >
            <Tabs.List>
                <Tabs.Tab>New record +</Tabs.Tab>
                {identifiers.map((tabTitle, index) => (
                    <Tabs.Tab key={index}>{truncateTitle(tabTitle)}</Tabs.Tab>
                ))}
            </Tabs.List>
            <Tabs.Panels>
                <Tabs.Panel>
                    <NewRecordPanel />
                </Tabs.Panel>
                {identifiers.map((id) => (
                    <Tabs.Panel key={id}>
                        <RecordPanel identifier={id} />
                    </Tabs.Panel>
                ))}
            </Tabs.Panels>
        </Tabs>
    );
}

export default OSDUAdmin;

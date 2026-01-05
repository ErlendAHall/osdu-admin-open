import "./App.css";
import { useDbSeeder } from "./hooks/useDbSeeder.ts";
import { BrowserRouter, Route, Routes } from "react-router";
import { RecordsPage } from "./pages/RecordsPage.tsx";
import { TopBar } from "./TopBar/TopBar.tsx";
import { NewRecordPage } from "./pages/NewRecordPage.tsx";

export function OSDUAdmin() {
    useDbSeeder();

    return (
        <main>
            <TopBar />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RecordsPage />} />
                    <Route path="/records" element={<RecordsPage />} />
                    <Route path="new-record" element={<NewRecordPage />} />
                    <Route
                        path="/record"
                        element={
                            <>
                                <p>this be edit record</p>
                            </>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <>
                                <p>this be settings</p>
                            </>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </main>
    );
}

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Styles from "./app-layout.module.css";

function AppLayout() {
    const [results, setResults] = useState(null); // Shared state for results

    return (
        <div className={Styles.application}>
            <Sidebar setResults={setResults} /> {/* Pass setResults to Sidebar */}
            <div className={Styles.content}>
                <Header />
                <div className={Styles.main}>
                    <Outlet context={{ results }} /> {/* Pass results via context */}
                </div>
            </div>
        </div>
    );
}

export default AppLayout;

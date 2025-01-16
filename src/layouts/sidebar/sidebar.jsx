import React from "react";
import Styles from "./sidebar.module.css";
import Form from "../../components/Form";

function Sidebar({ setResults }) {
    return (
        <div className={Styles.sidebar}>
            <Form setResults={setResults} /> {/* Pass setResults to Form */}
        </div>
    );
}

export default Sidebar;

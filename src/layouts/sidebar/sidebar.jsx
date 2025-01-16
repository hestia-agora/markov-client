import React from "react";
import Styles from "./sidebar.module.css";
import Form from "../../components/Form";
import logoImage from "../../assets/hestia-logo.png";


function Sidebar({ setResults }) {
    return (
        <div className={Styles.sidebar}>
            <Form setResults={setResults} /> {/* Pass setResults to Form */}


        <img
          className={Styles.logoImage}
          src={logoImage}
          alt="hestia agora brand logo image"
        />
      </div>

    );
}

export default Sidebar;

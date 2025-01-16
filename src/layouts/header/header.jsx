import Styles from "./header.module.css";
import logoImage from "../../assets/logo.jpg";

function Header() {

  return (
    <div className={Styles.header}>
      <div className={Styles.headerLogo}>
        <img
          className={Styles.logoImage}
          src={logoImage}
          alt="hestia agora brand logo image"
        />
      </div>
      <div className={Styles.rightContainer}>
        <div className={Styles.fullName}>
        </div>
        <div className={Styles.logoutContainer}>
          
        </div>
      </div>
    </div>
  );
}

export default Header;

import React from "react";
import rzplogo from "../../assets/rzp-logo-text.svg";
import styles from "./index.module.css";

const Sidebar = ({ menu, activeMenu, onChange }) => {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={rzplogo} />
      {menu.map((item) => (
        <div
          key={item.id}
          className={`${styles.logoContainer} ${
            item.id === activeMenu.id ? styles.active : styles.inactive
          }`}
          onClick={() => onChange(item)}
        >
          <img src={item.icon} />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

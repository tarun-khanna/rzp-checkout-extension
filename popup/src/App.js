import React, { useState } from "react";
import StandardCheckout from "./modules/StandardCheckout";
import ComingSoon from "./modules/ComingSoon";
import Sidebar from "./components/Sidebar";
import { MENU } from "./constants";
import styles from "./app.module.css";

const App = () => {
  const [activeMenu, setActiveMenu] = useState(MENU[0]);

  const renderScreen = () => {
    switch (activeMenu.id) {
      case "standard-cx":
        return <StandardCheckout />;
      default:
        return <ComingSoon />;
    }
  };
  return (
    <div className={styles.container}>
      <Sidebar
        onChange={(menu) => setActiveMenu(menu)}
        menu={MENU}
        activeMenu={activeMenu}
      />
      <div className={styles.screen}>
        <p className={styles.activeLabel}>{activeMenu.label}</p>
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;

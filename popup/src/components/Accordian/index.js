import React, { useState, useRef } from "react";
import chevronRight from "../../assets/ic-chevron-right.svg";
import styles from "./index.module.css";

const Accordian = ({ title, children, containerStyle }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className={containerStyle}>
      <button
        onClick={() => setExpand(!expand)}
        className={`${styles.accordion} ${
          expand ? styles.active : styles.inactive
        }`}
      >
        {title}
        <img
          className={`${styles.icon} ${expand && styles.downIcon}`}
          src={chevronRight}
        />
      </button>
      <div className={`${styles.panel} ${expand && styles.expandedPanel}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordian;

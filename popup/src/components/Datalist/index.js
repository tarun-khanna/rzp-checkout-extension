import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const Datalist = ({ suggestions, id, label, onChange, value }) => {
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleKeyDown = (ev) => {
    let focus = currentFocus;
    if (ev.keyCode == 40) {
      // DOWN
      focus++;
    } else if (ev.keyCode == 38) {
      // UP
      focus--;
    } else if (ev.keyCode == 13) {
      // ENTER
      if (currentFocus > -1) {
        onInputChange(filteredSuggestions[currentFocus]);
      }
    }
    setCurrentFocus(focus);
  };

  const handleInput = (ev) => {
    let val = ev.target.value;
    onChange(val);

    if (!val) {
      return false;
    }
    setCurrentFocus(-1);
    setFilteredSuggestions(
      suggestions.filter(
        (suggestion) =>
          suggestion.substr(0, val.length).toUpperCase() == val.toUpperCase()
      )
    );
  };

  const onInputChange = (value) => {
    setFilteredSuggestions([]);
    onChange(value);
  };

  useEffect(() => {
    document.addEventListener("click", function (e) {
      setFilteredSuggestions([]);
    });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <label>{label}</label>
        <input
          type="text"
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
        {filteredSuggestions.length ? (
          <div className={styles.datalist}>
            {filteredSuggestions.map((item, index) => (
              <div
                className={index === currentFocus && styles.active}
                onClick={() => onInputChange(item)}
              >
                <strong>{item.substr(0, value.length)}</strong>
                {item.substr(value.length)}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Datalist;

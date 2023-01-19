import React, { useState } from "react";
import { EVENT_TYPES } from "../../../../constants";
import Input from "../../components/Input";
import { getInitialOptions, unflattenObject } from "../../utils";
import rzpLogo from "../../assets/rzp-logo.svg";
import inspectIcon from "../../assets/ic-inspect.svg";
import resetIcon from "../../assets/ic-reset.svg";
import styles from "./index.module.css";

const StandardCheckout = () => {
  const [selector, setSelector] = useState(
    localStorage.getItem("rzp-checkout-selector") || ""
  );
  const [options, setOptions] = useState(getInitialOptions());

  const onInputChange = (ev, key) => {
    setOptions((options) => ({
      ...options,
      [key]: {
        ...options[key],
        value: key === "amount" ? ev.target.value * 100 : ev.target.value,
      },
    }));
  };

  const submitHandler = () => {
    localStorage.setItem("rzp-checkout-form", JSON.stringify(options));
    localStorage.setItem("rzp-checkout-selector", selector);
    let translatedOptions = Object.entries(options).reduce(
      (acc, [key, input]) => {
        acc[key] = input.value;
        return acc;
      },
      {}
    );
    translatedOptions = {
      ...unflattenObject(translatedOptions),
      selector,
    };
    translatedOptions.amount = translatedOptions.amount
      ? translatedOptions.amount * 100
      : "";

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: EVENT_TYPES.SET_OPTIONS,
          from: "popup",
          options: translatedOptions,
        });
        window.close();
      }
    );
  };

  const resetHandler = () => {
    localStorage.removeItem("rzp-checkout-form");
    localStorage.removeItem("rzp-checkout-selector");
    setSelector("");
    setOptions(getInitialOptions());
  };

  const mxModeHandler = (ev) => {
    setOptions((options) => {
      return {
        ...options,
        key: {
          ...options.key,
          value:
            ev.target.value === "live"
              ? "rzp_live_fQOafVJoJqscJ6"
              : "rzp_test_rLRCKMrfIRVgEg",
        },
      };
    });
  };

  const handlePagePicker = () => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          from: "popup",
          enableInspector: true,
          type: EVENT_TYPES.TOGGLE_INSPECTOR,
        });
        window.close();
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className="header">
        <label className="header" htmlFor="selector">
          Add Selector for button
        </label>
        <button
          type="button"
          className={styles.pagePickerBtn}
          onClick={handlePagePicker}
        >
          Pick from page
          <img src={inspectIcon} className={styles.inspectIcon} />
        </button>
      </div>
      <input
        value={selector}
        onChange={(ev) => {
          setSelector(ev.target.value);
        }}
      />

      <select
        onChange={mxModeHandler}
        name="mode"
        id="merchant-mode"
        className={styles.mxModeSelect}
      >
        <option value="test">Test</option>
        <option value="live">Live</option>
      </select>
      <fieldset className={styles.optionsBox}>
        <legend>
          <p id="add-options" className="header">
            Add Checkout options
          </p>
        </legend>

        {Object.keys(options).map((key) => {
          let input = options[key];
          return (
            <Input
              {...input}
              key={input.id}
              onChange={(ev) => onInputChange(ev, key)}
            />
          );
        })}
      </fieldset>
      <div className={styles.btnContainer}>
        <button className={styles.resetBtn} onClick={resetHandler}>
          <img src={resetIcon} />
          Reset
        </button>
        <button className={styles.submitBtn} onClick={submitHandler}>
          <img className={styles.rzpBtnLogo} src={rzpLogo} />
          Submit
        </button>
      </div>
    </div>
  );
};

export default StandardCheckout;

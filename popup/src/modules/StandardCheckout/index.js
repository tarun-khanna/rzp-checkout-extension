import React, { useEffect, useState } from "react";
import { EVENT_TYPES } from "../../../../constants";
import Input from "../../components/Input";
import Datalist from "../../components/Datalist";
import { createOptions, translateOptions } from "../../utils";
import rzpLogo from "../../assets/rzp-logo.svg";
import inspectIcon from "../../assets/ic-inspect.svg";
import resetIcon from "../../assets/ic-reset.svg";
import styles from "./index.module.css";
import { COUNTRY_CONFIG, COUNTRY_TO_ISO, getCountry } from "../../constants";

const StandardCheckout = () => {
  const [selector, setSelector] = useState("");
  const [options, setOptions] = useState(createOptions(getCountry()));
  const [country, setCountry] = useState(getCountry());
  const [mode, setMode] = useState("test");

  const onInputChange = (val, key) => {
    setOptions((options) => ({
      ...options,
      [key]: {
        ...options[key],
        value: key === "amount" ? val * 100 : val,
      },
    }));
  };

  const submitHandler = () => {
    chrome.storage.local.set({
      checkoutSelector: selector,
      checkoutOptions: JSON.stringify(options),
      country: country,
      mode: mode,
    });

    let translatedOptions = translateOptions(options, selector);
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          from: "popup",
          type: EVENT_TYPES.SET_OPTIONS,
          options: translatedOptions,
        });
        window.close();
      }
    );
  };

  const resetHandler = () => {
    chrome.storage.local.remove([
      "checkoutSelector",
      "checkoutOptions",
      "country",
      "mode",
    ]);
    setSelector("");
    setOptions(createOptions(country));
    setCountry(getCountry());
    setMode("test");
  };

  const mxModeHandler = (ev) => {
    setMode(ev.target.value);
    setOptions((options) => {
      return {
        ...options,
        key: {
          ...options.key,
          value:
            ev.target.value === "live"
              ? COUNTRY_CONFIG[country].key.live
              : COUNTRY_CONFIG[country].key.test,
        },
      };
    });
  };

  const countryChangeHandler = (ev) => {
    let _country = ev.target.value;
    setCountry(_country);
    setOptions((options) => {
      return {
        ...createOptions(_country),
        key: {
          ...options.key,
          value:
            mode === "live"
              ? COUNTRY_CONFIG[_country].key.live
              : COUNTRY_CONFIG[_country].key.test,
        },
      };
    });
  };

  const handlePagePicker = () => {
    let translatedOptions = translateOptions(options, selector);
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          from: "popup",
          type: EVENT_TYPES.TOGGLE_INSPECTOR,
          enableInspector: true,
          options: translatedOptions,
        });
        window.close();
      }
    );
  };

  const renderInputs = () => {
    return Object.keys(options).map((key) => {
      let input = options[key];
      switch (input.type) {
        case "input":
          return (
            <Input
              {...input}
              key={input.id}
              onChange={(ev) => onInputChange(ev.target.value, key)}
            />
          );
        case "datalist":
          return (
            <Datalist
              {...input}
              key={input.id}
              onChange={(val) => onInputChange(val, key)}
            />
          );
      }
    });
  };

  useEffect(() => {
    chrome.storage.local
      .get(["checkoutSelector", "checkoutOptions", "country", "mode"])
      .then((result) => {
        setSelector(result.checkoutSelector);
        const tempOptions = result.checkoutOptions
          ? JSON.parse(result.checkoutOptions)
          : {};
        if (tempOptions && Object.keys(tempOptions).length) {
          setOptions(tempOptions);
        }

        if (result.country) {
          setCountry(result.country);
        }

        if (result.mode) {
          setMode(result.mode);
        }
      });
  }, []);

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
      <div className={styles.selectContainer}>
        <div className={`${styles.column} ${styles.countrySelect}`}>
          <label className="header" htmlFor="country">
            Country
          </label>
          <select
            onChange={countryChangeHandler}
            name="country"
            id="country"
            value={country}
          >
            {Object.entries(COUNTRY_TO_ISO).map(([key, value]) => (
              <option value={value}>{key}</option>
            ))}
          </select>
        </div>
        <div className={styles.column}>
          <label className="header" htmlFor="merchant-mode">
            Mode
          </label>
          <select
            onChange={mxModeHandler}
            name="mode"
            id="merchant-mode"
            className={styles.mxModeSelect}
            value={mode}
          >
            <option value="test">Test</option>
            <option value="live">Live</option>
          </select>
        </div>
      </div>

      <fieldset className={styles.optionsBox}>
        <legend>
          <p id="add-options" className="header">
            Add Checkout options
          </p>
        </legend>

        {renderInputs()}
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

import React, { useEffect, useState, useRef } from "react";
import { EVENT_TYPES } from "../../../../constants";
import Input from "../../components/Input";
import Datalist from "../../components/Datalist";
import { createOptions, translateOptions } from "../../utils";
import rzpLogo from "../../assets/rzp-logo.svg";
import inspectIcon from "../../assets/ic-inspect.svg";
import resetIcon from "../../assets/ic-reset.svg";
import { COUNTRY_CONFIG, COUNTRY_TO_ISO, getCountry } from "../../constants";
import Accordian from "../../components/Accordian";
import styles from "./index.module.css";

const StandardCheckout = () => {
  const [selector, setSelector] = useState("");
  const [options, setOptions] = useState(createOptions(getCountry()));
  const [country, setCountry] = useState(getCountry());
  const [mode, setMode] = useState("test");
  const optionsInStorage = useRef(false);
  const tabUrl = useRef("");

  const onInputChange = (value, key) => {
    setOptions((options) => ({
      ...options,
      [key]: {
        ...options[key],
        value,
      },
    }));
  };

  const submitHandler = () => {
    chrome.storage.local.set({
      [tabUrl.current]: {
        checkoutSelector: selector,
        checkoutOptions: JSON.stringify(options),
        country: country,
        mode: mode,
      },
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
    chrome.storage.local.remove([tabUrl.current]);
    setSelector("");
    setOptions(createOptions(country));
    setCountry(getCountry());
    setMode("test");
    setAmountFromPage();
    optionsInStorage.current = false;
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

  const setAmountFromPage = () => {
    chrome.runtime.sendMessage(
      {
        from: "popup",
        type: EVENT_TYPES.GET_AMOUNT,
      },
      (response) => {
        if (!optionsInStorage.current) {
          setOptions((options) => {
            return {
              ...options,
              amount: {
                ...options.amount,
                value: response,
              },
            };
          });
        }
      }
    );
  };

  useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const url = tabs[0].url.split("?")[0];
        tabUrl.current = url;

        chrome.storage.local.get([url]).then((result) => {
          const dataStored = result[url];
          if (!dataStored) return;

          const tempOptions = dataStored.checkoutOptions
            ? JSON.parse(dataStored.checkoutOptions)
            : {};
          if (tempOptions && Object.keys(tempOptions).length) {
            optionsInStorage.current = true;
            setOptions(tempOptions);
          }

          setSelector(dataStored.checkoutSelector);

          if (dataStored.country) {
            setCountry(dataStored.country);
          }

          if (dataStored.mode) {
            setMode(dataStored.mode);
          }
        });
      }
    );

    setAmountFromPage();
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

      <Accordian
        containerStyle={styles.accordianContainer}
        title="Modify Checkout Options"
      >
        <div className={styles.optionsBox}>{renderInputs()}</div>
      </Accordian>

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

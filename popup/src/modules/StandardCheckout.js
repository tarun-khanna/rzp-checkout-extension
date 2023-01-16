import React, { useState } from "react";
import { EVENT_TYPES } from "../../../constants";
import Input from "../components/Input";
import { getInitialOptions, unflattenObject } from "../utils";

const StandardCheckout = () => {
  const [selector, setSelector] = useState("");
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
    <div className="section">
      <div className="header">
        <label className="header" htmlFor="selector">
          Add Selector for button
        </label>
        <button type="button" id="page-picker-btn" onClick={handlePagePicker}>
          Pick from page
        </button>
      </div>
      <input
        value={selector}
        onChange={(ev) => {
          setSelector(ev.target.value);
        }}
      />

      <select onChange={mxModeHandler} name="mode" id="merchant-mode">
        <option value="test">Test</option>
        <option value="live">Live</option>
      </select>
      <fieldset>
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
      <button className="submit-btn" onClick={submitHandler}>
        Submit !
      </button>
    </div>
  );
};

export default StandardCheckout;

import { EVENT_TYPES } from "../constants";

const formElem = document.getElementById("checkout-form");

function unflattenObject(data) {
  let result = {};
  for (let i in data) {
    let keys = i.split(".");
    keys.reduce((acc, value, index) => {
      return (
        acc[value] ||
        (acc[value] = isNaN(Number(keys[index + 1]))
          ? keys.length - 1 === index
            ? data[i]
            : {}
          : [])
      );
    }, result);
  }
  return result;
}

document.addEventListener("DOMContentLoaded", () => {
  let data = window.localStorage.getItem("rzp-checkout-form");
  data = JSON.parse(data);

  if (data) {
    for (let [key, value] of Object.entries(data)) {
      const ele = document.getElementById(key);
      if (ele) {
        if (key === "amount") {
          ele.value = value / 100;
        } else ele.value = value || "";
      }
    }
  }
});

formElem.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let options = {};
  for (let i = 0; i <= formElem.elements.length; i++) {
    const ele = formElem.elements[i];
    if (ele?.tagName === "INPUT" && ele.id) {
      if (ele.id === "amount") {
        options[ele.id] = ele.value * 100;
      } else options[ele.id] = ele.value;
    }
  }

  localStorage.setItem("rzp-checkout-form", JSON.stringify(options));

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: EVENT_TYPES.SET_OPTIONS,
        from: "popup",
        options: unflattenObject(options),
      });
      window.close();
    }
  );
});

document.getElementById("page-picker-btn").addEventListener("click", (ev) => {
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
});

document.getElementById("merchant-mode").addEventListener("change", (ev) => {
  const merchantKeyElement = document.getElementById("key");
  if (ev.target.value === "live") {
    merchantKeyElement.value = "rzp_live_fQOafVJoJqscJ6";
  } else {
    merchantKeyElement.value = "rzp_test_rLRCKMrfIRVgEg";
  }
});

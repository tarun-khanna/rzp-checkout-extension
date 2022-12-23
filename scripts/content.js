import { EVENT_TYPES } from "../constants";
import {
  copyTextToClipboard,
  generateQuerySelector,
  querySelectorFallback,
  showToast,
} from "./utils";

let options = {};
let enableInspector = false;

function handleClick(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  delete options.selector;

  const rzp = new Razorpay(options);
  rzp.open();
}

chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === "popup") {
    switch (msg.type) {
      case EVENT_TYPES.SET_OPTIONS:
        handleOptionsListener(msg);
        break;

      case EVENT_TYPES.TOGGLE_INSPECTOR:
        handleInspector(msg);

      default:
        break;
    }
  }
});

function handleOptionsListener(msg) {
  if (options.selector) {
    document
      .querySelector(options.selector)
      .removeEventListener("click", handleClick);
  }

  options = msg.options;
  document
    .querySelector(msg.options.selector)
    .addEventListener("click", handleClick);
}

function handleInspector(msg) {
  enableInspector = msg.enableInspector;
  const allElements = document.querySelectorAll("*");
  if (enableInspector) {
    // for (const ele of allElements) {
    //   ele.setAttribute(
    //     "style",
    //     "cursor: crosshair !important; pointer-events: none !important;"
    //   );
    // }
  } else {
    // for (const ele of allElements) {
    //   ele.removeAttribute("style");
    // }
  }
}

document.addEventListener(
  "click",
  (ev) => {
    if (enableInspector) {
      ev.stopPropagation();
      ev.preventDefault();

      let btnSelector = generateQuerySelector(ev.target);
      if (!document.querySelector(btnSelector)) {
        btnSelector = querySelectorFallback(ev.target);
      }
      copyTextToClipboard(btnSelector, () => {
        showToast("Copied !");
      });
      enableInspector = false;
    }
  },
  { capture: true }
);

import { EVENT_TYPES } from "../constants";
import {
  generateQuerySelector,
  querySelectorFallback,
  showModal,
  showToast,
} from "./utils";

let options = {};
let enableInspector = false;

/**
 * responsible for creating razorpay instance and opening checkout
 * @param {ClickEvent} ev
 */
function handleClick(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  delete options.selector;

  options.handler = (response) => {
    showModal({ state: "success", ...response });
  };
  const rzp = new Razorpay(options);

  // rzp.on("payment.failed", function (error) {
  //   showModal({ state: "fail", ...error });
  // });

  // rzp.on("payment.error", function (data) {
  //   showModal({ state: "fail", ...data });
  // });
  rzp.open();
}

/**
 * recieve data from popup script
 */
chrome.runtime.onMessage.addListener((msg, sender, response) => {
  if (msg.from === "popup") {
    switch (msg.type) {
      case EVENT_TYPES.SET_OPTIONS:
        showToast({ text: "Saved !" });
        removeAndAddListener(options.selector, msg.options.selector);
        options = msg.options;
        break;

      case EVENT_TYPES.TOGGLE_INSPECTOR:
        handleInspector(msg);
        options = msg.options;
      default:
        break;
    }
  }
});

/**
 * removes click listener to first param and adds listener to second param
 * @param {string} selectorToRemove
 * @param {string} selectorToAdd
 */
function removeAndAddListener(selectorToRemove, selectorToAdd) {
  if (document.querySelector(selectorToRemove)) {
    document
      .querySelector(selectorToRemove)
      .removeEventListener("click", handleClick);
  }

  document.querySelector(selectorToAdd).addEventListener("click", handleClick);
}

/**
 * Handles "pick from page" action from popup
 * @param {Object} msg
 */
function handleInspector(msg) {
  enableInspector = msg.enableInspector;
  /*
   to have a crosshair cursor for all elements
   disabled currently as it has issues
  */
  // const allElements = document.querySelectorAll("*");
  // if (enableInspector) {
  //   for (const ele of allElements) {
  //     ele.setAttribute(
  //       "style",
  //       "cursor: crosshair !important; pointer-events: none !important;"
  //     );
  //   }
  // } else {
  //   for (const ele of allElements) {
  //     ele.removeAttribute("style");
  //   }
  // }
}

/**
 * click listener for body
 * - used to get the selector value from clicked element (pick from page)
 * @param {ClickEvent} ev
 */
function handleDomClick(ev) {
  if (enableInspector) {
    ev.stopPropagation();
    ev.preventDefault();

    const btnSelector = querySelectorFallback(ev.target);

    showToast({ text: "Checkout linked !" });

    removeAndAddListener(options.selector, btnSelector);

    chrome.storage.local.set({ checkoutSelector: btnSelector });
    enableInspector = false;
  }
}

document.addEventListener(
  "click",
  (ev) => {
    handleDomClick(ev);
  },
  { capture: true }
);

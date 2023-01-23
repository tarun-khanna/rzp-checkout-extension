import { EVENT_TYPES } from "../constants";

let amount = "";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.from === "content") {
    switch (message.type) {
      case EVENT_TYPES.SET_AMOUNT: {
        amount = message.value;
        break;
      }
    }
  } else if (message.from === "popup") {
    switch (message.type) {
      case EVENT_TYPES.GET_AMOUNT: {
        sendResponse(amount);
        break;
      }
    }
  }
});

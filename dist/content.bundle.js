/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EVENT_TYPES": () => (/* binding */ EVENT_TYPES)
/* harmony export */ });
var EVENT_TYPES = {
  SET_OPTIONS: "SET_OPTIONS",
  TOGGLE_INSPECTOR: "TOGGLE_INSPECTOR"
};

/***/ }),

/***/ "./scripts/utils.js":
/*!**************************!*\
  !*** ./scripts/utils.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "copyTextToClipboard": () => (/* binding */ copyTextToClipboard),
/* harmony export */   "generateQuerySelector": () => (/* binding */ generateQuerySelector),
/* harmony export */   "getModalStyles": () => (/* binding */ getModalStyles),
/* harmony export */   "getToastStyles": () => (/* binding */ getToastStyles),
/* harmony export */   "querySelectorFallback": () => (/* binding */ querySelectorFallback),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "showToast": () => (/* binding */ showToast)
/* harmony export */ });
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }
  document.body.removeChild(textArea);
}
function copyTextToClipboard(text, cb) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(cb, function (err) {
    cb(err);
  });
}
var generateQuerySelector = function generateQuerySelector(el) {
  if (el.tagName.toLowerCase() == "html") return "HTML";
  var str = el.tagName;
  str += el.id != "" ? "#" + el.id : "";
  if (el.className) {
    var classes = el.className.split(/\s/);
    for (var i = 0; i < classes.length; i++) {
      str += "." + classes[i];
    }
  }
  return generateQuerySelector(el.parentNode) + " > " + str;
};
function querySelectorFallback(context) {
  var index, pathSelector, localName;
  if (context == "null") throw "not an dom reference";
  // call getIndex function
  index = getIndex(context);
  while (context.tagName) {
    // selector path
    pathSelector = context.localName + (pathSelector ? ">" + pathSelector : "");
    context = context.parentNode;
  }
  // selector path for nth of type
  pathSelector = pathSelector + ":nth-of-type(".concat(index, ")");
  return pathSelector;
}

// get index for nth of type element
function getIndex(node) {
  var i = 1;
  var tagName = node.tagName;
  while (node.previousSibling) {
    node = node.previousSibling;
    if (node.nodeType === 1 && tagName.toLowerCase() == node.tagName.toLowerCase()) {
      i++;
    }
  }
  return i;
}
function getToastStyles() {
  return "\n  #toast  {\n    visibility: hidden;\n    min-width: 250px;\n    background-color: #0400ff;\n    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;\n    color: white;\n    text-align: center;\n    border-radius: 10px;\n    padding: 16px;\n    position: fixed;\n    z-index: 10000;\n    left: 50%;\n    transform: translateX(-50%);\n    bottom: 30px;\n    font-size: 16px;\n  }\n  \n  #toast.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n  }\n  \n  @-webkit-keyframes fadein {\n    from {bottom: 0; opacity: 0;} \n    to {bottom: 30px; opacity: 1;}\n  }\n  \n  @keyframes fadein {\n    from {bottom: 0; opacity: 0;}\n    to {bottom: 30px; opacity: 1;}\n  }\n  \n  @-webkit-keyframes fadeout {\n    from {bottom: 30px; opacity: 1;} \n    to {bottom: 0; opacity: 0;}\n  }\n  \n  @keyframes fadeout {\n    from {bottom: 30px; opacity: 1;}\n    to {bottom: 0; opacity: 0;}\n  }\n  ";
}
function getModalStyles() {
  return "\n  #modal {\n    visibility: hidden;\n    min-width: 250px;\n    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;\n    background-color: #fff;\n    text-align: center;\n    border-radius: 10px;\n    padding: 16px;\n    position: fixed;\n    z-index: 10000;\n    left: 50%;\n    top: 50%;\n    transform: translateX(-50%) translateY(-50%);\n    font-size: 16px;\n  }\n\n  #modal h2 {\n    margin-bottom: 20px;\n  }\n\n  #modal.success {\n    border-top: 8px solid #6ECD28;\n  }\n\n  #modal.fail {\n    border-top: 8px solid #CD2828;\n  }\n\n  .close-btn {\n    border-radius: 25px;\n    width: 25px;\n    height: 25px;\n    border: none;\n    position: absolute;\n    top: 4px;\n    right: 4px;\n    cursor: pointer;\n  }\n\n  #modal .content {\n    min-height: 100px;\n    min-width: 300px;\n  }\n  \n  #modal.show {\n    visibility: visible;\n    -webkit-animation: fadein 0.5s;\n    animation: fadein 0.5s;\n  }\n  \n  @-webkit-keyframes fadein {\n    from {transform: translateX(-50%) translateY(0%); opacity: 0;} \n    to {transform: translateX(-50%) translateY(-50%); opacity: 1;}\n  }\n  \n  @keyframes fadein {\n    from {transform: translateX(-50%) translateY(0%); opacity: 0;}\n    to {transform: translateX(-50%) translateY(-50%); opacity: 1;}\n  }\n\n  #modal.hide {\n    visibility: hidden;\n  }\n\n  ";
}
var styleSheet = document.createElement("style");
styleSheet.innerText = "".concat(getToastStyles(), " ").concat(getModalStyles());
document.head.appendChild(styleSheet);
var toast = document.createElement("div");
toast.setAttribute("id", "toast");
toast.textContent = "Copied !";
document.body.appendChild(toast);
function showToast(_ref) {
  var text = _ref.text,
    time = _ref.time;
  toast.textContent = text;
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, time);
}
var modal = document.createElement("div");
modal.setAttribute("id", "modal");
document.body.appendChild(modal);
var getModalContent = function getModalContent(data) {
  return "\n  <div class=\"content\">\n    <h2>".concat(data.state === "success" ? "Success !" : "Fail", "</h2>\n    <em>Payment ID: ").concat(data.razorpay_payment_id, "</em>\n    <button class=\"close-btn\">X</button>\n  </div>\n  ");
};
function showModal(data) {
  var x = document.getElementById("modal");
  x.innerHTML = getModalContent(data);
  x.classList.remove("hide");
  if (data.state === "success") {
    x.classList.add("show", "success");
  } else {
    x.classList.add("show", "fail");
  }
  document.querySelector("#modal .close-btn").addEventListener("click", function () {
    var x = document.getElementById("modal");
    x.className = "hide";
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./scripts/content.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./scripts/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


var options = {};
var enableInspector = false;

/**
 * responsible for creating razorpay instance and opening checkout
 * @param {ClickEvent} ev
 */
function handleClick(ev) {
  ev.stopPropagation();
  ev.preventDefault();
  delete options.selector;
  options.handler = function (response) {
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.showModal)(_objectSpread({
      state: "success"
    }, response));
  };
  var rzp = new Razorpay(options);

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
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if (msg.from === "popup") {
    switch (msg.type) {
      case _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPES.SET_OPTIONS:
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.showToast)({
          text: "Saved !"
        });
        removeAndAddListener(options.selector, msg.options.selector);
        options = msg.options;
        break;
      case _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPES.TOGGLE_INSPECTOR:
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
    document.querySelector(selectorToRemove).removeEventListener("click", handleClick);
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
    var btnSelector = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelectorFallback)(ev.target);
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.showToast)({
      text: "Checkout linked !"
    });
    removeAndAddListener(options.selector, btnSelector);
    chrome.storage.local.set({
      checkoutSelector: btnSelector
    });
    enableInspector = false;
  }
}
document.addEventListener("click", function (ev) {
  handleDomClick(ev);
}, {
  capture: true
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dHMuanMiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi8uL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vLi9zY3JpcHRzL2NvbnRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEVWRU5UX1RZUEVTID0ge1xuICBTRVRfT1BUSU9OUzogXCJTRVRfT1BUSU9OU1wiLFxuICBUT0dHTEVfSU5TUEVDVE9SOiBcIlRPR0dMRV9JTlNQRUNUT1JcIixcbn07XG4iLCJmdW5jdGlvbiBmYWxsYmFja0NvcHlUZXh0VG9DbGlwYm9hcmQodGV4dCkge1xuICBjb25zdCB0ZXh0QXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKTtcbiAgdGV4dEFyZWEudmFsdWUgPSB0ZXh0O1xuXG4gIC8vIEF2b2lkIHNjcm9sbGluZyB0byBib3R0b21cbiAgdGV4dEFyZWEuc3R5bGUudG9wID0gXCIwXCI7XG4gIHRleHRBcmVhLnN0eWxlLmxlZnQgPSBcIjBcIjtcbiAgdGV4dEFyZWEuc3R5bGUucG9zaXRpb24gPSBcImZpeGVkXCI7XG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0ZXh0QXJlYSk7XG4gIHRleHRBcmVhLmZvY3VzKCk7XG4gIHRleHRBcmVhLnNlbGVjdCgpO1xuXG4gIHRyeSB7XG4gICAgY29uc3Qgc3VjY2Vzc2Z1bCA9IGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiY29weVwiKTtcbiAgICBjb25zdCBtc2cgPSBzdWNjZXNzZnVsID8gXCJzdWNjZXNzZnVsXCIgOiBcInVuc3VjY2Vzc2Z1bFwiO1xuICAgIGNvbnNvbGUubG9nKFwiRmFsbGJhY2s6IENvcHlpbmcgdGV4dCBjb21tYW5kIHdhcyBcIiArIG1zZyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGYWxsYmFjazogT29wcywgdW5hYmxlIHRvIGNvcHlcIiwgZXJyKTtcbiAgfVxuXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGV4dEFyZWEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVRleHRUb0NsaXBib2FyZCh0ZXh0LCBjYikge1xuICBpZiAoIW5hdmlnYXRvci5jbGlwYm9hcmQpIHtcbiAgICBmYWxsYmFja0NvcHlUZXh0VG9DbGlwYm9hcmQodGV4dCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpLnRoZW4oY2IsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjYihlcnIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlUXVlcnlTZWxlY3RvciA9IGZ1bmN0aW9uIChlbCkge1xuICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IFwiaHRtbFwiKSByZXR1cm4gXCJIVE1MXCI7XG4gIGxldCBzdHIgPSBlbC50YWdOYW1lO1xuICBzdHIgKz0gZWwuaWQgIT0gXCJcIiA/IFwiI1wiICsgZWwuaWQgOiBcIlwiO1xuICBpZiAoZWwuY2xhc3NOYW1lKSB7XG4gICAgbGV0IGNsYXNzZXMgPSBlbC5jbGFzc05hbWUuc3BsaXQoL1xccy8pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyICs9IFwiLlwiICsgY2xhc3Nlc1tpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdlbmVyYXRlUXVlcnlTZWxlY3RvcihlbC5wYXJlbnROb2RlKSArIFwiID4gXCIgKyBzdHI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvckZhbGxiYWNrKGNvbnRleHQpIHtcbiAgbGV0IGluZGV4LCBwYXRoU2VsZWN0b3IsIGxvY2FsTmFtZTtcblxuICBpZiAoY29udGV4dCA9PSBcIm51bGxcIikgdGhyb3cgXCJub3QgYW4gZG9tIHJlZmVyZW5jZVwiO1xuICAvLyBjYWxsIGdldEluZGV4IGZ1bmN0aW9uXG4gIGluZGV4ID0gZ2V0SW5kZXgoY29udGV4dCk7XG5cbiAgd2hpbGUgKGNvbnRleHQudGFnTmFtZSkge1xuICAgIC8vIHNlbGVjdG9yIHBhdGhcbiAgICBwYXRoU2VsZWN0b3IgPSBjb250ZXh0LmxvY2FsTmFtZSArIChwYXRoU2VsZWN0b3IgPyBcIj5cIiArIHBhdGhTZWxlY3RvciA6IFwiXCIpO1xuICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG4gIH1cbiAgLy8gc2VsZWN0b3IgcGF0aCBmb3IgbnRoIG9mIHR5cGVcbiAgcGF0aFNlbGVjdG9yID0gcGF0aFNlbGVjdG9yICsgYDpudGgtb2YtdHlwZSgke2luZGV4fSlgO1xuICByZXR1cm4gcGF0aFNlbGVjdG9yO1xufVxuXG4vLyBnZXQgaW5kZXggZm9yIG50aCBvZiB0eXBlIGVsZW1lbnRcbmZ1bmN0aW9uIGdldEluZGV4KG5vZGUpIHtcbiAgbGV0IGkgPSAxO1xuICBsZXQgdGFnTmFtZSA9IG5vZGUudGFnTmFtZTtcblxuICB3aGlsZSAobm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICBub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgaWYgKFxuICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgKSB7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9hc3RTdHlsZXMoKSB7XG4gIHJldHVybiBgXG4gICN0b2FzdCAge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBtaW4td2lkdGg6IDI1MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNDAwZmY7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwcHggM3B4IDhweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICBib3R0b206IDMwcHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG4gIFxuICAjdG9hc3Quc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzO1xuICAgIGFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzO1xuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fSBcbiAgICB0byB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlaW4ge1xuICAgIGZyb20ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9XG4gICAgdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9XG4gIH1cbiAgXG4gIEAtd2Via2l0LWtleWZyYW1lcyBmYWRlb3V0IHtcbiAgICBmcm9tIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fSBcbiAgICB0byB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlb3V0IHtcbiAgICBmcm9tIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fVxuICAgIHRvIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fVxuICB9XG4gIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RhbFN0eWxlcygpIHtcbiAgcmV0dXJuIGBcbiAgI21vZGFsIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWluLXdpZHRoOiAyNTBweDtcbiAgICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMjQpIDBweCAzcHggOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gICNtb2RhbCBoMiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gICNtb2RhbC5zdWNjZXNzIHtcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgIzZFQ0QyODtcbiAgfVxuXG4gICNtb2RhbC5mYWlsIHtcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgI0NEMjgyODtcbiAgfVxuXG4gIC5jbG9zZS1idG4ge1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0cHg7XG4gICAgcmlnaHQ6IDRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAjbW9kYWwgLmNvbnRlbnQge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICAgIG1pbi13aWR0aDogMzAwcHg7XG4gIH1cbiAgXG4gICNtb2RhbC5zaG93IHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlaW4gMC41cztcbiAgICBhbmltYXRpb246IGZhZGVpbiAwLjVzO1xuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgwJSk7IG9wYWNpdHk6IDA7fSBcbiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7IG9wYWNpdHk6IDE7fVxuICB9XG4gIFxuICBAa2V5ZnJhbWVzIGZhZGVpbiB7XG4gICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoMCUpOyBvcGFjaXR5OiAwO31cbiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7IG9wYWNpdHk6IDE7fVxuICB9XG5cbiAgI21vZGFsLmhpZGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxuXG4gIGA7XG59XG5cbmNvbnN0IHN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5zdHlsZVNoZWV0LmlubmVyVGV4dCA9IGAke2dldFRvYXN0U3R5bGVzKCl9ICR7Z2V0TW9kYWxTdHlsZXMoKX1gO1xuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcblxuY29uc3QgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xudG9hc3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2FzdFwiKTtcbnRvYXN0LnRleHRDb250ZW50ID0gXCJDb3BpZWQgIVwiO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2FzdCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93VG9hc3QoeyB0ZXh0LCB0aW1lIH0pIHtcbiAgdG9hc3QudGV4dENvbnRlbnQgPSB0ZXh0O1xuICBjb25zdCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2FzdFwiKTtcbiAgeC5jbGFzc05hbWUgPSBcInNob3dcIjtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgeC5jbGFzc05hbWUgPSB4LmNsYXNzTmFtZS5yZXBsYWNlKFwic2hvd1wiLCBcIlwiKTtcbiAgfSwgdGltZSk7XG59XG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbm1vZGFsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9kYWxcIik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcblxuY29uc3QgZ2V0TW9kYWxDb250ZW50ID0gKGRhdGEpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICA8aDI+JHtkYXRhLnN0YXRlID09PSBcInN1Y2Nlc3NcIiA/IFwiU3VjY2VzcyAhXCIgOiBcIkZhaWxcIn08L2gyPlxuICAgIDxlbT5QYXltZW50IElEOiAke2RhdGEucmF6b3JwYXlfcGF5bWVudF9pZH08L2VtPlxuICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZS1idG5cIj5YPC9idXR0b24+XG4gIDwvZGl2PlxuICBgO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNb2RhbChkYXRhKSB7XG4gIGNvbnN0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsXCIpO1xuICB4LmlubmVySFRNTCA9IGdldE1vZGFsQ29udGVudChkYXRhKTtcbiAgeC5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZVwiKTtcbiAgaWYgKGRhdGEuc3RhdGUgPT09IFwic3VjY2Vzc1wiKSB7XG4gICAgeC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiLCBcInN1Y2Nlc3NcIik7XG4gIH0gZWxzZSB7XG4gICAgeC5jbGFzc0xpc3QuYWRkKFwic2hvd1wiLCBcImZhaWxcIik7XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsIC5jbG9zZS1idG5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBjb25zdCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgICB4LmNsYXNzTmFtZSA9IFwiaGlkZVwiO1xuICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgRVZFTlRfVFlQRVMgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQge1xuICBjb3B5VGV4dFRvQ2xpcGJvYXJkLFxuICBnZW5lcmF0ZVF1ZXJ5U2VsZWN0b3IsXG4gIHF1ZXJ5U2VsZWN0b3JGYWxsYmFjayxcbiAgc2hvd01vZGFsLFxuICBzaG93VG9hc3QsXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cbmxldCBvcHRpb25zID0ge307XG5sZXQgZW5hYmxlSW5zcGVjdG9yID0gZmFsc2U7XG5cbi8qKlxuICogcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHJhem9ycGF5IGluc3RhbmNlIGFuZCBvcGVuaW5nIGNoZWNrb3V0XG4gKiBAcGFyYW0ge0NsaWNrRXZlbnR9IGV2XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2KSB7XG4gIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICBkZWxldGUgb3B0aW9ucy5zZWxlY3RvcjtcblxuICBvcHRpb25zLmhhbmRsZXIgPSAocmVzcG9uc2UpID0+IHtcbiAgICBzaG93TW9kYWwoeyBzdGF0ZTogXCJzdWNjZXNzXCIsIC4uLnJlc3BvbnNlIH0pO1xuICB9O1xuICBjb25zdCByenAgPSBuZXcgUmF6b3JwYXkob3B0aW9ucyk7XG5cbiAgLy8gcnpwLm9uKFwicGF5bWVudC5mYWlsZWRcIiwgZnVuY3Rpb24gKGVycm9yKSB7XG4gIC8vICAgc2hvd01vZGFsKHsgc3RhdGU6IFwiZmFpbFwiLCAuLi5lcnJvciB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gcnpwLm9uKFwicGF5bWVudC5lcnJvclwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAvLyAgIHNob3dNb2RhbCh7IHN0YXRlOiBcImZhaWxcIiwgLi4uZGF0YSB9KTtcbiAgLy8gfSk7XG4gIHJ6cC5vcGVuKCk7XG59XG5cbi8qKlxuICogcmVjaWV2ZSBkYXRhIGZyb20gcG9wdXAgc2NyaXB0XG4gKi9cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnLCBzZW5kZXIsIHJlc3BvbnNlKSA9PiB7XG4gIGlmIChtc2cuZnJvbSA9PT0gXCJwb3B1cFwiKSB7XG4gICAgc3dpdGNoIChtc2cudHlwZSkge1xuICAgICAgY2FzZSBFVkVOVF9UWVBFUy5TRVRfT1BUSU9OUzpcbiAgICAgICAgc2hvd1RvYXN0KHsgdGV4dDogXCJTYXZlZCAhXCIgfSk7XG4gICAgICAgIHJlbW92ZUFuZEFkZExpc3RlbmVyKG9wdGlvbnMuc2VsZWN0b3IsIG1zZy5vcHRpb25zLnNlbGVjdG9yKTtcbiAgICAgICAgb3B0aW9ucyA9IG1zZy5vcHRpb25zO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFVkVOVF9UWVBFUy5UT0dHTEVfSU5TUEVDVE9SOlxuICAgICAgICBoYW5kbGVJbnNwZWN0b3IobXNnKTtcbiAgICAgICAgb3B0aW9ucyA9IG1zZy5vcHRpb25zO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiByZW1vdmVzIGNsaWNrIGxpc3RlbmVyIHRvIGZpcnN0IHBhcmFtIGFuZCBhZGRzIGxpc3RlbmVyIHRvIHNlY29uZCBwYXJhbVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yVG9SZW1vdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclRvQWRkXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUFuZEFkZExpc3RlbmVyKHNlbGVjdG9yVG9SZW1vdmUsIHNlbGVjdG9yVG9BZGQpIHtcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JUb1JlbW92ZSkpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JUb1JlbW92ZSlcbiAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spO1xuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvclRvQWRkKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spO1xufVxuXG4vKipcbiAqIEhhbmRsZXMgXCJwaWNrIGZyb20gcGFnZVwiIGFjdGlvbiBmcm9tIHBvcHVwXG4gKiBAcGFyYW0ge09iamVjdH0gbXNnXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUluc3BlY3Rvcihtc2cpIHtcbiAgZW5hYmxlSW5zcGVjdG9yID0gbXNnLmVuYWJsZUluc3BlY3RvcjtcbiAgLypcbiAgIHRvIGhhdmUgYSBjcm9zc2hhaXIgY3Vyc29yIGZvciBhbGwgZWxlbWVudHNcbiAgIGRpc2FibGVkIGN1cnJlbnRseSBhcyBpdCBoYXMgaXNzdWVzXG4gICovXG4gIC8vIGNvbnN0IGFsbEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipcIik7XG4gIC8vIGlmIChlbmFibGVJbnNwZWN0b3IpIHtcbiAgLy8gICBmb3IgKGNvbnN0IGVsZSBvZiBhbGxFbGVtZW50cykge1xuICAvLyAgICAgZWxlLnNldEF0dHJpYnV0ZShcbiAgLy8gICAgICAgXCJzdHlsZVwiLFxuICAvLyAgICAgICBcImN1cnNvcjogY3Jvc3NoYWlyICFpbXBvcnRhbnQ7IHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7XCJcbiAgLy8gICAgICk7XG4gIC8vICAgfVxuICAvLyB9IGVsc2Uge1xuICAvLyAgIGZvciAoY29uc3QgZWxlIG9mIGFsbEVsZW1lbnRzKSB7XG4gIC8vICAgICBlbGUucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gIC8vICAgfVxuICAvLyB9XG59XG5cbi8qKlxuICogY2xpY2sgbGlzdGVuZXIgZm9yIGJvZHlcbiAqIC0gdXNlZCB0byBnZXQgdGhlIHNlbGVjdG9yIHZhbHVlIGZyb20gY2xpY2tlZCBlbGVtZW50IChwaWNrIGZyb20gcGFnZSlcbiAqIEBwYXJhbSB7Q2xpY2tFdmVudH0gZXZcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRG9tQ2xpY2soZXYpIHtcbiAgaWYgKGVuYWJsZUluc3BlY3Rvcikge1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBidG5TZWxlY3RvciA9IHF1ZXJ5U2VsZWN0b3JGYWxsYmFjayhldi50YXJnZXQpO1xuXG4gICAgc2hvd1RvYXN0KHsgdGV4dDogXCJDaGVja291dCBsaW5rZWQgIVwiIH0pO1xuXG4gICAgcmVtb3ZlQW5kQWRkTGlzdGVuZXIob3B0aW9ucy5zZWxlY3RvciwgYnRuU2VsZWN0b3IpO1xuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgY2hlY2tvdXRTZWxlY3RvcjogYnRuU2VsZWN0b3IgfSk7XG4gICAgZW5hYmxlSW5zcGVjdG9yID0gZmFsc2U7XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJjbGlja1wiLFxuICAoZXYpID0+IHtcbiAgICBoYW5kbGVEb21DbGljayhldik7XG4gIH0sXG4gIHsgY2FwdHVyZTogdHJ1ZSB9XG4pO1xuIl0sIm5hbWVzIjpbIkVWRU5UX1RZUEVTIiwiU0VUX09QVElPTlMiLCJUT0dHTEVfSU5TUEVDVE9SIiwiZmFsbGJhY2tDb3B5VGV4dFRvQ2xpcGJvYXJkIiwidGV4dCIsInRleHRBcmVhIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwidmFsdWUiLCJzdHlsZSIsInRvcCIsImxlZnQiLCJwb3NpdGlvbiIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImZvY3VzIiwic2VsZWN0Iiwic3VjY2Vzc2Z1bCIsImV4ZWNDb21tYW5kIiwibXNnIiwiY29uc29sZSIsImxvZyIsImVyciIsImVycm9yIiwicmVtb3ZlQ2hpbGQiLCJjb3B5VGV4dFRvQ2xpcGJvYXJkIiwiY2IiLCJuYXZpZ2F0b3IiLCJjbGlwYm9hcmQiLCJ3cml0ZVRleHQiLCJ0aGVuIiwiZ2VuZXJhdGVRdWVyeVNlbGVjdG9yIiwiZWwiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJzdHIiLCJpZCIsImNsYXNzTmFtZSIsImNsYXNzZXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJwYXJlbnROb2RlIiwicXVlcnlTZWxlY3RvckZhbGxiYWNrIiwiY29udGV4dCIsImluZGV4IiwicGF0aFNlbGVjdG9yIiwibG9jYWxOYW1lIiwiZ2V0SW5kZXgiLCJub2RlIiwicHJldmlvdXNTaWJsaW5nIiwibm9kZVR5cGUiLCJnZXRUb2FzdFN0eWxlcyIsImdldE1vZGFsU3R5bGVzIiwic3R5bGVTaGVldCIsImlubmVyVGV4dCIsImhlYWQiLCJ0b2FzdCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50Iiwic2hvd1RvYXN0IiwidGltZSIsIngiLCJnZXRFbGVtZW50QnlJZCIsInNldFRpbWVvdXQiLCJyZXBsYWNlIiwibW9kYWwiLCJnZXRNb2RhbENvbnRlbnQiLCJkYXRhIiwic3RhdGUiLCJyYXpvcnBheV9wYXltZW50X2lkIiwic2hvd01vZGFsIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcHRpb25zIiwiZW5hYmxlSW5zcGVjdG9yIiwiaGFuZGxlQ2xpY2siLCJldiIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0Iiwic2VsZWN0b3IiLCJoYW5kbGVyIiwicmVzcG9uc2UiLCJyenAiLCJSYXpvcnBheSIsIm9wZW4iLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJzZW5kZXIiLCJmcm9tIiwidHlwZSIsInJlbW92ZUFuZEFkZExpc3RlbmVyIiwiaGFuZGxlSW5zcGVjdG9yIiwic2VsZWN0b3JUb1JlbW92ZSIsInNlbGVjdG9yVG9BZGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlRG9tQ2xpY2siLCJidG5TZWxlY3RvciIsInRhcmdldCIsInN0b3JhZ2UiLCJsb2NhbCIsInNldCIsImNoZWNrb3V0U2VsZWN0b3IiLCJjYXB0dXJlIl0sInNvdXJjZVJvb3QiOiIifQ==
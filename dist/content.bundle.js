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
    _ref$time = _ref.time,
    time = _ref$time === void 0 ? 3000 : _ref$time;
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
  if (selectorToRemove && document.querySelector(selectorToRemove)) {
    document.querySelector(selectorToRemove).removeEventListener("click", handleClick);
  }
  if (selectorToAdd && document.querySelector(selectorToAdd)) {
    document.querySelector(selectorToAdd).addEventListener("click", handleClick);
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUd0RCxHQUFHLENBQUNzRCxlQUFlO0VBQ3JDO0FBQ0Y7QUFDQTtBQUNBO0VBQ0U7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBU3VCLGNBQWMsQ0FBQ3JCLEVBQUUsRUFBRTtFQUMxQixJQUFJRixlQUFlLEVBQUU7SUFDbkJFLEVBQUUsQ0FBQ0MsZUFBZSxFQUFFO0lBQ3BCRCxFQUFFLENBQUNFLGNBQWMsRUFBRTtJQUVuQixJQUFNb0IsV0FBVyxHQUFHNUQsNkRBQXFCLENBQUNzQyxFQUFFLENBQUN1QixNQUFNLENBQUM7SUFFcEQ1QyxpREFBUyxDQUFDO01BQUVsRCxJQUFJLEVBQUU7SUFBb0IsQ0FBQyxDQUFDO0lBRXhDdUYsb0JBQW9CLENBQUNuQixPQUFPLENBQUNNLFFBQVEsRUFBRW1CLFdBQVcsQ0FBQztJQUVuRGIsTUFBTSxDQUFDZSxPQUFPLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDO01BQUVDLGdCQUFnQixFQUFFTDtJQUFZLENBQUMsQ0FBQztJQUMzRHhCLGVBQWUsR0FBRyxLQUFLO0VBQ3pCO0FBQ0Y7QUFFQW5FLFFBQVEsQ0FBQ2lFLGdCQUFnQixDQUN2QixPQUFPLEVBQ1AsVUFBQ0ksRUFBRSxFQUFLO0VBQ05xQixjQUFjLENBQUNyQixFQUFFLENBQUM7QUFDcEIsQ0FBQyxFQUNEO0VBQUU0QixPQUFPLEVBQUU7QUFBSyxDQUFDLENBQ2xCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uLy4vY29uc3RhbnRzLmpzIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vLi9zY3JpcHRzL3V0aWxzLmpzIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uLy4vc2NyaXB0cy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBFVkVOVF9UWVBFUyA9IHtcbiAgU0VUX09QVElPTlM6IFwiU0VUX09QVElPTlNcIixcbiAgVE9HR0xFX0lOU1BFQ1RPUjogXCJUT0dHTEVfSU5TUEVDVE9SXCIsXG59O1xuIiwiZnVuY3Rpb24gZmFsbGJhY2tDb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHQpIHtcbiAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gIHRleHRBcmVhLnZhbHVlID0gdGV4dDtcblxuICAvLyBBdm9pZCBzY3JvbGxpbmcgdG8gYm90dG9tXG4gIHRleHRBcmVhLnN0eWxlLnRvcCA9IFwiMFwiO1xuICB0ZXh0QXJlYS5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gIHRleHRBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICB0ZXh0QXJlYS5mb2N1cygpO1xuICB0ZXh0QXJlYS5zZWxlY3QoKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG4gICAgY29uc3QgbXNnID0gc3VjY2Vzc2Z1bCA/IFwic3VjY2Vzc2Z1bFwiIDogXCJ1bnN1Y2Nlc3NmdWxcIjtcbiAgICBjb25zb2xlLmxvZyhcIkZhbGxiYWNrOiBDb3B5aW5nIHRleHQgY29tbWFuZCB3YXMgXCIgKyBtc2cpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2s6IE9vcHMsIHVuYWJsZSB0byBjb3B5XCIsIGVycik7XG4gIH1cblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRBcmVhKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlUXVlcnlTZWxlY3RvciA9IGZ1bmN0aW9uIChlbCkge1xuICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IFwiaHRtbFwiKSByZXR1cm4gXCJIVE1MXCI7XG4gIGxldCBzdHIgPSBlbC50YWdOYW1lO1xuICBzdHIgKz0gZWwuaWQgIT0gXCJcIiA/IFwiI1wiICsgZWwuaWQgOiBcIlwiO1xuICBpZiAoZWwuY2xhc3NOYW1lKSB7XG4gICAgbGV0IGNsYXNzZXMgPSBlbC5jbGFzc05hbWUuc3BsaXQoL1xccy8pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyICs9IFwiLlwiICsgY2xhc3Nlc1tpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdlbmVyYXRlUXVlcnlTZWxlY3RvcihlbC5wYXJlbnROb2RlKSArIFwiID4gXCIgKyBzdHI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvckZhbGxiYWNrKGNvbnRleHQpIHtcbiAgbGV0IGluZGV4LCBwYXRoU2VsZWN0b3IsIGxvY2FsTmFtZTtcblxuICBpZiAoY29udGV4dCA9PSBcIm51bGxcIikgdGhyb3cgXCJub3QgYW4gZG9tIHJlZmVyZW5jZVwiO1xuICAvLyBjYWxsIGdldEluZGV4IGZ1bmN0aW9uXG4gIGluZGV4ID0gZ2V0SW5kZXgoY29udGV4dCk7XG5cbiAgd2hpbGUgKGNvbnRleHQudGFnTmFtZSkge1xuICAgIC8vIHNlbGVjdG9yIHBhdGhcbiAgICBwYXRoU2VsZWN0b3IgPSBjb250ZXh0LmxvY2FsTmFtZSArIChwYXRoU2VsZWN0b3IgPyBcIj5cIiArIHBhdGhTZWxlY3RvciA6IFwiXCIpO1xuICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG4gIH1cbiAgLy8gc2VsZWN0b3IgcGF0aCBmb3IgbnRoIG9mIHR5cGVcbiAgcGF0aFNlbGVjdG9yID0gcGF0aFNlbGVjdG9yICsgYDpudGgtb2YtdHlwZSgke2luZGV4fSlgO1xuICByZXR1cm4gcGF0aFNlbGVjdG9yO1xufVxuXG4vLyBnZXQgaW5kZXggZm9yIG50aCBvZiB0eXBlIGVsZW1lbnRcbmZ1bmN0aW9uIGdldEluZGV4KG5vZGUpIHtcbiAgbGV0IGkgPSAxO1xuICBsZXQgdGFnTmFtZSA9IG5vZGUudGFnTmFtZTtcblxuICB3aGlsZSAobm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICBub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgaWYgKFxuICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgKSB7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9hc3RTdHlsZXMoKSB7XG4gIHJldHVybiBgXG4gICN0b2FzdCAge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBtaW4td2lkdGg6IDI1MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNDAwZmY7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwcHggM3B4IDhweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICBib3R0b206IDMwcHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG4gIFxuICAjdG9hc3Quc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzO1xuICAgIGFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzO1xuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fSBcbiAgICB0byB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlaW4ge1xuICAgIGZyb20ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9XG4gICAgdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9XG4gIH1cbiAgXG4gIEAtd2Via2l0LWtleWZyYW1lcyBmYWRlb3V0IHtcbiAgICBmcm9tIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fSBcbiAgICB0byB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlb3V0IHtcbiAgICBmcm9tIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fVxuICAgIHRvIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fVxuICB9XG4gIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RhbFN0eWxlcygpIHtcbiAgcmV0dXJuIGBcbiAgI21vZGFsIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWluLXdpZHRoOiAyNTBweDtcbiAgICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMjQpIDBweCAzcHggOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gICNtb2RhbCBoMiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gICNtb2RhbC5zdWNjZXNzIHtcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgIzZFQ0QyODtcbiAgfVxuXG4gICNtb2RhbC5mYWlsIHtcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgI0NEMjgyODtcbiAgfVxuXG4gIC5jbG9zZS1idG4ge1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0cHg7XG4gICAgcmlnaHQ6IDRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAjbW9kYWwgLmNvbnRlbnQge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICAgIG1pbi13aWR0aDogMzAwcHg7XG4gIH1cbiAgXG4gICNtb2RhbC5zaG93IHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlaW4gMC41cztcbiAgICBhbmltYXRpb246IGZhZGVpbiAwLjVzO1xuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgwJSk7IG9wYWNpdHk6IDA7fSBcbiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7IG9wYWNpdHk6IDE7fVxuICB9XG4gIFxuICBAa2V5ZnJhbWVzIGZhZGVpbiB7XG4gICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoMCUpOyBvcGFjaXR5OiAwO31cbiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7IG9wYWNpdHk6IDE7fVxuICB9XG5cbiAgI21vZGFsLmhpZGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxuXG4gIGA7XG59XG5cbmNvbnN0IHN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5zdHlsZVNoZWV0LmlubmVyVGV4dCA9IGAke2dldFRvYXN0U3R5bGVzKCl9ICR7Z2V0TW9kYWxTdHlsZXMoKX1gO1xuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcblxuY29uc3QgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xudG9hc3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2FzdFwiKTtcbnRvYXN0LnRleHRDb250ZW50ID0gXCJDb3BpZWQgIVwiO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2FzdCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93VG9hc3QoeyB0ZXh0LCB0aW1lID0gMzAwMCB9KSB7XG4gIHRvYXN0LnRleHRDb250ZW50ID0gdGV4dDtcbiAgY29uc3QgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9hc3RcIik7XG4gIHguY2xhc3NOYW1lID0gXCJzaG93XCI7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHguY2xhc3NOYW1lID0geC5jbGFzc05hbWUucmVwbGFjZShcInNob3dcIiwgXCJcIik7XG4gIH0sIHRpbWUpO1xufVxuXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5tb2RhbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1vZGFsXCIpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbmNvbnN0IGdldE1vZGFsQ29udGVudCA9IChkYXRhKSA9PiB7XG4gIHJldHVybiBgXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgPGgyPiR7ZGF0YS5zdGF0ZSA9PT0gXCJzdWNjZXNzXCIgPyBcIlN1Y2Nlc3MgIVwiIDogXCJGYWlsXCJ9PC9oMj5cbiAgICA8ZW0+UGF5bWVudCBJRDogJHtkYXRhLnJhem9ycGF5X3BheW1lbnRfaWR9PC9lbT5cbiAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UtYnRuXCI+WDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgYDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93TW9kYWwoZGF0YSkge1xuICBjb25zdCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgeC5pbm5lckhUTUwgPSBnZXRNb2RhbENvbnRlbnQoZGF0YSk7XG4gIHguY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gIGlmIChkYXRhLnN0YXRlID09PSBcInN1Y2Nlc3NcIikge1xuICAgIHguY2xhc3NMaXN0LmFkZChcInNob3dcIiwgXCJzdWNjZXNzXCIpO1xuICB9IGVsc2Uge1xuICAgIHguY2xhc3NMaXN0LmFkZChcInNob3dcIiwgXCJmYWlsXCIpO1xuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbCAuY2xvc2UtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIik7XG4gICAgeC5jbGFzc05hbWUgPSBcImhpZGVcIjtcbiAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEVWRU5UX1RZUEVTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgZ2VuZXJhdGVRdWVyeVNlbGVjdG9yLFxuICBxdWVyeVNlbGVjdG9yRmFsbGJhY2ssXG4gIHNob3dNb2RhbCxcbiAgc2hvd1RvYXN0LFxufSBmcm9tIFwiLi91dGlsc1wiO1xuXG5sZXQgb3B0aW9ucyA9IHt9O1xubGV0IGVuYWJsZUluc3BlY3RvciA9IGZhbHNlO1xuXG4vKipcbiAqIHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyByYXpvcnBheSBpbnN0YW5jZSBhbmQgb3BlbmluZyBjaGVja291dFxuICogQHBhcmFtIHtDbGlja0V2ZW50fSBldlxuICovXG5mdW5jdGlvbiBoYW5kbGVDbGljayhldikge1xuICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgZGVsZXRlIG9wdGlvbnMuc2VsZWN0b3I7XG5cbiAgb3B0aW9ucy5oYW5kbGVyID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgc2hvd01vZGFsKHsgc3RhdGU6IFwic3VjY2Vzc1wiLCAuLi5yZXNwb25zZSB9KTtcbiAgfTtcbiAgY29uc3QgcnpwID0gbmV3IFJhem9ycGF5KG9wdGlvbnMpO1xuXG4gIC8vIHJ6cC5vbihcInBheW1lbnQuZmFpbGVkXCIsIGZ1bmN0aW9uIChlcnJvcikge1xuICAvLyAgIHNob3dNb2RhbCh7IHN0YXRlOiBcImZhaWxcIiwgLi4uZXJyb3IgfSk7XG4gIC8vIH0pO1xuXG4gIC8vIHJ6cC5vbihcInBheW1lbnQuZXJyb3JcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgLy8gICBzaG93TW9kYWwoeyBzdGF0ZTogXCJmYWlsXCIsIC4uLmRhdGEgfSk7XG4gIC8vIH0pO1xuICByenAub3BlbigpO1xufVxuXG4vKipcbiAqIHJlY2lldmUgZGF0YSBmcm9tIHBvcHVwIHNjcmlwdFxuICovXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZywgc2VuZGVyLCByZXNwb25zZSkgPT4ge1xuICBpZiAobXNnLmZyb20gPT09IFwicG9wdXBcIikge1xuICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgIGNhc2UgRVZFTlRfVFlQRVMuU0VUX09QVElPTlM6XG4gICAgICAgIHNob3dUb2FzdCh7IHRleHQ6IFwiU2F2ZWQgIVwiIH0pO1xuICAgICAgICByZW1vdmVBbmRBZGRMaXN0ZW5lcihvcHRpb25zLnNlbGVjdG9yLCBtc2cub3B0aW9ucy5zZWxlY3Rvcik7XG4gICAgICAgIG9wdGlvbnMgPSBtc2cub3B0aW9ucztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRVZFTlRfVFlQRVMuVE9HR0xFX0lOU1BFQ1RPUjpcbiAgICAgICAgaGFuZGxlSW5zcGVjdG9yKG1zZyk7XG4gICAgICAgIG9wdGlvbnMgPSBtc2cub3B0aW9ucztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufSk7XG5cbi8qKlxuICogcmVtb3ZlcyBjbGljayBsaXN0ZW5lciB0byBmaXJzdCBwYXJhbSBhbmQgYWRkcyBsaXN0ZW5lciB0byBzZWNvbmQgcGFyYW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclRvUmVtb3ZlXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JUb0FkZFxuICovXG5mdW5jdGlvbiByZW1vdmVBbmRBZGRMaXN0ZW5lcihzZWxlY3RvclRvUmVtb3ZlLCBzZWxlY3RvclRvQWRkKSB7XG4gIGlmIChzZWxlY3RvclRvUmVtb3ZlICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JUb1JlbW92ZSkpIHtcbiAgICBkb2N1bWVudFxuICAgICAgLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JUb1JlbW92ZSlcbiAgICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spO1xuICB9XG5cbiAgaWYgKHNlbGVjdG9yVG9BZGQgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvclRvQWRkKSkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihzZWxlY3RvclRvQWRkKVxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gIH1cbn1cblxuLyoqXG4gKiBIYW5kbGVzIFwicGljayBmcm9tIHBhZ2VcIiBhY3Rpb24gZnJvbSBwb3B1cFxuICogQHBhcmFtIHtPYmplY3R9IG1zZ1xuICovXG5mdW5jdGlvbiBoYW5kbGVJbnNwZWN0b3IobXNnKSB7XG4gIGVuYWJsZUluc3BlY3RvciA9IG1zZy5lbmFibGVJbnNwZWN0b3I7XG4gIC8qXG4gICB0byBoYXZlIGEgY3Jvc3NoYWlyIGN1cnNvciBmb3IgYWxsIGVsZW1lbnRzXG4gICBkaXNhYmxlZCBjdXJyZW50bHkgYXMgaXQgaGFzIGlzc3Vlc1xuICAqL1xuICAvLyBjb25zdCBhbGxFbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIqXCIpO1xuICAvLyBpZiAoZW5hYmxlSW5zcGVjdG9yKSB7XG4gIC8vICAgZm9yIChjb25zdCBlbGUgb2YgYWxsRWxlbWVudHMpIHtcbiAgLy8gICAgIGVsZS5zZXRBdHRyaWJ1dGUoXG4gIC8vICAgICAgIFwic3R5bGVcIixcbiAgLy8gICAgICAgXCJjdXJzb3I6IGNyb3NzaGFpciAhaW1wb3J0YW50OyBwb2ludGVyLWV2ZW50czogbm9uZSAhaW1wb3J0YW50O1wiXG4gIC8vICAgICApO1xuICAvLyAgIH1cbiAgLy8gfSBlbHNlIHtcbiAgLy8gICBmb3IgKGNvbnN0IGVsZSBvZiBhbGxFbGVtZW50cykge1xuICAvLyAgICAgZWxlLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAvLyAgIH1cbiAgLy8gfVxufVxuXG4vKipcbiAqIGNsaWNrIGxpc3RlbmVyIGZvciBib2R5XG4gKiAtIHVzZWQgdG8gZ2V0IHRoZSBzZWxlY3RvciB2YWx1ZSBmcm9tIGNsaWNrZWQgZWxlbWVudCAocGljayBmcm9tIHBhZ2UpXG4gKiBAcGFyYW0ge0NsaWNrRXZlbnR9IGV2XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZURvbUNsaWNrKGV2KSB7XG4gIGlmIChlbmFibGVJbnNwZWN0b3IpIHtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgYnRuU2VsZWN0b3IgPSBxdWVyeVNlbGVjdG9yRmFsbGJhY2soZXYudGFyZ2V0KTtcblxuICAgIHNob3dUb2FzdCh7IHRleHQ6IFwiQ2hlY2tvdXQgbGlua2VkICFcIiB9KTtcblxuICAgIHJlbW92ZUFuZEFkZExpc3RlbmVyKG9wdGlvbnMuc2VsZWN0b3IsIGJ0blNlbGVjdG9yKTtcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IGNoZWNrb3V0U2VsZWN0b3I6IGJ0blNlbGVjdG9yIH0pO1xuICAgIGVuYWJsZUluc3BlY3RvciA9IGZhbHNlO1xuICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXG4gIFwiY2xpY2tcIixcbiAgKGV2KSA9PiB7XG4gICAgaGFuZGxlRG9tQ2xpY2soZXYpO1xuICB9LFxuICB7IGNhcHR1cmU6IHRydWUgfVxuKTtcbiJdLCJuYW1lcyI6WyJFVkVOVF9UWVBFUyIsIlNFVF9PUFRJT05TIiwiVE9HR0xFX0lOU1BFQ1RPUiIsImZhbGxiYWNrQ29weVRleHRUb0NsaXBib2FyZCIsInRleHQiLCJ0ZXh0QXJlYSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbHVlIiwic3R5bGUiLCJ0b3AiLCJsZWZ0IiwicG9zaXRpb24iLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJmb2N1cyIsInNlbGVjdCIsInN1Y2Nlc3NmdWwiLCJleGVjQ29tbWFuZCIsIm1zZyIsImNvbnNvbGUiLCJsb2ciLCJlcnIiLCJlcnJvciIsInJlbW92ZUNoaWxkIiwiZ2VuZXJhdGVRdWVyeVNlbGVjdG9yIiwiZWwiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJzdHIiLCJpZCIsImNsYXNzTmFtZSIsImNsYXNzZXMiLCJzcGxpdCIsImkiLCJsZW5ndGgiLCJwYXJlbnROb2RlIiwicXVlcnlTZWxlY3RvckZhbGxiYWNrIiwiY29udGV4dCIsImluZGV4IiwicGF0aFNlbGVjdG9yIiwibG9jYWxOYW1lIiwiZ2V0SW5kZXgiLCJub2RlIiwicHJldmlvdXNTaWJsaW5nIiwibm9kZVR5cGUiLCJnZXRUb2FzdFN0eWxlcyIsImdldE1vZGFsU3R5bGVzIiwic3R5bGVTaGVldCIsImlubmVyVGV4dCIsImhlYWQiLCJ0b2FzdCIsInNldEF0dHJpYnV0ZSIsInRleHRDb250ZW50Iiwic2hvd1RvYXN0IiwidGltZSIsIngiLCJnZXRFbGVtZW50QnlJZCIsInNldFRpbWVvdXQiLCJyZXBsYWNlIiwibW9kYWwiLCJnZXRNb2RhbENvbnRlbnQiLCJkYXRhIiwic3RhdGUiLCJyYXpvcnBheV9wYXltZW50X2lkIiwic2hvd01vZGFsIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJvcHRpb25zIiwiZW5hYmxlSW5zcGVjdG9yIiwiaGFuZGxlQ2xpY2siLCJldiIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0Iiwic2VsZWN0b3IiLCJoYW5kbGVyIiwicmVzcG9uc2UiLCJyenAiLCJSYXpvcnBheSIsIm9wZW4iLCJjaHJvbWUiLCJydW50aW1lIiwib25NZXNzYWdlIiwiYWRkTGlzdGVuZXIiLCJzZW5kZXIiLCJmcm9tIiwidHlwZSIsInJlbW92ZUFuZEFkZExpc3RlbmVyIiwiaGFuZGxlSW5zcGVjdG9yIiwic2VsZWN0b3JUb1JlbW92ZSIsInNlbGVjdG9yVG9BZGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiaGFuZGxlRG9tQ2xpY2siLCJidG5TZWxlY3RvciIsInRhcmdldCIsInN0b3JhZ2UiLCJsb2NhbCIsInNldCIsImNoZWNrb3V0U2VsZWN0b3IiLCJjYXB0dXJlIl0sInNvdXJjZVJvb3QiOiIifQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVN1QixjQUFjLENBQUNyQixFQUFFLEVBQUU7RUFDMUIsSUFBSUYsZUFBZSxFQUFFO0lBQ25CRSxFQUFFLENBQUNDLGVBQWUsRUFBRTtJQUNwQkQsRUFBRSxDQUFDRSxjQUFjLEVBQUU7SUFFbkIsSUFBTW9CLFdBQVcsR0FBRzVELDZEQUFxQixDQUFDc0MsRUFBRSxDQUFDdUIsTUFBTSxDQUFDO0lBRXBENUMsaURBQVMsQ0FBQztNQUFFbEQsSUFBSSxFQUFFO0lBQW9CLENBQUMsQ0FBQztJQUV4Q3VGLG9CQUFvQixDQUFDbkIsT0FBTyxDQUFDTSxRQUFRLEVBQUVtQixXQUFXLENBQUM7SUFFbkRiLE1BQU0sQ0FBQ2UsT0FBTyxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQztNQUFFQyxnQkFBZ0IsRUFBRUw7SUFBWSxDQUFDLENBQUM7SUFDM0R4QixlQUFlLEdBQUcsS0FBSztFQUN6QjtBQUNGO0FBRUFuRSxRQUFRLENBQUNpRSxnQkFBZ0IsQ0FDdkIsT0FBTyxFQUNQLFVBQUNJLEVBQUUsRUFBSztFQUNOcUIsY0FBYyxDQUFDckIsRUFBRSxDQUFDO0FBQ3BCLENBQUMsRUFDRDtFQUFFNEIsT0FBTyxFQUFFO0FBQUssQ0FBQyxDQUNsQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi8uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uLy4vc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi8uL3NjcmlwdHMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRVZFTlRfVFlQRVMgPSB7XG4gIFNFVF9PUFRJT05TOiBcIlNFVF9PUFRJT05TXCIsXG4gIFRPR0dMRV9JTlNQRUNUT1I6IFwiVE9HR0xFX0lOU1BFQ1RPUlwiLFxufTtcbiIsImZ1bmN0aW9uIGZhbGxiYWNrQ29weVRleHRUb0NsaXBib2FyZCh0ZXh0KSB7XG4gIGNvbnN0IHRleHRBcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICB0ZXh0QXJlYS52YWx1ZSA9IHRleHQ7XG5cbiAgLy8gQXZvaWQgc2Nyb2xsaW5nIHRvIGJvdHRvbVxuICB0ZXh0QXJlYS5zdHlsZS50b3AgPSBcIjBcIjtcbiAgdGV4dEFyZWEuc3R5bGUubGVmdCA9IFwiMFwiO1xuICB0ZXh0QXJlYS5zdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRleHRBcmVhKTtcbiAgdGV4dEFyZWEuZm9jdXMoKTtcbiAgdGV4dEFyZWEuc2VsZWN0KCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBzdWNjZXNzZnVsID0gZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJjb3B5XCIpO1xuICAgIGNvbnN0IG1zZyA9IHN1Y2Nlc3NmdWwgPyBcInN1Y2Nlc3NmdWxcIiA6IFwidW5zdWNjZXNzZnVsXCI7XG4gICAgY29uc29sZS5sb2coXCJGYWxsYmFjazogQ29weWluZyB0ZXh0IGNvbW1hbmQgd2FzIFwiICsgbXNnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkZhbGxiYWNrOiBPb3BzLCB1bmFibGUgdG8gY29weVwiLCBlcnIpO1xuICB9XG5cbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0ZXh0QXJlYSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbiAoZWwpIHtcbiAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBcImh0bWxcIikgcmV0dXJuIFwiSFRNTFwiO1xuICBsZXQgc3RyID0gZWwudGFnTmFtZTtcbiAgc3RyICs9IGVsLmlkICE9IFwiXCIgPyBcIiNcIiArIGVsLmlkIDogXCJcIjtcbiAgaWYgKGVsLmNsYXNzTmFtZSkge1xuICAgIGxldCBjbGFzc2VzID0gZWwuY2xhc3NOYW1lLnNwbGl0KC9cXHMvKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0ciArPSBcIi5cIiArIGNsYXNzZXNbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBnZW5lcmF0ZVF1ZXJ5U2VsZWN0b3IoZWwucGFyZW50Tm9kZSkgKyBcIiA+IFwiICsgc3RyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3JGYWxsYmFjayhjb250ZXh0KSB7XG4gIGxldCBpbmRleCwgcGF0aFNlbGVjdG9yLCBsb2NhbE5hbWU7XG5cbiAgaWYgKGNvbnRleHQgPT0gXCJudWxsXCIpIHRocm93IFwibm90IGFuIGRvbSByZWZlcmVuY2VcIjtcbiAgLy8gY2FsbCBnZXRJbmRleCBmdW5jdGlvblxuICBpbmRleCA9IGdldEluZGV4KGNvbnRleHQpO1xuXG4gIHdoaWxlIChjb250ZXh0LnRhZ05hbWUpIHtcbiAgICAvLyBzZWxlY3RvciBwYXRoXG4gICAgcGF0aFNlbGVjdG9yID0gY29udGV4dC5sb2NhbE5hbWUgKyAocGF0aFNlbGVjdG9yID8gXCI+XCIgKyBwYXRoU2VsZWN0b3IgOiBcIlwiKTtcbiAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnROb2RlO1xuICB9XG4gIC8vIHNlbGVjdG9yIHBhdGggZm9yIG50aCBvZiB0eXBlXG4gIHBhdGhTZWxlY3RvciA9IHBhdGhTZWxlY3RvciArIGA6bnRoLW9mLXR5cGUoJHtpbmRleH0pYDtcbiAgcmV0dXJuIHBhdGhTZWxlY3Rvcjtcbn1cblxuLy8gZ2V0IGluZGV4IGZvciBudGggb2YgdHlwZSBlbGVtZW50XG5mdW5jdGlvbiBnZXRJbmRleChub2RlKSB7XG4gIGxldCBpID0gMTtcbiAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWU7XG5cbiAgd2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgbm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIGlmIChcbiAgICAgIG5vZGUubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgIHRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICkge1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvYXN0U3R5bGVzKCkge1xuICByZXR1cm4gYFxuICAjdG9hc3QgIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWluLXdpZHRoOiAyNTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDQwMGZmO1xuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yNCkgMHB4IDNweCA4cHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDEwMDAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgYm90dG9tOiAzMHB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuICBcbiAgI3RvYXN0LnNob3cge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGVpbiAwLjVzLCBmYWRlb3V0IDAuNXMgMi41cztcbiAgICBhbmltYXRpb246IGZhZGVpbiAwLjVzLCBmYWRlb3V0IDAuNXMgMi41cztcbiAgfVxuICBcbiAgQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XG4gICAgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gXG4gICAgdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fVxuICAgIHRvIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fVxuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZW91dCB7XG4gICAgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO30gXG4gICAgdG8ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgZmFkZW91dCB7XG4gICAgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO31cbiAgICB0byB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO31cbiAgfVxuICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kYWxTdHlsZXMoKSB7XG4gIHJldHVybiBgXG4gICNtb2RhbCB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIG1pbi13aWR0aDogMjUwcHg7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwcHggM3B4IDhweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDEwMDAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAjbW9kYWwgaDIge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cblxuICAjbW9kYWwuc3VjY2VzcyB7XG4gICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkICM2RUNEMjg7XG4gIH1cblxuICAjbW9kYWwuZmFpbCB7XG4gICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkICNDRDI4Mjg7XG4gIH1cblxuICAuY2xvc2UtYnRuIHtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIGhlaWdodDogMjVweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNHB4O1xuICAgIHJpZ2h0OiA0cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgI21vZGFsIC5jb250ZW50IHtcbiAgICBtaW4taGVpZ2h0OiAxMDBweDtcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xuICB9XG4gIFxuICAjbW9kYWwuc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZWluIDAuNXM7XG4gICAgYW5pbWF0aW9uOiBmYWRlaW4gMC41cztcbiAgfVxuICBcbiAgQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XG4gICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoMCUpOyBvcGFjaXR5OiAwO30gXG4gICAgdG8ge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpOyBvcGFjaXR5OiAxO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlaW4ge1xuICAgIGZyb20ge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKDAlKTsgb3BhY2l0eTogMDt9XG4gICAgdG8ge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpOyBvcGFjaXR5OiAxO31cbiAgfVxuXG4gICNtb2RhbC5oaWRlIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cblxuICBgO1xufVxuXG5jb25zdCBzdHlsZVNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuc3R5bGVTaGVldC5pbm5lclRleHQgPSBgJHtnZXRUb2FzdFN0eWxlcygpfSAke2dldE1vZGFsU3R5bGVzKCl9YDtcbmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG5cbmNvbnN0IHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnRvYXN0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwidG9hc3RcIik7XG50b2FzdC50ZXh0Q29udGVudCA9IFwiQ29waWVkICFcIjtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9hc3QpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1RvYXN0KHsgdGV4dCwgdGltZSA9IDMwMDAgfSkge1xuICB0b2FzdC50ZXh0Q29udGVudCA9IHRleHQ7XG4gIGNvbnN0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvYXN0XCIpO1xuICB4LmNsYXNzTmFtZSA9IFwic2hvd1wiO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB4LmNsYXNzTmFtZSA9IHguY2xhc3NOYW1lLnJlcGxhY2UoXCJzaG93XCIsIFwiXCIpO1xuICB9LCB0aW1lKTtcbn1cblxuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xubW9kYWwuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJtb2RhbFwiKTtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobW9kYWwpO1xuXG5jb25zdCBnZXRNb2RhbENvbnRlbnQgPSAoZGF0YSkgPT4ge1xuICByZXR1cm4gYFxuICA8ZGl2IGNsYXNzPVwiY29udGVudFwiPlxuICAgIDxoMj4ke2RhdGEuc3RhdGUgPT09IFwic3VjY2Vzc1wiID8gXCJTdWNjZXNzICFcIiA6IFwiRmFpbFwifTwvaDI+XG4gICAgPGVtPlBheW1lbnQgSUQ6ICR7ZGF0YS5yYXpvcnBheV9wYXltZW50X2lkfTwvZW0+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImNsb3NlLWJ0blwiPlg8L2J1dHRvbj5cbiAgPC9kaXY+XG4gIGA7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd01vZGFsKGRhdGEpIHtcbiAgY29uc3QgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIik7XG4gIHguaW5uZXJIVE1MID0gZ2V0TW9kYWxDb250ZW50KGRhdGEpO1xuICB4LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICBpZiAoZGF0YS5zdGF0ZSA9PT0gXCJzdWNjZXNzXCIpIHtcbiAgICB4LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIsIFwic3VjY2Vzc1wiKTtcbiAgfSBlbHNlIHtcbiAgICB4LmNsYXNzTGlzdC5hZGQoXCJzaG93XCIsIFwiZmFpbFwiKTtcbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbW9kYWwgLmNsb3NlLWJ0blwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIGNvbnN0IHggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsXCIpO1xuICAgIHguY2xhc3NOYW1lID0gXCJoaWRlXCI7XG4gIH0pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBFVkVOVF9UWVBFUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7XG4gIGdlbmVyYXRlUXVlcnlTZWxlY3RvcixcbiAgcXVlcnlTZWxlY3RvckZhbGxiYWNrLFxuICBzaG93TW9kYWwsXG4gIHNob3dUb2FzdCxcbn0gZnJvbSBcIi4vdXRpbHNcIjtcblxubGV0IG9wdGlvbnMgPSB7fTtcbmxldCBlbmFibGVJbnNwZWN0b3IgPSBmYWxzZTtcblxuLyoqXG4gKiByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgcmF6b3JwYXkgaW5zdGFuY2UgYW5kIG9wZW5pbmcgY2hlY2tvdXRcbiAqIEBwYXJhbSB7Q2xpY2tFdmVudH0gZXZcbiAqL1xuZnVuY3Rpb24gaGFuZGxlQ2xpY2soZXYpIHtcbiAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gIGRlbGV0ZSBvcHRpb25zLnNlbGVjdG9yO1xuXG4gIG9wdGlvbnMuaGFuZGxlciA9IChyZXNwb25zZSkgPT4ge1xuICAgIHNob3dNb2RhbCh7IHN0YXRlOiBcInN1Y2Nlc3NcIiwgLi4ucmVzcG9uc2UgfSk7XG4gIH07XG4gIGNvbnN0IHJ6cCA9IG5ldyBSYXpvcnBheShvcHRpb25zKTtcblxuICAvLyByenAub24oXCJwYXltZW50LmZhaWxlZFwiLCBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgLy8gICBzaG93TW9kYWwoeyBzdGF0ZTogXCJmYWlsXCIsIC4uLmVycm9yIH0pO1xuICAvLyB9KTtcblxuICAvLyByenAub24oXCJwYXltZW50LmVycm9yXCIsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIC8vICAgc2hvd01vZGFsKHsgc3RhdGU6IFwiZmFpbFwiLCAuLi5kYXRhIH0pO1xuICAvLyB9KTtcbiAgcnpwLm9wZW4oKTtcbn1cblxuLyoqXG4gKiByZWNpZXZlIGRhdGEgZnJvbSBwb3B1cCBzY3JpcHRcbiAqL1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtc2csIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcbiAgaWYgKG1zZy5mcm9tID09PSBcInBvcHVwXCIpIHtcbiAgICBzd2l0Y2ggKG1zZy50eXBlKSB7XG4gICAgICBjYXNlIEVWRU5UX1RZUEVTLlNFVF9PUFRJT05TOlxuICAgICAgICBzaG93VG9hc3QoeyB0ZXh0OiBcIlNhdmVkICFcIiB9KTtcbiAgICAgICAgcmVtb3ZlQW5kQWRkTGlzdGVuZXIob3B0aW9ucy5zZWxlY3RvciwgbXNnLm9wdGlvbnMuc2VsZWN0b3IpO1xuICAgICAgICBvcHRpb25zID0gbXNnLm9wdGlvbnM7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVWRU5UX1RZUEVTLlRPR0dMRV9JTlNQRUNUT1I6XG4gICAgICAgIGhhbmRsZUluc3BlY3Rvcihtc2cpO1xuICAgICAgICBvcHRpb25zID0gbXNnLm9wdGlvbnM7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn0pO1xuXG4vKipcbiAqIHJlbW92ZXMgY2xpY2sgbGlzdGVuZXIgdG8gZmlyc3QgcGFyYW0gYW5kIGFkZHMgbGlzdGVuZXIgdG8gc2Vjb25kIHBhcmFtXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JUb1JlbW92ZVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yVG9BZGRcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQW5kQWRkTGlzdGVuZXIoc2VsZWN0b3JUb1JlbW92ZSwgc2VsZWN0b3JUb0FkZCkge1xuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvclRvUmVtb3ZlKSkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihzZWxlY3RvclRvUmVtb3ZlKVxuICAgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yVG9BZGQpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG59XG5cbi8qKlxuICogSGFuZGxlcyBcInBpY2sgZnJvbSBwYWdlXCIgYWN0aW9uIGZyb20gcG9wdXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBtc2dcbiAqL1xuZnVuY3Rpb24gaGFuZGxlSW5zcGVjdG9yKG1zZykge1xuICBlbmFibGVJbnNwZWN0b3IgPSBtc2cuZW5hYmxlSW5zcGVjdG9yO1xuICAvKlxuICAgdG8gaGF2ZSBhIGNyb3NzaGFpciBjdXJzb3IgZm9yIGFsbCBlbGVtZW50c1xuICAgZGlzYWJsZWQgY3VycmVudGx5IGFzIGl0IGhhcyBpc3N1ZXNcbiAgKi9cbiAgLy8gY29uc3QgYWxsRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKTtcbiAgLy8gaWYgKGVuYWJsZUluc3BlY3Rvcikge1xuICAvLyAgIGZvciAoY29uc3QgZWxlIG9mIGFsbEVsZW1lbnRzKSB7XG4gIC8vICAgICBlbGUuc2V0QXR0cmlidXRlKFxuICAvLyAgICAgICBcInN0eWxlXCIsXG4gIC8vICAgICAgIFwiY3Vyc29yOiBjcm9zc2hhaXIgIWltcG9ydGFudDsgcG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDtcIlxuICAvLyAgICAgKTtcbiAgLy8gICB9XG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgZm9yIChjb25zdCBlbGUgb2YgYWxsRWxlbWVudHMpIHtcbiAgLy8gICAgIGVsZS5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgLy8gICB9XG4gIC8vIH1cbn1cblxuLyoqXG4gKiBjbGljayBsaXN0ZW5lciBmb3IgYm9keVxuICogLSB1c2VkIHRvIGdldCB0aGUgc2VsZWN0b3IgdmFsdWUgZnJvbSBjbGlja2VkIGVsZW1lbnQgKHBpY2sgZnJvbSBwYWdlKVxuICogQHBhcmFtIHtDbGlja0V2ZW50fSBldlxuICovXG5mdW5jdGlvbiBoYW5kbGVEb21DbGljayhldikge1xuICBpZiAoZW5hYmxlSW5zcGVjdG9yKSB7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGJ0blNlbGVjdG9yID0gcXVlcnlTZWxlY3RvckZhbGxiYWNrKGV2LnRhcmdldCk7XG5cbiAgICBzaG93VG9hc3QoeyB0ZXh0OiBcIkNoZWNrb3V0IGxpbmtlZCAhXCIgfSk7XG5cbiAgICByZW1vdmVBbmRBZGRMaXN0ZW5lcihvcHRpb25zLnNlbGVjdG9yLCBidG5TZWxlY3Rvcik7XG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBjaGVja291dFNlbGVjdG9yOiBidG5TZWxlY3RvciB9KTtcbiAgICBlbmFibGVJbnNwZWN0b3IgPSBmYWxzZTtcbiAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICBcImNsaWNrXCIsXG4gIChldikgPT4ge1xuICAgIGhhbmRsZURvbUNsaWNrKGV2KTtcbiAgfSxcbiAgeyBjYXB0dXJlOiB0cnVlIH1cbik7XG4iXSwibmFtZXMiOlsiRVZFTlRfVFlQRVMiLCJTRVRfT1BUSU9OUyIsIlRPR0dMRV9JTlNQRUNUT1IiLCJmYWxsYmFja0NvcHlUZXh0VG9DbGlwYm9hcmQiLCJ0ZXh0IiwidGV4dEFyZWEiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsInN0eWxlIiwidG9wIiwibGVmdCIsInBvc2l0aW9uIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZm9jdXMiLCJzZWxlY3QiLCJzdWNjZXNzZnVsIiwiZXhlY0NvbW1hbmQiLCJtc2ciLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXJyb3IiLCJyZW1vdmVDaGlsZCIsImdlbmVyYXRlUXVlcnlTZWxlY3RvciIsImVsIiwidGFnTmFtZSIsInRvTG93ZXJDYXNlIiwic3RyIiwiaWQiLCJjbGFzc05hbWUiLCJjbGFzc2VzIiwic3BsaXQiLCJpIiwibGVuZ3RoIiwicGFyZW50Tm9kZSIsInF1ZXJ5U2VsZWN0b3JGYWxsYmFjayIsImNvbnRleHQiLCJpbmRleCIsInBhdGhTZWxlY3RvciIsImxvY2FsTmFtZSIsImdldEluZGV4Iiwibm9kZSIsInByZXZpb3VzU2libGluZyIsIm5vZGVUeXBlIiwiZ2V0VG9hc3RTdHlsZXMiLCJnZXRNb2RhbFN0eWxlcyIsInN0eWxlU2hlZXQiLCJpbm5lclRleHQiLCJoZWFkIiwidG9hc3QiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsInNob3dUb2FzdCIsInRpbWUiLCJ4IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZXRUaW1lb3V0IiwicmVwbGFjZSIsIm1vZGFsIiwiZ2V0TW9kYWxDb250ZW50IiwiZGF0YSIsInN0YXRlIiwicmF6b3JwYXlfcGF5bWVudF9pZCIsInNob3dNb2RhbCIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwib3B0aW9ucyIsImVuYWJsZUluc3BlY3RvciIsImhhbmRsZUNsaWNrIiwiZXYiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsInNlbGVjdG9yIiwiaGFuZGxlciIsInJlc3BvbnNlIiwicnpwIiwiUmF6b3JwYXkiLCJvcGVuIiwiY2hyb21lIiwicnVudGltZSIsIm9uTWVzc2FnZSIsImFkZExpc3RlbmVyIiwic2VuZGVyIiwiZnJvbSIsInR5cGUiLCJyZW1vdmVBbmRBZGRMaXN0ZW5lciIsImhhbmRsZUluc3BlY3RvciIsInNlbGVjdG9yVG9SZW1vdmUiLCJzZWxlY3RvclRvQWRkIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZURvbUNsaWNrIiwiYnRuU2VsZWN0b3IiLCJ0YXJnZXQiLCJzdG9yYWdlIiwibG9jYWwiLCJzZXQiLCJjaGVja291dFNlbGVjdG9yIiwiY2FwdHVyZSJdLCJzb3VyY2VSb290IjoiIn0=
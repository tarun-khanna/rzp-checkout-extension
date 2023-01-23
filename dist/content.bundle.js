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
  TOGGLE_INSPECTOR: "TOGGLE_INSPECTOR",
  SET_AMOUNT: "SET_AMOUNT",
  GET_AMOUNT: "GET_AMOUNT"
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
/* harmony export */   "scrapeAmountFromPage": () => (/* binding */ scrapeAmountFromPage),
/* harmony export */   "showModal": () => (/* binding */ showModal),
/* harmony export */   "showToast": () => (/* binding */ showToast)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
function createRecordFromElement(element) {
  var text = element.textContent.trim();
  var record = {};
  var bBox = element.getBoundingClientRect();
  if (text.length <= 30 && !(bBox.x == 0 && bBox.y == 0)) {
    record.fontSize = parseInt(getComputedStyle(element).fontSize);
  }
  record.y = bBox.y;
  record.x = bBox.x;
  record.text = text;
  return record;
}
function filterContentInsideViewport(elem) {
  if (elem.x > window.innerWidth || elem.x < 0 || elem.y > window.innerHeight || elem.y < 0) {
    return false;
  }
  return true;
}
function canBePrice(record) {
  if (record.y > 600 || record.fontSize == undefined || !record.text.match(/(^(US ){0,1}(rs\.|Rs\.|RS\.|\$|₹|INR|RM|USD|CAD|C\$){0,1}(\s){0,1}[\d,]+(\.\d+){0,1}(\s){0,1}(AED){0,1}$)/)) return false;else return true;
}

/**
 * follows below order of algo to extract price
 * 1. check og tags, return textContent if node is present
 * 2. check itemprop="price" attribute, return textContent if node is present
 * 3. fallback algo
 *    - get all elements from body
 *    - create records from each element (x, y, text)
 *    - filter out records that are outside viewable viewport
 *    - filter out records that have number in text or have currency
 *    - sort records by largest font-size
 *    - return the first record
 *
 * @returns price
 */
var scrapeAmountFromPage = function scrapeAmountFromPage() {
  var _recordsSortedByFontS;
  // 1st check
  if (document.querySelector('meta[property="og:price:amount"]')) {
    return document.querySelector('meta[property="og:price:amount"]').content;
  }

  // 2nd check
  if (document.querySelector('[itemprop="price"]')) {
    return document.querySelector('[itemprop="price"]').textContent;
  }

  // 3rd fallback algo
  var elements = _toConsumableArray(document.querySelectorAll(" body *"));
  var records = elements.map(createRecordFromElement).filter(filterContentInsideViewport).filter(canBePrice);
  var recordsSortedByFontSize = records.sort(function (a, b) {
    if (a.fontSize === b.fontSize) return a.y < b.y ? -1 : 1;
    return a.fontSize < b.fontSize ? 1 : -1;
  });
  var priceInNumbers = (_recordsSortedByFontS = recordsSortedByFontSize[0]) === null || _recordsSortedByFontS === void 0 ? void 0 : _recordsSortedByFontS.text.replace(/[^0-9.]/g, "");
  return priceInNumbers;
};

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
    var url = document.location.href.split("?")[0];
    chrome.storage.local.get([url], function (result) {
      chrome.storage.local.set(_defineProperty({}, url, _objectSpread(_objectSpread({}, result[url]), {}, {
        checkoutSelector: btnSelector
      })));
    });
    enableInspector = false;
  }
}
function sendScrapedAmount() {
  var amount = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.scrapeAmountFromPage)();
  chrome.runtime.sendMessage({
    from: "content",
    type: _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPES.SET_AMOUNT,
    value: amount || ""
  });
}

/**
 *  some pages take a while to load the price, 1s is a random value
 *  dom load event doesn't work here
 */
setTimeout(function () {
  sendScrapedAmount();
}, 1000);
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    sendScrapedAmount();
  }
});
document.addEventListener("click", function (ev) {
  handleDomClick(ev);
}, {
  capture: true
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsQ0FBQztJQUNoRHNGLE1BQU0sQ0FBQ21CLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDQyxHQUFHLENBQUMsQ0FBQ0wsR0FBRyxDQUFDLEVBQUUsVUFBQ00sTUFBTSxFQUFLO01BQzFDdEIsTUFBTSxDQUFDbUIsT0FBTyxDQUFDQyxLQUFLLENBQUNHLEdBQUcscUJBQ3JCUCxHQUFHLGtDQUNDTSxNQUFNLENBQUNOLEdBQUcsQ0FBQztRQUNkUSxnQkFBZ0IsRUFBRVY7TUFBVyxJQUUvQjtJQUNKLENBQUMsQ0FBQztJQUNGekIsZUFBZSxHQUFHLEtBQUs7RUFDekI7QUFDRjtBQUVBLFNBQVNvQyxpQkFBaUIsR0FBRztFQUMzQixJQUFNQyxNQUFNLEdBQUdsRCw0REFBb0IsRUFBRTtFQUNyQ3dCLE1BQU0sQ0FBQ0MsT0FBTyxDQUFDMEIsV0FBVyxDQUFDO0lBQ3pCckIsSUFBSSxFQUFFLFNBQVM7SUFDZkMsSUFBSSxFQUFFMUcsOERBQXNCO0lBQzVCK0gsS0FBSyxFQUFFRixNQUFNLElBQUk7RUFDbkIsQ0FBQyxDQUFDO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQWxGLFVBQVUsQ0FBQyxZQUFNO0VBQ2ZpRixpQkFBaUIsRUFBRTtBQUNyQixDQUFDLEVBQUUsSUFBSSxDQUFDO0FBRVIvRixRQUFRLENBQUMyQixnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZO0VBQ3hELElBQUksQ0FBQzNCLFFBQVEsQ0FBQ21HLE1BQU0sRUFBRTtJQUNwQkosaUJBQWlCLEVBQUU7RUFDckI7QUFDRixDQUFDLENBQUM7QUFFRi9GLFFBQVEsQ0FBQzJCLGdCQUFnQixDQUN2QixPQUFPLEVBQ1AsVUFBQ2tDLEVBQUUsRUFBSztFQUNOc0IsY0FBYyxDQUFDdEIsRUFBRSxDQUFDO0FBQ3BCLENBQUMsRUFDRDtFQUFFdUMsT0FBTyxFQUFFO0FBQUssQ0FBQyxDQUNsQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi8uL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uLy4vc2NyaXB0cy91dGlscy5qcyIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi8uL3NjcmlwdHMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgRVZFTlRfVFlQRVMgPSB7XG4gIFNFVF9PUFRJT05TOiBcIlNFVF9PUFRJT05TXCIsXG4gIFRPR0dMRV9JTlNQRUNUT1I6IFwiVE9HR0xFX0lOU1BFQ1RPUlwiLFxuICBTRVRfQU1PVU5UOiBcIlNFVF9BTU9VTlRcIixcbiAgR0VUX0FNT1VOVDogXCJHRVRfQU1PVU5UXCIsXG59O1xuIiwiZXhwb3J0IGNvbnN0IGdlbmVyYXRlUXVlcnlTZWxlY3RvciA9IGZ1bmN0aW9uIChlbCkge1xuICBpZiAoZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IFwiaHRtbFwiKSByZXR1cm4gXCJIVE1MXCI7XG4gIGxldCBzdHIgPSBlbC50YWdOYW1lO1xuICBzdHIgKz0gZWwuaWQgIT0gXCJcIiA/IFwiI1wiICsgZWwuaWQgOiBcIlwiO1xuICBpZiAoZWwuY2xhc3NOYW1lKSB7XG4gICAgbGV0IGNsYXNzZXMgPSBlbC5jbGFzc05hbWUuc3BsaXQoL1xccy8pO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgc3RyICs9IFwiLlwiICsgY2xhc3Nlc1tpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdlbmVyYXRlUXVlcnlTZWxlY3RvcihlbC5wYXJlbnROb2RlKSArIFwiID4gXCIgKyBzdHI7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvckZhbGxiYWNrKGNvbnRleHQpIHtcbiAgbGV0IGluZGV4LCBwYXRoU2VsZWN0b3IsIGxvY2FsTmFtZTtcblxuICBpZiAoY29udGV4dCA9PSBcIm51bGxcIikgdGhyb3cgXCJub3QgYW4gZG9tIHJlZmVyZW5jZVwiO1xuICAvLyBjYWxsIGdldEluZGV4IGZ1bmN0aW9uXG4gIGluZGV4ID0gZ2V0SW5kZXgoY29udGV4dCk7XG5cbiAgd2hpbGUgKGNvbnRleHQudGFnTmFtZSkge1xuICAgIC8vIHNlbGVjdG9yIHBhdGhcbiAgICBwYXRoU2VsZWN0b3IgPSBjb250ZXh0LmxvY2FsTmFtZSArIChwYXRoU2VsZWN0b3IgPyBcIj5cIiArIHBhdGhTZWxlY3RvciA6IFwiXCIpO1xuICAgIGNvbnRleHQgPSBjb250ZXh0LnBhcmVudE5vZGU7XG4gIH1cbiAgLy8gc2VsZWN0b3IgcGF0aCBmb3IgbnRoIG9mIHR5cGVcbiAgcGF0aFNlbGVjdG9yID0gcGF0aFNlbGVjdG9yICsgYDpudGgtb2YtdHlwZSgke2luZGV4fSlgO1xuICByZXR1cm4gcGF0aFNlbGVjdG9yO1xufVxuXG4vLyBnZXQgaW5kZXggZm9yIG50aCBvZiB0eXBlIGVsZW1lbnRcbmZ1bmN0aW9uIGdldEluZGV4KG5vZGUpIHtcbiAgbGV0IGkgPSAxO1xuICBsZXQgdGFnTmFtZSA9IG5vZGUudGFnTmFtZTtcblxuICB3aGlsZSAobm9kZS5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICBub2RlID0gbm9kZS5wcmV2aW91c1NpYmxpbmc7XG4gICAgaWYgKFxuICAgICAgbm9kZS5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgdGFnTmFtZS50b0xvd2VyQ2FzZSgpID09IG5vZGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgKSB7XG4gICAgICBpKys7XG4gICAgfVxuICB9XG4gIHJldHVybiBpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG9hc3RTdHlsZXMoKSB7XG4gIHJldHVybiBgXG4gICN0b2FzdCAge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgICBtaW4td2lkdGg6IDI1MHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwNDAwZmY7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwcHggM3B4IDhweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICBib3R0b206IDMwcHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG4gIFxuICAjdG9hc3Quc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzO1xuICAgIGFuaW1hdGlvbjogZmFkZWluIDAuNXMsIGZhZGVvdXQgMC41cyAyLjVzO1xuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fSBcbiAgICB0byB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlaW4ge1xuICAgIGZyb20ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9XG4gICAgdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9XG4gIH1cbiAgXG4gIEAtd2Via2l0LWtleWZyYW1lcyBmYWRlb3V0IHtcbiAgICBmcm9tIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fSBcbiAgICB0byB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlb3V0IHtcbiAgICBmcm9tIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fVxuICAgIHRvIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fVxuICB9XG4gIGA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNb2RhbFN0eWxlcygpIHtcbiAgcmV0dXJuIGBcbiAgI21vZGFsIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWluLXdpZHRoOiAyNTBweDtcbiAgICBib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMjQpIDBweCAzcHggOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gICAgbGVmdDogNTAlO1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gICNtb2RhbCBoMiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gICNtb2RhbC5zdWNjZXNzIHtcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgIzZFQ0QyODtcbiAgfVxuXG4gICNtb2RhbC5mYWlsIHtcbiAgICBib3JkZXItdG9wOiA4cHggc29saWQgI0NEMjgyODtcbiAgfVxuXG4gIC5jbG9zZS1idG4ge1xuICAgIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgaGVpZ2h0OiAyNXB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA0cHg7XG4gICAgcmlnaHQ6IDRweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gIH1cblxuICAjbW9kYWwgLmNvbnRlbnQge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICAgIG1pbi13aWR0aDogMzAwcHg7XG4gIH1cbiAgXG4gICNtb2RhbC5zaG93IHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIC13ZWJraXQtYW5pbWF0aW9uOiBmYWRlaW4gMC41cztcbiAgICBhbmltYXRpb246IGZhZGVpbiAwLjVzO1xuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHt0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgwJSk7IG9wYWNpdHk6IDA7fSBcbiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7IG9wYWNpdHk6IDE7fVxuICB9XG4gIFxuICBAa2V5ZnJhbWVzIGZhZGVpbiB7XG4gICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoMCUpOyBvcGFjaXR5OiAwO31cbiAgICB0byB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7IG9wYWNpdHk6IDE7fVxuICB9XG5cbiAgI21vZGFsLmhpZGUge1xuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgfVxuXG4gIGA7XG59XG5cbmNvbnN0IHN0eWxlU2hlZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5zdHlsZVNoZWV0LmlubmVyVGV4dCA9IGAke2dldFRvYXN0U3R5bGVzKCl9ICR7Z2V0TW9kYWxTdHlsZXMoKX1gO1xuZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZVNoZWV0KTtcblxuY29uc3QgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xudG9hc3Quc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2FzdFwiKTtcbnRvYXN0LnRleHRDb250ZW50ID0gXCJDb3BpZWQgIVwiO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b2FzdCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93VG9hc3QoeyB0ZXh0LCB0aW1lID0gMzAwMCB9KSB7XG4gIHRvYXN0LnRleHRDb250ZW50ID0gdGV4dDtcbiAgY29uc3QgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidG9hc3RcIik7XG4gIHguY2xhc3NOYW1lID0gXCJzaG93XCI7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIHguY2xhc3NOYW1lID0geC5jbGFzc05hbWUucmVwbGFjZShcInNob3dcIiwgXCJcIik7XG4gIH0sIHRpbWUpO1xufVxuXG5jb25zdCBtb2RhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5tb2RhbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcIm1vZGFsXCIpO1xuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7XG5cbmNvbnN0IGdldE1vZGFsQ29udGVudCA9IChkYXRhKSA9PiB7XG4gIHJldHVybiBgXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gICAgPGgyPiR7ZGF0YS5zdGF0ZSA9PT0gXCJzdWNjZXNzXCIgPyBcIlN1Y2Nlc3MgIVwiIDogXCJGYWlsXCJ9PC9oMj5cbiAgICA8ZW0+UGF5bWVudCBJRDogJHtkYXRhLnJhem9ycGF5X3BheW1lbnRfaWR9PC9lbT5cbiAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UtYnRuXCI+WDwvYnV0dG9uPlxuICA8L2Rpdj5cbiAgYDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93TW9kYWwoZGF0YSkge1xuICBjb25zdCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgeC5pbm5lckhUTUwgPSBnZXRNb2RhbENvbnRlbnQoZGF0YSk7XG4gIHguY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gIGlmIChkYXRhLnN0YXRlID09PSBcInN1Y2Nlc3NcIikge1xuICAgIHguY2xhc3NMaXN0LmFkZChcInNob3dcIiwgXCJzdWNjZXNzXCIpO1xuICB9IGVsc2Uge1xuICAgIHguY2xhc3NMaXN0LmFkZChcInNob3dcIiwgXCJmYWlsXCIpO1xuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbCAuY2xvc2UtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIik7XG4gICAgeC5jbGFzc05hbWUgPSBcImhpZGVcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJlY29yZEZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgY29uc3QgdGV4dCA9IGVsZW1lbnQudGV4dENvbnRlbnQudHJpbSgpO1xuICBsZXQgcmVjb3JkID0ge307XG4gIGNvbnN0IGJCb3ggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGlmICh0ZXh0Lmxlbmd0aCA8PSAzMCAmJiAhKGJCb3gueCA9PSAwICYmIGJCb3gueSA9PSAwKSkge1xuICAgIHJlY29yZC5mb250U2l6ZSA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZm9udFNpemUpO1xuICB9XG4gIHJlY29yZC55ID0gYkJveC55O1xuICByZWNvcmQueCA9IGJCb3gueDtcbiAgcmVjb3JkLnRleHQgPSB0ZXh0O1xuICByZXR1cm4gcmVjb3JkO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJDb250ZW50SW5zaWRlVmlld3BvcnQoZWxlbSkge1xuICBpZiAoXG4gICAgZWxlbS54ID4gd2luZG93LmlubmVyV2lkdGggfHxcbiAgICBlbGVtLnggPCAwIHx8XG4gICAgZWxlbS55ID4gd2luZG93LmlubmVySGVpZ2h0IHx8XG4gICAgZWxlbS55IDwgMFxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNhbkJlUHJpY2UocmVjb3JkKSB7XG4gIGlmIChcbiAgICByZWNvcmQueSA+IDYwMCB8fFxuICAgIHJlY29yZC5mb250U2l6ZSA9PSB1bmRlZmluZWQgfHxcbiAgICAhcmVjb3JkLnRleHQubWF0Y2goXG4gICAgICAvKF4oVVMgKXswLDF9KHJzXFwufFJzXFwufFJTXFwufFxcJHzigrl8SU5SfFJNfFVTRHxDQUR8Q1xcJCl7MCwxfShcXHMpezAsMX1bXFxkLF0rKFxcLlxcZCspezAsMX0oXFxzKXswLDF9KEFFRCl7MCwxfSQpL1xuICAgIClcbiAgKVxuICAgIHJldHVybiBmYWxzZTtcbiAgZWxzZSByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBmb2xsb3dzIGJlbG93IG9yZGVyIG9mIGFsZ28gdG8gZXh0cmFjdCBwcmljZVxuICogMS4gY2hlY2sgb2cgdGFncywgcmV0dXJuIHRleHRDb250ZW50IGlmIG5vZGUgaXMgcHJlc2VudFxuICogMi4gY2hlY2sgaXRlbXByb3A9XCJwcmljZVwiIGF0dHJpYnV0ZSwgcmV0dXJuIHRleHRDb250ZW50IGlmIG5vZGUgaXMgcHJlc2VudFxuICogMy4gZmFsbGJhY2sgYWxnb1xuICogICAgLSBnZXQgYWxsIGVsZW1lbnRzIGZyb20gYm9keVxuICogICAgLSBjcmVhdGUgcmVjb3JkcyBmcm9tIGVhY2ggZWxlbWVudCAoeCwgeSwgdGV4dClcbiAqICAgIC0gZmlsdGVyIG91dCByZWNvcmRzIHRoYXQgYXJlIG91dHNpZGUgdmlld2FibGUgdmlld3BvcnRcbiAqICAgIC0gZmlsdGVyIG91dCByZWNvcmRzIHRoYXQgaGF2ZSBudW1iZXIgaW4gdGV4dCBvciBoYXZlIGN1cnJlbmN5XG4gKiAgICAtIHNvcnQgcmVjb3JkcyBieSBsYXJnZXN0IGZvbnQtc2l6ZVxuICogICAgLSByZXR1cm4gdGhlIGZpcnN0IHJlY29yZFxuICpcbiAqIEByZXR1cm5zIHByaWNlXG4gKi9cbmV4cG9ydCBjb25zdCBzY3JhcGVBbW91bnRGcm9tUGFnZSA9ICgpID0+IHtcbiAgLy8gMXN0IGNoZWNrXG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW3Byb3BlcnR5PVwib2c6cHJpY2U6YW1vdW50XCJdJykpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtwcm9wZXJ0eT1cIm9nOnByaWNlOmFtb3VudFwiXScpLmNvbnRlbnQ7XG4gIH1cblxuICAvLyAybmQgY2hlY2tcbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpdGVtcHJvcD1cInByaWNlXCJdJykpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2l0ZW1wcm9wPVwicHJpY2VcIl0nKS50ZXh0Q29udGVudDtcbiAgfVxuXG4gIC8vIDNyZCBmYWxsYmFjayBhbGdvXG4gIGxldCBlbGVtZW50cyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiIGJvZHkgKlwiKV07XG5cbiAgbGV0IHJlY29yZHMgPSBlbGVtZW50c1xuICAgIC5tYXAoY3JlYXRlUmVjb3JkRnJvbUVsZW1lbnQpXG4gICAgLmZpbHRlcihmaWx0ZXJDb250ZW50SW5zaWRlVmlld3BvcnQpXG4gICAgLmZpbHRlcihjYW5CZVByaWNlKTtcblxuICBsZXQgcmVjb3Jkc1NvcnRlZEJ5Rm9udFNpemUgPSByZWNvcmRzLnNvcnQoKGEsIGIpID0+IHtcbiAgICBpZiAoYS5mb250U2l6ZSA9PT0gYi5mb250U2l6ZSkgcmV0dXJuIGEueSA8IGIueSA/IC0xIDogMTtcbiAgICByZXR1cm4gYS5mb250U2l6ZSA8IGIuZm9udFNpemUgPyAxIDogLTE7XG4gIH0pO1xuXG4gIGxldCBwcmljZUluTnVtYmVycyA9IHJlY29yZHNTb3J0ZWRCeUZvbnRTaXplWzBdPy50ZXh0LnJlcGxhY2UoL1teMC05Ll0vZywgXCJcIik7XG4gIHJldHVybiBwcmljZUluTnVtYmVycztcbn07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEVWRU5UX1RZUEVTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgcXVlcnlTZWxlY3RvckZhbGxiYWNrLFxuICBzY3JhcGVBbW91bnRGcm9tUGFnZSxcbiAgc2hvd01vZGFsLFxuICBzaG93VG9hc3QsXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cbmxldCBvcHRpb25zID0ge307XG5sZXQgZW5hYmxlSW5zcGVjdG9yID0gZmFsc2U7XG5cbi8qKlxuICogcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHJhem9ycGF5IGluc3RhbmNlIGFuZCBvcGVuaW5nIGNoZWNrb3V0XG4gKiBAcGFyYW0ge0NsaWNrRXZlbnR9IGV2XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2KSB7XG4gIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICBkZWxldGUgb3B0aW9ucy5zZWxlY3RvcjtcblxuICBvcHRpb25zLmhhbmRsZXIgPSAocmVzcG9uc2UpID0+IHtcbiAgICBzaG93TW9kYWwoeyBzdGF0ZTogXCJzdWNjZXNzXCIsIC4uLnJlc3BvbnNlIH0pO1xuICB9O1xuICBjb25zdCByenAgPSBuZXcgUmF6b3JwYXkob3B0aW9ucyk7XG5cbiAgLy8gcnpwLm9uKFwicGF5bWVudC5mYWlsZWRcIiwgZnVuY3Rpb24gKGVycm9yKSB7XG4gIC8vICAgc2hvd01vZGFsKHsgc3RhdGU6IFwiZmFpbFwiLCAuLi5lcnJvciB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gcnpwLm9uKFwicGF5bWVudC5lcnJvclwiLCBmdW5jdGlvbiAoZGF0YSkge1xuICAvLyAgIHNob3dNb2RhbCh7IHN0YXRlOiBcImZhaWxcIiwgLi4uZGF0YSB9KTtcbiAgLy8gfSk7XG4gIHJ6cC5vcGVuKCk7XG59XG5cbi8qKlxuICogcmVjaWV2ZSBkYXRhIGZyb20gcG9wdXAgc2NyaXB0XG4gKi9cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnLCBzZW5kZXIsIHJlc3BvbnNlKSA9PiB7XG4gIGlmIChtc2cuZnJvbSA9PT0gXCJwb3B1cFwiKSB7XG4gICAgc3dpdGNoIChtc2cudHlwZSkge1xuICAgICAgY2FzZSBFVkVOVF9UWVBFUy5TRVRfT1BUSU9OUzpcbiAgICAgICAgc2hvd1RvYXN0KHsgdGV4dDogXCJTYXZlZCAhXCIgfSk7XG4gICAgICAgIHJlbW92ZUFuZEFkZExpc3RlbmVyKG9wdGlvbnMuc2VsZWN0b3IsIG1zZy5vcHRpb25zLnNlbGVjdG9yKTtcbiAgICAgICAgb3B0aW9ucyA9IG1zZy5vcHRpb25zO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFVkVOVF9UWVBFUy5UT0dHTEVfSU5TUEVDVE9SOlxuICAgICAgICBoYW5kbGVJbnNwZWN0b3IobXNnKTtcbiAgICAgICAgb3B0aW9ucyA9IG1zZy5vcHRpb25zO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KTtcblxuLyoqXG4gKiByZW1vdmVzIGNsaWNrIGxpc3RlbmVyIHRvIGZpcnN0IHBhcmFtIGFuZCBhZGRzIGxpc3RlbmVyIHRvIHNlY29uZCBwYXJhbVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yVG9SZW1vdmVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvclRvQWRkXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUFuZEFkZExpc3RlbmVyKHNlbGVjdG9yVG9SZW1vdmUsIHNlbGVjdG9yVG9BZGQpIHtcbiAgaWYgKHNlbGVjdG9yVG9SZW1vdmUgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvclRvUmVtb3ZlKSkge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihzZWxlY3RvclRvUmVtb3ZlKVxuICAgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gIH1cblxuICBpZiAoc2VsZWN0b3JUb0FkZCAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yVG9BZGQpKSB7XG4gICAgZG9jdW1lbnRcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yVG9BZGQpXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUNsaWNrKTtcbiAgfVxufVxuXG4vKipcbiAqIEhhbmRsZXMgXCJwaWNrIGZyb20gcGFnZVwiIGFjdGlvbiBmcm9tIHBvcHVwXG4gKiBAcGFyYW0ge09iamVjdH0gbXNnXG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUluc3BlY3Rvcihtc2cpIHtcbiAgZW5hYmxlSW5zcGVjdG9yID0gbXNnLmVuYWJsZUluc3BlY3RvcjtcbiAgLypcbiAgIHRvIGhhdmUgYSBjcm9zc2hhaXIgY3Vyc29yIGZvciBhbGwgZWxlbWVudHNcbiAgIGRpc2FibGVkIGN1cnJlbnRseSBhcyBpdCBoYXMgaXNzdWVzXG4gICovXG4gIC8vIGNvbnN0IGFsbEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipcIik7XG4gIC8vIGlmIChlbmFibGVJbnNwZWN0b3IpIHtcbiAgLy8gICBmb3IgKGNvbnN0IGVsZSBvZiBhbGxFbGVtZW50cykge1xuICAvLyAgICAgZWxlLnNldEF0dHJpYnV0ZShcbiAgLy8gICAgICAgXCJzdHlsZVwiLFxuICAvLyAgICAgICBcImN1cnNvcjogY3Jvc3NoYWlyICFpbXBvcnRhbnQ7IHBvaW50ZXItZXZlbnRzOiBub25lICFpbXBvcnRhbnQ7XCJcbiAgLy8gICAgICk7XG4gIC8vICAgfVxuICAvLyB9IGVsc2Uge1xuICAvLyAgIGZvciAoY29uc3QgZWxlIG9mIGFsbEVsZW1lbnRzKSB7XG4gIC8vICAgICBlbGUucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIik7XG4gIC8vICAgfVxuICAvLyB9XG59XG5cbi8qKlxuICogY2xpY2sgbGlzdGVuZXIgZm9yIGJvZHlcbiAqIC0gdXNlZCB0byBnZXQgdGhlIHNlbGVjdG9yIHZhbHVlIGZyb20gY2xpY2tlZCBlbGVtZW50IChwaWNrIGZyb20gcGFnZSlcbiAqIEBwYXJhbSB7Q2xpY2tFdmVudH0gZXZcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRG9tQ2xpY2soZXYpIHtcbiAgaWYgKGVuYWJsZUluc3BlY3Rvcikge1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBidG5TZWxlY3RvciA9IHF1ZXJ5U2VsZWN0b3JGYWxsYmFjayhldi50YXJnZXQpO1xuXG4gICAgc2hvd1RvYXN0KHsgdGV4dDogXCJDaGVja291dCBsaW5rZWQgIVwiIH0pO1xuXG4gICAgcmVtb3ZlQW5kQWRkTGlzdGVuZXIob3B0aW9ucy5zZWxlY3RvciwgYnRuU2VsZWN0b3IpO1xuXG4gICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF07XG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KFt1cmxdLCAocmVzdWx0KSA9PiB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoe1xuICAgICAgICBbdXJsXToge1xuICAgICAgICAgIC4uLnJlc3VsdFt1cmxdLFxuICAgICAgICAgIGNoZWNrb3V0U2VsZWN0b3I6IGJ0blNlbGVjdG9yLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgZW5hYmxlSW5zcGVjdG9yID0gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2VuZFNjcmFwZWRBbW91bnQoKSB7XG4gIGNvbnN0IGFtb3VudCA9IHNjcmFwZUFtb3VudEZyb21QYWdlKCk7XG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHtcbiAgICBmcm9tOiBcImNvbnRlbnRcIixcbiAgICB0eXBlOiBFVkVOVF9UWVBFUy5TRVRfQU1PVU5ULFxuICAgIHZhbHVlOiBhbW91bnQgfHwgXCJcIixcbiAgfSk7XG59XG5cbi8qKlxuICogIHNvbWUgcGFnZXMgdGFrZSBhIHdoaWxlIHRvIGxvYWQgdGhlIHByaWNlLCAxcyBpcyBhIHJhbmRvbSB2YWx1ZVxuICogIGRvbSBsb2FkIGV2ZW50IGRvZXNuJ3Qgd29yayBoZXJlXG4gKi9cbnNldFRpbWVvdXQoKCkgPT4ge1xuICBzZW5kU2NyYXBlZEFtb3VudCgpO1xufSwgMTAwMCk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKCFkb2N1bWVudC5oaWRkZW4pIHtcbiAgICBzZW5kU2NyYXBlZEFtb3VudCgpO1xuICB9XG59KTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJjbGlja1wiLFxuICAoZXYpID0+IHtcbiAgICBoYW5kbGVEb21DbGljayhldik7XG4gIH0sXG4gIHsgY2FwdHVyZTogdHJ1ZSB9XG4pO1xuIl0sIm5hbWVzIjpbIkVWRU5UX1RZUEVTIiwiU0VUX09QVElPTlMiLCJUT0dHTEVfSU5TUEVDVE9SIiwiU0VUX0FNT1VOVCIsIkdFVF9BTU9VTlQiLCJnZW5lcmF0ZVF1ZXJ5U2VsZWN0b3IiLCJlbCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInN0ciIsImlkIiwiY2xhc3NOYW1lIiwiY2xhc3NlcyIsInNwbGl0IiwiaSIsImxlbmd0aCIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yRmFsbGJhY2siLCJjb250ZXh0IiwiaW5kZXgiLCJwYXRoU2VsZWN0b3IiLCJsb2NhbE5hbWUiLCJnZXRJbmRleCIsIm5vZGUiLCJwcmV2aW91c1NpYmxpbmciLCJub2RlVHlwZSIsImdldFRvYXN0U3R5bGVzIiwiZ2V0TW9kYWxTdHlsZXMiLCJzdHlsZVNoZWV0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJUZXh0IiwiaGVhZCIsImFwcGVuZENoaWxkIiwidG9hc3QiLCJzZXRBdHRyaWJ1dGUiLCJ0ZXh0Q29udGVudCIsImJvZHkiLCJzaG93VG9hc3QiLCJ0ZXh0IiwidGltZSIsIngiLCJnZXRFbGVtZW50QnlJZCIsInNldFRpbWVvdXQiLCJyZXBsYWNlIiwibW9kYWwiLCJnZXRNb2RhbENvbnRlbnQiLCJkYXRhIiwic3RhdGUiLCJyYXpvcnBheV9wYXltZW50X2lkIiwic2hvd01vZGFsIiwiaW5uZXJIVE1MIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwicXVlcnlTZWxlY3RvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJjcmVhdGVSZWNvcmRGcm9tRWxlbWVudCIsImVsZW1lbnQiLCJ0cmltIiwicmVjb3JkIiwiYkJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInkiLCJmb250U2l6ZSIsInBhcnNlSW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImZpbHRlckNvbnRlbnRJbnNpZGVWaWV3cG9ydCIsImVsZW0iLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJjYW5CZVByaWNlIiwidW5kZWZpbmVkIiwibWF0Y2giLCJzY3JhcGVBbW91bnRGcm9tUGFnZSIsImNvbnRlbnQiLCJlbGVtZW50cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJyZWNvcmRzIiwibWFwIiwiZmlsdGVyIiwicmVjb3Jkc1NvcnRlZEJ5Rm9udFNpemUiLCJzb3J0IiwiYSIsImIiLCJwcmljZUluTnVtYmVycyIsIm9wdGlvbnMiLCJlbmFibGVJbnNwZWN0b3IiLCJoYW5kbGVDbGljayIsImV2Iiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJzZWxlY3RvciIsImhhbmRsZXIiLCJyZXNwb25zZSIsInJ6cCIsIlJhem9ycGF5Iiwib3BlbiIsImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsIm1zZyIsInNlbmRlciIsImZyb20iLCJ0eXBlIiwicmVtb3ZlQW5kQWRkTGlzdGVuZXIiLCJoYW5kbGVJbnNwZWN0b3IiLCJzZWxlY3RvclRvUmVtb3ZlIiwic2VsZWN0b3JUb0FkZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJoYW5kbGVEb21DbGljayIsImJ0blNlbGVjdG9yIiwidGFyZ2V0IiwidXJsIiwibG9jYXRpb24iLCJocmVmIiwic3RvcmFnZSIsImxvY2FsIiwiZ2V0IiwicmVzdWx0Iiwic2V0IiwiY2hlY2tvdXRTZWxlY3RvciIsInNlbmRTY3JhcGVkQW1vdW50IiwiYW1vdW50Iiwic2VuZE1lc3NhZ2UiLCJ2YWx1ZSIsImhpZGRlbiIsImNhcHR1cmUiXSwic291cmNlUm9vdCI6IiJ9
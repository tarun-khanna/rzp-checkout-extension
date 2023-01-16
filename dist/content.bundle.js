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
function showToast(text) {
  toast.textContent = text;
  var x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}
var modal = document.createElement("div");
modal.setAttribute("id", "modal");
document.body.appendChild(modal);
var getModalContent = function getModalContent(data) {
  return "\n  <div class=\"content\">\n    <h2>".concat(data.state === "success" ? "Success !" : "Fail", "</h2>\n    <em>Payment ID: ").concat(data.razorpay_payment_id, "</em>\n    <button class=\"close-btn\">X</button>\n  </div>\n  ");
};
function showModal(data) {
  debugger;
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
chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if (msg.from === "popup") {
    switch (msg.type) {
      case _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPES.SET_OPTIONS:
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.showToast)("Saved !");
        handleOptionsListener(msg);
        break;
      case _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPES.TOGGLE_INSPECTOR:
        handleInspector(msg);
      default:
        break;
    }
  }
});
function handleOptionsListener(msg) {
  if (options.selector) {
    document.querySelector(options.selector).removeEventListener("click", handleClick);
  }
  options = msg.options;
  document.querySelector(msg.options.selector).addEventListener("click", handleClick);
}
function handleInspector(msg) {
  enableInspector = msg.enableInspector;
  var allElements = document.querySelectorAll("*");
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
document.addEventListener("click", function (ev) {
  if (enableInspector) {
    ev.stopPropagation();
    ev.preventDefault();

    // let btnSelector = generateQuerySelector(ev.target);
    // if (!document.querySelector(btnSelector)) {
    // }
    var btnSelector = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelectorFallback)(ev.target);
    (0,_utils__WEBPACK_IMPORTED_MODULE_1__.copyTextToClipboard)(btnSelector, function () {
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.showToast)("Copied !");
    });
    enableInspector = false;
  }
}, {
  capture: true
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzhGLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztFQUNsRCxJQUFJdEIsZUFBZSxFQUFFO0lBQ25CO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtFQUFBLENBQ0QsTUFBTTtJQUNMO0lBQ0E7SUFDQTtFQUFBO0FBRUo7QUFFQXhFLFFBQVEsQ0FBQ3NFLGdCQUFnQixDQUN2QixPQUFPLEVBQ1AsVUFBQ0ksRUFBRSxFQUFLO0VBQ04sSUFBSUYsZUFBZSxFQUFFO0lBQ25CRSxFQUFFLENBQUNDLGVBQWUsRUFBRTtJQUNwQkQsRUFBRSxDQUFDRSxjQUFjLEVBQUU7O0lBRW5CO0lBQ0E7SUFDQTtJQUNBLElBQU1tQixXQUFXLEdBQUcxRCw2REFBcUIsQ0FBQ3FDLEVBQUUsQ0FBQ3NCLE1BQU0sQ0FBQztJQUNwRDdFLDJEQUFtQixDQUFDNEUsV0FBVyxFQUFFLFlBQU07TUFDckN6QyxpREFBUyxDQUFDLFVBQVUsQ0FBQztJQUN2QixDQUFDLENBQUM7SUFDRmtCLGVBQWUsR0FBRyxLQUFLO0VBQ3pCO0FBQ0YsQ0FBQyxFQUNEO0VBQUV5QixPQUFPLEVBQUU7QUFBSyxDQUFDLENBQ2xCLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uLy4vY29uc3RhbnRzLmpzIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vLi9zY3JpcHRzL3V0aWxzLmpzIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcnpwLWNoZWNrb3V0LWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3J6cC1jaGVja291dC1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yenAtY2hlY2tvdXQtZXh0ZW5zaW9uLy4vc2NyaXB0cy9jb250ZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBFVkVOVF9UWVBFUyA9IHtcbiAgU0VUX09QVElPTlM6IFwiU0VUX09QVElPTlNcIixcbiAgVE9HR0xFX0lOU1BFQ1RPUjogXCJUT0dHTEVfSU5TUEVDVE9SXCIsXG59O1xuIiwiZnVuY3Rpb24gZmFsbGJhY2tDb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHQpIHtcbiAgY29uc3QgdGV4dEFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIik7XG4gIHRleHRBcmVhLnZhbHVlID0gdGV4dDtcblxuICAvLyBBdm9pZCBzY3JvbGxpbmcgdG8gYm90dG9tXG4gIHRleHRBcmVhLnN0eWxlLnRvcCA9IFwiMFwiO1xuICB0ZXh0QXJlYS5zdHlsZS5sZWZ0ID0gXCIwXCI7XG4gIHRleHRBcmVhLnN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGV4dEFyZWEpO1xuICB0ZXh0QXJlYS5mb2N1cygpO1xuICB0ZXh0QXJlYS5zZWxlY3QoKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWwgPSBkb2N1bWVudC5leGVjQ29tbWFuZChcImNvcHlcIik7XG4gICAgY29uc3QgbXNnID0gc3VjY2Vzc2Z1bCA/IFwic3VjY2Vzc2Z1bFwiIDogXCJ1bnN1Y2Nlc3NmdWxcIjtcbiAgICBjb25zb2xlLmxvZyhcIkZhbGxiYWNrOiBDb3B5aW5nIHRleHQgY29tbWFuZCB3YXMgXCIgKyBtc2cpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmFsbGJhY2s6IE9vcHMsIHVuYWJsZSB0byBjb3B5XCIsIGVycik7XG4gIH1cblxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRleHRBcmVhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUZXh0VG9DbGlwYm9hcmQodGV4dCwgY2IpIHtcbiAgaWYgKCFuYXZpZ2F0b3IuY2xpcGJvYXJkKSB7XG4gICAgZmFsbGJhY2tDb3B5VGV4dFRvQ2xpcGJvYXJkKHRleHQpO1xuICAgIHJldHVybjtcbiAgfVxuICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KS50aGVuKGNiLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgY2IoZXJyKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZVF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbiAoZWwpIHtcbiAgaWYgKGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBcImh0bWxcIikgcmV0dXJuIFwiSFRNTFwiO1xuICBsZXQgc3RyID0gZWwudGFnTmFtZTtcbiAgc3RyICs9IGVsLmlkICE9IFwiXCIgPyBcIiNcIiArIGVsLmlkIDogXCJcIjtcbiAgaWYgKGVsLmNsYXNzTmFtZSkge1xuICAgIGxldCBjbGFzc2VzID0gZWwuY2xhc3NOYW1lLnNwbGl0KC9cXHMvKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0ciArPSBcIi5cIiArIGNsYXNzZXNbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBnZW5lcmF0ZVF1ZXJ5U2VsZWN0b3IoZWwucGFyZW50Tm9kZSkgKyBcIiA+IFwiICsgc3RyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5U2VsZWN0b3JGYWxsYmFjayhjb250ZXh0KSB7XG4gIGxldCBpbmRleCwgcGF0aFNlbGVjdG9yLCBsb2NhbE5hbWU7XG5cbiAgaWYgKGNvbnRleHQgPT0gXCJudWxsXCIpIHRocm93IFwibm90IGFuIGRvbSByZWZlcmVuY2VcIjtcbiAgLy8gY2FsbCBnZXRJbmRleCBmdW5jdGlvblxuICBpbmRleCA9IGdldEluZGV4KGNvbnRleHQpO1xuXG4gIHdoaWxlIChjb250ZXh0LnRhZ05hbWUpIHtcbiAgICAvLyBzZWxlY3RvciBwYXRoXG4gICAgcGF0aFNlbGVjdG9yID0gY29udGV4dC5sb2NhbE5hbWUgKyAocGF0aFNlbGVjdG9yID8gXCI+XCIgKyBwYXRoU2VsZWN0b3IgOiBcIlwiKTtcbiAgICBjb250ZXh0ID0gY29udGV4dC5wYXJlbnROb2RlO1xuICB9XG4gIC8vIHNlbGVjdG9yIHBhdGggZm9yIG50aCBvZiB0eXBlXG4gIHBhdGhTZWxlY3RvciA9IHBhdGhTZWxlY3RvciArIGA6bnRoLW9mLXR5cGUoJHtpbmRleH0pYDtcbiAgcmV0dXJuIHBhdGhTZWxlY3Rvcjtcbn1cblxuLy8gZ2V0IGluZGV4IGZvciBudGggb2YgdHlwZSBlbGVtZW50XG5mdW5jdGlvbiBnZXRJbmRleChub2RlKSB7XG4gIGxldCBpID0gMTtcbiAgbGV0IHRhZ05hbWUgPSBub2RlLnRhZ05hbWU7XG5cbiAgd2hpbGUgKG5vZGUucHJldmlvdXNTaWJsaW5nKSB7XG4gICAgbm9kZSA9IG5vZGUucHJldmlvdXNTaWJsaW5nO1xuICAgIGlmIChcbiAgICAgIG5vZGUubm9kZVR5cGUgPT09IDEgJiZcbiAgICAgIHRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PSBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgICkge1xuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvYXN0U3R5bGVzKCkge1xuICByZXR1cm4gYFxuICAjdG9hc3QgIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgbWluLXdpZHRoOiAyNTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDQwMGZmO1xuICAgIGJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yNCkgMHB4IDNweCA4cHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDEwMDAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgYm90dG9tOiAzMHB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuICBcbiAgI3RvYXN0LnNob3cge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgLXdlYmtpdC1hbmltYXRpb246IGZhZGVpbiAwLjVzLCBmYWRlb3V0IDAuNXMgMi41cztcbiAgICBhbmltYXRpb246IGZhZGVpbiAwLjVzLCBmYWRlb3V0IDAuNXMgMi41cztcbiAgfVxuICBcbiAgQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XG4gICAgZnJvbSB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO30gXG4gICAgdG8ge2JvdHRvbTogMzBweDsgb3BhY2l0eTogMTt9XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgZmFkZWluIHtcbiAgICBmcm9tIHtib3R0b206IDA7IG9wYWNpdHk6IDA7fVxuICAgIHRvIHtib3R0b206IDMwcHg7IG9wYWNpdHk6IDE7fVxuICB9XG4gIFxuICBALXdlYmtpdC1rZXlmcmFtZXMgZmFkZW91dCB7XG4gICAgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO30gXG4gICAgdG8ge2JvdHRvbTogMDsgb3BhY2l0eTogMDt9XG4gIH1cbiAgXG4gIEBrZXlmcmFtZXMgZmFkZW91dCB7XG4gICAgZnJvbSB7Ym90dG9tOiAzMHB4OyBvcGFjaXR5OiAxO31cbiAgICB0byB7Ym90dG9tOiAwOyBvcGFjaXR5OiAwO31cbiAgfVxuICBgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kYWxTdHlsZXMoKSB7XG4gIHJldHVybiBgXG4gICNtb2RhbCB7XG4gICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgIG1pbi13aWR0aDogMjUwcHg7XG4gICAgYm94LXNoYWRvdzogcmdiYSgwLCAwLCAwLCAwLjI0KSAwcHggM3B4IDhweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDEwMDAwO1xuICAgIGxlZnQ6IDUwJTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAjbW9kYWwgaDIge1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIH1cblxuICAjbW9kYWwuc3VjY2VzcyB7XG4gICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkICM2RUNEMjg7XG4gIH1cblxuICAjbW9kYWwuZmFpbCB7XG4gICAgYm9yZGVyLXRvcDogOHB4IHNvbGlkICNDRDI4Mjg7XG4gIH1cblxuICAuY2xvc2UtYnRuIHtcbiAgICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIGhlaWdodDogMjVweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNHB4O1xuICAgIHJpZ2h0OiA0cHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9XG5cbiAgI21vZGFsIC5jb250ZW50IHtcbiAgICBtaW4taGVpZ2h0OiAxMDBweDtcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xuICB9XG4gIFxuICAjbW9kYWwuc2hvdyB7XG4gICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgICAtd2Via2l0LWFuaW1hdGlvbjogZmFkZWluIDAuNXM7XG4gICAgYW5pbWF0aW9uOiBmYWRlaW4gMC41cztcbiAgfVxuICBcbiAgQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XG4gICAgZnJvbSB7dHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoMCUpOyBvcGFjaXR5OiAwO30gXG4gICAgdG8ge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpOyBvcGFjaXR5OiAxO31cbiAgfVxuICBcbiAgQGtleWZyYW1lcyBmYWRlaW4ge1xuICAgIGZyb20ge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKDAlKTsgb3BhY2l0eTogMDt9XG4gICAgdG8ge3RyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKC01MCUpOyBvcGFjaXR5OiAxO31cbiAgfVxuXG4gICNtb2RhbC5oaWRlIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cblxuICBgO1xufVxuXG5jb25zdCBzdHlsZVNoZWV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuc3R5bGVTaGVldC5pbm5lclRleHQgPSBgJHtnZXRUb2FzdFN0eWxlcygpfSAke2dldE1vZGFsU3R5bGVzKCl9YDtcbmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVTaGVldCk7XG5cbmNvbnN0IHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbnRvYXN0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwidG9hc3RcIik7XG50b2FzdC50ZXh0Q29udGVudCA9IFwiQ29waWVkICFcIjtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9hc3QpO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvd1RvYXN0KHRleHQpIHtcbiAgdG9hc3QudGV4dENvbnRlbnQgPSB0ZXh0O1xuICBjb25zdCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0b2FzdFwiKTtcbiAgeC5jbGFzc05hbWUgPSBcInNob3dcIjtcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgeC5jbGFzc05hbWUgPSB4LmNsYXNzTmFtZS5yZXBsYWNlKFwic2hvd1wiLCBcIlwiKTtcbiAgfSwgMzAwMCk7XG59XG5cbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbm1vZGFsLnNldEF0dHJpYnV0ZShcImlkXCIsIFwibW9kYWxcIik7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG1vZGFsKTtcblxuY29uc3QgZ2V0TW9kYWxDb250ZW50ID0gKGRhdGEpID0+IHtcbiAgcmV0dXJuIGBcbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj5cbiAgICA8aDI+JHtkYXRhLnN0YXRlID09PSBcInN1Y2Nlc3NcIiA/IFwiU3VjY2VzcyAhXCIgOiBcIkZhaWxcIn08L2gyPlxuICAgIDxlbT5QYXltZW50IElEOiAke2RhdGEucmF6b3JwYXlfcGF5bWVudF9pZH08L2VtPlxuICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZS1idG5cIj5YPC9idXR0b24+XG4gIDwvZGl2PlxuICBgO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dNb2RhbChkYXRhKSB7XG4gIGRlYnVnZ2VyO1xuICBjb25zdCB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgeC5pbm5lckhUTUwgPSBnZXRNb2RhbENvbnRlbnQoZGF0YSk7XG4gIHguY2xhc3NMaXN0LnJlbW92ZShcImhpZGVcIik7XG4gIGlmIChkYXRhLnN0YXRlID09PSBcInN1Y2Nlc3NcIikge1xuICAgIHguY2xhc3NMaXN0LmFkZChcInNob3dcIiwgXCJzdWNjZXNzXCIpO1xuICB9IGVsc2Uge1xuICAgIHguY2xhc3NMaXN0LmFkZChcInNob3dcIiwgXCJmYWlsXCIpO1xuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbCAuY2xvc2UtYnRuXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgY29uc3QgeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIik7XG4gICAgeC5jbGFzc05hbWUgPSBcImhpZGVcIjtcbiAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IEVWRU5UX1RZUEVTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHtcbiAgY29weVRleHRUb0NsaXBib2FyZCxcbiAgZ2VuZXJhdGVRdWVyeVNlbGVjdG9yLFxuICBxdWVyeVNlbGVjdG9yRmFsbGJhY2ssXG4gIHNob3dNb2RhbCxcbiAgc2hvd1RvYXN0LFxufSBmcm9tIFwiLi91dGlsc1wiO1xuXG5sZXQgb3B0aW9ucyA9IHt9O1xubGV0IGVuYWJsZUluc3BlY3RvciA9IGZhbHNlO1xuXG5mdW5jdGlvbiBoYW5kbGVDbGljayhldikge1xuICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgZGVsZXRlIG9wdGlvbnMuc2VsZWN0b3I7XG5cbiAgb3B0aW9ucy5oYW5kbGVyID0gKHJlc3BvbnNlKSA9PiB7XG4gICAgc2hvd01vZGFsKHsgc3RhdGU6IFwic3VjY2Vzc1wiLCAuLi5yZXNwb25zZSB9KTtcbiAgfTtcbiAgY29uc3QgcnpwID0gbmV3IFJhem9ycGF5KG9wdGlvbnMpO1xuXG4gIC8vIHJ6cC5vbihcInBheW1lbnQuZmFpbGVkXCIsIGZ1bmN0aW9uIChlcnJvcikge1xuICAvLyAgIHNob3dNb2RhbCh7IHN0YXRlOiBcImZhaWxcIiwgLi4uZXJyb3IgfSk7XG4gIC8vIH0pO1xuXG4gIC8vIHJ6cC5vbihcInBheW1lbnQuZXJyb3JcIiwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgLy8gICBzaG93TW9kYWwoeyBzdGF0ZTogXCJmYWlsXCIsIC4uLmRhdGEgfSk7XG4gIC8vIH0pO1xuICByenAub3BlbigpO1xufVxuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1zZywgc2VuZGVyLCByZXNwb25zZSkgPT4ge1xuICBpZiAobXNnLmZyb20gPT09IFwicG9wdXBcIikge1xuICAgIHN3aXRjaCAobXNnLnR5cGUpIHtcbiAgICAgIGNhc2UgRVZFTlRfVFlQRVMuU0VUX09QVElPTlM6XG4gICAgICAgIHNob3dUb2FzdChcIlNhdmVkICFcIik7XG4gICAgICAgIGhhbmRsZU9wdGlvbnNMaXN0ZW5lcihtc2cpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFVkVOVF9UWVBFUy5UT0dHTEVfSU5TUEVDVE9SOlxuICAgICAgICBoYW5kbGVJbnNwZWN0b3IobXNnKTtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59KTtcblxuZnVuY3Rpb24gaGFuZGxlT3B0aW9uc0xpc3RlbmVyKG1zZykge1xuICBpZiAob3B0aW9ucy5zZWxlY3Rvcikge1xuICAgIGRvY3VtZW50XG4gICAgICAucXVlcnlTZWxlY3RvcihvcHRpb25zLnNlbGVjdG9yKVxuICAgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gIH1cblxuICBvcHRpb25zID0gbXNnLm9wdGlvbnM7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IobXNnLm9wdGlvbnMuc2VsZWN0b3IpXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUluc3BlY3Rvcihtc2cpIHtcbiAgZW5hYmxlSW5zcGVjdG9yID0gbXNnLmVuYWJsZUluc3BlY3RvcjtcbiAgY29uc3QgYWxsRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKlwiKTtcbiAgaWYgKGVuYWJsZUluc3BlY3Rvcikge1xuICAgIC8vIGZvciAoY29uc3QgZWxlIG9mIGFsbEVsZW1lbnRzKSB7XG4gICAgLy8gICBlbGUuc2V0QXR0cmlidXRlKFxuICAgIC8vICAgICBcInN0eWxlXCIsXG4gICAgLy8gICAgIFwiY3Vyc29yOiBjcm9zc2hhaXIgIWltcG9ydGFudDsgcG9pbnRlci1ldmVudHM6IG5vbmUgIWltcG9ydGFudDtcIlxuICAgIC8vICAgKTtcbiAgICAvLyB9XG4gIH0gZWxzZSB7XG4gICAgLy8gZm9yIChjb25zdCBlbGUgb2YgYWxsRWxlbWVudHMpIHtcbiAgICAvLyAgIGVsZS5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAvLyB9XG4gIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJjbGlja1wiLFxuICAoZXYpID0+IHtcbiAgICBpZiAoZW5hYmxlSW5zcGVjdG9yKSB7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIC8vIGxldCBidG5TZWxlY3RvciA9IGdlbmVyYXRlUXVlcnlTZWxlY3Rvcihldi50YXJnZXQpO1xuICAgICAgLy8gaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJ0blNlbGVjdG9yKSkge1xuICAgICAgLy8gfVxuICAgICAgY29uc3QgYnRuU2VsZWN0b3IgPSBxdWVyeVNlbGVjdG9yRmFsbGJhY2soZXYudGFyZ2V0KTtcbiAgICAgIGNvcHlUZXh0VG9DbGlwYm9hcmQoYnRuU2VsZWN0b3IsICgpID0+IHtcbiAgICAgICAgc2hvd1RvYXN0KFwiQ29waWVkICFcIik7XG4gICAgICB9KTtcbiAgICAgIGVuYWJsZUluc3BlY3RvciA9IGZhbHNlO1xuICAgIH1cbiAgfSxcbiAgeyBjYXB0dXJlOiB0cnVlIH1cbik7XG4iXSwibmFtZXMiOlsiRVZFTlRfVFlQRVMiLCJTRVRfT1BUSU9OUyIsIlRPR0dMRV9JTlNQRUNUT1IiLCJmYWxsYmFja0NvcHlUZXh0VG9DbGlwYm9hcmQiLCJ0ZXh0IiwidGV4dEFyZWEiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ2YWx1ZSIsInN0eWxlIiwidG9wIiwibGVmdCIsInBvc2l0aW9uIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZm9jdXMiLCJzZWxlY3QiLCJzdWNjZXNzZnVsIiwiZXhlY0NvbW1hbmQiLCJtc2ciLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiZXJyb3IiLCJyZW1vdmVDaGlsZCIsImNvcHlUZXh0VG9DbGlwYm9hcmQiLCJjYiIsIm5hdmlnYXRvciIsImNsaXBib2FyZCIsIndyaXRlVGV4dCIsInRoZW4iLCJnZW5lcmF0ZVF1ZXJ5U2VsZWN0b3IiLCJlbCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInN0ciIsImlkIiwiY2xhc3NOYW1lIiwiY2xhc3NlcyIsInNwbGl0IiwiaSIsImxlbmd0aCIsInBhcmVudE5vZGUiLCJxdWVyeVNlbGVjdG9yRmFsbGJhY2siLCJjb250ZXh0IiwiaW5kZXgiLCJwYXRoU2VsZWN0b3IiLCJsb2NhbE5hbWUiLCJnZXRJbmRleCIsIm5vZGUiLCJwcmV2aW91c1NpYmxpbmciLCJub2RlVHlwZSIsImdldFRvYXN0U3R5bGVzIiwiZ2V0TW9kYWxTdHlsZXMiLCJzdHlsZVNoZWV0IiwiaW5uZXJUZXh0IiwiaGVhZCIsInRvYXN0Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJzaG93VG9hc3QiLCJ4IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZXRUaW1lb3V0IiwicmVwbGFjZSIsIm1vZGFsIiwiZ2V0TW9kYWxDb250ZW50IiwiZGF0YSIsInN0YXRlIiwicmF6b3JwYXlfcGF5bWVudF9pZCIsInNob3dNb2RhbCIsImlubmVySFRNTCIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwib3B0aW9ucyIsImVuYWJsZUluc3BlY3RvciIsImhhbmRsZUNsaWNrIiwiZXYiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsInNlbGVjdG9yIiwiaGFuZGxlciIsInJlc3BvbnNlIiwicnpwIiwiUmF6b3JwYXkiLCJvcGVuIiwiY2hyb21lIiwicnVudGltZSIsIm9uTWVzc2FnZSIsImFkZExpc3RlbmVyIiwic2VuZGVyIiwiZnJvbSIsInR5cGUiLCJoYW5kbGVPcHRpb25zTGlzdGVuZXIiLCJoYW5kbGVJbnNwZWN0b3IiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWxsRWxlbWVudHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYnRuU2VsZWN0b3IiLCJ0YXJnZXQiLCJjYXB0dXJlIl0sInNvdXJjZVJvb3QiOiIifQ==
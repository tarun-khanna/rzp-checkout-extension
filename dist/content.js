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
const EVENT_TYPES = {
  SET_OPTIONS: "SET_OPTIONS",
  TOGGLE_INSPECTOR: "TOGGLE_INSPECTOR",
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
/* harmony export */   "getToastStyles": () => (/* binding */ getToastStyles),
/* harmony export */   "querySelectorFallback": () => (/* binding */ querySelectorFallback),
/* harmony export */   "showToast": () => (/* binding */ showToast)
/* harmony export */ });
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
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

const generateQuerySelector = function (el) {
  if (el.tagName.toLowerCase() == "html") return "HTML";
  let str = el.tagName;
  str += el.id != "" ? "#" + el.id : "";
  if (el.className) {
    let classes = el.className.split(/\s/);
    for (let i = 0; i < classes.length; i++) {
      str += "." + classes[i];
    }
  }
  return generateQuerySelector(el.parentNode) + " > " + str;
};

function querySelectorFallback(context) {
  let index, pathSelector, localName;

  if (context == "null") throw "not an dom reference";
  // call getIndex function
  index = getIndex(context);

  while (context.tagName) {
    // selector path
    pathSelector = context.localName + (pathSelector ? ">" + pathSelector : "");
    context = context.parentNode;
  }
  // selector path for nth of type
  pathSelector = pathSelector + `:nth-of-type(${index})`;
  return pathSelector;
}

// get index for nth of type element
function getIndex(node) {
  let i = 1;
  let tagName = node.tagName;

  while (node.previousSibling) {
    node = node.previousSibling;
    if (
      node.nodeType === 1 &&
      tagName.toLowerCase() == node.tagName.toLowerCase()
    ) {
      i++;
    }
  }
  return i;
}

function getToastStyles() {
  return `
  #toast {
    visibility: hidden;
    min-width: 250px;
    margin-left: -200px;
    background-color: #0400ff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: white;
    text-align: center;
    border-radius: 10px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 16px;
  }
  
  #toast.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
  }
  
  @-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
  }
  
  @keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
  }
  
  @-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
  }
  
  @keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
  }
  `;
}

const styles = getToastStyles();

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const toast = document.createElement("div");
toast.setAttribute("id", "toast");
toast.textContent = "Copied !";
document.body.appendChild(toast);

function showToast(text) {
  toast.textContent = text;
  const x = document.getElementById("toast");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
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

      // let btnSelector = generateQuerySelector(ev.target);
      // if (!document.querySelector(btnSelector)) {
      // }
      const btnSelector = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.querySelectorFallback)(ev.target);
      (0,_utils__WEBPACK_IMPORTED_MODULE_1__.copyTextToClipboard)(btnSelector, () => {
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.showToast)("Copied !");
      });
      enableInspector = false;
    }
  },
  { capture: true }
);

})();

/******/ })()
;
//# sourceMappingURL=content.js.map
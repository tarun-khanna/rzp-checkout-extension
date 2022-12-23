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
/*!************************!*\
  !*** ./popup/popup.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./constants.js");


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
        type: _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPES.SET_OPTIONS,
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
        type: _constants__WEBPACK_IMPORTED_MODULE_0__.EVENT_TYPES.TOGGLE_INSPECTOR,
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

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "@wordpress/i18n"
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
(module) {

module.exports = wp.i18n;

/***/ }

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./resources/src/jsx/i18n.jsx ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __: () => (/* binding */ __),
/* harmony export */   _n: () => (/* binding */ _n),
/* harmony export */   _n_noop: () => (/* binding */ _n_noop),
/* harmony export */   _nx: () => (/* binding */ _nx),
/* harmony export */   _nx_noop: () => (/* binding */ _nx_noop),
/* harmony export */   _x: () => (/* binding */ _x),
/* harmony export */   isRTL: () => (/* binding */ isRTL),
/* harmony export */   sprintf: () => (/* binding */ sprintf)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * I18n.jsx
 *
 * This file provides internationalization (i18n) functionality for PublishPress Hub.
 * It allow to centralize translations in a single .pot file, avoiding the need to pass
 * strings through global objects. WordPress i18n functions serve as fallback.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


const data = (() => {
  const free = window.publishpressHubI18n?.data || {};
  const pro = window.publishpressHubProI18n ? window.publishpressHubProI18n?.data || {} : {};
  const merged = {};
  const domains = new Set([...Object.keys(free.locale_data || {}), ...Object.keys(pro.locale_data || {})]);
  domains.forEach(domain => {
    merged[domain] = {
      ...((free.locale_data || {})[domain] || {}),
      ...((pro.locale_data || {})[domain] || {})
    };
  });
  return {
    locale_data: merged
  };
})();
const __ = (text, domain = null) => {
  if (domain && data.locale_data?.[domain]?.[text]) {
    return data.locale_data[domain][text][0];
  }
  for (const key in data.locale_data) {
    if (data.locale_data[key]?.[text]) {
      return data.locale_data[key][text][0];
    }
  }
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(text, domain);
};
const sprintf = (text, ...args) => {
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.sprintf)(text, ...args);
};
const isRTL = () => {
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.isRTL)();
};
const _n = (single, plural, number, domain = null) => {
  single = __(single, domain);
  plural = __(plural, domain);
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n)(single, plural, number, domain);
};
const _x = (text, context, domain = null) => {
  text = __(text, domain);
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._x)(text, context, domain);
};
const _nx = (single, plural, number, context, domain = null) => {
  single = __(single, domain);
  plural = __(plural, domain);
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._nx)(single, plural, number, context, domain);
};
const _n_noop = (single, plural, domain = null) => {
  single = __(single, domain);
  plural = __(plural, domain);
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._n_noop)(single, plural, domain);
};
const _nx_noop = (single, plural, context, domain = null) => {
  single = __(single, domain);
  plural = __(plural, domain);
  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__._nx_noop)(single, plural, context, domain);
};
if (typeof window.publishpressHub === 'undefined') {
  window.publishpressHub = {};
}
if (typeof window.publishpressHub.i18n === 'undefined') {
  window.publishpressHub.i18n = {};
}
window.publishpressHub.i18n.__ = __;
window.publishpressHub.i18n.sprintf = sprintf;
window.publishpressHub.i18n.isRTL = isRTL;
window.publishpressHub.i18n._n = _n;
window.publishpressHub.i18n._x = _x;
window.publishpressHub.i18n._nx = _nx;
window.publishpressHub.i18n._n_noop = _n_noop;
window.publishpressHub.i18n._nx_noop = _nx_noop;
})();

/******/ })()
;
//# sourceMappingURL=i18n.js.map
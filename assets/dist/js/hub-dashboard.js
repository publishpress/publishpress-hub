/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/jsx/components/AdminPage/AdminPageContainer.jsx":
/*!****************************************************************!*\
  !*** ./assets/jsx/components/AdminPage/AdminPageContainer.jsx ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageContainer: () => (/* binding */ AdminPageContainer)
/* harmony export */ });
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/main.css */ "./assets/jsx/css/main.css");

var AdminPageContainer = function AdminPageContainer(_ref) {
  var _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'contained' : _ref$variant,
    children = _ref.children;
  var baseClass = 'pp-hub-admin-page-container';
  var variantClass = "pp-hub-".concat(variant);
  var combinedClassName = "".concat(baseClass, " ").concat(variantClass, " pp-hub-root ").concat(className).trim();
  return /*#__PURE__*/React.createElement("div", {
    id: "publishpress-hub-admin-page-container",
    className: combinedClassName,
    "data-theme": "default"
  }, children);
};

/***/ }),

/***/ "./assets/jsx/components/PluginsDashboard.jsx":
/*!****************************************************!*\
  !*** ./assets/jsx/components/PluginsDashboard.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginsDashboard: () => (/* binding */ PluginsDashboard)
/* harmony export */ });
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _AdminPage_AdminPageContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AdminPage/AdminPageContainer */ "./assets/jsx/components/AdminPage/AdminPageContainer.jsx");


var PluginsDashboard = function PluginsDashboard() {
  return /*#__PURE__*/React.createElement(_AdminPage_AdminPageContainer__WEBPACK_IMPORTED_MODULE_1__.AdminPageContainer, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Plugins Dashboard', 'publishpress-hub'),
    logoUrl: window.publishpressHubDashboardConfig.logoUrl
  });
};

/***/ }),

/***/ "./assets/jsx/css/main.css":
/*!*********************************!*\
  !*** ./assets/jsx/css/main.css ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../../../node_modules/postcss-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./assets/jsx/css/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_postcss_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/AdminPage/AdminPageContainer.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/AdminPage/AdminPageContainer.css ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* AdminPageContainer Component */

.pp-hub-admin-page-container {
    min-height: 100vh;
    background-color: var(--pp-hub-bg-primary);
    font-family: var(--pp-hub-font-family-primary);
    color: var(--pp-hub-text-primary);
}

.pp-hub-admin-page-container.pp-hub-fullwidth {
    width: 100%;
    margin: 0;
    padding: 0;
}

.pp-hub-admin-page-container.pp-hub-contained {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--pp-hub-spacing-lg);
}

/* Content area styling */
.pp-hub-admin-page-container__content {
    padding: var(--pp-hub-spacing-xl);
    background-color: var(--pp-hub-bg-primary);
    border-radius: var(--pp-hub-radius-lg);
    box-shadow: var(--pp-hub-shadow-sm);
}

/* WordPress admin body reset */
.pp-hub-admin-page-container #wpcontent {
    padding-left: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .pp-hub-admin-page-container.pp-hub-contained {
        padding: var(--pp-hub-spacing-md);
    }

    .pp-hub-admin-page-container__content {
        padding: var(--pp-hub-spacing-lg);
        border-radius: var(--pp-hub-radius-md);
    }
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/components/AdminPage/AdminPageContainer.css"],"names":[],"mappings":"AAAA,iCAAiC;;AAEjC;IACI,iBAAiB;IACjB,0CAA0C;IAC1C,8CAA8C;IAC9C,iCAAiC;AACrC;;AAEA;IACI,WAAW;IACX,SAAS;IACT,UAAU;AACd;;AAEA;IACI,iBAAiB;IACjB,cAAc;IACd,iCAAiC;AACrC;;AAEA,yBAAyB;AACzB;IACI,iCAAiC;IACjC,0CAA0C;IAC1C,sCAAsC;IACtC,mCAAmC;AACvC;;AAEA,+BAA+B;AAC/B;IACI,eAAe;AACnB;;AAEA,2BAA2B;AAC3B;IACI;QACI,iCAAiC;IACrC;;IAEA;QACI,iCAAiC;QACjC,sCAAsC;IAC1C;AACJ","sourcesContent":["/* AdminPageContainer Component */\n\n.pp-hub-admin-page-container {\n    min-height: 100vh;\n    background-color: var(--pp-hub-bg-primary);\n    font-family: var(--pp-hub-font-family-primary);\n    color: var(--pp-hub-text-primary);\n}\n\n.pp-hub-admin-page-container.pp-hub-fullwidth {\n    width: 100%;\n    margin: 0;\n    padding: 0;\n}\n\n.pp-hub-admin-page-container.pp-hub-contained {\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: var(--pp-hub-spacing-lg);\n}\n\n/* Content area styling */\n.pp-hub-admin-page-container__content {\n    padding: var(--pp-hub-spacing-xl);\n    background-color: var(--pp-hub-bg-primary);\n    border-radius: var(--pp-hub-radius-lg);\n    box-shadow: var(--pp-hub-shadow-sm);\n}\n\n/* WordPress admin body reset */\n.pp-hub-admin-page-container #wpcontent {\n    padding-left: 0;\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n    .pp-hub-admin-page-container.pp-hub-contained {\n        padding: var(--pp-hub-spacing-md);\n    }\n\n    .pp-hub-admin-page-container__content {\n        padding: var(--pp-hub-spacing-lg);\n        border-radius: var(--pp-hub-radius-md);\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/AdminPage/AdminPageHeader.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/AdminPage/AdminPageHeader.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* AdminPageHeader Component */

.pp-hub-admin-page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--pp-hub-spacing-xl) var(--pp-hub-spacing-2xl);
    background-color: var(--pp-hub-bg-primary);
    border-bottom: 1px solid var(--pp-hub-border-primary);
    margin-bottom: var(--pp-hub-spacing-xl);
}

.pp-hub-admin-page-header__logo {
    height: 32px;
    width: auto;
    margin-right: var(--pp-hub-spacing-lg);
}

.pp-hub-admin-page-header__content {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: var(--pp-hub-spacing-lg);
}

.pp-hub-admin-page-header__title {
    font-size: var(--pp-hub-font-size-2xl);
    font-weight: var(--pp-hub-font-weight-bold);
    color: var(--pp-hub-text-primary);
    margin: 0;
    line-height: var(--pp-hub-line-height-tight);
}

.pp-hub-admin-page-header__description {
    font-size: var(--pp-hub-font-size-md);
    color: var(--pp-hub-text-secondary);
    margin: var(--pp-hub-spacing-xs) 0 0 0;
    line-height: var(--pp-hub-line-height-normal);
}

.pp-hub-admin-page-header__actions {
    display: flex;
    align-items: center;
    gap: var(--pp-hub-spacing-md);
}

/* Responsive design */
@media (max-width: 768px) {
    .pp-hub-admin-page-header {
        flex-direction: column;
        align-items: flex-start;
        padding: var(--pp-hub-spacing-lg);
    }

    .pp-hub-admin-page-header__logo {
        margin-bottom: var(--pp-hub-spacing-md);
        margin-right: 0;
    }

    .pp-hub-admin-page-header__content {
        margin-right: 0;
        margin-bottom: var(--pp-hub-spacing-md);
        width: 100%;
    }

    .pp-hub-admin-page-header__actions {
        width: 100%;
        justify-content: flex-end;
    }

    .pp-hub-admin-page-header__title {
        font-size: var(--pp-hub-font-size-xl);
    }
}

/* Compact variant */
.pp-hub-admin-page-header--compact {
    padding: var(--pp-hub-spacing-lg) var(--pp-hub-spacing-xl);
}

.pp-hub-admin-page-header--compact .pp-hub-admin-page-header__title {
    font-size: var(--pp-hub-font-size-xl);
}

.pp-hub-admin-page-header--compact .pp-hub-admin-page-header__logo {
    height: 24px;
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/components/AdminPage/AdminPageHeader.css"],"names":[],"mappings":"AAAA,8BAA8B;;AAE9B;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,2DAA2D;IAC3D,0CAA0C;IAC1C,qDAAqD;IACrD,uCAAuC;AAC3C;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,sCAAsC;AAC1C;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,OAAO;IACP,sCAAsC;AAC1C;;AAEA;IACI,sCAAsC;IACtC,2CAA2C;IAC3C,iCAAiC;IACjC,SAAS;IACT,4CAA4C;AAChD;;AAEA;IACI,qCAAqC;IACrC,mCAAmC;IACnC,sCAAsC;IACtC,6CAA6C;AACjD;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,6BAA6B;AACjC;;AAEA,sBAAsB;AACtB;IACI;QACI,sBAAsB;QACtB,uBAAuB;QACvB,iCAAiC;IACrC;;IAEA;QACI,uCAAuC;QACvC,eAAe;IACnB;;IAEA;QACI,eAAe;QACf,uCAAuC;QACvC,WAAW;IACf;;IAEA;QACI,WAAW;QACX,yBAAyB;IAC7B;;IAEA;QACI,qCAAqC;IACzC;AACJ;;AAEA,oBAAoB;AACpB;IACI,0DAA0D;AAC9D;;AAEA;IACI,qCAAqC;AACzC;;AAEA;IACI,YAAY;AAChB","sourcesContent":["/* AdminPageHeader Component */\n\n.pp-hub-admin-page-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: var(--pp-hub-spacing-xl) var(--pp-hub-spacing-2xl);\n    background-color: var(--pp-hub-bg-primary);\n    border-bottom: 1px solid var(--pp-hub-border-primary);\n    margin-bottom: var(--pp-hub-spacing-xl);\n}\n\n.pp-hub-admin-page-header__logo {\n    height: 32px;\n    width: auto;\n    margin-right: var(--pp-hub-spacing-lg);\n}\n\n.pp-hub-admin-page-header__content {\n    display: flex;\n    flex-direction: column;\n    flex: 1;\n    margin-right: var(--pp-hub-spacing-lg);\n}\n\n.pp-hub-admin-page-header__title {\n    font-size: var(--pp-hub-font-size-2xl);\n    font-weight: var(--pp-hub-font-weight-bold);\n    color: var(--pp-hub-text-primary);\n    margin: 0;\n    line-height: var(--pp-hub-line-height-tight);\n}\n\n.pp-hub-admin-page-header__description {\n    font-size: var(--pp-hub-font-size-md);\n    color: var(--pp-hub-text-secondary);\n    margin: var(--pp-hub-spacing-xs) 0 0 0;\n    line-height: var(--pp-hub-line-height-normal);\n}\n\n.pp-hub-admin-page-header__actions {\n    display: flex;\n    align-items: center;\n    gap: var(--pp-hub-spacing-md);\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n    .pp-hub-admin-page-header {\n        flex-direction: column;\n        align-items: flex-start;\n        padding: var(--pp-hub-spacing-lg);\n    }\n\n    .pp-hub-admin-page-header__logo {\n        margin-bottom: var(--pp-hub-spacing-md);\n        margin-right: 0;\n    }\n\n    .pp-hub-admin-page-header__content {\n        margin-right: 0;\n        margin-bottom: var(--pp-hub-spacing-md);\n        width: 100%;\n    }\n\n    .pp-hub-admin-page-header__actions {\n        width: 100%;\n        justify-content: flex-end;\n    }\n\n    .pp-hub-admin-page-header__title {\n        font-size: var(--pp-hub-font-size-xl);\n    }\n}\n\n/* Compact variant */\n.pp-hub-admin-page-header--compact {\n    padding: var(--pp-hub-spacing-lg) var(--pp-hub-spacing-xl);\n}\n\n.pp-hub-admin-page-header--compact .pp-hub-admin-page-header__title {\n    font-size: var(--pp-hub-font-size-xl);\n}\n\n.pp-hub-admin-page-header--compact .pp-hub-admin-page-header__logo {\n    height: 24px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/Buttons/HelpButton.css":
/*!************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/Buttons/HelpButton.css ***!
  \************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* HelpButton Component */

.pp-hub-help-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--pp-hub-spacing-sm) var(--pp-hub-spacing-lg);
    font-size: var(--pp-hub-font-size-sm);
    font-weight: var(--pp-hub-font-weight-medium);
    line-height: 1;
    text-decoration: none;
    border: 1px solid var(--pp-hub-border-primary);
    border-radius: var(--pp-hub-radius-md);
    background-color: var(--pp-hub-bg-primary);
    color: var(--pp-hub-text-primary);
    cursor: pointer;
    transition: all var(--pp-hub-transition-fast);
    user-select: none;
}

/* Hover state */
.pp-hub-help-button:hover {
    background-color: var(--pp-hub-bg-secondary);
    border-color: var(--pp-hub-border-secondary);
    transform: translateY(-1px);
    box-shadow: var(--pp-hub-shadow-sm);
}

/* Focus state */
.pp-hub-help-button:focus {
    outline: 2px solid var(--pp-hub-border-focus);
    outline-offset: 2px;
}

/* Active state */
.pp-hub-help-button:active {
    transform: translateY(0);
    box-shadow: none;
}

/* Primary variant */
.pp-hub-help-button--primary {
    background-color: var(--pp-hub-primary-color);
    color: var(--pp-hub-text-inverse);
    border-color: var(--pp-hub-primary-color);
}

.pp-hub-help-button--primary:hover {
    background-color: var(--pp-hub-tertiary-color);
    border-color: var(--pp-hub-tertiary-color);
}

/* Secondary variant */
.pp-hub-help-button--secondary {
    background-color: var(--pp-hub-secondary-color);
    color: var(--pp-hub-text-primary);
    border-color: var(--pp-hub-secondary-color);
}

.pp-hub-help-button--secondary:hover {
    background-color: #e6a000;
    border-color: #e6a000;
}

/* Ghost variant */
.pp-hub-help-button--ghost {
    background-color: transparent;
    border-color: transparent;
    color: var(--pp-hub-text-secondary);
}

.pp-hub-help-button--ghost:hover {
    background-color: var(--pp-hub-bg-secondary);
    color: var(--pp-hub-text-primary);
}

/* Sizes */
.pp-hub-help-button--small {
    padding: var(--pp-hub-spacing-xs) var(--pp-hub-spacing-md);
    font-size: var(--pp-hub-font-size-xs);
}

.pp-hub-help-button--large {
    padding: var(--pp-hub-spacing-md) var(--pp-hub-spacing-xl);
    font-size: var(--pp-hub-font-size-lg);
}

/* Disabled state */
.pp-hub-help-button:disabled,
.pp-hub-help-button--disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
}

/* Icon styling */
.pp-hub-help-button__icon {
    width: 16px;
    height: 16px;
    margin-right: var(--pp-hub-spacing-xs);
}

.pp-hub-help-button--icon-only .pp-hub-help-button__icon {
    margin-right: 0;
}

/* Loading state */
.pp-hub-help-button--loading {
    position: relative;
    color: transparent;
}

.pp-hub-help-button--loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid currentColor;
    border-radius: 50%;
    border-right-color: transparent;
    animation: pp-hub-spinner 0.75s linear infinite;
}

@keyframes pp-hub-spinner {
    to {
        transform: rotate(360deg);
    }
}

/* Full width variant */
.pp-hub-help-button--full-width {
    width: 100%;
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/components/Buttons/HelpButton.css"],"names":[],"mappings":"AAAA,yBAAyB;;AAEzB;IACI,oBAAoB;IACpB,mBAAmB;IACnB,uBAAuB;IACvB,0DAA0D;IAC1D,qCAAqC;IACrC,6CAA6C;IAC7C,cAAc;IACd,qBAAqB;IACrB,8CAA8C;IAC9C,sCAAsC;IACtC,0CAA0C;IAC1C,iCAAiC;IACjC,eAAe;IACf,6CAA6C;IAC7C,iBAAiB;AACrB;;AAEA,gBAAgB;AAChB;IACI,4CAA4C;IAC5C,4CAA4C;IAC5C,2BAA2B;IAC3B,mCAAmC;AACvC;;AAEA,gBAAgB;AAChB;IACI,6CAA6C;IAC7C,mBAAmB;AACvB;;AAEA,iBAAiB;AACjB;IACI,wBAAwB;IACxB,gBAAgB;AACpB;;AAEA,oBAAoB;AACpB;IACI,6CAA6C;IAC7C,iCAAiC;IACjC,yCAAyC;AAC7C;;AAEA;IACI,8CAA8C;IAC9C,0CAA0C;AAC9C;;AAEA,sBAAsB;AACtB;IACI,+CAA+C;IAC/C,iCAAiC;IACjC,2CAA2C;AAC/C;;AAEA;IACI,yBAAyB;IACzB,qBAAqB;AACzB;;AAEA,kBAAkB;AAClB;IACI,6BAA6B;IAC7B,yBAAyB;IACzB,mCAAmC;AACvC;;AAEA;IACI,4CAA4C;IAC5C,iCAAiC;AACrC;;AAEA,UAAU;AACV;IACI,0DAA0D;IAC1D,qCAAqC;AACzC;;AAEA;IACI,0DAA0D;IAC1D,qCAAqC;AACzC;;AAEA,mBAAmB;AACnB;;IAEI,YAAY;IACZ,mBAAmB;IACnB,oBAAoB;AACxB;;AAEA,iBAAiB;AACjB;IACI,WAAW;IACX,YAAY;IACZ,sCAAsC;AAC1C;;AAEA;IACI,eAAe;AACnB;;AAEA,kBAAkB;AAClB;IACI,kBAAkB;IAClB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,WAAW;IACX,YAAY;IACZ,qBAAqB;IACrB,8BAA8B;IAC9B,kBAAkB;IAClB,+BAA+B;IAC/B,+CAA+C;AACnD;;AAEA;IACI;QACI,yBAAyB;IAC7B;AACJ;;AAEA,uBAAuB;AACvB;IACI,WAAW;AACf","sourcesContent":["/* HelpButton Component */\n\n.pp-hub-help-button {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    padding: var(--pp-hub-spacing-sm) var(--pp-hub-spacing-lg);\n    font-size: var(--pp-hub-font-size-sm);\n    font-weight: var(--pp-hub-font-weight-medium);\n    line-height: 1;\n    text-decoration: none;\n    border: 1px solid var(--pp-hub-border-primary);\n    border-radius: var(--pp-hub-radius-md);\n    background-color: var(--pp-hub-bg-primary);\n    color: var(--pp-hub-text-primary);\n    cursor: pointer;\n    transition: all var(--pp-hub-transition-fast);\n    user-select: none;\n}\n\n/* Hover state */\n.pp-hub-help-button:hover {\n    background-color: var(--pp-hub-bg-secondary);\n    border-color: var(--pp-hub-border-secondary);\n    transform: translateY(-1px);\n    box-shadow: var(--pp-hub-shadow-sm);\n}\n\n/* Focus state */\n.pp-hub-help-button:focus {\n    outline: 2px solid var(--pp-hub-border-focus);\n    outline-offset: 2px;\n}\n\n/* Active state */\n.pp-hub-help-button:active {\n    transform: translateY(0);\n    box-shadow: none;\n}\n\n/* Primary variant */\n.pp-hub-help-button--primary {\n    background-color: var(--pp-hub-primary-color);\n    color: var(--pp-hub-text-inverse);\n    border-color: var(--pp-hub-primary-color);\n}\n\n.pp-hub-help-button--primary:hover {\n    background-color: var(--pp-hub-tertiary-color);\n    border-color: var(--pp-hub-tertiary-color);\n}\n\n/* Secondary variant */\n.pp-hub-help-button--secondary {\n    background-color: var(--pp-hub-secondary-color);\n    color: var(--pp-hub-text-primary);\n    border-color: var(--pp-hub-secondary-color);\n}\n\n.pp-hub-help-button--secondary:hover {\n    background-color: #e6a000;\n    border-color: #e6a000;\n}\n\n/* Ghost variant */\n.pp-hub-help-button--ghost {\n    background-color: transparent;\n    border-color: transparent;\n    color: var(--pp-hub-text-secondary);\n}\n\n.pp-hub-help-button--ghost:hover {\n    background-color: var(--pp-hub-bg-secondary);\n    color: var(--pp-hub-text-primary);\n}\n\n/* Sizes */\n.pp-hub-help-button--small {\n    padding: var(--pp-hub-spacing-xs) var(--pp-hub-spacing-md);\n    font-size: var(--pp-hub-font-size-xs);\n}\n\n.pp-hub-help-button--large {\n    padding: var(--pp-hub-spacing-md) var(--pp-hub-spacing-xl);\n    font-size: var(--pp-hub-font-size-lg);\n}\n\n/* Disabled state */\n.pp-hub-help-button:disabled,\n.pp-hub-help-button--disabled {\n    opacity: 0.6;\n    cursor: not-allowed;\n    pointer-events: none;\n}\n\n/* Icon styling */\n.pp-hub-help-button__icon {\n    width: 16px;\n    height: 16px;\n    margin-right: var(--pp-hub-spacing-xs);\n}\n\n.pp-hub-help-button--icon-only .pp-hub-help-button__icon {\n    margin-right: 0;\n}\n\n/* Loading state */\n.pp-hub-help-button--loading {\n    position: relative;\n    color: transparent;\n}\n\n.pp-hub-help-button--loading::after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    width: 16px;\n    height: 16px;\n    margin: -8px 0 0 -8px;\n    border: 2px solid currentColor;\n    border-radius: 50%;\n    border-right-color: transparent;\n    animation: pp-hub-spinner 0.75s linear infinite;\n}\n\n@keyframes pp-hub-spinner {\n    to {\n        transform: rotate(360deg);\n    }\n}\n\n/* Full width variant */\n.pp-hub-help-button--full-width {\n    width: 100%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/base.css":
/*!****************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/base.css ***!
  \****************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Base styles and WordPress admin compatibility */

/* WordPress admin body adjustments */
#wpcontent {
    padding-left: 0;
}

/* Base typography */
.pp-hub-root {
    font-family: var(--pp-hub-font-family-primary);
    font-size: var(--pp-hub-font-size-md);
    line-height: var(--pp-hub-line-height-normal);
    color: var(--pp-hub-text-primary);
    background-color: var(--pp-hub-bg-primary);
}

/* Reset button styles to avoid WordPress conflicts */
.pp-hub-root button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    cursor: pointer;
}

/* Reset link styles */
.pp-hub-root a {
    color: var(--pp-hub-text-link);
    text-decoration: none;
    transition: color var(--pp-hub-transition-fast);
}

.pp-hub-root a:hover,
.pp-hub-root a:focus {
    color: var(--pp-hub-text-link-hover);
}

/* Focus management */
.pp-hub-root *:focus {
    outline: 2px solid var(--pp-hub-border-focus);
    outline-offset: 2px;
}

/* Remove focus outline for mouse users */
.pp-hub-root *:focus:not(:focus-visible) {
    outline: none;
}

/* Smooth scrolling */
.pp-hub-root {
    scroll-behavior: smooth;
}

/* Container base */
.pp-hub-container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--pp-hub-spacing-lg);
}

/* Box model reset for consistent sizing */
.pp-hub-root *,
.pp-hub-root *::before,
.pp-hub-root *::after {
    box-sizing: border-box;
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/core/base.css"],"names":[],"mappings":"AAAA,kDAAkD;;AAElD,qCAAqC;AACrC;IACI,eAAe;AACnB;;AAEA,oBAAoB;AACpB;IACI,8CAA8C;IAC9C,qCAAqC;IACrC,6CAA6C;IAC7C,iCAAiC;IACjC,0CAA0C;AAC9C;;AAEA,qDAAqD;AACrD;IACI,gBAAgB;IAChB,YAAY;IACZ,UAAU;IACV,SAAS;IACT,aAAa;IACb,cAAc;IACd,eAAe;AACnB;;AAEA,sBAAsB;AACtB;IACI,8BAA8B;IAC9B,qBAAqB;IACrB,+CAA+C;AACnD;;AAEA;;IAEI,oCAAoC;AACxC;;AAEA,qBAAqB;AACrB;IACI,6CAA6C;IAC7C,mBAAmB;AACvB;;AAEA,yCAAyC;AACzC;IACI,aAAa;AACjB;;AAEA,qBAAqB;AACrB;IACI,uBAAuB;AAC3B;;AAEA,mBAAmB;AACnB;IACI,WAAW;IACX,iBAAiB;IACjB,cAAc;IACd,mCAAmC;AACvC;;AAEA,0CAA0C;AAC1C;;;IAGI,sBAAsB;AAC1B","sourcesContent":["/* Base styles and WordPress admin compatibility */\n\n/* WordPress admin body adjustments */\n#wpcontent {\n    padding-left: 0;\n}\n\n/* Base typography */\n.pp-hub-root {\n    font-family: var(--pp-hub-font-family-primary);\n    font-size: var(--pp-hub-font-size-md);\n    line-height: var(--pp-hub-line-height-normal);\n    color: var(--pp-hub-text-primary);\n    background-color: var(--pp-hub-bg-primary);\n}\n\n/* Reset button styles to avoid WordPress conflicts */\n.pp-hub-root button {\n    background: none;\n    border: none;\n    padding: 0;\n    margin: 0;\n    font: inherit;\n    color: inherit;\n    cursor: pointer;\n}\n\n/* Reset link styles */\n.pp-hub-root a {\n    color: var(--pp-hub-text-link);\n    text-decoration: none;\n    transition: color var(--pp-hub-transition-fast);\n}\n\n.pp-hub-root a:hover,\n.pp-hub-root a:focus {\n    color: var(--pp-hub-text-link-hover);\n}\n\n/* Focus management */\n.pp-hub-root *:focus {\n    outline: 2px solid var(--pp-hub-border-focus);\n    outline-offset: 2px;\n}\n\n/* Remove focus outline for mouse users */\n.pp-hub-root *:focus:not(:focus-visible) {\n    outline: none;\n}\n\n/* Smooth scrolling */\n.pp-hub-root {\n    scroll-behavior: smooth;\n}\n\n/* Container base */\n.pp-hub-container {\n    width: 100%;\n    max-width: 1200px;\n    margin: 0 auto;\n    padding: 0 var(--pp-hub-spacing-lg);\n}\n\n/* Box model reset for consistent sizing */\n.pp-hub-root *,\n.pp-hub-root *::before,\n.pp-hub-root *::after {\n    box-sizing: border-box;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/utilities.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/utilities.css ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Utility Classes */

/* Spacing Utilities */
.pp-hub-p-xs { padding: var(--pp-hub-spacing-xs); }
.pp-hub-p-sm { padding: var(--pp-hub-spacing-sm); }
.pp-hub-p-md { padding: var(--pp-hub-spacing-md); }
.pp-hub-p-lg { padding: var(--pp-hub-spacing-lg); }
.pp-hub-p-xl { padding: var(--pp-hub-spacing-xl); }
.pp-hub-p-2xl { padding: var(--pp-hub-spacing-2xl); }

.pp-hub-m-xs { margin: var(--pp-hub-spacing-xs); }
.pp-hub-m-sm { margin: var(--pp-hub-spacing-sm); }
.pp-hub-m-md { margin: var(--pp-hub-spacing-md); }
.pp-hub-m-lg { margin: var(--pp-hub-spacing-lg); }
.pp-hub-m-xl { margin: var(--pp-hub-spacing-xl); }
.pp-hub-m-2xl { margin: var(--pp-hub-spacing-2xl); }

/* Flexbox Utilities */
.pp-hub-flex { display: flex; }
.pp-hub-flex-col { flex-direction: column; }
.pp-hub-flex-row { flex-direction: row; }
.pp-hub-flex-wrap { flex-wrap: wrap; }
.pp-hub-flex-nowrap { flex-wrap: nowrap; }

.pp-hub-justify-start { justify-content: flex-start; }
.pp-hub-justify-center { justify-content: center; }
.pp-hub-justify-end { justify-content: flex-end; }
.pp-hub-justify-between { justify-content: space-between; }
.pp-hub-justify-around { justify-content: space-around; }

.pp-hub-items-start { align-items: flex-start; }
.pp-hub-items-center { align-items: center; }
.pp-hub-items-end { align-items: flex-end; }
.pp-hub-items-stretch { align-items: stretch; }

.pp-hub-flex-1 { flex: 1; }
.pp-hub-flex-auto { flex: auto; }
.pp-hub-flex-none { flex: none; }

/* Grid Utilities */
.pp-hub-grid { display: grid; }
.pp-hub-grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.pp-hub-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.pp-hub-grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.pp-hub-grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

.pp-hub-gap-xs { gap: var(--pp-hub-spacing-xs); }
.pp-hub-gap-sm { gap: var(--pp-hub-spacing-sm); }
.pp-hub-gap-md { gap: var(--pp-hub-spacing-md); }
.pp-hub-gap-lg { gap: var(--pp-hub-spacing-lg); }
.pp-hub-gap-xl { gap: var(--pp-hub-spacing-xl); }

/* Typography Utilities */
.pp-hub-text-xs { font-size: var(--pp-hub-font-size-xs); }
.pp-hub-text-sm { font-size: var(--pp-hub-font-size-sm); }
.pp-hub-text-md { font-size: var(--pp-hub-font-size-md); }
.pp-hub-text-lg { font-size: var(--pp-hub-font-size-lg); }
.pp-hub-text-xl { font-size: var(--pp-hub-font-size-xl); }
.pp-hub-text-2xl { font-size: var(--pp-hub-font-size-2xl); }
.pp-hub-text-3xl { font-size: var(--pp-hub-font-size-3xl); }

.pp-hub-font-normal { font-weight: var(--pp-hub-font-weight-normal); }
.pp-hub-font-medium { font-weight: var(--pp-hub-font-weight-medium); }
.pp-hub-font-semibold { font-weight: var(--pp-hub-font-weight-semibold); }
.pp-hub-font-bold { font-weight: var(--pp-hub-font-weight-bold); }

.pp-hub-text-center { text-align: center; }
.pp-hub-text-left { text-align: left; }
.pp-hub-text-right { text-align: right; }

.pp-hub-text-primary { color: var(--pp-hub-text-primary); }
.pp-hub-text-secondary { color: var(--pp-hub-text-secondary); }
.pp-hub-text-tertiary { color: var(--pp-hub-text-tertiary); }
.pp-hub-text-inverse { color: var(--pp-hub-text-inverse); }

/* Border Utilities */
.pp-hub-border { border: 1px solid var(--pp-hub-border-primary); }
.pp-hub-border-t { border-top: 1px solid var(--pp-hub-border-primary); }
.pp-hub-border-b { border-bottom: 1px solid var(--pp-hub-border-primary); }
.pp-hub-border-l { border-left: 1px solid var(--pp-hub-border-primary); }
.pp-hub-border-r { border-right: 1px solid var(--pp-hub-border-primary); }

.pp-hub-rounded-sm { border-radius: var(--pp-hub-radius-sm); }
.pp-hub-rounded-md { border-radius: var(--pp-hub-radius-md); }
.pp-hub-rounded-lg { border-radius: var(--pp-hub-radius-lg); }
.pp-hub-rounded-xl { border-radius: var(--pp-hub-radius-xl); }
.pp-hub-rounded-full { border-radius: var(--pp-hub-radius-full); }

/* Background Utilities */
.pp-hub-bg-primary { background-color: var(--pp-hub-bg-primary); }
.pp-hub-bg-secondary { background-color: var(--pp-hub-bg-secondary); }
.pp-hub-bg-tertiary { background-color: var(--pp-hub-bg-tertiary); }

/* Shadow Utilities */
.pp-hub-shadow-sm { box-shadow: var(--pp-hub-shadow-sm); }
.pp-hub-shadow-md { box-shadow: var(--pp-hub-shadow-md); }
.pp-hub-shadow-lg { box-shadow: var(--pp-hub-shadow-lg); }

/* Display Utilities */
.pp-hub-hidden { display: none; }
.pp-hub-block { display: block; }
.pp-hub-inline { display: inline; }
.pp-hub-inline-block { display: inline-block; }

/* Position Utilities */
.pp-hub-relative { position: relative; }
.pp-hub-absolute { position: absolute; }
.pp-hub-fixed { position: fixed; }
.pp-hub-sticky { position: sticky; }

/* Overflow Utilities */
.pp-hub-overflow-hidden { overflow: hidden; }
.pp-hub-overflow-auto { overflow: auto; }
.pp-hub-overflow-scroll { overflow: scroll; }

/* Responsive Design */
@media (max-width: 768px) {
    .pp-hub-mobile-hidden { display: none; }
    .pp-hub-mobile-flex { display: flex; }
    .pp-hub-mobile-block { display: block; }
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/core/utilities.css"],"names":[],"mappings":"AAAA,oBAAoB;;AAEpB,sBAAsB;AACtB,eAAe,iCAAiC,EAAE;AAClD,eAAe,iCAAiC,EAAE;AAClD,eAAe,iCAAiC,EAAE;AAClD,eAAe,iCAAiC,EAAE;AAClD,eAAe,iCAAiC,EAAE;AAClD,gBAAgB,kCAAkC,EAAE;;AAEpD,eAAe,gCAAgC,EAAE;AACjD,eAAe,gCAAgC,EAAE;AACjD,eAAe,gCAAgC,EAAE;AACjD,eAAe,gCAAgC,EAAE;AACjD,eAAe,gCAAgC,EAAE;AACjD,gBAAgB,iCAAiC,EAAE;;AAEnD,sBAAsB;AACtB,eAAe,aAAa,EAAE;AAC9B,mBAAmB,sBAAsB,EAAE;AAC3C,mBAAmB,mBAAmB,EAAE;AACxC,oBAAoB,eAAe,EAAE;AACrC,sBAAsB,iBAAiB,EAAE;;AAEzC,wBAAwB,2BAA2B,EAAE;AACrD,yBAAyB,uBAAuB,EAAE;AAClD,sBAAsB,yBAAyB,EAAE;AACjD,0BAA0B,8BAA8B,EAAE;AAC1D,yBAAyB,6BAA6B,EAAE;;AAExD,sBAAsB,uBAAuB,EAAE;AAC/C,uBAAuB,mBAAmB,EAAE;AAC5C,oBAAoB,qBAAqB,EAAE;AAC3C,wBAAwB,oBAAoB,EAAE;;AAE9C,iBAAiB,OAAO,EAAE;AAC1B,oBAAoB,UAAU,EAAE;AAChC,oBAAoB,UAAU,EAAE;;AAEhC,mBAAmB;AACnB,eAAe,aAAa,EAAE;AAC9B,sBAAsB,qCAAqC,EAAE;AAC7D,sBAAsB,qCAAqC,EAAE;AAC7D,sBAAsB,qCAAqC,EAAE;AAC7D,sBAAsB,qCAAqC,EAAE;;AAE7D,iBAAiB,6BAA6B,EAAE;AAChD,iBAAiB,6BAA6B,EAAE;AAChD,iBAAiB,6BAA6B,EAAE;AAChD,iBAAiB,6BAA6B,EAAE;AAChD,iBAAiB,6BAA6B,EAAE;;AAEhD,yBAAyB;AACzB,kBAAkB,qCAAqC,EAAE;AACzD,kBAAkB,qCAAqC,EAAE;AACzD,kBAAkB,qCAAqC,EAAE;AACzD,kBAAkB,qCAAqC,EAAE;AACzD,kBAAkB,qCAAqC,EAAE;AACzD,mBAAmB,sCAAsC,EAAE;AAC3D,mBAAmB,sCAAsC,EAAE;;AAE3D,sBAAsB,6CAA6C,EAAE;AACrE,sBAAsB,6CAA6C,EAAE;AACrE,wBAAwB,+CAA+C,EAAE;AACzE,oBAAoB,2CAA2C,EAAE;;AAEjE,sBAAsB,kBAAkB,EAAE;AAC1C,oBAAoB,gBAAgB,EAAE;AACtC,qBAAqB,iBAAiB,EAAE;;AAExC,uBAAuB,iCAAiC,EAAE;AAC1D,yBAAyB,mCAAmC,EAAE;AAC9D,wBAAwB,kCAAkC,EAAE;AAC5D,uBAAuB,iCAAiC,EAAE;;AAE1D,qBAAqB;AACrB,iBAAiB,8CAA8C,EAAE;AACjE,mBAAmB,kDAAkD,EAAE;AACvE,mBAAmB,qDAAqD,EAAE;AAC1E,mBAAmB,mDAAmD,EAAE;AACxE,mBAAmB,oDAAoD,EAAE;;AAEzE,qBAAqB,sCAAsC,EAAE;AAC7D,qBAAqB,sCAAsC,EAAE;AAC7D,qBAAqB,sCAAsC,EAAE;AAC7D,qBAAqB,sCAAsC,EAAE;AAC7D,uBAAuB,wCAAwC,EAAE;;AAEjE,yBAAyB;AACzB,qBAAqB,0CAA0C,EAAE;AACjE,uBAAuB,4CAA4C,EAAE;AACrE,sBAAsB,2CAA2C,EAAE;;AAEnE,qBAAqB;AACrB,oBAAoB,mCAAmC,EAAE;AACzD,oBAAoB,mCAAmC,EAAE;AACzD,oBAAoB,mCAAmC,EAAE;;AAEzD,sBAAsB;AACtB,iBAAiB,aAAa,EAAE;AAChC,gBAAgB,cAAc,EAAE;AAChC,iBAAiB,eAAe,EAAE;AAClC,uBAAuB,qBAAqB,EAAE;;AAE9C,uBAAuB;AACvB,mBAAmB,kBAAkB,EAAE;AACvC,mBAAmB,kBAAkB,EAAE;AACvC,gBAAgB,eAAe,EAAE;AACjC,iBAAiB,gBAAgB,EAAE;;AAEnC,uBAAuB;AACvB,0BAA0B,gBAAgB,EAAE;AAC5C,wBAAwB,cAAc,EAAE;AACxC,0BAA0B,gBAAgB,EAAE;;AAE5C,sBAAsB;AACtB;IACI,wBAAwB,aAAa,EAAE;IACvC,sBAAsB,aAAa,EAAE;IACrC,uBAAuB,cAAc,EAAE;AAC3C","sourcesContent":["/* Utility Classes */\n\n/* Spacing Utilities */\n.pp-hub-p-xs { padding: var(--pp-hub-spacing-xs); }\n.pp-hub-p-sm { padding: var(--pp-hub-spacing-sm); }\n.pp-hub-p-md { padding: var(--pp-hub-spacing-md); }\n.pp-hub-p-lg { padding: var(--pp-hub-spacing-lg); }\n.pp-hub-p-xl { padding: var(--pp-hub-spacing-xl); }\n.pp-hub-p-2xl { padding: var(--pp-hub-spacing-2xl); }\n\n.pp-hub-m-xs { margin: var(--pp-hub-spacing-xs); }\n.pp-hub-m-sm { margin: var(--pp-hub-spacing-sm); }\n.pp-hub-m-md { margin: var(--pp-hub-spacing-md); }\n.pp-hub-m-lg { margin: var(--pp-hub-spacing-lg); }\n.pp-hub-m-xl { margin: var(--pp-hub-spacing-xl); }\n.pp-hub-m-2xl { margin: var(--pp-hub-spacing-2xl); }\n\n/* Flexbox Utilities */\n.pp-hub-flex { display: flex; }\n.pp-hub-flex-col { flex-direction: column; }\n.pp-hub-flex-row { flex-direction: row; }\n.pp-hub-flex-wrap { flex-wrap: wrap; }\n.pp-hub-flex-nowrap { flex-wrap: nowrap; }\n\n.pp-hub-justify-start { justify-content: flex-start; }\n.pp-hub-justify-center { justify-content: center; }\n.pp-hub-justify-end { justify-content: flex-end; }\n.pp-hub-justify-between { justify-content: space-between; }\n.pp-hub-justify-around { justify-content: space-around; }\n\n.pp-hub-items-start { align-items: flex-start; }\n.pp-hub-items-center { align-items: center; }\n.pp-hub-items-end { align-items: flex-end; }\n.pp-hub-items-stretch { align-items: stretch; }\n\n.pp-hub-flex-1 { flex: 1; }\n.pp-hub-flex-auto { flex: auto; }\n.pp-hub-flex-none { flex: none; }\n\n/* Grid Utilities */\n.pp-hub-grid { display: grid; }\n.pp-hub-grid-cols-1 { grid-template-columns: repeat(1, 1fr); }\n.pp-hub-grid-cols-2 { grid-template-columns: repeat(2, 1fr); }\n.pp-hub-grid-cols-3 { grid-template-columns: repeat(3, 1fr); }\n.pp-hub-grid-cols-4 { grid-template-columns: repeat(4, 1fr); }\n\n.pp-hub-gap-xs { gap: var(--pp-hub-spacing-xs); }\n.pp-hub-gap-sm { gap: var(--pp-hub-spacing-sm); }\n.pp-hub-gap-md { gap: var(--pp-hub-spacing-md); }\n.pp-hub-gap-lg { gap: var(--pp-hub-spacing-lg); }\n.pp-hub-gap-xl { gap: var(--pp-hub-spacing-xl); }\n\n/* Typography Utilities */\n.pp-hub-text-xs { font-size: var(--pp-hub-font-size-xs); }\n.pp-hub-text-sm { font-size: var(--pp-hub-font-size-sm); }\n.pp-hub-text-md { font-size: var(--pp-hub-font-size-md); }\n.pp-hub-text-lg { font-size: var(--pp-hub-font-size-lg); }\n.pp-hub-text-xl { font-size: var(--pp-hub-font-size-xl); }\n.pp-hub-text-2xl { font-size: var(--pp-hub-font-size-2xl); }\n.pp-hub-text-3xl { font-size: var(--pp-hub-font-size-3xl); }\n\n.pp-hub-font-normal { font-weight: var(--pp-hub-font-weight-normal); }\n.pp-hub-font-medium { font-weight: var(--pp-hub-font-weight-medium); }\n.pp-hub-font-semibold { font-weight: var(--pp-hub-font-weight-semibold); }\n.pp-hub-font-bold { font-weight: var(--pp-hub-font-weight-bold); }\n\n.pp-hub-text-center { text-align: center; }\n.pp-hub-text-left { text-align: left; }\n.pp-hub-text-right { text-align: right; }\n\n.pp-hub-text-primary { color: var(--pp-hub-text-primary); }\n.pp-hub-text-secondary { color: var(--pp-hub-text-secondary); }\n.pp-hub-text-tertiary { color: var(--pp-hub-text-tertiary); }\n.pp-hub-text-inverse { color: var(--pp-hub-text-inverse); }\n\n/* Border Utilities */\n.pp-hub-border { border: 1px solid var(--pp-hub-border-primary); }\n.pp-hub-border-t { border-top: 1px solid var(--pp-hub-border-primary); }\n.pp-hub-border-b { border-bottom: 1px solid var(--pp-hub-border-primary); }\n.pp-hub-border-l { border-left: 1px solid var(--pp-hub-border-primary); }\n.pp-hub-border-r { border-right: 1px solid var(--pp-hub-border-primary); }\n\n.pp-hub-rounded-sm { border-radius: var(--pp-hub-radius-sm); }\n.pp-hub-rounded-md { border-radius: var(--pp-hub-radius-md); }\n.pp-hub-rounded-lg { border-radius: var(--pp-hub-radius-lg); }\n.pp-hub-rounded-xl { border-radius: var(--pp-hub-radius-xl); }\n.pp-hub-rounded-full { border-radius: var(--pp-hub-radius-full); }\n\n/* Background Utilities */\n.pp-hub-bg-primary { background-color: var(--pp-hub-bg-primary); }\n.pp-hub-bg-secondary { background-color: var(--pp-hub-bg-secondary); }\n.pp-hub-bg-tertiary { background-color: var(--pp-hub-bg-tertiary); }\n\n/* Shadow Utilities */\n.pp-hub-shadow-sm { box-shadow: var(--pp-hub-shadow-sm); }\n.pp-hub-shadow-md { box-shadow: var(--pp-hub-shadow-md); }\n.pp-hub-shadow-lg { box-shadow: var(--pp-hub-shadow-lg); }\n\n/* Display Utilities */\n.pp-hub-hidden { display: none; }\n.pp-hub-block { display: block; }\n.pp-hub-inline { display: inline; }\n.pp-hub-inline-block { display: inline-block; }\n\n/* Position Utilities */\n.pp-hub-relative { position: relative; }\n.pp-hub-absolute { position: absolute; }\n.pp-hub-fixed { position: fixed; }\n.pp-hub-sticky { position: sticky; }\n\n/* Overflow Utilities */\n.pp-hub-overflow-hidden { overflow: hidden; }\n.pp-hub-overflow-auto { overflow: auto; }\n.pp-hub-overflow-scroll { overflow: scroll; }\n\n/* Responsive Design */\n@media (max-width: 768px) {\n    .pp-hub-mobile-hidden { display: none; }\n    .pp-hub-mobile-flex { display: flex; }\n    .pp-hub-mobile-block { display: block; }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/variables.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/variables.css ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    /* Brand Colors */
    --pp-hub-primary-color: #655997;
    --pp-hub-secondary-color: #ffb200;
    --pp-hub-tertiary-color: #1b004f;
    --pp-hub-accent-color: #00a0d2;

    /* Semantic Colors */
    --pp-hub-success-color: #46b450;
    --pp-hub-warning-color: #ffb900;
    --pp-hub-error-color: #dc3232;
    --pp-hub-info-color: #00a0d2;

    /* Background Colors */
    --pp-hub-bg-primary: #ffffff;
    --pp-hub-bg-secondary: #f6f7f7;
    --pp-hub-bg-tertiary: #f1f1f1;
    --pp-hub-bg-overlay: rgba(0, 0, 0, 0.6);

    /* Text Colors */
    --pp-hub-text-primary: #1e1e1e;
    --pp-hub-text-secondary: #646970;
    --pp-hub-text-tertiary: #8c8f94;
    --pp-hub-text-inverse: #ffffff;
    --pp-hub-text-link: var(--pp-hub-primary-color);
    --pp-hub-text-link-hover: var(--pp-hub-tertiary-color);

    /* Border Colors */
    --pp-hub-border-primary: #dcdcde;
    --pp-hub-border-secondary: #c3c4c7;
    --pp-hub-border-focus: var(--pp-hub-primary-color);

    /* Spacing Scale */
    --pp-hub-spacing-xs: 0.25rem;    /* 4px */
    --pp-hub-spacing-sm: 0.5rem;     /* 8px */
    --pp-hub-spacing-md: 0.75rem;    /* 12px */
    --pp-hub-spacing-lg: 1rem;       /* 16px */
    --pp-hub-spacing-xl: 1.5rem;     /* 24px */
    --pp-hub-spacing-2xl: 2rem;      /* 32px */
    --pp-hub-spacing-3xl: 3rem;      /* 48px */

    /* Typography */
    --pp-hub-font-family-primary: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    --pp-hub-font-family-mono: Consolas, Monaco, "Courier New", monospace;

    /* Font Sizes */
    --pp-hub-font-size-xs: 0.75rem;   /* 12px */
    --pp-hub-font-size-sm: 0.875rem;  /* 14px */
    --pp-hub-font-size-md: 1rem;      /* 16px */
    --pp-hub-font-size-lg: 1.125rem;  /* 18px */
    --pp-hub-font-size-xl: 1.25rem;   /* 20px */
    --pp-hub-font-size-2xl: 1.5rem;   /* 24px */
    --pp-hub-font-size-3xl: 2rem;     /* 32px */

    /* Font Weights */
    --pp-hub-font-weight-normal: 400;
    --pp-hub-font-weight-medium: 500;
    --pp-hub-font-weight-semibold: 600;
    --pp-hub-font-weight-bold: 700;

    /* Line Heights */
    --pp-hub-line-height-tight: 1.25;
    --pp-hub-line-height-normal: 1.5;
    --pp-hub-line-height-loose: 1.75;

    /* Border Radius */
    --pp-hub-radius-sm: 0.25rem;
    --pp-hub-radius-md: 0.375rem;
    --pp-hub-radius-lg: 0.5rem;
    --pp-hub-radius-xl: 0.75rem;
    --pp-hub-radius-full: 9999px;

    /* Shadows */
    --pp-hub-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --pp-hub-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --pp-hub-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

    /* Z-Index Scale */
    --pp-hub-z-dropdown: 1000;
    --pp-hub-z-modal: 1050;
    --pp-hub-z-tooltip: 1070;

    /* Transitions */
    --pp-hub-transition-fast: 150ms ease-in-out;
    --pp-hub-transition-normal: 300ms ease-in-out;
    --pp-hub-transition-slow: 500ms ease-in-out;

    /* Breakpoints (for container queries) */
    --pp-hub-breakpoint-sm: 640px;
    --pp-hub-breakpoint-md: 768px;
    --pp-hub-breakpoint-lg: 1024px;
    --pp-hub-breakpoint-xl: 1280px;
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/core/variables.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,+BAA+B;IAC/B,iCAAiC;IACjC,gCAAgC;IAChC,8BAA8B;;IAE9B,oBAAoB;IACpB,+BAA+B;IAC/B,+BAA+B;IAC/B,6BAA6B;IAC7B,4BAA4B;;IAE5B,sBAAsB;IACtB,4BAA4B;IAC5B,8BAA8B;IAC9B,6BAA6B;IAC7B,uCAAuC;;IAEvC,gBAAgB;IAChB,8BAA8B;IAC9B,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,+CAA+C;IAC/C,sDAAsD;;IAEtD,kBAAkB;IAClB,gCAAgC;IAChC,kCAAkC;IAClC,kDAAkD;;IAElD,kBAAkB;IAClB,4BAA4B,KAAK,QAAQ;IACzC,2BAA2B,MAAM,QAAQ;IACzC,4BAA4B,KAAK,SAAS;IAC1C,yBAAyB,QAAQ,SAAS;IAC1C,2BAA2B,MAAM,SAAS;IAC1C,0BAA0B,OAAO,SAAS;IAC1C,0BAA0B,OAAO,SAAS;;IAE1C,eAAe;IACf,iJAAiJ;IACjJ,qEAAqE;;IAErE,eAAe;IACf,8BAA8B,IAAI,SAAS;IAC3C,+BAA+B,GAAG,SAAS;IAC3C,2BAA2B,OAAO,SAAS;IAC3C,+BAA+B,GAAG,SAAS;IAC3C,8BAA8B,IAAI,SAAS;IAC3C,8BAA8B,IAAI,SAAS;IAC3C,4BAA4B,MAAM,SAAS;;IAE3C,iBAAiB;IACjB,gCAAgC;IAChC,gCAAgC;IAChC,kCAAkC;IAClC,8BAA8B;;IAE9B,iBAAiB;IACjB,gCAAgC;IAChC,gCAAgC;IAChC,gCAAgC;;IAEhC,kBAAkB;IAClB,2BAA2B;IAC3B,4BAA4B;IAC5B,0BAA0B;IAC1B,2BAA2B;IAC3B,4BAA4B;;IAE5B,YAAY;IACZ,mDAAmD;IACnD,yFAAyF;IACzF,2FAA2F;;IAE3F,kBAAkB;IAClB,yBAAyB;IACzB,sBAAsB;IACtB,wBAAwB;;IAExB,gBAAgB;IAChB,2CAA2C;IAC3C,6CAA6C;IAC7C,2CAA2C;;IAE3C,wCAAwC;IACxC,6BAA6B;IAC7B,6BAA6B;IAC7B,8BAA8B;IAC9B,8BAA8B;AAClC","sourcesContent":[":root {\n    /* Brand Colors */\n    --pp-hub-primary-color: #655997;\n    --pp-hub-secondary-color: #ffb200;\n    --pp-hub-tertiary-color: #1b004f;\n    --pp-hub-accent-color: #00a0d2;\n\n    /* Semantic Colors */\n    --pp-hub-success-color: #46b450;\n    --pp-hub-warning-color: #ffb900;\n    --pp-hub-error-color: #dc3232;\n    --pp-hub-info-color: #00a0d2;\n\n    /* Background Colors */\n    --pp-hub-bg-primary: #ffffff;\n    --pp-hub-bg-secondary: #f6f7f7;\n    --pp-hub-bg-tertiary: #f1f1f1;\n    --pp-hub-bg-overlay: rgba(0, 0, 0, 0.6);\n\n    /* Text Colors */\n    --pp-hub-text-primary: #1e1e1e;\n    --pp-hub-text-secondary: #646970;\n    --pp-hub-text-tertiary: #8c8f94;\n    --pp-hub-text-inverse: #ffffff;\n    --pp-hub-text-link: var(--pp-hub-primary-color);\n    --pp-hub-text-link-hover: var(--pp-hub-tertiary-color);\n\n    /* Border Colors */\n    --pp-hub-border-primary: #dcdcde;\n    --pp-hub-border-secondary: #c3c4c7;\n    --pp-hub-border-focus: var(--pp-hub-primary-color);\n\n    /* Spacing Scale */\n    --pp-hub-spacing-xs: 0.25rem;    /* 4px */\n    --pp-hub-spacing-sm: 0.5rem;     /* 8px */\n    --pp-hub-spacing-md: 0.75rem;    /* 12px */\n    --pp-hub-spacing-lg: 1rem;       /* 16px */\n    --pp-hub-spacing-xl: 1.5rem;     /* 24px */\n    --pp-hub-spacing-2xl: 2rem;      /* 32px */\n    --pp-hub-spacing-3xl: 3rem;      /* 48px */\n\n    /* Typography */\n    --pp-hub-font-family-primary: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n    --pp-hub-font-family-mono: Consolas, Monaco, \"Courier New\", monospace;\n\n    /* Font Sizes */\n    --pp-hub-font-size-xs: 0.75rem;   /* 12px */\n    --pp-hub-font-size-sm: 0.875rem;  /* 14px */\n    --pp-hub-font-size-md: 1rem;      /* 16px */\n    --pp-hub-font-size-lg: 1.125rem;  /* 18px */\n    --pp-hub-font-size-xl: 1.25rem;   /* 20px */\n    --pp-hub-font-size-2xl: 1.5rem;   /* 24px */\n    --pp-hub-font-size-3xl: 2rem;     /* 32px */\n\n    /* Font Weights */\n    --pp-hub-font-weight-normal: 400;\n    --pp-hub-font-weight-medium: 500;\n    --pp-hub-font-weight-semibold: 600;\n    --pp-hub-font-weight-bold: 700;\n\n    /* Line Heights */\n    --pp-hub-line-height-tight: 1.25;\n    --pp-hub-line-height-normal: 1.5;\n    --pp-hub-line-height-loose: 1.75;\n\n    /* Border Radius */\n    --pp-hub-radius-sm: 0.25rem;\n    --pp-hub-radius-md: 0.375rem;\n    --pp-hub-radius-lg: 0.5rem;\n    --pp-hub-radius-xl: 0.75rem;\n    --pp-hub-radius-full: 9999px;\n\n    /* Shadows */\n    --pp-hub-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n    --pp-hub-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);\n    --pp-hub-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);\n\n    /* Z-Index Scale */\n    --pp-hub-z-dropdown: 1000;\n    --pp-hub-z-modal: 1050;\n    --pp-hub-z-tooltip: 1070;\n\n    /* Transitions */\n    --pp-hub-transition-fast: 150ms ease-in-out;\n    --pp-hub-transition-normal: 300ms ease-in-out;\n    --pp-hub-transition-slow: 500ms ease-in-out;\n\n    /* Breakpoints (for container queries) */\n    --pp-hub-breakpoint-sm: 640px;\n    --pp-hub-breakpoint-md: 768px;\n    --pp-hub-breakpoint-lg: 1024px;\n    --pp-hub-breakpoint-xl: 1280px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/themes/dark.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/themes/dark.css ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Dark Theme */
[data-theme="dark"] {
    /* Brand Colors - Adjusted for dark mode */
    --pp-hub-primary-color: #8a7bc8;
    --pp-hub-secondary-color: #ffd700;
    --pp-hub-tertiary-color: #b19cd9;
    --pp-hub-accent-color: #4fc3f7;

    /* Semantic Colors - Dark mode variants */
    --pp-hub-success-color: #66bb6a;
    --pp-hub-warning-color: #ffca28;
    --pp-hub-error-color: #ef5350;
    --pp-hub-info-color: #29b6f6;

    /* Background Colors - Dark theme */
    --pp-hub-bg-primary: #121212;
    --pp-hub-bg-secondary: #1e1e1e;
    --pp-hub-bg-tertiary: #2d2d2d;
    --pp-hub-bg-overlay: rgba(0, 0, 0, 0.8);

    /* Text Colors - Inverted for dark mode */
    --pp-hub-text-primary: #ffffff;
    --pp-hub-text-secondary: #b3b3b3;
    --pp-hub-text-tertiary: #808080;
    --pp-hub-text-inverse: #121212;
    --pp-hub-text-link: var(--pp-hub-primary-color);
    --pp-hub-text-link-hover: var(--pp-hub-tertiary-color);

    /* Border Colors - Dark theme */
    --pp-hub-border-primary: #3c3c3c;
    --pp-hub-border-secondary: #4a4a4a;
    --pp-hub-border-focus: var(--pp-hub-primary-color);
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/themes/dark.css"],"names":[],"mappings":"AAAA,eAAe;AACf;IACI,0CAA0C;IAC1C,+BAA+B;IAC/B,iCAAiC;IACjC,gCAAgC;IAChC,8BAA8B;;IAE9B,yCAAyC;IACzC,+BAA+B;IAC/B,+BAA+B;IAC/B,6BAA6B;IAC7B,4BAA4B;;IAE5B,mCAAmC;IACnC,4BAA4B;IAC5B,8BAA8B;IAC9B,6BAA6B;IAC7B,uCAAuC;;IAEvC,yCAAyC;IACzC,8BAA8B;IAC9B,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,+CAA+C;IAC/C,sDAAsD;;IAEtD,+BAA+B;IAC/B,gCAAgC;IAChC,kCAAkC;IAClC,kDAAkD;AACtD","sourcesContent":["/* Dark Theme */\n[data-theme=\"dark\"] {\n    /* Brand Colors - Adjusted for dark mode */\n    --pp-hub-primary-color: #8a7bc8;\n    --pp-hub-secondary-color: #ffd700;\n    --pp-hub-tertiary-color: #b19cd9;\n    --pp-hub-accent-color: #4fc3f7;\n\n    /* Semantic Colors - Dark mode variants */\n    --pp-hub-success-color: #66bb6a;\n    --pp-hub-warning-color: #ffca28;\n    --pp-hub-error-color: #ef5350;\n    --pp-hub-info-color: #29b6f6;\n\n    /* Background Colors - Dark theme */\n    --pp-hub-bg-primary: #121212;\n    --pp-hub-bg-secondary: #1e1e1e;\n    --pp-hub-bg-tertiary: #2d2d2d;\n    --pp-hub-bg-overlay: rgba(0, 0, 0, 0.8);\n\n    /* Text Colors - Inverted for dark mode */\n    --pp-hub-text-primary: #ffffff;\n    --pp-hub-text-secondary: #b3b3b3;\n    --pp-hub-text-tertiary: #808080;\n    --pp-hub-text-inverse: #121212;\n    --pp-hub-text-link: var(--pp-hub-primary-color);\n    --pp-hub-text-link-hover: var(--pp-hub-tertiary-color);\n\n    /* Border Colors - Dark theme */\n    --pp-hub-border-primary: #3c3c3c;\n    --pp-hub-border-secondary: #4a4a4a;\n    --pp-hub-border-focus: var(--pp-hub-primary-color);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/themes/default.css":
/*!*********************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/themes/default.css ***!
  \*********************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* Default Theme */
[data-theme="default"] {
    /* Brand Colors */
    --pp-hub-primary-color: #655997;
    --pp-hub-secondary-color: #ffb200;
    --pp-hub-tertiary-color: #1b004f;
    --pp-hub-accent-color: #00a0d2;

    /* Semantic Colors */
    --pp-hub-success-color: #46b450;
    --pp-hub-warning-color: #ffb900;
    --pp-hub-error-color: #dc3232;
    --pp-hub-info-color: #00a0d2;

    /* Background Colors */
    --pp-hub-bg-primary: #ffffff;
    --pp-hub-bg-secondary: #f6f7f7;
    --pp-hub-bg-tertiary: #f1f1f1;
    --pp-hub-bg-overlay: rgba(0, 0, 0, 0.6);

    /* Text Colors */
    --pp-hub-text-primary: #1e1e1e;
    --pp-hub-text-secondary: #646970;
    --pp-hub-text-tertiary: #8c8f94;
    --pp-hub-text-inverse: #ffffff;
    --pp-hub-text-link: var(--pp-hub-primary-color);
    --pp-hub-text-link-hover: var(--pp-hub-tertiary-color);

    /* Border Colors */
    --pp-hub-border-primary: #dcdcde;
    --pp-hub-border-secondary: #c3c4c7;
    --pp-hub-border-focus: var(--pp-hub-primary-color);
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/themes/default.css"],"names":[],"mappings":"AAAA,kBAAkB;AAClB;IACI,iBAAiB;IACjB,+BAA+B;IAC/B,iCAAiC;IACjC,gCAAgC;IAChC,8BAA8B;;IAE9B,oBAAoB;IACpB,+BAA+B;IAC/B,+BAA+B;IAC/B,6BAA6B;IAC7B,4BAA4B;;IAE5B,sBAAsB;IACtB,4BAA4B;IAC5B,8BAA8B;IAC9B,6BAA6B;IAC7B,uCAAuC;;IAEvC,gBAAgB;IAChB,8BAA8B;IAC9B,gCAAgC;IAChC,+BAA+B;IAC/B,8BAA8B;IAC9B,+CAA+C;IAC/C,sDAAsD;;IAEtD,kBAAkB;IAClB,gCAAgC;IAChC,kCAAkC;IAClC,kDAAkD;AACtD","sourcesContent":["/* Default Theme */\n[data-theme=\"default\"] {\n    /* Brand Colors */\n    --pp-hub-primary-color: #655997;\n    --pp-hub-secondary-color: #ffb200;\n    --pp-hub-tertiary-color: #1b004f;\n    --pp-hub-accent-color: #00a0d2;\n\n    /* Semantic Colors */\n    --pp-hub-success-color: #46b450;\n    --pp-hub-warning-color: #ffb900;\n    --pp-hub-error-color: #dc3232;\n    --pp-hub-info-color: #00a0d2;\n\n    /* Background Colors */\n    --pp-hub-bg-primary: #ffffff;\n    --pp-hub-bg-secondary: #f6f7f7;\n    --pp-hub-bg-tertiary: #f1f1f1;\n    --pp-hub-bg-overlay: rgba(0, 0, 0, 0.6);\n\n    /* Text Colors */\n    --pp-hub-text-primary: #1e1e1e;\n    --pp-hub-text-secondary: #646970;\n    --pp-hub-text-tertiary: #8c8f94;\n    --pp-hub-text-inverse: #ffffff;\n    --pp-hub-text-link: var(--pp-hub-primary-color);\n    --pp-hub-text-link-hover: var(--pp-hub-tertiary-color);\n\n    /* Border Colors */\n    --pp-hub-border-primary: #dcdcde;\n    --pp-hub-border-secondary: #c3c4c7;\n    --pp-hub-border-focus: var(--pp-hub-primary-color);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./assets/jsx/css/main.css":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/dist/cjs.js!./assets/jsx/css/main.css ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_core_variables_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./core/variables.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/variables.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_core_base_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./core/base.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/base.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_core_utilities_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./core/utilities.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/core/utilities.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_themes_default_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./themes/default.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/themes/default.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_themes_dark_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./themes/dark.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/themes/dark.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_components_AdminPage_AdminPageContainer_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./components/AdminPage/AdminPageContainer.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/AdminPage/AdminPageContainer.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_components_AdminPage_AdminPageHeader_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./components/AdminPage/AdminPageHeader.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/AdminPage/AdminPageHeader.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_components_Buttons_HelpButton_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! -!../../../node_modules/css-loader/dist/cjs.js!./components/Buttons/HelpButton.css */ "./node_modules/css-loader/dist/cjs.js!./assets/jsx/css/components/Buttons/HelpButton.css");
// Imports










var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_core_variables_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_core_base_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_core_utilities_css__WEBPACK_IMPORTED_MODULE_4__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_themes_default_css__WEBPACK_IMPORTED_MODULE_5__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_themes_dark_css__WEBPACK_IMPORTED_MODULE_6__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_components_AdminPage_AdminPageContainer_css__WEBPACK_IMPORTED_MODULE_7__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_components_AdminPage_AdminPageHeader_css__WEBPACK_IMPORTED_MODULE_8__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_components_Buttons_HelpButton_css__WEBPACK_IMPORTED_MODULE_9__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* PublishPress Hub - Main CSS Entry Point */

/* 1. Core Foundation */

/* 2. Theme System */

/* 3. Component Styles */

/* 4. WordPress Admin Compatibility */
/* Ensure our styles don't conflict with WordPress admin */
.pp-hub-root {
    /* Create an isolated styling context */
    isolation: isolate;
}

/* Reset WordPress admin table styles that might interfere */
.pp-hub-root table {
    border-collapse: separate;
    border-spacing: 0;
}

.pp-hub-root th,
.pp-hub-root td {
    text-align: left;
    vertical-align: top;
}

/* Override WordPress button styles in our context */
.pp-hub-root .button,
.pp-hub-root .button-primary,
.pp-hub-root .button-secondary {
    all: unset;
}

/* Responsive container queries support */
@supports (container-type: inline-size) {
    .pp-hub-container {
        container-type: inline-size;
    }

    @container (max-width: 768px) {
        .pp-hub-mobile-stack {
            flex-direction: column;
        }
    }
}
`, "",{"version":3,"sources":["webpack://./assets/jsx/css/main.css"],"names":[],"mappings":"AAAA,4CAA4C;;AAE5C,uBAAuB;;AAKvB,oBAAoB;;AAIpB,wBAAwB;;AAKxB,qCAAqC;AACrC,0DAA0D;AAC1D;IACI,uCAAuC;IACvC,kBAAkB;AACtB;;AAEA,4DAA4D;AAC5D;IACI,yBAAyB;IACzB,iBAAiB;AACrB;;AAEA;;IAEI,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA,oDAAoD;AACpD;;;IAGI,UAAU;AACd;;AAEA,yCAAyC;AACzC;IACI;QACI,2BAA2B;IAC/B;;IAEA;QACI;YACI,sBAAsB;QAC1B;IACJ;AACJ","sourcesContent":["/* PublishPress Hub - Main CSS Entry Point */\n\n/* 1. Core Foundation */\n@import './core/variables.css';\n@import './core/base.css';\n@import './core/utilities.css';\n\n/* 2. Theme System */\n@import './themes/default.css';\n@import './themes/dark.css';\n\n/* 3. Component Styles */\n@import './components/AdminPage/AdminPageContainer.css';\n@import './components/AdminPage/AdminPageHeader.css';\n@import './components/Buttons/HelpButton.css';\n\n/* 4. WordPress Admin Compatibility */\n/* Ensure our styles don't conflict with WordPress admin */\n.pp-hub-root {\n    /* Create an isolated styling context */\n    isolation: isolate;\n}\n\n/* Reset WordPress admin table styles that might interfere */\n.pp-hub-root table {\n    border-collapse: separate;\n    border-spacing: 0;\n}\n\n.pp-hub-root th,\n.pp-hub-root td {\n    text-align: left;\n    vertical-align: top;\n}\n\n/* Override WordPress button styles in our context */\n.pp-hub-root .button,\n.pp-hub-root .button-primary,\n.pp-hub-root .button-secondary {\n    all: unset;\n}\n\n/* Responsive container queries support */\n@supports (container-type: inline-size) {\n    .pp-hub-container {\n        container-type: inline-size;\n    }\n\n    @container (max-width: 768px) {\n        .pp-hub-mobile-stack {\n            flex-direction: column;\n        }\n    }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "@publishpress/hub-i18n":
/*!***************************************!*\
  !*** external "publishpressHub.i18n" ***!
  \***************************************/
/***/ ((module) => {

module.exports = publishpressHub.i18n;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = ReactDOM;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./assets/jsx/hub-dashboard.jsx ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_PluginsDashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/PluginsDashboard */ "./assets/jsx/components/PluginsDashboard.jsx");


var dashboardContainer = document.getElementById('publishpress-hub-dashboard-container');
if (dashboardContainer) {
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(dashboardContainer);
  root.render(/*#__PURE__*/React.createElement(_components_PluginsDashboard__WEBPACK_IMPORTED_MODULE_1__.PluginsDashboard, null));
}
})();

/******/ })()
;
//# sourceMappingURL=hub-dashboard.js.map
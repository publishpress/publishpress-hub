/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/src/jsx/components/admin-page/container.jsx":
/*!************************************************************!*\
  !*** ./assets/src/jsx/components/admin-page/container.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageContainer: () => (/* binding */ AdminPageContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);

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
  }, children, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SlotFillProvider, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Popover.Slot, null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminPageContainer);

/***/ }),

/***/ "./assets/src/jsx/components/admin-page/header.jsx":
/*!*********************************************************!*\
  !*** ./assets/src/jsx/components/admin-page/header.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageHeader: () => (/* binding */ AdminPageHeader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_help_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/help-button */ "./assets/src/jsx/components/buttons/help-button.jsx");



// Constants moved outside to prevent recreation
var BASE_HEADER_CLASS = "pp-hub-admin-page-header";
var COMPACT_HEADER_CLASS = "pp-hub-admin-page-header pp-hub-admin-page-header--compact";
var LOGO_ALT_TEXT = "PublishPress";
var LOGO_TEXT = "Hub";
var AdminPageHeaderComponent = function AdminPageHeaderComponent(_ref) {
  var logoUrl = _ref.logoUrl,
    children = _ref.children,
    _ref$compact = _ref.compact,
    compact = _ref$compact === void 0 ? false : _ref$compact;
  // Memoize the header class computation
  var headerClass = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return compact ? COMPACT_HEADER_CLASS : BASE_HEADER_CLASS;
  }, [compact]);
  return /*#__PURE__*/React.createElement("div", {
    className: headerClass
  }, /*#__PURE__*/React.createElement("img", {
    src: logoUrl,
    alt: LOGO_ALT_TEXT,
    className: "pp-hub-admin-page-header__logo"
  }), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-admin-page-header__logo-text"
  }, LOGO_TEXT), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-header__content"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-header__actions"
  }, /*#__PURE__*/React.createElement(_buttons_help_button__WEBPACK_IMPORTED_MODULE_1__["default"], null)));
};

// Memoize the component to prevent unnecessary re-renders
var AdminPageHeader = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(AdminPageHeaderComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminPageHeader);

/***/ }),

/***/ "./assets/src/jsx/components/admin-page/index.jsx":
/*!********************************************************!*\
  !*** ./assets/src/jsx/components/admin-page/index.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageContainer: () => (/* reexport safe */ _container__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   AdminPageHeader: () => (/* reexport safe */ _header__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   AdminPageLayout: () => (/* reexport safe */ _layout__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./assets/src/jsx/components/admin-page/layout.jsx");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container */ "./assets/src/jsx/components/admin-page/container.jsx");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header */ "./assets/src/jsx/components/admin-page/header.jsx");




/***/ }),

/***/ "./assets/src/jsx/components/admin-page/layout.jsx":
/*!*********************************************************!*\
  !*** ./assets/src/jsx/components/admin-page/layout.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageLayout: () => (/* binding */ AdminPageLayout),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ "./assets/src/jsx/components/admin-page/container.jsx");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./assets/src/jsx/components/admin-page/header.jsx");


var AdminPageLayout = function AdminPageLayout(_ref) {
  var title = _ref.title,
    logoUrl = _ref.logoUrl,
    children = _ref.children;
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-layout"
  }, /*#__PURE__*/React.createElement(_header__WEBPACK_IMPORTED_MODULE_1__.AdminPageHeader, {
    logoUrl: logoUrl
  }), /*#__PURE__*/React.createElement(_container__WEBPACK_IMPORTED_MODULE_0__.AdminPageContainer, null, title && /*#__PURE__*/React.createElement("h1", {
    className: "pp-hub-admin-page-layout__title"
  }, title), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-layout__content"
  }, children)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminPageLayout);

/***/ }),

/***/ "./assets/src/jsx/components/badge/badge.jsx":
/*!***************************************************!*\
  !*** ./assets/src/jsx/components/badge/badge.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Badge: () => (/* binding */ Badge),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

var BadgeComponent = function BadgeComponent(_ref) {
  var text = _ref.text,
    className = _ref.className;
  return /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-badge ".concat(className)
  }, text);
};
var Badge = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(BadgeComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Badge);

/***/ }),

/***/ "./assets/src/jsx/components/buttons/button.jsx":
/*!******************************************************!*\
  !*** ./assets/src/jsx/components/buttons/button.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["variant", "icon", "onClick", "href", "target", "rel", "className", "disabled", "title", "style", "children", "isFullWidth", "isLoading"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }


var DEFAULT_TARGET = '_blank';
var DEFAULT_REL = 'noopener noreferrer';
var ButtonComponent = function ButtonComponent(_ref) {
  var variant = _ref.variant,
    icon = _ref.icon,
    onClick = _ref.onClick,
    href = _ref.href,
    target = _ref.target,
    rel = _ref.rel,
    className = _ref.className,
    disabled = _ref.disabled,
    title = _ref.title,
    style = _ref.style,
    children = _ref.children,
    isFullWidth = _ref.isFullWidth,
    isLoading = _ref.isLoading,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var targetValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return target || (href ? DEFAULT_TARGET : undefined);
  }, [target, href]);
  var relValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return rel || (href ? DEFAULT_REL : undefined);
  }, [rel, href]);
  if (isLoading) {
    children = /*#__PURE__*/React.createElement(React.Fragment, null, children, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null));
    disabled = true;
  }
  var buttonClassName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var variantClassName = '';
    if (variant === 'highlight') {
      variantClassName = 'is-highlight';
    }
    return "pp-hub-button ".concat(variantClassName, " ").concat(className ? className : '', " ").concat(isFullWidth ? 'is-full-width' : '');
  }, [className, isFullWidth, variant]);
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, _extends({
    variant: variant,
    icon: icon,
    onClick: onClick,
    href: href,
    target: targetValue,
    rel: relValue,
    className: buttonClassName,
    disabled: disabled,
    title: title,
    style: style
  }, restProps), children);
};

// Memoize the component to prevent unnecessary re-renders
var Button = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(ButtonComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ }),

/***/ "./assets/src/jsx/components/buttons/help-button.jsx":
/*!***********************************************************!*\
  !*** ./assets/src/jsx/components/buttons/help-button.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpButton: () => (/* binding */ HelpButton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
var _excluded = ["variant", "size", "icon", "children", "className"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }



var BASE_CLASS = 'pp-hub-help-button';
var HELP_URL = 'https://publishpress.com/publishpress-support/';
var DEFAULT_HELP_TEXT = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Need Help?', 'publishpress-hub');
var HelpButtonComponent = function HelpButtonComponent(_ref) {
  var _ref$variant = _ref.variant,
    variant = _ref$variant === void 0 ? 'default' : _ref$variant,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 'default' : _ref$size,
    _ref$icon = _ref.icon,
    icon = _ref$icon === void 0 ? 'editor-help' : _ref$icon,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    props = _objectWithoutProperties(_ref, _excluded);
  var handleClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    window.open(HELP_URL, '_blank');
  }, []);
  var combinedClassName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var variantClass = variant !== 'default' ? "".concat(BASE_CLASS, "--").concat(variant) : '';
    var sizeClass = size !== 'default' ? "".concat(BASE_CLASS, "--").concat(size) : '';
    return "".concat(BASE_CLASS, " ").concat(variantClass, " ").concat(sizeClass, " ").concat(className).trim();
  }, [variant, size, className]);
  var buttonText = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return children || DEFAULT_HELP_TEXT;
  }, [children]);
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, _extends({
    icon: icon,
    onClick: handleClick,
    className: combinedClassName
  }, props), buttonText);
};
var HelpButton = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(HelpButtonComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpButton);

/***/ }),

/***/ "./assets/src/jsx/components/filter/filter-buttons-bar.jsx":
/*!*****************************************************************!*\
  !*** ./assets/src/jsx/components/filter/filter-buttons-bar.jsx ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterButtonsBar: () => (/* binding */ FilterButtonsBar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/button */ "./assets/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);



var FilterButtonsBarComponent = function FilterButtonsBarComponent(_ref) {
  var options = _ref.options,
    selectedOption = _ref.selectedOption,
    onChange = _ref.onChange,
    children = _ref.children,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className;
  // Early returns for better performance
  if (!options || !options.length) {
    return null;
  }

  // Use the first option as default if none selected
  var activeSelectedOption = selectedOption || options[0].value;

  // Memoize the select change handler
  var handleSelectChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (e) {
    onChange(e.target.value);
  }, [onChange]);

  // Memoize the button click handler factory
  var createButtonClickHandler = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (value) {
    return function () {
      onChange(value);
    };
  }, [onChange]);
  return /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-container ".concat(className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-mobile"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "tabs",
    className: "publishpress-hub-filter-label-sr"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select an option', 'publishpress-hub')), /*#__PURE__*/React.createElement("select", {
    id: "tabs",
    className: "publishpress-hub-filter-select",
    value: activeSelectedOption,
    onChange: handleSelectChange
  }, /*#__PURE__*/React.createElement("optgroup", {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Options', 'publishpress-hub')
  }, options.map(function (filter) {
    return /*#__PURE__*/React.createElement("option", {
      key: filter.value,
      value: filter.value
    }, filter.label, " (", filter.total, ")");
  })))), /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-desktop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-buttons-bar"
  }, options.map(function (filter) {
    var isSelected = activeSelectedOption === filter.value;
    var buttonClass = isSelected ? 'active' : '';
    var isDisabled = !filter.total;
    return /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: "filter-".concat(filter.value),
      className: "publishpress-hub-filter-button ".concat(buttonClass, " ").concat(isDisabled ? 'disabled' : ''),
      onClick: createButtonClickHandler(filter.value),
      disabled: filter.total === 0
    }, filter.label, " ", filter.total > 0 && "(".concat(filter.total, ")"));
  }), children)));
};

// Memoize the component to prevent unnecessary re-renders
var FilterButtonsBar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(FilterButtonsBarComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterButtonsBar);

/***/ }),

/***/ "./assets/src/jsx/components/pages/error-page.jsx":
/*!********************************************************!*\
  !*** ./assets/src/jsx/components/pages/error-page.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorPage: () => (/* binding */ ErrorPage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../admin-page */ "./assets/src/jsx/components/admin-page/index.jsx");



var ErrorPageComponent = function ErrorPageComponent(_ref) {
  var _error$data, _error$data2;
  var error = _ref.error,
    title = _ref.title,
    logoUrl = _ref.logoUrl;
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_2__.AdminPageLayout, {
    title: title,
    logoUrl: logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-dashboard"
  }, /*#__PURE__*/React.createElement("div", {
    className: "error-message"
  }, (error === null || error === void 0 || (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.status) && sprintf((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error [%s]: %s', 'publishpress-hub'), error.data.status, error.message), !(error !== null && error !== void 0 && (_error$data2 = error.data) !== null && _error$data2 !== void 0 && _error$data2.status) && sprintf((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error: %s', 'publishpress-hub'), error.message))));
};
var ErrorPage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ErrorPageComponent);

/***/ }),

/***/ "./assets/src/jsx/components/pages/plugins-dashboard.jsx":
/*!***************************************************************!*\
  !*** ./assets/src/jsx/components/pages/plugins-dashboard.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginsDashboard: () => (/* binding */ PluginsDashboard)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../admin-page */ "./assets/src/jsx/components/admin-page/index.jsx");
/* harmony import */ var _filter_filter_buttons_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filter/filter-buttons-bar */ "./assets/src/jsx/components/filter/filter-buttons-bar.jsx");
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../stores/plugins-dashboard */ "./assets/src/jsx/stores/plugins-dashboard/index.jsx");
/* harmony import */ var _plugins_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../plugins-list */ "./assets/src/jsx/components/plugins-list/index.jsx");
/* harmony import */ var _pages_error_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../pages/error-page */ "./assets/src/jsx/components/pages/error-page.jsx");








var _window$ppHubPluginsD = window.ppHubPluginsDashboardConfig,
  logoUrl = _window$ppHubPluginsD.logoUrl,
  pluginIconBaseUrl = _window$ppHubPluginsD.pluginIconBaseUrl;

// Move selector outside component to prevent recreation on each render
var selectPluginsDashboardData = function selectPluginsDashboardData(select) {
  return {
    selectedFilter: select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store).getSelectedFilter(),
    filterCounts: select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store).getFilterCounts(),
    plugins: select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store).getFilteredPlugins(),
    isLoading: select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store).getIsLoading(),
    error: select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store).getError()
  };
};
var PluginsDashboardComponent = function PluginsDashboardComponent() {
  var _useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(selectPluginsDashboardData, []),
    selectedFilter = _useSelect.selectedFilter,
    filterCounts = _useSelect.filterCounts,
    plugins = _useSelect.plugins,
    isLoading = _useSelect.isLoading,
    error = _useSelect.error;
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store),
    setSelectedFilter = _useDispatch.setSelectedFilter,
    fetchPlugins = _useDispatch.fetchPlugins;
  var handleFilterChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (selectedFilter) {
    setSelectedFilter(selectedFilter);
  }, [setSelectedFilter]);
  var title = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Plugins Dashboard', 'publishpress-hub');
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchPlugins();
  }, [fetchPlugins]);
  var filterOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return [{
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'publishpress-hub'),
      value: 'all',
      total: filterCounts.all
    }, {
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlicensed', 'publishpress-hub'),
      value: 'unlicensed',
      total: filterCounts.unlicensed
    }, {
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Active', 'publishpress-hub'),
      value: 'active',
      total: filterCounts.active
    }, {
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inactive', 'publishpress-hub'),
      value: 'inactive',
      total: filterCounts.inactive
    }, {
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not installed', 'publishpress-hub'),
      value: 'notInstalled',
      total: filterCounts.notInstalled
    }];
  }, [filterCounts]);
  if (error) {
    return /*#__PURE__*/React.createElement(_pages_error_page__WEBPACK_IMPORTED_MODULE_7__.ErrorPage, {
      error: error,
      title: title,
      logoUrl: logoUrl
    });
  }
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_3__.AdminPageLayout, {
    title: title,
    logoUrl: logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-dashboard"
  }, /*#__PURE__*/React.createElement(_filter_filter_buttons_bar__WEBPACK_IMPORTED_MODULE_4__["default"], {
    options: filterOptions,
    selectedOption: selectedFilter,
    onChange: handleFilterChange
  }), /*#__PURE__*/React.createElement(_plugins_list__WEBPACK_IMPORTED_MODULE_6__.PluginsList, {
    plugins: plugins,
    isLoading: isLoading,
    pluginIconBaseUrl: pluginIconBaseUrl
  })));
};
var PluginsDashboard = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(PluginsDashboardComponent);

/***/ }),

/***/ "./assets/src/jsx/components/plugins-list/index.jsx":
/*!**********************************************************!*\
  !*** ./assets/src/jsx/components/plugins-list/index.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginsList: () => (/* binding */ PluginsList)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tooltip */ "./assets/src/jsx/components/tooltip/index.jsx");
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../buttons/button */ "./assets/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _badge_badge__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../badge/badge */ "./assets/src/jsx/components/badge/badge.jsx");
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../stores/plugins-dashboard */ "./assets/src/jsx/stores/plugins-dashboard/index.jsx");








var PluginsListComponent = function PluginsListComponent(_ref) {
  var plugins = _ref.plugins,
    pluginIconBaseUrl = _ref.pluginIconBaseUrl;
  var getStatusFlagClass = function getStatusFlagClass(plugin) {
    return classnames__WEBPACK_IMPORTED_MODULE_3___default()({
      'active': plugin.isActive,
      'inactive': !plugin.isActive,
      'pro': plugin.isPro,
      'free': !plugin.isPro,
      'licensed': plugin.isLicensed,
      'unlicensed': !plugin.isLicensed,
      'installed': plugin.isInstalled,
      'not-installed': !plugin.isInstalled
    });
  };
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_7__.store),
    installFreePlugin = _useDispatch.installFreePlugin;
  var getStatusFlagTooltipText = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (plugin) {
    if (!plugin.isInstalled) {
      return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is not installed.', 'publishpress-hub');
    }
    if (plugin.isActive) {
      return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is active.', 'publishpress-hub');
    }
    if (!plugin.isActive) {
      return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is not active.', 'publishpress-hub');
    }
  }, []);
  var onClickInstall = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (plugin) {
    installFreePlugin(plugin.slugFree);
  }, []);
  var onClickManageLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (plugin) {
    console.log('onClickManageLicense', plugin);
  }, []);
  var onClickActivateLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (plugin) {
    console.log('onClickActivateLicense', plugin);
  }, []);
  var onClickUpgradeToPro = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (plugin) {
    console.log('onClickUpgradeToPro', plugin);
  }, []);
  var getActionButton = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (_ref2) {
    var variant = _ref2.variant,
      onClick = _ref2.onClick,
      text = _ref2.text,
      inProgress = _ref2.inProgress;
    return /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__.Button, {
      variant: variant,
      onClick: onClick,
      isLoading: inProgress
    }, text);
  }, []);
  var ActionButton = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (_ref3) {
    var plugin = _ref3.plugin;
    if (!plugin.isInstalled) {
      var _plugin$installation;
      return getActionButton({
        variant: 'secondary',
        onClick: function onClick() {
          return onClickInstall(plugin);
        },
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Install', 'publishpress-hub'),
        inProgress: plugin === null || plugin === void 0 || (_plugin$installation = plugin.installation) === null || _plugin$installation === void 0 ? void 0 : _plugin$installation.inProgress
      });
    }
    if (!plugin.isPro) {
      var _plugin$installation2;
      return getActionButton({
        variant: 'highlight',
        onClick: function onClick() {
          return onClickUpgradeToPro(plugin);
        },
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upgrade to Pro', 'publishpress-hub'),
        inProgress: plugin === null || plugin === void 0 || (_plugin$installation2 = plugin.installation) === null || _plugin$installation2 === void 0 ? void 0 : _plugin$installation2.inProgress
      });
    }
    if (plugin.isLicensed) {
      var _plugin$installation3;
      return getActionButton({
        variant: 'secondary',
        onClick: function onClick() {
          return onClickManageLicense(plugin);
        },
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manage License', 'publishpress-hub'),
        inProgress: plugin === null || plugin === void 0 || (_plugin$installation3 = plugin.installation) === null || _plugin$installation3 === void 0 ? void 0 : _plugin$installation3.inProgress
      });
    }
    if (!plugin.isLicensed) {
      var _plugin$installation4;
      return getActionButton({
        variant: 'secondary',
        onClick: function onClick() {
          return onClickActivateLicense(plugin);
        },
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate License', 'publishpress-hub'),
        inProgress: plugin === null || plugin === void 0 || (_plugin$installation4 = plugin.installation) === null || _plugin$installation4 === void 0 ? void 0 : _plugin$installation4.inProgress
      });
    }
    return null;
  }, []);
  var StatusFlag = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (_ref4) {
    var _plugin$installation5;
    var plugin = _ref4.plugin;
    if (!plugin.isInstalled && plugin !== null && plugin !== void 0 && (_plugin$installation5 = plugin.installation) !== null && _plugin$installation5 !== void 0 && _plugin$installation5.inProgress) {
      return /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_6__.Badge, {
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Installing', 'publishpress-hub'),
        className: "installing"
      });
    }
    if (!plugin.isInstalled) {
      return /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_6__.Badge, {
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not Installed', 'publishpress-hub'),
        className: "not-installed"
      });
    }
    if (!plugin.isPro) {
      return /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_6__.Badge, {
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Free', 'publishpress-hub'),
        className: "free"
      });
    }
    if (plugin.isLicensed) {
      return /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_6__.Badge, {
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Licensed', 'publishpress-hub'),
        className: "licensed"
      });
    }
    if (!plugin.isLicensed) {
      return /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_6__.Badge, {
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlicensed', 'publishpress-hub'),
        className: "unlicensed"
      });
    }
    return null;
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list"
  }, plugins.map(function (plugin) {
    return /*#__PURE__*/React.createElement("div", {
      key: "plugin-".concat(plugin.slugFree),
      className: "pp-hub-plugins-list-item ".concat(getStatusFlagClass(plugin))
    }, /*#__PURE__*/React.createElement("div", {
      className: "pp-hub-plugins-list-item-icon"
    }, /*#__PURE__*/React.createElement("img", {
      src: "".concat(pluginIconBaseUrl, "images/plugin-icons/").concat(plugin.iconFile, "-96x96.png"),
      alt: plugin.name
    })), /*#__PURE__*/React.createElement("div", {
      className: "pp-hub-plugins-list-item-info"
    }, /*#__PURE__*/React.createElement(_tooltip__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
      text: getStatusFlagTooltipText(plugin),
      placement: "top",
      useCustom: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "pp-hub-plugins-list-item-name"
    }, plugin.name, plugin.isPro && ' Pro')), /*#__PURE__*/React.createElement("div", {
      className: "pp-hub-plugins-list-item-description"
    }, plugin.description)), /*#__PURE__*/React.createElement("div", {
      className: "pp-hub-plugins-list-item-actions"
    }, /*#__PURE__*/React.createElement(StatusFlag, {
      plugin: plugin
    }), /*#__PURE__*/React.createElement(ActionButton, {
      plugin: plugin
    })));
  }));
};
var PluginsList = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(PluginsListComponent);

/***/ }),

/***/ "./assets/src/jsx/components/tooltip/index.jsx":
/*!*****************************************************!*\
  !*** ./assets/src/jsx/components/tooltip/index.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tooltip: () => (/* binding */ Tooltip)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }


var CustomTooltipComponent = function CustomTooltipComponent(_ref) {
  var children = _ref.children,
    text = _ref.text,
    _ref$placement = _ref.placement,
    placement = _ref$placement === void 0 ? 'top' : _ref$placement,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$useCustom = _ref.useCustom,
    useCustom = _ref$useCustom === void 0 ? false : _ref$useCustom,
    _ref$delay = _ref.delay,
    delay = _ref$delay === void 0 ? 700 : _ref$delay;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isVisible = _useState2[0],
    setIsVisible = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      top: 0,
      left: 0
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    position = _useState4[0],
    setPosition = _useState4[1];
  var triggerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var tooltipRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var showTimeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!isVisible || !triggerRef.current || !tooltipRef.current || !useCustom) return;
    var updatePosition = function updatePosition() {
      var triggerRect = triggerRef.current.getBoundingClientRect();
      var tooltipRect = tooltipRef.current.getBoundingClientRect();
      var top, left;
      switch (placement) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
        default:
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      }
      setPosition({
        top: top,
        left: left
      });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    return function () {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, placement, useCustom]);

  // Cleanup timeout on unmount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current);
      }
    };
  }, []);
  if (!text) {
    return children;
  }
  var handleMouseEnter = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    // Clear any existing timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    // Start timeout to show tooltip
    showTimeoutRef.current = setTimeout(function () {
      setIsVisible(true);
      showTimeoutRef.current = null;
    }, delay);
  }, [delay]);
  var handleMouseLeave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    // Cancel pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    // Immediately hide tooltip
    setIsVisible(false);
  }, []);
  var handleFocus = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    // Clear any existing timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    // Start timeout to show tooltip
    showTimeoutRef.current = setTimeout(function () {
      setIsVisible(true);
      showTimeoutRef.current = null;
    }, delay);
  }, [delay]);
  var handleBlur = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    // Cancel pending show timeout
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }

    // Immediately hide tooltip
    setIsVisible(false);
  }, []);

  // Use custom tooltip implementation
  if (useCustom) {
    var combinedClassName = "pp-hub-tooltip-trigger ".concat(className).trim();
    return /*#__PURE__*/React.createElement("div", {
      className: combinedClassName,
      style: {
        position: 'relative',
        display: 'inline-block'
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: triggerRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur
    }, children), isVisible && /*#__PURE__*/React.createElement("div", {
      ref: tooltipRef,
      className: "pp-hub-tooltip pp-hub-tooltip--custom",
      style: {
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 'var(--pp-hub-z-tooltip)',
        pointerEvents: 'none',
        opacity: 1,
        transform: 'none'
      }
    }, text));
  }

  // Use WordPress's default tooltip (renders in portal)
  var classNames = "pp-hub-tooltip ".concat(className).trim();
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    text: text,
    placement: placement,
    className: classNames
  }, children);
};
var Tooltip = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(CustomTooltipComponent);

/***/ }),

/***/ "./assets/src/jsx/stores/plugins-dashboard/actions.jsx":
/*!*************************************************************!*\
  !*** ./assets/src/jsx/stores/plugins-dashboard/actions.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchPlugins: () => (/* binding */ fetchPlugins),
/* harmony export */   installFreePlugin: () => (/* binding */ installFreePlugin),
/* harmony export */   setCurrentFilter: () => (/* binding */ setCurrentFilter),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setLoading: () => (/* binding */ setLoading),
/* harmony export */   setPlugins: () => (/* binding */ setPlugins),
/* harmony export */   setSelectedFilter: () => (/* binding */ setSelectedFilter)
/* harmony export */ });
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data-controls */ "@wordpress/data-controls");
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var _marked = /*#__PURE__*/_regenerator().m(setSelectedFilter),
  _marked2 = /*#__PURE__*/_regenerator().m(setPlugins),
  _marked3 = /*#__PURE__*/_regenerator().m(setLoading),
  _marked4 = /*#__PURE__*/_regenerator().m(setError),
  _marked5 = /*#__PURE__*/_regenerator().m(setCurrentFilter),
  _marked6 = /*#__PURE__*/_regenerator().m(fetchPlugins),
  _marked7 = /*#__PURE__*/_regenerator().m(installFreePlugin);

var apiNonce = window.ppHubPluginsDashboardConfig.apiNonce;
function setSelectedFilter(selectedFilter) {
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return {
          type: 'SET_SELECTED_FILTER',
          selectedFilter: selectedFilter
        };
      case 1:
        return _context.a(2);
    }
  }, _marked);
}
function setPlugins(plugins) {
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _context2.n = 1;
        return {
          type: 'SET_PLUGINS',
          plugins: plugins
        };
      case 1:
        return _context2.a(2);
    }
  }, _marked2);
}
function setLoading(isLoading) {
  return _regenerator().w(function (_context3) {
    while (1) switch (_context3.n) {
      case 0:
        _context3.n = 1;
        return {
          type: 'SET_LOADING',
          isLoading: isLoading
        };
      case 1:
        return _context3.a(2);
    }
  }, _marked3);
}
function setError(error) {
  return _regenerator().w(function (_context4) {
    while (1) switch (_context4.n) {
      case 0:
        _context4.n = 1;
        return {
          type: 'SET_ERROR',
          error: error
        };
      case 1:
        return _context4.a(2);
    }
  }, _marked4);
}
function setCurrentFilter(currentFilter) {
  return _regenerator().w(function (_context5) {
    while (1) switch (_context5.n) {
      case 0:
        _context5.n = 1;
        return {
          type: 'SET_CURRENT_FILTER',
          currentFilter: currentFilter
        };
      case 1:
        return _context5.a(2);
    }
  }, _marked5);
}
function fetchPlugins() {
  var data, _t;
  return _regenerator().w(function (_context6) {
    while (1) switch (_context6.n) {
      case 0:
        _context6.p = 0;
        _context6.n = 1;
        return {
          type: 'FETCH_PLUGINS_START'
        };
      case 1:
        _context6.n = 2;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: '/plugins'
        });
      case 2:
        data = _context6.v;
        if (!data.success) {
          _context6.n = 4;
          break;
        }
        _context6.n = 3;
        return {
          type: 'FETCH_PLUGINS_SUCCESS',
          data: data.data
        };
      case 3:
        _context6.n = 5;
        break;
      case 4:
        _context6.n = 5;
        return {
          type: 'FETCH_PLUGINS_ERROR',
          error: data.error
        };
      case 5:
        _context6.n = 7;
        break;
      case 6:
        _context6.p = 6;
        _t = _context6.v;
        _context6.n = 7;
        return {
          type: 'FETCH_PLUGINS_ERROR',
          error: _t
        };
      case 7:
        return _context6.a(2);
    }
  }, _marked6, null, [[0, 6]]);
}
function installFreePlugin(pluginSlug) {
  var data, _t2;
  return _regenerator().w(function (_context7) {
    while (1) switch (_context7.n) {
      case 0:
        _context7.p = 0;
        _context7.n = 1;
        return {
          type: 'INSTALL_PLUGIN_START',
          data: {
            pluginSlug: pluginSlug
          }
        };
      case 1:
        _context7.n = 2;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "/plugins/".concat(pluginSlug, "/install/free"),
          method: 'POST'
        });
      case 2:
        data = _context7.v;
        if (!data.success) {
          _context7.n = 4;
          break;
        }
        _context7.n = 3;
        return {
          type: 'INSTALL_PLUGIN_SUCCESS',
          data: data.data
        };
      case 3:
        _context7.n = 5;
        break;
      case 4:
        _context7.n = 5;
        return {
          type: 'INSTALL_PLUGIN_ERROR',
          pluginSlug: pluginSlug,
          error: data.error
        };
      case 5:
        _context7.n = 7;
        break;
      case 6:
        _context7.p = 6;
        _t2 = _context7.v;
        _context7.n = 7;
        return {
          type: 'INSTALL_PLUGIN_ERROR',
          pluginSlug: pluginSlug,
          error: _t2
        };
      case 7:
        return _context7.a(2);
    }
  }, _marked7, null, [[0, 6]]);
}

/***/ }),

/***/ "./assets/src/jsx/stores/plugins-dashboard/index.jsx":
/*!***********************************************************!*\
  !*** ./assets/src/jsx/stores/plugins-dashboard/index.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   store: () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data-controls */ "@wordpress/data-controls");
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./name */ "./assets/src/jsx/stores/plugins-dashboard/name.jsx");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducer */ "./assets/src/jsx/stores/plugins-dashboard/reducer.jsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectors */ "./assets/src/jsx/stores/plugins-dashboard/selectors.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions */ "./assets/src/jsx/stores/plugins-dashboard/actions.jsx");






var store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(_name__WEBPACK_IMPORTED_MODULE_2__.STORE_NAME, {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_3__.reducer,
  actions: _actions__WEBPACK_IMPORTED_MODULE_5__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_4__,
  controls: _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_1__.controls
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

/***/ }),

/***/ "./assets/src/jsx/stores/plugins-dashboard/name.jsx":
/*!**********************************************************!*\
  !*** ./assets/src/jsx/stores/plugins-dashboard/name.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STORE_NAME: () => (/* binding */ STORE_NAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var STORE_NAME = 'publishpress-hub/plugins-dashboard';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (STORE_NAME);

/***/ }),

/***/ "./assets/src/jsx/stores/plugins-dashboard/reducer.jsx":
/*!*************************************************************!*\
  !*** ./assets/src/jsx/stores/plugins-dashboard/reducer.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_STATE: () => (/* binding */ DEFAULT_STATE),
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var DEFAULT_STATE = {
  selectedFilter: 'all',
  plugins: [],
  isLoading: false,
  error: null,
  currentFilter: 'all'
};
var setSelectedFilter = function setSelectedFilter(state, selectedFilter) {
  return _objectSpread(_objectSpread({}, state), {}, {
    selectedFilter: selectedFilter
  });
};
var setPlugins = function setPlugins(state, plugins) {
  return _objectSpread(_objectSpread({}, state), {}, {
    plugins: plugins,
    isLoading: false,
    error: null
  });
};
var setLoading = function setLoading(state, isLoading) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isLoading: isLoading
  });
};
var setError = function setError(state, error) {
  return _objectSpread(_objectSpread({}, state), {}, {
    error: error,
    isLoading: false
  });
};
var fetchPluginsStart = function fetchPluginsStart(state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isLoading: true,
    error: null
  });
};
var fetchPluginsSuccess = function fetchPluginsSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    plugins: data,
    isLoading: false,
    error: null
  });
};
var fetchPluginsError = function fetchPluginsError(state, error) {
  return _objectSpread(_objectSpread({}, state), {}, {
    error: error,
    isLoading: false
  });
};
var setCurrentFilter = function setCurrentFilter(state, currentFilter) {
  return _objectSpread(_objectSpread({}, state), {}, {
    currentFilter: currentFilter
  });
};
var installPluginStart = function installPluginStart(state, data) {
  var plugins = state.plugins.map(function (plugin) {
    if (plugin.slugFree === data.pluginSlug) {
      return _objectSpread(_objectSpread({}, plugin), {}, {
        installation: {
          inProgress: true,
          error: null
        }
      });
    }
    return plugin;
  });
  return _objectSpread(_objectSpread({}, state), {}, {
    plugins: plugins
  });
};
var installPluginSuccess = function installPluginSuccess(state, data) {
  var plugins = data.plugins.map(function (plugin) {
    if (plugin.slug === data.pluginSlug) {
      return _objectSpread(_objectSpread({}, plugin), {}, {
        installation: {
          inProgress: false,
          error: null
        }
      });
    }
    return plugin;
  });
  return _objectSpread(_objectSpread({}, state), {}, {
    plugins: plugins
  });
};
var installPluginError = function installPluginError(state, pluginSlug, error) {
  var plugins = data.plugins.map(function (plugin) {
    if (plugin.slug === pluginSlug) {
      return _objectSpread(_objectSpread({}, plugin), {}, {
        installation: {
          inProgress: false,
          error: error
        }
      });
    }
    return plugin;
  });
  return _objectSpread(_objectSpread({}, state), {}, {
    plugins: plugins
  });
};
var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  if (!action) {
    return state;
  }
  switch (action.type) {
    case 'SET_SELECTED_FILTER':
      return setSelectedFilter(state, action.selectedFilter);
    case 'SET_PLUGINS':
      return setPlugins(state, action.plugins);
    case 'SET_LOADING':
      return setLoading(state, action.isLoading);
    case 'SET_ERROR':
      return setError(state, action.error);
    case 'FETCH_PLUGINS_START':
      return fetchPluginsStart(state);
    case 'FETCH_PLUGINS_SUCCESS':
      return fetchPluginsSuccess(state, action.data);
    case 'FETCH_PLUGINS_ERROR':
      return fetchPluginsError(state, action.error);
    case 'SET_CURRENT_FILTER':
      return setCurrentFilter(state, action.currentFilter);
    case 'INSTALL_PLUGIN_START':
      return installPluginStart(state, action.data);
    case 'INSTALL_PLUGIN_SUCCESS':
      return installPluginSuccess(state, action.data);
    case 'INSTALL_PLUGIN_ERROR':
      return installPluginError(state, action.pluginSlug, action.error);
    default:
      return state;
  }
};

/***/ }),

/***/ "./assets/src/jsx/stores/plugins-dashboard/selectors.jsx":
/*!***************************************************************!*\
  !*** ./assets/src/jsx/stores/plugins-dashboard/selectors.jsx ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentFilter: () => (/* binding */ getCurrentFilter),
/* harmony export */   getError: () => (/* binding */ getError),
/* harmony export */   getFilterCounts: () => (/* binding */ getFilterCounts),
/* harmony export */   getFilteredPlugins: () => (/* binding */ getFilteredPlugins),
/* harmony export */   getIsLoading: () => (/* binding */ getIsLoading),
/* harmony export */   getPlugins: () => (/* binding */ getPlugins),
/* harmony export */   getSelectedFilter: () => (/* binding */ getSelectedFilter)
/* harmony export */ });
var getSelectedFilter = function getSelectedFilter(state) {
  return state.selectedFilter;
};
var getPlugins = function getPlugins(state) {
  return state.plugins;
};

// Memoization cache for getFilteredPlugins
var lastPluginsForFiltering = null;
var lastSelectedFilterForFiltering = null;
var lastFilteredPlugins = null;
var sortPlugins = function sortPlugins(plugins) {
  return plugins.sort(function (a, b) {
    // First sort by installed status
    if (a.isInstalled && !b.isInstalled) {
      return -1;
    }
    if (!a.isInstalled && b.isInstalled) {
      return 1;
    }

    // If both are installed or both are not installed, sort by pro status
    if (a.isInstalled && b.isInstalled) {
      if (a.isLicensed && !b.isLicensed) {
        return -1;
      }
      if (!a.isLicensed && b.isLicensed) {
        return 1;
      }
      if (a.isPro && !b.isPro) {
        return -1;
      }
      if (!a.isPro && b.isPro) {
        return 1;
      }
    }
    return 0;
  });
};
var getFilteredPlugins = function getFilteredPlugins(state) {
  var plugins = state.plugins;
  var selectedFilter = state.selectedFilter;

  // If neither plugins nor selectedFilter have changed, return cached result
  if (plugins === lastPluginsForFiltering && selectedFilter === lastSelectedFilterForFiltering && lastFilteredPlugins !== null) {
    return lastFilteredPlugins;
  }

  // Calculate filtered plugins
  var filteredPlugins;
  if (!selectedFilter || selectedFilter === 'all') {
    filteredPlugins = plugins;
  } else {
    filteredPlugins = plugins.filter(function (plugin) {
      return filterPlugin(plugin, selectedFilter);
    });
  }
  var sortedPlugins = sortPlugins(filteredPlugins);

  // Cache the result
  lastPluginsForFiltering = plugins;
  lastSelectedFilterForFiltering = selectedFilter;
  lastFilteredPlugins = sortedPlugins;
  return lastFilteredPlugins;
};
var getIsLoading = function getIsLoading(state) {
  return state.isLoading;
};
var getError = function getError(state) {
  return state.error;
};
var getCurrentFilter = function getCurrentFilter(state) {
  return state.currentFilter;
};

// Memoization cache for getFilterCounts
var lastPluginsForFilterCounts = null;
var lastFilterCountsForFilterCounts = null;
var getFilterCounts = function getFilterCounts(state) {
  var plugins = state.plugins;

  // If plugins haven't changed, return cached result
  if (plugins === lastPluginsForFilterCounts && lastFilterCountsForFilterCounts !== null) {
    return lastFilterCountsForFilterCounts;
  }

  // Calculate new filter counts
  var filterCounts = {
    all: plugins.filter(function (plugin) {
      return filterPlugin(plugin, 'all');
    }).length,
    unlicensed: plugins.filter(function (plugin) {
      return filterPlugin(plugin, 'unlicensed');
    }).length,
    active: plugins.filter(function (plugin) {
      return filterPlugin(plugin, 'active');
    }).length,
    inactive: plugins.filter(function (plugin) {
      return filterPlugin(plugin, 'inactive');
    }).length,
    notInstalled: plugins.filter(function (plugin) {
      return filterPlugin(plugin, 'notInstalled');
    }).length
  };

  // Cache the result
  lastPluginsForFilterCounts = plugins;
  lastFilterCountsForFilterCounts = filterCounts;
  return filterCounts;
};
var filterPlugin = function filterPlugin(plugin, selectedFilter) {
  switch (selectedFilter) {
    case 'unlicensed':
      return !plugin.isLicensed && plugin.isInstalled;
    case 'active':
      return plugin.isActive && plugin.isInstalled;
    case 'inactive':
      return !plugin.isActive && plugin.isInstalled;
    case 'notInstalled':
      return !plugin.isInstalled;
    default:
      return true;
  }
};

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else // removed by dead control flow
{}
}());


/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ "@publishpress/hub-i18n":
/*!***************************************!*\
  !*** external "publishpressHub.i18n" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = publishpressHub.i18n;

/***/ }),

/***/ "@wordpress/api-fetch":
/*!******************************!*\
  !*** external "wp.apiFetch" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = wp.apiFetch;

/***/ }),

/***/ "@wordpress/components":
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = wp.components;

/***/ }),

/***/ "@wordpress/data":
/*!**************************!*\
  !*** external "wp.data" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = wp.data;

/***/ }),

/***/ "@wordpress/data-controls":
/*!**********************************!*\
  !*** external "wp.dataControls" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = wp.dataControls;

/***/ }),

/***/ "@wordpress/element":
/*!*****************************!*\
  !*** external "wp.element" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = wp.element;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**********************************************!*\
  !*** ./assets/src/jsx/plugins-dashboard.jsx ***!
  \**********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_pages_plugins_dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/pages/plugins-dashboard */ "./assets/src/jsx/components/pages/plugins-dashboard.jsx");
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stores/plugins-dashboard */ "./assets/src/jsx/stores/plugins-dashboard/index.jsx");



var pluginsDashboardContainer = document.getElementById('publishpress-hub-plugins-dashboard-container');
if (pluginsDashboardContainer) {
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(pluginsDashboardContainer);
  root.render(/*#__PURE__*/React.createElement(_components_pages_plugins_dashboard__WEBPACK_IMPORTED_MODULE_1__.PluginsDashboard, null));
}
})();

/******/ })()
;
//# sourceMappingURL=plugins-dashboard.js.map
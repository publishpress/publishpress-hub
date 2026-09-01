/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/src/jsx/components/admin-page/container.jsx"
/*!***************************************************************!*\
  !*** ./resources/src/jsx/components/admin-page/container.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageContainer: () => (/* binding */ AdminPageContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Admin page container.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\admin-page\container
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


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

/***/ },

/***/ "./resources/src/jsx/components/admin-page/footer.jsx"
/*!************************************************************!*\
  !*** ./resources/src/jsx/components/admin-page/footer.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Footer: () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/escape-html */ "./node_modules/@wordpress/escape-html/build-module/index.mjs");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);



var FooterComponent = function FooterComponent(_ref) {
  var pluginSlug = _ref.pluginSlug,
    pluginName = _ref.pluginName,
    pluginDocumentationUrl = _ref.pluginDocumentationUrl,
    pluginAboutUrl = _ref.pluginAboutUrl,
    pluginSupportUrl = _ref.pluginSupportUrl,
    logoUrl = _ref.logoUrl;
  var stars = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return Array(5).fill('<span class="dashicons dashicons-star-filled"></span>').join('');
  }, []);
  return /*#__PURE__*/React.createElement("footer", {
    className: "pp-hub-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-footer-rating"
  }, /*#__PURE__*/React.createElement("a", {
    href: "//wordpress.org/support/plugin/".concat(pluginSlug, "/reviews/#new-post"),
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s is the plugin name, %s is the rating */
      (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_0__.escapeHTML)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('If you like %s please leave us a %s rating. Thank you!', 'publishpress-hub')), "<strong>".concat((0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_0__.escapeHTML)(pluginName), "</strong>,"), "<span className=\"pp-hub-footer-stars\">".concat(stars, "</span>"))
    }
  }))), /*#__PURE__*/React.createElement("hr", {
    className: "pp-hub-footer-separator"
  }), /*#__PURE__*/React.createElement("nav", {
    className: "pp-hub-footer-nav"
  }, /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: pluginAboutUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s is the plugin name */
    (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('About %s', 'publishpress-hub'), pluginName)
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('About', 'publishpress-hub'))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: pluginDocumentationUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s is the plugin name */
    (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Documentation for %s', 'publishpress-hub'), pluginName)
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Documentation', 'publishpress-hub'))), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: pluginSupportUrl,
    target: "_blank",
    rel: "noopener noreferrer",
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s is the plugin name */
    (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contact the %s team', 'publishpress-hub'), pluginName)
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contact', 'publishpress-hub'))))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-footer-logo"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://publishpress.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    src: logoUrl,
    alt: "PublishPress"
  }))));
};
var Footer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(FooterComponent);

/***/ },

/***/ "./resources/src/jsx/components/admin-page/header.jsx"
/*!************************************************************!*\
  !*** ./resources/src/jsx/components/admin-page/header.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageHeader: () => (/* binding */ AdminPageHeader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Admin page header.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\admin-page\header
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





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
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_1__["default"], {
    variant: "secondary",
    href: "https://publishpress.com/publishpress-support/",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: "editor-help"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Get Support', 'publishpress-hub'))));
};

// Memoize the component to prevent unnecessary re-renders
var AdminPageHeader = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(AdminPageHeaderComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminPageHeader);

/***/ },

/***/ "./resources/src/jsx/components/admin-page/index.jsx"
/*!***********************************************************!*\
  !*** ./resources/src/jsx/components/admin-page/index.jsx ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageContainer: () => (/* reexport safe */ _container__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   AdminPageHeader: () => (/* reexport safe */ _header__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   AdminPageLayout: () => (/* reexport safe */ _layout__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Footer: () => (/* reexport safe */ _footer__WEBPACK_IMPORTED_MODULE_3__.Footer)
/* harmony export */ });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./resources/src/jsx/components/admin-page/layout.jsx");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container */ "./resources/src/jsx/components/admin-page/container.jsx");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header */ "./resources/src/jsx/components/admin-page/header.jsx");
/* harmony import */ var _footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer */ "./resources/src/jsx/components/admin-page/footer.jsx");
/**
 * Admin page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\admin-page
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






/***/ },

/***/ "./resources/src/jsx/components/admin-page/layout.jsx"
/*!************************************************************!*\
  !*** ./resources/src/jsx/components/admin-page/layout.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageLayout: () => (/* binding */ AdminPageLayout),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ "./resources/src/jsx/components/admin-page/container.jsx");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./resources/src/jsx/components/admin-page/header.jsx");
/**
 * Admin page layout.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\admin-page\layout
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */



var AdminPageLayout = function AdminPageLayout(_ref) {
  var title = _ref.title,
    logoUrl = _ref.logoUrl,
    children = _ref.children,
    titleChildren = _ref.titleChildren;
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-layout"
  }, /*#__PURE__*/React.createElement(_header__WEBPACK_IMPORTED_MODULE_1__.AdminPageHeader, {
    logoUrl: logoUrl
  }), /*#__PURE__*/React.createElement(_container__WEBPACK_IMPORTED_MODULE_0__.AdminPageContainer, null, title && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-layout__title-container"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "pp-hub-admin-page-layout__title"
  }, title), titleChildren && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-layout__title-children"
  }, titleChildren)), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-layout__content"
  }, children)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminPageLayout);

/***/ },

/***/ "./resources/src/jsx/components/buttons/button.jsx"
/*!*********************************************************!*\
  !*** ./resources/src/jsx/components/buttons/button.jsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["variant", "icon", "onClick", "href", "target", "rel", "className", "disabled", "title", "style", "children", "isFullWidth", "isLoading", "spinnerPosition"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * Button.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\buttons
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

;

var DEFAULT_TARGET = '_blank';
var DEFAULT_REL = 'noopener noreferrer';
var ButtonComponent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (_ref, ref) {
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
    _ref$spinnerPosition = _ref.spinnerPosition,
    spinnerPosition = _ref$spinnerPosition === void 0 ? 'right' : _ref$spinnerPosition,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var targetValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return target || (href ? DEFAULT_TARGET : undefined);
  }, [target, href]);
  var relValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return rel || (href ? DEFAULT_REL : undefined);
  }, [rel, href]);
  if (isLoading) {
    children = /*#__PURE__*/React.createElement(React.Fragment, null, spinnerPosition === 'left' && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null), children, spinnerPosition === 'right' && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, null));
    disabled = true;
  }
  var buttonClassName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var variantClassName = '';
    if (variant === 'highlight') {
      variantClassName = 'is-highlight';
    }
    if (variant === 'danger') {
      variantClassName = 'is-danger';
    }
    return "pp-hub-button ".concat(variantClassName, " ").concat(className ? className : '', " ").concat(isFullWidth ? 'is-full-width' : '', " ").concat(spinnerPosition === 'left' ? 'is-link-left' : '');
  }, [className, isFullWidth, variant, spinnerPosition]);
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, _extends({
    ref: ref,
    variant: variant,
    icon: icon,
    onClick: onClick,
    href: href,
    target: targetValue,
    rel: relValue,
    className: buttonClassName,
    disabled: disabled || isLoading,
    title: title,
    style: style
  }, restProps), children);
});
ButtonComponent.displayName = 'Button';

// Memoize the component to prevent unnecessary re-renders
var Button = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(ButtonComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ },

/***/ "./resources/src/jsx/components/pages/settings-page.jsx"
/*!**************************************************************!*\
  !*** ./resources/src/jsx/components/pages/settings-page.jsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsPage: () => (/* binding */ SettingsPage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../admin-page */ "./resources/src/jsx/components/admin-page/index.jsx");
/* harmony import */ var _settings_DiagnosticsTab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings/DiagnosticsTab */ "./resources/src/jsx/components/pages/settings/DiagnosticsTab.jsx");
/* harmony import */ var _settings_DebugLogTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings/DebugLogTab */ "./resources/src/jsx/components/pages/settings/DebugLogTab.jsx");
/**
 * Settings page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */







var _ref = window.ppHubSettingsPageConfig || {},
  logoUrl = _ref.logoUrl,
  debugModeEnabled = _ref.debugModeEnabled;
var TAB_QUERY_PARAM = 'tab';
var buildTabs = function buildTabs() {
  var tabs = [{
    name: 'diagnostics',
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Diagnostics', 'publishpress-hub'),
    className: 'pp-hub-settings-tab'
  }];
  if (debugModeEnabled) {
    tabs.push({
      name: 'debug-log',
      title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Debug Log', 'publishpress-hub'),
      className: 'pp-hub-settings-tab'
    });
  }
  return tabs;
};
var getInitialTabName = function getInitialTabName(tabs) {
  var _tabs$;
  var defaultTab = ((_tabs$ = tabs[0]) === null || _tabs$ === void 0 ? void 0 : _tabs$.name) || '';
  if (!defaultTab) {
    return '';
  }
  var currentUrl = new URL(window.location.href);
  var selectedTab = currentUrl.searchParams.get(TAB_QUERY_PARAM);
  var hasSelectedTab = tabs.some(function (tab) {
    return tab.name === selectedTab;
  });
  return hasSelectedTab ? selectedTab : defaultTab;
};
var updateSelectedTabInUrl = function updateSelectedTabInUrl(tabName) {
  if (!tabName) {
    return;
  }
  var currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set(TAB_QUERY_PARAM, tabName);
  window.history.replaceState({}, '', currentUrl.toString());
};
var renderTab = function renderTab(tab) {
  if (tab.name === 'debug-log') {
    return /*#__PURE__*/React.createElement(_settings_DebugLogTab__WEBPACK_IMPORTED_MODULE_5__.DebugLogTab, null);
  }
  return /*#__PURE__*/React.createElement(_settings_DiagnosticsTab__WEBPACK_IMPORTED_MODULE_4__.DiagnosticsTab, null);
};
var SettingsPageComponent = function SettingsPageComponent() {
  var title = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings', 'publishpress-hub');
  var tabs = buildTabs();
  var initialTabName = getInitialTabName(tabs);
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_3__.AdminPageLayout, {
    title: title,
    logoUrl: logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-settings-page"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    className: "pp-hub-settings-tabs",
    tabs: tabs,
    initialTabName: initialTabName,
    onSelect: function onSelect(tabName) {
      return updateSelectedTabInUrl(tabName);
    }
  }, renderTab)));
};
var SettingsPage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(SettingsPageComponent);

/***/ },

/***/ "./resources/src/jsx/components/pages/settings/DebugLogTab.jsx"
/*!*********************************************************************!*\
  !*** ./resources/src/jsx/components/pages/settings/DebugLogTab.jsx ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DebugLogTab: () => (/* binding */ DebugLogTab)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _RequestsLogView__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RequestsLogView */ "./resources/src/jsx/components/pages/settings/RequestsLogView.jsx");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Debug log viewer tab.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

;




var VIEW_REQUESTS = 'requests';
var VIEW_FULL_LOG = 'full-log';
var REFRESH_INTERVALS = [{
  value: 3,
  label: '3s'
}, {
  value: 5,
  label: '5s'
}, {
  value: 10,
  label: '10s'
}, {
  value: 30,
  label: '30s'
}, {
  value: 60,
  label: '60s'
}];
var DebugLogTabComponent = function DebugLogTabComponent() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    logContent = _useState2[0],
    setLogContent = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isClearing = _useState6[0],
    setIsClearing = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState8 = _slicedToArray(_useState7, 2),
    notice = _useState8[0],
    setNotice = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(VIEW_REQUESTS),
    _useState0 = _slicedToArray(_useState9, 2),
    viewMode = _useState0[0],
    setViewMode = _useState0[1];
  var _useState1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState10 = _slicedToArray(_useState1, 2),
    autoRefresh = _useState10[0],
    setAutoRefresh = _useState10[1];
  var _useState11 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(5),
    _useState12 = _slicedToArray(_useState11, 2),
    intervalSeconds = _useState12[0],
    setIntervalSeconds = _useState12[1];
  var _useState13 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(5),
    _useState14 = _slicedToArray(_useState13, 2),
    countdown = _useState14[0],
    setCountdown = _useState14[1];

  // Single timer ref — only one setInterval ever runs at a time.
  var tickRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Mutable refs so the single 1s tick closure never goes stale.
  // Changing the interval value only updates these refs; the timer is NOT recreated.
  var intervalSecondsRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(5);
  var countdownValueRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(5);

  // Tracks the active AbortController so we can cancel in-flight requests.
  var abortControllerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Cancel any in-flight request.
  var cancelInFlightRequest = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Abort on unmount so state is never set on an unmounted component.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return function () {
      cancelInFlightRequest();
    };
  }, [cancelInFlightRequest]);

  // Silent fetch for auto-refresh — no loading spinner, no error notice.
  var fetchLogSilent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var controller, response, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          cancelInFlightRequest();
          controller = new AbortController();
          abortControllerRef.current = controller;
          _context.p = 1;
          _context.n = 2;
          return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
            path: '/publishpress-hub/v1/settings/debug-log',
            signal: controller.signal
          });
        case 2:
          response = _context.v;
          setLogContent(response.log || '');
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
        case 4:
          _context.p = 4;
          if (abortControllerRef.current === controller) {
            abortControllerRef.current = null;
          }
          return _context.f(4);
        case 5:
          return _context.a(2);
      }
    }, _callee, null, [[1, 3, 4, 5]]);
  })), [cancelInFlightRequest]);

  // Manual fetch — shows loading state and error notice on failure.
  var fetchLog = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var controller, response, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          cancelInFlightRequest();
          setIsLoading(true);
          setNotice(null);
          controller = new AbortController();
          abortControllerRef.current = controller;
          _context2.p = 1;
          _context2.n = 2;
          return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
            path: '/publishpress-hub/v1/settings/debug-log',
            signal: controller.signal
          });
        case 2:
          response = _context2.v;
          setLogContent(response.log || '');
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          if ((_t2 === null || _t2 === void 0 ? void 0 : _t2.name) !== 'AbortError') {
            setNotice({
              status: 'error',
              message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to load the debug log. Please try again.', 'publishpress-hub')
            });
          }
        case 4:
          _context2.p = 4;
          if (abortControllerRef.current === controller) {
            abortControllerRef.current = null;
          }
          setIsLoading(false);
          return _context2.f(4);
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3, 4, 5]]);
  })), [cancelInFlightRequest]);

  // Initial load.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    fetchLog();
  }, [fetchLog]);

  // Auto-refresh: a single 1s tick reads mutable refs so it never goes stale
  // and never needs to be recreated when the interval value changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!autoRefresh) {
      clearInterval(tickRef.current);
      tickRef.current = null;
      countdownValueRef.current = intervalSecondsRef.current;
      setCountdown(intervalSecondsRef.current);
      return;
    }

    // Reset countdown display on enable.
    countdownValueRef.current = intervalSecondsRef.current;
    setCountdown(intervalSecondsRef.current);
    tickRef.current = setInterval(function () {
      countdownValueRef.current -= 1;
      setCountdown(countdownValueRef.current);
      if (countdownValueRef.current <= 0) {
        // Reset and fire.
        countdownValueRef.current = intervalSecondsRef.current;
        setCountdown(intervalSecondsRef.current);
        fetchLogSilent();
      }
    }, 1000);
    return function () {
      clearInterval(tickRef.current);
      tickRef.current = null;
    };
    // intervalSeconds intentionally omitted — changes are handled via refs below.
  }, [autoRefresh, fetchLogSilent]); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing the interval updates refs immediately; the running timer picks up
  // the new value on its next tick without needing to be recreated.
  var handleIntervalChange = function handleIntervalChange(e) {
    var value = Number(e.target.value);
    setIntervalSeconds(value);
    intervalSecondsRef.current = value;
    countdownValueRef.current = value;
    setCountdown(value);
  };
  var handleClearLog = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            setIsClearing(true);
            setNotice(null);
            _context3.p = 1;
            _context3.n = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: '/publishpress-hub/v1/settings/debug-log/clear',
              method: 'POST'
            });
          case 2:
            setLogContent('');
            setNotice({
              status: 'success',
              message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug log cleared successfully.', 'publishpress-hub')
            });
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
            setNotice({
              status: 'error',
              message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to clear the debug log. Please try again.', 'publishpress-hub')
            });
          case 4:
            _context3.p = 4;
            setIsClearing(false);
            return _context3.f(4);
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3, 4, 5]]);
    }));
    return function handleClearLog() {
      return _ref3.apply(this, arguments);
    };
  }();
  var handleCopyToClipboard = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var copyViaExecCommand, _navigator$clipboard, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            if (logContent) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            // navigator.clipboard requires a secure context (HTTPS).
            // Fall back to the legacy execCommand approach for HTTP dev environments.
            copyViaExecCommand = function copyViaExecCommand() {
              var el = document.createElement('textarea');
              el.value = logContent;
              el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
              document.body.appendChild(el);
              el.focus();
              el.select();
              var success = document.execCommand('copy');
              document.body.removeChild(el);
              return success;
            };
            _context4.p = 2;
            if (!((_navigator$clipboard = navigator.clipboard) !== null && _navigator$clipboard !== void 0 && _navigator$clipboard.writeText)) {
              _context4.n = 4;
              break;
            }
            _context4.n = 3;
            return navigator.clipboard.writeText(logContent);
          case 3:
            _context4.n = 5;
            break;
          case 4:
            if (copyViaExecCommand()) {
              _context4.n = 5;
              break;
            }
            throw new Error('execCommand copy failed');
          case 5:
            setNotice({
              status: 'success',
              message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Log copied to clipboard.', 'publishpress-hub')
            });
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t4 = _context4.v;
            setNotice({
              status: 'error',
              message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to copy log to clipboard.', 'publishpress-hub')
            });
          case 7:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 6]]);
    }));
    return function handleCopyToClipboard() {
      return _ref4.apply(this, arguments);
    };
  }();
  var isEmpty = !logContent;
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab"
  }, notice && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: notice.status,
    isDismissible: true,
    onRemove: function onRemove() {
      return setNotice(null);
    }
  }, notice.message), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__view-toggle",
    role: "group",
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug log view', 'publishpress-hub')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-debug-log-tab__view-btn".concat(viewMode === VIEW_REQUESTS ? ' pp-hub-debug-log-tab__view-btn--active' : ''),
    onClick: function onClick() {
      return setViewMode(VIEW_REQUESTS);
    },
    "aria-pressed": viewMode === VIEW_REQUESTS
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Requests', 'publishpress-hub')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-debug-log-tab__view-btn".concat(viewMode === VIEW_FULL_LOG ? ' pp-hub-debug-log-tab__view-btn--active' : ''),
    onClick: function onClick() {
      return setViewMode(VIEW_FULL_LOG);
    },
    "aria-pressed": viewMode === VIEW_FULL_LOG
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full Log', 'publishpress-hub'))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__auto-refresh-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-debug-log-tab__auto-refresh-btn".concat(autoRefresh ? ' pp-hub-debug-log-tab__auto-refresh-btn--active' : ''),
    onClick: function onClick() {
      return setAutoRefresh(function (prev) {
        return !prev;
      });
    },
    "aria-pressed": autoRefresh,
    title: autoRefresh ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh is on — click to stop', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable auto-refresh', 'publishpress-hub')
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-debug-log-tab__auto-refresh-dot",
    "aria-hidden": "true"
  }), autoRefresh ? "".concat((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh', 'publishpress-hub'), " (").concat(countdown, "s)") : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh', 'publishpress-hub')), /*#__PURE__*/React.createElement("select", {
    className: "pp-hub-debug-log-tab__interval-select",
    value: intervalSeconds,
    onChange: handleIntervalChange,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh interval', 'publishpress-hub')
  }, REFRESH_INTERVALS.map(function (_ref5) {
    var value = _ref5.value,
      label = _ref5.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  }))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: fetchLog,
    isBusy: isLoading,
    disabled: isLoading
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refresh', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: handleCopyToClipboard,
    disabled: isEmpty || isLoading
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Copy to Clipboard', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    isDestructive: true,
    onClick: handleClearLog,
    isBusy: isClearing,
    disabled: isEmpty || isLoading || isClearing
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Clear Log', 'publishpress-hub')))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__viewer"
  }, isLoading && /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-debug-log-tab__loading"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading log...', 'publishpress-hub')), !isLoading && isEmpty && /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-debug-log-tab__empty"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The debug log is empty. Perform some actions (e.g. activate a license) and refresh to see entries.', 'publishpress-hub')), !isLoading && !isEmpty && viewMode === VIEW_REQUESTS && /*#__PURE__*/React.createElement(_RequestsLogView__WEBPACK_IMPORTED_MODULE_4__.RequestsLogView, {
    logContent: logContent
  }), !isLoading && viewMode === VIEW_FULL_LOG && /*#__PURE__*/React.createElement("textarea", {
    className: "pp-hub-debug-log-tab__textarea",
    value: logContent,
    readOnly: true,
    spellCheck: false,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug log contents', 'publishpress-hub')
  })));
};
var DebugLogTab = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(DebugLogTabComponent);

/***/ },

/***/ "./resources/src/jsx/components/pages/settings/DiagnosticsTab.jsx"
/*!************************************************************************!*\
  !*** ./resources/src/jsx/components/pages/settings/DiagnosticsTab.jsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DiagnosticsTab: () => (/* binding */ DiagnosticsTab)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__);
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Diagnostics settings tab.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

;



var _ref = window.ppHubSettingsPageConfig || {},
  initialDebugMode = _ref.debugModeEnabled;
var DiagnosticsTabComponent = function DiagnosticsTabComponent() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(Boolean(initialDebugMode)),
    _useState2 = _slicedToArray(_useState, 2),
    debugMode = _useState2[0],
    setDebugMode = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isSaving = _useState4[0],
    setIsSaving = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    notice = _useState6[0],
    setNotice = _useState6[1];
  var handleDebugModeChange = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(newValue) {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            setIsSaving(true);
            setNotice(null);
            _context.p = 1;
            _context.n = 2;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: '/publishpress-hub/v1/settings/diagnostics',
              method: 'POST',
              data: {
                debug_mode: newValue
              }
            });
          case 2:
            setDebugMode(newValue);
            setNotice({
              status: 'success',
              message: newValue ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug mode enabled. A "Debug Log" tab is now available.', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug mode disabled.', 'publishpress-hub')
            });
            if (newValue !== Boolean(initialDebugMode)) {
              window.location.reload();
            }
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            setNotice({
              status: 'error',
              message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to save the setting. Please try again.', 'publishpress-hub')
            });
          case 4:
            _context.p = 4;
            setIsSaving(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function handleDebugModeChange(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-diagnostics-tab"
  }, notice && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: notice.status,
    isDismissible: true,
    onRemove: function onRemove() {
      return setNotice(null);
    }
  }, notice.message), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-diagnostics-tab__section"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "pp-hub-diagnostics-tab__section-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug Mode', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-diagnostics-tab__description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('When enabled, all HTTP requests and responses to remote services (license activation, plugin downloads, etc.) are logged to a dedicated log file. Use the Debug Log tab to inspect the captured data.', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable Debug Mode', 'publishpress-hub'),
    checked: debugMode,
    onChange: handleDebugModeChange,
    disabled: isSaving,
    __nextHasNoMarginBottom: true
  }), debugMode && /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-diagnostics-tab__hint"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug logging is active. Switch to the "Debug Log" tab to view captured data.', 'publishpress-hub'))));
};
var DiagnosticsTab = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(DiagnosticsTabComponent);

/***/ },

/***/ "./resources/src/jsx/components/pages/settings/RequestsLogView.jsx"
/*!*************************************************************************!*\
  !*** ./resources/src/jsx/components/pages/settings/RequestsLogView.jsx ***!
  \*************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RequestsLogView: () => (/* binding */ RequestsLogView)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DebugLogParser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DebugLogParser */ "./resources/src/jsx/components/pages/settings/DebugLogParser.js");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Structured requests log view — shows request/response pairs as expandable cards.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

;


var METHOD_CLASS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};
var getStatusClass = function getStatusClass(statusCode, isError) {
  if (isError || !statusCode) {
    return 'error';
  }
  if (statusCode >= 500) {
    return 'server-error';
  }
  if (statusCode >= 400) {
    return 'client-error';
  }
  if (statusCode >= 200) {
    return 'success';
  }
  return 'unknown';
};
var truncateUrl = function truncateUrl(url) {
  var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 72;
  if (!url || url.length <= maxLength) {
    return url;
  }
  return url.substring(0, maxLength) + '…';
};
var CodeBlock = function CodeBlock(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/React.createElement("pre", {
    className: "pp-hub-request-card__code"
  }, JSON.stringify(data, null, 2));
};
var RequestCardComponent = function RequestCardComponent(_ref2) {
  var _request$data, _request$data2, _request$data3, _response$data, _response$data2;
  var pair = _ref2.pair;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isExpanded = _useState2[0],
    setIsExpanded = _useState2[1];
  var request = pair.request,
    response = pair.response;
  var method = (request === null || request === void 0 || (_request$data = request.data) === null || _request$data === void 0 ? void 0 : _request$data.method) || '???';
  var url = (request === null || request === void 0 || (_request$data2 = request.data) === null || _request$data2 === void 0 ? void 0 : _request$data2.url) || '';
  var timestamp = (request === null || request === void 0 || (_request$data3 = request.data) === null || _request$data3 === void 0 ? void 0 : _request$data3.timestamp) || '';
  var statusCode = response === null || response === void 0 || (_response$data = response.data) === null || _response$data === void 0 ? void 0 : _response$data.status_code;
  var isError = (response === null || response === void 0 || (_response$data2 = response.data) === null || _response$data2 === void 0 ? void 0 : _response$data2.error) === true;
  var methodClass = METHOD_CLASS[method.toUpperCase()] || 'other';
  var statusClass = getStatusClass(statusCode, isError);
  var statusDisplay = isError ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ERR', 'publishpress-hub') : statusCode || '—';
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card pp-hub-request-card--".concat(isExpanded ? 'expanded' : 'collapsed')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-request-card__summary",
    onClick: function onClick() {
      return setIsExpanded(!isExpanded);
    },
    "aria-expanded": isExpanded
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__method pp-hub-request-card__method--".concat(methodClass)
  }, method), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__url",
    title: url
  }, truncateUrl(url)), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__status pp-hub-request-card__status--".concat(statusClass)
  }, statusDisplay), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__timestamp"
  }, timestamp), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__chevron",
    "aria-hidden": "true"
  }, isExpanded ? '▲' : '▼')), isExpanded && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section-header pp-hub-request-card__section-header--request"
  }, "\u2192\xA0", (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Request', 'publishpress-hub')), /*#__PURE__*/React.createElement(CodeBlock, {
    data: request === null || request === void 0 ? void 0 : request.data
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section-header pp-hub-request-card__section-header--response"
  }, "\u2190\xA0", (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Response', 'publishpress-hub')), response ? /*#__PURE__*/React.createElement(CodeBlock, {
    data: response === null || response === void 0 ? void 0 : response.data
  }) : /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-request-card__no-response"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No response recorded for this request.', 'publishpress-hub')))));
};
var RequestCard = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(RequestCardComponent);
var RequestsLogViewComponent = function RequestsLogViewComponent(_ref3) {
  var logContent = _ref3.logContent;
  var pairs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var entries = (0,_DebugLogParser__WEBPACK_IMPORTED_MODULE_2__.parseLogEntries)(logContent);
    return (0,_DebugLogParser__WEBPACK_IMPORTED_MODULE_2__.groupIntoPairs)(entries);
  }, [logContent]);
  if (!logContent) {
    return null;
  }
  if (pairs.length === 0) {
    return /*#__PURE__*/React.createElement("p", {
      className: "pp-hub-debug-log-tab__empty"
    }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No requests found in the log.', 'publishpress-hub'));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-requests-log"
  }, /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-requests-log__count"
  }, pairs.length === 1 ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('1 request recorded', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%d requests recorded', 'publishpress-hub'), pairs.length)), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-requests-log__list"
  }, pairs.map(function (pair) {
    return /*#__PURE__*/React.createElement(RequestCard, {
      key: pair.id,
      pair: pair
    });
  })));
};
var RequestsLogView = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(RequestsLogViewComponent);

/***/ },

/***/ "./node_modules/react-dom/client.js"
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {



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


/***/ },

/***/ "./resources/src/jsx/components/pages/settings/DebugLogParser.js"
/*!***********************************************************************!*\
  !*** ./resources/src/jsx/components/pages/settings/DebugLogParser.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   groupIntoPairs: () => (/* binding */ groupIntoPairs),
/* harmony export */   parseLogEntries: () => (/* binding */ parseLogEntries)
/* harmony export */ });
/**
 * Parser for the PublishPress Hub HTTP debug log format.
 *
 * Each entry in the log file is written by HttpDebugger::log() as:
 *   [HTTP_DEBUG] -> REQUEST: { ...pretty-printed JSON... }
 *   [HTTP_DEBUG] <- RESPONSE: { ...pretty-printed JSON... }
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

/**
 * Parse raw log content into an array of structured entries.
 *
 * @param {string} logContent Raw log text.
 * @returns {Array<{type: string, direction: string, data: Object}>}
 */
const parseLogEntries = (logContent) => {
    if (!logContent || !logContent.trim()) {
        return [];
    }

    // Split at each [HTTP_DEBUG] marker, keeping the delimiter in the following segment.
    const blocks = logContent.split(/(?=\[HTTP_DEBUG\])/);

    return blocks
        .map((block) => block.trim())
        .filter((block) => block.startsWith('[HTTP_DEBUG]'))
        .map((block) => {
            // Format: [HTTP_DEBUG] -> REQUEST: { ...json... }
            const match = block.match(/^\[HTTP_DEBUG\]\s+(.+?):\s*([\s\S]+)$/);

            if (!match) {
                return null;
            }

            const typeStr = match[1].trim(); // e.g. "-> REQUEST" or "<- RESPONSE"
            const jsonStr = match[2].trim();

            // Split "-> REQUEST" into direction + type
            const typeParts = typeStr.match(/^([^a-zA-Z]*)\s*(\w+)$/);
            const direction = typeParts ? typeParts[1].trim() : '--';
            const type = typeParts ? typeParts[2] : typeStr;

            let data = {};

            try {
                data = JSON.parse(jsonStr);
            } catch {
                data = { _parseError: true, raw: jsonStr };
            }

            return { type, direction, data };
        })
        .filter(Boolean);
};

/**
 * Group parsed entries into request/response pairs, most recent first.
 *
 * @param {Array} entries Output of parseLogEntries.
 * @returns {Array<{id: number, request: Object|null, response: Object|null}>}
 */
const groupIntoPairs = (entries) => {
    const pairs = [];
    let i = 0;

    while (i < entries.length) {
        const entry = entries[i];

        if (entry.type === 'REQUEST' || entry.type === 'RAW_REQUEST') {
            const next = entries[i + 1];

            if (next && next.type === 'RESPONSE') {
                pairs.push({ id: i, request: entry, response: next });
                i += 2;
            } else {
                pairs.push({ id: i, request: entry, response: null });
                i++;
            }
        } else if (entry.type === 'RESPONSE') {
            // Orphan response without a preceding request
            pairs.push({ id: i, request: null, response: entry });
            i++;
        } else {
            i++;
        }
    }

    // Most recent pair first
    return pairs.reverse();
};


/***/ },

/***/ "./resources/src/jsx/utils/themeController.js"
/*!****************************************************!*\
  !*** ./resources/src/jsx/utils/themeController.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeController: () => (/* binding */ ThemeController),
/* harmony export */   getCurrentTheme: () => (/* binding */ getCurrentTheme),
/* harmony export */   onThemeChange: () => (/* binding */ onThemeChange),
/* harmony export */   setTheme: () => (/* binding */ setTheme),
/* harmony export */   themeController: () => (/* binding */ themeController),
/* harmony export */   toggleTheme: () => (/* binding */ toggleTheme)
/* harmony export */ });
/**
 * Theme Controller Utility
 * Manages theme switching, persistence, and system theme detection
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\utils
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

const THEME_STORAGE_KEY = 'pp-hub-theme';
const THEME_ATTRIBUTE = 'data-theme';
const DEFAULT_THEME = 'default';

class ThemeController {
    constructor() {
        this.themes = ['default', 'dark'];
        this.currentTheme = this.getStoredTheme() || DEFAULT_THEME;
        this.init();
    }

    /**
     * Initialize the theme controller
     */
    init() {
        this.applyTheme(this.currentTheme);
        this.setupSystemThemeListener();
        this.setupStorageListener();
    }

    /**
     * Get the stored theme from localStorage
     */
    getStoredTheme() {
        try {
            return localStorage.getItem(THEME_STORAGE_KEY);
        } catch (e) {
            console.warn('Unable to access localStorage for theme preference');
            return null;
        }
    }

    /**
     * Get the system theme preference
     */
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'default';
    }

    /**
     * Apply a theme to the document
     */
    applyTheme(themeName) {
        if (!this.themes.includes(themeName)) {
            console.warn(`Theme "${themeName}" is not supported. Using default theme.`);
            themeName = DEFAULT_THEME;
        }

        // Apply to document root
        document.documentElement.setAttribute(THEME_ATTRIBUTE, themeName);

        // Apply to the hub root container if it exists
        const hubRoot = document.querySelector('.pp-hub-root');
        if (hubRoot) {
            hubRoot.setAttribute(THEME_ATTRIBUTE, themeName);
        }
        const body = document.body;
        if (body) {
            body.setAttribute(THEME_ATTRIBUTE, themeName);
        }

        this.currentTheme = themeName;
        this.storeTheme(themeName);
        this.dispatchThemeChangeEvent(themeName);
    }

    /**
     * Store the theme preference
     */
    storeTheme(themeName) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, themeName);
        } catch (e) {
            console.warn('Unable to store theme preference');
        }
    }

    /**
     * Switch to a specific theme
     */
    setTheme(themeName) {
        this.applyTheme(themeName);
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'default' : 'dark';
        this.setTheme(newTheme);
    }

    /**
     * Get the current theme
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Get all available themes
     */
    getAvailableThemes() {
        return [...this.themes];
    }

    /**
     * Listen for system theme changes
     */
    setupSystemThemeListener() {
        // System theme listener is disabled to always use default theme as fallback
        // Users can manually switch themes if they prefer
    }

    /**
     * Listen for storage changes (for cross-tab synchronization)
     */
    setupStorageListener() {
        window.addEventListener('storage', (e) => {
            if (e.key === THEME_STORAGE_KEY && e.newValue) {
                this.applyTheme(e.newValue);
            }
        });
    }

    /**
     * Dispatch a custom event when theme changes
     */
    dispatchThemeChangeEvent(themeName) {
        const event = new CustomEvent('themechange', {
            detail: { theme: themeName, previousTheme: this.currentTheme }
        });
        document.dispatchEvent(event);
    }

    /**
     * Add a theme change listener
     */
    onThemeChange(callback) {
        document.addEventListener('themechange', callback);
    }

    /**
     * Remove a theme change listener
     */
    removeThemeChangeListener(callback) {
        document.removeEventListener('themechange', callback);
    }
}

// Create a singleton instance
const themeController = new ThemeController();

// Export convenience functions
const setTheme = (theme) => themeController.setTheme(theme);
const toggleTheme = () => themeController.toggleTheme();
const getCurrentTheme = () => themeController.getCurrentTheme();
const onThemeChange = (callback) => themeController.onThemeChange(callback);

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
    // Make it available globally for non-module scripts
    window.ppHubThemeController = themeController;
}


/***/ },

/***/ "react-dom"
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
(module) {

module.exports = ReactDOM;

/***/ },

/***/ "@publishpress-hub/i18n"
/*!***************************************!*\
  !*** external "publishpressHub.i18n" ***!
  \***************************************/
(module) {

module.exports = publishpressHub.i18n;

/***/ },

/***/ "@wordpress/api-fetch"
/*!******************************!*\
  !*** external "wp.apiFetch" ***!
  \******************************/
(module) {

module.exports = wp.apiFetch;

/***/ },

/***/ "@wordpress/components"
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
(module) {

module.exports = wp.components;

/***/ },

/***/ "@wordpress/element"
/*!*****************************!*\
  !*** external "wp.element" ***!
  \*****************************/
(module) {

module.exports = wp.element;

/***/ },

/***/ "./node_modules/@wordpress/escape-html/build-module/escape-greater.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/escape-html/build-module/escape-greater.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ __unstableEscapeGreaterThan)
/* harmony export */ });
// packages/escape-html/src/escape-greater.ts
function __unstableEscapeGreaterThan(value) {
  return value.replace(/>/g, "&gt;");
}

//# sourceMappingURL=escape-greater.mjs.map


/***/ },

/***/ "./node_modules/@wordpress/escape-html/build-module/index.mjs"
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/escape-html/build-module/index.mjs ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   escapeAmpersand: () => (/* binding */ escapeAmpersand),
/* harmony export */   escapeAttribute: () => (/* binding */ escapeAttribute),
/* harmony export */   escapeEditableHTML: () => (/* binding */ escapeEditableHTML),
/* harmony export */   escapeHTML: () => (/* binding */ escapeHTML),
/* harmony export */   escapeLessThan: () => (/* binding */ escapeLessThan),
/* harmony export */   escapeQuotationMark: () => (/* binding */ escapeQuotationMark),
/* harmony export */   isValidAttributeName: () => (/* binding */ isValidAttributeName)
/* harmony export */ });
/* harmony import */ var _escape_greater_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./escape-greater.mjs */ "./node_modules/@wordpress/escape-html/build-module/escape-greater.mjs");
// packages/escape-html/src/index.ts

var REGEXP_INVALID_ATTRIBUTE_NAME = /[\u007F-\u009F "'>/="\uFDD0-\uFDEF]/;
function escapeAmpersand(value) {
  return value.replace(/&(?!([a-z0-9]+|#[0-9]+|#x[a-f0-9]+);)/gi, "&amp;");
}
function escapeQuotationMark(value) {
  return value.replace(/"/g, "&quot;");
}
function escapeLessThan(value) {
  return value.replace(/</g, "&lt;");
}
function escapeAttribute(value) {
  return (0,_escape_greater_mjs__WEBPACK_IMPORTED_MODULE_0__["default"])(
    escapeLessThan(escapeQuotationMark(escapeAmpersand(value)))
  );
}
function escapeHTML(value) {
  return escapeLessThan(escapeAmpersand(value));
}
function escapeEditableHTML(value) {
  return escapeLessThan(value.replace(/&/g, "&amp;"));
}
function isValidAttributeName(name) {
  return !REGEXP_INVALID_ATTRIBUTE_NAME.test(name);
}

//# sourceMappingURL=index.mjs.map


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
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
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./resources/src/jsx/settings-page.jsx ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_pages_settings_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pages/settings-page */ "./resources/src/jsx/components/pages/settings-page.jsx");
/* harmony import */ var _utils_themeController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/themeController */ "./resources/src/jsx/utils/themeController.js");
/**
 * Settings page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





var _ref = window.ppHubSettingsPageConfig || {},
  apiNonce = _ref.apiNonce;
var settingsPageContainer = document.getElementById('publishpress-hub-settings-page-container');
if (settingsPageContainer) {
  if (apiNonce) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().createNonceMiddleware(apiNonce));
  }
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(settingsPageContainer);
  root.render(/*#__PURE__*/React.createElement(_components_pages_settings_page__WEBPACK_IMPORTED_MODULE_2__.SettingsPage, null));
  var currentTheme = (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_3__.getCurrentTheme)();
  (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_3__.setTheme)(currentTheme);
}
})();

/******/ })()
;
//# sourceMappingURL=settings-page.js.map
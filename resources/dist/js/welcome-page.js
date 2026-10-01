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
    return Array(5).fill('<span class="dashicons dashicons-star-filled" aria-hidden="true"></span>').join('');
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
    children = /*#__PURE__*/React.createElement("span", {
      className: "pp-hub-button-loading-content"
    }, spinnerPosition === 'left' && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {
      className: "pp-hub-button-spinner"
    }), /*#__PURE__*/React.createElement("span", null, children), spinnerPosition === 'right' && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {
      className: "pp-hub-button-spinner"
    }));
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
    "aria-busy": isLoading || undefined,
    title: title,
    style: style
  }, restProps), children);
});
ButtonComponent.displayName = 'Button';

// Memoize the component to prevent unnecessary re-renders
var Button = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(ButtonComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);

/***/ },

/***/ "./resources/src/jsx/components/pages/welcome-page.jsx"
/*!*************************************************************!*\
  !*** ./resources/src/jsx/components/pages/welcome-page.jsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WelcomePage: () => (/* binding */ WelcomePage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_escape_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/escape-html */ "./node_modules/@wordpress/escape-html/build-module/index.mjs");
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../admin-page */ "./resources/src/jsx/components/admin-page/index.jsx");
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/**
 * Welcome page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






var _window$ppHubWelcomeP = window.ppHubWelcomePageConfig,
  logoUrl = _window$ppHubWelcomeP.logoUrl,
  welcomeImageUrl = _window$ppHubWelcomeP.welcomeImageUrl,
  dismissUrl = _window$ppHubWelcomeP.dismissUrl;
var WelcomePageComponent = function WelcomePageComponent() {
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_3__.AdminPageLayout, {
    logoUrl: logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__container"
  }, /*#__PURE__*/React.createElement("section", {
    className: "pp-hub-welcome-page__hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__hero-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-welcome-page__eyebrow"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Welcome to PublishPress Hub', 'publishpress-hub')), /*#__PURE__*/React.createElement("h1", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your publishing tools, in one place.', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__lead"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Manage your plugins, build your editorial workflow, and find the help you need to get started.', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "primary",
    href: window.ppHubWelcomePageConfig.pluginsDashboardUrl,
    target: "_self",
    isFullWidth: false
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View Plugins Dashboard', 'publishpress-hub')), /*#__PURE__*/React.createElement("nav", {
    className: "pp-hub-welcome-page__resources",
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help and account', 'publishpress-hub')
  }, /*#__PURE__*/React.createElement("a", {
    href: window.ppHubWelcomePageConfig.pluginDocumentationUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-welcome-page__resource-icon dashicons dashicons-book-alt",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Documentation', 'publishpress-hub')), /*#__PURE__*/React.createElement("small", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Setup guides and answers for every plugin.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-arrow-right-alt2",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("a", {
    href: window.ppHubWelcomePageConfig.pluginSupportUrl,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-welcome-page__resource-icon dashicons dashicons-sos",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get support', 'publishpress-hub')), /*#__PURE__*/React.createElement("small", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get help from the PublishPress team.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-arrow-right-alt2",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("a", {
    href: "https://publishpress.com/dashboard/?active_tab=licenses",
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-welcome-page__resource-icon dashicons dashicons-admin-users",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Account and licenses', 'publishpress-hub')), /*#__PURE__*/React.createElement("small", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Find your license keys and manage your subscription.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-arrow-right-alt2",
    "aria-hidden": "true"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__hero-art"
  }, /*#__PURE__*/React.createElement("img", {
    src: welcomeImageUrl,
    alt: ""
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__box"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "pp-hub-welcome-page__features-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('What you can do with PublishPress Hub', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__message"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('PublishPress Hub has everything you need to install, update, and manage your PublishPress plugins. We\'re here to help you build a publishing system that works perfectly for your team.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__features-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-chart-bar",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "pp-hub-welcome-page__feature-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Centralized Dashboard', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__feature-description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View all your PublishPress plugins with their licenses, versions, and key details.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-admin-plugins",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "pp-hub-welcome-page__feature-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('One-Click Installation', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__feature-description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install free PublishPress plugins directly from the Hub without visiting WordPress.org.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-admin-network",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "pp-hub-welcome-page__feature-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('License Management', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__feature-description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Connect your PublishPress licenses to easily install and activate Pro versions.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-update",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "pp-hub-welcome-page__feature-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Easy Updates', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__feature-description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keep all your PublishPress plugins up to date with one-click updates.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-yes-alt",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "pp-hub-welcome-page__feature-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Status Monitoring', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__feature-description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Monitor plugin activation status, detect conflicts, and ensure compatibility.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-item"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-welcome-page__feature-icon"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-admin-tools",
    "aria-hidden": "true"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "pp-hub-welcome-page__feature-title"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Get Started', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__feature-description",
    dangerouslySetInnerHTML: {
      __html: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_2__.escapeHTML)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Ready to explore? Visit the %s to see all available PublishPress plugins.', 'publishpress-hub')), '<a href="' + (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_2__.escapeAttribute)(window.ppHubWelcomePageConfig.pluginsDashboardUrl) + '">' + (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_2__.escapeHTML)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Plugins Dashboard', 'publishpress-hub')) + '</a>')
    }
  })))), /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-welcome-page__dismiss"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Already know what you\'re doing? Great! You can ', 'publishpress-hub'), /*#__PURE__*/React.createElement("a", {
    href: dismissUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('dismiss this page', 'publishpress-hub')), (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('.', 'publishpress-hub')))));
};
var WelcomePage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(WelcomePageComponent);

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
/*!********************************************!*\
  !*** ./resources/src/jsx/welcome-page.jsx ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_pages_welcome_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/pages/welcome-page */ "./resources/src/jsx/components/pages/welcome-page.jsx");
/* harmony import */ var _utils_themeController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/themeController */ "./resources/src/jsx/utils/themeController.js");
/**
 * Welcome page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




var welcomePageContainer = document.getElementById('publishpress-hub-welcome-page-container');
if (welcomePageContainer) {
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(welcomePageContainer);
  root.render(/*#__PURE__*/React.createElement(_components_pages_welcome_page__WEBPACK_IMPORTED_MODULE_1__.WelcomePage, null));
  var currentTheme = (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_2__.getCurrentTheme)();
  (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_2__.setTheme)(currentTheme);
}
})();

/******/ })()
;
//# sourceMappingURL=welcome-page.js.map
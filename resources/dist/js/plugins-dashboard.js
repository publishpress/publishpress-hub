/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/src/jsx/components/admin-page/container.jsx"
/*!***************************************************************!*\
  !*** ./resources/src/jsx/components/admin-page/container.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

/***/ "./resources/src/jsx/components/badge/badge.jsx"
/*!******************************************************!*\
  !*** ./resources/src/jsx/components/badge/badge.jsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Badge: () => (/* binding */ Badge),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Badge.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\badge
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


var BadgeComponent = function BadgeComponent(_ref) {
  var className = _ref.className,
    children = _ref.children,
    icon = _ref.icon;
  return /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-badge ".concat(className)
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-badge-icon",
    "aria-hidden": "true"
  }, icon), children);
};
var Badge = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(BadgeComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Badge);

/***/ },

/***/ "./resources/src/jsx/components/buttons/button.jsx"
/*!*********************************************************!*\
  !*** ./resources/src/jsx/components/buttons/button.jsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./resources/src/jsx/components/filter/filter-buttons-bar.jsx"
/*!********************************************************************!*\
  !*** ./resources/src/jsx/components/filter/filter-buttons-bar.jsx ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterButtonsBar: () => (/* binding */ FilterButtonsBar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Filter buttons bar.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\filter
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




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
    className: "publishpress-hub-filter-buttons-bar",
    role: "group",
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter plugins by status', 'publishpress-hub')
  }, options.map(function (filter) {
    var isSelected = activeSelectedOption === filter.value;
    var buttonClass = isSelected ? 'active' : '';
    var isDisabled = !filter.total;
    return /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: "filter-".concat(filter.value),
      className: "publishpress-hub-filter-button ".concat(buttonClass, " ").concat(isDisabled ? 'disabled' : ''),
      onClick: createButtonClickHandler(filter.value),
      disabled: filter.total === 0,
      "aria-pressed": isSelected
    }, filter.label, " ", filter.total > 0 && "(".concat(filter.total, ")"));
  }), children)));
};

// Memoize the component to prevent unnecessary re-renders
var FilterButtonsBar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(FilterButtonsBarComponent);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterButtonsBar);

/***/ },

/***/ "./resources/src/jsx/components/message/message.jsx"
/*!**********************************************************!*\
  !*** ./resources/src/jsx/components/message/message.jsx ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Message: () => (/* binding */ Message)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Message.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\message
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */



var MessageComponent = function MessageComponent(_ref) {
  var children = _ref.children,
    className = _ref.className,
    variant = _ref.variant;
  var classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()('pp-hub-message', className, {
    'is-error': variant === 'error',
    'is-success': variant === 'success',
    'is-warning': variant === 'warning',
    'is-info': variant === 'info'
  });
  // Store errors are already announced by WordPress notices; avoid speaking the modal copy twice.
  var role = variant === 'error' ? undefined : 'status';
  return /*#__PURE__*/React.createElement("div", {
    className: classes,
    role: role
  }, children);
};
var Message = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(MessageComponent);

/***/ },

/***/ "./resources/src/jsx/components/modal/index.jsx"
/*!******************************************************!*\
  !*** ./resources/src/jsx/components/modal/index.jsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modal: () => (/* binding */ Modal)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
var _excluded = ["children"],
  _excluded2 = ["className"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * Modal.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\modal
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




var ModalComponent = function ModalComponent(_ref) {
  var children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  var className = props.className,
    rest = _objectWithoutProperties(props, _excluded2);
  var classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('pp-hub-modal', className);
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, _extends({}, rest, {
    className: classes
  }), children);
};
var Modal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(ModalComponent);

/***/ },

/***/ "./resources/src/jsx/components/notices/NoticesList.jsx"
/*!**************************************************************!*\
  !*** ./resources/src/jsx/components/notices/NoticesList.jsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NoticesList)
/* harmony export */ });
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/filter */ "./node_modules/lodash/filter.js");
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Notices list.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\notices
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


function NoticesList() {
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/notices'),
    removeNotice = _useDispatch.removeNotice;
  var notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    return select('core/notices').getNotices();
  }, []);
  var dismissibleNotices = lodash_filter__WEBPACK_IMPORTED_MODULE_0___default()(notices, {
    isDismissible: true,
    type: 'default'
  });
  var nonDismissibleNotices = lodash_filter__WEBPACK_IMPORTED_MODULE_0___default()(notices, {
    isDismissible: false,
    type: 'default'
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.NoticeList, {
    notices: nonDismissibleNotices,
    className: "pp-hub-notices-list"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.NoticeList, {
    notices: dismissibleNotices,
    className: "pp-hub-notices-list",
    onRemove: removeNotice
  }));
}

/***/ },

/***/ "./resources/src/jsx/components/notices/SnackbarList.jsx"
/*!***************************************************************!*\
  !*** ./resources/src/jsx/components/notices/SnackbarList.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SnackbarList: () => (/* binding */ SnackbarList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/filter */ "./node_modules/lodash/filter.js");
/* harmony import */ var lodash_filter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_filter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Snackbar list.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\notices
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


var SnackbarList = function SnackbarList() {
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/notices'),
    removeNotice = _useDispatch.removeNotice;
  var notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {
    return select('core/notices').getNotices();
  }, []);
  var snackbarNotices = lodash_filter__WEBPACK_IMPORTED_MODULE_0___default()(notices, {
    type: 'snackbar'
  });
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SnackbarList, {
    notices: snackbarNotices,
    className: "pp-hub-snackbar-list",
    onRemove: removeNotice
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SnackbarList);

/***/ },

/***/ "./resources/src/jsx/components/pages/hooks/use-license-expiration-warning.jsx"
/*!*************************************************************************************!*\
  !*** ./resources/src/jsx/components/pages/hooks/use-license-expiration-warning.jsx ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useLicenseExpirationWarning: () => (/* binding */ useLicenseExpirationWarning)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
 * Use license expiration warning hook.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





var DAYS_UNTIL_EXPIRATION = 30;
var RENEW_NOW_URL = 'https://publishpress.com/links/hub-renew-now';
var API_NAMESPACE = '/publishpress-hub/v1';

/**
 * Hook to check for licenses expiring within the specified days and expired licenses,
 * displaying appropriate warning notices.
 *
 * Uses the license status data from the new license services (isExpired, daysUntilExpiration).
 *
 * @param {Array} plugins The plugins array to check for expiring/expired licenses.
 * @param {number} daysUntilExpiration Number of days before expiration to show warning (default: 30).
 * @since 1.0.0
 */
var useLicenseExpirationWarning = function useLicenseExpirationWarning(plugins) {
  var daysUntilExpiration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DAYS_UNTIL_EXPIRATION;
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('core/notices'),
    createNotice = _useDispatch.createNotice,
    removeNotice = _useDispatch.removeNotice;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      expired: false,
      expiring: false
    }),
    _useState2 = _slicedToArray(_useState, 2),
    dismissalStatus = _useState2[0],
    setDismissalStatus = _useState2[1];

  // Fetch dismissal status on mount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var fetchDismissalStatus = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var response, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
                path: "".concat(API_NAMESPACE, "/license-notices/dismissal-status"),
                method: 'GET'
              });
            case 1:
              response = _context.v;
              setDismissalStatus(response.dismissalStatus || {
                expired: false,
                expiring: false
              });
              _context.n = 3;
              break;
            case 2:
              _context.p = 2;
              _t = _context.v;
              // eslint-disable-next-line no-console
              console.error('Error fetching dismissal status:', _t);
            case 3:
              return _context.a(2);
          }
        }, _callee, null, [[0, 2]]);
      }));
      return function fetchDismissalStatus() {
        return _ref.apply(this, arguments);
      };
    }();
    fetchDismissalStatus();
  }, []);

  // Handle notice dismissal
  var handleNoticeDismiss = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(noticeType) {
      var _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            _context2.n = 1;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "".concat(API_NAMESPACE, "/license-notices/dismiss"),
              method: 'POST',
              data: {
                noticeType: noticeType
              }
            });
          case 1:
            // Update local dismissal status
            setDismissalStatus(function (prev) {
              return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, noticeType, true));
            });
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t2 = _context2.v;
            // eslint-disable-next-line no-console
            console.error('Error dismissing notice:', _t2);
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }(), []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!plugins || plugins.length === 0) {
      return;
    }
    var expiringPlugins = [];
    var expiredPlugins = [];
    plugins.forEach(function (plugin) {
      // Check for expired licenses using the isExpired flag from license services
      // This takes priority over expiring licenses
      if (plugin.proPlugin.isInstalled && plugin.proPlugin.isExpired && plugin.proPlugin.detailsUrl) {
        expiredPlugins.push({
          name: plugin.proPlugin.name,
          expirationDate: plugin.proPlugin.licenseExpirationDateFormatted || plugin.proPlugin.licenseExpirationDate || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('N/A', 'publishpress-hub'),
          detailsUrl: plugin.proPlugin.detailsUrl
        });
      }
      // Check for licenses expiring within the specified days
      // Use daysUntilExpiration from the plugin data (calculated by backend)
      // Only check if not already expired
      else if (plugin.proPlugin.isLicensed && !plugin.proPlugin.isExpired && plugin.proPlugin.daysUntilExpiration !== undefined && plugin.proPlugin.daysUntilExpiration >= 0 && plugin.proPlugin.daysUntilExpiration <= daysUntilExpiration) {
        expiringPlugins.push({
          name: plugin.proPlugin.name,
          expirationDate: plugin.proPlugin.licenseExpirationDateFormatted || plugin.proPlugin.licenseExpirationDate,
          daysUntilExpiration: plugin.proPlugin.daysUntilExpiration,
          detailsUrl: plugin.proPlugin.detailsUrl
        });
      }
    });

    // Remove existing notices first
    removeNotice('pp-hub-license-expiration-warning');
    removeNotice('pp-hub-license-expired-warning');

    // Display expired license notice (error level - highest priority)
    if (expiredPlugins.length > 0) {
      // Group plugins by expiration date
      var pluginsByDate = {};
      expiredPlugins.forEach(function (plugin) {
        var date = plugin.expirationDate;
        if (!pluginsByDate[date]) {
          pluginsByDate[date] = [];
        }
        pluginsByDate[date].push(plugin);
      });

      // Build message with grouped plugins
      var dateGroups = Object.keys(pluginsByDate).map(function (date) {
        var plugins = pluginsByDate[date];
        var pluginNames = plugins.map(function (p) {
          return "<strong>".concat(p.name, "</strong>");
        }).join(', ');
        if (plugins.length === 1) {
          return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
          // translators: %1$s is the plugin name, %2$s is the expiration date
          (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The license for %1$s expired on %2$s', 'publishpress-hub'), pluginNames, date);
        } else {
          return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
          // translators: %1$s is the list of plugin names, %2$s is the expiration date
          (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The licenses for %1$s expired on %2$s', 'publishpress-hub'), pluginNames, date);
        }
      });
      var baseMessage = dateGroups.join('. ') + '.';

      // Add single renewal link (use dashboard subscriptions URL)
      var renewLink = "<a href=\"".concat(RENEW_NOW_URL, "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"pp-hub-renew-link\">").concat((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Renew now', 'publishpress-hub'), "</a>");
      var message = baseMessage + ' ' + renewLink;
      createNotice('error', message, {
        id: 'pp-hub-license-expired-warning',
        isDismissible: false,
        __unstableHTML: true
      });
    }

    // Display expiring license notice (warning level)
    if (expiringPlugins.length > 0 && !dismissalStatus.expiring) {
      // Group plugins by expiration date
      var _pluginsByDate = {};
      expiringPlugins.forEach(function (plugin) {
        var date = plugin.expirationDate;
        if (!_pluginsByDate[date]) {
          _pluginsByDate[date] = [];
        }
        _pluginsByDate[date].push(plugin);
      });

      // Build message with grouped plugins
      var _dateGroups = Object.keys(_pluginsByDate).map(function (date) {
        var plugins = _pluginsByDate[date];
        var pluginNames = plugins.map(function (p) {
          return p.name;
        }).join(', ');
        var daysRemaining = plugins[0].daysUntilExpiration; // All plugins in group have same days remaining

        if (plugins.length === 1) {
          return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
          // translators: %1$s is the plugin name, %2$s is the expiration date, %3$d is the number of days
          (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The license for %1$s expires on %2$s (%3$d days remaining)', 'publishpress-hub'), pluginNames, date, daysRemaining);
        } else {
          return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)(
          // translators: %1$s is the list of plugin names, %2$s is the expiration date, %3$d is the number of days
          (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The licenses for %1$s expire on %2$s (%3$d days remaining)', 'publishpress-hub'), pluginNames, date, daysRemaining);
        }
      });
      var _baseMessage = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Warning:', 'publishpress-hub') + ' ' + _dateGroups.join('. ') + '.';

      // Add single renewal link (use dashboard subscriptions URL)
      var _renewLink = "<a href=\"".concat(RENEW_NOW_URL, "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"pp-hub-renew-link\">").concat((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Renew now', 'publishpress-hub'), "</a>");
      var _message = _baseMessage + '<br/>' + _renewLink;
      createNotice('warning', _message, {
        id: 'pp-hub-license-expiration-warning',
        isDismissible: true,
        __unstableHTML: true,
        onDismiss: function onDismiss() {
          return handleNoticeDismiss('expiring');
        }
      });
    }
  }, [plugins, createNotice, removeNotice, daysUntilExpiration, dismissalStatus, handleNoticeDismiss]);
};

/***/ },

/***/ "./resources/src/jsx/components/pages/plugins-dashboard.jsx"
/*!******************************************************************!*\
  !*** ./resources/src/jsx/components/pages/plugins-dashboard.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginsDashboard: () => (/* binding */ PluginsDashboard)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../admin-page */ "./resources/src/jsx/components/admin-page/index.jsx");
/* harmony import */ var _filter_filter_buttons_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filter/filter-buttons-bar */ "./resources/src/jsx/components/filter/filter-buttons-bar.jsx");
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../stores/plugins-dashboard */ "./resources/src/jsx/stores/plugins-dashboard/index.jsx");
/* harmony import */ var _plugins_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../plugins-list */ "./resources/src/jsx/components/plugins-list/index.jsx");
/* harmony import */ var _suite_license__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./suite-license */ "./resources/src/jsx/components/pages/suite-license.jsx");
/* harmony import */ var _notices_NoticesList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../notices/NoticesList */ "./resources/src/jsx/components/notices/NoticesList.jsx");
/* harmony import */ var _notices_SnackbarList__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../notices/SnackbarList */ "./resources/src/jsx/components/notices/SnackbarList.jsx");
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../tooltip */ "./resources/src/jsx/components/tooltip/index.jsx");
/* harmony import */ var _hooks_use_license_expiration_warning__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./hooks/use-license-expiration-warning */ "./resources/src/jsx/components/pages/hooks/use-license-expiration-warning.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Plugins dashboard.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */














var _window$ppHubPluginsD = window.ppHubPluginsDashboardConfig,
  logoUrl = _window$ppHubPluginsD.logoUrl,
  pluginIconBaseUrl = _window$ppHubPluginsD.pluginIconBaseUrl;

// Optimize selector by splitting into focused selectors
var selectPluginsDashboardData = function selectPluginsDashboardData(select) {
  var storeSelect = select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store);
  return {
    selectedFilter: storeSelect.getSelectedFilter(),
    filterCounts: storeSelect.getFilterCounts(),
    plugins: storeSelect.getFilteredPlugins(),
    allPlugins: storeSelect.getPlugins(),
    isLoading: storeSelect.getIsLoading(),
    error: storeSelect.getError()
  };
};

// Memoize filter options outside component to prevent recreation
var createFilterOptions = function createFilterOptions(filterCounts) {
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
  }, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Updates available', 'publishpress-hub'),
    value: 'updatesAvailable',
    total: filterCounts.updatesAvailable
  }];
};
var PluginsDashboardComponent = function PluginsDashboardComponent() {
  var _useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(selectPluginsDashboardData, []),
    selectedFilter = _useSelect.selectedFilter,
    filterCounts = _useSelect.filterCounts,
    plugins = _useSelect.plugins,
    allPlugins = _useSelect.allPlugins,
    isLoading = _useSelect.isLoading;
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store),
    setSelectedFilter = _useDispatch.setSelectedFilter,
    fetchPlugins = _useDispatch.fetchPlugins;
  var handleFilterChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (selectedFilter) {
    setSelectedFilter(selectedFilter);
  }, [setSelectedFilter]);

  // Optimize filterOptions memoization with stable reference
  var filterOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return createFilterOptions(filterCounts);
  }, [filterCounts.all, filterCounts.unlicensed, filterCounts.active, filterCounts.inactive, filterCounts.notInstalled, filterCounts.updatesAvailable]);

  // Fetch plugins only once on mount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    fetchPlugins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for licenses expiring within the specified days
  (0,_hooks_use_license_expiration_warning__WEBPACK_IMPORTED_MODULE_12__.useLicenseExpirationWarning)(plugins, 30);
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isAltPressed = _useState2[0],
    setIsAltPressed = _useState2[1];

  // Track ALT key state
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    var handleKeyDown = function handleKeyDown(event) {
      if (event.key === 'Alt' || event.altKey) {
        setIsAltPressed(true);
      }
    };
    var handleKeyUp = function handleKeyUp(event) {
      if (event.key === 'Alt' || !event.altKey) {
        setIsAltPressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return function () {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  var handleRefresh = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    fetchPlugins(isAltPressed);
  }, [fetchPlugins, isAltPressed]);
  var refreshButtonTooltip = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('To force a refresh, hold Option on Mac or Alt on Windows and then click Refresh.', 'publishpress-hub');
  }, []);
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_3__.AdminPageLayout, {
    logoUrl: logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-dashboard"
  }, /*#__PURE__*/React.createElement(_notices_NoticesList__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/React.createElement(_suite_license__WEBPACK_IMPORTED_MODULE_7__.SuiteLicense, {
    plugins: allPlugins,
    onRefresh: fetchPlugins,
    isLoading: isLoading
  }), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-dashboard-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Plugins & Features', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate, open, and license each product directly from the Hub.', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_tooltip__WEBPACK_IMPORTED_MODULE_11__.Tooltip, {
    text: refreshButtonTooltip,
    placement: "top"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_10__.Button, {
    variant: "link",
    onClick: handleRefresh,
    isLoading: isLoading,
    spinnerPosition: "left"
  }, isAltPressed ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Force Refresh', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Refresh', 'publishpress-hub')))), /*#__PURE__*/React.createElement(_filter_filter_buttons_bar__WEBPACK_IMPORTED_MODULE_4__["default"], {
    options: filterOptions,
    selectedOption: selectedFilter,
    onChange: handleFilterChange
  }), /*#__PURE__*/React.createElement(_plugins_list__WEBPACK_IMPORTED_MODULE_6__.PluginsList, {
    plugins: plugins,
    isLoading: isLoading,
    pluginIconBaseUrl: pluginIconBaseUrl
  }), /*#__PURE__*/React.createElement(_notices_SnackbarList__WEBPACK_IMPORTED_MODULE_9__["default"], null)));
};
var PluginsDashboard = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(PluginsDashboardComponent);

/***/ },

/***/ "./resources/src/jsx/components/pages/suite-license.jsx"
/*!**************************************************************!*\
  !*** ./resources/src/jsx/components/pages/suite-license.jsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuiteLicense: () => (/* binding */ SuiteLicense)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Activate a shared license individually for the selected products.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 */





var SuiteLicense = function SuiteLicense(_ref) {
  var plugins = _ref.plugins,
    onRefresh = _ref.onRefresh,
    isLoading = _ref.isLoading;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(window.location.hash === '#suite-license'),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState4 = _slicedToArray(_useState3, 2),
    key = _useState4[0],
    setKey = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState6 = _slicedToArray(_useState5, 2),
    selected = _useState6[0],
    setSelected = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    busy = _useState8[0],
    setBusy = _useState8[1];
  var _useState9 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]),
    _useState0 = _slicedToArray(_useState9, 2),
    results = _useState0[0],
    setResults = _useState0[1];
  var _useState1 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState10 = _slicedToArray(_useState1, 2),
    progress = _useState10[0],
    setProgress = _useState10[1];
  var activate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(event) {
      var completed, _iterator, _step, plugin, response, _response$error, _t, _t2, _t3;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            event.preventDefault();
            if (!(busy || !key.trim() || !selected.length)) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            setBusy(true);
            setResults([]);
            completed = [];
            _context.p = 2;
            _iterator = _createForOfIteratorHelper(plugins.filter(function (plugin) {
              return selected.includes(plugin.slug);
            }));
            _context.p = 3;
            _iterator.s();
          case 4:
            if ((_step = _iterator.n()).done) {
              _context.n = 11;
              break;
            }
            plugin = _step.value;
            setProgress((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Checking %s…', 'publishpress-hub'), plugin.name));
            _context.p = 5;
            _context.n = 6;
            return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
              path: "/publishpress-hub/v1/plugins/".concat(encodeURIComponent(plugin.slug), "/activate-license"),
              method: 'POST',
              data: {
                licenseKey: key.trim(),
                applyToAll: false
              }
            });
          case 6:
            response = _context.v;
            if (!(!response.success || !response.licensed)) {
              _context.n = 7;
              break;
            }
            throw new Error(((_response$error = response.error) === null || _response$error === void 0 ? void 0 : _response$error.message) || response.error || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('The license could not be activated for this product.', 'publishpress-hub'));
          case 7:
            completed.push({
              slug: plugin.slug,
              name: plugin.name,
              message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('License activated.', 'publishpress-hub'),
              success: true
            });
            _context.n = 9;
            break;
          case 8:
            _context.p = 8;
            _t = _context.v;
            completed.push({
              slug: plugin.slug,
              name: plugin.name,
              message: _t.message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activation failed. Please try again.', 'publishpress-hub'),
              success: false
            });
          case 9:
            setResults([].concat(completed));
          case 10:
            _context.n = 4;
            break;
          case 11:
            _context.n = 13;
            break;
          case 12:
            _context.p = 12;
            _t2 = _context.v;
            _iterator.e(_t2);
          case 13:
            _context.p = 13;
            _iterator.f();
            return _context.f(13);
          case 14:
            setProgress((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('License checks complete. Review the results below.', 'publishpress-hub'));
            _context.n = 15;
            return onRefresh();
          case 15:
            _context.n = 17;
            break;
          case 16:
            _context.p = 16;
            _t3 = _context.v;
            setProgress((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('License checks complete, but the dashboard could not refresh. Reload this page to see the latest status.', 'publishpress-hub'));
          case 17:
            _context.p = 17;
            setKey('');
            setBusy(false);
            return _context.f(17);
          case 18:
            return _context.a(2);
        }
      }, _callee, null, [[5, 8], [3, 12, 13, 14], [2, 16, 17, 18]]);
    }));
    return function activate(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("section", {
    id: "suite-license",
    className: "pp-hub-suite-license"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-suite-license__summary"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-suite-license__icon",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-admin-network"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-suite-license__copy"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('PublishPress Bundle', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connect your included Pro plugins with one license key.', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
    variant: "primary",
    disabled: busy,
    "aria-expanded": open,
    "aria-controls": "pp-hub-suite-form",
    onClick: function onClick() {
      return setOpen(!open);
    }
  }, open ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close license setup', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activate Bundle License', 'publishpress-hub'))), open && /*#__PURE__*/React.createElement("form", {
    id: "pp-hub-suite-form",
    onSubmit: activate
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('License key', 'publishpress-hub'),
    type: "password",
    autoComplete: "off",
    value: key,
    onChange: setKey,
    disabled: busy
  }), /*#__PURE__*/React.createElement("fieldset", {
    disabled: busy || isLoading
  }, /*#__PURE__*/React.createElement("legend", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Select products included in your subscription', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('This will replace any saved license key for each selected product. This will not install or activate any plugins.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-suite-products"
  }, plugins.map(function (plugin) {
    return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
      key: plugin.slug,
      label: plugin.name,
      checked: selected.includes(plugin.slug),
      onChange: function onChange(checked) {
        return setSelected(function (previous) {
          return checked ? [].concat(_toConsumableArray(previous), [plugin.slug]) : previous.filter(function (slug) {
            return slug !== plugin.slug;
          });
        });
      }
    });
  }))), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_4__.Button, {
    type: "submit",
    variant: "primary",
    isLoading: busy,
    disabled: isLoading || !key.trim() || !selected.length
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activate license for selected products', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    role: "status"
  }, progress), results.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: "pp-hub-suite-results"
  }, results.map(function (result) {
    return /*#__PURE__*/React.createElement("li", {
      key: result.slug
    }, /*#__PURE__*/React.createElement("strong", null, result.name, ": "), result.success ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Success', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed', 'publishpress-hub'), " \u2014 ", result.message);
  }))));
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/action-button.jsx"
/*!********************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/action-button.jsx ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionButton: () => (/* binding */ ActionButton)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Action button.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




var ACTION_BUTTON_CONFIGS = {
  install: {
    variant: 'secondary',
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install', 'publishpress-hub'),
    loadingtext: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Installing...', 'publishpress-hub'),
    icon: 'download'
  },
  upgradeToPro: {
    variant: 'highlight',
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to Pro', 'publishpress-hub'),
    loadingtext: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrading to Pro...', 'publishpress-hub'),
    icon: 'unlock'
  },
  manageLicense: {
    variant: 'tertiary',
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Manage License', 'publishpress-hub'),
    loadingtext: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Managing License...', 'publishpress-hub'),
    icon: 'admin-generic'
  },
  activateLicense: {
    variant: 'tertiary',
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Activate License', 'publishpress-hub'),
    loadingtext: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Activating License...', 'publishpress-hub'),
    icon: 'yes'
  },
  conflict: {
    variant: 'primary',
    className: 'pp-hub-resolve-conflict',
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resolve Conflict', 'publishpress-hub'),
    loadingtext: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resolving Conflict...', 'publishpress-hub'),
    icon: 'warning'
  },
  update: {
    variant: 'primary',
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Update', 'publishpress-hub'),
    loadingtext: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Updating...', 'publishpress-hub'),
    icon: 'update'
  }
};
var ActionButtonComponent = function ActionButtonComponent(_ref) {
  var pluginFamily = _ref.pluginFamily,
    inProgress = _ref.inProgress,
    _ref$disabled = _ref.disabled,
    disabled = _ref$disabled === void 0 ? false : _ref$disabled,
    onInstall = _ref.onInstall,
    onUpgradeToPro = _ref.onUpgradeToPro,
    onManageLicense = _ref.onManageLicense,
    onActivateLicense = _ref.onActivateLicense,
    onResolveConflict = _ref.onResolveConflict,
    onUpdate = _ref.onUpdate;
  var getButtonProps = function getButtonProps() {
    if (pluginFamily.hasConflictingInstallations) {
      return _objectSpread(_objectSpread({}, ACTION_BUTTON_CONFIGS.conflict), {}, {
        onClick: function onClick() {
          return onResolveConflict(pluginFamily);
        }
      });
    }
    if (!pluginFamily.hasAnyVersionInstalled) {
      return _objectSpread(_objectSpread({}, ACTION_BUTTON_CONFIGS.install), {}, {
        onClick: function onClick() {
          return onInstall(pluginFamily);
        }
      });
    }
    if (!pluginFamily.proPlugin.isInstalled) {
      return _objectSpread(_objectSpread({}, ACTION_BUTTON_CONFIGS.upgradeToPro), {}, {
        onClick: function onClick() {
          return onUpgradeToPro(pluginFamily);
        }
      });
    }
    if (pluginFamily.proPlugin.isInstalled && !pluginFamily.proPlugin.isLicensed) {
      return _objectSpread(_objectSpread({}, ACTION_BUTTON_CONFIGS.activateLicense), {}, {
        onClick: function onClick() {
          return onActivateLicense(pluginFamily);
        }
      });
    }
    return _objectSpread(_objectSpread({}, ACTION_BUTTON_CONFIGS.manageLicense), {}, {
      onClick: function onClick() {
        return onManageLicense(pluginFamily);
      }
    });
  };
  var buttonProps = getButtonProps();
  if (inProgress) {
    buttonProps.isLoading = true;
    buttonProps.text = buttonProps.loadingtext;
  }
  return /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, _extends({}, buttonProps, {
    disabled: disabled || inProgress
  }));
};
ActionButtonComponent.displayName = 'ActionButton';
var ActionButton = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ActionButtonComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/deactivation-warning.jsx"
/*!***************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/deactivation-warning.jsx ***!
  \***************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DeactivationWarning: () => (/* binding */ DeactivationWarning)
/* harmony export */ });
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _message_message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../message/message */ "./resources/src/jsx/components/message/message.jsx");
/**
 * Warnings shown before a plugin can be deactivated.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */



var getPluginWarning = function getPluginWarning(slug) {
  switch (slug) {
    case 'statuses':
      return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Deactivating PublishPress Statuses stops registering its custom post statuses. Content using those statuses may become unavailable, and parts of your site may stop working until the plugin is active again.', 'publishpress-hub');
    default:
      return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Deactivating this plugin disables its features and may affect content or workflows that depend on it.', 'publishpress-hub');
  }
};
var DeactivationWarning = function DeactivationWarning(_ref) {
  var pluginFamily = _ref.pluginFamily,
    _ref$isConflict = _ref.isConflict,
    isConflict = _ref$isConflict === void 0 ? false : _ref$isConflict,
    _ref$isUninstall = _ref.isUninstall,
    isUninstall = _ref$isUninstall === void 0 ? false : _ref$isUninstall;
  return /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_1__.Message, {
    variant: "warning"
  }, isUninstall ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Uninstalling deletes the plugin files and may also delete its saved settings or data. Its features will no longer be available. Back up your site before continuing.', 'publishpress-hub')), pluginFamily.slug === 'statuses' && /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Without PublishPress Statuses, its custom post statuses are no longer registered. Content using those statuses may become unavailable, and parts of your site may stop working until the plugin is installed and active again.', 'publishpress-hub'))) : /*#__PURE__*/React.createElement("p", null, getPluginWarning(pluginFamily.slug)), isConflict && /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Resolving this conflict can deactivate the plugin while switching versions. If the version you keep cannot be activated, the plugin may remain disabled. Check that it is active after resolving the conflict.', 'publishpress-hub')));
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/index.jsx"
/*!************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/index.jsx ***!
  \************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionButton: () => (/* reexport safe */ _action_button__WEBPACK_IMPORTED_MODULE_8__.ActionButton),
/* harmony export */   LicenseKeyControl: () => (/* reexport safe */ _license_key_control__WEBPACK_IMPORTED_MODULE_10__.LicenseKeyControl),
/* harmony export */   ModalConfirmation: () => (/* reexport safe */ _modal_confirmation__WEBPACK_IMPORTED_MODULE_2__.ModalConfirmation),
/* harmony export */   ModalInstallationType: () => (/* reexport safe */ _modal_installation_type__WEBPACK_IMPORTED_MODULE_3__.ModalInstallationType),
/* harmony export */   ModalLicenseInput: () => (/* reexport safe */ _modal_license_input__WEBPACK_IMPORTED_MODULE_4__.ModalLicenseInput),
/* harmony export */   ModalLicenseManagement: () => (/* reexport safe */ _modal_license_management__WEBPACK_IMPORTED_MODULE_5__.ModalLicenseManagement),
/* harmony export */   ModalRenderer: () => (/* reexport safe */ _modal_renderer__WEBPACK_IMPORTED_MODULE_0__.ModalRenderer),
/* harmony export */   ModalResolveConflict: () => (/* reexport safe */ _modal_resolve_conflict__WEBPACK_IMPORTED_MODULE_7__.ModalResolveConflict),
/* harmony export */   ModalUpgrade: () => (/* reexport safe */ _modal_upgrade__WEBPACK_IMPORTED_MODULE_6__.ModalUpgrade),
/* harmony export */   PluginItem: () => (/* reexport safe */ _plugin_item__WEBPACK_IMPORTED_MODULE_1__.PluginItem),
/* harmony export */   StatusFlag: () => (/* reexport safe */ _status_flag__WEBPACK_IMPORTED_MODULE_9__.StatusFlag)
/* harmony export */ });
/* harmony import */ var _modal_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal-renderer */ "./resources/src/jsx/components/plugins-list/components/modal-renderer.jsx");
/* harmony import */ var _plugin_item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin-item */ "./resources/src/jsx/components/plugins-list/components/plugin-item.jsx");
/* harmony import */ var _modal_confirmation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modal-confirmation */ "./resources/src/jsx/components/plugins-list/components/modal-confirmation.jsx");
/* harmony import */ var _modal_installation_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal-installation-type */ "./resources/src/jsx/components/plugins-list/components/modal-installation-type.jsx");
/* harmony import */ var _modal_license_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal-license-input */ "./resources/src/jsx/components/plugins-list/components/modal-license-input.jsx");
/* harmony import */ var _modal_license_management__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modal-license-management */ "./resources/src/jsx/components/plugins-list/components/modal-license-management.jsx");
/* harmony import */ var _modal_upgrade__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal-upgrade */ "./resources/src/jsx/components/plugins-list/components/modal-upgrade.jsx");
/* harmony import */ var _modal_resolve_conflict__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modal-resolve-conflict */ "./resources/src/jsx/components/plugins-list/components/modal-resolve-conflict.jsx");
/* harmony import */ var _action_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./action-button */ "./resources/src/jsx/components/plugins-list/components/action-button.jsx");
/* harmony import */ var _status_flag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./status-flag */ "./resources/src/jsx/components/plugins-list/components/status-flag.jsx");
/* harmony import */ var _license_key_control__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./license-key-control */ "./resources/src/jsx/components/plugins-list/components/license-key-control.jsx");
/**
 * Plugins list components.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */













/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/license-key-control.jsx"
/*!**************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/license-key-control.jsx ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LicenseKeyControl: () => (/* binding */ LicenseKeyControl),
/* harmony export */   LicenseKeyControlComponent: () => (/* binding */ LicenseKeyControlComponent)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_use_focus_on_action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../hooks/use-focus-on-action */ "./resources/src/jsx/components/plugins-list/hooks/use-focus-on-action.jsx");
var _excluded = ["autoFocus", "onEnterKeyDown", "value", "onChange", "placeholder", "className", "onFocusReady"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * License key control.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





/**
 * LicenseKeyControl component for handling license key input with auto-focus and Enter key handling
 *
 * @param {Object} props - Component props
 * @param {boolean} props.autoFocus - Whether to auto-focus the input (default: true)
 * @param {Function} props.onEnterKeyDown - Callback when Enter key is pressed
 * @param {string} props.value - The input value
 * @param {Function} props.onChange - Callback when input value changes
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - CSS class name
 * @param {Function} props.onFocusReady - Callback that receives the setFocus function for external control
 * @param {Object} props.restProps - Additional props passed to TextControl
 */
var LicenseKeyControlComponent = function LicenseKeyControlComponent(_ref) {
  var _ref$autoFocus = _ref.autoFocus,
    autoFocus = _ref$autoFocus === void 0 ? true : _ref$autoFocus,
    onEnterKeyDown = _ref.onEnterKeyDown,
    value = _ref.value,
    onChange = _ref.onChange,
    placeholder = _ref.placeholder,
    className = _ref.className,
    onFocusReady = _ref.onFocusReady,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useFocusOnAction = (0,_hooks_use_focus_on_action__WEBPACK_IMPORTED_MODULE_2__.useFocusOnAction)(autoFocus),
    _useFocusOnAction2 = _slicedToArray(_useFocusOnAction, 2),
    textControlRef = _useFocusOnAction2[0],
    setFocus = _useFocusOnAction2[1];

  // Expose setFocus function to parent component
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (onFocusReady && setFocus) {
      onFocusReady(setFocus);
    }
  }, [onFocusReady, setFocus]);
  var handleKeyDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (event) {
    if (event.key === 'Enter' && onEnterKeyDown) {
      event.preventDefault();
      event.target.blur();
      onEnterKeyDown(event);
    }
  }, [onEnterKeyDown]);
  return /*#__PURE__*/React.createElement("div", {
    ref: textControlRef
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, _extends({
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    className: className,
    onKeyDown: handleKeyDown
  }, restProps)));
};
LicenseKeyControlComponent.displayName = 'LicenseKeyControl';
var LicenseKeyControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(LicenseKeyControlComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/modal-confirmation.jsx"
/*!*************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/modal-confirmation.jsx ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalConfirmation: () => (/* binding */ ModalConfirmation)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _message_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../message/message */ "./resources/src/jsx/components/message/message.jsx");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modal */ "./resources/src/jsx/components/modal/index.jsx");
/**
 * Modal confirmation.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






var ModalConfirmationComponent = function ModalConfirmationComponent(_ref) {
  var onClose = _ref.onClose,
    onConfirm = _ref.onConfirm,
    onCancel = _ref.onCancel,
    title = _ref.title,
    message = _ref.message,
    children = _ref.children,
    error = _ref.error,
    isDanger = _ref.isDanger,
    _ref$buttonInProgress = _ref.buttonInProgress,
    buttonInProgress = _ref$buttonInProgress === void 0 ? false : _ref$buttonInProgress,
    confirmLabel = _ref.confirmLabel;
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Confirmation', 'publishpress-hub'),
    className: "pp-hub-modal-confirmation",
    onRequestClose: buttonInProgress ? undefined : onClose,
    isDismissible: !buttonInProgress,
    shouldCloseOnEsc: !buttonInProgress,
    shouldCloseOnClickOutside: !buttonInProgress
  }, /*#__PURE__*/React.createElement("p", null, message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to continue?', 'publishpress-hub')), children, error && /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_3__.Message, {
    variant: "error"
  }, error.message), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-modal-actions"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: isDanger ? 'danger' : 'primary',
    isFullWidth: true,
    icon: "yes",
    isLoading: buttonInProgress,
    onClick: function onClick() {
      return onConfirm();
    }
  }, confirmLabel || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Continue', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    isFullWidth: true,
    icon: "no",
    disabled: buttonInProgress,
    onClick: function onClick() {
      return onCancel();
    }
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'publishpress-hub'))));
};
var ModalConfirmation = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalConfirmationComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/modal-installation-type.jsx"
/*!******************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/modal-installation-type.jsx ***!
  \******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalInstallationType: () => (/* binding */ ModalInstallationType)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modal */ "./resources/src/jsx/components/modal/index.jsx");
/**
 * Modal installation type.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





var ModalInstallationTypeComponent = function ModalInstallationTypeComponent(_ref) {
  var onClose = _ref.onClose,
    onProClick = _ref.onProClick,
    onFreeClick = _ref.onFreeClick,
    freeDetailsUrl = _ref.freeDetailsUrl,
    proDetailsUrl = _ref.proDetailsUrl,
    changelogUrl = _ref.changelogUrl,
    title = _ref.title;
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install Plugin', 'publishpress-hub'),
    className: "pp-hub-modal-installation-type",
    onRequestClose: function onRequestClose() {
      return onClose();
    }
  }, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select how you would like to install this plugin. You can install the Pro version if you have a license, or the Free version to get started.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-modal-inline-links"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: freeDetailsUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free Details', 'publishpress-hub')), /*#__PURE__*/React.createElement("span", null, "|"), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: proDetailsUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro Details', 'publishpress-hub')), /*#__PURE__*/React.createElement("span", null, "|"), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: changelogUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Changelogs', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    icon: "unlock",
    onClick: function onClick() {
      return onProClick();
    }
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('I have a license, install the Pro version', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    icon: "download",
    onClick: function onClick() {
      return onFreeClick();
    }
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('I don\'t have a license, install the Free version', 'publishpress-hub')));
};
var ModalInstallationType = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalInstallationTypeComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/modal-license-input.jsx"
/*!**************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/modal-license-input.jsx ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalLicenseInput: () => (/* binding */ ModalLicenseInput)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _message_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../message/message */ "./resources/src/jsx/components/message/message.jsx");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modal */ "./resources/src/jsx/components/modal/index.jsx");
/* harmony import */ var _license_key_control__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./license-key-control */ "./resources/src/jsx/components/plugins-list/components/license-key-control.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Modal license input.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */








var ModalLicenseInputComponent = function ModalLicenseInputComponent(_ref) {
  var onClose = _ref.onClose,
    onActivate = _ref.onActivate,
    onUseExistingLicense = _ref.onUseExistingLicense,
    error = _ref.error,
    buttonInProgress = _ref.buttonInProgress,
    title = _ref.title,
    buttonLabel = _ref.buttonLabel,
    _ref$showApplyToAll = _ref.showApplyToAll,
    showApplyToAll = _ref$showApplyToAll === void 0 ? false : _ref$showApplyToAll,
    _ref$hasExistingLicen = _ref.hasExistingLicense,
    hasExistingLicense = _ref$hasExistingLicen === void 0 ? false : _ref$hasExistingLicen;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    licenseKey = _useState2[0],
    setLicenseKey = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    applyToAll = _useState4[0],
    setApplyToAll = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    activationAttempted = _useState6[0],
    setActivationAttempted = _useState6[1];
  var setFocusRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var handleFocusReady = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (setFocus) {
    setFocusRef.current = setFocus;
  }, []);
  var handleActivate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setActivationAttempted(true);
    onActivate(licenseKey, applyToAll);
  }, [onActivate, licenseKey, applyToAll]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (activationAttempted && error && setFocusRef.current) {
      setTimeout(function () {
        setFocusRef.current();
      }, 100);
    }
  }, [activationAttempted, error]);
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_5__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter your license key', 'publishpress-hub'),
    className: "pp-hub-modal-license-input",
    onRequestClose: function onRequestClose() {
      return onClose();
    }
  }, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter your license key to activate the Pro version of this plugin. You can find your license key in your PublishPress account dashboard.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-modal-inline-links"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    href: "https://publishpress.com/dashboard/?active_tab=licenses",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go to the dashboard to get your license key', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_license_key_control__WEBPACK_IMPORTED_MODULE_6__.LicenseKeyControl, {
    value: licenseKey,
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License key', 'publishpress-hub'),
    className: "pp-hub-text-control pp-hub-license-input",
    placeholder: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter your license key here', 'publishpress-hub'),
    onChange: function onChange(value) {
      return setLicenseKey(value);
    },
    autoFocus: true,
    onEnterKeyDown: handleActivate,
    onFocusReady: handleFocusReady
  }), showApplyToAll && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this license key for all PublishPress plugins', 'publishpress-hub'),
    checked: applyToAll,
    onChange: function onChange(value) {
      return setApplyToAll(value);
    }
  }), error && /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_4__.Message, {
    variant: "error"
  }, error.message), hasExistingLicense && onUseExistingLicense && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    icon: "check",
    onClick: function onClick() {
      return onUseExistingLicense();
    },
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use existing license key', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    icon: "check",
    onClick: handleActivate,
    isLoading: buttonInProgress
  }, buttonLabel || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate and install the plugin', 'publishpress-hub')));
};
var ModalLicenseInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalLicenseInputComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/modal-license-management.jsx"
/*!*******************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/modal-license-management.jsx ***!
  \*******************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalLicenseManagement: () => (/* binding */ ModalLicenseManagement)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _message_message__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../message/message */ "./resources/src/jsx/components/message/message.jsx");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modal */ "./resources/src/jsx/components/modal/index.jsx");
/* harmony import */ var _license_key_control__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./license-key-control */ "./resources/src/jsx/components/plugins-list/components/license-key-control.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Modal license management.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */








var ACTIONS = {
  EDIT: 'edit',
  VIEW: 'view'
};
var ModalLicenseManagementComponent = function ModalLicenseManagementComponent(_ref) {
  var onClose = _ref.onClose,
    onActivate = _ref.onActivate,
    onDeactivate = _ref.onDeactivate,
    onReuseLicenseForAll = _ref.onReuseLicenseForAll,
    error = _ref.error,
    buttonInProgress = _ref.buttonInProgress,
    initialLicenseKeyMasked = _ref.initialLicenseKeyMasked,
    hasLicenseKey = _ref.hasLicenseKey,
    isLicenseKeyFromConstant = _ref.isLicenseKeyFromConstant,
    title = _ref.title;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(''),
    _useState2 = _slicedToArray(_useState, 2),
    licenseKey = _useState2[0],
    setLicenseKey = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState4 = _slicedToArray(_useState3, 2),
    applyToAll = _useState4[0],
    setApplyToAll = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(hasLicenseKey ? ACTIONS.VIEW : ACTIONS.EDIT),
    _useState6 = _slicedToArray(_useState5, 2),
    currentAction = _useState6[0],
    setCurrentAction = _useState6[1];
  var _useState7 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState8 = _slicedToArray(_useState7, 2),
    activationAttempted = _useState8[0],
    setActivationAttempted = _useState8[1];
  var setFocusRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var handleFocusReady = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (setFocus) {
    setFocusRef.current = setFocus;
  }, []);
  var handleActivate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setActivationAttempted(true);
    onActivate(licenseKey, applyToAll);
  }, [onActivate, licenseKey, applyToAll]);
  var handleSwitchToEdit = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setLicenseKey('');
    setCurrentAction(ACTIONS.EDIT);
    // Focus the input after switching to edit mode
    setTimeout(function () {
      if (setFocusRef.current) {
        setFocusRef.current();
      }
    }, 100);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (activationAttempted && error && setFocusRef.current) {
      setTimeout(function () {
        setFocusRef.current();
      }, 100);
    }
  }, [activationAttempted, error]);
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_5__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manage your license', 'publishpress-hub'),
    className: "pp-hub-modal-license-input",
    onRequestClose: function onRequestClose() {
      return onClose();
    }
  }, currentAction === ACTIONS.EDIT && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter your license key to activate the Pro version of this plugin. You can find your license key in your PublishPress account dashboard.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-modal-inline-links"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "link",
    href: "https://publishpress.com/dashboard/?active_tab=licenses",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Go to the dashboard to get your license key', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_license_key_control__WEBPACK_IMPORTED_MODULE_6__.LicenseKeyControl, {
    value: licenseKey,
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License key', 'publishpress-hub'),
    className: "pp-hub-text-control pp-hub-license-input",
    placeholder: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter your license key here', 'publishpress-hub'),
    onChange: function onChange(value) {
      return setLicenseKey(value);
    },
    autoFocus: true,
    onEnterKeyDown: handleActivate,
    onFocusReady: handleFocusReady
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this license key for all PublishPress plugins', 'publishpress-hub'),
    checked: applyToAll,
    onChange: function onChange(value) {
      return setApplyToAll(value);
    }
  })), currentAction === ACTIONS.VIEW && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your license key is: ', 'publishpress-hub'), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-license-key-masked"
  }, initialLicenseKeyMasked || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(hidden)', 'publishpress-hub'))), isLicenseKeyFromConstant && /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_4__.Message, {
    variant: "info"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This license key is managed in wp-config.php and cannot be edited from the Hub.', 'publishpress-hub'))), error && /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_4__.Message, {
    variant: "error"
  }, error.message), currentAction === ACTIONS.EDIT && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    icon: "check",
    onClick: handleActivate,
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate the license key for this site', 'publishpress-hub')), currentAction === ACTIONS.VIEW && !isLicenseKeyFromConstant && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    icon: "edit",
    onClick: handleSwitchToEdit,
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit the license key', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    icon: "check",
    onClick: function onClick() {
      return onReuseLicenseForAll();
    },
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this license key for all PublishPress plugins', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    icon: "trash",
    onClick: function onClick() {
      return onDeactivate();
    },
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate the license key for this site', 'publishpress-hub'))));
};
var ModalLicenseManagement = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalLicenseManagementComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/modal-renderer.jsx"
/*!*********************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/modal-renderer.jsx ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalRenderer: () => (/* binding */ ModalRenderer)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../stores/plugins-dashboard */ "./resources/src/jsx/stores/plugins-dashboard/index.jsx");
/* harmony import */ var _modal_confirmation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal-confirmation */ "./resources/src/jsx/components/plugins-list/components/modal-confirmation.jsx");
/* harmony import */ var _modal_installation_type__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modal-installation-type */ "./resources/src/jsx/components/plugins-list/components/modal-installation-type.jsx");
/* harmony import */ var _modal_license_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modal-license-input */ "./resources/src/jsx/components/plugins-list/components/modal-license-input.jsx");
/* harmony import */ var _modal_license_management__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modal-license-management */ "./resources/src/jsx/components/plugins-list/components/modal-license-management.jsx");
/* harmony import */ var _modal_resolve_conflict__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modal-resolve-conflict */ "./resources/src/jsx/components/plugins-list/components/modal-resolve-conflict.jsx");
/* harmony import */ var _modal_upgrade__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modal-upgrade */ "./resources/src/jsx/components/plugins-list/components/modal-upgrade.jsx");
/* harmony import */ var _deactivation_warning__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./deactivation-warning */ "./resources/src/jsx/components/plugins-list/components/deactivation-warning.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Modal renderer.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */












var ModalRendererComponent = function ModalRendererComponent(_ref) {
  var modalManager = _ref.modalManager,
    pluginActions = _ref.pluginActions,
    currentPluginState = _ref.currentPluginState,
    selectedPluginForConflictResolution = _ref.selectedPluginForConflictResolution,
    pluginResolveConflictInProgress = _ref.pluginResolveConflictInProgress;
  var activeModal = modalManager.activeModal,
    currentPluginFamily = modalManager.currentPluginFamily,
    closeModal = modalManager.closeModal,
    isModalActive = modalManager.isModalActive,
    MODAL_TYPES = modalManager.MODAL_TYPES,
    currentPluginDisplayName = modalManager.currentPluginDisplayName;
  var handleInstallFree = pluginActions.handleInstallFree,
    handleInstallPro = pluginActions.handleInstallPro,
    handleUpgradePluginToPro = pluginActions.handleUpgradePluginToPro,
    handleUninstallPlugin = pluginActions.handleUninstallPlugin,
    handleConfirmDeactivatePlugin = pluginActions.handleConfirmDeactivatePlugin,
    handleResolveConflictAction = pluginActions.handleResolveConflictAction,
    handleBuyPlugin = pluginActions.handleBuyPlugin,
    handleDeactivateLicense = pluginActions.handleDeactivateLicense,
    handleActivateLicense = pluginActions.handleActivateLicense,
    handleReuseLicenseForAllPlugins = pluginActions.handleReuseLicenseForAllPlugins;
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_3__.store),
    cleanupError = _useDispatch.cleanupError;
  var plugins = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(function (select) {
    return select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_3__.store).getPlugins();
  }, []);
  var currentProPluginDisplayName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _currentPluginFamily$;
    var proPluginName = currentPluginFamily === null || currentPluginFamily === void 0 || (_currentPluginFamily$ = currentPluginFamily.proPlugin) === null || _currentPluginFamily$ === void 0 ? void 0 : _currentPluginFamily$.name;
    if (proPluginName) {
      return proPluginName;
    }
    var basePluginName = (currentPluginDisplayName || '').replace(/\s+Free$/i, '').replace(/\s+Pro$/i, '');
    return basePluginName ? "".concat(basePluginName, " Pro") : '';
  }, [currentPluginFamily, currentPluginDisplayName]);
  var processedError = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _error$context;
    if (!currentPluginState.error) return null;
    var error = _objectSpread({}, currentPluginState.error);
    if (error !== null && error !== void 0 && (_error$context = error.context) !== null && _error$context !== void 0 && _error$context.error_message && error.message !== error.context.error_message) {
      error.message = "".concat(error.message, " ").concat(error.context.error_message);
    }
    return error;
  }, [currentPluginState.error]);
  var hasExistingLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var _currentPluginFamily$2;
    return (currentPluginFamily === null || currentPluginFamily === void 0 || (_currentPluginFamily$2 = currentPluginFamily.proPlugin) === null || _currentPluginFamily$2 === void 0 ? void 0 : _currentPluginFamily$2.hasLicenseKey) || plugins.some(function (pluginFamily) {
      var _pluginFamily$proPlug, _pluginFamily$proPlug2;
      return pluginFamily.slug !== (currentPluginFamily === null || currentPluginFamily === void 0 ? void 0 : currentPluginFamily.slug) && ((_pluginFamily$proPlug = pluginFamily.proPlugin) === null || _pluginFamily$proPlug === void 0 ? void 0 : _pluginFamily$proPlug.hasLicenseKey) && !((_pluginFamily$proPlug2 = pluginFamily.proPlugin) !== null && _pluginFamily$proPlug2 !== void 0 && _pluginFamily$proPlug2.isLicenseKeyFromConstant);
    });
  }, [plugins, currentPluginFamily]);
  var modalProps = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var hasActiveModal = currentPluginFamily && activeModal !== MODAL_TYPES.NONE;
    return {
      onClose: function onClose() {
        closeModal();
        if (currentPluginFamily) {
          cleanupError(currentPluginFamily);
        }
      },
      error: hasActiveModal ? processedError : null,
      buttonInProgress: currentPluginState.inProgress
    };
  }, [currentPluginFamily, activeModal, closeModal, cleanupError, currentPluginState.inProgress, processedError, MODAL_TYPES.NONE]);
  if (!currentPluginFamily || activeModal === MODAL_TYPES.NONE) {
    return null;
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, isModalActive(MODAL_TYPES.INSTALLATION_TYPE) && /*#__PURE__*/React.createElement(_modal_installation_type__WEBPACK_IMPORTED_MODULE_5__.ModalInstallationType, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Install %s', 'publishpress-hub'), currentPluginDisplayName),
    onProClick: function onProClick() {
      return modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO, currentPluginFamily);
    },
    onFreeClick: function onFreeClick() {
      return handleInstallFree(currentPluginFamily.slug);
    },
    freeDetailsUrl: currentPluginFamily.freeDetailsUrl,
    proDetailsUrl: currentPluginFamily.proDetailsUrl,
    changelogUrl: currentPluginFamily.changelogUrl
  })), isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO) && /*#__PURE__*/React.createElement(_modal_license_input__WEBPACK_IMPORTED_MODULE_6__.ModalLicenseInput, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Install %s', 'publishpress-hub'), currentProPluginDisplayName),
    onActivate: function onActivate(licenseKey, applyToAll) {
      return handleInstallPro(currentPluginFamily.slug, licenseKey, applyToAll);
    },
    onUseExistingLicense: function onUseExistingLicense() {
      return handleInstallPro(currentPluginFamily.slug, '', false, true);
    },
    showApplyToAll: true,
    hasExistingLicense: hasExistingLicense
  })), isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE) && /*#__PURE__*/React.createElement(_modal_license_input__WEBPACK_IMPORTED_MODULE_6__.ModalLicenseInput, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upgrade %s', 'publishpress-hub'), currentProPluginDisplayName),
    onActivate: function onActivate(licenseKey, applyToAll) {
      return handleUpgradePluginToPro(currentPluginFamily.slug, licenseKey, applyToAll);
    },
    onUseExistingLicense: function onUseExistingLicense() {
      return handleUpgradePluginToPro(currentPluginFamily.slug, '', false, true);
    },
    showApplyToAll: true,
    hasExistingLicense: hasExistingLicense
  })), isModalActive(MODAL_TYPES.DEACTIVATE_CONFIRMATION) && /*#__PURE__*/React.createElement(_modal_confirmation__WEBPACK_IMPORTED_MODULE_4__.ModalConfirmation, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate %s', 'publishpress-hub'), currentPluginDisplayName),
    message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to deactivate %s?', 'publishpress-hub'), currentPluginDisplayName),
    confirmLabel: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate plugin', 'publishpress-hub'),
    isDanger: true,
    onConfirm: function onConfirm() {
      return handleConfirmDeactivatePlugin(currentPluginFamily);
    },
    onCancel: modalProps.onClose
  }), /*#__PURE__*/React.createElement(_deactivation_warning__WEBPACK_IMPORTED_MODULE_10__.DeactivationWarning, {
    pluginFamily: currentPluginFamily
  })), isModalActive(MODAL_TYPES.UNINSTALL_CONFIRMATION) && /*#__PURE__*/React.createElement(_modal_confirmation__WEBPACK_IMPORTED_MODULE_4__.ModalConfirmation, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uninstall %s', 'publishpress-hub'), currentPluginDisplayName),
    message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to uninstall %s?', 'publishpress-hub'), currentPluginDisplayName),
    confirmLabel: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uninstall plugin', 'publishpress-hub'),
    isDanger: true,
    onConfirm: function onConfirm() {
      return handleUninstallPlugin(currentPluginFamily.slug);
    },
    onCancel: closeModal
  }), /*#__PURE__*/React.createElement(_deactivation_warning__WEBPACK_IMPORTED_MODULE_10__.DeactivationWarning, {
    pluginFamily: currentPluginFamily,
    isUninstall: true
  })), isModalActive(MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO) && /*#__PURE__*/React.createElement(_modal_upgrade__WEBPACK_IMPORTED_MODULE_9__.ModalUpgrade, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upgrade %s', 'publishpress-hub'), currentProPluginDisplayName),
    onLicenseClick: function onLicenseClick() {
      return modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE, currentPluginFamily);
    },
    onBuyClick: function onBuyClick() {
      return handleBuyPlugin(currentPluginFamily.proPlugin.detailsUrl);
    },
    proDetailsUrl: currentPluginFamily.proPlugin.detailsUrl,
    changelogUrl: currentPluginFamily.changelogUrl
  })), isModalActive(MODAL_TYPES.RESOLVE_CONFLICT) && /*#__PURE__*/React.createElement(_modal_resolve_conflict__WEBPACK_IMPORTED_MODULE_8__.ModalResolveConflict, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Resolve Conflict for %s', 'publishpress-hub'), currentPluginDisplayName),
    onKeepFreePlugin: function onKeepFreePlugin() {
      return handleResolveConflictAction(currentPluginFamily, 'free');
    },
    onKeepProPlugin: function onKeepProPlugin() {
      return handleResolveConflictAction(currentPluginFamily, 'pro');
    },
    onCancel: closeModal,
    pluginsFamily: currentPluginFamily,
    buttonInProgress: pluginResolveConflictInProgress[currentPluginFamily.slug] || false,
    selectedPluginForConflictResolution: selectedPluginForConflictResolution
  })), isModalActive(MODAL_TYPES.LICENSE_MANAGEMENT) && /*#__PURE__*/React.createElement(_modal_license_management__WEBPACK_IMPORTED_MODULE_7__.ModalLicenseManagement, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manage %s License', 'publishpress-hub'), currentPluginDisplayName),
    onActivate: function onActivate(licenseKey, applyToAll) {
      return handleActivateLicense(currentPluginFamily, licenseKey, applyToAll);
    },
    onDeactivate: function onDeactivate() {
      return handleDeactivateLicense(currentPluginFamily);
    },
    onReuseLicenseForAll: function onReuseLicenseForAll() {
      return handleReuseLicenseForAllPlugins(currentPluginFamily);
    },
    hasLicenseKey: currentPluginFamily.proPlugin.hasLicenseKey,
    initialLicenseKeyMasked: currentPluginFamily.proPlugin.licenseKeyMasked,
    isLicenseKeyFromConstant: currentPluginFamily.proPlugin.isLicenseKeyFromConstant
  })), isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE) && /*#__PURE__*/React.createElement(_modal_license_input__WEBPACK_IMPORTED_MODULE_6__.ModalLicenseInput, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate %s License', 'publishpress-hub'), currentPluginDisplayName),
    buttonLabel: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate the license key', 'publishpress-hub'),
    onActivate: function onActivate(licenseKey, applyToAll) {
      return handleActivateLicense(currentPluginFamily, licenseKey, applyToAll);
    },
    showApplyToAll: true
  })));
};
var ModalRenderer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalRendererComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/modal-resolve-conflict.jsx"
/*!*****************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/modal-resolve-conflict.jsx ***!
  \*****************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalResolveConflict: () => (/* binding */ ModalResolveConflict)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _message_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../message/message */ "./resources/src/jsx/components/message/message.jsx");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modal */ "./resources/src/jsx/components/modal/index.jsx");
/* harmony import */ var _deactivation_warning__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./deactivation-warning */ "./resources/src/jsx/components/plugins-list/components/deactivation-warning.jsx");
/**
 * Modal resolve conflict.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */







var ModalResolveConflictComponent = function ModalResolveConflictComponent(_ref) {
  var onClose = _ref.onClose,
    onKeepFreePlugin = _ref.onKeepFreePlugin,
    onKeepProPlugin = _ref.onKeepProPlugin,
    onCancel = _ref.onCancel,
    title = _ref.title,
    message = _ref.message,
    children = _ref.children,
    error = _ref.error,
    pluginsFamily = _ref.pluginsFamily,
    buttonInProgress = _ref.buttonInProgress,
    selectedPluginForConflictResolution = _ref.selectedPluginForConflictResolution;
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resolve Plugin Conflict', 'publishpress-hub'),
    className: "pp-hub-modal-resolve-conflict",
    onRequestClose: function onRequestClose() {
      return onClose();
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('We have detected both Free and Pro versions of this plugin installed. ' + 'To resolve this conflict, please choose which version you would like to keep. ' + 'The other version will be automatically uninstalled.', 'publishpress-hub')), /*#__PURE__*/React.createElement("ul", {
    className: "pp-hub-list"
  }, /*#__PURE__*/React.createElement("li", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free version: %s (%s)', 'publishpress-hub'), pluginsFamily.freePlugin.name, pluginsFamily.freePlugin.version)), /*#__PURE__*/React.createElement("li", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro version: %s (%s)', 'publishpress-hub'), pluginsFamily.proPlugin.name, pluginsFamily.proPlugin.version)))), /*#__PURE__*/React.createElement(_deactivation_warning__WEBPACK_IMPORTED_MODULE_5__.DeactivationWarning, {
    pluginFamily: pluginsFamily,
    isConflict: true
  }), children, error && /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_3__.Message, {
    variant: "error"
  }, error.message), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: function onClick() {
      return onKeepProPlugin();
    },
    isLoading: buttonInProgress && selectedPluginForConflictResolution === 'pro',
    disabled: selectedPluginForConflictResolution === 'free',
    icon: "unlock"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keep the Pro version (Recommended)', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: function onClick() {
      return onKeepFreePlugin();
    },
    isLoading: buttonInProgress && selectedPluginForConflictResolution === 'free',
    disabled: selectedPluginForConflictResolution === 'pro',
    icon: "yes"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keep the Free version', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    icon: "no",
    onClick: function onClick() {
      return onCancel();
    },
    disabled: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'publishpress-hub')));
};
var ModalResolveConflict = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalResolveConflictComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/modal-upgrade.jsx"
/*!********************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/modal-upgrade.jsx ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModalUpgrade: () => (/* binding */ ModalUpgrade)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modal */ "./resources/src/jsx/components/modal/index.jsx");
/**
 * Modal upgrade.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





var ModalUpgradeComponent = function ModalUpgradeComponent(_ref) {
  var onClose = _ref.onClose,
    onLicenseClick = _ref.onLicenseClick,
    onBuyClick = _ref.onBuyClick,
    proDetailsUrl = _ref.proDetailsUrl,
    changelogUrl = _ref.changelogUrl,
    title = _ref.title;
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to Pro', 'publishpress-hub'),
    className: "pp-hub-modal-upgrade",
    onRequestClose: function onRequestClose() {
      return onClose();
    }
  }, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlock the full potential of this plugin with the Pro version. Enjoy advanced features, priority support, and exclusive benefits designed to help you get the most out of your workflow.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-modal-inline-links"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: proDetailsUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Discover all Pro features', 'publishpress-hub')), /*#__PURE__*/React.createElement("span", null, "|"), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: changelogUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Changelog', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    icon: "unlock",
    onClick: function onClick() {
      return onLicenseClick();
    }
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Already have a license? Install Pro now', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "highlight",
    icon: "cart",
    onClick: function onClick() {
      return onBuyClick();
    }
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to Pro', 'publishpress-hub')));
};
var ModalUpgrade = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalUpgradeComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/plugin-card.jsx"
/*!******************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/plugin-card.jsx ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginCard: () => (/* binding */ PluginCard)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _action_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./action-button */ "./resources/src/jsx/components/plugins-list/components/action-button.jsx");
var _excluded = ["pluginFamily", "iconSrc", "displayName", "isFavorite", "onToggleFavorite", "actionButtons", "progressStates", "onActivate", "onDeactivate"],
  _excluded2 = ["key"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
/**
 * Compact plugin card with a persistent action footer.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */





var documentationCategories = {
  authors: 'publishpress-authors',
  blocks: 'blocks',
  capabilities: 'cme',
  checklists: 'checklists',
  future: 'future',
  permissions: 'presspermit',
  planner: 'publishpress',
  revisions: 'revisions',
  series: 'series',
  shortlinks: 'publishpress-shortlinks',
  statuses: 'publishpress-statuses',
  cart: 'publishpress-cart',
  taxonomies: 'publishpress-taxonomies',
  'tag-groups': 'publishpress-tag-groups'
};
var PluginCard = function PluginCard(_ref) {
  var pluginFamily = _ref.pluginFamily,
    iconSrc = _ref.iconSrc,
    displayName = _ref.displayName,
    isFavorite = _ref.isFavorite,
    onToggleFavorite = _ref.onToggleFavorite,
    actionButtons = _ref.actionButtons,
    progressStates = _ref.progressStates,
    onActivate = _ref.onActivate,
    onDeactivate = _ref.onDeactivate,
    actions = _objectWithoutProperties(_ref, _excluded);
  var moreRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var menu = moreRef.current;
    if (!menu) return;
    var ownerDocument = menu.ownerDocument;
    var dismissOutside = function dismissOutside(event) {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    };
    var dismissOnEscape = function dismissOnEscape(event) {
      if (event.key === 'Escape' && menu.open && menu.contains(event.target)) {
        var _menu$querySelector;
        menu.open = false;
        (_menu$querySelector = menu.querySelector('summary')) === null || _menu$querySelector === void 0 || _menu$querySelector.focus();
        event.stopPropagation();
      }
    };
    ownerDocument.addEventListener('pointerdown', dismissOutside, true);
    menu.addEventListener('keydown', dismissOnEscape);
    return function () {
      ownerDocument.removeEventListener('pointerdown', dismissOutside, true);
      menu.removeEventListener('keydown', dismissOnEscape);
    };
  }, []);
  var busy = Object.values(progressStates).some(Boolean);
  var inProgress = progressStates.isInstalling || progressStates.isUpgrading || progressStates.isResolvingConflict;
  var active = pluginFamily.hasAnyVersionActive;
  var conflict = pluginFamily.hasConflictingInstallations;
  var category = documentationCategories[pluginFamily.slug];
  var documentationUrl = category ? "https://publishpress.com/docs-category/".concat(category, "/") : 'https://publishpress.com/knowledge-base/';
  var updateAction = actionButtons.find(function (button) {
    return button.key === 'update';
  });
  var moreActions = actionButtons.filter(function (button) {
    return !['activate', 'deactivate', 'update'].includes(button.key);
  });
  return /*#__PURE__*/React.createElement("article", {
    className: "pp-hub-plugin-card".concat(isFavorite ? ' is-favorite' : '').concat(busy ? ' is-busy' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__header"
  }, /*#__PURE__*/React.createElement("img", {
    className: "pp-hub-plugin-card__icon",
    src: iconSrc,
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__identity"
  }, /*#__PURE__*/React.createElement("h3", null, displayName.replace(/^PublishPress\s+/, '')), /*#__PURE__*/React.createElement("p", null, pluginFamily.description)), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__controls"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-favorite",
    "aria-pressed": isFavorite,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(isFavorite ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove %s from favorites', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add %s to favorites', 'publishpress-hub'), displayName),
    onClick: function onClick() {
      return onToggleFavorite(pluginFamily.slug);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-star-".concat(isFavorite ? 'filled' : 'empty'),
    "aria-hidden": "true"
  })), pluginFamily.hasAnyVersionInstalled && !conflict && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__activation".concat(active ? ' is-active' : '')
  }, /*#__PURE__*/React.createElement("span", null, active ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Active', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inactive', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: active,
    disabled: busy,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(active ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate %s', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate %s', 'publishpress-hub'), displayName),
    onChange: function onChange(value) {
      return value ? onActivate(pluginFamily) : onDeactivate(pluginFamily);
    }
  })), !pluginFamily.hasAnyVersionInstalled && /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-plugin-card__state"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not installed', 'publishpress-hub')))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__actions"
  }, /*#__PURE__*/React.createElement("details", {
    ref: moreRef,
    className: "pp-hub-plugin-card__more"
  }, /*#__PURE__*/React.createElement("summary", {
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('More actions for %s', 'publishpress-hub'), displayName)
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('More', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__more-actions"
  }, moreActions.map(function (_ref2) {
    var key = _ref2.key,
      button = _objectWithoutProperties(_ref2, _excluded2);
    return button.variant === 'label' ? /*#__PURE__*/React.createElement("span", {
      key: key
    }, button.text) : /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, _extends({
      key: key
    }, button, {
      disabled: busy
    }));
  })))), (conflict || updateAction || progressStates.isActivating || progressStates.isDeactivating) && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__notice",
    role: "status"
  }, conflict && /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-plugin-feedback is-conflict"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-warning",
    "aria-hidden": "true"
  }), (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Conflicting installations', 'publishpress-hub')), updateAction && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, _extends({}, updateAction, {
    disabled: busy && !progressStates.isUpdating
  })), progressStates.isActivating && /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-plugin-feedback"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {
    "aria-hidden": "true"
  }), (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activating…', 'publishpress-hub')), progressStates.isDeactivating && /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-plugin-feedback"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {
    "aria-hidden": "true"
  }), (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivating…', 'publishpress-hub'))), /*#__PURE__*/React.createElement("footer", {
    className: "pp-hub-plugin-card__footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__primary"
  }, /*#__PURE__*/React.createElement(_action_button__WEBPACK_IMPORTED_MODULE_4__.ActionButton, _extends({
    pluginFamily: pluginFamily,
    inProgress: inProgress,
    disabled: busy
  }, actions))), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    href: documentationUrl,
    icon: "book-alt"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Documentation', 'publishpress-hub'))));
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/plugin-item.jsx"
/*!******************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/plugin-item.jsx ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginItem: () => (/* binding */ PluginItem)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tooltip */ "./resources/src/jsx/components/tooltip/index.jsx");
/* harmony import */ var _status_flag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./status-flag */ "./resources/src/jsx/components/plugins-list/components/status-flag.jsx");
/* harmony import */ var _action_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./action-button */ "./resources/src/jsx/components/plugins-list/components/action-button.jsx");
/* harmony import */ var _plugin_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./plugin-card */ "./resources/src/jsx/components/plugins-list/components/plugin-card.jsx");
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../hooks */ "./resources/src/jsx/components/plugins-list/hooks/index.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Plugin item.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */










var PluginItemComponent = function PluginItemComponent(_ref) {
  var pluginFamily = _ref.pluginFamily,
    _ref$layout = _ref.layout,
    layout = _ref$layout === void 0 ? 'list' : _ref$layout,
    _ref$isFavorite = _ref.isFavorite,
    isFavorite = _ref$isFavorite === void 0 ? false : _ref$isFavorite,
    onToggleFavorite = _ref.onToggleFavorite,
    pluginIconBaseUrl = _ref.pluginIconBaseUrl,
    progressStates = _ref.progressStates,
    onInstall = _ref.onInstall,
    onActivate = _ref.onActivate,
    onDeactivate = _ref.onDeactivate,
    onUpgradeToPro = _ref.onUpgradeToPro,
    onManageLicense = _ref.onManageLicense,
    onActivateLicense = _ref.onActivateLicense,
    onUninstall = _ref.onUninstall,
    onResolveConflict = _ref.onResolveConflict,
    onDeactivateLicense = _ref.onDeactivateLicense,
    onUpdate = _ref.onUpdate;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    isHovered = _useState2[0],
    setIsHovered = _useState2[1];
  var _useScreenSize = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.useScreenSize)(),
    isSmallMobile = _useScreenSize.isSmallMobile,
    isMobile = _useScreenSize.isMobile;

  // Extract individual progress states for backwards compatibility
  var isInstalling = progressStates.isInstalling,
    isUninstalling = progressStates.isUninstalling,
    isDeactivating = progressStates.isDeactivating,
    isActivating = progressStates.isActivating,
    isUpgrading = progressStates.isUpgrading,
    isUpdating = progressStates.isUpdating,
    isResolvingConflict = progressStates.isResolvingConflict,
    isActivatingLicense = progressStates.isActivatingLicense,
    isDeactivatingLicense = progressStates.isDeactivatingLicense;
  var status = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.usePluginStatus)(pluginFamily);
  var _usePluginDisplayInfo = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.usePluginDisplayInfo)(pluginFamily, pluginIconBaseUrl, status),
    iconSrc = _usePluginDisplayInfo.iconSrc,
    displayName = _usePluginDisplayInfo.displayName;
  var loadingStates = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return {
      isDeactivating: isDeactivating,
      isActivating: isActivating,
      isUninstalling: isUninstalling,
      isUpdating: isUpdating,
      isUpgrading: isUpgrading,
      isResolvingConflict: isResolvingConflict,
      isActivatingLicense: isActivatingLicense,
      isDeactivatingLicense: isDeactivatingLicense
    };
  }, [isDeactivating, isActivating, isUninstalling, isUpdating, isActivatingLicense, isDeactivatingLicense]);
  var handlers = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return {
      onDeactivate: onDeactivate,
      onActivate: onActivate,
      onUninstall: onUninstall,
      onDeactivateLicense: onDeactivateLicense
    };
  }, [onDeactivate, onActivate, onUninstall, onDeactivateLicense]);
  var actionButtonsData = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.useActionButtons)(pluginFamily, status, loadingStates, handlers, onUpdate, isUpdating);
  var inProgress = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return isInstalling || isUpgrading || isResolvingConflict;
  }, [isInstalling, isUpgrading, isResolvingConflict]);
  var handleMouseEnter = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return setIsHovered(true);
  }, []);
  var handleMouseLeave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    return setIsHovered(false);
  }, []);
  var statusFlagClass = status.statusFlagClass,
    tooltipText = status.tooltipText;

  // Responsive class names
  var responsiveClasses = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var classes = ['pp-hub-plugins-list-item', statusFlagClass];
    if (isHovered) {
      classes.push('hovered');
    }
    if (isSmallMobile) {
      classes.push('is-small-mobile');
    } else if (isMobile) {
      classes.push('is-mobile');
    }
    return classes.join(' ');
  }, [statusFlagClass, isHovered, isSmallMobile, isMobile]);

  // Show toggle control based on screen size
  var shouldShowToggle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    // Hide toggle on small mobile screens
    if (isSmallMobile) {
      return false;
    }

    // Show toggle on larger screens
    return status.isInstalled && !status.hasConflictingInstallations;
  }, [status.isInstalled, isSmallMobile]);

  // Get current installed version for update badge
  var getUpdateBadgeInfo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (!pluginFamily.hasUpdate || !pluginFamily.hasAnyVersionInstalled) {
      return null;
    }
    var installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin;
    var currentVersion = installedPlugin.version || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown', 'publishpress-hub');
    var availableVersion = pluginFamily.availableVersion || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('New version available', 'publishpress-hub');
    return {
      currentVersion: currentVersion,
      availableVersion: availableVersion
    };
  }, [pluginFamily]);
  var installedVersionLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    if (!status.isInstalled || status.hasConflictingInstallations) {
      return null;
    }
    var installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin.isInstalled ? pluginFamily.proPlugin : null;
    if (!installedPlugin || !installedPlugin.version) {
      return null;
    }

    // translators: %s is the installed version number
    return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Installed version: %s', 'publishpress-hub'), installedPlugin.version);
  }, [pluginFamily, status.isInstalled, status.hasConflictingInstallations]);
  if (layout === 'cards') {
    return /*#__PURE__*/React.createElement(_plugin_card__WEBPACK_IMPORTED_MODULE_6__.PluginCard, {
      pluginFamily: pluginFamily,
      iconSrc: iconSrc,
      displayName: displayName,
      isFavorite: isFavorite,
      onToggleFavorite: onToggleFavorite,
      actionButtons: actionButtonsData,
      progressStates: progressStates,
      onActivate: onActivate,
      onDeactivate: onDeactivate,
      onInstall: onInstall,
      onResolveConflict: onResolveConflict,
      onUpgradeToPro: onUpgradeToPro,
      onManageLicense: onManageLicense,
      onActivateLicense: onActivateLicense,
      onUpdate: onUpdate
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: responsiveClasses,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-item-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-item-icon"
  }, /*#__PURE__*/React.createElement("img", {
    src: iconSrc,
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-item-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-item-name"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-favorite",
    "aria-pressed": isFavorite,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(isFavorite ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove %s from favorites', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add %s to favorites', 'publishpress-hub'), displayName),
    onClick: function onClick() {
      return onToggleFavorite(pluginFamily.slug);
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dashicons dashicons-star-".concat(isFavorite ? 'filled' : 'empty'),
    "aria-hidden": "true"
  })), shouldShowToggle && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
    // translators: %s is the plugin name.
    pluginFamily.hasAnyVersionActive ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate %s', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate %s', 'publishpress-hub'), displayName),
    disabled: status.hasConflictingInstallations,
    checked: pluginFamily.hasAnyVersionActive,
    onChange: function onChange(newValue) {
      if (newValue) {
        onActivate(pluginFamily);
      } else {
        onDeactivate(pluginFamily);
      }
    }
  }), /*#__PURE__*/React.createElement(_tooltip__WEBPACK_IMPORTED_MODULE_3__.Tooltip, {
    text: tooltipText,
    placement: "top",
    useCustom: true
  }, /*#__PURE__*/React.createElement("span", null, displayName)), /*#__PURE__*/React.createElement(_status_flag__WEBPACK_IMPORTED_MODULE_4__.StatusFlag, {
    pluginFamily: pluginFamily,
    isInstalling: isInstalling,
    isUninstalling: isUninstalling,
    isUpgrading: isUpgrading,
    isDeactivating: isDeactivating,
    isActivating: isActivating,
    hasUpdate: pluginFamily.hasUpdate && pluginFamily.hasAnyVersionInstalled,
    updateBadgeTooltip: getUpdateBadgeInfo ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Update available: %s → %s', 'publishpress-hub'), getUpdateBadgeInfo.currentVersion, getUpdateBadgeInfo.availableVersion) : null
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-item-description"
  }, pluginFamily.description), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-item-inline-actions"
  }, actionButtonsData.map(function (buttonProps, index) {
    if (buttonProps.key === 'activate' && !isSmallMobile) {
      return null;
    }
    if (buttonProps.key === 'deactivate' && !isSmallMobile) {
      return null;
    }
    return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: buttonProps.key
    }, buttonProps.variant === 'label' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\u2022"), /*#__PURE__*/React.createElement("span", {
      className: buttonProps.className
    }, buttonProps.text)), buttonProps.variant !== 'label' && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_7__.Button, buttonProps));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-item-actions"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalVStack, null, /*#__PURE__*/React.createElement(_action_button__WEBPACK_IMPORTED_MODULE_5__.ActionButton, {
    pluginFamily: pluginFamily,
    inProgress: inProgress,
    onInstall: onInstall,
    onResolveConflict: onResolveConflict,
    onUpgradeToPro: onUpgradeToPro,
    onManageLicense: onManageLicense,
    onActivateLicense: onActivateLicense,
    onUpdate: onUpdate
  }))));
};
PluginItemComponent.displayName = 'PluginItem';
var PluginItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(PluginItemComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/components/status-flag.jsx"
/*!******************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/components/status-flag.jsx ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatusFlag: () => (/* binding */ StatusFlag)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _badge_badge__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../badge/badge */ "./resources/src/jsx/components/badge/badge.jsx");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../tooltip */ "./resources/src/jsx/components/tooltip/index.jsx");
/**
 * Status flag.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






var DAYS_UNTIL_EXPIRATION_DATE_THRESHOLD = 60;
var STATUS_BADGE_CONFIGS = {
  installing: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Installing', 'publishpress-hub'),
    className: 'installing',
    icon: /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {
      "aria-hidden": "true"
    })
  },
  notInstalled: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not Installed', 'publishpress-hub'),
    className: 'not-installed'
  },
  free: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Free', 'publishpress-hub'),
    className: 'free'
  },
  licensed: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Licensed', 'publishpress-hub'),
    className: 'licensed'
  },
  unlicensed: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlicensed', 'publishpress-hub'),
    className: 'unlicensed'
  },
  expired: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Expired', 'publishpress-hub'),
    className: 'expired'
  },
  uninstalling: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uninstalling', 'publishpress-hub'),
    className: 'uninstalling',
    icon: /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {
      "aria-hidden": "true"
    })
  },
  upgrading: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upgrading', 'publishpress-hub'),
    className: 'upgrading',
    icon: /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {
      "aria-hidden": "true"
    })
  },
  deactivating: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivating', 'publishpress-hub'),
    className: 'deactivating',
    icon: /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {
      "aria-hidden": "true"
    })
  },
  activating: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activating', 'publishpress-hub'),
    className: 'activating',
    icon: /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {
      "aria-hidden": "true"
    })
  },
  hasConflictingInstallations: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Conflicting Installations', 'publishpress-hub'),
    className: 'conflicting-installations'
  },
  updateAvailable: {
    text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Update Available', 'publishpress-hub'),
    className: 'update-available',
    icon: /*#__PURE__*/React.createElement("span", {
      className: "dashicons dashicons-warning"
    })
  }
};
var StatusFlagComponent = function StatusFlagComponent(_ref) {
  var pluginFamily = _ref.pluginFamily,
    isInstalling = _ref.isInstalling,
    isUninstalling = _ref.isUninstalling,
    isUpgrading = _ref.isUpgrading,
    isDeactivating = _ref.isDeactivating,
    isActivating = _ref.isActivating,
    hasUpdate = _ref.hasUpdate,
    updateBadgeTooltip = _ref.updateBadgeTooltip;
  // Extract the countInstalledPlugins calculation to avoid nesting useMemo hooks
  var countInstalledPlugins = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    var count = 0;
    if (pluginFamily.freePlugin.isInstalled) {
      count += 1;
    }
    if (pluginFamily.proPlugin.isInstalled) {
      count += 1;
    }
    return count;
  }, [pluginFamily]);
  var statusBadgeProps = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (pluginFamily.hasConflictingInstallations) {
      return STATUS_BADGE_CONFIGS.hasConflictingInstallations;
    }
    if (isInstalling) {
      return STATUS_BADGE_CONFIGS.installing;
    }
    if (isUninstalling) {
      return STATUS_BADGE_CONFIGS.uninstalling;
    }
    if (isUpgrading) {
      return STATUS_BADGE_CONFIGS.upgrading;
    }
    if (isDeactivating) {
      return STATUS_BADGE_CONFIGS.deactivating;
    }
    if (isActivating) {
      return STATUS_BADGE_CONFIGS.activating;
    }
    if (countInstalledPlugins === 0) {
      return STATUS_BADGE_CONFIGS.notInstalled;
    }
    if (pluginFamily.proPlugin.isInstalled) {
      // Check if expired first (before checking if licensed)
      if (pluginFamily.proPlugin.isExpired) {
        return STATUS_BADGE_CONFIGS.expired;
      }
      return pluginFamily.proPlugin.isLicensed ? STATUS_BADGE_CONFIGS.licensed : STATUS_BADGE_CONFIGS.unlicensed;
    }
  }, [pluginFamily, isInstalling, isUninstalling, isUpgrading, isDeactivating, isActivating, countInstalledPlugins]);
  var expirationDate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    if (!statusBadgeProps) {
      return null;
    }

    // Display expiration date for licensed plugins
    if (statusBadgeProps === STATUS_BADGE_CONFIGS.licensed && pluginFamily.proPlugin.isLicensed && pluginFamily.proPlugin.licenseExpirationDateFormatted) {
      // Do not display expiration date if it is more than DAYS_UNTIL_EXPIRATION_DATE_THRESHOLD days away.
      if (pluginFamily.proPlugin.daysUntilExpiration && pluginFamily.proPlugin.daysUntilExpiration >= DAYS_UNTIL_EXPIRATION_DATE_THRESHOLD) {
        return null;
      }
      return pluginFamily.proPlugin.licenseExpirationDateFormatted;
    }
    return null;
  }, [statusBadgeProps, pluginFamily]);
  if (!statusBadgeProps && !hasUpdate) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-status-flag",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      flexWrap: 'wrap'
    }
  }, statusBadgeProps && /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_3__.Badge, statusBadgeProps, statusBadgeProps.text), hasUpdate && /*#__PURE__*/React.createElement(_tooltip__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
    text: updateBadgeTooltip || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Update Available', 'publishpress-hub'),
    placement: "top",
    useCustom: true
  }, /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_3__.Badge, STATUS_BADGE_CONFIGS.updateAvailable, STATUS_BADGE_CONFIGS.updateAvailable.text)), expirationDate && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '12px',
      color: 'var(--pp-hub-text-secondary, #666)'
    }
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Expires', 'publishpress-hub'), " ", expirationDate));
};
StatusFlagComponent.displayName = 'StatusFlag';
var StatusFlag = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(StatusFlagComponent);

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/index.jsx"
/*!*******************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/index.jsx ***!
  \*******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useActionButtons: () => (/* reexport safe */ _use_action_buttons__WEBPACK_IMPORTED_MODULE_3__.useActionButtons),
/* harmony export */   useModalManager: () => (/* reexport safe */ _use_modal_manager__WEBPACK_IMPORTED_MODULE_0__.useModalManager),
/* harmony export */   usePluginActions: () => (/* reexport safe */ _use_plugin_actions__WEBPACK_IMPORTED_MODULE_1__.usePluginActions),
/* harmony export */   usePluginDisplayInfo: () => (/* reexport safe */ _use_plugin_display_info__WEBPACK_IMPORTED_MODULE_4__.usePluginDisplayInfo),
/* harmony export */   usePluginStatus: () => (/* reexport safe */ _use_plugin_status__WEBPACK_IMPORTED_MODULE_2__.usePluginStatus),
/* harmony export */   useScreenSize: () => (/* reexport safe */ _use_screen_size__WEBPACK_IMPORTED_MODULE_5__.useScreenSize)
/* harmony export */ });
/* harmony import */ var _use_modal_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./use-modal-manager */ "./resources/src/jsx/components/plugins-list/hooks/use-modal-manager.jsx");
/* harmony import */ var _use_plugin_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./use-plugin-actions */ "./resources/src/jsx/components/plugins-list/hooks/use-plugin-actions.jsx");
/* harmony import */ var _use_plugin_status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./use-plugin-status */ "./resources/src/jsx/components/plugins-list/hooks/use-plugin-status.jsx");
/* harmony import */ var _use_action_buttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./use-action-buttons */ "./resources/src/jsx/components/plugins-list/hooks/use-action-buttons.jsx");
/* harmony import */ var _use_plugin_display_info__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./use-plugin-display-info */ "./resources/src/jsx/components/plugins-list/hooks/use-plugin-display-info.jsx");
/* harmony import */ var _use_screen_size__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./use-screen-size */ "./resources/src/jsx/components/plugins-list/hooks/use-screen-size.jsx");
/**
 * Plugins list hooks.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */








/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-action-buttons.jsx"
/*!********************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-action-buttons.jsx ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useActionButtons: () => (/* binding */ useActionButtons)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Use action buttons.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */



var useActionButtons = function useActionButtons(pluginFamily, status, loadingStates, handlers, onUpdate, isUpdating) {
  var isActive = status.isActive,
    isInstalled = status.isInstalled,
    hasConflictingInstallations = status.hasConflictingInstallations;
  var isDeactivating = loadingStates.isDeactivating,
    isActivating = loadingStates.isActivating,
    isUninstalling = loadingStates.isUninstalling;
  var onDeactivate = handlers.onDeactivate,
    onActivate = handlers.onActivate,
    onUninstall = handlers.onUninstall;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var buttons = [];

    // Add renewal link if license is expired (show first in row actions)
    if (pluginFamily.proPlugin.isInstalled && pluginFamily.proPlugin.isExpired && pluginFamily.proPlugin.detailsUrl) {
      buttons.push({
        key: 'renew',
        variant: 'link',
        href: pluginFamily.proPlugin.detailsUrl,
        className: 'is-renew-link',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Renew', 'publishpress-hub'),
        disabled: isUpdating ? false : undefined
      });
    }
    // Add renewal link if license is expiring within 30 days
    else if (pluginFamily.proPlugin.isInstalled && pluginFamily.proPlugin.isLicensed && !pluginFamily.proPlugin.isExpired && pluginFamily.proPlugin.daysUntilExpiration !== undefined && pluginFamily.proPlugin.daysUntilExpiration >= 0 && pluginFamily.proPlugin.daysUntilExpiration <= 30 && pluginFamily.proPlugin.detailsUrl) {
      buttons.push({
        key: 'renew',
        variant: 'link',
        href: pluginFamily.proPlugin.detailsUrl,
        className: 'is-renew-link',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Renew', 'publishpress-hub'),
        disabled: isUpdating ? false : undefined
      });
    }
    if (isInstalled && !hasConflictingInstallations) {
      if (isActive) {
        buttons.push({
          key: 'deactivate',
          variant: 'link',
          text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deactivate', 'publishpress-hub'),
          isLoading: isDeactivating,
          disabled: isUpdating ? false : undefined,
          onClick: function onClick() {
            return onDeactivate(pluginFamily);
          }
        });
      } else {
        buttons.push({
          key: 'activate',
          variant: 'link',
          text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Activate', 'publishpress-hub'),
          isLoading: isActivating,
          disabled: isUpdating ? false : undefined,
          onClick: function onClick() {
            return onActivate(pluginFamily);
          }
        });
      }
      buttons.push({
        key: 'uninstall',
        variant: 'link',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Uninstall', 'publishpress-hub'),
        isLoading: isUninstalling,
        disabled: isUpdating ? false : undefined,
        className: 'is-danger',
        onClick: function onClick() {
          return onUninstall(pluginFamily);
        }
      });
    }
    if (!isInstalled) {
      buttons.push({
        key: 'free-details',
        variant: 'link',
        href: pluginFamily.freePlugin.detailsUrl,
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free Details', 'publishpress-hub'),
        disabled: isUpdating ? false : undefined
      });
      buttons.push({
        key: 'pro-details',
        variant: 'link',
        href: pluginFamily.proPlugin.detailsUrl,
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro Details', 'publishpress-hub'),
        disabled: isUpdating ? false : undefined
      });
    }
    buttons.push({
      key: 'changelogs',
      variant: 'link',
      href: pluginFamily.changelogUrl,
      text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Changelogs', 'publishpress-hub'),
      disabled: isUpdating ? false : undefined
    });

    // Add update button if update is available (show first in row actions)
    if (isInstalled && !hasConflictingInstallations && pluginFamily.hasUpdate && pluginFamily.hasAnyVersionInstalled && onUpdate) {
      var installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin;
      var currentVersion = installedPlugin.version || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unknown', 'publishpress-hub');
      var availableVersion = pluginFamily.availableVersion || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('latest', 'publishpress-hub');
      buttons.push({
        key: 'update',
        variant: 'link',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Update to %s', 'publishpress-hub'), availableVersion),
        isLoading: isUpdating,
        onClick: function onClick() {
          return onUpdate(pluginFamily);
        }
      });
    }
    if (isInstalled) {
      var _installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin;
      var _currentVersion = _installedPlugin.version || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unknown', 'publishpress-hub');
      var _availableVersion = pluginFamily.availableVersion || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('latest', 'publishpress-hub');
      buttons.push({
        key: 'current-version',
        variant: 'label',
        className: 'pp-hub-plugin-current-version',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Installed version: %s', 'publishpress-hub'), _currentVersion)
      });
    }
    return buttons;
  }, [isInstalled, isActive, hasConflictingInstallations, isDeactivating, isActivating, isUninstalling, isUpdating, pluginFamily, onDeactivate, onActivate, onUninstall, onUpdate]);
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-focus-on-action.jsx"
/*!*********************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-focus-on-action.jsx ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useFocusOnAction: () => (/* binding */ useFocusOnAction)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Use focus on action.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */



/**
 * Custom hook to focus an input element when a specific action is triggered
 * @param {boolean} shouldFocus - Whether to focus the input element (default: true)
 * @param {number} delay - Delay in milliseconds before focusing (default: 100)
 * @returns {React.RefObject} Reference to the container element
 */
var useFocusOnAction = function useFocusOnAction() {
  var shouldFocus = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  var textControlRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  var focusInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (!textControlRef.current) {
      return;
    }
    var input = textControlRef.current.querySelector('input');
    if (input) {
      input.focus();
      input.select();
    }
  }, []);
  var setFocus = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    focusInput();
  }, [focusInput]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (!shouldFocus) {
      return;
    }
    var timeoutId = setTimeout(focusInput, delay);
    return function () {
      clearTimeout(timeoutId);
    };
  }, [shouldFocus, delay, focusInput]);
  return [textControlRef, setFocus];
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-modal-manager.jsx"
/*!*******************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-modal-manager.jsx ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useModalManager: () => (/* binding */ useModalManager)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Use modal manager.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


var MODAL_TYPES = {
  NONE: 'none',
  INSTALLATION_TYPE: 'installation-type',
  LICENSE_INPUT_FOR_INSTALLING_PRO: 'license-input-for-installing-pro',
  LICENSE_INPUT_FOR_UPGRADE: 'license-input-for-upgrade',
  LICENSE_INPUT_FOR_ACTIVATING_LICENSE: 'license-input-for-activating-license',
  UNINSTALL_CONFIRMATION: 'uninstall-confirmation',
  DEACTIVATE_CONFIRMATION: 'deactivate-confirmation',
  UPGRADE_PLUGIN_TO_PRO: 'upgrade-plugin-to-pro',
  RESOLVE_CONFLICT: 'resolve-conflict',
  LICENSE_MANAGEMENT: 'license-management'
};
var useModalManager = function useModalManager() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(MODAL_TYPES.NONE),
    _useState2 = _slicedToArray(_useState, 2),
    activeModal = _useState2[0],
    setActiveModal = _useState2[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    currentPluginFamily = _useState4[0],
    setCurrentPluginFamily = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    currentPluginDisplayName = _useState6[0],
    setCurrentPluginDisplayName = _useState6[1];
  var openModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (modalType) {
    var pluginFamily = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    setActiveModal(modalType);
    setCurrentPluginFamily(pluginFamily);
    var isPro = pluginFamily.proPlugin.isInstalled;
    setCurrentPluginDisplayName(isPro ? pluginFamily.proPlugin.name : pluginFamily.freePlugin.name);
  }, []);
  var closeModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    setActiveModal(MODAL_TYPES.NONE);
    setCurrentPluginFamily(null);
    setCurrentPluginDisplayName(null);
  }, []);
  var isModalActive = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (modalType) {
    return activeModal === modalType;
  }, [activeModal]);
  return {
    MODAL_TYPES: MODAL_TYPES,
    activeModal: activeModal,
    currentPluginFamily: currentPluginFamily,
    openModal: openModal,
    closeModal: closeModal,
    isModalActive: isModalActive,
    currentPluginDisplayName: currentPluginDisplayName
  };
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-plugin-actions.jsx"
/*!********************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-plugin-actions.jsx ***!
  \********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePluginActions: () => (/* binding */ usePluginActions)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../stores/plugins-dashboard */ "./resources/src/jsx/stores/plugins-dashboard/index.jsx");
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * Use plugin actions.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




var usePluginActions = function usePluginActions(modalManager) {
  var openModal = modalManager.openModal,
    closeModal = modalManager.closeModal,
    MODAL_TYPES = modalManager.MODAL_TYPES;
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__.store),
    installFreePlugin = _useDispatch.installFreePlugin,
    installProPlugin = _useDispatch.installProPlugin,
    uninstallPlugin = _useDispatch.uninstallPlugin,
    activatePlugin = _useDispatch.activatePlugin,
    deactivatePlugin = _useDispatch.deactivatePlugin,
    upgradePluginToPro = _useDispatch.upgradePluginToPro,
    resolveConflict = _useDispatch.resolveConflict,
    deactivateLicense = _useDispatch.deactivateLicense,
    activateLicense = _useDispatch.activateLicense,
    reuseLicenseForAllPlugins = _useDispatch.reuseLicenseForAllPlugins,
    updatePlugin = _useDispatch.updatePlugin;
  var handleOpenInstallationTypeModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.INSTALLATION_TYPE, pluginFamily);
  }, [openModal, MODAL_TYPES]);
  var handleOpenResolveConflictModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.RESOLVE_CONFLICT, pluginFamily);
  }, [openModal, MODAL_TYPES.RESOLVE_CONFLICT]);
  var handleOpenUpgradeToProModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO, pluginFamily);
  }, [openModal, MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO]);
  var handleOpenUninstallConfirmationModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.UNINSTALL_CONFIRMATION, pluginFamily);
  }, [openModal, MODAL_TYPES.UNINSTALL_CONFIRMATION]);
  var handleOpenLicenseManagementModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.LICENSE_MANAGEMENT, pluginFamily);
  }, [openModal, MODAL_TYPES.LICENSE_MANAGEMENT]);
  var handleOpenLicenseInputForInstallingProModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO, pluginFamily);
  }, [openModal, MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO]);
  var handleOpenLicenseInputForActivatingLicenseModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE, pluginFamily);
  }, [openModal, MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE]);
  var handleActivatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    activatePlugin(pluginFamily.slug);
  }, [activatePlugin]);
  var handleDeactivatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    openModal(MODAL_TYPES.DEACTIVATE_CONFIRMATION, pluginFamily);
  }, [openModal, MODAL_TYPES.DEACTIVATE_CONFIRMATION]);
  var handleConfirmDeactivatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(pluginFamily) {
      var result;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return deactivatePlugin(pluginFamily.slug);
          case 1:
            result = _context.v;
            if (result.success && !result.error) {
              closeModal();
            }
            return _context.a(2, result);
        }
      }, _callee);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }(), [deactivatePlugin, closeModal]);
  var handleDeactivateLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(pluginFamily) {
      var result;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            _context2.n = 1;
            return deactivateLicense(pluginFamily);
          case 1:
            result = _context2.v;
            if (result.success && !result.error) {
              closeModal();
            }
            return _context2.a(2, result);
        }
      }, _callee2);
    }));
    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }(), [deactivateLicense]);
  var handleActivateLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(pluginFamily, licenseKey) {
      var applyToAll,
        result,
        _args3 = arguments;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            applyToAll = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;
            _context3.n = 1;
            return activateLicense(pluginFamily, licenseKey, applyToAll);
          case 1:
            result = _context3.v;
            if (result.success && !result.error) {
              closeModal();
            }
            return _context3.a(2, result);
        }
      }, _callee3);
    }));
    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }(), [activateLicense, closeModal]);
  var handleReuseLicenseForAllPlugins = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(pluginFamily) {
      var result;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return reuseLicenseForAllPlugins(pluginFamily);
          case 1:
            result = _context4.v;
            if (result.success && !result.error) {
              closeModal();
            }
            return _context4.a(2, result);
        }
      }, _callee4);
    }));
    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }(), [reuseLicenseForAllPlugins, closeModal]);

  // Modal-specific actions
  var handleInstallFree = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginSlug) {
    installFreePlugin(pluginSlug);
    closeModal();
  }, [installFreePlugin, closeModal]);
  var handleInstallPro = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(pluginSlug, licenseKey) {
      var applyToAll,
        useExistingLicense,
        result,
        _args5 = arguments;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            applyToAll = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : false;
            useExistingLicense = _args5.length > 3 && _args5[3] !== undefined ? _args5[3] : false;
            _context5.n = 1;
            return installProPlugin(pluginSlug, licenseKey, applyToAll, useExistingLicense);
          case 1:
            result = _context5.v;
            if (result.success && !result.error) {
              closeModal();
            }
            return _context5.a(2, result);
        }
      }, _callee5);
    }));
    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }(), [installProPlugin, closeModal]);
  var handleUpgradePluginToPro = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(pluginSlug, licenseKey) {
      var applyToAll,
        useExistingLicense,
        result,
        _args6 = arguments;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            applyToAll = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : false;
            useExistingLicense = _args6.length > 3 && _args6[3] !== undefined ? _args6[3] : false;
            _context6.n = 1;
            return upgradePluginToPro(pluginSlug, licenseKey, applyToAll, useExistingLicense);
          case 1:
            result = _context6.v;
            if (result.success && !result.error) {
              closeModal();
            }
            return _context6.a(2, result);
        }
      }, _callee6);
    }));
    return function (_x8, _x9) {
      return _ref6.apply(this, arguments);
    };
  }(), [upgradePluginToPro, closeModal]);
  var handleUninstallPlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginSlug) {
    uninstallPlugin(pluginSlug);
    closeModal();
  }, [uninstallPlugin, closeModal]);
  var handleResolveConflictAction = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(plugin, type) {
      var result;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return resolveConflict(plugin, type);
          case 1:
            result = _context7.v;
            if (result.success) {
              closeModal();
            }
            return _context7.a(2, result);
        }
      }, _callee7);
    }));
    return function (_x0, _x1) {
      return _ref7.apply(this, arguments);
    };
  }(), [resolveConflict, closeModal]);
  var handleBuyPlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (detailsUrl) {
    window.open(detailsUrl, '_blank');
    closeModal();
  }, [closeModal]);
  var handleUpdatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(/*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(pluginFamily) {
      var pluginFamilySlug, result;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            pluginFamilySlug = typeof pluginFamily === 'string' ? pluginFamily : pluginFamily.slug;
            _context8.n = 1;
            return updatePlugin(pluginFamilySlug);
          case 1:
            result = _context8.v;
            if (result.success && !result.error) {
              closeModal();
            }
            return _context8.a(2, result);
        }
      }, _callee8);
    }));
    return function (_x10) {
      return _ref8.apply(this, arguments);
    };
  }(), [updatePlugin, closeModal]);
  return {
    // Primary actions
    handleOpenInstallationTypeModal: handleOpenInstallationTypeModal,
    handleOpenResolveConflictModal: handleOpenResolveConflictModal,
    handleActivatePlugin: handleActivatePlugin,
    handleDeactivatePlugin: handleDeactivatePlugin,
    handleConfirmDeactivatePlugin: handleConfirmDeactivatePlugin,
    handleOpenUpgradeToProModal: handleOpenUpgradeToProModal,
    handleOpenUninstallConfirmationModal: handleOpenUninstallConfirmationModal,
    handleOpenLicenseManagementModal: handleOpenLicenseManagementModal,
    handleOpenLicenseInputForInstallingProModal: handleOpenLicenseInputForInstallingProModal,
    handleOpenLicenseInputForActivatingLicenseModal: handleOpenLicenseInputForActivatingLicenseModal,
    handleDeactivateLicense: handleDeactivateLicense,
    handleActivateLicense: handleActivateLicense,
    handleReuseLicenseForAllPlugins: handleReuseLicenseForAllPlugins,
    // Modal-specific actions
    handleInstallFree: handleInstallFree,
    handleInstallPro: handleInstallPro,
    handleUpgradePluginToPro: handleUpgradePluginToPro,
    handleUninstallPlugin: handleUninstallPlugin,
    handleResolveConflictAction: handleResolveConflictAction,
    handleBuyPlugin: handleBuyPlugin,
    handleUpdatePlugin: handleUpdatePlugin
  };
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-plugin-display-info.jsx"
/*!*************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-plugin-display-info.jsx ***!
  \*************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePluginDisplayInfo: () => (/* binding */ usePluginDisplayInfo)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Use plugin display info.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


var usePluginDisplayInfo = function usePluginDisplayInfo(pluginFamily, pluginIconBaseUrl, status) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var isPro = status.isPro,
      isInstalled = status.isInstalled;
    var iconSrc = "".concat(pluginIconBaseUrl, "images/plugin-icons/").concat(pluginFamily.iconPath, "-96x96.png");
    var displayName = isInstalled ? isPro ? pluginFamily.proPlugin.name : pluginFamily.freePlugin.name : pluginFamily.name;
    return {
      iconSrc: iconSrc,
      displayName: displayName
    };
  }, [pluginFamily, pluginIconBaseUrl, status.isPro, status.isInstalled]);
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-plugin-status.jsx"
/*!*******************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-plugin-status.jsx ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   usePluginStatus: () => (/* binding */ usePluginStatus)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Use plugin status.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




var usePluginStatus = function usePluginStatus(pluginFamily) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var isActive = pluginFamily.hasAnyVersionActive;
    var isInstalled = pluginFamily.hasAnyVersionInstalled;
    var isLicensed = pluginFamily.isLicensed;
    var isPro = pluginFamily.proPlugin.isInstalled;
    var hasConflictingInstallations = pluginFamily.hasConflictingInstallations;
    var statusFlagClass = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'active': isActive,
      'inactive': !isActive,
      'pro': isPro,
      'free': !isPro,
      'licensed': isLicensed,
      'unlicensed': !isLicensed,
      'installed': isInstalled,
      'not-installed': !isInstalled
    });
    var tooltipText = function () {
      if (!isInstalled) {
        return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is not installed.', 'publishpress-hub');
      }
      return isActive ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is active.', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is not active.', 'publishpress-hub');
    }();
    return {
      isActive: isActive,
      isInstalled: isInstalled,
      isLicensed: isLicensed,
      isPro: isPro,
      hasConflictingInstallations: hasConflictingInstallations,
      statusFlagClass: statusFlagClass,
      tooltipText: tooltipText
    };
  }, [pluginFamily]);
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-screen-size.jsx"
/*!*****************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-screen-size.jsx ***!
  \*****************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useScreenSize: () => (/* binding */ useScreenSize)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Use screen size.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


var useScreenSize = function useScreenSize() {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth <= 768,
      isSmallMobile: window.innerWidth <= 480
    }),
    _useState2 = _slicedToArray(_useState, 2),
    screenSize = _useState2[0],
    setScreenSize = _useState2[1];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    var handleResize = function handleResize() {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 768,
        isSmallMobile: window.innerWidth <= 480
      });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  return screenSize;
};

/***/ },

/***/ "./resources/src/jsx/components/plugins-list/index.jsx"
/*!*************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/index.jsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PluginsList: () => (/* binding */ PluginsList)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_use_dashboard_preferences__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/use-dashboard-preferences */ "./resources/src/jsx/components/plugins-list/hooks/use-dashboard-preferences.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../stores/plugins-dashboard */ "./resources/src/jsx/stores/plugins-dashboard/index.jsx");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components */ "./resources/src/jsx/components/plugins-list/components/index.jsx");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./hooks */ "./resources/src/jsx/components/plugins-list/hooks/index.jsx");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Plugins list.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */










// Postponed until the dashboard grouping is reviewed for a later release (#264).
var groupingEnabled = false;

// Split selectors for better performance
var selectProgressStates = function selectProgressStates(select) {
  var storeSelect = select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store);
  return {
    pluginInstallationInProgress: storeSelect.getPluginInstallationInProgress(),
    pluginUninstallationInProgress: storeSelect.getPluginUninstallationInProgress(),
    pluginDeactivationInProgress: storeSelect.getPluginDeactivationInProgress(),
    pluginActivationInProgress: storeSelect.getPluginActivationInProgress(),
    pluginUpgradeInProgress: storeSelect.getPluginUpgradeInProgress(),
    pluginUpdateInProgress: storeSelect.getPluginUpdateInProgress(),
    pluginResolveConflictInProgress: storeSelect.getPluginResolveConflictInProgress(),
    pluginLicenseActivationInProgress: storeSelect.getPluginLicenseActivationInProgress(),
    pluginLicenseDeactivationInProgress: storeSelect.getPluginLicenseDeactivationInProgress()
  };
};
var selectModalStates = function selectModalStates(select) {
  var storeSelect = select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store);
  return {
    selectedPluginForConflictResolution: storeSelect.getSelectedPluginForConflictResolution(),
    pluginError: storeSelect.getPluginError()
  };
};
var PluginsListComponent = function PluginsListComponent(_ref) {
  var plugins = _ref.plugins,
    pluginIconBaseUrl = _ref.pluginIconBaseUrl,
    isLoading = _ref.isLoading;
  var modalManager = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__.useModalManager)();
  var _useDashboardPreferen = (0,_hooks_use_dashboard_preferences__WEBPACK_IMPORTED_MODULE_2__.useDashboardPreferences)(),
    preferences = _useDashboardPreferen.preferences,
    updatePreferences = _useDashboardPreferen.updatePreferences,
    toggleFavorite = _useDashboardPreferen.toggleFavorite;
  var grouped = groupingEnabled && preferences.grouped;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    favoritesOnly = _useState2[0],
    setFavoritesOnly = _useState2[1];
  var pluginActions = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__.usePluginActions)(modalManager);
  var progressStates = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(selectProgressStates, []);
  var modalStates = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(selectModalStates, []);
  var pluginInstallationInProgress = progressStates.pluginInstallationInProgress,
    pluginUninstallationInProgress = progressStates.pluginUninstallationInProgress,
    pluginDeactivationInProgress = progressStates.pluginDeactivationInProgress,
    pluginActivationInProgress = progressStates.pluginActivationInProgress,
    pluginUpgradeInProgress = progressStates.pluginUpgradeInProgress,
    pluginUpdateInProgress = progressStates.pluginUpdateInProgress,
    pluginResolveConflictInProgress = progressStates.pluginResolveConflictInProgress,
    pluginLicenseActivationInProgress = progressStates.pluginLicenseActivationInProgress,
    pluginLicenseDeactivationInProgress = progressStates.pluginLicenseDeactivationInProgress;
  var selectedPluginForConflictResolution = modalStates.selectedPluginForConflictResolution,
    pluginError = modalStates.pluginError;
  var currentPluginState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var currentPluginFamily = modalManager.currentPluginFamily,
      currentPluginDisplayName = modalManager.currentPluginDisplayName;
    if (!currentPluginFamily) return {
      error: null,
      inProgress: false
    };
    var slug = currentPluginFamily.slug;
    return {
      pluginDisplayName: currentPluginDisplayName,
      error: pluginError[slug] || null,
      inProgress: Boolean(pluginInstallationInProgress[slug] || pluginUninstallationInProgress[slug] || pluginDeactivationInProgress[slug] || pluginActivationInProgress[slug] || pluginUpgradeInProgress[slug] || pluginUpdateInProgress[slug] || pluginResolveConflictInProgress[slug] || pluginLicenseActivationInProgress[slug] || pluginLicenseDeactivationInProgress[slug])
    };
  }, [modalManager, pluginError, progressStates]);

  // Memoize the plugin item renderer to prevent recreation
  var renderPluginItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (pluginFamily) {
    var slug = pluginFamily.slug;

    // Create progress states object for this plugin
    var pluginProgressStates = {
      isInstalling: pluginInstallationInProgress[slug] || false,
      isUninstalling: pluginUninstallationInProgress[slug] || false,
      isDeactivating: pluginDeactivationInProgress[slug] || false,
      isActivating: pluginActivationInProgress[slug] || false,
      isUpgrading: pluginUpgradeInProgress[slug] || false,
      isUpdating: pluginUpdateInProgress[slug] || false,
      isResolvingConflict: pluginResolveConflictInProgress[slug] || false,
      isActivatingLicense: pluginLicenseActivationInProgress[slug] || false,
      isDeactivatingLicense: pluginLicenseDeactivationInProgress[slug] || false
    };
    return /*#__PURE__*/React.createElement(_components__WEBPACK_IMPORTED_MODULE_6__.PluginItem, {
      key: "plugin-".concat(slug),
      pluginFamily: pluginFamily,
      layout: preferences.layout,
      isFavorite: preferences.favorites.includes(slug),
      onToggleFavorite: toggleFavorite,
      pluginIconBaseUrl: pluginIconBaseUrl,
      progressStates: pluginProgressStates,
      onInstall: pluginActions.handleOpenInstallationTypeModal,
      onResolveConflict: pluginActions.handleOpenResolveConflictModal,
      onActivate: pluginActions.handleActivatePlugin,
      onDeactivate: pluginActions.handleDeactivatePlugin,
      onUpgradeToPro: pluginActions.handleOpenUpgradeToProModal,
      onManageLicense: pluginActions.handleOpenLicenseManagementModal,
      onActivateLicense: pluginActions.handleOpenLicenseInputForActivatingLicenseModal,
      onUninstall: pluginActions.handleOpenUninstallConfirmationModal,
      onDeactivateLicense: pluginActions.handleDeactivateLicense,
      onUpdate: pluginActions.handleUpdatePlugin
    });
  }, [pluginIconBaseUrl, preferences.favorites, preferences.layout, toggleFavorite, pluginInstallationInProgress, pluginUninstallationInProgress, pluginDeactivationInProgress, pluginActivationInProgress, pluginUpgradeInProgress, pluginUpdateInProgress, pluginResolveConflictInProgress, pluginLicenseActivationInProgress, pluginLicenseDeactivationInProgress, pluginActions]);
  var visiblePlugins = favoritesOnly ? plugins.filter(function (plugin) {
    return preferences.favorites.includes(plugin.slug);
  }) : plugins;
  var groups = grouped ? [{
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Editorial process', 'publishpress-hub'),
    slugs: ['planner', 'checklists', 'statuses', 'revisions']
  }, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Additional publishing tools', 'publishpress-hub'),
    slugs: ['permissions', 'capabilities', 'authors', 'blocks', 'future', 'series', 'shortlinks', 'cart', 'taxonomies', 'tag-groups']
  }] : [];
  if (grouped) {
    var knownSlugs = groups.flatMap(function (group) {
      return group.slugs;
    });
    groups.push({
      title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Other plugins', 'publishpress-hub'),
      slugs: visiblePlugins.filter(function (plugin) {
        return !knownSlugs.includes(plugin.slug);
      }).map(function (plugin) {
        return plugin.slug;
      })
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-view-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-layout-switch",
    role: "group",
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Plugin layout', 'publishpress-hub')
  }, ['list', 'cards'].map(function (layout) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: layout,
      "aria-pressed": preferences.layout === layout,
      onClick: function onClick() {
        return updatePreferences({
          layout: layout
        });
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "dashicons dashicons-".concat(layout === 'cards' ? 'grid-view' : 'list-view'),
      "aria-hidden": "true"
    }), layout === 'cards' ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cards', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('List', 'publishpress-hub'));
  })), groupingEnabled && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Group by purpose', 'publishpress-hub'),
    checked: preferences.grouped,
    onChange: function onChange(grouped) {
      return updatePreferences({
        grouped: grouped
      });
    }
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Favorites only', 'publishpress-hub'),
    checked: favoritesOnly,
    onChange: setFavoritesOnly
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list pp-hub-view-".concat(preferences.layout),
    "aria-busy": isLoading && plugins.length > 0 || undefined
  }, grouped ? groups.map(function (group) {
    var members = group.slugs.map(function (slug) {
      return visiblePlugins.find(function (plugin) {
        return plugin.slug === slug;
      });
    }).filter(Boolean);
    return members.length > 0 && /*#__PURE__*/React.createElement("section", {
      className: "pp-hub-plugin-group",
      key: group.title
    }, /*#__PURE__*/React.createElement("h2", null, group.title), /*#__PURE__*/React.createElement("div", {
      className: "pp-hub-plugin-group-items"
    }, members.map(renderPluginItem)));
  }) : visiblePlugins.map(renderPluginItem), visiblePlugins.length === 0 && !isLoading && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-message",
    role: "status",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('No plugins found.', 'publishpress-hub'))), isLoading && plugins.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-list-message",
    role: "status",
    "aria-live": "polite"
  }, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Loading plugins...', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_components__WEBPACK_IMPORTED_MODULE_6__.ModalRenderer, {
    modalManager: modalManager,
    pluginActions: pluginActions,
    currentPluginState: currentPluginState,
    selectedPluginForConflictResolution: selectedPluginForConflictResolution,
    pluginResolveConflictInProgress: pluginResolveConflictInProgress
  })));
};
var PluginsList = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(PluginsListComponent);

/***/ },

/***/ "./resources/src/jsx/components/tooltip/index.jsx"
/*!********************************************************!*\
  !*** ./resources/src/jsx/components/tooltip/index.jsx ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/**
 * Tooltip.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\tooltip
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */



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

/***/ },

/***/ "./resources/src/jsx/stores/plugins-dashboard/actions.jsx"
/*!****************************************************************!*\
  !*** ./resources/src/jsx/stores/plugins-dashboard/actions.jsx ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   activateLicense: () => (/* binding */ activateLicense),
/* harmony export */   activatePlugin: () => (/* binding */ activatePlugin),
/* harmony export */   cleanupError: () => (/* binding */ cleanupError),
/* harmony export */   deactivateLicense: () => (/* binding */ deactivateLicense),
/* harmony export */   deactivatePlugin: () => (/* binding */ deactivatePlugin),
/* harmony export */   dismissLicenseNotice: () => (/* binding */ dismissLicenseNotice),
/* harmony export */   fetchLicenseNoticeDismissalStatus: () => (/* binding */ fetchLicenseNoticeDismissalStatus),
/* harmony export */   fetchPlugins: () => (/* binding */ fetchPlugins),
/* harmony export */   installFreePlugin: () => (/* binding */ installFreePlugin),
/* harmony export */   installProPlugin: () => (/* binding */ installProPlugin),
/* harmony export */   resolveConflict: () => (/* binding */ resolveConflict),
/* harmony export */   reuseLicenseForAllPlugins: () => (/* binding */ reuseLicenseForAllPlugins),
/* harmony export */   setCurrentFilter: () => (/* binding */ setCurrentFilter),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setInstallationTypeModalOpen: () => (/* binding */ setInstallationTypeModalOpen),
/* harmony export */   setIsResolveConflictModalOpen: () => (/* binding */ setIsResolveConflictModalOpen),
/* harmony export */   setIsUninstallConfirmationModalOpen: () => (/* binding */ setIsUninstallConfirmationModalOpen),
/* harmony export */   setIsUpgradeModalOpen: () => (/* binding */ setIsUpgradeModalOpen),
/* harmony export */   setLicenseInputModalOpen: () => (/* binding */ setLicenseInputModalOpen),
/* harmony export */   setLicenseInputModalOpenForUpgrade: () => (/* binding */ setLicenseInputModalOpenForUpgrade),
/* harmony export */   setLoading: () => (/* binding */ setLoading),
/* harmony export */   setPlugins: () => (/* binding */ setPlugins),
/* harmony export */   setSelectedFilter: () => (/* binding */ setSelectedFilter),
/* harmony export */   uninstallPlugin: () => (/* binding */ uninstallPlugin),
/* harmony export */   updatePlugin: () => (/* binding */ updatePlugin),
/* harmony export */   upgradePluginToPro: () => (/* binding */ upgradePluginToPro)
/* harmony export */ });
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data-controls */ "@wordpress/data-controls");
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_apiReady__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/apiReady */ "./resources/src/jsx/utils/apiReady.js");
/* harmony import */ var _name__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./name */ "./resources/src/jsx/stores/plugins-dashboard/name.jsx");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
var _marked = /*#__PURE__*/_regenerator().m(getPluginName),
  _marked2 = /*#__PURE__*/_regenerator().m(setSelectedFilter),
  _marked3 = /*#__PURE__*/_regenerator().m(setPlugins),
  _marked4 = /*#__PURE__*/_regenerator().m(setLoading),
  _marked5 = /*#__PURE__*/_regenerator().m(setError),
  _marked6 = /*#__PURE__*/_regenerator().m(setCurrentFilter),
  _marked7 = /*#__PURE__*/_regenerator().m(setLicenseInputModalOpen),
  _marked8 = /*#__PURE__*/_regenerator().m(setLicenseInputModalOpenForUpgrade),
  _marked9 = /*#__PURE__*/_regenerator().m(setInstallationTypeModalOpen),
  _marked0 = /*#__PURE__*/_regenerator().m(setIsUninstallConfirmationModalOpen),
  _marked1 = /*#__PURE__*/_regenerator().m(setIsUpgradeModalOpen),
  _marked10 = /*#__PURE__*/_regenerator().m(setIsResolveConflictModalOpen),
  _marked11 = /*#__PURE__*/_regenerator().m(installFreePlugin),
  _marked12 = /*#__PURE__*/_regenerator().m(uninstallPlugin),
  _marked13 = /*#__PURE__*/_regenerator().m(resolveConflict),
  _marked14 = /*#__PURE__*/_regenerator().m(deactivateLicense),
  _marked15 = /*#__PURE__*/_regenerator().m(reuseLicenseForAllPlugins),
  _marked16 = /*#__PURE__*/_regenerator().m(updatePlugin),
  _marked17 = /*#__PURE__*/_regenerator().m(cleanupError),
  _marked18 = /*#__PURE__*/_regenerator().m(dismissLicenseNotice),
  _marked19 = /*#__PURE__*/_regenerator().m(fetchLicenseNoticeDismissalStatus);
/**
 * Plugins dashboard actions.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






var API_NAMESPACE = '/publishpress-hub/v1';
var _dispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/notices'),
  createSuccessNotice = _dispatch.createSuccessNotice,
  createErrorNotice = _dispatch.createErrorNotice;

// Track the current fetch abort controller to cancel pending requests
var currentFetchController = null;
var createNotice = function createNotice(message, type) {
  if (type === 'success') {
    createSuccessNotice(message, {
      isDismissible: true
    });
    return;
  }
  createErrorNotice(message, {
    isDismissible: true
  });
};
var createSnackbarNotice = function createSnackbarNotice(message, type) {
  if (type === 'success') {
    createSuccessNotice(message, {
      type: 'snackbar',
      isDismissible: true
    });
    return;
  }
  createErrorNotice(message, {
    type: 'snackbar',
    isDismissible: true
  });
};

/**
 * Gets the plugin name from the plugin family slug.
 *
 * @param {string} pluginFamilySlug The plugin family slug.
 * @return {string} The plugin name or fallback to slug.
 */
function getPluginName(pluginFamilySlug) {
  var plugins, pluginFamily;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.select)(_name__WEBPACK_IMPORTED_MODULE_4__.STORE_NAME, 'getPlugins');
      case 1:
        plugins = _context.v;
        pluginFamily = plugins.find(function (plugin) {
          return plugin.slug === pluginFamilySlug;
        });
        if (pluginFamily) {
          _context.n = 2;
          break;
        }
        return _context.a(2, pluginFamilySlug);
      case 2:
        if (!pluginFamily.hasAnyVersionInstalled) {
          _context.n = 4;
          break;
        }
        if (!pluginFamily.proPlugin.isInstalled) {
          _context.n = 3;
          break;
        }
        return _context.a(2, pluginFamily.proPlugin.name);
      case 3:
        if (!pluginFamily.freePlugin.isInstalled) {
          _context.n = 4;
          break;
        }
        return _context.a(2, pluginFamily.freePlugin.name);
      case 4:
        return _context.a(2, pluginFamily.name || pluginFamilySlug);
    }
  }, _marked);
}
function setSelectedFilter(selectedFilter) {
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _context2.n = 1;
        return {
          type: 'SET_SELECTED_FILTER',
          selectedFilter: selectedFilter
        };
      case 1:
        return _context2.a(2);
    }
  }, _marked2);
}
function setPlugins(plugins) {
  return _regenerator().w(function (_context3) {
    while (1) switch (_context3.n) {
      case 0:
        _context3.n = 1;
        return {
          type: 'SET_PLUGINS',
          plugins: plugins
        };
      case 1:
        return _context3.a(2);
    }
  }, _marked3);
}
function setLoading(isLoading) {
  return _regenerator().w(function (_context4) {
    while (1) switch (_context4.n) {
      case 0:
        _context4.n = 1;
        return {
          type: 'SET_LOADING',
          isLoading: isLoading
        };
      case 1:
        return _context4.a(2);
    }
  }, _marked4);
}
function setError(error) {
  return _regenerator().w(function (_context5) {
    while (1) switch (_context5.n) {
      case 0:
        _context5.n = 1;
        return {
          type: 'SET_ERROR',
          error: error
        };
      case 1:
        return _context5.a(2);
    }
  }, _marked5);
}
function setCurrentFilter(currentFilter) {
  return _regenerator().w(function (_context6) {
    while (1) switch (_context6.n) {
      case 0:
        _context6.n = 1;
        return {
          type: 'SET_CURRENT_FILTER',
          currentFilter: currentFilter
        };
      case 1:
        return _context6.a(2);
    }
  }, _marked6);
}
function setLicenseInputModalOpen(isOpen) {
  return _regenerator().w(function (_context7) {
    while (1) switch (_context7.n) {
      case 0:
        _context7.n = 1;
        return {
          type: 'SET_LICENSE_INPUT_MODAL_OPEN',
          isOpen: isOpen
        };
      case 1:
        return _context7.a(2);
    }
  }, _marked7);
}
function setLicenseInputModalOpenForUpgrade(isOpen) {
  return _regenerator().w(function (_context8) {
    while (1) switch (_context8.n) {
      case 0:
        _context8.n = 1;
        return {
          type: 'SET_LICENSE_INPUT_MODAL_OPEN_FOR_UPGRADE',
          isOpen: isOpen
        };
      case 1:
        return _context8.a(2);
    }
  }, _marked8);
}
function setInstallationTypeModalOpen(isOpen) {
  return _regenerator().w(function (_context9) {
    while (1) switch (_context9.n) {
      case 0:
        _context9.n = 1;
        return {
          type: 'SET_INSTALLATION_TYPE_MODAL_OPEN',
          isOpen: isOpen
        };
      case 1:
        return _context9.a(2);
    }
  }, _marked9);
}
function setIsUninstallConfirmationModalOpen(isOpen) {
  return _regenerator().w(function (_context0) {
    while (1) switch (_context0.n) {
      case 0:
        _context0.n = 1;
        return {
          type: 'SET_IS_UNINSTALL_CONFIRMATION_MODAL_OPEN',
          isOpen: isOpen
        };
      case 1:
        return _context0.a(2);
    }
  }, _marked0);
}
function setIsUpgradeModalOpen(isOpen) {
  return _regenerator().w(function (_context1) {
    while (1) switch (_context1.n) {
      case 0:
        _context1.n = 1;
        return {
          type: 'SET_IS_UPGRADE_MODAL_OPEN',
          isOpen: isOpen
        };
      case 1:
        return _context1.a(2);
    }
  }, _marked1);
}
function setIsResolveConflictModalOpen(isOpen) {
  return _regenerator().w(function (_context10) {
    while (1) switch (_context10.n) {
      case 0:
        _context10.n = 1;
        return {
          type: 'SET_IS_RESOLVE_CONFLICT_MODAL_OPEN',
          isOpen: isOpen
        };
      case 1:
        return _context10.a(2);
    }
  }, _marked10);
}
function fetchPlugins() {
  var forceCheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var showError = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return /*#__PURE__*/_regenerator().m(function _callee() {
    var signal, path, data, errorMessage, _t;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.p = _context11.n) {
        case 0:
          _context11.p = 0;
          // Cancel any pending fetch request
          if (currentFetchController) {
            currentFetchController.abort();
          }

          // Create new abort controller for this request
          currentFetchController = new AbortController();
          signal = currentFetchController.signal;
          _context11.n = 1;
          return {
            type: 'FETCH_PLUGINS_START'
          };
        case 1:
          _context11.n = 2;
          return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
        case 2:
          path = forceCheck ? "".concat(API_NAMESPACE, "/plugins?force-check=1") : "".concat(API_NAMESPACE, "/plugins");
          _context11.n = 3;
          return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
            path: path,
            signal: signal
          });
        case 3:
          data = _context11.v;
          // Clear the controller after successful fetch
          currentFetchController = null;
          if (!data.success) {
            _context11.n = 5;
            break;
          }
          _context11.n = 4;
          return {
            type: 'FETCH_PLUGINS_SUCCESS',
            data: data.plugins
          };
        case 4:
          return _context11.a(2, {
            success: true,
            data: data.plugins
          });
        case 5:
          throw new Error(data.error || 'Failed to fetch plugins');
        case 6:
          _context11.n = 12;
          break;
        case 7:
          _context11.p = 7;
          _t = _context11.v;
          // Clear controller on error
          currentFetchController = null;

          // Don't show error for aborted requests
          if (!(_t.name === 'AbortError' || _t.code === 'FETCH_ERROR')) {
            _context11.n = 8;
            break;
          }
          return _context11.a(2, {
            success: false,
            aborted: true
          });
        case 8:
          if (showError) {
            _context11.n = 9;
            break;
          }
          _t = handleErrorMessageOnContext(_t);
          return _context11.a(2, {
            success: false,
            error: _t
          });
        case 9:
          _context11.n = 10;
          return {
            type: 'FETCH_PLUGINS_ERROR',
            error: _t
          };
        case 10:
          errorMessage = getErrorMessage(_t, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to fetch plugins', 'publishpress-hub'));
          _context11.n = 11;
          return createNotice(errorMessage, 'error');
        case 11:
          _t = handleErrorMessageOnContext(_t);
          return _context11.a(2, {
            success: false,
            error: _t
          });
        case 12:
          return _context11.a(2);
      }
    }, _callee, null, [[0, 7]]);
  })();
}
function installFreePlugin(pluginFamilySlug) {
  var data, pluginName, _pluginName, _t2;
  return _regenerator().w(function (_context12) {
    while (1) switch (_context12.p = _context12.n) {
      case 0:
        _context12.p = 0;
        _context12.n = 1;
        return {
          type: 'INSTALL_PLUGIN_START',
          data: {
            pluginFamilySlug: pluginFamilySlug
          }
        };
      case 1:
        _context12.n = 2;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 2:
        _context12.n = 3;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamilySlug, "/install/free"),
          method: 'POST'
        });
      case 3:
        data = _context12.v;
        if (!data.success) {
          _context12.n = 9;
          break;
        }
        return _context12.d(_regeneratorValues(activatePlugin(pluginFamilySlug, true, true)), 4);
      case 4:
        _context12.n = 5;
        return fetchPlugins();
      case 5:
        _context12.n = 6;
        return {
          type: 'INSTALL_PLUGIN_SUCCESS',
          data: {
            pluginFamilySlug: pluginFamilySlug
          }
        };
      case 6:
        return _context12.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 7);
      case 7:
        pluginName = _context12.v;
        _context12.n = 8;
        return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installed successfully', 'publishpress-hub'), pluginName), 'success');
      case 8:
        return _context12.a(2, {
          success: true,
          pluginFamilySlug: pluginFamilySlug,
          apiResponse: data
        });
      case 9:
        throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Plugin installation failed');
      case 10:
        _context12.n = 15;
        break;
      case 11:
        _context12.p = 11;
        _t2 = _context12.v;
        _context12.n = 12;
        return {
          type: 'INSTALL_PLUGIN_ERROR',
          data: {
            pluginFamilySlug: pluginFamilySlug,
            error: _t2
          }
        };
      case 12:
        return _context12.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 13);
      case 13:
        _pluginName = _context12.v;
        _context12.n = 14;
        return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installation failed', 'publishpress-hub'), _pluginName), 'error');
      case 14:
        _t2 = handleErrorMessageOnContext(_t2);
        return _context12.a(2, {
          success: false,
          pluginFamilySlug: pluginFamilySlug,
          error: _t2
        });
      case 15:
        return _context12.a(2);
    }
  }, _marked11, null, [[0, 11]]);
}
function installProPlugin(pluginFamilySlug, licenseKey) {
  var applyToAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var useExistingLicense = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return /*#__PURE__*/_regenerator().m(function _callee2() {
    var data, pluginName, _pluginName2, _t3;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.p = _context13.n) {
        case 0:
          _context13.p = 0;
          _context13.n = 1;
          return {
            type: 'INSTALL_PLUGIN_START',
            data: {
              pluginFamilySlug: pluginFamilySlug
            }
          };
        case 1:
          _context13.n = 2;
          return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
        case 2:
          licenseKey = licenseKey.trim();
          _context13.n = 3;
          return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
            path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamilySlug, "/install/pro"),
            method: 'POST',
            data: {
              licenseKey: licenseKey,
              applyToAll: applyToAll,
              useExistingLicense: useExistingLicense
            }
          });
        case 3:
          data = _context13.v;
          if (!data.success) {
            _context13.n = 9;
            break;
          }
          return _context13.d(_regeneratorValues(activatePlugin(pluginFamilySlug, true, true)), 4);
        case 4:
          _context13.n = 5;
          return fetchPlugins();
        case 5:
          _context13.n = 6;
          return {
            type: 'INSTALL_PLUGIN_SUCCESS',
            data: {
              pluginFamilySlug: pluginFamilySlug
            }
          };
        case 6:
          return _context13.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 7);
        case 7:
          pluginName = _context13.v;
          _context13.n = 8;
          return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installed successfully', 'publishpress-hub'), pluginName), 'success');
        case 8:
          return _context13.a(2, {
            success: true,
            pluginFamilySlug: pluginFamilySlug,
            licenseKey: licenseKey,
            apiResponse: data
          });
        case 9:
          throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Plugin installation failed');
        case 10:
          _context13.n = 15;
          break;
        case 11:
          _context13.p = 11;
          _t3 = _context13.v;
          _context13.n = 12;
          return {
            type: 'INSTALL_PLUGIN_ERROR',
            data: {
              pluginFamilySlug: pluginFamilySlug,
              error: _t3
            }
          };
        case 12:
          return _context13.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 13);
        case 13:
          _pluginName2 = _context13.v;
          _context13.n = 14;
          return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installation failed', 'publishpress-hub'), _pluginName2), 'error');
        case 14:
          _t3 = handleErrorMessageOnContext(_t3);
          return _context13.a(2, {
            success: false,
            pluginFamilySlug: pluginFamilySlug,
            licenseKey: licenseKey,
            error: _t3
          });
        case 15:
          return _context13.a(2);
      }
    }, _callee2, null, [[0, 11]]);
  })();
}
function uninstallPlugin(pluginFamilySlug) {
  var pluginName, data, _t4;
  return _regenerator().w(function (_context14) {
    while (1) switch (_context14.p = _context14.n) {
      case 0:
        return _context14.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 1);
      case 1:
        pluginName = _context14.v;
        _context14.p = 2;
        _context14.n = 3;
        return {
          type: 'UNINSTALL_PLUGIN_START',
          data: {
            pluginFamilySlug: pluginFamilySlug
          }
        };
      case 3:
        _context14.n = 4;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 4:
        _context14.n = 5;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamilySlug, "/uninstall"),
          method: 'POST'
        });
      case 5:
        data = _context14.v;
        if (!data.success) {
          _context14.n = 9;
          break;
        }
        _context14.n = 6;
        return fetchPlugins();
      case 6:
        _context14.n = 7;
        return {
          type: 'UNINSTALL_PLUGIN_SUCCESS',
          data: {
            pluginFamilySlug: pluginFamilySlug
          }
        };
      case 7:
        _context14.n = 8;
        return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s uninstalled successfully', 'publishpress-hub'), pluginName), 'success');
      case 8:
        return _context14.a(2, {
          success: true,
          pluginFamilySlug: pluginFamilySlug,
          apiResponse: data
        });
      case 9:
        throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Plugin uninstall failed');
      case 10:
        _context14.n = 14;
        break;
      case 11:
        _context14.p = 11;
        _t4 = _context14.v;
        _context14.n = 12;
        return {
          type: 'UNINSTALL_PLUGIN_ERROR',
          data: {
            pluginFamilySlug: pluginFamilySlug,
            error: _t4
          }
        };
      case 12:
        _context14.n = 13;
        return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s uninstall failed', 'publishpress-hub'), pluginName), 'error');
      case 13:
        _t4 = handleErrorMessageOnContext(_t4);
        return _context14.a(2, {
          success: false,
          pluginFamilySlug: pluginFamilySlug,
          error: _t4
        });
      case 14:
        return _context14.a(2);
    }
  }, _marked12, null, [[2, 11]]);
}
function activatePlugin(pluginFamilySlug) {
  var skipRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var skipNotice = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return /*#__PURE__*/_regenerator().m(function _callee3() {
    var data, pluginName, _pluginName3, defaultMessage, errorMessage, _t5;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.p = _context15.n) {
        case 0:
          _context15.p = 0;
          _context15.n = 1;
          return {
            type: 'ACTIVATE_PLUGIN_START',
            data: {
              pluginFamilySlug: pluginFamilySlug
            }
          };
        case 1:
          _context15.n = 2;
          return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
        case 2:
          _context15.n = 3;
          return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
            path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamilySlug, "/activate"),
            method: 'POST'
          });
        case 3:
          data = _context15.v;
          if (!data.success) {
            _context15.n = 8;
            break;
          }
          _context15.n = 4;
          return {
            type: 'ACTIVATE_PLUGIN_SUCCESS',
            data: {
              pluginFamilySlug: pluginFamilySlug,
              slug: data.slug,
              active: data.active
            }
          };
        case 4:
          if (skipRefresh) {
            _context15.n = 5;
            break;
          }
          _context15.n = 5;
          return fetchPlugins();
        case 5:
          if (skipNotice) {
            _context15.n = 7;
            break;
          }
          return _context15.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 6);
        case 6:
          pluginName = _context15.v;
          _context15.n = 7;
          return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s activated successfully', 'publishpress-hub'), pluginName), 'success');
        case 7:
          return _context15.a(2, {
            success: true,
            pluginFamilySlug: pluginFamilySlug,
            apiResponse: data
          });
        case 8:
          throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Plugin activation failed');
        case 9:
          _context15.n = 14;
          break;
        case 10:
          _context15.p = 10;
          _t5 = _context15.v;
          _context15.n = 11;
          return {
            type: 'ACTIVATE_PLUGIN_ERROR',
            data: {
              pluginFamilySlug: pluginFamilySlug,
              error: _t5
            }
          };
        case 11:
          return _context15.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 12);
        case 12:
          _pluginName3 = _context15.v;
          defaultMessage = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s activation failed', 'publishpress-hub'), _pluginName3);
          errorMessage = getErrorMessage(_t5, defaultMessage);
          _context15.n = 13;
          return createNotice(errorMessage, 'error');
        case 13:
          _t5 = handleErrorMessageOnContext(_t5);
          return _context15.a(2, {
            success: false,
            pluginFamilySlug: pluginFamilySlug,
            error: _t5
          });
        case 14:
          return _context15.a(2);
      }
    }, _callee3, null, [[0, 10]]);
  })();
}
function deactivatePlugin(pluginFamilySlug) {
  var skipRefresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return /*#__PURE__*/_regenerator().m(function _callee4() {
    var data, pluginName, _pluginName4, defaultMessage, errorMessage, _t6;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.p = _context16.n) {
        case 0:
          _context16.p = 0;
          _context16.n = 1;
          return {
            type: 'DEACTIVATE_PLUGIN_START',
            data: {
              pluginFamilySlug: pluginFamilySlug
            }
          };
        case 1:
          _context16.n = 2;
          return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
        case 2:
          _context16.n = 3;
          return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
            path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamilySlug, "/deactivate"),
            method: 'POST'
          });
        case 3:
          data = _context16.v;
          if (!data.success) {
            _context16.n = 8;
            break;
          }
          _context16.n = 4;
          return {
            type: 'DEACTIVATE_PLUGIN_SUCCESS',
            data: {
              pluginFamilySlug: pluginFamilySlug,
              slug: data.slug,
              active: data.active
            }
          };
        case 4:
          if (skipRefresh) {
            _context16.n = 5;
            break;
          }
          _context16.n = 5;
          return fetchPlugins();
        case 5:
          return _context16.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 6);
        case 6:
          pluginName = _context16.v;
          _context16.n = 7;
          return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s deactivated successfully', 'publishpress-hub'), pluginName), 'success');
        case 7:
          return _context16.a(2, {
            success: true,
            pluginFamilySlug: pluginFamilySlug,
            apiResponse: data
          });
        case 8:
          throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Plugin deactivation failed');
        case 9:
          _context16.n = 14;
          break;
        case 10:
          _context16.p = 10;
          _t6 = _context16.v;
          _context16.n = 11;
          return {
            type: 'DEACTIVATE_PLUGIN_ERROR',
            data: {
              pluginFamilySlug: pluginFamilySlug,
              error: _t6
            }
          };
        case 11:
          return _context16.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 12);
        case 12:
          _pluginName4 = _context16.v;
          defaultMessage = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s deactivation failed', 'publishpress-hub'), _pluginName4);
          errorMessage = getErrorMessage(_t6, defaultMessage);
          _context16.n = 13;
          return createNotice(errorMessage, 'error');
        case 13:
          _t6 = handleErrorMessageOnContext(_t6);
          return _context16.a(2, {
            success: false,
            pluginFamilySlug: pluginFamilySlug,
            error: _t6
          });
        case 14:
          return _context16.a(2);
      }
    }, _callee4, null, [[0, 10]]);
  })();
}
function upgradePluginToPro(pluginFamilySlug, licenseKey) {
  var applyToAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var useExistingLicense = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return /*#__PURE__*/_regenerator().m(function _callee5() {
    var data, pluginName, _pluginName5, _t7;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.p = _context17.n) {
        case 0:
          _context17.p = 0;
          _context17.n = 1;
          return {
            type: 'UPGRADE_PLUGIN_TO_PRO_START',
            data: {
              pluginFamilySlug: pluginFamilySlug,
              licenseKey: licenseKey
            }
          };
        case 1:
          _context17.n = 2;
          return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
        case 2:
          licenseKey = licenseKey.trim();
          _context17.n = 3;
          return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
            path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamilySlug, "/upgrade"),
            method: 'POST',
            data: {
              licenseKey: licenseKey,
              applyToAll: applyToAll,
              useExistingLicense: useExistingLicense
            }
          });
        case 3:
          data = _context17.v;
          if (!data.success) {
            _context17.n = 9;
            break;
          }
          return _context17.d(_regeneratorValues(activatePlugin(pluginFamilySlug, true, true)), 4);
        case 4:
          _context17.n = 5;
          return fetchPlugins();
        case 5:
          _context17.n = 6;
          return {
            type: 'UPGRADE_PLUGIN_TO_PRO_SUCCESS',
            data: {
              pluginFamilySlug: pluginFamilySlug
            }
          };
        case 6:
          return _context17.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 7);
        case 7:
          pluginName = _context17.v;
          _context17.n = 8;
          return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s upgraded successfully', 'publishpress-hub'), pluginName), 'success');
        case 8:
          return _context17.a(2, {
            success: true,
            pluginFamilySlug: pluginFamilySlug,
            licenseKey: licenseKey,
            apiResponse: data
          });
        case 9:
          throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Plugin upgrade to Pro failed');
        case 10:
          _context17.n = 15;
          break;
        case 11:
          _context17.p = 11;
          _t7 = _context17.v;
          _context17.n = 12;
          return {
            type: 'UPGRADE_PLUGIN_TO_PRO_ERROR',
            data: {
              pluginFamilySlug: pluginFamilySlug,
              error: _t7
            }
          };
        case 12:
          return _context17.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 13);
        case 13:
          _pluginName5 = _context17.v;
          _context17.n = 14;
          return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s upgrade to Pro failed', 'publishpress-hub'), _pluginName5), 'error');
        case 14:
          _t7 = handleErrorMessageOnContext(_t7);
          return _context17.a(2, {
            success: false,
            pluginFamilySlug: pluginFamilySlug,
            licenseKey: licenseKey,
            error: _t7
          });
        case 15:
          return _context17.a(2);
      }
    }, _callee5, null, [[0, 11]]);
  })();
}
function resolveConflict(pluginFamily, pluginToKeep) {
  var validPlugins, validPluginToKeep, data, _data, _t8;
  return _regenerator().w(function (_context18) {
    while (1) switch (_context18.p = _context18.n) {
      case 0:
        _context18.p = 0;
        validPlugins = ['free', 'pro'];
        validPluginToKeep = validPlugins.includes(pluginToKeep) ? pluginToKeep : null;
        if (validPluginToKeep) {
          _context18.n = 1;
          break;
        }
        throw new Error('Invalid plugin to keep');
      case 1:
        _context18.n = 2;
        return {
          type: 'RESOLVE_CONFLICT_START',
          data: {
            pluginFamily: pluginFamily,
            pluginToKeep: pluginToKeep
          }
        };
      case 2:
        _context18.n = 3;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 3:
        _context18.n = 4;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamily.slug, "/resolve-conflict"),
          method: 'POST',
          data: {
            pluginToKeep: pluginToKeep,
            phase: 'activate'
          }
        });
      case 4:
        data = _context18.v;
        if (!(data.success && data.requiresCleanup)) {
          _context18.n = 6;
          break;
        }
        _context18.n = 5;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamily.slug, "/resolve-conflict"),
          method: 'POST',
          data: {
            pluginToKeep: pluginToKeep,
            phase: 'cleanup'
          }
        });
      case 5:
        data = _context18.v;
      case 6:
        if (!data.success) {
          _context18.n = 10;
          break;
        }
        _context18.n = 7;
        return fetchPlugins();
      case 7:
        _context18.n = 8;
        return {
          type: 'RESOLVE_CONFLICT_SUCCESS',
          data: {
            pluginFamily: pluginFamily,
            pluginToKeep: pluginToKeep
          }
        };
      case 8:
        _context18.n = 9;
        return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Conflict resolved successfully for %s', 'publishpress-hub'), pluginFamily.name), 'success');
      case 9:
        return _context18.a(2, {
          success: true,
          pluginFamily: pluginFamily,
          pluginToKeep: pluginToKeep,
          apiResponse: data
        });
      case 10:
        throw new Error(((_data = data) === null || _data === void 0 ? void 0 : _data.error) || 'Failed to resolve conflict');
      case 11:
        _context18.n = 15;
        break;
      case 12:
        _context18.p = 12;
        _t8 = _context18.v;
        _context18.n = 13;
        return {
          type: 'RESOLVE_CONFLICT_ERROR',
          data: {
            pluginFamily: pluginFamily,
            pluginToKeep: pluginToKeep,
            error: _t8
          }
        };
      case 13:
        _context18.n = 14;
        return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to resolve conflict for %s', 'publishpress-hub'), pluginFamily.name), 'error');
      case 14:
        _t8 = handleErrorMessageOnContext(_t8);
        return _context18.a(2, {
          success: false,
          pluginFamily: pluginFamily,
          pluginToKeep: pluginToKeep,
          error: _t8
        });
      case 15:
        return _context18.a(2);
    }
  }, _marked13, null, [[0, 12]]);
}
function deactivateLicense(pluginFamily) {
  var data, _t9;
  return _regenerator().w(function (_context19) {
    while (1) switch (_context19.p = _context19.n) {
      case 0:
        _context19.p = 0;
        _context19.n = 1;
        return {
          type: 'DEACTIVATE_LICENSE_START',
          data: {
            pluginFamily: pluginFamily
          }
        };
      case 1:
        _context19.n = 2;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 2:
        _context19.n = 3;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamily.slug, "/deactivate-license"),
          method: 'POST'
        });
      case 3:
        data = _context19.v;
        if (!data.success) {
          _context19.n = 7;
          break;
        }
        _context19.n = 4;
        return fetchPlugins();
      case 4:
        _context19.n = 5;
        return {
          type: 'DEACTIVATE_LICENSE_SUCCESS',
          data: {
            pluginFamily: pluginFamily
          }
        };
      case 5:
        _context19.n = 6;
        return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license deactivated successfully', 'publishpress-hub'), pluginFamily.name), 'success');
      case 6:
        return _context19.a(2, {
          success: true,
          pluginFamily: pluginFamily,
          apiResponse: data
        });
      case 7:
        throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'License deactivation failed');
      case 8:
        _context19.n = 12;
        break;
      case 9:
        _context19.p = 9;
        _t9 = _context19.v;
        _context19.n = 10;
        return {
          type: 'DEACTIVATE_LICENSE_ERROR',
          data: {
            pluginFamily: pluginFamily,
            error: _t9
          }
        };
      case 10:
        _context19.n = 11;
        return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license deactivation failed', 'publishpress-hub'), pluginFamily.name), 'error');
      case 11:
        _t9 = handleErrorMessageOnContext(_t9);
        return _context19.a(2, {
          success: false,
          pluginFamily: pluginFamily,
          error: _t9
        });
      case 12:
        return _context19.a(2);
    }
  }, _marked14, null, [[0, 9]]);
}
function activateLicense(pluginFamily, licenseKey) {
  var applyToAll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return /*#__PURE__*/_regenerator().m(function _callee6() {
    var data, successMessage, _t0;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.p = _context20.n) {
        case 0:
          _context20.p = 0;
          _context20.n = 1;
          return {
            type: 'ACTIVATE_LICENSE_START',
            data: {
              pluginFamily: pluginFamily,
              licenseKey: licenseKey,
              applyToAll: applyToAll
            }
          };
        case 1:
          _context20.n = 2;
          return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
        case 2:
          _context20.n = 3;
          return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
            path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamily.slug, "/activate-license"),
            method: 'POST',
            data: {
              licenseKey: licenseKey,
              applyToAll: applyToAll
            }
          });
        case 3:
          data = _context20.v;
          if (!data.success) {
            _context20.n = 7;
            break;
          }
          _context20.n = 4;
          return fetchPlugins();
        case 4:
          _context20.n = 5;
          return {
            type: 'ACTIVATE_LICENSE_SUCCESS',
            data: {
              pluginFamily: pluginFamily,
              licenseKey: licenseKey,
              applyToAll: applyToAll
            }
          };
        case 5:
          successMessage = applyToAll ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License activated successfully for all PublishPress plugins', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license activated successfully', 'publishpress-hub'), pluginFamily.name);
          _context20.n = 6;
          return createSnackbarNotice(successMessage, 'success');
        case 6:
          return _context20.a(2, {
            success: true,
            pluginSlug: pluginFamily,
            apiResponse: data
          });
        case 7:
          throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'License activation failed');
        case 8:
          _context20.n = 12;
          break;
        case 9:
          _context20.p = 9;
          _t0 = _context20.v;
          _context20.n = 10;
          return {
            type: 'ACTIVATE_LICENSE_ERROR',
            data: {
              pluginFamily: pluginFamily,
              licenseKey: licenseKey,
              applyToAll: applyToAll,
              error: _t0
            }
          };
        case 10:
          _context20.n = 11;
          return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license activation failed', 'publishpress-hub'), pluginFamily.name), 'error');
        case 11:
          _t0 = handleErrorMessageOnContext(_t0);
          return _context20.a(2, {
            success: false,
            pluginFamily: pluginFamily,
            licenseKey: licenseKey,
            error: _t0
          });
        case 12:
          return _context20.a(2);
      }
    }, _callee6, null, [[0, 9]]);
  })();
}
function reuseLicenseForAllPlugins(pluginFamily) {
  var data, _t1;
  return _regenerator().w(function (_context21) {
    while (1) switch (_context21.p = _context21.n) {
      case 0:
        _context21.p = 0;
        _context21.n = 1;
        return {
          type: 'ACTIVATE_LICENSE_START',
          data: {
            pluginFamily: pluginFamily,
            licenseKey: '',
            applyToAll: true
          }
        };
      case 1:
        _context21.n = 2;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 2:
        _context21.n = 3;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamily.slug, "/reuse-license-for-all"),
          method: 'POST'
        });
      case 3:
        data = _context21.v;
        if (!data.success) {
          _context21.n = 7;
          break;
        }
        _context21.n = 4;
        return fetchPlugins();
      case 4:
        _context21.n = 5;
        return {
          type: 'ACTIVATE_LICENSE_SUCCESS',
          data: {
            pluginFamily: pluginFamily,
            licenseKey: '',
            applyToAll: true
          }
        };
      case 5:
        _context21.n = 6;
        return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License reused successfully for all PublishPress plugins', 'publishpress-hub'), 'success');
      case 6:
        return _context21.a(2, {
          success: true,
          pluginFamily: pluginFamily,
          apiResponse: data
        });
      case 7:
        throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'License reuse failed');
      case 8:
        _context21.n = 12;
        break;
      case 9:
        _context21.p = 9;
        _t1 = _context21.v;
        _context21.n = 10;
        return {
          type: 'ACTIVATE_LICENSE_ERROR',
          data: {
            pluginFamily: pluginFamily,
            licenseKey: '',
            applyToAll: true,
            error: _t1
          }
        };
      case 10:
        _context21.n = 11;
        return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license reuse failed', 'publishpress-hub'), pluginFamily.name), 'error');
      case 11:
        _t1 = handleErrorMessageOnContext(_t1);
        return _context21.a(2, {
          success: false,
          pluginFamily: pluginFamily,
          error: _t1
        });
      case 12:
        return _context21.a(2);
    }
  }, _marked15, null, [[0, 9]]);
}
function updatePlugin(pluginFamilySlug) {
  var data, _fallbackRefreshResul, refreshResult, fallbackRefreshResult, pluginName, _pluginName6, _t10;
  return _regenerator().w(function (_context22) {
    while (1) switch (_context22.p = _context22.n) {
      case 0:
        _context22.p = 0;
        _context22.n = 1;
        return {
          type: 'UPDATE_PLUGIN_START',
          data: {
            pluginFamilySlug: pluginFamilySlug
          }
        };
      case 1:
        _context22.n = 2;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 2:
        _context22.n = 3;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/plugins/").concat(pluginFamilySlug, "/update"),
          method: 'POST'
        });
      case 3:
        data = _context22.v;
        if (!data.success) {
          _context22.n = 13;
          break;
        }
        _context22.n = 4;
        return fetchPlugins(true, false);
      case 4:
        refreshResult = _context22.v;
        fallbackRefreshResult = refreshResult;
        if (!(!(refreshResult !== null && refreshResult !== void 0 && refreshResult.success) && !(refreshResult !== null && refreshResult !== void 0 && refreshResult.aborted))) {
          _context22.n = 6;
          break;
        }
        _context22.n = 5;
        return fetchPlugins(false, false);
      case 5:
        fallbackRefreshResult = _context22.v;
      case 6:
        if ((_fallbackRefreshResul = fallbackRefreshResult) !== null && _fallbackRefreshResul !== void 0 && _fallbackRefreshResul.success) {
          _context22.n = 9;
          break;
        }
        _context22.n = 7;
        return {
          type: 'UPDATE_PLUGIN_SUCCESS',
          data: {
            pluginFamilySlug: pluginFamilySlug
          }
        };
      case 7:
        _context22.n = 8;
        return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The plugin was updated successfully, but the dashboard could not refresh. Reloading this page...', 'publishpress-hub'), 'error');
      case 8:
        if (typeof window !== 'undefined') {
          setTimeout(function () {
            return window.location.reload();
          }, 1500);
        }
        return _context22.a(2, {
          success: true,
          pluginFamilySlug: pluginFamilySlug,
          refreshFailed: true,
          apiResponse: data
        });
      case 9:
        _context22.n = 10;
        return {
          type: 'UPDATE_PLUGIN_SUCCESS',
          data: {
            pluginFamilySlug: pluginFamilySlug
          }
        };
      case 10:
        return _context22.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 11);
      case 11:
        pluginName = _context22.v;
        _context22.n = 12;
        return createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s updated successfully', 'publishpress-hub'), pluginName), 'success');
      case 12:
        return _context22.a(2, {
          success: true,
          pluginFamilySlug: pluginFamilySlug,
          apiResponse: data
        });
      case 13:
        throw new Error((data === null || data === void 0 ? void 0 : data.error) || 'Plugin update failed');
      case 14:
        _context22.n = 19;
        break;
      case 15:
        _context22.p = 15;
        _t10 = _context22.v;
        _context22.n = 16;
        return {
          type: 'UPDATE_PLUGIN_ERROR',
          data: {
            pluginFamilySlug: pluginFamilySlug,
            error: _t10
          }
        };
      case 16:
        return _context22.d(_regeneratorValues(getPluginName(pluginFamilySlug)), 17);
      case 17:
        _pluginName6 = _context22.v;
        _context22.n = 18;
        return createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s update failed', 'publishpress-hub'), _pluginName6), 'error');
      case 18:
        _t10 = handleErrorMessageOnContext(_t10);
        return _context22.a(2, {
          success: false,
          pluginFamilySlug: pluginFamilySlug,
          error: _t10
        });
      case 19:
        return _context22.a(2);
    }
  }, _marked16, null, [[0, 15]]);
}
function cleanupError(pluginFamily) {
  return _regenerator().w(function (_context23) {
    while (1) switch (_context23.n) {
      case 0:
        _context23.n = 1;
        return {
          type: 'CLEANUP_ERROR',
          data: {
            pluginFamily: pluginFamily
          }
        };
      case 1:
        return _context23.a(2);
    }
  }, _marked17);
}

/**
 * Checks if an error is a rate limit error (429).
 *
 * @param {Error} error The error object.
 * @return {boolean} True if it's a rate limit error, false otherwise.
 */
function isRateLimitError(error) {
  var _error$data, _error$data2, _error$response;
  if (!error) {
    return false;
  }

  // Check status code directly
  if (error.status === 429 || (error === null || error === void 0 || (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.status) === 429) {
    return true;
  }

  // Check error code
  if (error.code === 'rate_limit_exceeded' || error.code === 'rest_rate_limit_exceeded') {
    return true;
  }

  // Check error message
  var errorMessage = error.message || ((_error$data2 = error.data) === null || _error$data2 === void 0 ? void 0 : _error$data2.message) || '';
  if (errorMessage.includes('Too many requests') || errorMessage.includes('rate limit')) {
    return true;
  }

  // Check response status if available
  if (((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 429) {
    return true;
  }
  return false;
}

/**
 * Gets an appropriate error message based on the error type.
 *
 * @param {Error} error The error object.
 * @param {string} defaultMessage The default error message.
 * @return {string} The error message.
 */
function getErrorMessage(error, defaultMessage) {
  if (isRateLimitError(error)) {
    return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Too many requests. Please wait a few seconds and try again.', 'publishpress-hub');
  }
  return defaultMessage;
}
function handleErrorMessageOnContext(error) {
  var _error$context;
  var errorMessage = '';
  if ((_error$context = error.context) !== null && _error$context !== void 0 && _error$context.cloudflare_ray_id) {
    errorMessage += ' ' + (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cloudflare Ray ID: %s', 'publishpress-hub'), error.context.cloudflare_ray_id);
  }
  if (errorMessage != '') {
    var _error$context2;
    errorMessage = errorMessage.trim();
    if ((_error$context2 = error.context) !== null && _error$context2 !== void 0 && _error$context2.error_message) {
      error.context.error_message += ' ' + errorMessage;
    } else {
      error.context.error_message = errorMessage;
    }
  }
  return error;
}

/**
 * Dismiss a license notice.
 *
 * @param {string} noticeType The notice type ('expired' or 'expiring').
 * @since 1.0.0
 */
function dismissLicenseNotice(noticeType) {
  var _t11;
  return _regenerator().w(function (_context24) {
    while (1) switch (_context24.p = _context24.n) {
      case 0:
        _context24.n = 1;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 1:
        _context24.p = 1;
        _context24.n = 2;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/license-notices/dismiss"),
          method: 'POST',
          data: {
            noticeType: noticeType
          }
        });
      case 2:
        _context24.n = 4;
        break;
      case 3:
        _context24.p = 3;
        _t11 = _context24.v;
        // Silently fail - dismissal is not critical
        // eslint-disable-next-line no-console
        console.error('Error dismissing license notice:', _t11);
      case 4:
        return _context24.a(2);
    }
  }, _marked18, null, [[1, 3]]);
}

/**
 * Fetch license notice dismissal status.
 *
 * @return {Object} The dismissal status object with 'expired' and 'expiring' keys.
 * @since 1.0.0
 */
function fetchLicenseNoticeDismissalStatus() {
  var response, _t12;
  return _regenerator().w(function (_context25) {
    while (1) switch (_context25.p = _context25.n) {
      case 0:
        _context25.n = 1;
        return (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
      case 1:
        _context25.p = 1;
        _context25.n = 2;
        return (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
          path: "".concat(API_NAMESPACE, "/license-notices/dismissal-status"),
          method: 'GET'
        });
      case 2:
        response = _context25.v;
        return _context25.a(2, response.dismissalStatus || {
          expired: false,
          expiring: false
        });
      case 3:
        _context25.p = 3;
        _t12 = _context25.v;
        // Silently fail and return default status
        // eslint-disable-next-line no-console
        console.error('Error fetching dismissal status:', _t12);
        return _context25.a(2, {
          expired: false,
          expiring: false
        });
    }
  }, _marked19, null, [[1, 3]]);
}

/***/ },

/***/ "./resources/src/jsx/stores/plugins-dashboard/index.jsx"
/*!**************************************************************!*\
  !*** ./resources/src/jsx/stores/plugins-dashboard/index.jsx ***!
  \**************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/* harmony import */ var _name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./name */ "./resources/src/jsx/stores/plugins-dashboard/name.jsx");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducer */ "./resources/src/jsx/stores/plugins-dashboard/reducer.jsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectors */ "./resources/src/jsx/stores/plugins-dashboard/selectors.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions */ "./resources/src/jsx/stores/plugins-dashboard/actions.jsx");
/**
 * Plugins dashboard store.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */







var store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(_name__WEBPACK_IMPORTED_MODULE_2__.STORE_NAME, {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_3__.reducer,
  actions: _actions__WEBPACK_IMPORTED_MODULE_5__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_4__,
  controls: _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_1__.controls
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

/***/ },

/***/ "./resources/src/jsx/stores/plugins-dashboard/name.jsx"
/*!*************************************************************!*\
  !*** ./resources/src/jsx/stores/plugins-dashboard/name.jsx ***!
  \*************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STORE_NAME: () => (/* binding */ STORE_NAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Plugins dashboard store name.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

var STORE_NAME = 'publishpress-hub/plugins-dashboard';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (STORE_NAME);

/***/ },

/***/ "./resources/src/jsx/stores/plugins-dashboard/reducer.jsx"
/*!****************************************************************!*\
  !*** ./resources/src/jsx/stores/plugins-dashboard/reducer.jsx ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/**
 * Plugins dashboard reducer.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


var DEFAULT_STATE = {
  selectedFilter: 'all',
  plugins: [],
  isLoading: false,
  error: null,
  currentFilter: 'all',
  pluginInstallationInProgress: {},
  pluginUninstallationInProgress: {},
  pluginActivationInProgress: {},
  pluginDeactivationInProgress: {},
  pluginLicenseActivationInProgress: {},
  pluginLicenseDeactivationInProgress: {},
  pluginUpgradeInProgress: {},
  pluginUpdateInProgress: {},
  pluginResolveConflictInProgress: {},
  selectedPluginForConflictResolution: null,
  pluginErrors: {},
  isLicenseInputModalOpen: false,
  isLicenseInputModalOpenForUpgrade: false,
  isInstallationTypeModalOpen: false,
  isUninstallConfirmationModalOpen: false,
  isUpgradeModalOpen: false,
  isResolveConflictModalOpen: false
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
var setLicenseInputModalOpen = function setLicenseInputModalOpen(state, isOpen) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isLicenseInputModalOpen: isOpen,
    pluginErrors: {}
  });
};
var setLicenseInputModalOpenForUpgrade = function setLicenseInputModalOpenForUpgrade(state, isOpen) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isLicenseInputModalOpenForUpgrade: isOpen,
    pluginErrors: {}
  });
};
var setInstallationTypeModalOpen = function setInstallationTypeModalOpen(state, isOpen) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isInstallationTypeModalOpen: isOpen,
    pluginErrors: {}
  });
};
var setIsUninstallConfirmationModalOpen = function setIsUninstallConfirmationModalOpen(state, isOpen) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isUninstallConfirmationModalOpen: isOpen,
    pluginErrors: {}
  });
};
var setIsUpgradeModalOpen = function setIsUpgradeModalOpen(state, isOpen) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isUpgradeModalOpen: isOpen,
    pluginErrors: {}
  });
};
var setIsResolveConflictModalOpen = function setIsResolveConflictModalOpen(state, isOpen) {
  return _objectSpread(_objectSpread({}, state), {}, {
    isResolveConflictModalOpen: isOpen,
    pluginErrors: {}
  });
};
var installPluginStart = function installPluginStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginInstallationInProgress: _objectSpread(_objectSpread({}, state.pluginInstallationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, true)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, null))
  });
};
var installPluginSuccess = function installPluginSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginInstallationInProgress: _objectSpread(_objectSpread({}, state.pluginInstallationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, null))
  });
};
var installPluginError = function installPluginError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginInstallationInProgress: _objectSpread(_objectSpread({}, state.pluginInstallationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, data.error))
  });
};
var uninstallPluginStart = function uninstallPluginStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUninstallationInProgress: _objectSpread(_objectSpread({}, state.pluginUninstallationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, true))
  });
};
var uninstallPluginSuccess = function uninstallPluginSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUninstallationInProgress: _objectSpread(_objectSpread({}, state.pluginUninstallationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false))
  });
};
var uninstallPluginError = function uninstallPluginError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUninstallationInProgress: _objectSpread(_objectSpread({}, state.pluginUninstallationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false))
  });
};
var activatePluginStart = function activatePluginStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginActivationInProgress: _objectSpread(_objectSpread({}, state.pluginActivationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, true))
  });
};
var activatePluginSuccess = function activatePluginSuccess(state, data) {
  // Optimistically update the plugin's active state
  var updatedPlugins = state.plugins.map(function (plugin) {
    if (plugin.slug === data.pluginFamilySlug) {
      var _plugin$proPlugin, _plugin$freePlugin;
      // Update the active status of the installed version
      if ((_plugin$proPlugin = plugin.proPlugin) !== null && _plugin$proPlugin !== void 0 && _plugin$proPlugin.isInstalled) {
        return _objectSpread(_objectSpread({}, plugin), {}, {
          proPlugin: _objectSpread(_objectSpread({}, plugin.proPlugin), {}, {
            isActive: data.active !== undefined ? data.active : true
          })
        });
      }
      if ((_plugin$freePlugin = plugin.freePlugin) !== null && _plugin$freePlugin !== void 0 && _plugin$freePlugin.isInstalled) {
        return _objectSpread(_objectSpread({}, plugin), {}, {
          freePlugin: _objectSpread(_objectSpread({}, plugin.freePlugin), {}, {
            isActive: data.active !== undefined ? data.active : true
          })
        });
      }
    }
    return plugin;
  });
  return _objectSpread(_objectSpread({}, state), {}, {
    plugins: updatedPlugins,
    pluginActivationInProgress: _objectSpread(_objectSpread({}, state.pluginActivationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false))
  });
};
var activatePluginError = function activatePluginError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginActivationInProgress: _objectSpread(_objectSpread({}, state.pluginActivationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false))
  });
};
var deactivatePluginStart = function deactivatePluginStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginDeactivationInProgress: _objectSpread(_objectSpread({}, state.pluginDeactivationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, true))
  });
};
var deactivatePluginSuccess = function deactivatePluginSuccess(state, data) {
  // Optimistically update the plugin's active state
  var updatedPlugins = state.plugins.map(function (plugin) {
    if (plugin.slug === data.pluginFamilySlug) {
      var _plugin$proPlugin2, _plugin$freePlugin2;
      // Update the active status of the installed version
      if ((_plugin$proPlugin2 = plugin.proPlugin) !== null && _plugin$proPlugin2 !== void 0 && _plugin$proPlugin2.isInstalled) {
        return _objectSpread(_objectSpread({}, plugin), {}, {
          proPlugin: _objectSpread(_objectSpread({}, plugin.proPlugin), {}, {
            isActive: data.active !== undefined ? data.active : false
          })
        });
      }
      if ((_plugin$freePlugin2 = plugin.freePlugin) !== null && _plugin$freePlugin2 !== void 0 && _plugin$freePlugin2.isInstalled) {
        return _objectSpread(_objectSpread({}, plugin), {}, {
          freePlugin: _objectSpread(_objectSpread({}, plugin.freePlugin), {}, {
            isActive: data.active !== undefined ? data.active : false
          })
        });
      }
    }
    return plugin;
  });
  return _objectSpread(_objectSpread({}, state), {}, {
    plugins: updatedPlugins,
    pluginDeactivationInProgress: _objectSpread(_objectSpread({}, state.pluginDeactivationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false))
  });
};
var deactivatePluginError = function deactivatePluginError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginDeactivationInProgress: _objectSpread(_objectSpread({}, state.pluginDeactivationInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false))
  });
};
var upgradePluginToProStart = function upgradePluginToProStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUpgradeInProgress: _objectSpread(_objectSpread({}, state.pluginUpgradeInProgress), {}, _defineProperty({}, data.pluginFamilySlug, true)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, null))
  });
};
var upgradePluginToProSuccess = function upgradePluginToProSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUpgradeInProgress: _objectSpread(_objectSpread({}, state.pluginUpgradeInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, null))
  });
};
var upgradePluginToProError = function upgradePluginToProError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUpgradeInProgress: _objectSpread(_objectSpread({}, state.pluginUpgradeInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, data.error))
  });
};
var resolveConflictStart = function resolveConflictStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginResolveConflictInProgress: _objectSpread(_objectSpread({}, state.pluginResolveConflictInProgress), {}, _defineProperty({}, data.pluginFamily.slug, true)),
    selectedPluginForConflictResolution: data.pluginToKeep,
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, null))
  });
};
var resolveConflictSuccess = function resolveConflictSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginResolveConflictInProgress: _objectSpread(_objectSpread({}, state.pluginResolveConflictInProgress), {}, _defineProperty({}, data.pluginFamily.slug, false)),
    selectedPluginForConflictResolution: null,
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, data.error))
  });
};
var resolveConflictError = function resolveConflictError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginResolveConflictInProgress: _objectSpread(_objectSpread({}, state.pluginResolveConflictInProgress), {}, _defineProperty({}, data.pluginFamily.slug, false)),
    selectedPluginForConflictResolution: null,
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, data.error))
  });
};
var deactivateLicenseStart = function deactivateLicenseStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginLicenseDeactivationInProgress: _objectSpread(_objectSpread({}, state.pluginLicenseDeactivationInProgress), {}, _defineProperty({}, data.pluginFamily.slug, true)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, null))
  });
};
var deactivateLicenseSuccess = function deactivateLicenseSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginLicenseDeactivationInProgress: _objectSpread(_objectSpread({}, state.pluginLicenseDeactivationInProgress), {}, _defineProperty({}, data.pluginFamily.slug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, null))
  });
};
var deactivateLicenseError = function deactivateLicenseError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginLicenseDeactivationInProgress: _objectSpread(_objectSpread({}, state.pluginLicenseDeactivationInProgress), {}, _defineProperty({}, data.pluginFamily.slug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, data.error))
  });
};
var activateLicenseStart = function activateLicenseStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginLicenseActivationInProgress: _objectSpread(_objectSpread({}, state.pluginLicenseActivationInProgress), {}, _defineProperty({}, data.pluginFamily.slug, true)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, null))
  });
};
var activateLicenseSuccess = function activateLicenseSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginLicenseActivationInProgress: _objectSpread(_objectSpread({}, state.pluginLicenseActivationInProgress), {}, _defineProperty({}, data.pluginFamily.slug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, null))
  });
};
var activateLicenseError = function activateLicenseError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginLicenseActivationInProgress: _objectSpread(_objectSpread({}, state.pluginLicenseActivationInProgress), {}, _defineProperty({}, data.pluginFamily.slug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, data.error))
  });
};
var updatePluginStart = function updatePluginStart(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUpdateInProgress: _objectSpread(_objectSpread({}, state.pluginUpdateInProgress), {}, _defineProperty({}, data.pluginFamilySlug, true)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, null))
  });
};
var updatePluginSuccess = function updatePluginSuccess(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUpdateInProgress: _objectSpread(_objectSpread({}, state.pluginUpdateInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, null))
  });
};
var updatePluginError = function updatePluginError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginUpdateInProgress: _objectSpread(_objectSpread({}, state.pluginUpdateInProgress), {}, _defineProperty({}, data.pluginFamilySlug, false)),
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamilySlug, data.error))
  });
};
var cleanupError = function cleanupError(state, data) {
  return _objectSpread(_objectSpread({}, state), {}, {
    pluginErrors: _objectSpread(_objectSpread({}, state.pluginErrors), {}, _defineProperty({}, data.pluginFamily.slug, null))
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
    case 'SET_LICENSE_INPUT_MODAL_OPEN':
      return setLicenseInputModalOpen(state, action.isOpen);
    case 'SET_LICENSE_INPUT_MODAL_OPEN_FOR_UPGRADE':
      return setLicenseInputModalOpenForUpgrade(state, action.isOpen);
    case 'SET_INSTALLATION_TYPE_MODAL_OPEN':
      return setInstallationTypeModalOpen(state, action.isOpen);
    case 'SET_IS_UNINSTALL_CONFIRMATION_MODAL_OPEN':
      return setIsUninstallConfirmationModalOpen(state, action.isOpen);
    case 'SET_IS_UPGRADE_MODAL_OPEN':
      return setIsUpgradeModalOpen(state, action.isOpen);
    case 'SET_IS_RESOLVE_CONFLICT_MODAL_OPEN':
      return setIsResolveConflictModalOpen(state, action.isOpen);
    case 'INSTALL_PLUGIN_START':
      return installPluginStart(state, action.data);
    case 'INSTALL_PLUGIN_SUCCESS':
      return installPluginSuccess(state, action.data);
    case 'INSTALL_PLUGIN_ERROR':
      return installPluginError(state, action.data);
    case 'UNINSTALL_PLUGIN_START':
      return uninstallPluginStart(state, action.data);
    case 'UNINSTALL_PLUGIN_SUCCESS':
      return uninstallPluginSuccess(state, action.data);
    case 'UNINSTALL_PLUGIN_ERROR':
      return uninstallPluginError(state, action.data);
    case 'ACTIVATE_PLUGIN_START':
      return activatePluginStart(state, action.data);
    case 'ACTIVATE_PLUGIN_SUCCESS':
      return activatePluginSuccess(state, action.data);
    case 'ACTIVATE_PLUGIN_ERROR':
      return activatePluginError(state, action.data);
    case 'DEACTIVATE_PLUGIN_START':
      return deactivatePluginStart(state, action.data);
    case 'DEACTIVATE_PLUGIN_SUCCESS':
      return deactivatePluginSuccess(state, action.data);
    case 'DEACTIVATE_PLUGIN_ERROR':
      return deactivatePluginError(state, action.data);
    case 'UPGRADE_PLUGIN_TO_PRO_START':
      return upgradePluginToProStart(state, action.data);
    case 'UPGRADE_PLUGIN_TO_PRO_SUCCESS':
      return upgradePluginToProSuccess(state, action.data);
    case 'UPGRADE_PLUGIN_TO_PRO_ERROR':
      return upgradePluginToProError(state, action.data);
    case 'RESOLVE_CONFLICT_START':
      return resolveConflictStart(state, action.data);
    case 'RESOLVE_CONFLICT_SUCCESS':
      return resolveConflictSuccess(state, action.data);
    case 'RESOLVE_CONFLICT_ERROR':
      return resolveConflictError(state, action.data);
    case 'DEACTIVATE_LICENSE_START':
      return deactivateLicenseStart(state, action.data);
    case 'DEACTIVATE_LICENSE_SUCCESS':
      return deactivateLicenseSuccess(state, action.data);
    case 'DEACTIVATE_LICENSE_ERROR':
      return deactivateLicenseError(state, action.data);
    case 'ACTIVATE_LICENSE_START':
      return activateLicenseStart(state, action.data);
    case 'ACTIVATE_LICENSE_SUCCESS':
      return activateLicenseSuccess(state, action.data);
    case 'ACTIVATE_LICENSE_ERROR':
      return activateLicenseError(state, action.data);
    case 'UPDATE_PLUGIN_START':
      return updatePluginStart(state, action.data);
    case 'UPDATE_PLUGIN_SUCCESS':
      return updatePluginSuccess(state, action.data);
    case 'UPDATE_PLUGIN_ERROR':
      return updatePluginError(state, action.data);
    case 'CLEANUP_ERROR':
      return cleanupError(state, action.data);
    default:
      return state;
  }
};

/***/ },

/***/ "./resources/src/jsx/stores/plugins-dashboard/selectors.jsx"
/*!******************************************************************!*\
  !*** ./resources/src/jsx/stores/plugins-dashboard/selectors.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentFilter: () => (/* binding */ getCurrentFilter),
/* harmony export */   getError: () => (/* binding */ getError),
/* harmony export */   getFilterCounts: () => (/* binding */ getFilterCounts),
/* harmony export */   getFilteredPlugins: () => (/* binding */ getFilteredPlugins),
/* harmony export */   getIsInstallationTypeModalOpen: () => (/* binding */ getIsInstallationTypeModalOpen),
/* harmony export */   getIsLicenseInputModalOpen: () => (/* binding */ getIsLicenseInputModalOpen),
/* harmony export */   getIsLicenseInputModalOpenForUpgrade: () => (/* binding */ getIsLicenseInputModalOpenForUpgrade),
/* harmony export */   getIsLoading: () => (/* binding */ getIsLoading),
/* harmony export */   getIsResolveConflictModalOpen: () => (/* binding */ getIsResolveConflictModalOpen),
/* harmony export */   getIsUninstallConfirmationModalOpen: () => (/* binding */ getIsUninstallConfirmationModalOpen),
/* harmony export */   getIsUpgradeModalOpen: () => (/* binding */ getIsUpgradeModalOpen),
/* harmony export */   getPluginActivationInProgress: () => (/* binding */ getPluginActivationInProgress),
/* harmony export */   getPluginDeactivationInProgress: () => (/* binding */ getPluginDeactivationInProgress),
/* harmony export */   getPluginError: () => (/* binding */ getPluginError),
/* harmony export */   getPluginInstallationInProgress: () => (/* binding */ getPluginInstallationInProgress),
/* harmony export */   getPluginLicenseActivationInProgress: () => (/* binding */ getPluginLicenseActivationInProgress),
/* harmony export */   getPluginLicenseDeactivationInProgress: () => (/* binding */ getPluginLicenseDeactivationInProgress),
/* harmony export */   getPluginResolveConflictInProgress: () => (/* binding */ getPluginResolveConflictInProgress),
/* harmony export */   getPluginUninstallationInProgress: () => (/* binding */ getPluginUninstallationInProgress),
/* harmony export */   getPluginUpdateInProgress: () => (/* binding */ getPluginUpdateInProgress),
/* harmony export */   getPluginUpgradeInProgress: () => (/* binding */ getPluginUpgradeInProgress),
/* harmony export */   getPlugins: () => (/* binding */ getPlugins),
/* harmony export */   getSelectedFilter: () => (/* binding */ getSelectedFilter),
/* harmony export */   getSelectedPluginForConflictResolution: () => (/* binding */ getSelectedPluginForConflictResolution)
/* harmony export */ });
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/**
 * Plugins dashboard selectors.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

var createMemoizedSelector = function createMemoizedSelector(selectorFn) {
  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    // Simple equality check for arguments
    if (!lastArgs || !areArgsEqual(lastArgs, args)) {
      lastArgs = args;
      lastResult = selectorFn.apply(void 0, args);
    }
    return lastResult;
  };
};
var areArgsEqual = function areArgsEqual(prev, curr) {
  if (prev.length !== curr.length) return false;
  for (var i = 0; i < prev.length; i++) {
    if (prev[i] !== curr[i]) return false;
  }
  return true;
};
var getSelectedFilter = function getSelectedFilter(state) {
  return state.selectedFilter;
};
var getPlugins = function getPlugins(state) {
  return state.plugins;
};
var sortPlugins = function sortPlugins(pluginFamily) {
  return _toConsumableArray(pluginFamily).sort(function (a, b) {
    if (a.proPlugin.isLicensed && !b.proPlugin.isLicensed) {
      return -1;
    }
    if (!a.proPlugin.isLicensed && b.proPlugin.isLicensed) {
      return 1;
    }
    return a.name.localeCompare(b.name, undefined, {
      sensitivity: 'base'
    });
  });
};
var getFilteredPlugins = createMemoizedSelector(function (state) {
  var plugins = state.plugins;
  var selectedFilter = state.selectedFilter;
  var filteredPlugins;
  if (!selectedFilter || selectedFilter === 'all') {
    filteredPlugins = plugins;
  } else {
    filteredPlugins = plugins.filter(function (plugin) {
      return filterPlugin(plugin, selectedFilter);
    });
  }
  return sortPlugins(filteredPlugins);
});
var getIsLoading = function getIsLoading(state) {
  return state.isLoading;
};
var getError = function getError(state) {
  return state.error;
};
var getCurrentFilter = function getCurrentFilter(state) {
  return state.currentFilter;
};
var getPluginInstallationInProgress = function getPluginInstallationInProgress(state) {
  return state.pluginInstallationInProgress;
};
var getPluginUninstallationInProgress = function getPluginUninstallationInProgress(state) {
  return state.pluginUninstallationInProgress;
};
var getPluginError = function getPluginError(state) {
  return state.pluginErrors;
};
var getIsLicenseInputModalOpen = function getIsLicenseInputModalOpen(state) {
  return state.isLicenseInputModalOpen;
};
var getIsInstallationTypeModalOpen = function getIsInstallationTypeModalOpen(state) {
  return state.isInstallationTypeModalOpen;
};
var getPluginActivationInProgress = function getPluginActivationInProgress(state) {
  return state.pluginActivationInProgress;
};
var getPluginDeactivationInProgress = function getPluginDeactivationInProgress(state) {
  return state.pluginDeactivationInProgress;
};
var getPluginLicenseActivationInProgress = function getPluginLicenseActivationInProgress(state) {
  return state.pluginLicenseActivationInProgress;
};
var getPluginLicenseDeactivationInProgress = function getPluginLicenseDeactivationInProgress(state) {
  return state.pluginLicenseDeactivationInProgress;
};
var getIsUninstallConfirmationModalOpen = function getIsUninstallConfirmationModalOpen(state) {
  return state.isUninstallConfirmationModalOpen;
};
var getIsResolveConflictModalOpen = function getIsResolveConflictModalOpen(state) {
  return state.isResolveConflictModalOpen;
};
var getIsUpgradeModalOpen = function getIsUpgradeModalOpen(state) {
  return state.isUpgradeModalOpen;
};
var getPluginUpgradeInProgress = function getPluginUpgradeInProgress(state) {
  return state.pluginUpgradeInProgress;
};
var getPluginUpdateInProgress = function getPluginUpdateInProgress(state) {
  return state.pluginUpdateInProgress;
};
var getPluginResolveConflictInProgress = function getPluginResolveConflictInProgress(state) {
  return state.pluginResolveConflictInProgress;
};
var getSelectedPluginForConflictResolution = function getSelectedPluginForConflictResolution(state) {
  return state.selectedPluginForConflictResolution;
};
var getIsLicenseInputModalOpenForUpgrade = function getIsLicenseInputModalOpenForUpgrade(state) {
  return state.isLicenseInputModalOpenForUpgrade;
};
var getFilterCounts = createMemoizedSelector(function (state) {
  var plugins = state.plugins;

  // Pre-calculate filter results for better performance
  var filterResults = {
    all: [],
    unlicensed: [],
    active: [],
    inactive: [],
    notInstalled: [],
    updatesAvailable: []
  };

  // Single pass through plugins to calculate all filters
  plugins.forEach(function (plugin) {
    filterResults.all.push(plugin);
    if (!plugin.hasAnyVersionInstalled) {
      filterResults.notInstalled.push(plugin);
    } else {
      if (plugin.proPlugin.isInstalled && !plugin.proPlugin.isLicensed) {
        filterResults.unlicensed.push(plugin);
      }
      if (plugin.hasAnyVersionActive) {
        filterResults.active.push(plugin);
      } else {
        filterResults.inactive.push(plugin);
      }
      if (plugin.hasUpdate && plugin.hasAnyVersionInstalled) {
        filterResults.updatesAvailable.push(plugin);
      }
    }
  });
  return {
    all: filterResults.all.length,
    unlicensed: filterResults.unlicensed.length,
    active: filterResults.active.length,
    inactive: filterResults.inactive.length,
    notInstalled: filterResults.notInstalled.length,
    updatesAvailable: filterResults.updatesAvailable.length
  };
});
var filterPlugin = function filterPlugin(plugin, selectedFilter) {
  switch (selectedFilter) {
    case 'notInstalled':
      return !plugin.hasAnyVersionInstalled;
    case 'unlicensed':
      return plugin.proPlugin.isInstalled && !plugin.proPlugin.isLicensed;
    case 'active':
      return plugin.hasAnyVersionActive && plugin.hasAnyVersionInstalled;
    case 'inactive':
      return !plugin.hasAnyVersionActive && plugin.hasAnyVersionInstalled;
    case 'updatesAvailable':
      return plugin.hasUpdate && plugin.hasAnyVersionInstalled;
    default:
      return true;
  }
};

/***/ },

/***/ "./node_modules/lodash/_DataView.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_DataView.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ },

/***/ "./node_modules/lodash/_Hash.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/_Hash.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "./node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "./node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "./node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "./node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "./node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ },

/***/ "./node_modules/lodash/_ListCache.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_ListCache.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "./node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "./node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "./node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "./node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "./node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ },

/***/ "./node_modules/lodash/_Map.js"
/*!*************************************!*\
  !*** ./node_modules/lodash/_Map.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ },

/***/ "./node_modules/lodash/_MapCache.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_MapCache.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "./node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "./node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "./node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "./node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "./node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ },

/***/ "./node_modules/lodash/_Promise.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_Promise.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ },

/***/ "./node_modules/lodash/_Set.js"
/*!*************************************!*\
  !*** ./node_modules/lodash/_Set.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ },

/***/ "./node_modules/lodash/_SetCache.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_SetCache.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "./node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "./node_modules/lodash/_setCacheHas.js");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ },

/***/ "./node_modules/lodash/_Stack.js"
/*!***************************************!*\
  !*** ./node_modules/lodash/_Stack.js ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "./node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "./node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "./node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "./node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "./node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ },

/***/ "./node_modules/lodash/_Symbol.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ },

/***/ "./node_modules/lodash/_Uint8Array.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_Uint8Array.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ },

/***/ "./node_modules/lodash/_WeakMap.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_WeakMap.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ },

/***/ "./node_modules/lodash/_arrayFilter.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_arrayFilter.js ***!
  \*********************************************/
(module) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ },

/***/ "./node_modules/lodash/_arrayLikeKeys.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_arrayLikeKeys.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "./node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ },

/***/ "./node_modules/lodash/_arrayMap.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_arrayMap.js ***!
  \******************************************/
(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ },

/***/ "./node_modules/lodash/_arrayPush.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayPush.js ***!
  \*******************************************/
(module) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ },

/***/ "./node_modules/lodash/_arraySome.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arraySome.js ***!
  \*******************************************/
(module) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ },

/***/ "./node_modules/lodash/_assocIndexOf.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_assocIndexOf.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ },

/***/ "./node_modules/lodash/_baseEach.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseEach.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseForOwn = __webpack_require__(/*! ./_baseForOwn */ "./node_modules/lodash/_baseForOwn.js"),
    createBaseEach = __webpack_require__(/*! ./_createBaseEach */ "./node_modules/lodash/_createBaseEach.js");

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;


/***/ },

/***/ "./node_modules/lodash/_baseFilter.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseFilter.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseEach = __webpack_require__(/*! ./_baseEach */ "./node_modules/lodash/_baseEach.js");

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;


/***/ },

/***/ "./node_modules/lodash/_baseFor.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseFor.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var createBaseFor = __webpack_require__(/*! ./_createBaseFor */ "./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ },

/***/ "./node_modules/lodash/_baseForOwn.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseForOwn.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseFor = __webpack_require__(/*! ./_baseFor */ "./node_modules/lodash/_baseFor.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ },

/***/ "./node_modules/lodash/_baseGet.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseGet.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ },

/***/ "./node_modules/lodash/_baseGetAllKeys.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_baseGetAllKeys.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "./node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ },

/***/ "./node_modules/lodash/_baseGetTag.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ },

/***/ "./node_modules/lodash/_baseHasIn.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseHasIn.js ***!
  \*******************************************/
(module) {

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

module.exports = baseHasIn;


/***/ },

/***/ "./node_modules/lodash/_baseIsArguments.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsArguments.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ },

/***/ "./node_modules/lodash/_baseIsEqual.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsEqual.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "./node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ },

/***/ "./node_modules/lodash/_baseIsEqualDeep.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_baseIsEqualDeep.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "./node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "./node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "./node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "./node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "./node_modules/lodash/isTypedArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ },

/***/ "./node_modules/lodash/_baseIsMatch.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseIsMatch.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "./node_modules/lodash/_Stack.js"),
    baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;


/***/ },

/***/ "./node_modules/lodash/_baseIsNative.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIsNative.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "./node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ },

/***/ "./node_modules/lodash/_baseIsTypedArray.js"
/*!**************************************************!*\
  !*** ./node_modules/lodash/_baseIsTypedArray.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ },

/***/ "./node_modules/lodash/_baseIteratee.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseIteratee.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseMatches = __webpack_require__(/*! ./_baseMatches */ "./node_modules/lodash/_baseMatches.js"),
    baseMatchesProperty = __webpack_require__(/*! ./_baseMatchesProperty */ "./node_modules/lodash/_baseMatchesProperty.js"),
    identity = __webpack_require__(/*! ./identity */ "./node_modules/lodash/identity.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    property = __webpack_require__(/*! ./property */ "./node_modules/lodash/property.js");

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;


/***/ },

/***/ "./node_modules/lodash/_baseKeys.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseKeys.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "./node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "./node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ },

/***/ "./node_modules/lodash/_baseMatches.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_baseMatches.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsMatch = __webpack_require__(/*! ./_baseIsMatch */ "./node_modules/lodash/_baseIsMatch.js"),
    getMatchData = __webpack_require__(/*! ./_getMatchData */ "./node_modules/lodash/_getMatchData.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/lodash/_matchesStrictComparable.js");

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;


/***/ },

/***/ "./node_modules/lodash/_baseMatchesProperty.js"
/*!*****************************************************!*\
  !*** ./node_modules/lodash/_baseMatchesProperty.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "./node_modules/lodash/_baseIsEqual.js"),
    get = __webpack_require__(/*! ./get */ "./node_modules/lodash/get.js"),
    hasIn = __webpack_require__(/*! ./hasIn */ "./node_modules/lodash/hasIn.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/lodash/_isStrictComparable.js"),
    matchesStrictComparable = __webpack_require__(/*! ./_matchesStrictComparable */ "./node_modules/lodash/_matchesStrictComparable.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}

module.exports = baseMatchesProperty;


/***/ },

/***/ "./node_modules/lodash/_baseProperty.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseProperty.js ***!
  \**********************************************/
(module) {

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;


/***/ },

/***/ "./node_modules/lodash/_basePropertyDeep.js"
/*!**************************************************!*\
  !*** ./node_modules/lodash/_basePropertyDeep.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;


/***/ },

/***/ "./node_modules/lodash/_baseTimes.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseTimes.js ***!
  \*******************************************/
(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ },

/***/ "./node_modules/lodash/_baseToString.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseToString.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "./node_modules/lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ },

/***/ "./node_modules/lodash/_baseUnary.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnary.js ***!
  \*******************************************/
(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ },

/***/ "./node_modules/lodash/_cacheHas.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_cacheHas.js ***!
  \******************************************/
(module) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ },

/***/ "./node_modules/lodash/_castPath.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_castPath.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "./node_modules/lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "./node_modules/lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ },

/***/ "./node_modules/lodash/_coreJsData.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_coreJsData.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ },

/***/ "./node_modules/lodash/_createBaseEach.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_createBaseEach.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;


/***/ },

/***/ "./node_modules/lodash/_createBaseFor.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_createBaseFor.js ***!
  \***********************************************/
(module) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ },

/***/ "./node_modules/lodash/_equalArrays.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_equalArrays.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "./node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "./node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "./node_modules/lodash/_cacheHas.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ },

/***/ "./node_modules/lodash/_equalByTag.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_equalByTag.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "./node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "./node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "./node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "./node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "./node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ },

/***/ "./node_modules/lodash/_equalObjects.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_equalObjects.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "./node_modules/lodash/_getAllKeys.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ },

/***/ "./node_modules/lodash/_freeGlobal.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ },

/***/ "./node_modules/lodash/_getAllKeys.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_getAllKeys.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "./node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ },

/***/ "./node_modules/lodash/_getMapData.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_getMapData.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "./node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ },

/***/ "./node_modules/lodash/_getMatchData.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getMatchData.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isStrictComparable = __webpack_require__(/*! ./_isStrictComparable */ "./node_modules/lodash/_isStrictComparable.js"),
    keys = __webpack_require__(/*! ./keys */ "./node_modules/lodash/keys.js");

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

module.exports = getMatchData;


/***/ },

/***/ "./node_modules/lodash/_getNative.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getNative.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "./node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "./node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ },

/***/ "./node_modules/lodash/_getRawTag.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ },

/***/ "./node_modules/lodash/_getSymbols.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_getSymbols.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "./node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ },

/***/ "./node_modules/lodash/_getTag.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/_getTag.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var DataView = __webpack_require__(/*! ./_DataView */ "./node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "./node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "./node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "./node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "./node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ },

/***/ "./node_modules/lodash/_getValue.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_getValue.js ***!
  \******************************************/
(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ },

/***/ "./node_modules/lodash/_hasPath.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hasPath.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "./node_modules/lodash/_castPath.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "./node_modules/lodash/_isIndex.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

module.exports = hasPath;


/***/ },

/***/ "./node_modules/lodash/_hashClear.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_hashClear.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ },

/***/ "./node_modules/lodash/_hashDelete.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_hashDelete.js ***!
  \********************************************/
(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ },

/***/ "./node_modules/lodash/_hashGet.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashGet.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ },

/***/ "./node_modules/lodash/_hashHas.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashHas.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ },

/***/ "./node_modules/lodash/_hashSet.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_hashSet.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "./node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ },

/***/ "./node_modules/lodash/_isIndex.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_isIndex.js ***!
  \*****************************************/
(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ },

/***/ "./node_modules/lodash/_isKey.js"
/*!***************************************!*\
  !*** ./node_modules/lodash/_isKey.js ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ },

/***/ "./node_modules/lodash/_isKeyable.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/_isKeyable.js ***!
  \*******************************************/
(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ },

/***/ "./node_modules/lodash/_isMasked.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_isMasked.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "./node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ },

/***/ "./node_modules/lodash/_isPrototype.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_isPrototype.js ***!
  \*********************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ },

/***/ "./node_modules/lodash/_isStrictComparable.js"
/*!****************************************************!*\
  !*** ./node_modules/lodash/_isStrictComparable.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;


/***/ },

/***/ "./node_modules/lodash/_listCacheClear.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_listCacheClear.js ***!
  \************************************************/
(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ },

/***/ "./node_modules/lodash/_listCacheDelete.js"
/*!*************************************************!*\
  !*** ./node_modules/lodash/_listCacheDelete.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ },

/***/ "./node_modules/lodash/_listCacheGet.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheGet.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ },

/***/ "./node_modules/lodash/_listCacheHas.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheHas.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ },

/***/ "./node_modules/lodash/_listCacheSet.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_listCacheSet.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "./node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ },

/***/ "./node_modules/lodash/_mapCacheClear.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_mapCacheClear.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "./node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ },

/***/ "./node_modules/lodash/_mapCacheDelete.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_mapCacheDelete.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ },

/***/ "./node_modules/lodash/_mapCacheGet.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheGet.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ },

/***/ "./node_modules/lodash/_mapCacheHas.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheHas.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ },

/***/ "./node_modules/lodash/_mapCacheSet.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_mapCacheSet.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "./node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ },

/***/ "./node_modules/lodash/_mapToArray.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_mapToArray.js ***!
  \********************************************/
(module) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ },

/***/ "./node_modules/lodash/_matchesStrictComparable.js"
/*!*********************************************************!*\
  !*** ./node_modules/lodash/_matchesStrictComparable.js ***!
  \*********************************************************/
(module) {

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

module.exports = matchesStrictComparable;


/***/ },

/***/ "./node_modules/lodash/_memoizeCapped.js"
/*!***********************************************!*\
  !*** ./node_modules/lodash/_memoizeCapped.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var memoize = __webpack_require__(/*! ./memoize */ "./node_modules/lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ },

/***/ "./node_modules/lodash/_nativeCreate.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_nativeCreate.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "./node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ },

/***/ "./node_modules/lodash/_nativeKeys.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_nativeKeys.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "./node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ },

/***/ "./node_modules/lodash/_nodeUtil.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_nodeUtil.js ***!
  \******************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ },

/***/ "./node_modules/lodash/_objectToString.js"
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ },

/***/ "./node_modules/lodash/_overArg.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/_overArg.js ***!
  \*****************************************/
(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ },

/***/ "./node_modules/lodash/_root.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ },

/***/ "./node_modules/lodash/_setCacheAdd.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheAdd.js ***!
  \*********************************************/
(module) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ },

/***/ "./node_modules/lodash/_setCacheHas.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_setCacheHas.js ***!
  \*********************************************/
(module) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ },

/***/ "./node_modules/lodash/_setToArray.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_setToArray.js ***!
  \********************************************/
(module) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ },

/***/ "./node_modules/lodash/_stackClear.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/_stackClear.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ },

/***/ "./node_modules/lodash/_stackDelete.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/_stackDelete.js ***!
  \*********************************************/
(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ },

/***/ "./node_modules/lodash/_stackGet.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackGet.js ***!
  \******************************************/
(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ },

/***/ "./node_modules/lodash/_stackHas.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackHas.js ***!
  \******************************************/
(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ },

/***/ "./node_modules/lodash/_stackSet.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_stackSet.js ***!
  \******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "./node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "./node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ },

/***/ "./node_modules/lodash/_stringToPath.js"
/*!**********************************************!*\
  !*** ./node_modules/lodash/_stringToPath.js ***!
  \**********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "./node_modules/lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ },

/***/ "./node_modules/lodash/_toKey.js"
/*!***************************************!*\
  !*** ./node_modules/lodash/_toKey.js ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ },

/***/ "./node_modules/lodash/_toSource.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/_toSource.js ***!
  \******************************************/
(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ },

/***/ "./node_modules/lodash/eq.js"
/*!***********************************!*\
  !*** ./node_modules/lodash/eq.js ***!
  \***********************************/
(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ },

/***/ "./node_modules/lodash/filter.js"
/*!***************************************!*\
  !*** ./node_modules/lodash/filter.js ***!
  \***************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "./node_modules/lodash/_arrayFilter.js"),
    baseFilter = __webpack_require__(/*! ./_baseFilter */ "./node_modules/lodash/_baseFilter.js"),
    baseIteratee = __webpack_require__(/*! ./_baseIteratee */ "./node_modules/lodash/_baseIteratee.js"),
    isArray = __webpack_require__(/*! ./isArray */ "./node_modules/lodash/isArray.js");

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index|key, collection).
 *
 * **Note:** Unlike `_.remove`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see _.reject
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 *
 * // Combining several predicates using `_.overEvery` or `_.overSome`.
 * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
 * // => objects for ['fred', 'barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;


/***/ },

/***/ "./node_modules/lodash/get.js"
/*!************************************!*\
  !*** ./node_modules/lodash/get.js ***!
  \************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "./node_modules/lodash/_baseGet.js");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ },

/***/ "./node_modules/lodash/hasIn.js"
/*!**************************************!*\
  !*** ./node_modules/lodash/hasIn.js ***!
  \**************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseHasIn = __webpack_require__(/*! ./_baseHasIn */ "./node_modules/lodash/_baseHasIn.js"),
    hasPath = __webpack_require__(/*! ./_hasPath */ "./node_modules/lodash/_hasPath.js");

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

module.exports = hasIn;


/***/ },

/***/ "./node_modules/lodash/identity.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/identity.js ***!
  \*****************************************/
(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ },

/***/ "./node_modules/lodash/isArguments.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/isArguments.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "./node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ },

/***/ "./node_modules/lodash/isArray.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/isArray.js ***!
  \****************************************/
(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ },

/***/ "./node_modules/lodash/isArrayLike.js"
/*!********************************************!*\
  !*** ./node_modules/lodash/isArrayLike.js ***!
  \********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "./node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "./node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ },

/***/ "./node_modules/lodash/isBuffer.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isBuffer.js ***!
  \*****************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "./node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ },

/***/ "./node_modules/lodash/isFunction.js"
/*!*******************************************!*\
  !*** ./node_modules/lodash/isFunction.js ***!
  \*******************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ },

/***/ "./node_modules/lodash/isLength.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isLength.js ***!
  \*****************************************/
(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ },

/***/ "./node_modules/lodash/isObject.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ },

/***/ "./node_modules/lodash/isObjectLike.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ },

/***/ "./node_modules/lodash/isSymbol.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ },

/***/ "./node_modules/lodash/isTypedArray.js"
/*!*********************************************!*\
  !*** ./node_modules/lodash/isTypedArray.js ***!
  \*********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "./node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "./node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "./node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ },

/***/ "./node_modules/lodash/keys.js"
/*!*************************************!*\
  !*** ./node_modules/lodash/keys.js ***!
  \*************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "./node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ },

/***/ "./node_modules/lodash/memoize.js"
/*!****************************************!*\
  !*** ./node_modules/lodash/memoize.js ***!
  \****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "./node_modules/lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ },

/***/ "./node_modules/lodash/property.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/property.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseProperty = __webpack_require__(/*! ./_baseProperty */ "./node_modules/lodash/_baseProperty.js"),
    basePropertyDeep = __webpack_require__(/*! ./_basePropertyDeep */ "./node_modules/lodash/_basePropertyDeep.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "./node_modules/lodash/_isKey.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "./node_modules/lodash/_toKey.js");

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = property;


/***/ },

/***/ "./node_modules/lodash/stubArray.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/stubArray.js ***!
  \******************************************/
(module) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ },

/***/ "./node_modules/lodash/stubFalse.js"
/*!******************************************!*\
  !*** ./node_modules/lodash/stubFalse.js ***!
  \******************************************/
(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ },

/***/ "./node_modules/lodash/toString.js"
/*!*****************************************!*\
  !*** ./node_modules/lodash/toString.js ***!
  \*****************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(/*! ./_baseToString */ "./node_modules/lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ },

/***/ "./node_modules/react-dom/client.js"
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
(__unused_webpack_module, exports, __webpack_require__) {

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


/***/ },

/***/ "./resources/src/jsx/components/plugins-list/hooks/use-dashboard-preferences.js"
/*!**************************************************************************************!*\
  !*** ./resources/src/jsx/components/plugins-list/hooks/use-dashboard-preferences.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   readPreferences: () => (/* binding */ readPreferences),
/* harmony export */   useDashboardPreferences: () => (/* binding */ useDashboardPreferences)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Browser preferences scoped to the current site and user.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */


const storageKey = () => `pp-hub-dashboard:${window.ppHubPluginsDashboardConfig?.preferencesKey || 'default'}`;

const readPreferences = () => {
    try {
        const saved = JSON.parse(window.localStorage.getItem(storageKey())) || {};
        return {
            layout: saved.layout === 'cards' ? 'cards' : 'list',
            grouped: saved.grouped !== false,
            favorites: Array.isArray(saved.favorites) ? saved.favorites.filter(slug => typeof slug === 'string') : [],
        };
    } catch {
        return { layout: 'list', grouped: true, favorites: [] };
    }
};

const useDashboardPreferences = () => {
    const [preferences, setPreferences] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(readPreferences);
    const updatePreferences = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((changes) => {
        setPreferences(previous => {
            const next = { ...previous, ...changes };
            try {
                window.localStorage.setItem(storageKey(), JSON.stringify(next));
            } catch {
                // The controls still work when browser storage is unavailable.
            }
            return next;
        });
    }, []);
    const toggleFavorite = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((slug) => {
        setPreferences(previous => {
            const favorites = previous.favorites.includes(slug)
                ? previous.favorites.filter(item => item !== slug)
                : [...previous.favorites, slug];
            const next = { ...previous, favorites };
            try {
                window.localStorage.setItem(storageKey(), JSON.stringify(next));
            } catch {
                // Keep the current session usable without browser storage.
            }
            return next;
        });
    }, []);
    return { preferences, updatePreferences, toggleFavorite };
};


/***/ },

/***/ "./resources/src/jsx/utils/apiReady.js"
/*!*********************************************!*\
  !*** ./resources/src/jsx/utils/apiReady.js ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apiReady: () => (/* binding */ apiReady),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * API ready.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\utils
 * @author PublishPress
 * @copyright Copyright (c) 2025, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

function apiReady() {
    return new Promise((resolve) => {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            // Small delay to ensure REST API routes are registered
            setTimeout( resolve, 100 );
        } else {
            document.addEventListener( "DOMContentLoaded", function() {
                setTimeout( resolve, 100 );
            } );
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiReady);


/***/ },

/***/ "./resources/src/jsx/utils/themeController.js"
/*!****************************************************!*\
  !*** ./resources/src/jsx/utils/themeController.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
module.exports = ReactDOM;

/***/ },

/***/ "@publishpress-hub/i18n"
/*!***************************************!*\
  !*** external "publishpressHub.i18n" ***!
  \***************************************/
(module) {

"use strict";
module.exports = publishpressHub.i18n;

/***/ },

/***/ "@wordpress/api-fetch"
/*!******************************!*\
  !*** external "wp.apiFetch" ***!
  \******************************/
(module) {

"use strict";
module.exports = wp.apiFetch;

/***/ },

/***/ "@wordpress/components"
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
(module) {

"use strict";
module.exports = wp.components;

/***/ },

/***/ "@wordpress/data"
/*!**************************!*\
  !*** external "wp.data" ***!
  \**************************/
(module) {

"use strict";
module.exports = wp.data;

/***/ },

/***/ "@wordpress/data-controls"
/*!**********************************!*\
  !*** external "wp.dataControls" ***!
  \**********************************/
(module) {

"use strict";
module.exports = wp.dataControls;

/***/ },

/***/ "@wordpress/element"
/*!*****************************!*\
  !*** external "wp.element" ***!
  \*****************************/
(module) {

"use strict";
module.exports = wp.element;

/***/ },

/***/ "./node_modules/classnames/index.js"
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
(module, exports) {

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


/***/ },

/***/ "./node_modules/@wordpress/escape-html/build-module/escape-greater.mjs"
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/escape-html/build-module/escape-greater.mjs ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
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

"use strict";
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
/******/ 			id: moduleId,
/******/ 			loaded: false,
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
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./resources/src/jsx/plugins-dashboard.jsx ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_pages_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pages/plugins-dashboard */ "./resources/src/jsx/components/pages/plugins-dashboard.jsx");
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stores/plugins-dashboard */ "./resources/src/jsx/stores/plugins-dashboard/index.jsx");
/* harmony import */ var _utils_themeController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/themeController */ "./resources/src/jsx/utils/themeController.js");
/**
 * Plugins dashboard.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






var _ref = window.ppHubPluginsDashboardConfig || {},
  apiNonce = _ref.apiNonce;
var pluginsDashboardContainer = document.getElementById('publishpress-hub-plugins-dashboard-container');
if (pluginsDashboardContainer) {
  // Ensure REST requests use a nonce (prevents CSRF for cookie-authenticated requests).
  if (apiNonce) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().createNonceMiddleware(apiNonce));
  }
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(pluginsDashboardContainer);
  root.render(/*#__PURE__*/React.createElement(_components_pages_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__.PluginsDashboard, null));
  var currentTheme = (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_4__.getCurrentTheme)();
  (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_4__.setTheme)(currentTheme);
}
})();

/******/ })()
;
//# sourceMappingURL=plugins-dashboard.js.map
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


const AdminPageContainer = ({
  className = '',
  variant = 'contained',
  // 'contained' | 'fullwidth'
  children
}) => {
  const baseClass = 'pp-hub-admin-page-container';
  const variantClass = `pp-hub-${variant}`;
  const combinedClassName = `${baseClass} ${variantClass} pp-hub-root ${className}`.trim();
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



const FooterComponent = ({
  pluginSlug,
  pluginName,
  pluginDocumentationUrl,
  pluginAboutUrl,
  pluginSupportUrl,
  logoUrl
}) => {
  const stars = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => Array(5).fill('<span class="dashicons dashicons-star-filled" aria-hidden="true"></span>').join(''), []);
  return /*#__PURE__*/React.createElement("footer", {
    className: "pp-hub-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-footer-rating"
  }, /*#__PURE__*/React.createElement("a", {
    href: `//wordpress.org/support/plugin/${pluginSlug}/reviews/#new-post`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, /*#__PURE__*/React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(/* translators: %s is the plugin name, %s is the rating */
      (0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_0__.escapeHTML)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('If you like %s please leave us a %s rating. Thank you!', 'publishpress-hub')), `<strong>${(0,_wordpress_escape_html__WEBPACK_IMPORTED_MODULE_0__.escapeHTML)(pluginName)}</strong>,`, `<span className="pp-hub-footer-stars">${stars}</span>`)
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
const Footer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(FooterComponent);

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
const BASE_HEADER_CLASS = "pp-hub-admin-page-header";
const COMPACT_HEADER_CLASS = "pp-hub-admin-page-header pp-hub-admin-page-header--compact";
const LOGO_ALT_TEXT = "PublishPress";
const LOGO_TEXT = "Hub";
const AdminPageHeaderComponent = ({
  logoUrl,
  children,
  compact = false
}) => {
  // Memoize the header class computation
  const headerClass = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
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
const AdminPageHeader = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(AdminPageHeaderComponent);
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



const AdminPageLayout = ({
  title,
  logoUrl,
  children,
  titleChildren
}) => {
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


const BadgeComponent = ({
  className,
  children,
  icon
}) => {
  return /*#__PURE__*/React.createElement("span", {
    className: `pp-hub-badge ${className}`
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-badge-icon",
    "aria-hidden": "true"
  }, icon), children);
};
const Badge = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(BadgeComponent);
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\buttons
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */



const DEFAULT_TARGET = '_blank';
const DEFAULT_REL = 'noopener noreferrer';
const ButtonComponent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  variant,
  icon,
  onClick,
  href,
  target,
  rel,
  className,
  disabled,
  title,
  style,
  children,
  isFullWidth,
  isLoading,
  spinnerPosition = 'right',
  ...restProps
}, ref) => {
  const targetValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return target || (href ? DEFAULT_TARGET : undefined);
  }, [target, href]);
  const relValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
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
  const buttonClassName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    let variantClassName = '';
    if (variant === 'highlight') {
      variantClassName = 'is-highlight';
    }
    if (variant === 'danger') {
      variantClassName = 'is-danger';
    }
    return `pp-hub-button ${variantClassName} ${className ? className : ''} ${isFullWidth ? 'is-full-width' : ''} ${spinnerPosition === 'left' ? 'is-link-left' : ''}`;
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
    disabled: disabled || isLoading
    // Keep a loading button focusable so keyboard focus is not dropped to <body>
    // while the action runs or when a modal returns focus to it (WCAG 2.4.3).
    ,
    accessibleWhenDisabled: isLoading || undefined,
    "aria-busy": isLoading || undefined,
    title: title,
    style: style
  }, restProps), children);
});
ButtonComponent.displayName = 'Button';

// Memoize the component to prevent unnecessary re-renders
const Button = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(ButtonComponent);
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




const FilterButtonsBarComponent = ({
  options,
  selectedOption,
  onChange,
  children,
  className = ''
}) => {
  // Early returns for better performance
  if (!options || !options.length) {
    return null;
  }

  // Use the first option as default if none selected
  const activeSelectedOption = selectedOption || options[0].value;

  // Memoize the select change handler
  const handleSelectChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => {
    onChange(e.target.value);
  }, [onChange]);

  // Memoize the button click handler factory
  const createButtonClickHandler = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(value => () => {
    onChange(value);
  }, [onChange]);
  return /*#__PURE__*/React.createElement("div", {
    className: `publishpress-hub-filter-container ${className}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-mobile"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "pp-hub-plugin-filter",
    className: "publishpress-hub-filter-label-sr"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter plugins by status', 'publishpress-hub')), /*#__PURE__*/React.createElement("select", {
    id: "pp-hub-plugin-filter",
    className: "publishpress-hub-filter-select",
    value: activeSelectedOption,
    onChange: handleSelectChange
  }, options.map(filter => /*#__PURE__*/React.createElement("option", {
    key: filter.value,
    value: filter.value
  }, filter.label, " (", filter.total, ")")))), /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-desktop"
  }, /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-buttons-bar",
    role: "group",
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter plugins by status', 'publishpress-hub')
  }, options.map(filter => {
    const isSelected = activeSelectedOption === filter.value;
    const buttonClass = isSelected ? 'active' : '';
    const isDisabled = !filter.total;
    return /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_1__.Button, {
      key: `filter-${filter.value}`,
      className: `publishpress-hub-filter-button ${buttonClass} ${isDisabled ? 'disabled' : ''}`,
      onClick: createButtonClickHandler(filter.value),
      disabled: filter.total === 0,
      "aria-pressed": isSelected
    }, filter.label, " ", filter.total > 0 && `(${filter.total})`);
  }), children)));
};

// Memoize the component to prevent unnecessary re-renders
const FilterButtonsBar = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(FilterButtonsBarComponent);
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



const MessageComponent = ({
  children,
  className,
  variant
}) => {
  const classes = classnames__WEBPACK_IMPORTED_MODULE_1___default()('pp-hub-message', className, {
    'is-error': variant === 'error',
    'is-success': variant === 'success',
    'is-warning': variant === 'warning',
    'is-info': variant === 'info'
  });
  // Store errors are already announced by WordPress notices; avoid speaking the modal copy twice.
  const role = variant === 'error' ? undefined : 'status';
  return /*#__PURE__*/React.createElement("div", {
    className: classes,
    role: role
  }, children);
};
const Message = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(MessageComponent);

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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Modal.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\modal
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




const ModalComponent = ({
  children,
  ...props
}) => {
  const {
    className,
    ...rest
  } = props;
  const classes = classnames__WEBPACK_IMPORTED_MODULE_2___default()('pp-hub-modal', className);
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, _extends({}, rest, {
    className: classes
  }), children);
};
const Modal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(ModalComponent);

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
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
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
 * WordPress dependencies
 */


function NoticesList() {
  const {
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('core/notices');
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select('core/notices').getNotices(), []);
  const dismissibleNotices = notices.filter(notice => notice.isDismissible && notice.type === 'default');
  const nonDismissibleNotices = notices.filter(notice => !notice.isDismissible && notice.type === 'default');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.NoticeList, {
    notices: nonDismissibleNotices,
    className: "pp-hub-notices-list"
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.NoticeList, {
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
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
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
 * WordPress dependencies
 */


const SnackbarList = () => {
  const {
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('core/notices');
  const notices = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select('core/notices').getNotices(), []);
  const snackbarNotices = notices.filter(notice => notice.type === 'snackbar');
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SnackbarList, {
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
/**
 * Use license expiration warning hook.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





const DAYS_UNTIL_EXPIRATION = 30;
const RENEW_NOW_URL = 'https://publishpress.com/links/hub-renew-now';
const API_NAMESPACE = '/publishpress-hub/v1';

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
const useLicenseExpirationWarning = (plugins, daysUntilExpiration = DAYS_UNTIL_EXPIRATION) => {
  const {
    createNotice,
    removeNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)('core/notices');
  const [dismissalStatus, setDismissalStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    expired: false,
    expiring: false
  });

  // Fetch dismissal status on mount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchDismissalStatus = async () => {
      try {
        const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
          path: `${API_NAMESPACE}/license-notices/dismissal-status`,
          method: 'GET'
        });
        setDismissalStatus(response.dismissalStatus || {
          expired: false,
          expiring: false
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching dismissal status:', error);
      }
    };
    fetchDismissalStatus();
  }, []);

  // Handle notice dismissal
  const handleNoticeDismiss = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async noticeType => {
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: `${API_NAMESPACE}/license-notices/dismiss`,
        method: 'POST',
        data: {
          noticeType
        }
      });

      // Update local dismissal status
      setDismissalStatus(prev => ({
        ...prev,
        [noticeType]: true
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error dismissing notice:', error);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const expiringPlugins = [];
    const expiredPlugins = [];
    (plugins || []).forEach(plugin => {
      // Check for expired licenses using the isExpired flag from license services
      // This takes priority over expiring licenses
      if (plugin.proPlugin.isInstalled && plugin.proPlugin.isExpired) {
        expiredPlugins.push({
          name: plugin.proPlugin.name,
          expirationDate: plugin.proPlugin.licenseExpirationDateFormatted || plugin.proPlugin.licenseExpirationDate || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('N/A', 'publishpress-hub'),
          detailsUrl: plugin.proPlugin.detailsUrl
        });
      }
      // Check for licenses expiring within the specified days
      // Use daysUntilExpiration from the plugin data (calculated by backend)
      // Only check if not already expired
      else if (plugin.proPlugin.isInstalled && plugin.proPlugin.isLicensed && !plugin.proPlugin.isExpired && plugin.proPlugin.daysUntilExpiration !== undefined && plugin.proPlugin.daysUntilExpiration >= 0 && plugin.proPlugin.daysUntilExpiration <= daysUntilExpiration) {
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
      const pluginsByDate = {};
      expiredPlugins.forEach(plugin => {
        const date = plugin.expirationDate;
        if (!pluginsByDate[date]) {
          pluginsByDate[date] = [];
        }
        pluginsByDate[date].push(plugin);
      });

      // Build message with grouped plugins
      const dateGroups = Object.keys(pluginsByDate).map(date => {
        const plugins = pluginsByDate[date];
        const pluginNames = plugins.map(p => `<strong>${p.name}</strong>`).join(', ');
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
      const baseMessage = dateGroups.join('. ') + '.';

      // Add single renewal link (use dashboard subscriptions URL)
      const renewLink = `<a href="${RENEW_NOW_URL}" target="_blank" rel="noopener noreferrer" class="pp-hub-renew-link">${(0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Renew now', 'publishpress-hub')}</a>`;
      const message = baseMessage + ' ' + renewLink;
      createNotice('error', message, {
        id: 'pp-hub-license-expired-warning',
        isDismissible: false,
        __unstableHTML: true
      });
    }

    // Display expiring license notice (warning level)
    if (expiringPlugins.length > 0 && !dismissalStatus.expiring) {
      // Group plugins by expiration date
      const pluginsByDate = {};
      expiringPlugins.forEach(plugin => {
        const date = plugin.expirationDate;
        if (!pluginsByDate[date]) {
          pluginsByDate[date] = [];
        }
        pluginsByDate[date].push(plugin);
      });

      // Build message with grouped plugins
      const dateGroups = Object.keys(pluginsByDate).map(date => {
        const plugins = pluginsByDate[date];
        const pluginNames = plugins.map(p => p.name).join(', ');
        const daysRemaining = plugins[0].daysUntilExpiration; // All plugins in group have same days remaining

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
      const baseMessage = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Warning:', 'publishpress-hub') + ' ' + dateGroups.join('. ') + '.';

      // Add single renewal link (use dashboard subscriptions URL)
      const renewLink = `<a href="${RENEW_NOW_URL}" target="_blank" rel="noopener noreferrer" class="pp-hub-renew-link">${(0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Renew now', 'publishpress-hub')}</a>`;
      const message = baseMessage + '<br/>' + renewLink;
      createNotice('warning', message, {
        id: 'pp-hub-license-expiration-warning',
        isDismissible: true,
        __unstableHTML: true,
        onDismiss: () => handleNoticeDismiss('expiring')
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
/* harmony import */ var _notices_NoticesList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../notices/NoticesList */ "./resources/src/jsx/components/notices/NoticesList.jsx");
/* harmony import */ var _notices_SnackbarList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../notices/SnackbarList */ "./resources/src/jsx/components/notices/SnackbarList.jsx");
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../tooltip */ "./resources/src/jsx/components/tooltip/index.jsx");
/* harmony import */ var _hooks_use_license_expiration_warning__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./hooks/use-license-expiration-warning */ "./resources/src/jsx/components/pages/hooks/use-license-expiration-warning.jsx");
/**
 * Plugins dashboard.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */













const {
  logoUrl,
  pluginIconBaseUrl
} = window.ppHubPluginsDashboardConfig;

// Optimize selector by splitting into focused selectors
const selectPluginsDashboardData = select => {
  const storeSelect = select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store);
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
const createFilterOptions = filterCounts => [{
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'publishpress-hub'),
  value: 'all',
  total: filterCounts.all
}, {
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlicensed', 'publishpress-hub'),
  value: 'unlicensed',
  total: filterCounts.unlicensed
}, {
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Expired', 'publishpress-hub'),
  value: 'expired',
  total: filterCounts.expired
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
const PluginsDashboardComponent = () => {
  const {
    selectedFilter,
    filterCounts,
    plugins,
    allPlugins,
    isLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(selectPluginsDashboardData, []);
  const {
    setSelectedFilter,
    fetchPlugins
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store);
  const handleFilterChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(selectedFilter => {
    setSelectedFilter(selectedFilter);
  }, [setSelectedFilter]);

  // Optimize filterOptions memoization with stable reference
  const filterOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return createFilterOptions(filterCounts);
  }, [filterCounts.expired, filterCounts.all, filterCounts.unlicensed, filterCounts.active, filterCounts.inactive, filterCounts.notInstalled, filterCounts.updatesAvailable]);

  // Fetch plugins only once on mount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    fetchPlugins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Check for licenses expiring within the specified days
  (0,_hooks_use_license_expiration_warning__WEBPACK_IMPORTED_MODULE_11__.useLicenseExpirationWarning)(allPlugins, 30);
  const [isAltPressed, setIsAltPressed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(false);

  // Track ALT key state
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const handleKeyDown = event => {
      if (event.key === 'Alt' || event.altKey) {
        setIsAltPressed(true);
      }
    };
    const handleKeyUp = event => {
      if (event.key === 'Alt' || !event.altKey) {
        setIsAltPressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  const handleRefresh = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    fetchPlugins(isAltPressed);
  }, [fetchPlugins, isAltPressed]);
  const refreshButtonTooltip = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('To force a refresh, hold Option on Mac or Alt on Windows and then click Refresh.', 'publishpress-hub');
  }, []);
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_3__.AdminPageLayout, {
    logoUrl: logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-dashboard"
  }, /*#__PURE__*/React.createElement(_notices_NoticesList__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-dashboard-heading"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Plugins & Features', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate, open, and license each product directly from the Hub.', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_tooltip__WEBPACK_IMPORTED_MODULE_10__.Tooltip, {
    text: refreshButtonTooltip,
    placement: "top"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_9__.Button, {
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
  }), /*#__PURE__*/React.createElement(_notices_SnackbarList__WEBPACK_IMPORTED_MODULE_8__["default"], null)));
};
const PluginsDashboard = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(PluginsDashboardComponent);

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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Action button.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




const ACTION_BUTTON_CONFIGS = {
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
const ActionButtonComponent = ({
  pluginFamily,
  inProgress,
  disabled = false,
  onInstall,
  onUpgradeToPro,
  onManageLicense,
  onActivateLicense,
  onResolveConflict,
  onUpdate
}) => {
  const getButtonProps = () => {
    if (pluginFamily.hasConflictingInstallations) {
      return {
        ...ACTION_BUTTON_CONFIGS.conflict,
        onClick: () => onResolveConflict(pluginFamily)
      };
    }
    if (!pluginFamily.hasAnyVersionInstalled) {
      return {
        ...ACTION_BUTTON_CONFIGS.install,
        onClick: () => onInstall(pluginFamily)
      };
    }
    if (!pluginFamily.proPlugin.isInstalled) {
      return {
        ...ACTION_BUTTON_CONFIGS.upgradeToPro,
        onClick: () => onUpgradeToPro(pluginFamily)
      };
    }
    if (pluginFamily.proPlugin.isInstalled && !pluginFamily.proPlugin.isLicensed) {
      return {
        ...ACTION_BUTTON_CONFIGS.activateLicense,
        onClick: () => onActivateLicense(pluginFamily)
      };
    }
    return {
      ...ACTION_BUTTON_CONFIGS.manageLicense,
      onClick: () => onManageLicense(pluginFamily)
    };
  };
  const buttonProps = getButtonProps();
  if (inProgress) {
    buttonProps.isLoading = true;
    buttonProps.text = buttonProps.loadingtext;
  }
  return /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, _extends({}, buttonProps, {
    disabled: disabled || inProgress
  }));
};
ActionButtonComponent.displayName = 'ActionButton';
const ActionButton = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ActionButtonComponent);

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



const getPluginWarning = slug => {
  switch (slug) {
    case 'statuses':
      return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Deactivating PublishPress Statuses stops registering its custom post statuses. Content using those statuses may become unavailable, and parts of your site may stop working until the plugin is active again.', 'publishpress-hub');
    default:
      return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Deactivating this plugin disables its features and may affect content or workflows that depend on it.', 'publishpress-hub');
  }
};
const DeactivationWarning = ({
  pluginFamily,
  isConflict = false,
  isUninstall = false
}) => /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_1__.Message, {
  variant: "warning"
}, isUninstall ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Uninstalling deletes the plugin files and may also delete its saved settings or data. Its features will no longer be available. Back up your site before continuing.', 'publishpress-hub')), pluginFamily.slug === 'statuses' && /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Without PublishPress Statuses, its custom post statuses are no longer registered. Content using those statuses may become unavailable, and parts of your site may stop working until the plugin is installed and active again.', 'publishpress-hub'))) : /*#__PURE__*/React.createElement("p", null, getPluginWarning(pluginFamily.slug)), isConflict && /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Resolving this conflict can deactivate the plugin while switching versions. If the version you keep cannot be activated, the plugin may remain disabled. Check that it is active after resolving the conflict.', 'publishpress-hub')));

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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
const LicenseKeyControlComponent = ({
  autoFocus = true,
  onEnterKeyDown,
  value,
  onChange,
  placeholder,
  className,
  onFocusReady,
  ...restProps
}) => {
  const [textControlRef, setFocus] = (0,_hooks_use_focus_on_action__WEBPACK_IMPORTED_MODULE_2__.useFocusOnAction)(autoFocus);

  // Expose setFocus function to parent component
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (onFocusReady && setFocus) {
      onFocusReady(setFocus);
    }
  }, [onFocusReady, setFocus]);
  const handleKeyDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(event => {
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
const LicenseKeyControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(LicenseKeyControlComponent);

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






const ModalConfirmationComponent = ({
  onClose,
  onConfirm,
  onCancel,
  title,
  message,
  children,
  error,
  isDanger,
  buttonInProgress = false,
  confirmLabel
}) => {
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
    onClick: () => onConfirm()
  }, confirmLabel || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Continue', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    isFullWidth: true,
    icon: "no",
    disabled: buttonInProgress,
    onClick: () => onCancel()
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'publishpress-hub'))));
};
const ModalConfirmation = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalConfirmationComponent);

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





const ModalInstallationTypeComponent = ({
  onClose,
  onProClick,
  onFreeClick,
  freeDetailsUrl,
  proDetailsUrl,
  changelogUrl,
  title
}) => {
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install Plugin', 'publishpress-hub'),
    className: "pp-hub-modal-installation-type",
    onRequestClose: () => onClose()
  }, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select how you would like to install this plugin. You can install the Pro version if you have a license, or the Free version to get started.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-modal-inline-links"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: freeDetailsUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free Details', 'publishpress-hub')), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "|"), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: proDetailsUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro Details', 'publishpress-hub')), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "|"), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: changelogUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Changelogs', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    icon: "unlock",
    onClick: () => onProClick()
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('I have a license, install the Pro version', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    icon: "download",
    onClick: () => onFreeClick()
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('I don\'t have a license, install the Free version', 'publishpress-hub')));
};
const ModalInstallationType = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalInstallationTypeComponent);

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
/**
 * Modal license input.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */








const ModalLicenseInputComponent = ({
  onClose,
  onActivate,
  onUseExistingLicense,
  error,
  buttonInProgress,
  title,
  buttonLabel,
  showApplyToAll = false,
  hasExistingLicense = false
}) => {
  const [licenseKey, setLicenseKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [applyToAll, setApplyToAll] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [activationAttempted, setActivationAttempted] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const setFocusRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const handleFocusReady = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(setFocus => {
    setFocusRef.current = setFocus;
  }, []);
  const handleActivate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setActivationAttempted(true);
    onActivate(licenseKey, applyToAll);
  }, [onActivate, licenseKey, applyToAll]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (activationAttempted && error && setFocusRef.current) {
      setTimeout(() => {
        setFocusRef.current();
      }, 100);
    }
  }, [activationAttempted, error]);
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_5__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enter your license key', 'publishpress-hub'),
    className: "pp-hub-modal-license-input",
    onRequestClose: () => onClose()
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
    onChange: value => setLicenseKey(value),
    autoFocus: true,
    onEnterKeyDown: handleActivate,
    onFocusReady: handleFocusReady
  }), showApplyToAll && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this license key for all PublishPress plugins', 'publishpress-hub'),
    checked: applyToAll,
    onChange: value => setApplyToAll(value)
  }), error && /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_4__.Message, {
    variant: "error"
  }, error.message), hasExistingLicense && onUseExistingLicense && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    icon: "check",
    onClick: () => onUseExistingLicense(),
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use existing license key', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "primary",
    icon: "check",
    onClick: handleActivate,
    isLoading: buttonInProgress
  }, buttonLabel || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate and install the plugin', 'publishpress-hub')));
};
const ModalLicenseInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalLicenseInputComponent);

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
/**
 * Modal license management.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */








const ACTIONS = {
  EDIT: 'edit',
  VIEW: 'view'
};
const ModalLicenseManagementComponent = ({
  onClose,
  onActivate,
  onDeactivate,
  onReuseLicenseForAll,
  error,
  buttonInProgress,
  initialLicenseKeyMasked,
  hasLicenseKey,
  isLicenseKeyFromConstant,
  title
}) => {
  const [licenseKey, setLicenseKey] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [applyToAll, setApplyToAll] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [currentAction, setCurrentAction] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(hasLicenseKey ? ACTIONS.VIEW : ACTIONS.EDIT);
  const [activationAttempted, setActivationAttempted] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const setFocusRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const handleFocusReady = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(setFocus => {
    setFocusRef.current = setFocus;
  }, []);
  const handleActivate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setActivationAttempted(true);
    onActivate(licenseKey, applyToAll);
  }, [onActivate, licenseKey, applyToAll]);
  const handleSwitchToEdit = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setLicenseKey('');
    setCurrentAction(ACTIONS.EDIT);
    // Focus the input after switching to edit mode
    setTimeout(() => {
      if (setFocusRef.current) {
        setFocusRef.current();
      }
    }, 100);
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (activationAttempted && error && setFocusRef.current) {
      setTimeout(() => {
        setFocusRef.current();
      }, 100);
    }
  }, [activationAttempted, error]);
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_5__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manage your license', 'publishpress-hub'),
    className: "pp-hub-modal-license-input",
    onRequestClose: () => onClose()
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
    onChange: value => setLicenseKey(value),
    autoFocus: true,
    onEnterKeyDown: handleActivate,
    onFocusReady: handleFocusReady
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this license key for all PublishPress plugins', 'publishpress-hub'),
    checked: applyToAll,
    onChange: value => setApplyToAll(value)
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
    onClick: () => onReuseLicenseForAll(),
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use this license key for all PublishPress plugins', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, {
    variant: "secondary",
    icon: "trash",
    onClick: () => onDeactivate(),
    isLoading: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate the license key for this site', 'publishpress-hub'))));
};
const ModalLicenseManagement = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalLicenseManagementComponent);

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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Modal renderer.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */












const ModalRendererComponent = ({
  modalManager,
  pluginActions,
  currentPluginState,
  selectedPluginForConflictResolution,
  pluginResolveConflictInProgress
}) => {
  const {
    activeModal,
    currentPluginFamily,
    closeModal,
    isModalActive,
    MODAL_TYPES,
    currentPluginDisplayName
  } = modalManager;
  const {
    handleInstallFree,
    handleInstallPro,
    handleUpgradePluginToPro,
    handleUninstallPlugin,
    handleConfirmDeactivatePlugin,
    handleResolveConflictAction,
    handleBuyPlugin,
    handleDeactivateLicense,
    handleActivateLicense,
    handleReuseLicenseForAllPlugins
  } = pluginActions;
  const {
    cleanupError
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_3__.store);
  const plugins = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_3__.store).getPlugins(), []);
  const currentProPluginDisplayName = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const proPluginName = currentPluginFamily?.proPlugin?.name;
    if (proPluginName) {
      return proPluginName;
    }
    const basePluginName = (currentPluginDisplayName || '').replace(/\s+Free$/i, '').replace(/\s+Pro$/i, '');
    return basePluginName ? `${basePluginName} Pro` : '';
  }, [currentPluginFamily, currentPluginDisplayName]);
  const processedError = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!currentPluginState.error) return null;
    const error = {
      ...currentPluginState.error
    };
    if (error?.context?.error_message && error.message !== error.context.error_message) {
      error.message = `${error.message} ${error.context.error_message}`;
    }
    return error;
  }, [currentPluginState.error]);
  const hasExistingLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return currentPluginFamily?.proPlugin?.hasLicenseKey || plugins.some(pluginFamily => pluginFamily.slug !== currentPluginFamily?.slug && pluginFamily.proPlugin?.hasLicenseKey && !pluginFamily.proPlugin?.isLicenseKeyFromConstant);
  }, [plugins, currentPluginFamily]);
  const modalProps = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const hasActiveModal = currentPluginFamily && activeModal !== MODAL_TYPES.NONE;
    return {
      onClose: () => {
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
    onProClick: () => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO, currentPluginFamily),
    onFreeClick: () => handleInstallFree(currentPluginFamily.slug),
    freeDetailsUrl: currentPluginFamily.freeDetailsUrl,
    proDetailsUrl: currentPluginFamily.proDetailsUrl,
    changelogUrl: currentPluginFamily.changelogUrl
  })), isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO) && /*#__PURE__*/React.createElement(_modal_license_input__WEBPACK_IMPORTED_MODULE_6__.ModalLicenseInput, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Install %s', 'publishpress-hub'), currentProPluginDisplayName),
    onActivate: (licenseKey, applyToAll) => handleInstallPro(currentPluginFamily.slug, licenseKey, applyToAll),
    onUseExistingLicense: () => handleInstallPro(currentPluginFamily.slug, '', false, true),
    showApplyToAll: true,
    hasExistingLicense: hasExistingLicense
  })), isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE) && /*#__PURE__*/React.createElement(_modal_license_input__WEBPACK_IMPORTED_MODULE_6__.ModalLicenseInput, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upgrade %s', 'publishpress-hub'), currentProPluginDisplayName),
    onActivate: (licenseKey, applyToAll) => handleUpgradePluginToPro(currentPluginFamily.slug, licenseKey, applyToAll),
    onUseExistingLicense: () => handleUpgradePluginToPro(currentPluginFamily.slug, '', false, true),
    showApplyToAll: true,
    hasExistingLicense: hasExistingLicense
  })), isModalActive(MODAL_TYPES.DEACTIVATE_CONFIRMATION) && /*#__PURE__*/React.createElement(_modal_confirmation__WEBPACK_IMPORTED_MODULE_4__.ModalConfirmation, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate %s', 'publishpress-hub'), currentPluginDisplayName),
    message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to deactivate %s?', 'publishpress-hub'), currentPluginDisplayName),
    confirmLabel: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate plugin', 'publishpress-hub'),
    isDanger: true,
    onConfirm: () => handleConfirmDeactivatePlugin(currentPluginFamily),
    onCancel: modalProps.onClose
  }), /*#__PURE__*/React.createElement(_deactivation_warning__WEBPACK_IMPORTED_MODULE_10__.DeactivationWarning, {
    pluginFamily: currentPluginFamily
  })), isModalActive(MODAL_TYPES.UNINSTALL_CONFIRMATION) && /*#__PURE__*/React.createElement(_modal_confirmation__WEBPACK_IMPORTED_MODULE_4__.ModalConfirmation, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uninstall %s', 'publishpress-hub'), currentPluginDisplayName),
    message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Are you sure you want to uninstall %s?', 'publishpress-hub'), currentPluginDisplayName),
    confirmLabel: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Uninstall plugin', 'publishpress-hub'),
    isDanger: true,
    onConfirm: () => handleUninstallPlugin(currentPluginFamily.slug),
    onCancel: closeModal
  }), /*#__PURE__*/React.createElement(_deactivation_warning__WEBPACK_IMPORTED_MODULE_10__.DeactivationWarning, {
    pluginFamily: currentPluginFamily,
    isUninstall: true
  })), isModalActive(MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO) && /*#__PURE__*/React.createElement(_modal_upgrade__WEBPACK_IMPORTED_MODULE_9__.ModalUpgrade, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Upgrade %s', 'publishpress-hub'), currentProPluginDisplayName),
    onLicenseClick: () => modalManager.openModal(MODAL_TYPES.LICENSE_INPUT_FOR_UPGRADE, currentPluginFamily),
    onBuyClick: () => handleBuyPlugin(currentPluginFamily.proPlugin.detailsUrl),
    proDetailsUrl: currentPluginFamily.proPlugin.detailsUrl,
    changelogUrl: currentPluginFamily.changelogUrl
  })), isModalActive(MODAL_TYPES.RESOLVE_CONFLICT) && /*#__PURE__*/React.createElement(_modal_resolve_conflict__WEBPACK_IMPORTED_MODULE_8__.ModalResolveConflict, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Resolve Conflict for %s', 'publishpress-hub'), currentPluginDisplayName),
    onKeepFreePlugin: () => handleResolveConflictAction(currentPluginFamily, 'free'),
    onKeepProPlugin: () => handleResolveConflictAction(currentPluginFamily, 'pro'),
    onCancel: closeModal,
    pluginsFamily: currentPluginFamily,
    buttonInProgress: pluginResolveConflictInProgress[currentPluginFamily.slug] || false,
    selectedPluginForConflictResolution: selectedPluginForConflictResolution
  })), isModalActive(MODAL_TYPES.LICENSE_MANAGEMENT) && /*#__PURE__*/React.createElement(_modal_license_management__WEBPACK_IMPORTED_MODULE_7__.ModalLicenseManagement, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manage %s License', 'publishpress-hub'), currentPluginDisplayName),
    onActivate: (licenseKey, applyToAll) => handleActivateLicense(currentPluginFamily, licenseKey, applyToAll),
    onDeactivate: () => handleDeactivateLicense(currentPluginFamily),
    onReuseLicenseForAll: () => handleReuseLicenseForAllPlugins(currentPluginFamily),
    hasLicenseKey: currentPluginFamily.proPlugin.hasLicenseKey,
    initialLicenseKeyMasked: currentPluginFamily.proPlugin.licenseKeyMasked,
    isLicenseKeyFromConstant: currentPluginFamily.proPlugin.isLicenseKeyFromConstant
  })), isModalActive(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE) && /*#__PURE__*/React.createElement(_modal_license_input__WEBPACK_IMPORTED_MODULE_6__.ModalLicenseInput, _extends({}, modalProps, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate %s License', 'publishpress-hub'), currentPluginDisplayName),
    buttonLabel: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate the license key', 'publishpress-hub'),
    onActivate: (licenseKey, applyToAll) => handleActivateLicense(currentPluginFamily, licenseKey, applyToAll),
    showApplyToAll: true
  })));
};
const ModalRenderer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalRendererComponent);

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







const ModalResolveConflictComponent = ({
  onClose,
  onKeepFreePlugin,
  onKeepProPlugin,
  onCancel,
  title,
  message,
  children,
  error,
  pluginsFamily,
  buttonInProgress,
  selectedPluginForConflictResolution
}) => {
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_4__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resolve Plugin Conflict', 'publishpress-hub'),
    className: "pp-hub-modal-resolve-conflict",
    onRequestClose: () => onClose()
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('We have detected both Free and Pro versions of this plugin installed. ' + 'To resolve this conflict, please choose which version you would like to keep. ' + 'The other version will be automatically uninstalled.', 'publishpress-hub')), /*#__PURE__*/React.createElement("ul", {
    className: "pp-hub-list"
  }, /*#__PURE__*/React.createElement("li", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free version: %s (%s)', 'publishpress-hub'), pluginsFamily.freePlugin.name, pluginsFamily.freePlugin.version)), /*#__PURE__*/React.createElement("li", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro version: %s (%s)', 'publishpress-hub'), pluginsFamily.proPlugin.name, pluginsFamily.proPlugin.version)))), /*#__PURE__*/React.createElement(_deactivation_warning__WEBPACK_IMPORTED_MODULE_5__.DeactivationWarning, {
    pluginFamily: pluginsFamily,
    isConflict: true
  }), children, error && /*#__PURE__*/React.createElement(_message_message__WEBPACK_IMPORTED_MODULE_3__.Message, {
    variant: "error"
  }, error.message), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "primary",
    onClick: () => onKeepProPlugin(),
    isLoading: buttonInProgress && selectedPluginForConflictResolution === 'pro',
    disabled: selectedPluginForConflictResolution === 'free',
    icon: "unlock"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keep the Pro version (Recommended)', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    onClick: () => onKeepFreePlugin(),
    isLoading: buttonInProgress && selectedPluginForConflictResolution === 'free',
    disabled: selectedPluginForConflictResolution === 'pro',
    icon: "yes"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Keep the Free version', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    icon: "no",
    onClick: () => onCancel(),
    disabled: buttonInProgress
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Cancel', 'publishpress-hub')));
};
const ModalResolveConflict = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalResolveConflictComponent);

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





const ModalUpgradeComponent = ({
  onClose,
  onLicenseClick,
  onBuyClick,
  proDetailsUrl,
  changelogUrl,
  title
}) => {
  return /*#__PURE__*/React.createElement(_modal__WEBPACK_IMPORTED_MODULE_3__.Modal, {
    title: title || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to Pro', 'publishpress-hub'),
    className: "pp-hub-modal-upgrade",
    onRequestClose: () => onClose()
  }, /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unlock the full potential of this plugin with the Pro version. Enjoy advanced features, priority support, and exclusive benefits designed to help you get the most out of your workflow.', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-modal-inline-links"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: proDetailsUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Discover all Pro features', 'publishpress-hub')), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "|"), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "link",
    href: changelogUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Changelog', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "secondary",
    icon: "unlock",
    onClick: () => onLicenseClick()
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Already have a license? Install Pro now', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__.Button, {
    variant: "highlight",
    icon: "cart",
    onClick: () => onBuyClick()
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Upgrade to Pro', 'publishpress-hub')));
};
const ModalUpgrade = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(ModalUpgradeComponent);

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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Compact plugin card with a persistent action footer.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.1.0
 */





const documentationCategories = {
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
const PluginCard = ({
  pluginFamily,
  iconSrc,
  displayName,
  isFavorite,
  onToggleFavorite,
  actionButtons,
  progressStates,
  onActivate,
  onDeactivate,
  ...actions
}) => {
  const moreRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const menu = moreRef.current;
    if (!menu) return;
    const ownerDocument = menu.ownerDocument;
    const dismissOutside = event => {
      if (menu.open && !menu.contains(event.target)) {
        menu.open = false;
      }
    };
    const dismissOnEscape = event => {
      if (event.key === 'Escape' && menu.open && menu.contains(event.target)) {
        menu.open = false;
        menu.querySelector('summary')?.focus();
        event.stopPropagation();
      }
    };
    ownerDocument.addEventListener('pointerdown', dismissOutside, true);
    menu.addEventListener('keydown', dismissOnEscape);
    return () => {
      ownerDocument.removeEventListener('pointerdown', dismissOutside, true);
      menu.removeEventListener('keydown', dismissOnEscape);
    };
  }, []);
  const busy = Object.values(progressStates).some(Boolean);
  const inProgress = progressStates.isInstalling || progressStates.isUpgrading || progressStates.isResolvingConflict;
  const active = pluginFamily.hasAnyVersionActive;
  const conflict = pluginFamily.hasConflictingInstallations;
  const category = documentationCategories[pluginFamily.slug];
  const documentationUrl = category ? `https://publishpress.com/docs-category/${category}/` : 'https://publishpress.com/knowledge-base/';
  const updateAction = actionButtons.find(button => button.key === 'update');
  const moreActions = actionButtons.filter(button => !['activate', 'deactivate', 'update'].includes(button.key));
  return /*#__PURE__*/React.createElement("article", {
    className: `pp-hub-plugin-card${isFavorite ? ' is-favorite' : ''}${busy ? ' is-busy' : ''}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__header"
  }, /*#__PURE__*/React.createElement("img", {
    className: "pp-hub-plugin-card__icon",
    src: iconSrc,
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__identity"
  }, /*#__PURE__*/React.createElement("h2", null, displayName.replace(/^PublishPress\s+/, '')), /*#__PURE__*/React.createElement("p", null, pluginFamily.description)), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugin-card__controls"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-favorite",
    "aria-pressed": isFavorite,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(isFavorite ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove %s from favorites', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add %s to favorites', 'publishpress-hub'), displayName),
    onClick: () => onToggleFavorite(pluginFamily.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: `dashicons dashicons-star-${isFavorite ? 'filled' : 'empty'}`,
    "aria-hidden": "true"
  })), pluginFamily.hasAnyVersionInstalled && !conflict && /*#__PURE__*/React.createElement("div", {
    className: `pp-hub-plugin-card__activation${active ? ' is-active' : ''}`
  }, /*#__PURE__*/React.createElement("span", null, active ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Active', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inactive', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    checked: active,
    "aria-disabled": busy || undefined,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(active ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate %s', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate %s', 'publishpress-hub'), displayName),
    onChange: value => {
      if (busy) return;
      value ? onActivate(pluginFamily) : onDeactivate(pluginFamily);
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
  }, moreActions.map(({
    key,
    ...button
  }) => button.variant === 'label' ? /*#__PURE__*/React.createElement("span", {
    key: key
  }, button.text) : /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__.Button, _extends({
    key: key
  }, button, {
    disabled: busy
  })))))), (conflict || updateAction || progressStates.isActivating || progressStates.isDeactivating) && /*#__PURE__*/React.createElement("div", {
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
/**
 * Plugin item.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\components
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */










const PluginItemComponent = ({
  pluginFamily,
  layout = 'list',
  isFavorite = false,
  onToggleFavorite,
  pluginIconBaseUrl,
  progressStates,
  onInstall,
  onActivate,
  onDeactivate,
  onUpgradeToPro,
  onManageLicense,
  onActivateLicense,
  onUninstall,
  onResolveConflict,
  onDeactivateLicense,
  onUpdate
}) => {
  const [isHovered, setIsHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    isSmallMobile,
    isMobile
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.useScreenSize)();

  // Extract individual progress states for backwards compatibility
  const {
    isInstalling,
    isUninstalling,
    isDeactivating,
    isActivating,
    isUpgrading,
    isUpdating,
    isResolvingConflict,
    isActivatingLicense,
    isDeactivatingLicense
  } = progressStates;
  const status = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.usePluginStatus)(pluginFamily);
  const {
    iconSrc,
    displayName
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.usePluginDisplayInfo)(pluginFamily, pluginIconBaseUrl, status);
  const loadingStates = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    isDeactivating,
    isActivating,
    isUninstalling,
    isUpdating,
    isUpgrading,
    isResolvingConflict,
    isActivatingLicense,
    isDeactivatingLicense
  }), [isDeactivating, isActivating, isUninstalling, isUpdating, isActivatingLicense, isDeactivatingLicense]);
  const handlers = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    onDeactivate,
    onActivate,
    onUninstall,
    onDeactivateLicense
  }), [onDeactivate, onActivate, onUninstall, onDeactivateLicense]);
  const actionButtonsData = (0,_hooks__WEBPACK_IMPORTED_MODULE_8__.useActionButtons)(pluginFamily, status, loadingStates, handlers, onUpdate, isUpdating);
  const inProgress = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => isInstalling || isUpgrading || isResolvingConflict, [isInstalling, isUpgrading, isResolvingConflict]);
  const handleMouseEnter = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setIsHovered(true), []);
  const handleMouseLeave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => setIsHovered(false), []);
  const {
    statusFlagClass,
    tooltipText
  } = status;

  // Responsive class names
  const responsiveClasses = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const classes = ['pp-hub-plugins-list-item', statusFlagClass];
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
  const shouldShowToggle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    // Hide toggle on small mobile screens
    if (isSmallMobile) {
      return false;
    }

    // Show toggle on larger screens
    return status.isInstalled && !status.hasConflictingInstallations;
  }, [status.isInstalled, isSmallMobile]);

  // Get current installed version for update badge
  const getUpdateBadgeInfo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!pluginFamily.hasUpdate || !pluginFamily.hasAnyVersionInstalled) {
      return null;
    }
    const installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin;
    const currentVersion = installedPlugin.version || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unknown', 'publishpress-hub');
    const availableVersion = pluginFamily.availableVersion || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('New version available', 'publishpress-hub');
    return {
      currentVersion,
      availableVersion
    };
  }, [pluginFamily]);
  const installedVersionLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!status.isInstalled || status.hasConflictingInstallations) {
      return null;
    }
    const installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin.isInstalled ? pluginFamily.proPlugin : null;
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
    onClick: () => onToggleFavorite(pluginFamily.slug)
  }, /*#__PURE__*/React.createElement("span", {
    className: `dashicons dashicons-star-${isFavorite ? 'filled' : 'empty'}`,
    "aria-hidden": "true"
  })), shouldShowToggle && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
    // translators: %s is the plugin name.
    pluginFamily.hasAnyVersionActive ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Deactivate %s', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Activate %s', 'publishpress-hub'), displayName),
    disabled: status.hasConflictingInstallations,
    checked: pluginFamily.hasAnyVersionActive,
    onChange: newValue => {
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
  }, actionButtonsData.map((buttonProps, index) => {
    if (buttonProps.key === 'activate' && !isSmallMobile) {
      return null;
    }
    if (buttonProps.key === 'deactivate' && !isSmallMobile) {
      return null;
    }
    return /*#__PURE__*/React.createElement(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      key: buttonProps.key
    }, buttonProps.variant === 'label' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\u2022"), /*#__PURE__*/React.createElement("span", {
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
const PluginItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(PluginItemComponent);

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






const DAYS_UNTIL_EXPIRATION_DATE_THRESHOLD = 60;
const STATUS_BADGE_CONFIGS = {
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
const StatusFlagComponent = ({
  pluginFamily,
  isInstalling,
  isUninstalling,
  isUpgrading,
  isDeactivating,
  isActivating,
  hasUpdate,
  updateBadgeTooltip
}) => {
  // Extract the countInstalledPlugins calculation to avoid nesting useMemo hooks
  const countInstalledPlugins = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    let count = 0;
    if (pluginFamily.freePlugin.isInstalled) {
      count += 1;
    }
    if (pluginFamily.proPlugin.isInstalled) {
      count += 1;
    }
    return count;
  }, [pluginFamily]);
  const statusBadgeProps = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
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
  const expirationDate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
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
const StatusFlag = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.memo)(StatusFlagComponent);

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



const useActionButtons = (pluginFamily, status, loadingStates, handlers, onUpdate, isUpdating) => {
  const {
    isActive,
    isInstalled,
    hasConflictingInstallations
  } = status;
  const {
    isDeactivating,
    isActivating,
    isUninstalling
  } = loadingStates;
  const {
    onDeactivate,
    onActivate,
    onUninstall
  } = handlers;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const buttons = [];

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
          onClick: () => onDeactivate(pluginFamily)
        });
      } else {
        buttons.push({
          key: 'activate',
          variant: 'link',
          text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Activate', 'publishpress-hub'),
          isLoading: isActivating,
          disabled: isUpdating ? false : undefined,
          onClick: () => onActivate(pluginFamily)
        });
      }
      buttons.push({
        key: 'uninstall',
        variant: 'link',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Uninstall', 'publishpress-hub'),
        isLoading: isUninstalling,
        disabled: isUpdating ? false : undefined,
        className: 'is-danger',
        onClick: () => onUninstall(pluginFamily)
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
      const installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin;
      const currentVersion = installedPlugin.version || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unknown', 'publishpress-hub');
      const availableVersion = pluginFamily.availableVersion || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('latest', 'publishpress-hub');
      buttons.push({
        key: 'update',
        variant: 'link',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Update to %s', 'publishpress-hub'), availableVersion),
        isLoading: isUpdating,
        onClick: () => onUpdate(pluginFamily)
      });
    }
    if (isInstalled) {
      const installedPlugin = pluginFamily.freePlugin.isInstalled ? pluginFamily.freePlugin : pluginFamily.proPlugin;
      const currentVersion = installedPlugin.version || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unknown', 'publishpress-hub');
      const availableVersion = pluginFamily.availableVersion || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('latest', 'publishpress-hub');
      buttons.push({
        key: 'current-version',
        variant: 'label',
        className: 'pp-hub-plugin-current-version',
        text: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Installed version: %s', 'publishpress-hub'), currentVersion)
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
const useFocusOnAction = (shouldFocus = true, delay = 100) => {
  const textControlRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const focusInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (!textControlRef.current) {
      return;
    }
    const input = textControlRef.current.querySelector('input');
    if (input) {
      input.focus();
      input.select();
    }
  }, []);
  const setFocus = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    focusInput();
  }, [focusInput]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!shouldFocus) {
      return;
    }
    const timeoutId = setTimeout(focusInput, delay);
    return () => {
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
/**
 * Use modal manager.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


const MODAL_TYPES = {
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
const useModalManager = () => {
  const [activeModal, setActiveModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(MODAL_TYPES.NONE);
  const [currentPluginFamily, setCurrentPluginFamily] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [currentPluginDisplayName, setCurrentPluginDisplayName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const openModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((modalType, pluginFamily = null) => {
    setActiveModal(modalType);
    setCurrentPluginFamily(pluginFamily);
    const isPro = pluginFamily.proPlugin.isInstalled;
    setCurrentPluginDisplayName(isPro ? pluginFamily.proPlugin.name : pluginFamily.freePlugin.name);
  }, []);
  const closeModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setActiveModal(MODAL_TYPES.NONE);
    setCurrentPluginFamily(null);
    setCurrentPluginDisplayName(null);
  }, []);
  const isModalActive = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(modalType => {
    return activeModal === modalType;
  }, [activeModal]);
  return {
    MODAL_TYPES,
    activeModal,
    currentPluginFamily,
    openModal,
    closeModal,
    isModalActive,
    currentPluginDisplayName
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
/**
 * Use plugin actions.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




const usePluginActions = modalManager => {
  const {
    openModal,
    closeModal,
    MODAL_TYPES
  } = modalManager;
  const {
    installFreePlugin,
    installProPlugin,
    uninstallPlugin,
    activatePlugin,
    deactivatePlugin,
    upgradePluginToPro,
    resolveConflict,
    deactivateLicense,
    activateLicense,
    reuseLicenseForAllPlugins,
    updatePlugin
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__.store);
  const handleOpenInstallationTypeModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.INSTALLATION_TYPE, pluginFamily);
  }, [openModal, MODAL_TYPES]);
  const handleOpenResolveConflictModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.RESOLVE_CONFLICT, pluginFamily);
  }, [openModal, MODAL_TYPES.RESOLVE_CONFLICT]);
  const handleOpenUpgradeToProModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO, pluginFamily);
  }, [openModal, MODAL_TYPES.UPGRADE_PLUGIN_TO_PRO]);
  const handleOpenUninstallConfirmationModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.UNINSTALL_CONFIRMATION, pluginFamily);
  }, [openModal, MODAL_TYPES.UNINSTALL_CONFIRMATION]);
  const handleOpenLicenseManagementModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.LICENSE_MANAGEMENT, pluginFamily);
  }, [openModal, MODAL_TYPES.LICENSE_MANAGEMENT]);
  const handleOpenLicenseInputForInstallingProModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO, pluginFamily);
  }, [openModal, MODAL_TYPES.LICENSE_INPUT_FOR_INSTALLING_PRO]);
  const handleOpenLicenseInputForActivatingLicenseModal = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE, pluginFamily);
  }, [openModal, MODAL_TYPES.LICENSE_INPUT_FOR_ACTIVATING_LICENSE]);
  const handleActivatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    activatePlugin(pluginFamily.slug);
  }, [activatePlugin]);
  const handleDeactivatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    openModal(MODAL_TYPES.DEACTIVATE_CONFIRMATION, pluginFamily);
  }, [openModal, MODAL_TYPES.DEACTIVATE_CONFIRMATION]);
  const handleConfirmDeactivatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async pluginFamily => {
    const result = await deactivatePlugin(pluginFamily.slug);
    if (result.success && !result.error) {
      closeModal();
    }
    return result;
  }, [deactivatePlugin, closeModal]);
  const handleDeactivateLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async pluginFamily => {
    const result = await deactivateLicense(pluginFamily);
    if (result.success && !result.error) {
      closeModal();
    }
    return result;
  }, [deactivateLicense]);
  const handleActivateLicense = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (pluginFamily, licenseKey, applyToAll = false) => {
    const result = await activateLicense(pluginFamily, licenseKey, applyToAll);
    if (result.success && !result.error) {
      closeModal();
    }
    return result;
  }, [activateLicense, closeModal]);
  const handleReuseLicenseForAllPlugins = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async pluginFamily => {
    const result = await reuseLicenseForAllPlugins(pluginFamily);
    if (result.success && !result.error) {
      closeModal();
    }
    return result;
  }, [reuseLicenseForAllPlugins, closeModal]);

  // Modal-specific actions
  const handleInstallFree = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginSlug => {
    installFreePlugin(pluginSlug);
    closeModal();
  }, [installFreePlugin, closeModal]);
  const handleInstallPro = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (pluginSlug, licenseKey, applyToAll = false, useExistingLicense = false) => {
    const result = await installProPlugin(pluginSlug, licenseKey, applyToAll, useExistingLicense);
    if (result.success && !result.error) {
      closeModal();
    }
    return result;
  }, [installProPlugin, closeModal]);
  const handleUpgradePluginToPro = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (pluginSlug, licenseKey, applyToAll = false, useExistingLicense = false) => {
    const result = await upgradePluginToPro(pluginSlug, licenseKey, applyToAll, useExistingLicense);
    if (result.success && !result.error) {
      closeModal();
    }
    return result;
  }, [upgradePluginToPro, closeModal]);
  const handleUninstallPlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginSlug => {
    uninstallPlugin(pluginSlug);
    closeModal();
  }, [uninstallPlugin, closeModal]);
  const handleResolveConflictAction = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (plugin, type) => {
    const result = await resolveConflict(plugin, type);
    if (result.success) {
      closeModal();
    }
    return result;
  }, [resolveConflict, closeModal]);
  const handleBuyPlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(detailsUrl => {
    window.open(detailsUrl, '_blank');
    closeModal();
  }, [closeModal]);
  const handleUpdatePlugin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async pluginFamily => {
    const pluginFamilySlug = typeof pluginFamily === 'string' ? pluginFamily : pluginFamily.slug;
    const result = await updatePlugin(pluginFamilySlug);
    if (result.success && !result.error) {
      closeModal();
    }
    return result;
  }, [updatePlugin, closeModal]);
  return {
    // Primary actions
    handleOpenInstallationTypeModal,
    handleOpenResolveConflictModal,
    handleActivatePlugin,
    handleDeactivatePlugin,
    handleConfirmDeactivatePlugin,
    handleOpenUpgradeToProModal,
    handleOpenUninstallConfirmationModal,
    handleOpenLicenseManagementModal,
    handleOpenLicenseInputForInstallingProModal,
    handleOpenLicenseInputForActivatingLicenseModal,
    handleDeactivateLicense,
    handleActivateLicense,
    handleReuseLicenseForAllPlugins,
    // Modal-specific actions
    handleInstallFree,
    handleInstallPro,
    handleUpgradePluginToPro,
    handleUninstallPlugin,
    handleResolveConflictAction,
    handleBuyPlugin,
    handleUpdatePlugin
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


const usePluginDisplayInfo = (pluginFamily, pluginIconBaseUrl, status) => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const {
      isPro,
      isInstalled
    } = status;
    const iconSrc = `${pluginIconBaseUrl}images/plugin-icons/${pluginFamily.iconPath}-96x96.png`;
    const displayName = isInstalled ? isPro ? pluginFamily.proPlugin.name : pluginFamily.freePlugin.name : pluginFamily.name;
    return {
      iconSrc,
      displayName
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




const usePluginStatus = pluginFamily => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const isActive = pluginFamily.hasAnyVersionActive;
    const isInstalled = pluginFamily.hasAnyVersionInstalled;
    const isLicensed = pluginFamily.isLicensed;
    const isPro = pluginFamily.proPlugin.isInstalled;
    const hasConflictingInstallations = pluginFamily.hasConflictingInstallations;
    const statusFlagClass = classnames__WEBPACK_IMPORTED_MODULE_1___default()({
      'active': isActive,
      'inactive': !isActive,
      'pro': isPro,
      'free': !isPro,
      'licensed': isLicensed,
      'unlicensed': !isLicensed,
      'installed': isInstalled,
      'not-installed': !isInstalled
    });
    const tooltipText = (() => {
      if (!isInstalled) {
        return (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is not installed.', 'publishpress-hub');
      }
      return isActive ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is active.', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('This plugin is not active.', 'publishpress-hub');
    })();
    return {
      isActive,
      isInstalled,
      isLicensed,
      isPro,
      hasConflictingInstallations,
      statusFlagClass,
      tooltipText
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
/**
 * Use screen size.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\plugins-list\hooks
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


const useScreenSize = () => {
  const [screenSize, setScreenSize] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= 768,
    isSmallMobile: window.innerWidth <= 480
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth <= 768,
        isSmallMobile: window.innerWidth <= 480
      });
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
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
const groupingEnabled = false;

// Split selectors for better performance
const selectProgressStates = select => {
  const storeSelect = select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store);
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
const selectModalStates = select => {
  const storeSelect = select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store);
  return {
    selectedPluginForConflictResolution: storeSelect.getSelectedPluginForConflictResolution(),
    pluginError: storeSelect.getPluginError()
  };
};
const PluginsListComponent = ({
  plugins,
  pluginIconBaseUrl,
  isLoading
}) => {
  const modalManager = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__.useModalManager)();
  const {
    preferences,
    updatePreferences,
    toggleFavorite
  } = (0,_hooks_use_dashboard_preferences__WEBPACK_IMPORTED_MODULE_2__.useDashboardPreferences)();
  const grouped = groupingEnabled && preferences.grouped;
  const [favoritesOnly, setFavoritesOnly] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const pluginActions = (0,_hooks__WEBPACK_IMPORTED_MODULE_7__.usePluginActions)(modalManager);
  const progressStates = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(selectProgressStates, []);
  const modalStates = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(selectModalStates, []);
  const {
    pluginInstallationInProgress,
    pluginUninstallationInProgress,
    pluginDeactivationInProgress,
    pluginActivationInProgress,
    pluginUpgradeInProgress,
    pluginUpdateInProgress,
    pluginResolveConflictInProgress,
    pluginLicenseActivationInProgress,
    pluginLicenseDeactivationInProgress
  } = progressStates;
  const {
    selectedPluginForConflictResolution,
    pluginError
  } = modalStates;
  const currentPluginState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const {
      currentPluginFamily,
      currentPluginDisplayName
    } = modalManager;
    if (!currentPluginFamily) return {
      error: null,
      inProgress: false
    };
    const slug = currentPluginFamily.slug;
    return {
      pluginDisplayName: currentPluginDisplayName,
      error: pluginError[slug] || null,
      inProgress: Boolean(pluginInstallationInProgress[slug] || pluginUninstallationInProgress[slug] || pluginDeactivationInProgress[slug] || pluginActivationInProgress[slug] || pluginUpgradeInProgress[slug] || pluginUpdateInProgress[slug] || pluginResolveConflictInProgress[slug] || pluginLicenseActivationInProgress[slug] || pluginLicenseDeactivationInProgress[slug])
    };
  }, [modalManager, pluginError, progressStates]);

  // Memoize the plugin item renderer to prevent recreation
  const renderPluginItem = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(pluginFamily => {
    const slug = pluginFamily.slug;

    // Create progress states object for this plugin
    const pluginProgressStates = {
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
      key: `plugin-${slug}`,
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
  const visiblePlugins = favoritesOnly ? plugins.filter(plugin => preferences.favorites.includes(plugin.slug)) : plugins;
  const groups = grouped ? [{
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Editorial process', 'publishpress-hub'),
    slugs: ['planner', 'checklists', 'statuses', 'revisions']
  }, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Additional publishing tools', 'publishpress-hub'),
    slugs: ['permissions', 'capabilities', 'authors', 'blocks', 'future', 'series', 'shortlinks', 'cart', 'taxonomies', 'tag-groups']
  }] : [];
  if (grouped) {
    const knownSlugs = groups.flatMap(group => group.slugs);
    groups.push({
      title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Other plugins', 'publishpress-hub'),
      slugs: visiblePlugins.filter(plugin => !knownSlugs.includes(plugin.slug)).map(plugin => plugin.slug)
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-view-controls"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-layout-switch",
    role: "group",
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Plugin layout', 'publishpress-hub')
  }, ['list', 'cards'].map(layout => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: layout,
    "aria-pressed": preferences.layout === layout,
    onClick: () => updatePreferences({
      layout
    })
  }, /*#__PURE__*/React.createElement("span", {
    className: `dashicons dashicons-${layout === 'cards' ? 'grid-view' : 'list-view'}`,
    "aria-hidden": "true"
  }), layout === 'cards' ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Cards', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('List', 'publishpress-hub')))), groupingEnabled && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Group by purpose', 'publishpress-hub'),
    checked: preferences.grouped,
    onChange: grouped => updatePreferences({
      grouped
    })
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Favorites only', 'publishpress-hub'),
    checked: favoritesOnly,
    onChange: setFavoritesOnly
  })), /*#__PURE__*/React.createElement("div", {
    className: `pp-hub-plugins-list pp-hub-view-${preferences.layout}`,
    "aria-busy": isLoading && plugins.length > 0 || undefined
  }, grouped ? groups.map(group => {
    const members = group.slugs.map(slug => visiblePlugins.find(plugin => plugin.slug === slug)).filter(Boolean);
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
const PluginsList = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(PluginsListComponent);

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
/**
 * Tooltip.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\tooltip
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */



const CustomTooltipComponent = ({
  children,
  text,
  placement = 'top',
  className = '',
  useCustom = false,
  delay = 700
}) => {
  const [isVisible, setIsVisible] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [position, setPosition] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    top: 0,
    left: 0
  });
  const triggerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const tooltipRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const showTimeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const hideTimeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const tooltipId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useId)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isVisible || !triggerRef.current || !tooltipRef.current || !useCustom) return;
    const updatePosition = () => {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      let top, left;
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
        top,
        left
      });
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, placement, useCustom]);

  // Cleanup timeouts on unmount
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      clearTimeout(showTimeoutRef.current);
      clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Let keyboard users dismiss the tooltip without moving focus (WCAG 1.4.13).
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isVisible) return;
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setIsVisible(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);
  const show = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    clearTimeout(hideTimeoutRef.current);
    clearTimeout(showTimeoutRef.current);
    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      showTimeoutRef.current = null;
    }, delay);
  }, [delay]);
  const hide = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    clearTimeout(showTimeoutRef.current);
    showTimeoutRef.current = null;
    setIsVisible(false);
  }, []);

  // Short grace period so the pointer can cross the gap onto the tooltip (WCAG 1.4.13).
  const hideSoon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    clearTimeout(showTimeoutRef.current);
    showTimeoutRef.current = null;
    clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 150);
  }, []);
  if (!text) {
    return children;
  }

  // Use custom tooltip implementation
  if (useCustom) {
    const combinedClassName = `pp-hub-tooltip-trigger ${className}`.trim();

    // The trigger is focusable and described by the tooltip so keyboard and screen reader
    // users get the same information as mouse users (WCAG 1.3.1, 2.1.1). The tooltip text
    // stays in the DOM, visually hidden, while it is not shown.
    return /*#__PURE__*/React.createElement("div", {
      className: combinedClassName,
      style: {
        position: 'relative',
        display: 'inline-block'
      },
      onMouseEnter: show,
      onMouseLeave: hideSoon
    }, /*#__PURE__*/React.createElement("div", {
      ref: triggerRef,
      tabIndex: 0,
      "aria-describedby": tooltipId,
      onFocus: show,
      onBlur: hide
    }, children), /*#__PURE__*/React.createElement("div", {
      ref: tooltipRef,
      id: tooltipId,
      role: "tooltip",
      className: isVisible ? 'pp-hub-tooltip pp-hub-tooltip--custom' : 'screen-reader-text',
      style: isVisible ? {
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 'var(--pp-hub-z-tooltip)',
        opacity: 1,
        transform: 'none'
      } : undefined
    }, text));
  }

  // Use WordPress's default tooltip (renders in portal)
  const classNames = `pp-hub-tooltip ${className}`.trim();
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
    text: text,
    placement: placement,
    className: classNames
  }, children);
};
const Tooltip = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(CustomTooltipComponent);

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
/**
 * Plugins dashboard actions.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






const API_NAMESPACE = '/publishpress-hub/v1';
const {
  createSuccessNotice,
  createErrorNotice
} = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.dispatch)('core/notices');

// Track the current fetch abort controller to cancel pending requests
let currentFetchController = null;
const createNotice = (message, type) => {
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
const createSnackbarNotice = (message, type) => {
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
function* getPluginName(pluginFamilySlug) {
  const plugins = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.select)(_name__WEBPACK_IMPORTED_MODULE_4__.STORE_NAME, 'getPlugins');
  const pluginFamily = plugins.find(plugin => plugin.slug === pluginFamilySlug);
  if (!pluginFamily) {
    return pluginFamilySlug;
  }

  // Use the installed plugin's name if available, otherwise use family name
  if (pluginFamily.hasAnyVersionInstalled) {
    if (pluginFamily.proPlugin.isInstalled) {
      return pluginFamily.proPlugin.name;
    }
    if (pluginFamily.freePlugin.isInstalled) {
      return pluginFamily.freePlugin.name;
    }
  }

  // Fallback to family name
  return pluginFamily.name || pluginFamilySlug;
}
function* setSelectedFilter(selectedFilter) {
  yield {
    type: 'SET_SELECTED_FILTER',
    selectedFilter
  };
}
function* setPlugins(plugins) {
  yield {
    type: 'SET_PLUGINS',
    plugins
  };
}
function* setLoading(isLoading) {
  yield {
    type: 'SET_LOADING',
    isLoading
  };
}
function* setError(error) {
  yield {
    type: 'SET_ERROR',
    error
  };
}
function* setCurrentFilter(currentFilter) {
  yield {
    type: 'SET_CURRENT_FILTER',
    currentFilter
  };
}
function* setLicenseInputModalOpen(isOpen) {
  yield {
    type: 'SET_LICENSE_INPUT_MODAL_OPEN',
    isOpen
  };
}
function* setLicenseInputModalOpenForUpgrade(isOpen) {
  yield {
    type: 'SET_LICENSE_INPUT_MODAL_OPEN_FOR_UPGRADE',
    isOpen
  };
}
function* setInstallationTypeModalOpen(isOpen) {
  yield {
    type: 'SET_INSTALLATION_TYPE_MODAL_OPEN',
    isOpen
  };
}
function* setIsUninstallConfirmationModalOpen(isOpen) {
  yield {
    type: 'SET_IS_UNINSTALL_CONFIRMATION_MODAL_OPEN',
    isOpen
  };
}
function* setIsUpgradeModalOpen(isOpen) {
  yield {
    type: 'SET_IS_UPGRADE_MODAL_OPEN',
    isOpen
  };
}
function* setIsResolveConflictModalOpen(isOpen) {
  yield {
    type: 'SET_IS_RESOLVE_CONFLICT_MODAL_OPEN',
    isOpen
  };
}
function* fetchPlugins(forceCheck = false, showError = true) {
  try {
    // Cancel any pending fetch request
    if (currentFetchController) {
      currentFetchController.abort();
    }

    // Create new abort controller for this request
    currentFetchController = new AbortController();
    const signal = currentFetchController.signal;
    yield {
      type: 'FETCH_PLUGINS_START'
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const path = forceCheck ? `${API_NAMESPACE}/plugins?force-check=1` : `${API_NAMESPACE}/plugins`;
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path,
      signal
    });

    // Clear the controller after successful fetch
    currentFetchController = null;
    if (data.success) {
      yield {
        type: 'FETCH_PLUGINS_SUCCESS',
        data: data.plugins
      };
      return {
        success: true,
        data: data.plugins
      };
    } else {
      throw new Error(data.error || 'Failed to fetch plugins');
    }
  } catch (error) {
    // Clear controller on error
    currentFetchController = null;

    // Don't show error for aborted requests
    if (error.name === 'AbortError' || error.code === 'FETCH_ERROR') {
      return {
        success: false,
        aborted: true
      };
    }
    if (!showError) {
      error = handleErrorMessageOnContext(error);
      return {
        success: false,
        error
      };
    }
    yield {
      type: 'FETCH_PLUGINS_ERROR',
      error: error
    };
    const errorMessage = getErrorMessage(error, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to fetch plugins', 'publishpress-hub'));
    yield createNotice(errorMessage, 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      error
    };
  }
}
function* installFreePlugin(pluginFamilySlug) {
  try {
    yield {
      type: 'INSTALL_PLUGIN_START',
      data: {
        pluginFamilySlug
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/install/free`,
      method: 'POST'
    });
    if (data.success) {
      // Activate the plugin after successful installation without showing a second success notice.
      yield* activatePlugin(pluginFamilySlug, true, true);

      // Refresh once after both install and activate complete
      yield fetchPlugins();
      yield {
        type: 'INSTALL_PLUGIN_SUCCESS',
        data: {
          pluginFamilySlug
        }
      };
      const pluginName = yield* getPluginName(pluginFamilySlug);
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installed successfully', 'publishpress-hub'), pluginName), 'success');
      return {
        success: true,
        pluginFamilySlug,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Plugin installation failed');
    }
  } catch (error) {
    yield {
      type: 'INSTALL_PLUGIN_ERROR',
      data: {
        pluginFamilySlug,
        error: error
      }
    };
    const pluginName = yield* getPluginName(pluginFamilySlug);
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installation failed', 'publishpress-hub'), pluginName), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamilySlug,
      error
    };
  }
}
function* installProPlugin(pluginFamilySlug, licenseKey, applyToAll = false, useExistingLicense = false) {
  try {
    yield {
      type: 'INSTALL_PLUGIN_START',
      data: {
        pluginFamilySlug
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    licenseKey = licenseKey.trim();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/install/pro`,
      method: 'POST',
      data: {
        licenseKey: licenseKey,
        applyToAll: applyToAll,
        useExistingLicense: useExistingLicense
      }
    });
    if (data.success) {
      yield* reportSharedLicenseFailures(data);
      // Activate the plugin after successful installation without showing a second success notice.
      yield* activatePlugin(pluginFamilySlug, true, true);

      // Refresh once after both install and activate complete
      yield fetchPlugins();
      yield {
        type: 'INSTALL_PLUGIN_SUCCESS',
        data: {
          pluginFamilySlug
        }
      };
      const pluginName = yield* getPluginName(pluginFamilySlug);
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installed successfully', 'publishpress-hub'), pluginName), 'success');

      // Return context along with the API response
      return {
        success: true,
        pluginFamilySlug,
        licenseKey,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Plugin installation failed');
    }
  } catch (error) {
    yield {
      type: 'INSTALL_PLUGIN_ERROR',
      data: {
        pluginFamilySlug,
        error: error
      }
    };
    const pluginName = yield* getPluginName(pluginFamilySlug);
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s installation failed', 'publishpress-hub'), pluginName), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamilySlug,
      licenseKey,
      error
    };
  }
}
function* uninstallPlugin(pluginFamilySlug) {
  // Get plugin name before uninstall, as it won't be available after
  const pluginName = yield* getPluginName(pluginFamilySlug);
  try {
    yield {
      type: 'UNINSTALL_PLUGIN_START',
      data: {
        pluginFamilySlug
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/uninstall`,
      method: 'POST'
    });
    if (data.success) {
      yield fetchPlugins();
      yield {
        type: 'UNINSTALL_PLUGIN_SUCCESS',
        data: {
          pluginFamilySlug
        }
      };
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s uninstalled successfully', 'publishpress-hub'), pluginName), 'success');
      return {
        success: true,
        pluginFamilySlug,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Plugin uninstall failed');
    }
  } catch (error) {
    yield {
      type: 'UNINSTALL_PLUGIN_ERROR',
      data: {
        pluginFamilySlug,
        error: error
      }
    };
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s uninstall failed', 'publishpress-hub'), pluginName), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamilySlug,
      error
    };
  }
}
function* activatePlugin(pluginFamilySlug, skipRefresh = false, skipNotice = false) {
  try {
    yield {
      type: 'ACTIVATE_PLUGIN_START',
      data: {
        pluginFamilySlug
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/activate`,
      method: 'POST'
    });
    if (data.success) {
      yield {
        type: 'ACTIVATE_PLUGIN_SUCCESS',
        data: {
          pluginFamilySlug,
          slug: data.slug,
          active: data.active
        }
      };

      // Only refresh if not skipped (to allow batching)
      if (!skipRefresh) {
        yield fetchPlugins();
      }
      if (!skipNotice) {
        const pluginName = yield* getPluginName(pluginFamilySlug);
        yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s activated successfully', 'publishpress-hub'), pluginName), 'success');
      }
      return {
        success: true,
        pluginFamilySlug,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Plugin activation failed');
    }
  } catch (error) {
    yield {
      type: 'ACTIVATE_PLUGIN_ERROR',
      data: {
        pluginFamilySlug,
        error: error
      }
    };
    const pluginName = yield* getPluginName(pluginFamilySlug);
    const defaultMessage = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s activation failed', 'publishpress-hub'), pluginName);
    const errorMessage = getErrorMessage(error, defaultMessage);
    yield createNotice(errorMessage, 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamilySlug,
      error
    };
  }
}
function* deactivatePlugin(pluginFamilySlug, skipRefresh = false) {
  try {
    yield {
      type: 'DEACTIVATE_PLUGIN_START',
      data: {
        pluginFamilySlug
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/deactivate`,
      method: 'POST'
    });
    if (data.success) {
      yield {
        type: 'DEACTIVATE_PLUGIN_SUCCESS',
        data: {
          pluginFamilySlug,
          slug: data.slug,
          active: data.active
        }
      };

      // Only refresh if not skipped (to allow batching)
      if (!skipRefresh) {
        yield fetchPlugins();
      }
      const pluginName = yield* getPluginName(pluginFamilySlug);
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s deactivated successfully', 'publishpress-hub'), pluginName), 'success');
      return {
        success: true,
        pluginFamilySlug,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Plugin deactivation failed');
    }
  } catch (error) {
    yield {
      type: 'DEACTIVATE_PLUGIN_ERROR',
      data: {
        pluginFamilySlug,
        error: error
      }
    };
    const pluginName = yield* getPluginName(pluginFamilySlug);
    const defaultMessage = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s deactivation failed', 'publishpress-hub'), pluginName);
    const errorMessage = getErrorMessage(error, defaultMessage);
    yield createNotice(errorMessage, 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamilySlug,
      error
    };
  }
}
function* upgradePluginToPro(pluginFamilySlug, licenseKey, applyToAll = false, useExistingLicense = false) {
  try {
    yield {
      type: 'UPGRADE_PLUGIN_TO_PRO_START',
      data: {
        pluginFamilySlug,
        licenseKey
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    licenseKey = licenseKey.trim();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/upgrade`,
      method: 'POST',
      data: {
        licenseKey: licenseKey,
        applyToAll: applyToAll,
        useExistingLicense: useExistingLicense
      }
    });
    if (data.success) {
      yield* reportSharedLicenseFailures(data);
      // Activate the plugin after successful upgrade without showing a second success notice.
      yield* activatePlugin(pluginFamilySlug, true, true);

      // Refresh once after both upgrade and activate complete
      yield fetchPlugins();
      yield {
        type: 'UPGRADE_PLUGIN_TO_PRO_SUCCESS',
        data: {
          pluginFamilySlug
        }
      };
      const pluginName = yield* getPluginName(pluginFamilySlug);
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s upgraded successfully', 'publishpress-hub'), pluginName), 'success');

      // Return context along with the API response
      return {
        success: true,
        pluginFamilySlug,
        licenseKey,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Plugin upgrade to Pro failed');
    }
  } catch (error) {
    yield {
      type: 'UPGRADE_PLUGIN_TO_PRO_ERROR',
      data: {
        pluginFamilySlug,
        error: error
      }
    };
    const pluginName = yield* getPluginName(pluginFamilySlug);
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s upgrade to Pro failed', 'publishpress-hub'), pluginName), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamilySlug,
      licenseKey,
      error
    };
  }
}
function* resolveConflict(pluginFamily, pluginToKeep) {
  try {
    const validPlugins = ['free', 'pro'];
    const validPluginToKeep = validPlugins.includes(pluginToKeep) ? pluginToKeep : null;
    if (!validPluginToKeep) {
      throw new Error('Invalid plugin to keep');
    }
    yield {
      type: 'RESOLVE_CONFLICT_START',
      data: {
        pluginFamily,
        pluginToKeep
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    let data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/resolve-conflict`,
      method: 'POST',
      data: {
        pluginToKeep: pluginToKeep,
        phase: 'activate'
      }
    });

    // A fresh request must load the selected edition before removing the inactive copy.
    if (data.success && data.requiresCleanup) {
      data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
        path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/resolve-conflict`,
        method: 'POST',
        data: {
          pluginToKeep,
          phase: 'cleanup'
        }
      });
    }
    if (data.success) {
      yield fetchPlugins();
      yield {
        type: 'RESOLVE_CONFLICT_SUCCESS',
        data: {
          pluginFamily,
          pluginToKeep
        }
      };
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Conflict resolved successfully for %s', 'publishpress-hub'), pluginFamily.name), 'success');
      return {
        success: true,
        pluginFamily,
        pluginToKeep,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Failed to resolve conflict');
    }
  } catch (error) {
    yield {
      type: 'RESOLVE_CONFLICT_ERROR',
      data: {
        pluginFamily,
        pluginToKeep,
        error: error
      }
    };
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to resolve conflict for %s', 'publishpress-hub'), pluginFamily.name), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamily,
      pluginToKeep,
      error
    };
  }
}
function* deactivateLicense(pluginFamily) {
  try {
    yield {
      type: 'DEACTIVATE_LICENSE_START',
      data: {
        pluginFamily
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/deactivate-license`,
      method: 'POST'
    });
    if (data.success) {
      yield fetchPlugins();
      yield {
        type: 'DEACTIVATE_LICENSE_SUCCESS',
        data: {
          pluginFamily
        }
      };
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license deactivated successfully', 'publishpress-hub'), pluginFamily.name), 'success');
      return {
        success: true,
        pluginFamily,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'License deactivation failed');
    }
  } catch (error) {
    yield {
      type: 'DEACTIVATE_LICENSE_ERROR',
      data: {
        pluginFamily,
        error: error
      }
    };
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license deactivation failed', 'publishpress-hub'), pluginFamily.name), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamily,
      error
    };
  }
}
function* reportSharedLicenseFailures(data) {
  const failed = (data.licenseResults || []).filter(result => !result.success);
  if (failed.length) {
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The license key could not be activated for these plugins: %s. Review their licenses and retry from each plugin’s license controls.', 'publishpress-hub'), failed.map(result => result.slug).join(', ')), 'warning');
  }
  return failed.length > 0;
}
function* activateLicense(pluginFamily, licenseKey, applyToAll = false) {
  try {
    yield {
      type: 'ACTIVATE_LICENSE_START',
      data: {
        pluginFamily,
        licenseKey,
        applyToAll
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/activate-license`,
      method: 'POST',
      data: {
        licenseKey: licenseKey,
        applyToAll: applyToAll
      }
    });
    if (data.success) {
      const hasLicenseFailures = yield* reportSharedLicenseFailures(data);
      yield fetchPlugins();
      yield {
        type: 'ACTIVATE_LICENSE_SUCCESS',
        data: {
          pluginFamily,
          licenseKey,
          applyToAll
        }
      };
      const successMessage = applyToAll && !hasLicenseFailures ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License activated successfully for all PublishPress plugins', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license activated successfully', 'publishpress-hub'), pluginFamily.name);
      yield createSnackbarNotice(successMessage, 'success');
      return {
        success: true,
        pluginSlug: pluginFamily,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'License activation failed');
    }
  } catch (error) {
    yield {
      type: 'ACTIVATE_LICENSE_ERROR',
      data: {
        pluginFamily,
        licenseKey,
        applyToAll,
        error: error
      }
    };
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license activation failed', 'publishpress-hub'), pluginFamily.name), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamily,
      licenseKey,
      error
    };
  }
}
function* reuseLicenseForAllPlugins(pluginFamily) {
  try {
    yield {
      type: 'ACTIVATE_LICENSE_START',
      data: {
        pluginFamily,
        licenseKey: '',
        applyToAll: true
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamily.slug}/reuse-license-for-all`,
      method: 'POST'
    });
    if (data.success) {
      const hasLicenseFailures = yield* reportSharedLicenseFailures(data);
      yield fetchPlugins();
      yield {
        type: 'ACTIVATE_LICENSE_SUCCESS',
        data: {
          pluginFamily,
          licenseKey: '',
          applyToAll: true
        }
      };
      yield createSnackbarNotice(hasLicenseFailures ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License checks complete. Some plugins could not be activated.', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License activated successfully for all PublishPress plugins', 'publishpress-hub'), hasLicenseFailures ? 'warning' : 'success');
      return {
        success: true,
        pluginFamily,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'License reuse failed');
    }
  } catch (error) {
    yield {
      type: 'ACTIVATE_LICENSE_ERROR',
      data: {
        pluginFamily,
        licenseKey: '',
        applyToAll: true,
        error: error
      }
    };
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s license reuse failed', 'publishpress-hub'), pluginFamily.name), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamily,
      error
    };
  }
}
function* updatePlugin(pluginFamilySlug) {
  try {
    yield {
      type: 'UPDATE_PLUGIN_START',
      data: {
        pluginFamilySlug
      }
    };
    yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
    const data = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/plugins/${pluginFamilySlug}/update`,
      method: 'POST'
    });
    if (data.success) {
      // Force refresh to ensure update status is checked for all plugins
      // WordPress clears the update_plugins transient during plugin upgrades
      const refreshResult = yield fetchPlugins(true, false);
      let fallbackRefreshResult = refreshResult;
      if (!refreshResult?.success && !refreshResult?.aborted) {
        fallbackRefreshResult = yield fetchPlugins(false, false);
      }
      if (!fallbackRefreshResult?.success) {
        yield {
          type: 'UPDATE_PLUGIN_SUCCESS',
          data: {
            pluginFamilySlug
          }
        };
        yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('The plugin was updated successfully, but the dashboard could not refresh. Reloading this page...', 'publishpress-hub'), 'error');
        if (typeof window !== 'undefined') {
          setTimeout(() => window.location.reload(), 1500);
        }
        return {
          success: true,
          pluginFamilySlug,
          refreshFailed: true,
          apiResponse: data
        };
      }
      yield {
        type: 'UPDATE_PLUGIN_SUCCESS',
        data: {
          pluginFamilySlug
        }
      };
      const pluginName = yield* getPluginName(pluginFamilySlug);
      yield createSnackbarNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s updated successfully', 'publishpress-hub'), pluginName), 'success');
      return {
        success: true,
        pluginFamilySlug,
        apiResponse: data
      };
    } else {
      throw new Error(data?.error || 'Plugin update failed');
    }
  } catch (error) {
    yield {
      type: 'UPDATE_PLUGIN_ERROR',
      data: {
        pluginFamilySlug,
        error: error
      }
    };
    const pluginName = yield* getPluginName(pluginFamilySlug);
    yield createNotice((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('%s update failed', 'publishpress-hub'), pluginName), 'error');
    error = handleErrorMessageOnContext(error);
    return {
      success: false,
      pluginFamilySlug,
      error
    };
  }
}
function* cleanupError(pluginFamily) {
  yield {
    type: 'CLEANUP_ERROR',
    data: {
      pluginFamily
    }
  };
}

/**
 * Checks if an error is a rate limit error (429).
 *
 * @param {Error} error The error object.
 * @return {boolean} True if it's a rate limit error, false otherwise.
 */
function isRateLimitError(error) {
  if (!error) {
    return false;
  }

  // Check status code directly
  if (error.status === 429 || error?.data?.status === 429) {
    return true;
  }

  // Check error code
  if (error.code === 'rate_limit_exceeded' || error.code === 'rest_rate_limit_exceeded') {
    return true;
  }

  // Check error message
  const errorMessage = error.message || error.data?.message || '';
  if (errorMessage.includes('Too many requests') || errorMessage.includes('rate limit')) {
    return true;
  }

  // Check response status if available
  if (error.response?.status === 429) {
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
  let errorMessage = '';
  if (error.context?.cloudflare_ray_id) {
    errorMessage += ' ' + (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cloudflare Ray ID: %s', 'publishpress-hub'), error.context.cloudflare_ray_id);
  }
  if (errorMessage != '') {
    errorMessage = errorMessage.trim();
    if (error.context?.error_message) {
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
function* dismissLicenseNotice(noticeType) {
  yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
  try {
    yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/license-notices/dismiss`,
      method: 'POST',
      data: {
        noticeType
      }
    });
  } catch (error) {
    // Silently fail - dismissal is not critical
    // eslint-disable-next-line no-console
    console.error('Error dismissing license notice:', error);
  }
}

/**
 * Fetch license notice dismissal status.
 *
 * @return {Object} The dismissal status object with 'expired' and 'expiring' keys.
 * @since 1.0.0
 */
function* fetchLicenseNoticeDismissalStatus() {
  yield (0,_utils_apiReady__WEBPACK_IMPORTED_MODULE_3__["default"])();
  try {
    const response = yield (0,_wordpress_data_controls__WEBPACK_IMPORTED_MODULE_0__.apiFetch)({
      path: `${API_NAMESPACE}/license-notices/dismissal-status`,
      method: 'GET'
    });
    return response.dismissalStatus || {
      expired: false,
      expiring: false
    };
  } catch (error) {
    // Silently fail and return default status
    // eslint-disable-next-line no-console
    console.error('Error fetching dismissal status:', error);
    return {
      expired: false,
      expiring: false
    };
  }
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







const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(_name__WEBPACK_IMPORTED_MODULE_2__.STORE_NAME, {
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

const STORE_NAME = 'publishpress-hub/plugins-dashboard';
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
/**
 * Plugins dashboard reducer.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */


const DEFAULT_STATE = {
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
const setSelectedFilter = (state, selectedFilter) => {
  return {
    ...state,
    selectedFilter
  };
};
const setPlugins = (state, plugins) => {
  return {
    ...state,
    plugins,
    isLoading: false,
    error: null
  };
};
const setLoading = (state, isLoading) => {
  return {
    ...state,
    isLoading
  };
};
const setError = (state, error) => {
  return {
    ...state,
    error,
    isLoading: false
  };
};
const fetchPluginsStart = state => {
  return {
    ...state,
    isLoading: true,
    error: null
  };
};
const fetchPluginsSuccess = (state, data) => {
  return {
    ...state,
    plugins: data,
    isLoading: false,
    error: null
  };
};
const fetchPluginsError = (state, error) => {
  return {
    ...state,
    error,
    isLoading: false
  };
};
const setCurrentFilter = (state, currentFilter) => {
  return {
    ...state,
    currentFilter
  };
};
const setLicenseInputModalOpen = (state, isOpen) => {
  return {
    ...state,
    isLicenseInputModalOpen: isOpen,
    pluginErrors: {}
  };
};
const setLicenseInputModalOpenForUpgrade = (state, isOpen) => {
  return {
    ...state,
    isLicenseInputModalOpenForUpgrade: isOpen,
    pluginErrors: {}
  };
};
const setInstallationTypeModalOpen = (state, isOpen) => {
  return {
    ...state,
    isInstallationTypeModalOpen: isOpen,
    pluginErrors: {}
  };
};
const setIsUninstallConfirmationModalOpen = (state, isOpen) => {
  return {
    ...state,
    isUninstallConfirmationModalOpen: isOpen,
    pluginErrors: {}
  };
};
const setIsUpgradeModalOpen = (state, isOpen) => {
  return {
    ...state,
    isUpgradeModalOpen: isOpen,
    pluginErrors: {}
  };
};
const setIsResolveConflictModalOpen = (state, isOpen) => {
  return {
    ...state,
    isResolveConflictModalOpen: isOpen,
    pluginErrors: {}
  };
};
const installPluginStart = (state, data) => {
  return {
    ...state,
    pluginInstallationInProgress: {
      ...state.pluginInstallationInProgress,
      [data.pluginFamilySlug]: true
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: null
    }
  };
};
const installPluginSuccess = (state, data) => {
  return {
    ...state,
    pluginInstallationInProgress: {
      ...state.pluginInstallationInProgress,
      [data.pluginFamilySlug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: null
    }
  };
};
const installPluginError = (state, data) => {
  return {
    ...state,
    pluginInstallationInProgress: {
      ...state.pluginInstallationInProgress,
      [data.pluginFamilySlug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: data.error
    }
  };
};
const uninstallPluginStart = (state, data) => {
  return {
    ...state,
    pluginUninstallationInProgress: {
      ...state.pluginUninstallationInProgress,
      [data.pluginFamilySlug]: true
    }
  };
};
const uninstallPluginSuccess = (state, data) => {
  return {
    ...state,
    pluginUninstallationInProgress: {
      ...state.pluginUninstallationInProgress,
      [data.pluginFamilySlug]: false
    }
  };
};
const uninstallPluginError = (state, data) => {
  return {
    ...state,
    pluginUninstallationInProgress: {
      ...state.pluginUninstallationInProgress,
      [data.pluginFamilySlug]: false
    }
  };
};
const activatePluginStart = (state, data) => {
  return {
    ...state,
    pluginActivationInProgress: {
      ...state.pluginActivationInProgress,
      [data.pluginFamilySlug]: true
    }
  };
};
const activatePluginSuccess = (state, data) => {
  // Optimistically update the plugin's active state
  const updatedPlugins = state.plugins.map(plugin => {
    if (plugin.slug === data.pluginFamilySlug) {
      // Update the active status of the installed version
      if (plugin.proPlugin?.isInstalled) {
        return {
          ...plugin,
          proPlugin: {
            ...plugin.proPlugin,
            isActive: data.active !== undefined ? data.active : true
          }
        };
      }
      if (plugin.freePlugin?.isInstalled) {
        return {
          ...plugin,
          freePlugin: {
            ...plugin.freePlugin,
            isActive: data.active !== undefined ? data.active : true
          }
        };
      }
    }
    return plugin;
  });
  return {
    ...state,
    plugins: updatedPlugins,
    pluginActivationInProgress: {
      ...state.pluginActivationInProgress,
      [data.pluginFamilySlug]: false
    }
  };
};
const activatePluginError = (state, data) => {
  return {
    ...state,
    pluginActivationInProgress: {
      ...state.pluginActivationInProgress,
      [data.pluginFamilySlug]: false
    }
  };
};
const deactivatePluginStart = (state, data) => {
  return {
    ...state,
    pluginDeactivationInProgress: {
      ...state.pluginDeactivationInProgress,
      [data.pluginFamilySlug]: true
    }
  };
};
const deactivatePluginSuccess = (state, data) => {
  // Optimistically update the plugin's active state
  const updatedPlugins = state.plugins.map(plugin => {
    if (plugin.slug === data.pluginFamilySlug) {
      // Update the active status of the installed version
      if (plugin.proPlugin?.isInstalled) {
        return {
          ...plugin,
          proPlugin: {
            ...plugin.proPlugin,
            isActive: data.active !== undefined ? data.active : false
          }
        };
      }
      if (plugin.freePlugin?.isInstalled) {
        return {
          ...plugin,
          freePlugin: {
            ...plugin.freePlugin,
            isActive: data.active !== undefined ? data.active : false
          }
        };
      }
    }
    return plugin;
  });
  return {
    ...state,
    plugins: updatedPlugins,
    pluginDeactivationInProgress: {
      ...state.pluginDeactivationInProgress,
      [data.pluginFamilySlug]: false
    }
  };
};
const deactivatePluginError = (state, data) => {
  return {
    ...state,
    pluginDeactivationInProgress: {
      ...state.pluginDeactivationInProgress,
      [data.pluginFamilySlug]: false
    }
  };
};
const upgradePluginToProStart = (state, data) => {
  return {
    ...state,
    pluginUpgradeInProgress: {
      ...state.pluginUpgradeInProgress,
      [data.pluginFamilySlug]: true
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: null
    }
  };
};
const upgradePluginToProSuccess = (state, data) => {
  return {
    ...state,
    pluginUpgradeInProgress: {
      ...state.pluginUpgradeInProgress,
      [data.pluginFamilySlug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: null
    }
  };
};
const upgradePluginToProError = (state, data) => {
  return {
    ...state,
    pluginUpgradeInProgress: {
      ...state.pluginUpgradeInProgress,
      [data.pluginFamilySlug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: data.error
    }
  };
};
const resolveConflictStart = (state, data) => {
  return {
    ...state,
    pluginResolveConflictInProgress: {
      ...state.pluginResolveConflictInProgress,
      [data.pluginFamily.slug]: true
    },
    selectedPluginForConflictResolution: data.pluginToKeep,
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: null
    }
  };
};
const resolveConflictSuccess = (state, data) => {
  return {
    ...state,
    pluginResolveConflictInProgress: {
      ...state.pluginResolveConflictInProgress,
      [data.pluginFamily.slug]: false
    },
    selectedPluginForConflictResolution: null,
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: data.error
    }
  };
};
const resolveConflictError = (state, data) => {
  return {
    ...state,
    pluginResolveConflictInProgress: {
      ...state.pluginResolveConflictInProgress,
      [data.pluginFamily.slug]: false
    },
    selectedPluginForConflictResolution: null,
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: data.error
    }
  };
};
const deactivateLicenseStart = (state, data) => {
  return {
    ...state,
    pluginLicenseDeactivationInProgress: {
      ...state.pluginLicenseDeactivationInProgress,
      [data.pluginFamily.slug]: true
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: null
    }
  };
};
const deactivateLicenseSuccess = (state, data) => {
  return {
    ...state,
    pluginLicenseDeactivationInProgress: {
      ...state.pluginLicenseDeactivationInProgress,
      [data.pluginFamily.slug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: null
    }
  };
};
const deactivateLicenseError = (state, data) => {
  return {
    ...state,
    pluginLicenseDeactivationInProgress: {
      ...state.pluginLicenseDeactivationInProgress,
      [data.pluginFamily.slug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: data.error
    }
  };
};
const activateLicenseStart = (state, data) => {
  return {
    ...state,
    pluginLicenseActivationInProgress: {
      ...state.pluginLicenseActivationInProgress,
      [data.pluginFamily.slug]: true
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: null
    }
  };
};
const activateLicenseSuccess = (state, data) => {
  return {
    ...state,
    pluginLicenseActivationInProgress: {
      ...state.pluginLicenseActivationInProgress,
      [data.pluginFamily.slug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: null
    }
  };
};
const activateLicenseError = (state, data) => {
  return {
    ...state,
    pluginLicenseActivationInProgress: {
      ...state.pluginLicenseActivationInProgress,
      [data.pluginFamily.slug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: data.error
    }
  };
};
const updatePluginStart = (state, data) => {
  return {
    ...state,
    pluginUpdateInProgress: {
      ...state.pluginUpdateInProgress,
      [data.pluginFamilySlug]: true
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: null
    }
  };
};
const updatePluginSuccess = (state, data) => {
  return {
    ...state,
    pluginUpdateInProgress: {
      ...state.pluginUpdateInProgress,
      [data.pluginFamilySlug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: null
    }
  };
};
const updatePluginError = (state, data) => {
  return {
    ...state,
    pluginUpdateInProgress: {
      ...state.pluginUpdateInProgress,
      [data.pluginFamilySlug]: false
    },
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamilySlug]: data.error
    }
  };
};
const cleanupError = (state, data) => {
  return {
    ...state,
    pluginErrors: {
      ...state.pluginErrors,
      [data.pluginFamily.slug]: null
    }
  };
};
const reducer = (state = DEFAULT_STATE, action) => {
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
/**
 * Plugins dashboard selectors.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\stores\plugins-dashboard
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */

const createMemoizedSelector = selectorFn => {
  let lastArgs = null;
  let lastResult = null;
  return (...args) => {
    // Simple equality check for arguments
    if (!lastArgs || !areArgsEqual(lastArgs, args)) {
      lastArgs = args;
      lastResult = selectorFn(...args);
    }
    return lastResult;
  };
};
const areArgsEqual = (prev, curr) => {
  if (prev.length !== curr.length) return false;
  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== curr[i]) return false;
  }
  return true;
};
const getSelectedFilter = state => {
  return state.selectedFilter;
};
const getPlugins = createMemoizedSelector(state => {
  return sortPlugins(state.plugins);
});
const sortPlugins = pluginFamily => {
  return [...pluginFamily].sort((a, b) => {
    return a.name.localeCompare(b.name, undefined, {
      sensitivity: 'base'
    });
  });
};
const getFilteredPlugins = createMemoizedSelector(state => {
  const plugins = state.plugins;
  const selectedFilter = state.selectedFilter;
  let filteredPlugins;
  if (!selectedFilter || selectedFilter === 'all') {
    filteredPlugins = plugins;
  } else {
    filteredPlugins = plugins.filter(plugin => filterPlugin(plugin, selectedFilter));
  }
  return sortPlugins(filteredPlugins);
});
const getIsLoading = state => {
  return state.isLoading;
};
const getError = state => {
  return state.error;
};
const getCurrentFilter = state => {
  return state.currentFilter;
};
const getPluginInstallationInProgress = state => {
  return state.pluginInstallationInProgress;
};
const getPluginUninstallationInProgress = state => {
  return state.pluginUninstallationInProgress;
};
const getPluginError = state => {
  return state.pluginErrors;
};
const getIsLicenseInputModalOpen = state => {
  return state.isLicenseInputModalOpen;
};
const getIsInstallationTypeModalOpen = state => {
  return state.isInstallationTypeModalOpen;
};
const getPluginActivationInProgress = state => {
  return state.pluginActivationInProgress;
};
const getPluginDeactivationInProgress = state => {
  return state.pluginDeactivationInProgress;
};
const getPluginLicenseActivationInProgress = state => {
  return state.pluginLicenseActivationInProgress;
};
const getPluginLicenseDeactivationInProgress = state => {
  return state.pluginLicenseDeactivationInProgress;
};
const getIsUninstallConfirmationModalOpen = state => {
  return state.isUninstallConfirmationModalOpen;
};
const getIsResolveConflictModalOpen = state => {
  return state.isResolveConflictModalOpen;
};
const getIsUpgradeModalOpen = state => {
  return state.isUpgradeModalOpen;
};
const getPluginUpgradeInProgress = state => {
  return state.pluginUpgradeInProgress;
};
const getPluginUpdateInProgress = state => {
  return state.pluginUpdateInProgress;
};
const getPluginResolveConflictInProgress = state => {
  return state.pluginResolveConflictInProgress;
};
const getSelectedPluginForConflictResolution = state => {
  return state.selectedPluginForConflictResolution;
};
const getIsLicenseInputModalOpenForUpgrade = state => {
  return state.isLicenseInputModalOpenForUpgrade;
};
const getFilterCounts = createMemoizedSelector(state => {
  const plugins = state.plugins;

  // Pre-calculate filter results for better performance
  const filterResults = {
    all: [],
    unlicensed: [],
    expired: [],
    active: [],
    inactive: [],
    notInstalled: [],
    updatesAvailable: []
  };

  // Single pass through plugins to calculate all filters
  plugins.forEach(plugin => {
    filterResults.all.push(plugin);
    if (plugin.proPlugin.isInstalled && plugin.proPlugin.isExpired) {
      filterResults.expired.push(plugin);
    }
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
    expired: filterResults.expired.length,
    active: filterResults.active.length,
    inactive: filterResults.inactive.length,
    notInstalled: filterResults.notInstalled.length,
    updatesAvailable: filterResults.updatesAvailable.length
  };
});
const filterPlugin = (plugin, selectedFilter) => {
  switch (selectedFilter) {
    case 'notInstalled':
      return !plugin.hasAnyVersionInstalled;
    case 'expired':
      return plugin.proPlugin.isInstalled && plugin.proPlugin.isExpired;
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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!*************************************************!*\
  !*** ./resources/src/jsx/plugins-dashboard.jsx ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
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

// Use the React DOM that WordPress already loads instead of bundling a second copy.





const {
  apiNonce
} = window.ppHubPluginsDashboardConfig || {};
const pluginsDashboardContainer = document.getElementById('publishpress-hub-plugins-dashboard-container');
if (pluginsDashboardContainer) {
  // Ensure REST requests use a nonce (prevents CSRF for cookie-authenticated requests).
  if (apiNonce) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().createNonceMiddleware(apiNonce));
  }
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(pluginsDashboardContainer);
  root.render(/*#__PURE__*/React.createElement(_components_pages_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__.PluginsDashboard, null));
  const currentTheme = (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_4__.getCurrentTheme)();
  (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_4__.setTheme)(currentTheme);
}
})();

/******/ })()
;
//# sourceMappingURL=plugins-dashboard.js.map
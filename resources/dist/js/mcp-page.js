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

/***/ "./resources/src/jsx/components/notices/SnackbarList.jsx"
/*!***************************************************************!*\
  !*** ./resources/src/jsx/components/notices/SnackbarList.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./resources/src/jsx/components/pages/mcp-page.jsx"
/*!*********************************************************!*\
  !*** ./resources/src/jsx/components/pages/mcp-page.jsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   McpPage: () => (/* binding */ McpPage)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../admin-page */ "./resources/src/jsx/components/admin-page/index.jsx");
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _notices_SnackbarList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../notices/SnackbarList */ "./resources/src/jsx/components/notices/SnackbarList.jsx");
/* harmony import */ var _mcp_panel__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mcp/panel */ "./resources/src/jsx/components/pages/mcp/panel.jsx");
/* harmony import */ var _mcp_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./mcp/actions */ "./resources/src/jsx/components/pages/mcp/actions.jsx");
/* harmony import */ var _mcp_client_setup__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./mcp/client-setup */ "./resources/src/jsx/components/pages/mcp/client-setup.jsx");
/* harmony import */ var _mcp_use_mcp_connection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./mcp/use-mcp-connection */ "./resources/src/jsx/components/pages/mcp/use-mcp-connection.js");
/**
 * AI Connections page rendered through Hub's shared React layout.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */












const config = window.ppHubMcpConfig || {};
const McpPageComponent = () => {
  const connection = (0,_mcp_use_mcp_connection__WEBPACK_IMPORTED_MODULE_10__.useMcpConnection)();
  const {
    state,
    draft,
    edits,
    loading,
    saving,
    dirty,
    notice
  } = connection;
  const {
    createSuccessNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/notices');
  const [transitioning, setTransitioning] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const journey = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const stepHeading = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const movedToStep = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const transitionLock = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const busy = loading || saving;
  const stage = state?.setupStage;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (notice?.status === 'success') {
      createSuccessNotice(notice.message, {
        type: 'snackbar',
        isDismissible: true
      });
      connection.setNotice(null);
    }
  }, [notice, createSuccessNotice, connection.setNotice]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (transitioning) {
      movedToStep.current = true;
      journey.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        block: 'start'
      });
    } else if (movedToStep.current) {
      movedToStep.current = false;
      stepHeading.current?.focus({
        preventScroll: true
      });
    }
  }, [transitioning]);
  const runStep = async action => {
    if (transitionLock.current || busy) return;
    transitionLock.current = true;
    setTransitioning(true);
    try {
      await action();
    } finally {
      transitionLock.current = false;
      setTransitioning(false);
    }
  };
  const save = () => stage === 'access' ? runStep(() => connection.save()) : connection.save();
  const nextStep = state?.nextStep;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (stage !== 'prerequisite' || nextStep?.key !== 'adapter') return;
    const checkStatus = () => connection.refresh();
    window.addEventListener('focus', checkStatus);
    return () => window.removeEventListener('focus', checkStatus);
  }, [stage, nextStep?.key, connection.refresh]);
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_4__.AdminPageLayout, {
    logoUrl: config.logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "mcp-page"
  }, /*#__PURE__*/React.createElement("section", {
    className: "mcp-welcome",
    "aria-labelledby": "mcp-overview-heading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mcp-welcome-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mcp-eyebrow"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('AI Connections', 'publishpress-hub')), /*#__PURE__*/React.createElement("h1", {
    id: "mcp-overview-heading"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Allow PublishPress to connect with your favorite AI service', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Use your AI to work with PublishPress plugins on this site.', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
    className: "mcp-connection-toggle",
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable AI connections', 'publishpress-hub'),
    checked: draft.enabled,
    disabled: busy || !state,
    onChange: enabled => enabled ? runStep(() => connection.save({
      enabled
    })) : connection.save({
      enabled
    })
  })), /*#__PURE__*/React.createElement("div", {
    className: "mcp-welcome-art",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("img", {
    src: config.welcomeImageUrl,
    alt: ""
  }))), notice && notice.status !== 'success' && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: notice.status,
    onRemove: () => connection.setNotice(null)
  }, notice.message), /*#__PURE__*/React.createElement("div", {
    className: "mcp-journey",
    ref: journey,
    "aria-busy": busy
  }, transitioning || !state && loading ? /*#__PURE__*/React.createElement(_mcp_panel__WEBPACK_IMPORTED_MODULE_7__.McpSkeleton, null) : /*#__PURE__*/React.createElement(React.Fragment, null, !state && !loading && /*#__PURE__*/React.createElement(_mcp_panel__WEBPACK_IMPORTED_MODULE_7__.McpPanel, null, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "secondary",
    onClick: connection.refresh
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Try again', 'publishpress-hub'))), stage === 'prerequisite' && nextStep && /*#__PURE__*/React.createElement(_mcp_panel__WEBPACK_IMPORTED_MODULE_7__.McpPanel, {
    className: "mcp-next-step"
  }, /*#__PURE__*/React.createElement("h2", {
    ref: stepHeading,
    tabIndex: -1
  }, nextStep.label), /*#__PURE__*/React.createElement("p", null, nextStep.description), nextStep.key === 'adapter' ? /*#__PURE__*/React.createElement("div", {
    className: "mcp-step-actions"
  }, state.canInstallAdapter && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "primary",
    disabled: busy,
    isLoading: saving,
    onClick: () => runStep(connection.install)
  }, state.adapterInstalled ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Activate MCP Adapter', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Install and activate MCP Adapter', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "secondary",
    href: "https://wordpress.org/plugins/mcp-adapter/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('MCP Adapter plugin page', 'publishpress-hub')), state.adapterInstalled && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "secondary",
    href: state.pluginsUrl,
    target: "_self"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Manage plugins', 'publishpress-hub'))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "secondary",
    href: nextStep.url,
    target: "_self"
  }, nextStep.action), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "secondary",
    disabled: busy,
    onClick: () => runStep(connection.refresh)
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Check again', 'publishpress-hub'))))), stage === 'connect' && /*#__PURE__*/React.createElement(_mcp_client_setup__WEBPACK_IMPORTED_MODULE_9__.McpClientSetup, {
    headingRef: stepHeading,
    state: state,
    selected: draft.client,
    busy: busy,
    onSelect: client => connection.setDraft({
      client
    }),
    onFinish: () => runStep(() => connection.save({
      setupComplete: true
    }))
  }), stage === 'manage' && /*#__PURE__*/React.createElement(_mcp_panel__WEBPACK_IMPORTED_MODULE_7__.McpPanel, {
    className: "mcp-manage-summary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mcp-section-heading"
  }, /*#__PURE__*/React.createElement("h2", {
    ref: stepHeading,
    tabIndex: -1
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Your AI connection is enabled', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "secondary",
    disabled: busy,
    onClick: () => runStep(() => connection.save({
      setupComplete: false
    }))
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connect another AI app', 'publishpress-hub'))), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Manage the actions your AI can use below. To set up another app or computer, open the connection steps again.', 'publishpress-hub'))), (stage === 'access' || stage === 'manage') && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_mcp_panel__WEBPACK_IMPORTED_MODULE_7__.McpPanel, null, /*#__PURE__*/React.createElement("h2", {
    ref: stage === 'access' ? stepHeading : undefined,
    tabIndex: stage === 'access' ? -1 : undefined
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Control what your AI can do', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Allow AI to read site data', 'publishpress-hub'),
    checked: draft.readsEnabled,
    onChange: readsEnabled => connection.setDraft({
      readsEnabled
    }),
    disabled: busy
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Allow AI to change site data', 'publishpress-hub'),
    checked: draft.writesEnabled,
    onChange: writesEnabled => connection.setDraft({
      writesEnabled
    }),
    disabled: busy
  }), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You can change these choices at any time. Turn off change access to let your AI only read site data.', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_mcp_actions__WEBPACK_IMPORTED_MODULE_8__.McpActions, {
    state: state,
    edits: edits,
    busy: busy,
    onAction: connection.setAction,
    onNavigate: connection.navigate
  }), /*#__PURE__*/React.createElement(_mcp_panel__WEBPACK_IMPORTED_MODULE_7__.McpPanel, {
    className: "mcp-diagnostics"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Connection diagnostics', 'publishpress-hub'),
    initialOpen: false
  }, /*#__PURE__*/React.createElement("table", {
    className: "widefat striped"
  }, /*#__PURE__*/React.createElement("tbody", null, Object.entries(state.diagnostics).map(([label, value]) => /*#__PURE__*/React.createElement("tr", {
    key: label
  }, /*#__PURE__*/React.createElement("th", {
    scope: "row"
  }, label), /*#__PURE__*/React.createElement("td", null, value)))))))))), state && !transitioning && ['access', 'manage', 'connect'].includes(stage) && /*#__PURE__*/React.createElement("div", {
    className: "mcp-save-bar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mcp-save-status",
    role: "status"
  }, dirty && (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('You have unsaved changes.', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "primary",
    disabled: busy || !dirty && stage !== 'access',
    isLoading: saving,
    onClick: save
  }, stage === 'access' ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save and continue', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Changes', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_5__["default"], {
    variant: "secondary",
    disabled: busy,
    onClick: connection.refresh
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Refresh status', 'publishpress-hub')))), /*#__PURE__*/React.createElement(_notices_SnackbarList__WEBPACK_IMPORTED_MODULE_6__["default"], null));
};
const McpPage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(McpPageComponent);

/***/ },

/***/ "./resources/src/jsx/components/pages/mcp/actions.jsx"
/*!************************************************************!*\
  !*** ./resources/src/jsx/components/pages/mcp/actions.jsx ***!
  \************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   McpActions: () => (/* binding */ McpActions)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _badge_badge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../badge/badge */ "./resources/src/jsx/components/badge/badge.jsx");
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./panel */ "./resources/src/jsx/components/pages/mcp/panel.jsx");
/* harmony import */ var _connection_state__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./connection-state */ "./resources/src/jsx/components/pages/mcp/connection-state.js");
/**
 * Action selection, filtering and pagination using React controls.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */








const McpActions = ({
  state,
  edits,
  busy,
  onAction,
  onNavigate
}) => {
  const view = state.actionView;
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(view.search);
  const [behavior, setBehavior] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(view.behavior);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSearch(view.search);
    setBehavior(view.behavior);
  }, [view.search, view.behavior]);
  const tabs = Object.entries(view.groups).map(([name, group]) => ({
    name,
    title: /*#__PURE__*/React.createElement(React.Fragment, null, group.label, /*#__PURE__*/React.createElement("span", {
      className: "mcp-tab-count"
    }, (0,_connection_state__WEBPACK_IMPORTED_MODULE_6__.selectedCount)(name, group, edits, state.disabledActions), "/", group.total))
  }));
  return /*#__PURE__*/React.createElement(_panel__WEBPACK_IMPORTED_MODULE_5__.McpPanel, {
    className: "mcp-actions",
    "aria-busy": busy
  }, /*#__PURE__*/React.createElement("div", {
    className: "mcp-section-heading"
  }, /*#__PURE__*/React.createElement("h2", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Available actions', 'publishpress-hub')), busy && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null)), /*#__PURE__*/React.createElement("p", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Choose WordPress and plugin actions. Your selections are kept while you browse. Save changes to apply them.', 'publishpress-hub')), /*#__PURE__*/React.createElement("fieldset", {
    className: "mcp-action-controls",
    disabled: busy
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    key: view.plugin,
    className: "mcp-tabs",
    tabs: tabs,
    initialTabName: view.plugin,
    onSelect: plugin => !busy && plugin !== view.plugin && onNavigate({
      plugin,
      action_page: 1
    })
  }, () => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    className: "mcp-filters",
    onSubmit: event => {
      event.preventDefault();
      onNavigate({
        search,
        behavior,
        action_page: 1
      });
    }
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SearchControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search actions', 'publishpress-hub'),
    value: search,
    onChange: setSearch,
    disabled: busy
  }), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Action type', 'publishpress-hub'),
    value: behavior,
    onChange: setBehavior,
    disabled: busy,
    options: [{
      value: '',
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All actions', 'publishpress-hub')
    }, {
      value: 'read',
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Read only', 'publishpress-hub')
    }, {
      value: 'write',
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Changes site data', 'publishpress-hub')
    }, {
      value: 'destructive',
      label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Potentially destructive', 'publishpress-hub')
    }]
  }), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: "secondary",
    type: "submit",
    disabled: busy
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Filter', 'publishpress-hub'))), /*#__PURE__*/React.createElement("table", {
    className: "widefat striped mcp-action-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Selected', 'publishpress-hub')), /*#__PURE__*/React.createElement("th", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Action', 'publishpress-hub')), /*#__PURE__*/React.createElement("th", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Behavior', 'publishpress-hub')))), /*#__PURE__*/React.createElement("tbody", null, !view.actions.length && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "3"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No actions match these filters.', 'publishpress-hub'))), view.actions.map(action => /*#__PURE__*/React.createElement("tr", {
    key: action.name
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
    label: /*#__PURE__*/React.createElement("span", {
      className: "screen-reader-text"
    }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select %s', 'publishpress-hub'), action.label)),
    checked: (0,_connection_state__WEBPACK_IMPORTED_MODULE_6__.isSelected)(action.name, edits, state.disabledActions),
    onChange: checked => onAction(action.name, checked),
    disabled: busy
  })), /*#__PURE__*/React.createElement("td", null, action.label), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(_badge_badge__WEBPACK_IMPORTED_MODULE_4__["default"], {
    className: "mcp-badge"
  }, action.readonly ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Read only', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Changes site data', 'publishpress-hub')), !action.readonly && action.destructive && /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Potentially destructive', 'publishpress-hub'))))))), /*#__PURE__*/React.createElement("div", {
    className: "mcp-pagination"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mcp-page-size"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "mcp-actions-per-page"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Actions per page', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    id: "mcp-actions-per-page",
    value: view.perPage || 10,
    disabled: busy,
    options: [10, 25, 50, 100].map(count => ({
      value: count,
      label: String(count)
    })),
    onChange: count => onNavigate({
      per_page: Number(count),
      action_page: 1
    })
  })), /*#__PURE__*/React.createElement("span", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Page %1$d of %2$d - %3$d actions', 'publishpress-hub'), view.page, view.pages, view.total)), view.page > 1 && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: "secondary",
    disabled: busy,
    onClick: () => onNavigate({
      action_page: view.page - 1
    })
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Previous', 'publishpress-hub')), view.page < view.pages && /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: "secondary",
    disabled: busy,
    onClick: () => onNavigate({
      action_page: view.page + 1
    })
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next', 'publishpress-hub')))))));
};

/***/ },

/***/ "./resources/src/jsx/components/pages/mcp/client-setup.jsx"
/*!*****************************************************************!*\
  !*** ./resources/src/jsx/components/pages/mcp/client-setup.jsx ***!
  \*****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   McpClientSetup: () => (/* binding */ McpClientSetup)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panel */ "./resources/src/jsx/components/pages/mcp/panel.jsx");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./configuration */ "./resources/src/jsx/components/pages/mcp/configuration.jsx");
/**
 * React assisted and manual client setup guides.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */






const McpClientSetup = ({
  state,
  selected,
  busy,
  headingRef,
  onSelect,
  onFinish
}) => {
  const client = state.clientSetups[selected];
  const disabled = busy;
  const passwordLink = /*#__PURE__*/React.createElement("a", {
    href: state.profileUrl
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Create an application password', 'publishpress-hub'));
  return /*#__PURE__*/React.createElement(_panel__WEBPACK_IMPORTED_MODULE_3__.McpPanel, {
    className: "mcp-connect-step"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mcp-section-heading"
  }, /*#__PURE__*/React.createElement("h2", {
    ref: headingRef,
    tabIndex: -1
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Connect your AI app', 'publishpress-hub')), /*#__PURE__*/React.createElement("a", {
    href: "https://publishpress.com/knowledge-base/hub-mcp/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View the PublishPress AI connection guide', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RadioControl, {
    className: "mcp-client-choices",
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('How would you like to connect?', 'publishpress-hub'),
    selected: selected,
    onChange: onSelect,
    disabled: disabled,
    options: Object.entries(state.clientSetups).map(([value, item]) => ({
      value,
      label: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, item.label), /*#__PURE__*/React.createElement("span", {
        className: "mcp-client-description"
      }, item.description))
    }))
  }), /*#__PURE__*/React.createElement("div", {
    className: "mcp-client-panel",
    key: selected
  }, /*#__PURE__*/React.createElement("h3", null, client.label), /*#__PURE__*/React.createElement("div", {
    className: "mcp-instruction-box"
  }, /*#__PURE__*/React.createElement("ol", null, selected === 'manual' && /*#__PURE__*/React.createElement("li", null, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Install Node.js LTS if it is not already available.', 'publishpress-hub'), " ", /*#__PURE__*/React.createElement("a", {
    href: "https://nodejs.org/en/download",
    target: "_blank",
    rel: "noopener noreferrer"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Download Node.js', 'publishpress-hub'))), /*#__PURE__*/React.createElement("li", null, passwordLink, ". ", (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name it PublishPress AI and copy the password.', 'publishpress-hub')), /*#__PURE__*/React.createElement("li", null, selected === 'assistant' ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Copy the prompt below and paste it into your AI agent.', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Replace the password placeholder in your local configuration. Merge this server using the MCP configuration format for your app, keeping any existing servers. Restart your app and approve the connection.', 'publishpress-hub'))), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enter the password in your app or configuration file, not in the chat.', 'publishpress-hub'))), /*#__PURE__*/React.createElement(_configuration__WEBPACK_IMPORTED_MODULE_4__.McpConfiguration, {
    key: selected,
    client: client,
    assistant: selected === 'assistant',
    busy: disabled
  })), /*#__PURE__*/React.createElement("div", {
    className: "mcp-instruction-box mcp-connect-complete"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_2__["default"], {
    variant: "primary",
    onClick: onFinish,
    disabled: disabled
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('I have connected my AI app', 'publishpress-hub')), /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Confirm after your AI app verifies this site and performs a read-only lookup. If you enabled write actions, check that those tools are available too.', 'publishpress-hub'))));
};

/***/ },

/***/ "./resources/src/jsx/components/pages/mcp/configuration.jsx"
/*!******************************************************************!*\
  !*** ./resources/src/jsx/components/pages/mcp/configuration.jsx ***!
  \******************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   McpConfiguration: () => (/* binding */ McpConfiguration),
/* harmony export */   downloadFile: () => (/* binding */ downloadFile)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../buttons/button */ "./resources/src/jsx/components/buttons/button.jsx");
/**
 * Copyable configuration and prompt downloads with accessible feedback.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */





const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
const McpConfiguration = ({
  client,
  assistant,
  busy
}) => {
  const field = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const timer = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [feedback, setFeedback] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [copied, setCopied] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(client.content);
      setCopied(true);
      setFeedback((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copied to clipboard.', 'publishpress-hub'));
    } catch (error) {
      field.current?.focus();
      field.current?.select();
      setFeedback((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select and copy the highlighted text.', 'publishpress-hub'));
    }
    timer.current = setTimeout(() => {
      setCopied(false);
      setFeedback('');
    }, 3000);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mcp-instruction-box mcp-configuration"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
    ref: field,
    label: assistant ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Your setup prompt', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Server configuration', 'publishpress-hub'),
    value: client.content,
    readOnly: true,
    rows: 12,
    spellCheck: false
  }), /*#__PURE__*/React.createElement("div", {
    className: "mcp-artifact-actions"
  }, /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: "secondary",
    onClick: copy,
    disabled: busy
  }, copied ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copied!', 'publishpress-hub') : assistant ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy setup prompt', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Copy configuration', 'publishpress-hub')), /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_3__["default"], {
    variant: "secondary",
    disabled: busy,
    onClick: () => downloadFile(new Blob([client.content], {
      type: 'text/plain;charset=utf-8'
    }), client.filename)
  }, assistant ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Download prompt', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Download configuration', 'publishpress-hub'))), /*#__PURE__*/React.createElement("span", {
    className: "mcp-copy-feedback",
    role: "status",
    "aria-live": "polite"
  }, feedback));
};

/***/ },

/***/ "./resources/src/jsx/components/pages/mcp/panel.jsx"
/*!**********************************************************!*\
  !*** ./resources/src/jsx/components/pages/mcp/panel.jsx ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   McpPanel: () => (/* binding */ McpPanel),
/* harmony export */   McpSkeleton: () => (/* binding */ McpSkeleton)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Shared card and loading presentation for AI connection steps.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */



const McpPanel = ({
  children,
  className = '',
  ...props
}) => /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Card, _extends({
  className: `mcp-panel ${className}`
}, props), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CardBody, null, children));
const McpSkeleton = () => /*#__PURE__*/React.createElement(McpPanel, {
  className: "mcp-step-loading",
  role: "status",
  "aria-live": "polite"
}, /*#__PURE__*/React.createElement("span", {
  className: "screen-reader-text"
}, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading the next step...', 'publishpress-hub')), /*#__PURE__*/React.createElement("div", {
  className: "mcp-skeleton mcp-skeleton-heading",
  "aria-hidden": "true"
}), /*#__PURE__*/React.createElement("div", {
  className: "mcp-skeleton",
  "aria-hidden": "true"
}), /*#__PURE__*/React.createElement("div", {
  className: "mcp-skeleton",
  "aria-hidden": "true"
}), /*#__PURE__*/React.createElement("div", {
  className: "mcp-skeleton-choices",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)));

/***/ },

/***/ "./resources/src/jsx/components/pages/mcp/connection-state.js"
/*!********************************************************************!*\
  !*** ./resources/src/jsx/components/pages/mcp/connection-state.js ***!
  \********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connectionPath: () => (/* binding */ connectionPath),
/* harmony export */   isSelected: () => (/* binding */ isSelected),
/* harmony export */   readFilters: () => (/* binding */ readFilters),
/* harmony export */   requestPath: () => (/* binding */ requestPath),
/* harmony export */   savePayload: () => (/* binding */ savePayload),
/* harmony export */   savedDraft: () => (/* binding */ savedDraft),
/* harmony export */   selectedCount: () => (/* binding */ selectedCount)
/* harmony export */ });
/**
 * AI connection draft and filter operations.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */

const connectionPath = '/publishpress-hub/v1/mcp/connection';

const readFilters = (url) => ({
    plugin: url.searchParams.get('plugin') || '',
    search: url.searchParams.get('search') || '',
    behavior: url.searchParams.get('behavior') || '',
    action_page: Math.max(1, parseInt(url.searchParams.get('action_page'), 10) || 1),
    per_page: [10, 25, 50, 100].includes(Number(url.searchParams.get('per_page'))) ? Number(url.searchParams.get('per_page')) : 10,
});

const requestPath = (filters) => `${connectionPath}?${new URLSearchParams(filters)}`;

const savedDraft = (state) => ({
    enabled: state.connectionEnabled,
    readsEnabled: state.readsEnabled !== false,
    writesEnabled: state.writesEnabled,
    client: state.selectedClient,
});

const isSelected = (name, edits, disabled) => Object.prototype.hasOwnProperty.call(edits, name)
    ? edits[name] : !disabled.includes(name);

const savePayload = (state, draft, edits, filters, overrides = {}) => {
    const scope = [...new Set([...state.actionView.actions.map((action) => action.name), ...Object.keys(edits)])];
    return {
        ...filters,
        ...draft,
        setupComplete: state.setupComplete,
        reviewActions: state.setupStage === 'access' && !Object.prototype.hasOwnProperty.call(overrides, 'enabled'),
        displayedActions: scope,
        selectedActions: scope.filter((name) => isSelected(name, edits, state.disabledActions)),
        ...overrides,
    };
};

const selectedCount = (plugin, group, edits, disabled) => group.selected + Object.entries(edits)
    .filter(([name]) => name.startsWith(`${plugin}/`))
    .reduce((total, [name, checked]) => total + Number(checked) - Number(!disabled.includes(name)), 0);


/***/ },

/***/ "./resources/src/jsx/components/pages/mcp/use-mcp-connection.js"
/*!**********************************************************************!*\
  !*** ./resources/src/jsx/components/pages/mcp/use-mcp-connection.js ***!
  \**********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useMcpConnection: () => (/* binding */ useMcpConnection)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _connection_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./connection-state */ "./resources/src/jsx/components/pages/mcp/connection-state.js");
/**
 * React state and REST requests for AI connection setup.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */






const useMcpConnection = () => {
    const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const [draft, setDraft] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({ enabled: false, readsEnabled: true, writesEnabled: false, client: 'assistant' });
    const [edits, setEdits] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
    const [filters, setFilters] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(() => (0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.readFilters)(new URL(window.location.href)));
    const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const request = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
    const sequence = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(0);
    const mounted = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);
    const busy = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const initialized = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const dirty = state && (Object.keys(edits).length > 0 || Object.entries((0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.savedDraft)(state))
        .some(([key, value]) => draft[key] !== value));

    const load = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (nextFilters, replaceDraft = false) => {
        request.current?.abort();
        const controller = new AbortController();
        request.current = controller;
        const id = ++sequence.current;
        setLoading(true);
        try {
            const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({ path: (0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.requestPath)(nextFilters), signal: controller.signal });
            if (!mounted.current || id !== sequence.current) return false;
            if (!result.success || !result.state) throw new Error(result.message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('AI connections could not be loaded.', 'publishpress-hub'));
            setState(result.state);
            setNotice(null);
            setFilters(nextFilters);
            if (!initialized.current || replaceDraft) {
                setDraft((0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.savedDraft)(result.state));
                setEdits({});
                initialized.current = true;
            }
            return true;
        } catch (error) {
            if (mounted.current && id === sequence.current && error.name !== 'AbortError') {
                setNotice({ status: 'error', message: error.message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('AI connections could not be loaded. Try again.', 'publishpress-hub') });
            }
            return false;
        } finally {
            if (mounted.current && id === sequence.current) setLoading(false);
        }
    }, []);

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        mounted.current = true;
        load((0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.readFilters)(new URL(window.location.href)));
        const handlePopState = () => {
            if (!busy.current) load((0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.readFilters)(new URL(window.location.href)));
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            mounted.current = false;
            request.current?.abort();
            window.removeEventListener('popstate', handlePopState);
        };
    }, [load]);

    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        const warn = (event) => {
            if (dirty) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);

    const navigate = async (changes) => {
        if (busy.current) return;
        const next = { ...filters, ...changes };
        if (await load(next)) {
            const url = new URL(window.location.href);
            Object.entries(next).forEach(([key, value]) => url.searchParams.set(key, value));
            window.history.pushState({ mcp: true }, '', url);
        }
    };

    const save = async (overrides = {}) => {
        if (busy.current || !state) return false;
        busy.current = true;
        request.current?.abort();
        ++sequence.current;
        setLoading(false);
        setSaving(true);
        setNotice(null);
        try {
            const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
                path: '/publishpress-hub/v1/mcp/connection',
                method: 'POST',
                data: (0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.savePayload)(state, draft, edits, filters, overrides),
            });
            if (!result.success || !result.state) throw new Error(result.message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Changes could not be saved.', 'publishpress-hub'));
            if (!mounted.current) return false;
            setState(result.state);
            setDraft((0,_connection_state__WEBPACK_IMPORTED_MODULE_3__.savedDraft)(result.state));
            setEdits({});
            setNotice({ status: 'success', message: result.message });
            return true;
        } catch (error) {
            if (mounted.current) setNotice({ status: 'error', message: error.message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Changes could not be saved. Try again.', 'publishpress-hub') });
            return false;
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };

    const install = async () => {
        if (busy.current) return;
        busy.current = true;
        setSaving(true);
        setNotice(null);
        try {
            const result = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({ path: '/publishpress-hub/v1/mcp/adapter', method: 'POST' });
            if (!result.success) throw new Error(result.message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('MCP Adapter could not be installed or activated.', 'publishpress-hub'));
            // Activation registers capabilities and routes on the next WordPress request.
            const refreshed = await load(filters);
            if (refreshed && mounted.current) setNotice({ status: 'success', message: result.message });
        } catch (error) {
            if (mounted.current) setNotice({ status: 'error', message: error.message || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Use the MCP Adapter plugin page or contact your host.', 'publishpress-hub') });
        } finally {
            busy.current = false;
            if (mounted.current) setSaving(false);
        }
    };

    return {
        state, draft, edits, loading, saving, dirty, notice, setNotice,
        setDraft: (values) => setDraft((current) => ({ ...current, ...values })),
        setAction: (name, checked) => setEdits((current) => {
            const next = { ...current };
            if (checked === !state.disabledActions.includes(name)) delete next[name];
            else next[name] = checked;
            return next;
        }),
        navigate, save, install, refresh: () => !busy.current && load(filters, !dirty),
    };
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

/***/ "@wordpress/data"
/*!**************************!*\
  !*** external "wp.data" ***!
  \**************************/
(module) {

module.exports = wp.data;

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
/*!****************************************!*\
  !*** ./resources/src/jsx/mcp-page.jsx ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_pages_mcp_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pages/mcp-page */ "./resources/src/jsx/components/pages/mcp-page.jsx");
/* harmony import */ var _utils_themeController__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/themeController */ "./resources/src/jsx/utils/themeController.js");
/**
 * AI Connections React page entry point.
 *
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.2.0
 */





const container = document.getElementById('publishpress-hub-mcp-page-container');
if (container) {
  const {
    apiNonce
  } = window.ppHubMcpConfig || {};
  if (apiNonce) _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().createNonceMiddleware(apiNonce));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(container).render(/*#__PURE__*/React.createElement(_components_pages_mcp_page__WEBPACK_IMPORTED_MODULE_2__.McpPage, null));
  (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_3__.setTheme)((0,_utils_themeController__WEBPACK_IMPORTED_MODULE_3__.getCurrentTheme)());
}
})();

/******/ })()
;
//# sourceMappingURL=mcp-page.js.map
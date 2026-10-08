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
    disabled: disabled || isLoading,
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
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @publishpress-hub/i18n */ "@publishpress-hub/i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../admin-page */ "./resources/src/jsx/components/admin-page/index.jsx");
/* harmony import */ var _settings_DiagnosticsTab__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./settings/DiagnosticsTab */ "./resources/src/jsx/components/pages/settings/DiagnosticsTab.jsx");
/* harmony import */ var _settings_DebugLogTab__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./settings/DebugLogTab */ "./resources/src/jsx/components/pages/settings/DebugLogTab.jsx");
/**
 * Settings page.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */








const {
  logoUrl,
  debugModeEnabled
} = window.ppHubSettingsPageConfig || {};
const TAB_QUERY_PARAM = 'tab';
const buildTabs = () => {
  const tabs = [{
    name: 'diagnostics',
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Diagnostics', 'publishpress-hub'),
    className: 'pp-hub-settings-tab'
  }];
  if (debugModeEnabled) {
    tabs.push({
      name: 'debug-log',
      title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug Log', 'publishpress-hub'),
      className: 'pp-hub-settings-tab'
    });
  }
  return tabs;
};
const getInitialTabName = tabs => {
  const defaultTab = tabs[0]?.name || '';
  if (!defaultTab) {
    return '';
  }
  const currentUrl = new URL(window.location.href);
  const selectedTab = currentUrl.searchParams.get(TAB_QUERY_PARAM);
  const hasSelectedTab = tabs.some(tab => tab.name === selectedTab);
  return hasSelectedTab ? selectedTab : defaultTab;
};
const updateSelectedTabInUrl = tabName => {
  if (!tabName) {
    return;
  }
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set(TAB_QUERY_PARAM, tabName);
  window.history.replaceState({}, '', currentUrl.toString());
};
const renderTab = tab => {
  if (tab.name === 'debug-log') {
    return /*#__PURE__*/React.createElement(_settings_DebugLogTab__WEBPACK_IMPORTED_MODULE_6__.DebugLogTab, null);
  }
  return /*#__PURE__*/React.createElement(_settings_DiagnosticsTab__WEBPACK_IMPORTED_MODULE_5__.DiagnosticsTab, null);
};
const SettingsPageComponent = () => {
  const title = (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Settings', 'publishpress-hub');
  const tabs = buildTabs();
  const initialTabName = getInitialTabName(tabs);
  const [isLoadingReport, setIsLoadingReport] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchReport = async () => {
    const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/publishpress-hub/v1/settings/site-health-report'
    });
    return response;
  };
  const copyTextToClipboard = async text => {
    const copyViaExecCommand = () => {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      const success = document.execCommand('copy');
      document.body.removeChild(el);
      return success;
    };
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (error) {
        if (copyViaExecCommand()) {
          return;
        }
        throw error;
      }
    }
    if (!copyViaExecCommand()) {
      throw new Error('execCommand copy failed');
    }
  };
  const handleCopyReport = async () => {
    setIsLoadingReport(true);
    setNotice(null);
    try {
      const response = await fetchReport();
      await copyTextToClipboard(response.report || '');
      setNotice({
        status: 'success',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Site health report copied to clipboard.', 'publishpress-hub')
      });
    } catch (error) {
      setNotice({
        status: 'error',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to copy the site health report. Please try again.', 'publishpress-hub')
      });
    } finally {
      setIsLoadingReport(false);
    }
  };
  const handleDownloadReport = async () => {
    setIsLoadingReport(true);
    setNotice(null);
    try {
      const response = await fetchReport();
      const blob = new Blob([response.report || ''], {
        type: 'text/plain;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = response.filename || 'publishpress-hub-site-health-report.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setNotice({
        status: 'success',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Site health report downloaded.', 'publishpress-hub')
      });
    } catch (error) {
      setNotice({
        status: 'error',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to download the site health report. Please try again.', 'publishpress-hub')
      });
    } finally {
      setIsLoadingReport(false);
    }
  };
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_4__.AdminPageLayout, {
    title: title,
    logoUrl: logoUrl
  }, notice && /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-settings-page__notice"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: notice.status,
    isDismissible: true,
    onRemove: () => setNotice(null)
  }, notice.message)), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-settings-page"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    className: "pp-hub-settings-tabs",
    tabs: tabs,
    initialTabName: initialTabName,
    onSelect: tabName => updateSelectedTabInUrl(tabName)
  }, renderTab), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-settings-page__report-actions"
  }, /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: handleCopyReport,
    isBusy: isLoadingReport,
    disabled: isLoadingReport
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Copy Site Health Report', 'publishpress-hub')), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    variant: "secondary",
    onClick: handleDownloadReport,
    disabled: isLoadingReport
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Download Site Health Report', 'publishpress-hub')))));
};
const SettingsPage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(SettingsPageComponent);

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
/**
 * Debug log viewer tab.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */






const VIEW_REQUESTS = 'requests';
const VIEW_FULL_LOG = 'full-log';
const REFRESH_INTERVALS = [{
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
const DebugLogTabComponent = () => {
  const [logContent, setLogContent] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isClearing, setIsClearing] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [viewMode, setViewMode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(VIEW_REQUESTS);
  const [autoRefresh, setAutoRefresh] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [intervalSeconds, setIntervalSeconds] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(5);
  const [countdown, setCountdown] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(5);

  // Single timer ref — only one setInterval ever runs at a time.
  const tickRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Mutable refs so the single 1s tick closure never goes stale.
  // Changing the interval value only updates these refs; the timer is NOT recreated.
  const intervalSecondsRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(5);
  const countdownValueRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(5);

  // Tracks the active AbortController so we can cancel in-flight requests.
  const abortControllerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Cancel any in-flight request.
  const cancelInFlightRequest = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Abort on unmount so state is never set on an unmounted component.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    return () => {
      cancelInFlightRequest();
    };
  }, [cancelInFlightRequest]);

  // Silent fetch for auto-refresh — no loading spinner, no error notice.
  const fetchLogSilent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    cancelInFlightRequest();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/publishpress-hub/v1/settings/debug-log',
        signal: controller.signal
      });
      setLogContent(response.log || '');
    } catch {
      // AbortError or transient network error — silently ignored during polling.
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  }, [cancelInFlightRequest]);

  // Manual fetch — shows loading state and error notice on failure.
  const fetchLog = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    cancelInFlightRequest();
    setIsLoading(true);
    setNotice(null);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    try {
      const response = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/publishpress-hub/v1/settings/debug-log',
        signal: controller.signal
      });
      setLogContent(response.log || '');
    } catch (error) {
      if (error?.name !== 'AbortError') {
        setNotice({
          status: 'error',
          message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to load the debug log. Please try again.', 'publishpress-hub')
        });
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setIsLoading(false);
    }
  }, [cancelInFlightRequest]);

  // Initial load.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchLog();
  }, [fetchLog]);

  // Auto-refresh: a single 1s tick reads mutable refs so it never goes stale
  // and never needs to be recreated when the interval value changes.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
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
    tickRef.current = setInterval(() => {
      countdownValueRef.current -= 1;
      setCountdown(countdownValueRef.current);
      if (countdownValueRef.current <= 0) {
        // Reset and fire.
        countdownValueRef.current = intervalSecondsRef.current;
        setCountdown(intervalSecondsRef.current);
        fetchLogSilent();
      }
    }, 1000);
    return () => {
      clearInterval(tickRef.current);
      tickRef.current = null;
    };
    // intervalSeconds intentionally omitted — changes are handled via refs below.
  }, [autoRefresh, fetchLogSilent]); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing the interval updates refs immediately; the running timer picks up
  // the new value on its next tick without needing to be recreated.
  const handleIntervalChange = e => {
    const value = Number(e.target.value);
    setIntervalSeconds(value);
    intervalSecondsRef.current = value;
    countdownValueRef.current = value;
    setCountdown(value);
  };
  const handleClearLog = async () => {
    setIsClearing(true);
    setNotice(null);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/publishpress-hub/v1/settings/debug-log/clear',
        method: 'POST'
      });
      setLogContent('');
      setNotice({
        status: 'success',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug log cleared successfully.', 'publishpress-hub')
      });
    } catch (error) {
      setNotice({
        status: 'error',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to clear the debug log. Please try again.', 'publishpress-hub')
      });
    } finally {
      setIsClearing(false);
    }
  };
  const handleCopyToClipboard = async () => {
    if (!logContent) {
      return;
    }

    // navigator.clipboard requires a secure context (HTTPS).
    // Fall back to the legacy execCommand approach for HTTP dev environments.
    const copyViaExecCommand = () => {
      const el = document.createElement('textarea');
      el.value = logContent;
      el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
      document.body.appendChild(el);
      el.focus();
      el.select();
      const success = document.execCommand('copy');
      document.body.removeChild(el);
      return success;
    };
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(logContent);
      } else if (!copyViaExecCommand()) {
        throw new Error('execCommand copy failed');
      }
      setNotice({
        status: 'success',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Log copied to clipboard.', 'publishpress-hub')
      });
    } catch (error) {
      setNotice({
        status: 'error',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to copy log to clipboard.', 'publishpress-hub')
      });
    }
  };
  const isEmpty = !logContent;
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab"
  }, notice && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: notice.status,
    isDismissible: true,
    onRemove: () => setNotice(null)
  }, notice.message), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__view-toggle",
    role: "group",
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug log view', 'publishpress-hub')
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `pp-hub-debug-log-tab__view-btn${viewMode === VIEW_REQUESTS ? ' pp-hub-debug-log-tab__view-btn--active' : ''}`,
    onClick: () => setViewMode(VIEW_REQUESTS),
    "aria-pressed": viewMode === VIEW_REQUESTS
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Requests', 'publishpress-hub')), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `pp-hub-debug-log-tab__view-btn${viewMode === VIEW_FULL_LOG ? ' pp-hub-debug-log-tab__view-btn--active' : ''}`,
    onClick: () => setViewMode(VIEW_FULL_LOG),
    "aria-pressed": viewMode === VIEW_FULL_LOG
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Full Log', 'publishpress-hub'))), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-debug-log-tab__auto-refresh-group"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: `pp-hub-debug-log-tab__auto-refresh-btn${autoRefresh ? ' pp-hub-debug-log-tab__auto-refresh-btn--active' : ''}`,
    onClick: () => setAutoRefresh(prev => !prev),
    "aria-pressed": autoRefresh,
    title: autoRefresh ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh is on — click to stop', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Enable auto-refresh', 'publishpress-hub')
  }, /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-debug-log-tab__auto-refresh-dot",
    "aria-hidden": "true"
  }), autoRefresh ? `${(0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh', 'publishpress-hub')} (${countdown}s)` : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh', 'publishpress-hub')), /*#__PURE__*/React.createElement("select", {
    className: "pp-hub-debug-log-tab__interval-select",
    value: intervalSeconds,
    onChange: handleIntervalChange,
    "aria-label": (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Auto-refresh interval', 'publishpress-hub')
  }, REFRESH_INTERVALS.map(({
    value,
    label
  }) => /*#__PURE__*/React.createElement("option", {
    key: value,
    value: value
  }, label)))), /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
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
    className: "pp-hub-debug-log-tab__loading",
    role: "status",
    "aria-live": "polite"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Loading log...', 'publishpress-hub')), !isLoading && isEmpty && /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-debug-log-tab__empty",
    role: "status",
    "aria-live": "polite"
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
const DebugLogTab = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(DebugLogTabComponent);

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
/**
 * Diagnostics settings tab.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */





const {
  debugModeEnabled: initialDebugMode
} = window.ppHubSettingsPageConfig || {};
const DiagnosticsTabComponent = () => {
  const [debugMode, setDebugMode] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(Boolean(initialDebugMode));
  const [isSaving, setIsSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const handleDebugModeChange = async newValue => {
    setIsSaving(true);
    setNotice(null);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/publishpress-hub/v1/settings/diagnostics',
        method: 'POST',
        data: {
          debug_mode: newValue
        }
      });
      setDebugMode(newValue);
      setNotice({
        status: 'success',
        message: newValue ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug mode enabled. A "Debug Log" tab is now available.', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Debug mode disabled.', 'publishpress-hub')
      });
      if (newValue !== Boolean(initialDebugMode)) {
        window.location.reload();
      }
    } catch (error) {
      setNotice({
        status: 'error',
        message: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to save the setting. Please try again.', 'publishpress-hub')
      });
    } finally {
      setIsSaving(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-diagnostics-tab"
  }, notice && /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    status: notice.status,
    isDismissible: true,
    onRemove: () => setNotice(null)
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
const DiagnosticsTab = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(DiagnosticsTabComponent);

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
/**
 * Structured requests log view — shows request/response pairs as expandable cards.
 *
 * @package PublishPress\Hub\Presentation\Asset\src\jsx\components\pages\settings
 * @author PublishPress
 * @copyright Copyright (c) 2026, PublishPress
 * @license GPL v2 or later
 * @since 1.0.0
 */




const METHOD_CLASS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  DELETE: 'delete'
};
const getStatusClass = (statusCode, isError) => {
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
const truncateUrl = (url, maxLength = 72) => {
  if (!url || url.length <= maxLength) {
    return url;
  }
  return url.substring(0, maxLength) + '…';
};
const CodeBlock = ({
  data
}) => /*#__PURE__*/React.createElement("pre", {
  className: "pp-hub-request-card__code"
}, JSON.stringify(data, null, 2));
const RequestCardComponent = ({
  pair
}) => {
  const [isExpanded, setIsExpanded] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    request,
    response
  } = pair;
  const method = request?.data?.method || '???';
  const url = request?.data?.url || '';
  const timestamp = request?.data?.timestamp || '';
  const statusCode = response?.data?.status_code;
  const isError = response?.data?.error === true;
  const methodClass = METHOD_CLASS[method.toUpperCase()] || 'other';
  const statusClass = getStatusClass(statusCode, isError);
  const statusDisplay = isError ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('ERR', 'publishpress-hub') : statusCode || '—';
  const detailsId = `pp-hub-request-card-details-${pair.id}`;
  return /*#__PURE__*/React.createElement("div", {
    className: `pp-hub-request-card pp-hub-request-card--${isExpanded ? 'expanded' : 'collapsed'}`
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pp-hub-request-card__summary",
    onClick: () => setIsExpanded(!isExpanded),
    "aria-expanded": isExpanded,
    "aria-controls": detailsId
  }, /*#__PURE__*/React.createElement("span", {
    className: `pp-hub-request-card__method pp-hub-request-card__method--${methodClass}`
  }, method), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__url",
    title: url
  }, truncateUrl(url)), /*#__PURE__*/React.createElement("span", {
    className: `pp-hub-request-card__status pp-hub-request-card__status--${statusClass}`
  }, statusDisplay), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__timestamp"
  }, timestamp), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-request-card__chevron",
    "aria-hidden": "true"
  }, isExpanded ? '▲' : '▼')), isExpanded && /*#__PURE__*/React.createElement("div", {
    id: detailsId,
    className: "pp-hub-request-card__details"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section-header pp-hub-request-card__section-header--request"
  }, "\u2192\xA0", (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Request', 'publishpress-hub')), /*#__PURE__*/React.createElement(CodeBlock, {
    data: request?.data
  })), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-request-card__section-header pp-hub-request-card__section-header--response"
  }, "\u2190\xA0", (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Response', 'publishpress-hub')), response ? /*#__PURE__*/React.createElement(CodeBlock, {
    data: response?.data
  }) : /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-request-card__no-response"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No response recorded for this request.', 'publishpress-hub')))));
};
const RequestCard = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(RequestCardComponent);
const RequestsLogViewComponent = ({
  logContent
}) => {
  const pairs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const entries = (0,_DebugLogParser__WEBPACK_IMPORTED_MODULE_2__.parseLogEntries)(logContent);
    return (0,_DebugLogParser__WEBPACK_IMPORTED_MODULE_2__.groupIntoPairs)(entries);
  }, [logContent]);
  if (!logContent) {
    return null;
  }
  if (pairs.length === 0) {
    return /*#__PURE__*/React.createElement("p", {
      className: "pp-hub-debug-log-tab__empty",
      role: "status",
      "aria-live": "polite"
    }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No requests found in the log.', 'publishpress-hub'));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-requests-log"
  }, /*#__PURE__*/React.createElement("p", {
    className: "pp-hub-requests-log__count"
  }, pairs.length === 1 ? (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('1 request recorded', 'publishpress-hub') : (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('%d requests recorded', 'publishpress-hub'), pairs.length)), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-requests-log__list"
  }, pairs.map(pair => /*#__PURE__*/React.createElement(RequestCard, {
    key: pair.id,
    pair: pair
  }))));
};
const RequestsLogView = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(RequestsLogViewComponent);

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
/*!*********************************************!*\
  !*** ./resources/src/jsx/settings-page.jsx ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
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

// Use the React DOM that WordPress already loads instead of bundling a second copy.




const {
  apiNonce
} = window.ppHubSettingsPageConfig || {};
const settingsPageContainer = document.getElementById('publishpress-hub-settings-page-container');
if (settingsPageContainer) {
  if (apiNonce) {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().createNonceMiddleware(apiNonce));
  }
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(settingsPageContainer);
  root.render(/*#__PURE__*/React.createElement(_components_pages_settings_page__WEBPACK_IMPORTED_MODULE_2__.SettingsPage, null));
  const currentTheme = (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_3__.getCurrentTheme)();
  (0,_utils_themeController__WEBPACK_IMPORTED_MODULE_3__.setTheme)(currentTheme);
}
})();

/******/ })()
;
//# sourceMappingURL=settings-page.js.map
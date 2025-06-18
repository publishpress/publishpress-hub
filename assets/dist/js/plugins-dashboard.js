/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/jsx/components/admin-page/container.jsx":
/*!********************************************************!*\
  !*** ./assets/jsx/components/admin-page/container.jsx ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageContainer: () => (/* binding */ AdminPageContainer),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminPageContainer);

/***/ }),

/***/ "./assets/jsx/components/admin-page/header.jsx":
/*!*****************************************************!*\
  !*** ./assets/jsx/components/admin-page/header.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageHeader: () => (/* binding */ AdminPageHeader),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buttons_help_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../buttons/help-button */ "./assets/jsx/components/buttons/help-button.jsx");

var AdminPageHeader = function AdminPageHeader(_ref) {
  var logoUrl = _ref.logoUrl,
    children = _ref.children,
    _ref$compact = _ref.compact,
    compact = _ref$compact === void 0 ? false : _ref$compact;
  var headerClass = compact ? "pp-hub-admin-page-header pp-hub-admin-page-header--compact" : "pp-hub-admin-page-header";
  return /*#__PURE__*/React.createElement("div", {
    className: headerClass
  }, /*#__PURE__*/React.createElement("img", {
    src: logoUrl,
    alt: "PublishPress",
    className: "pp-hub-admin-page-header__logo"
  }), /*#__PURE__*/React.createElement("span", {
    className: "pp-hub-admin-page-header__logo-text"
  }, "Hub"), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-header__content"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-admin-page-header__actions"
  }, /*#__PURE__*/React.createElement(_buttons_help_button__WEBPACK_IMPORTED_MODULE_0__["default"], null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AdminPageHeader);

/***/ }),

/***/ "./assets/jsx/components/admin-page/index.jsx":
/*!****************************************************!*\
  !*** ./assets/jsx/components/admin-page/index.jsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageContainer: () => (/* reexport safe */ _container__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   AdminPageHeader: () => (/* reexport safe */ _header__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   AdminPageLayout: () => (/* reexport safe */ _layout__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ "./assets/jsx/components/admin-page/layout.jsx");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./container */ "./assets/jsx/components/admin-page/container.jsx");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header */ "./assets/jsx/components/admin-page/header.jsx");




/***/ }),

/***/ "./assets/jsx/components/admin-page/layout.jsx":
/*!*****************************************************!*\
  !*** ./assets/jsx/components/admin-page/layout.jsx ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminPageLayout: () => (/* binding */ AdminPageLayout),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./container */ "./assets/jsx/components/admin-page/container.jsx");
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./header */ "./assets/jsx/components/admin-page/header.jsx");


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

/***/ "./assets/jsx/components/buttons/button.jsx":
/*!**************************************************!*\
  !*** ./assets/jsx/components/buttons/button.jsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);

var Button = function Button(_ref) {
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
    children = _ref.children;
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: variant,
    icon: icon,
    onClick: onClick,
    href: href,
    target: target || '_blank',
    rel: rel || 'noopener noreferrer',
    className: className,
    disabled: disabled,
    title: title,
    style: style
  }, children);
};

/***/ }),

/***/ "./assets/jsx/components/buttons/help-button.jsx":
/*!*******************************************************!*\
  !*** ./assets/jsx/components/buttons/help-button.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HelpButton: () => (/* binding */ HelpButton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["variant", "size", "icon", "children", "className"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }


var HelpButton = function HelpButton(_ref) {
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
  var helpUrl = 'https://publishpress.com/publishpress-support/';
  var handleClick = function handleClick() {
    window.open(helpUrl, '_blank');
  };

  // Build CSS classes
  var baseClass = 'pp-hub-help-button';
  var variantClass = variant !== 'default' ? "pp-hub-help-button--".concat(variant) : '';
  var sizeClass = size !== 'default' ? "pp-hub-help-button--".concat(size) : '';
  var combinedClassName = "".concat(baseClass, " ").concat(variantClass, " ").concat(sizeClass, " ").concat(className).trim();
  return /*#__PURE__*/React.createElement(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, _extends({
    icon: icon,
    onClick: handleClick,
    className: combinedClassName
  }, props), children || (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Need Help?', 'publishpress-hub'));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HelpButton);

/***/ }),

/***/ "./assets/jsx/components/filter/filter-buttons-bar.jsx":
/*!*************************************************************!*\
  !*** ./assets/jsx/components/filter/filter-buttons-bar.jsx ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FilterButtonsBar: () => (/* binding */ FilterButtonsBar),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buttons_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../buttons/button */ "./assets/jsx/components/buttons/button.jsx");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @publishpress/hub-i18n */ "@publishpress/hub-i18n");
/* harmony import */ var _publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__);


var FilterButtonsBar = function FilterButtonsBar(_ref) {
  var options = _ref.options,
    selectedOption = _ref.selectedOption,
    _onChange = _ref.onChange,
    children = _ref.children,
    className = _ref.className;
  if (!options) {
    return null;
  }
  if (!options.length) {
    return null;
  }
  if (!selectedOption) {
    selectedOption = options[0].value;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-container ".concat(className)
  }, /*#__PURE__*/React.createElement("div", {
    className: "publishpress-hub-filter-mobile"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "tabs",
    className: "publishpress-hub-filter-label-sr"
  }, (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select an option', 'publishpress-hub')), /*#__PURE__*/React.createElement("select", {
    id: "tabs",
    className: "publishpress-hub-filter-select",
    onChange: function onChange(e) {
      _onChange(e.target.value);
    }
  }, /*#__PURE__*/React.createElement("optgroup", {
    label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Options', 'publishpress-hub')
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
    var isSelected = selectedOption === filter.value;
    var buttonClass = isSelected ? 'active' : '';
    var isDisabled = !filter.total;
    return /*#__PURE__*/React.createElement(_buttons_button__WEBPACK_IMPORTED_MODULE_0__.Button, {
      key: filter.value,
      className: "publishpress-hub-filter-button ".concat(buttonClass, " ").concat(isDisabled ? 'disabled' : ''),
      onClick: function onClick() {
        _onChange(filter.value);
      },
      disabled: filter.total === 0
    }, filter.label, " ", filter.total > 0 && "(".concat(filter.total, ")"));
  }), children)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterButtonsBar);

/***/ }),

/***/ "./assets/jsx/components/pages/plugins-dashboard.jsx":
/*!***********************************************************!*\
  !*** ./assets/jsx/components/pages/plugins-dashboard.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _admin_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../admin-page */ "./assets/jsx/components/admin-page/index.jsx");
/* harmony import */ var _filter_filter_buttons_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../filter/filter-buttons-bar */ "./assets/jsx/components/filter/filter-buttons-bar.jsx");
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../stores/plugins-dashboard */ "./assets/jsx/stores/plugins-dashboard/index.jsx");
function _objectDestructuringEmpty(t) { if (null == t) throw new TypeError("Cannot destructure " + t); }






var FILTER_OPTIONS = [{
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'publishpress-hub'),
  value: 'all',
  total: 10
}, {
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Unlicensed', 'publishpress-hub'),
  value: 'unlicensed',
  total: 5
}, {
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Active', 'publishpress-hub'),
  value: 'licensed',
  total: 5
}, {
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Inactive', 'publishpress-hub'),
  value: 'inactive',
  total: 5
}, {
  label: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Not installed', 'publishpress-hub'),
  value: 'not-installed',
  total: 5
}];
var PluginsDashboard = function PluginsDashboard(_ref) {
  _objectDestructuringEmpty(_ref);
  var _useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(function (select) {
      return {
        selectedFilter: select(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store).getSelectedFilter()
      };
    }),
    selectedFilter = _useSelect.selectedFilter;
  var _useDispatch = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useDispatch)(_stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_5__.store),
    setSelectedFilter = _useDispatch.setSelectedFilter;
  var handleFilterChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function (selectedFilter) {
    setSelectedFilter(selectedFilter);
  }, [setSelectedFilter]);
  return /*#__PURE__*/React.createElement(_admin_page__WEBPACK_IMPORTED_MODULE_3__.AdminPageLayout, {
    title: (0,_publishpress_hub_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Plugins Dashboard', 'publishpress-hub'),
    logoUrl: window.ppHubPluginsDashboardConfig.logoUrl
  }, /*#__PURE__*/React.createElement("div", {
    className: "pp-hub-plugins-dashboard"
  }, /*#__PURE__*/React.createElement(_filter_filter_buttons_bar__WEBPACK_IMPORTED_MODULE_4__["default"], {
    options: FILTER_OPTIONS,
    selectedOption: selectedFilter,
    onChange: handleFilterChange
  })));
};

/***/ }),

/***/ "./assets/jsx/stores/plugins-dashboard/actions.jsx":
/*!*********************************************************!*\
  !*** ./assets/jsx/stores/plugins-dashboard/actions.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSelectedFilter: () => (/* binding */ setSelectedFilter)
/* harmony export */ });
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
var _marked = /*#__PURE__*/_regenerator().m(setSelectedFilter);
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

/***/ }),

/***/ "./assets/jsx/stores/plugins-dashboard/index.jsx":
/*!*******************************************************!*\
  !*** ./assets/jsx/stores/plugins-dashboard/index.jsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   store: () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data-controls */ "./node_modules/@wordpress/data-controls/build-module/index.js");
/* harmony import */ var _name__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./name */ "./assets/jsx/stores/plugins-dashboard/name.jsx");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducer */ "./assets/jsx/stores/plugins-dashboard/reducer.jsx");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./selectors */ "./assets/jsx/stores/plugins-dashboard/selectors.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./actions */ "./assets/jsx/stores/plugins-dashboard/actions.jsx");






var store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(_name__WEBPACK_IMPORTED_MODULE_2__.STORE_NAME, {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_3__.reducer,
  actions: _actions__WEBPACK_IMPORTED_MODULE_5__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_4__,
  controls: _wordpress_data_controls__WEBPACK_IMPORTED_MODULE_1__.controls
});
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);

/***/ }),

/***/ "./assets/jsx/stores/plugins-dashboard/name.jsx":
/*!******************************************************!*\
  !*** ./assets/jsx/stores/plugins-dashboard/name.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STORE_NAME: () => (/* binding */ STORE_NAME),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var STORE_NAME = 'publishpress-hub/plugins-dashboard';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (STORE_NAME);

/***/ }),

/***/ "./assets/jsx/stores/plugins-dashboard/reducer.jsx":
/*!*********************************************************!*\
  !*** ./assets/jsx/stores/plugins-dashboard/reducer.jsx ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_STATE: () => (/* binding */ DEFAULT_STATE),
/* harmony export */   reducer: () => (/* binding */ reducer)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DEFAULT_STATE = {
  selectedFilter: 'all'
};
var setSelectedFilter = function setSelectedFilter(state, selectedFilter) {
  return _objectSpread(_objectSpread({}, state), {}, {
    selectedFilter: selectedFilter
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
    default:
      return state;
  }
};

/***/ }),

/***/ "./assets/jsx/stores/plugins-dashboard/selectors.jsx":
/*!***********************************************************!*\
  !*** ./assets/jsx/stores/plugins-dashboard/selectors.jsx ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getSelectedFilter: () => (/* binding */ getSelectedFilter)
/* harmony export */ });
var getSelectedFilter = function getSelectedFilter(state) {
  return state.selectedFilter;
};

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/build-module/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/build-module/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __unstableAwaitPromise: () => (/* binding */ __unstableAwaitPromise),
/* harmony export */   apiFetch: () => (/* binding */ apiFetch),
/* harmony export */   controls: () => (/* binding */ controls),
/* harmony export */   dispatch: () => (/* binding */ dispatch),
/* harmony export */   select: () => (/* binding */ select),
/* harmony export */   syncSelect: () => (/* binding */ syncSelect)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/index.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_deprecated__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/deprecated */ "./node_modules/@wordpress/deprecated/build-module/index.js");
/**
 * WordPress dependencies
 */



/**
 * Dispatches a control action for triggering an api fetch call.
 *
 * @param {Object} request Arguments for the fetch request.
 *
 * @example
 * ```js
 * import { apiFetch } from '@wordpress/data-controls';
 *
 * // Action generator using apiFetch
 * export function* myAction() {
 * 	const path = '/v2/my-api/items';
 * 	const items = yield apiFetch( { path } );
 * 	// do something with the items.
 * }
 * ```
 *
 * @return {Object} The control descriptor.
 */
function apiFetch(request) {
  return {
    type: 'API_FETCH',
    request
  };
}

/**
 * Control for resolving a selector in a registered data store.
 * Alias for the `resolveSelect` built-in control in the `@wordpress/data` package.
 *
 * @param storeNameOrDescriptor The store object or identifier.
 * @param selectorName          The selector name.
 * @param args                  Arguments passed without change to the `@wordpress/data` control.
 */
function select(storeNameOrDescriptor, selectorName, ...args) {
  (0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_2__["default"])('`select` control in `@wordpress/data-controls`', {
    since: '5.7',
    alternative: 'built-in `resolveSelect` control in `@wordpress/data`'
  });
  return _wordpress_data__WEBPACK_IMPORTED_MODULE_1__.controls.resolveSelect(storeNameOrDescriptor, selectorName, ...args);
}

/**
 * Control for calling a selector in a registered data store.
 * Alias for the `select` built-in control in the `@wordpress/data` package.
 *
 * @param storeNameOrDescriptor The store object or identifier.
 * @param selectorName          The selector name.
 * @param args                  Arguments passed without change to the `@wordpress/data` control.
 */
function syncSelect(storeNameOrDescriptor, selectorName, ...args) {
  (0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_2__["default"])('`syncSelect` control in `@wordpress/data-controls`', {
    since: '5.7',
    alternative: 'built-in `select` control in `@wordpress/data`'
  });
  return _wordpress_data__WEBPACK_IMPORTED_MODULE_1__.controls.select(storeNameOrDescriptor, selectorName, ...args);
}

/**
 * Control for dispatching an action in a registered data store.
 * Alias for the `dispatch` control in the `@wordpress/data` package.
 *
 * @param storeNameOrDescriptor The store object or identifier.
 * @param actionName            The action name.
 * @param args                  Arguments passed without change to the `@wordpress/data` control.
 */
function dispatch(storeNameOrDescriptor, actionName, ...args) {
  (0,_wordpress_deprecated__WEBPACK_IMPORTED_MODULE_2__["default"])('`dispatch` control in `@wordpress/data-controls`', {
    since: '5.7',
    alternative: 'built-in `dispatch` control in `@wordpress/data`'
  });
  return _wordpress_data__WEBPACK_IMPORTED_MODULE_1__.controls.dispatch(storeNameOrDescriptor, actionName, ...args);
}

/**
 * Dispatches a control action for awaiting on a promise to be resolved.
 *
 * @param {Object} promise Promise to wait for.
 *
 * @example
 * ```js
 * import { __unstableAwaitPromise } from '@wordpress/data-controls';
 *
 * // Action generator using apiFetch
 * export function* myAction() {
 * 	const promise = getItemsAsync();
 * 	const items = yield __unstableAwaitPromise( promise );
 * 	// do something with the items.
 * }
 * ```
 *
 * @return {Object} The control descriptor.
 */
const __unstableAwaitPromise = function (promise) {
  return {
    type: 'AWAIT_PROMISE',
    promise
  };
};

/**
 * The default export is what you use to register the controls with your custom
 * store.
 *
 * @example
 * ```js
 * // WordPress dependencies
 * import { controls } from '@wordpress/data-controls';
 * import { registerStore } from '@wordpress/data';
 *
 * // Internal dependencies
 * import reducer from './reducer';
 * import * as selectors from './selectors';
 * import * as actions from './actions';
 * import * as resolvers from './resolvers';
 *
 * registerStore( 'my-custom-store', {
 * reducer,
 * controls,
 * actions,
 * selectors,
 * resolvers,
 * } );
 * ```
 * @return {Object} An object for registering the default controls with the
 * store.
 */
const controls = {
  AWAIT_PROMISE({
    promise
  }) {
    return promise;
  },
  API_FETCH({
    request
  }) {
    return (0,_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])(request);
  }
};
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/index.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/index.js ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middlewares_nonce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middlewares/nonce */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js");
/* harmony import */ var _middlewares_root_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middlewares/root-url */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js");
/* harmony import */ var _middlewares_preloading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middlewares/preloading */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js");
/* harmony import */ var _middlewares_fetch_all_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middlewares/fetch-all-middleware */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js");
/* harmony import */ var _middlewares_namespace_endpoint__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./middlewares/namespace-endpoint */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js");
/* harmony import */ var _middlewares_http_v1__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./middlewares/http-v1 */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js");
/* harmony import */ var _middlewares_user_locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./middlewares/user-locale */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js");
/* harmony import */ var _middlewares_media_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./middlewares/media-upload */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js");
/* harmony import */ var _middlewares_theme_preview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./middlewares/theme-preview */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js");
/* harmony import */ var _utils_response__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/response */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/utils/response.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */











/**
 * Default set of header values which should be sent with every request unless
 * explicitly provided through apiFetch options.
 *
 * @type {Record<string, string>}
 */
const DEFAULT_HEADERS = {
  // The backend uses the Accept header as a condition for considering an
  // incoming request as a REST request.
  //
  // See: https://core.trac.wordpress.org/ticket/44534
  Accept: 'application/json, */*;q=0.1'
};

/**
 * Default set of fetch option values which should be sent with every request
 * unless explicitly provided through apiFetch options.
 *
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
  credentials: 'include'
};

/** @typedef {import('./types').APIFetchMiddleware} APIFetchMiddleware */
/** @typedef {import('./types').APIFetchOptions} APIFetchOptions */

/**
 * @type {import('./types').APIFetchMiddleware[]}
 */
const middlewares = [_middlewares_user_locale__WEBPACK_IMPORTED_MODULE_7__["default"], _middlewares_namespace_endpoint__WEBPACK_IMPORTED_MODULE_5__["default"], _middlewares_http_v1__WEBPACK_IMPORTED_MODULE_6__["default"], _middlewares_fetch_all_middleware__WEBPACK_IMPORTED_MODULE_4__["default"]];

/**
 * Register a middleware
 *
 * @param {import('./types').APIFetchMiddleware} middleware
 */
function registerMiddleware(middleware) {
  middlewares.unshift(middleware);
}

/**
 * Checks the status of a response, throwing the Response as an error if
 * it is outside the 200 range.
 *
 * @param {Response} response
 * @return {Response} The response if the status is in the 200 range.
 */
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw response;
};

/** @typedef {(options: import('./types').APIFetchOptions) => Promise<any>} FetchHandler*/

/**
 * @type {FetchHandler}
 */
const defaultFetchHandler = nextOptions => {
  const {
    url,
    path,
    data,
    parse = true,
    ...remainingOptions
  } = nextOptions;
  let {
    body,
    headers
  } = nextOptions;

  // Merge explicitly-provided headers with default values.
  headers = {
    ...DEFAULT_HEADERS,
    ...headers
  };

  // The `data` property is a shorthand for sending a JSON body.
  if (data) {
    body = JSON.stringify(data);
    headers['Content-Type'] = 'application/json';
  }
  const responsePromise = window.fetch(
  // Fall back to explicitly passing `window.location` which is the behavior if `undefined` is passed.
  url || path || window.location.href, {
    ...DEFAULT_OPTIONS,
    ...remainingOptions,
    body,
    headers
  });
  return responsePromise.then(value => Promise.resolve(value).then(checkStatus).catch(response => (0,_utils_response__WEBPACK_IMPORTED_MODULE_10__.parseAndThrowError)(response, parse)).then(response => (0,_utils_response__WEBPACK_IMPORTED_MODULE_10__.parseResponseAndNormalizeError)(response, parse)), err => {
    // Re-throw AbortError for the users to handle it themselves.
    if (err && err.name === 'AbortError') {
      throw err;
    }

    // Otherwise, there is most likely no network connection.
    // Unfortunately the message might depend on the browser.
    throw {
      code: 'fetch_error',
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You are probably offline.')
    };
  });
};

/** @type {FetchHandler} */
let fetchHandler = defaultFetchHandler;

/**
 * Defines a custom fetch handler for making the requests that will override
 * the default one using window.fetch
 *
 * @param {FetchHandler} newFetchHandler The new fetch handler
 */
function setFetchHandler(newFetchHandler) {
  fetchHandler = newFetchHandler;
}

/**
 * @template T
 * @param {import('./types').APIFetchOptions} options
 * @return {Promise<T>} A promise representing the request processed via the registered middlewares.
 */
function apiFetch(options) {
  // creates a nested function chain that calls all middlewares and finally the `fetchHandler`,
  // converting `middlewares = [ m1, m2, m3 ]` into:
  // ```
  // opts1 => m1( opts1, opts2 => m2( opts2, opts3 => m3( opts3, fetchHandler ) ) );
  // ```
  const enhancedHandler = middlewares.reduceRight((/** @type {FetchHandler} */next, middleware) => {
    return workingOptions => middleware(workingOptions, next);
  }, fetchHandler);
  return enhancedHandler(options).catch(error => {
    if (error.code !== 'rest_cookie_invalid_nonce') {
      return Promise.reject(error);
    }

    // If the nonce is invalid, refresh it and try again.
    return window
    // @ts-ignore
    .fetch(apiFetch.nonceEndpoint).then(checkStatus).then(data => data.text()).then(text => {
      // @ts-ignore
      apiFetch.nonceMiddleware.nonce = text;
      return apiFetch(options);
    });
  });
}
apiFetch.use = registerMiddleware;
apiFetch.setFetchHandler = setFetchHandler;
apiFetch.createNonceMiddleware = _middlewares_nonce__WEBPACK_IMPORTED_MODULE_1__["default"];
apiFetch.createPreloadingMiddleware = _middlewares_preloading__WEBPACK_IMPORTED_MODULE_3__["default"];
apiFetch.createRootURLMiddleware = _middlewares_root_url__WEBPACK_IMPORTED_MODULE_2__["default"];
apiFetch.fetchAllMiddleware = _middlewares_fetch_all_middleware__WEBPACK_IMPORTED_MODULE_4__["default"];
apiFetch.mediaUploadMiddleware = _middlewares_media_upload__WEBPACK_IMPORTED_MODULE_8__["default"];
apiFetch.createThemePreviewMiddleware = _middlewares_theme_preview__WEBPACK_IMPORTED_MODULE_9__["default"];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiFetch);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/index.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


/**
 * Apply query arguments to both URL and Path, whichever is present.
 *
 * @param {import('../types').APIFetchOptions} props
 * @param {Record<string, string | number>}    queryArgs
 * @return {import('../types').APIFetchOptions} The request with the modified query args
 */
const modifyQuery = ({
  path,
  url,
  ...options
}, queryArgs) => ({
  ...options,
  url: url && (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(url, queryArgs),
  path: path && (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(path, queryArgs)
});

/**
 * Duplicates parsing functionality from apiFetch.
 *
 * @param {Response} response
 * @return {Promise<any>} Parsed response json.
 */
const parseResponse = response => response.json ? response.json() : Promise.reject(response);

/**
 * @param {string | null} linkHeader
 * @return {{ next?: string }} The parsed link header.
 */
const parseLinkHeader = linkHeader => {
  if (!linkHeader) {
    return {};
  }
  const match = linkHeader.match(/<([^>]+)>; rel="next"/);
  return match ? {
    next: match[1]
  } : {};
};

/**
 * @param {Response} response
 * @return {string | undefined} The next page URL.
 */
const getNextPageUrl = response => {
  const {
    next
  } = parseLinkHeader(response.headers.get('link'));
  return next;
};

/**
 * @param {import('../types').APIFetchOptions} options
 * @return {boolean} True if the request contains an unbounded query.
 */
const requestContainsUnboundedQuery = options => {
  const pathIsUnbounded = !!options.path && options.path.indexOf('per_page=-1') !== -1;
  const urlIsUnbounded = !!options.url && options.url.indexOf('per_page=-1') !== -1;
  return pathIsUnbounded || urlIsUnbounded;
};

/**
 * The REST API enforces an upper limit on the per_page option. To handle large
 * collections, apiFetch consumers can pass `per_page=-1`; this middleware will
 * then recursively assemble a full response array from all available pages.
 *
 * @type {import('../types').APIFetchMiddleware}
 */
const fetchAllMiddleware = async (options, next) => {
  if (options.parse === false) {
    // If a consumer has opted out of parsing, do not apply middleware.
    return next(options);
  }
  if (!requestContainsUnboundedQuery(options)) {
    // If neither url nor path is requesting all items, do not apply middleware.
    return next(options);
  }

  // Retrieve requested page of results.
  const response = await (0,___WEBPACK_IMPORTED_MODULE_1__["default"])({
    ...modifyQuery(options, {
      per_page: 100
    }),
    // Ensure headers are returned for page 1.
    parse: false
  });
  const results = await parseResponse(response);
  if (!Array.isArray(results)) {
    // We have no reliable way of merging non-array results.
    return results;
  }
  let nextPage = getNextPageUrl(response);
  if (!nextPage) {
    // There are no further pages to request.
    return results;
  }

  // Iteratively fetch all remaining pages until no "next" header is found.
  let mergedResults = /** @type {any[]} */[].concat(results);
  while (nextPage) {
    const nextResponse = await (0,___WEBPACK_IMPORTED_MODULE_1__["default"])({
      ...options,
      // Ensure the URL for the next page is used instead of any provided path.
      path: undefined,
      url: nextPage,
      // Ensure we still get headers so we can identify the next page.
      parse: false
    });
    const nextResults = await parseResponse(nextResponse);
    mergedResults = mergedResults.concat(nextResults);
    nextPage = getNextPageUrl(nextResponse);
  }
  return mergedResults;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchAllMiddleware);
//# sourceMappingURL=fetch-all-middleware.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Set of HTTP methods which are eligible to be overridden.
 *
 * @type {Set<string>}
 */
const OVERRIDE_METHODS = new Set(['PATCH', 'PUT', 'DELETE']);

/**
 * Default request method.
 *
 * "A request has an associated method (a method). Unless stated otherwise it
 * is `GET`."
 *
 * @see  https://fetch.spec.whatwg.org/#requests
 *
 * @type {string}
 */
const DEFAULT_METHOD = 'GET';

/**
 * API Fetch middleware which overrides the request method for HTTP v1
 * compatibility leveraging the REST API X-HTTP-Method-Override header.
 *
 * @type {import('../types').APIFetchMiddleware}
 */
const httpV1Middleware = (options, next) => {
  const {
    method = DEFAULT_METHOD
  } = options;
  if (OVERRIDE_METHODS.has(method.toUpperCase())) {
    options = {
      ...options,
      headers: {
        ...options.headers,
        'X-HTTP-Method-Override': method,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
  }
  return next(options);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (httpV1Middleware);
//# sourceMappingURL=http-v1.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/response */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/utils/response.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


/**
 * @param {import('../types').APIFetchOptions} options
 * @return {boolean} True if the request is for media upload.
 */
function isMediaUploadRequest(options) {
  const isCreateMethod = !!options.method && options.method === 'POST';
  const isMediaEndpoint = !!options.path && options.path.indexOf('/wp/v2/media') !== -1 || !!options.url && options.url.indexOf('/wp/v2/media') !== -1;
  return isMediaEndpoint && isCreateMethod;
}

/**
 * Middleware handling media upload failures and retries.
 *
 * @type {import('../types').APIFetchMiddleware}
 */
const mediaUploadMiddleware = (options, next) => {
  if (!isMediaUploadRequest(options)) {
    return next(options);
  }
  let retries = 0;
  const maxRetries = 5;

  /**
   * @param {string} attachmentId
   * @return {Promise<any>} Processed post response.
   */
  const postProcess = attachmentId => {
    retries++;
    return next({
      path: `/wp/v2/media/${attachmentId}/post-process`,
      method: 'POST',
      data: {
        action: 'create-image-subsizes'
      },
      parse: false
    }).catch(() => {
      if (retries < maxRetries) {
        return postProcess(attachmentId);
      }
      next({
        path: `/wp/v2/media/${attachmentId}?force=true`,
        method: 'DELETE'
      });
      return Promise.reject();
    });
  };
  return next({
    ...options,
    parse: false
  }).catch(response => {
    // `response` could actually be an error thrown by `defaultFetchHandler`.
    if (!response.headers) {
      return Promise.reject(response);
    }
    const attachmentId = response.headers.get('x-wp-upload-attachment-id');
    if (response.status >= 500 && response.status < 600 && attachmentId) {
      return postProcess(attachmentId).catch(() => {
        if (options.parse !== false) {
          return Promise.reject({
            code: 'post_process',
            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Media upload failed. If this is a photo or a large image, please scale it down and try again.')
          });
        }
        return Promise.reject(response);
      });
    }
    return (0,_utils_response__WEBPACK_IMPORTED_MODULE_1__.parseAndThrowError)(response, options.parse);
  }).then(response => (0,_utils_response__WEBPACK_IMPORTED_MODULE_1__.parseResponseAndNormalizeError)(response, options.parse));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mediaUploadMiddleware);
//# sourceMappingURL=media-upload.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js ***!
  \********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @type {import('../types').APIFetchMiddleware}
 */
const namespaceAndEndpointMiddleware = (options, next) => {
  let path = options.path;
  let namespaceTrimmed, endpointTrimmed;
  if (typeof options.namespace === 'string' && typeof options.endpoint === 'string') {
    namespaceTrimmed = options.namespace.replace(/^\/|\/$/g, '');
    endpointTrimmed = options.endpoint.replace(/^\//, '');
    if (endpointTrimmed) {
      path = namespaceTrimmed + '/' + endpointTrimmed;
    } else {
      path = namespaceTrimmed;
    }
  }
  delete options.namespace;
  delete options.endpoint;
  return next({
    ...options,
    path
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (namespaceAndEndpointMiddleware);
//# sourceMappingURL=namespace-endpoint.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @param {string} nonce
 * @return {import('../types').APIFetchMiddleware & { nonce: string }} A middleware to enhance a request with a nonce.
 */
function createNonceMiddleware(nonce) {
  /**
   * @type {import('../types').APIFetchMiddleware & { nonce: string }}
   */
  const middleware = (options, next) => {
    const {
      headers = {}
    } = options;

    // If an 'X-WP-Nonce' header (or any case-insensitive variation
    // thereof) was specified, no need to add a nonce header.
    for (const headerName in headers) {
      if (headerName.toLowerCase() === 'x-wp-nonce' && headers[headerName] === middleware.nonce) {
        return next(options);
      }
    }
    return next({
      ...options,
      headers: {
        ...headers,
        'X-WP-Nonce': middleware.nonce
      }
    });
  };
  middleware.nonce = nonce;
  return middleware;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createNonceMiddleware);
//# sourceMappingURL=nonce.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * @param {Record<string, any>} preloadedData
 * @return {import('../types').APIFetchMiddleware} Preloading middleware.
 */
function createPreloadingMiddleware(preloadedData) {
  const cache = Object.fromEntries(Object.entries(preloadedData).map(([path, data]) => [(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.normalizePath)(path), data]));
  return (options, next) => {
    const {
      parse = true
    } = options;
    /** @type {string | void} */
    let rawPath = options.path;
    if (!rawPath && options.url) {
      const {
        rest_route: pathFromQuery,
        ...queryArgs
      } = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArgs)(options.url);
      if (typeof pathFromQuery === 'string') {
        rawPath = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(pathFromQuery, queryArgs);
      }
    }
    if (typeof rawPath !== 'string') {
      return next(options);
    }
    const method = options.method || 'GET';
    const path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.normalizePath)(rawPath);
    if ('GET' === method && cache[path]) {
      const cacheData = cache[path];

      // Unsetting the cache key ensures that the data is only used a single time.
      delete cache[path];
      return prepareResponse(cacheData, !!parse);
    } else if ('OPTIONS' === method && cache[method] && cache[method][path]) {
      const cacheData = cache[method][path];

      // Unsetting the cache key ensures that the data is only used a single time.
      delete cache[method][path];
      return prepareResponse(cacheData, !!parse);
    }
    return next(options);
  };
}

/**
 * This is a helper function that sends a success response.
 *
 * @param {Record<string, any>} responseData
 * @param {boolean}             parse
 * @return {Promise<any>} Promise with the response.
 */
function prepareResponse(responseData, parse) {
  if (parse) {
    return Promise.resolve(responseData.body);
  }
  try {
    return Promise.resolve(new window.Response(JSON.stringify(responseData.body), {
      status: 200,
      statusText: 'OK',
      headers: responseData.headers
    }));
  } catch {
    // See: https://github.com/WordPress/gutenberg/issues/67358#issuecomment-2621163926.
    Object.entries(responseData.headers).forEach(([key, value]) => {
      if (key.toLowerCase() === 'link') {
        responseData.headers[key] = value.replace(/<([^>]+)>/, (/** @type {any} */_, /** @type {string} */url) => `<${encodeURI(url)}>`);
      }
    });
    return Promise.resolve(parse ? responseData.body : new window.Response(JSON.stringify(responseData.body), {
      status: 200,
      statusText: 'OK',
      headers: responseData.headers
    }));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPreloadingMiddleware);
//# sourceMappingURL=preloading.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _namespace_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespace-endpoint */ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js");
/**
 * Internal dependencies
 */


/**
 * @param {string} rootURL
 * @return {import('../types').APIFetchMiddleware} Root URL middleware.
 */
const createRootURLMiddleware = rootURL => (options, next) => {
  return (0,_namespace_endpoint__WEBPACK_IMPORTED_MODULE_0__["default"])(options, optionsWithPath => {
    let url = optionsWithPath.url;
    let path = optionsWithPath.path;
    let apiRoot;
    if (typeof path === 'string') {
      apiRoot = rootURL;
      if (-1 !== rootURL.indexOf('?')) {
        path = path.replace('?', '&');
      }
      path = path.replace(/^\//, '');

      // API root may already include query parameter prefix if site is
      // configured to use plain permalinks.
      if ('string' === typeof apiRoot && -1 !== apiRoot.indexOf('?')) {
        path = path.replace('?', '&');
      }
      url = apiRoot + path;
    }
    return next({
      ...optionsWithPath,
      url
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRootURLMiddleware);
//# sourceMappingURL=root-url.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js":
/*!***************************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * This appends a `wp_theme_preview` parameter to the REST API request URL if
 * the admin URL contains a `theme` GET parameter.
 *
 * If the REST API request URL has contained the `wp_theme_preview` parameter as `''`,
 * then bypass this middleware.
 *
 * @param {Record<string, any>} themePath
 * @return {import('../types').APIFetchMiddleware} Preloading middleware.
 */
const createThemePreviewMiddleware = themePath => (options, next) => {
  if (typeof options.url === 'string') {
    const wpThemePreview = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArg)(options.url, 'wp_theme_preview');
    if (wpThemePreview === undefined) {
      options.url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(options.url, {
        wp_theme_preview: themePath
      });
    } else if (wpThemePreview === '') {
      options.url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.removeQueryArgs)(options.url, 'wp_theme_preview');
    }
  }
  if (typeof options.path === 'string') {
    const wpThemePreview = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArg)(options.path, 'wp_theme_preview');
    if (wpThemePreview === undefined) {
      options.path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(options.path, {
        wp_theme_preview: themePath
      });
    } else if (wpThemePreview === '') {
      options.path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.removeQueryArgs)(options.path, 'wp_theme_preview');
    }
  }
  return next(options);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createThemePreviewMiddleware);
//# sourceMappingURL=theme-preview.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * @type {import('../types').APIFetchMiddleware}
 */
const userLocaleMiddleware = (options, next) => {
  if (typeof options.url === 'string' && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.hasQueryArg)(options.url, '_locale')) {
    options.url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(options.url, {
      _locale: 'user'
    });
  }
  if (typeof options.path === 'string' && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.hasQueryArg)(options.path, '_locale')) {
    options.path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.addQueryArgs)(options.path, {
      _locale: 'user'
    });
  }
  return next(options);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userLocaleMiddleware);
//# sourceMappingURL=user-locale.js.map

/***/ }),

/***/ "./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/utils/response.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@wordpress/data-controls/node_modules/@wordpress/api-fetch/build-module/utils/response.js ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseAndThrowError: () => (/* binding */ parseAndThrowError),
/* harmony export */   parseResponseAndNormalizeError: () => (/* binding */ parseResponseAndNormalizeError)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Parses the apiFetch response.
 *
 * @param {Response} response
 * @param {boolean}  shouldParseResponse
 *
 * @return {Promise<any> | null | Response} Parsed response.
 */
const parseResponse = (response, shouldParseResponse = true) => {
  if (shouldParseResponse) {
    if (response.status === 204) {
      return null;
    }
    return response.json ? response.json() : Promise.reject(response);
  }
  return response;
};

/**
 * Calls the `json` function on the Response, throwing an error if the response
 * doesn't have a json function or if parsing the json itself fails.
 *
 * @param {Response} response
 * @return {Promise<any>} Parsed response.
 */
const parseJsonAndNormalizeError = response => {
  const invalidJsonError = {
    code: 'invalid_json',
    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The response is not a valid JSON response.')
  };
  if (!response || !response.json) {
    throw invalidJsonError;
  }
  return response.json().catch(() => {
    throw invalidJsonError;
  });
};

/**
 * Parses the apiFetch response properly and normalize response errors.
 *
 * @param {Response} response
 * @param {boolean}  shouldParseResponse
 *
 * @return {Promise<any>} Parsed response.
 */
const parseResponseAndNormalizeError = (response, shouldParseResponse = true) => {
  return Promise.resolve(parseResponse(response, shouldParseResponse)).catch(res => parseAndThrowError(res, shouldParseResponse));
};

/**
 * Parses a response, throwing an error if parsing the response fails.
 *
 * @param {Response} response
 * @param {boolean}  shouldParseResponse
 * @return {Promise<any>} Parsed response.
 */
function parseAndThrowError(response, shouldParseResponse = true) {
  if (!shouldParseResponse) {
    throw response;
  }
  return parseJsonAndNormalizeError(response).then(error => {
    const unknownError = {
      code: 'unknown_error',
      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('An unknown error occurred.')
    };
    throw error || unknownError;
  });
}
//# sourceMappingURL=response.js.map

/***/ }),

/***/ "./node_modules/@wordpress/deprecated/build-module/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/deprecated/build-module/index.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ deprecated),
/* harmony export */   logged: () => (/* binding */ logged)
/* harmony export */ });
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Object map tracking messages which have been logged, for use in ensuring a
 * message is only logged once.
 *
 * @type {Record<string, true | undefined>}
 */
const logged = Object.create(null);

/**
 * Logs a message to notify developers about a deprecated feature.
 *
 * @param {string} feature               Name of the deprecated feature.
 * @param {Object} [options]             Personalisation options
 * @param {string} [options.since]       Version in which the feature was deprecated.
 * @param {string} [options.version]     Version in which the feature will be removed.
 * @param {string} [options.alternative] Feature to use instead
 * @param {string} [options.plugin]      Plugin name if it's a plugin feature
 * @param {string} [options.link]        Link to documentation
 * @param {string} [options.hint]        Additional message to help transition away from the deprecated feature.
 *
 * @example
 * ```js
 * import deprecated from '@wordpress/deprecated';
 *
 * deprecated( 'Eating meat', {
 * 	since: '2019.01.01'
 * 	version: '2020.01.01',
 * 	alternative: 'vegetables',
 * 	plugin: 'the earth',
 * 	hint: 'You may find it beneficial to transition gradually.',
 * } );
 *
 * // Logs: 'Eating meat is deprecated since version 2019.01.01 and will be removed from the earth in version 2020.01.01. Please use vegetables instead. Note: You may find it beneficial to transition gradually.'
 * ```
 */
function deprecated(feature, options = {}) {
  const {
    since,
    version,
    alternative,
    plugin,
    link,
    hint
  } = options;
  const pluginMessage = plugin ? ` from ${plugin}` : '';
  const sinceMessage = since ? ` since version ${since}` : '';
  const versionMessage = version ? ` and will be removed${pluginMessage} in version ${version}` : '';
  const useInsteadMessage = alternative ? ` Please use ${alternative} instead.` : '';
  const linkMessage = link ? ` See: ${link}` : '';
  const hintMessage = hint ? ` Note: ${hint}` : '';
  const message = `${feature} is deprecated${sinceMessage}${versionMessage}.${useInsteadMessage}${linkMessage}${hintMessage}`;

  // Skip if already logged.
  if (message in logged) {
    return;
  }

  /**
   * Fires whenever a deprecated feature is encountered
   *
   * @param {string}  feature             Name of the deprecated feature.
   * @param {?Object} options             Personalisation options
   * @param {string}  options.since       Version in which the feature was deprecated.
   * @param {?string} options.version     Version in which the feature will be removed.
   * @param {?string} options.alternative Feature to use instead
   * @param {?string} options.plugin      Plugin name if it's a plugin feature
   * @param {?string} options.link        Link to documentation
   * @param {?string} options.hint        Additional message to help transition away from the deprecated feature.
   * @param {?string} message             Message sent to console.warn
   */
  (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.doAction)('deprecated', feature, options, message);

  // eslint-disable-next-line no-console
  console.warn(message);
  logged[message] = true;
}

/** @typedef {import('utility-types').NonUndefined<Parameters<typeof deprecated>[1]>} DeprecatedOptions */
//# sourceMappingURL=index.js.map

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

/***/ "@publishpress/hub-i18n":
/*!***************************************!*\
  !*** external "publishpressHub.i18n" ***!
  \***************************************/
/***/ ((module) => {

module.exports = publishpressHub.i18n;

/***/ }),

/***/ "@wordpress/components":
/*!********************************!*\
  !*** external "wp.components" ***!
  \********************************/
/***/ ((module) => {

module.exports = wp.components;

/***/ }),

/***/ "@wordpress/data":
/*!**************************!*\
  !*** external "wp.data" ***!
  \**************************/
/***/ ((module) => {

module.exports = wp.data;

/***/ }),

/***/ "@wordpress/element":
/*!*****************************!*\
  !*** external "wp.element" ***!
  \*****************************/
/***/ ((module) => {

module.exports = wp.element;

/***/ }),

/***/ "@wordpress/hooks":
/*!***************************!*\
  !*** external "wp.hooks" ***!
  \***************************/
/***/ ((module) => {

module.exports = wp.hooks;

/***/ }),

/***/ "@wordpress/i18n":
/*!**************************!*\
  !*** external "wp.i18n" ***!
  \**************************/
/***/ ((module) => {

module.exports = wp.i18n;

/***/ }),

/***/ "@wordpress/url":
/*!*************************!*\
  !*** external "wp.url" ***!
  \*************************/
/***/ ((module) => {

module.exports = wp.url;

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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./assets/jsx/plugins-dashboard.jsx ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _components_pages_plugins_dashboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/pages/plugins-dashboard */ "./assets/jsx/components/pages/plugins-dashboard.jsx");
/* harmony import */ var _stores_plugins_dashboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stores/plugins-dashboard */ "./assets/jsx/stores/plugins-dashboard/index.jsx");



var pluginsDashboardContainer = document.getElementById('publishpress-hub-plugins-dashboard-container');
if (pluginsDashboardContainer) {
  var root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_0__.createRoot)(pluginsDashboardContainer);
  root.render(/*#__PURE__*/React.createElement(_components_pages_plugins_dashboard__WEBPACK_IMPORTED_MODULE_1__.PluginsDashboard, null));
}
})();

/******/ })()
;
//# sourceMappingURL=plugins-dashboard.js.map
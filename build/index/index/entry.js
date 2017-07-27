webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildFileConfig = __webpack_require__(14);
var moduleExports = {
  DIRS: {
    BUILD_FILE: buildFileConfig
  },

  PAGE_ROOT_PATH: '../../'
};

/* 帮助确定ie下CORS的代理文件 */
moduleExports.DIRS.SERVER_API_URL = moduleExports.SERVER_API_URL;

/* global IS_PRODUCTION:true */ // 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
if (false) {
  // 由于本脚手架并没有牵涉到HTTP请求，因此此处仅作为演示分离开发/生产环境之用。
  moduleExports.API_ROOT = 'http://api.xxxx.com/';
} else {
  moduleExports.API_ROOT = 'http://localhost/mock/';
}

module.exports = moduleExports;

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

__webpack_require__(1);
var config = __webpack_require__(7);

$(function () {
  /* global IS_PRODUCTION:true */ // 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
  if (true) {
    console.log('如果你看到这个Log，那么这个版本实际上是开发用的版本');
    console.log(config.API_ROOT);
  }
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(23);
module.exports = {
  js: {
    html5shiv: __webpack_require__(26),
    respond: __webpack_require__(27),
    jquery: __webpack_require__(25)
  },
  images: {
    'login-bg': __webpack_require__(24)
  }
  // dll: {
  //   js: require('!!file-loader?name=dll/dll.js!../../dll/dll.js'),
  //   css: require('!file-loader?name=dll/dll.css!../../dll/dll.css'),
  // },
};

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/images/login-bg.jpg";

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/js/jquery.min.js";

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/js/html5shiv.min.js";

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/js/respond.min.js";

/***/ })
],[10]);
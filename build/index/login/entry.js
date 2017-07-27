webpackJsonp([1],{

/***/ 0:
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

__webpack_require__(4);
__webpack_require__(8);

window.switchToPage = function (page) {
  switch (page) {
    case 'login':
      $('#user-edit-password').hide();
      $('#login-box').show();
      break;

    case 'forget-password':
      $('#login-box').hide();
      $('#user-edit-password').show();
      break;

    default:
  }
};

$(function () {});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "html,\nbody {\n  overflow-y: auto;\n}\n@media (min-width: 768px) {\n  min-height: 945px;\n}\n@media (min-width: 768px) {\n  #bg {\n    width: 100%;\n    height: 945px;\n    position: absolute;\n    z-index: 0;\n  }\n}\n.register-panel,\n.login-panel,\n.forget-password-panel {\n  margin-top: 100px;\n}\n.panel-heading {\n  padding: 31px 15px;\n}\n.panel-heading .panel-title {\n  font-size: 24px;\n  color: #333;\n}\n.panel-body {\n  /* max-height: 450px;\n    overflow-y: auto; */\n  padding: 35px 43px;\n}\n.tab-content {\n  margin-top: 15px;\n}\n.link-container {\n  margin-top: 15px;\n}\n.form-inline .form-group {\n  margin-right: 10px;\n}\n", ""]);

// exports


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./page.less", function() {
			var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/less-loader/index.js!./page.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

},[11]);
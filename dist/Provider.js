"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Provider = void 0;

var _react = _interopRequireDefault(require("react"));

var _WolkenkitContext = _interopRequireDefault(require("./WolkenkitContext"));

var Provider = function Provider() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      application = _ref.application,
      children = _ref.children;

  if (!application) {
    return null;
  }

  return _react.default.createElement(_WolkenkitContext.default.Provider, {
    value: application
  }, children);
};

exports.Provider = Provider;
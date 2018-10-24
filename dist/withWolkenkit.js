"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withWolkenkit = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _WolkenkitContext = require("./WolkenkitContext");

var _react = _interopRequireDefault(require("react"));

var withWolkenkit = function withWolkenkit(Component) {
  return function (props) {
    return _react.default.createElement(_WolkenkitContext.Consumer, null, function (application) {
      return _react.default.createElement(Component, (0, _extends2.default)({
        application: application
      }, props));
    });
  };
};

exports.withWolkenkit = withWolkenkit;
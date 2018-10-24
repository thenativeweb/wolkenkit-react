"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wolkenkitConnect = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _WolkenkitContext = require("./WolkenkitContext");

var _react = _interopRequireDefault(require("react"));

var wolkenkitConnect = function wolkenkitConnect() {
  var mapCommandsToProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    return function (props) {
      return _react.default.createElement(_WolkenkitContext.Consumer, null, function (application) {
        var commands = Object.keys(mapCommandsToProps).reduce(function (accumulator, propertyName) {
          return (0, _objectSpread3.default)({}, accumulator, (0, _defineProperty2.default)({}, propertyName, mapCommandsToProps[propertyName](application)));
        }, {});
        return _react.default.createElement(Component, (0, _extends2.default)({
          application: application
        }, commands, props));
      });
    };
  };
};

exports.wolkenkitConnect = wolkenkitConnect;
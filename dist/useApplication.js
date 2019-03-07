"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApplication = void 0;

var _react = require("react");

var _WolkenkitContext = _interopRequireDefault(require("./WolkenkitContext"));

var useApplication = function useApplication() {
  var application = (0, _react.useContext)(_WolkenkitContext.default);
  return application;
};

exports.useApplication = useApplication;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListItem = void 0;

var _List = require("./List");

var _react = _interopRequireDefault(require("react"));

var ListItem = function ListItem() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$observe = _ref.observe,
      observe = _ref$observe === void 0 ? false : _ref$observe,
      list = _ref.list,
      id = _ref.id,
      children = _ref.children;

  if (!list) {
    throw new Error('List is missing.');
  }

  if (!id) {
    throw new Error('Id is missing.');
  }

  return _react.default.createElement(_List.List, {
    name: list,
    where: {
      id: id
    },
    observe: observe
  }, function (items) {
    if (items.length === 1) {
      if (typeof children === 'function') {
        return children(items[0]);
      }

      return _react.default.Children.map(children, function (Child) {
        return _react.default.createElement(Child, {
          item: items[0]
        });
      });
    }

    return null;
  });
};

exports.ListItem = ListItem;
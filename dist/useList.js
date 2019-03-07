"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useList = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _useApplication = require("./useApplication");

var _react = require("react");

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        items: action.items
      };

    case 'error':
      return (0, _objectSpread2.default)({}, state, {
        error: action.error
      });

    default:
      throw new Error('Invalid operation.');
  }
};

var useList = function useList(name) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      where = _ref.where,
      _ref$observe = _ref.observe,
      observe = _ref$observe === void 0 ? false : _ref$observe,
      orderBy = _ref.orderBy,
      skip = _ref.skip,
      take = _ref.take;

  if (!name) {
    throw new Error('Name is missing.');
  }

  var application = (0, _useApplication.useApplication)();

  if (!application) {
    throw new Error('Application is missing.');
  }

  var _useReducer = (0, _react.useReducer)(reducer, {
    items: [],
    error: undefined
  }),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    var list = application.lists[name];
    var stopReading;

    if (observe) {
      list.readAndObserve({
        where: where,
        orderBy: orderBy,
        skip: skip,
        take: take
      }).started(function (newItems, cancel) {
        stopReading = cancel;
      }).updated(function (newItems) {
        return dispatch({
          type: 'update',
          items: newItems
        });
      }).failed(function (error) {
        return dispatch({
          type: 'error',
          error: error
        });
      });
      return function () {
        if (stopReading) {
          stopReading();
        }
      };
    }

    list.read({
      where: where,
      orderBy: orderBy,
      skip: skip,
      take: take
    }).finished(function (newItems) {
      return dispatch({
        type: 'update',
        items: newItems
      });
    }).failed(function (error) {
      return dispatch({
        type: 'error',
        error: error
      });
    });
  }, [name, where, orderBy, skip, take]);
  return [state.items, state.error];
};

exports.useList = useList;
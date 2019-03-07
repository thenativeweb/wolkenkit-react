"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useListItem = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _useApplication = require("./useApplication");

var _react = require("react");

var reducer = function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        item: action.items[0]
      };

    case 'error':
      return (0, _objectSpread2.default)({}, state, {
        error: action.error
      });

    default:
      throw new Error('Invalid operation.');
  }
};

var useListItem = function useListItem(name, id) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$observe = _ref.observe,
      observe = _ref$observe === void 0 ? false : _ref$observe;

  if (!name) {
    throw new Error('Name is missing.');
  }

  if (!id) {
    throw new Error('Id is missing.');
  }

  var application = (0, _useApplication.useApplication)();

  if (!application) {
    throw new Error('Application is missing.');
  }

  var _useReducer = (0, _react.useReducer)(reducer, {
    item: undefined,
    error: undefined
  }),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    var list = application.lists[name];

    if (observe) {
      var stopReading;
      list.readAndObserve({
        where: {
          id: id
        },
        take: 1
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
      where: {
        id: id
      }
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
  }, [name, id]);
  return [state.item, state.error];
};

exports.useListItem = useListItem;
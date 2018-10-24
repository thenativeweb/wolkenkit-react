"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _withWolkenkit = require("./withWolkenkit");

var List =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(List, _React$Component);

  function List(props) {
    var _this;

    (0, _classCallCheck2.default)(this, List);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(List).call(this, props));
    _this.isReading = false;
    _this.state = {
      items: [],
      cancel: undefined
    };
    return _this;
  }

  (0, _createClass2.default)(List, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.application) {
        this.startReading();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.application === undefined && this.props.application !== undefined) {
        this.startReading();
        return;
      }

      if (prevProps.where !== this.props.where || prevProps.orderBy !== this.props.orderBy || prevProps.skip !== this.props.skip || prevProps.take !== this.props.take) {
        this.stopReading();
        this.startReading();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopReading();
    }
  }, {
    key: "startReading",
    value: function startReading() {
      var _this2 = this;

      var _this$props = this.props,
          application = _this$props.application,
          _this$props$observe = _this$props.observe,
          observe = _this$props$observe === void 0 ? false : _this$props$observe,
          name = _this$props.name,
          _this$props$where = _this$props.where,
          where = _this$props$where === void 0 ? {} : _this$props$where,
          orderBy = _this$props.orderBy,
          skip = _this$props.skip,
          take = _this$props.take;

      if (!application) {
        throw new Error('Application is misssing.');
      }

      var list = application.lists[name];

      if (this.isReading) {
        return;
      }

      this.isReading = true;

      if (!list) {
        return;
      }
      /* eslint-disable no-console */


      if (!observe) {
        list.read({
          where: where,
          orderBy: orderBy,
          skip: skip,
          take: take
        }).finished(function (items) {
          return _this2.setState({
            items: items
          });
        }).failed(function (error) {
          return console.error("Error in list ".concat(name, ": ").concat(error));
        });
      } else {
        list.readAndObserve({
          where: where,
          orderBy: orderBy,
          skip: skip,
          take: take
        }).started(function (items, cancel) {
          _this2.cancel = cancel;
        }).updated(function (items) {
          return _this2.setState({
            items: items
          });
        }).failed(function (error) {
          return console.error("Error in list ".concat(name, ": ").concat(error));
        });
      }
      /* eslint-enable no-console */

    }
  }, {
    key: "stopReading",
    value: function stopReading() {
      this.isReading = false;

      if (typeof this.cancel === 'function') {
        this.cancel();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var items = this.state.items;
      var _this$props2 = this.props,
          children = _this$props2.children,
          name = _this$props2.name;

      if (!name) {
        throw new Error('Name is missing.');
      }

      if (typeof children === 'function') {
        return children(items);
      }

      return _react.default.Children.map(children, function (Child) {
        return _react.default.createElement(Child, {
          items: items
        });
      });
    }
  }]);
  return List;
}(_react.default.Component);

var ListWithApplication = (0, _withWolkenkit.withWolkenkit)(List);
exports.List = ListWithApplication;
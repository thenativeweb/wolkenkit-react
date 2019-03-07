"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Application = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _Provider = require("./Provider");

var _react = _interopRequireDefault(require("react"));

var _wolkenkitClient = _interopRequireDefault(require("wolkenkit-client"));

var Application =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Application, _React$Component);

  function Application(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Application);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Application).call(this, props));
    _this.state = {
      application: undefined
    };
    return _this;
  }

  (0, _createClass2.default)(Application, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props = this.props,
          host = _this$props.host,
          port = _this$props.port,
          _this$props$protocol = _this$props.protocol,
          protocol = _this$props$protocol === void 0 ? 'wss' : _this$props$protocol,
          authentication = _this$props.authentication;
      /* eslint-disable no-console */

      _wolkenkitClient.default.connect({
        host: host,
        port: port,
        protocol: protocol,
        authentication: authentication
      }).then(function (application) {
        return _this2.setState({
          application: application
        });
      }).catch(function (error) {
        return console.error(error);
      });
      /* eslint-enable no-console */

    }
  }, {
    key: "render",
    value: function render() {
      var application = this.state.application;
      return _react.default.createElement(_Provider.Provider, {
        application: application
      }, this.props.children);
    }
  }]);
  return Application;
}(_react.default.Component);

exports.Application = Application;
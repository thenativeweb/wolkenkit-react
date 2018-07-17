import React, { Component } from "react";
import wolkenkit from "wolkenkit-client";

const { Provider, Consumer } = React.createContext();

const Application = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: undefined
    };
  }
  componentDidMount() {
    const { host, port, protocol = "https" } = this.props;
    wolkenkit
      .connect({
        host: host,
        port: port,
        protocol: protocol
      })
      .then(instance => this.setState({ instance }))
      .catch(error => console.error(error));
  }

  render() {
    if (!this.state.instance) return null;
    return (
      <Provider value={this.state.instance}>{this.props.children}</Provider>
    );
  }
};

const withApplication = Component => props => (
  <Consumer>
    {application => <Component application={application} {...props} />}
  </Consumer>
);

const List = withApplication(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        resultSet: []
      };
    }
    componentDidMount() {
      const { application } = this.props;
      const {
        observe = false,
        name,
        where = {},
        id,
        orderBy,
        skip,
        take
      } = this.props;
      const list = application.lists[name];
      if (id) {
        where["id"] = id;
        list
          .readOne({ where })
          .finished(resultSet => this.setState({ resultSet: [resultSet] }))
          .failed(error => console.error(`Error in list ${name}: ${error}`));
      } else {
        if (!observe) {
          list
            .read({ where, orderBy, skip, take })
            .started(resultSet => this.setState({ resultSet }))
            .updated(resultSet => this.setState({ resultSet }))
            .failed(error => console.error(`Error in list ${name}: ${error}`));
        } else {
          list
            .readAndObserve({ where, orderBy, skip, take })
            .started(resultSet => this.setState({ resultSet }))
            .updated(resultSet => this.setState({ resultSet }))
            .failed(error => console.error(`Error in list ${name}: ${error}`));
        }
      }
    }

    render() {
      return this.props.children(this.state.resultSet);
    }
  }
);

export { Application, List, withApplication };

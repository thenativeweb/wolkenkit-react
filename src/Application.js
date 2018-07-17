import React from "react";
import wolkenkit from "wolkenkit-client";

import { Provider } from "./WolkenkitContext";

class Application extends React.Component {
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
}

export { Application };

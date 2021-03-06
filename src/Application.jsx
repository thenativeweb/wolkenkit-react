import { Provider } from './Provider';
import React from 'react';
import wolkenkit from 'wolkenkit-client';

class Application extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      application: undefined
    };
  }

  componentDidMount () {
    const { host, port, protocol = 'wss', authentication } = this.props;

    /* eslint-disable no-console */
    wolkenkit.
      connect({
        host,
        port,
        protocol,
        authentication
      }).
      then(application => this.setState({ application })).
      catch(error => console.error(error));
    /* eslint-enable no-console */
  }

  render () {
    const { application } = this.state;

    return (
      <Provider application={ application }>{this.props.children}</Provider>
    );
  }
}

export { Application };

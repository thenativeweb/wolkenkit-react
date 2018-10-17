import { Provider } from './WolkenkitContext';
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
    const { host, port, protocol = 'https' } = this.props;

    /* eslint-disable no-console */
    wolkenkit.
      connect({
        host,
        port,
        protocol
      }).
      then(application => this.setState({ application })).
      catch(error => console.error(error));
    /* eslint-enable no-console */
  }

  render () {
    return (
      <Provider value={ this.state.application }>{this.props.children}</Provider>
    );
  }
}

export { Application };

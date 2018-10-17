import React from 'react';
import { withWolkenkit } from './withWolkenkit';

class List extends React.Component {
  constructor (props) {
    super(props);

    this.isReading = false;

    this.state = {
      items: [],
      cancel: undefined
    };
  }

  componentDidMount () {
    if (this.props.application) {
      this.startReading();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.application === undefined && this.props.application !== undefined) {
      this.startReading();

      return;
    }

    if (
      prevProps.where !== this.props.where ||
      prevProps.orderBy !== this.props.orderBy ||
      prevProps.skip !== this.props.skip ||
      prevProps.take !== this.props.take
    ) {
      this.stopReading();
      this.startReading();
    }
  }

  componentWillUnmount () {
    this.stopReading();
  }

  startReading () {
    const {
      application,
      observe = false,
      name,
      where = {},
      orderBy,
      skip,
      take
    } = this.props;

    const list = application.lists[name];

    if (this.isReading) {
      return;
    }

    this.isReading = true;

    if (!list) {
      return;
    }

    /* eslint-disable no-console */
    if (!observe) {
      list.
        read({ where, orderBy, skip, take }).
        finished(items => this.setState({ items })).
        failed(error => console.error(`Error in list ${name}: ${error}`));
    } else {
      list.
        readAndObserve({ where, orderBy, skip, take }).
        started((items, cancel) => {
          this.cancel = cancel;
        }).
        updated(items => this.setState({ items })).
        failed(error => console.error(`Error in list ${name}: ${error}`));
    }
    /* eslint-enable no-console */
  }

  stopReading () {
    this.isReading = false;

    if (typeof this.cancel === 'function') {
      this.cancel();
    }
  }

  render () {
    const { items } = this.state;
    const { children } = this.props;

    if (typeof children === 'function') {
      return children(items);
    }

    return React.Children.map(children, Child => (
      <Child items={ items } />
    ));
  }
}

const ListWithApplication = withWolkenkit(List);

export { ListWithApplication as List };

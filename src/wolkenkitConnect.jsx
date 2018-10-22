import { Consumer } from './WolkenkitContext';
import React from 'react';

const wolkenkitConnect = (mapCommandsToProps = {}) => Component => props => (
  <Consumer>
    {application => {
      const commands = Object.keys(mapCommandsToProps).reduce(
        (accumulator, propertyName) => ({
          ...accumulator,
          [propertyName]: mapCommandsToProps[propertyName](application)
        }),
        {}
      );

      return <Component application={ application } { ...commands } { ...props } />;
    }}
  </Consumer>
);

export { wolkenkitConnect };

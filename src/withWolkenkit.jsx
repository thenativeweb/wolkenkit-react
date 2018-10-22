import { Consumer } from './WolkenkitContext';
import React from 'react';

const withWolkenkit = Component => props => (
  <Consumer>
    {application => (<Component application={ application } { ...props } />)}
  </Consumer>
);

export { withWolkenkit };

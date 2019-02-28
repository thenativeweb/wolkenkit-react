import React from 'react';
import WolkenkitContext from './WolkenkitContext';

const withWolkenkit = Component => props => (
  <WolkenkitContext.Consumer>
    {application => (<Component application={ application } { ...props } />)}
  </WolkenkitContext.Consumer>
);

export { withWolkenkit };

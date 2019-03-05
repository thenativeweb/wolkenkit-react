import React from 'react';
import WolkenkitContext from './WolkenkitContext';

const Provider = ({ application, children } = {}) => {
  if (!application) {
    return null;
  }

  return (
    <WolkenkitContext.Provider value={ application }>{children}</WolkenkitContext.Provider>
  );
};

export { Provider };

import { useContext } from 'react';
import WolkenkitContext from './WolkenkitContext';

const useApplication = function () {
  const application = useContext(WolkenkitContext);

  return application;
};

export { useApplication };

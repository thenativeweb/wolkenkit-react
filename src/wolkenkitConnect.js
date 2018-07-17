import React from "react";
import { Consumer } from "./WolkenkitContext";

const wolkenkitConnect = (mapCommandsToProps = {}) => Component => props => (
  <Consumer>
    {application => {
      const commands = Object.keys(mapCommandsToProps).reduce(
        (accumulator, propertyName) => ({
          [propertyName]: mapCommandsToProps[propertyName](application)
        }),
        {}
      );
      return <Component application={application} {...commands} {...props} />;
    }}
  </Consumer>
);

export { wolkenkitConnect };

# wolkenkit-react

wolkenkit-react is a higher order component for the wolkenkit client.

## Table of contents

<!-- toc -->

- [Installation](#installation)
- [Sample usage](#sample-usage)
- [License](#license)

<!-- tocstop -->

## Installation

```shell
$ npm install --save wolkenkit-react
```

## Sample usage

### Create the application provider

```js
import React from "react";
import { Application } from "wolkenkit-react";

export class App extends React.Component {
  render() {
    return (
      <Application host={"local.wolkenkit.io"} port={3000}>
        {/* ... */}
      </Application>
    );
  }
}
```

### Read lists

```js
import React from "react";
import { List } from "wolkenkit-react";

export const MessageList = () => (
  <List name={"messages"} observe>
    {messages => <ul className={"messages"}>{/* ... */}</ul>}
  </List>
);
```

## Bind application instance to component

```js
import React from "react";
import { wolkenkitConnect } from "wolkenkit-react";

const Component = ({ application }) => <div>{/* ... */}</div>;

// A little 'reduxy' way of managing commands :)
const mapCommandsToProps = {
  sendMessage: app => messageText =>
    app.communication.message().send({ text: messageText })
};

export default wolkenkitConnect(mapCommandsToProps)(Component);
```

## License

Please be aware of the licenses of the components we use in this project.
Everything else that has been developed by the contributions to this project is under [MIT License](LICENSE).

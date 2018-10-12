# wolkenkit-react

Official React bindings for the [wolkenkit](https://github.com/thenativeweb/wolkenkit) framework.

## Installation

```shell
$ npm install wolkenkit-react
```

## Quick start

[…]

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

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2018 Nicolai Süper and the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

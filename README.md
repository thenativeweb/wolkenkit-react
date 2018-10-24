# wolkenkit-react

Official React bindings for [wolkenkit](https://github.com/thenativeweb/wolkenkit).

## Installation

```shell
$ npm install wolkenkit-react
```

## Connecting to an application

First you need to add a reference to your application. For the minimum setup, you have to reference the `Application` component. The component establishes a connection to the backend and makes it available to all `wolkenkit-react` components using the [Context API](https://reactjs.org/docs/context.html), so make sure to use it at the top level of your component tree.

```js
import { Application } from 'wolkenkit-react';

export class App extends React.Component {
  render () {
    return (
      <Application host={ 'local.wolkenkit.io' } port={ 3000 }>
        <div className='my-chat'>
        </div>
      </Application>
    );
  }
}
```

## Sending commands

If you want to send commands from a component use the `withWolkenkit` function to provide the `application` to this component as a property. The application is simply an app instance provided by the [`wolkenkit-client-js`](https://docs.wolkenkit.io/latest/reference/building-a-client/connecting-to-an-application/) module. So you just like the plain client you can use it for [sending commands](https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/) or [receiving events](https://docs.wolkenkit.io/latest/reference/building-a-client/receiving-events/).

Most often you will likely use this method to send commands from event handlers like this…

```js
import { withWolkenkit } from 'wolkenkit-react';

const MyComponent extends React.Component {
  handleSendMessage () {
    const { application } = this.props;

    // Issue a `send` command of the `message` aggregate in the `communication` context.
    application.communication.message().send({
      text: 'Hello react!'
    });
  }

  render () {
    <div>
      <button onClick={ () => this.handleSendMessage() }>Send message</button>
    </div>
  }
};

export default withWolkenkit(MyComponent);
```

## Reading lists

In order to read lists use the `List` component and provide the `name` property as well as a render function as a child that [serves as a render prop](https://reactjs.org/docs/render-props.html). This function will receive the items of this list as the first parameter.

```js
import { List } from 'wolkenkit-react';

const MessageList = () => (
  <List name={ 'messages' } observe={ true }>
    { messages => <ul className={ 'messages' }>{ messages.map(message => <li key={ message.id }>{ message.text }</li>) }</ul> }
  </List>
);
```

Set the `observe` property to `true` if you would like to read the list and observe future updates to it.

Just like the plain JavaScript SDK you can use the `where`, `orderBy`, `skip` and `take` properties to [filter lists](https://docs.wolkenkit.io/latest/reference/building-a-client/reading-lists/#filtering-lists).

```js
<List name={ 'messages' } where={{ likes: { $greaterThan: 100 }}}>
  { messages => … }
</List>
);
```

## Reading a single item of a list

In order to read a single item of a list use the `ListItem` component and provide the name of the list using the `list` property as well as a render function as a child that [serves as a render prop](https://reactjs.org/docs/render-props.html). This function will receive the item of this list as the first parameter.


```js
import { ListItem } from 'wolkenkit-react';

const MessageDetails = () => (
  <ListItem list={ 'messages' } id='' observe={ true }>
    { item => <div className={ 'message' }>{ message.text }</div> }
  </List>
);
```

Set the `observe` property to `true` if you would like to read the item and observe future updates to it.

## Intent to deprecate: Bind application instance to a component

The following `wolkenkitConnect` function has been been part of the original API of this module. This module is still in version `0.x` and its API is still in flux. So we're currently considering removing it in order to reduce and simplify the API. If you have any questions & concerns about this move, feel free to open an issue in this repository and give us feedback.

```js
import { wolkenkitConnect } from 'wolkenkit-react';

const Component = ({ application }) => <div>{/* ... */}</div>;

// Mapping commands to props inspired by redux
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

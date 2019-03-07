# wolkenkit-react

Official React bindings for [wolkenkit](https://github.com/thenativeweb/wolkenkit).

## Table of Contents

-   [Installation](#installation)
-   [Connecting to an application](#connecting-to-an-application)
    -   [Connecting manually](#connecting-manually)
-   [Sending commands](#sending-commands)
-   [Reading lists](#reading-lists)
-   [Reading a single item of a list](#reading-a-single-item-of-a-list)
-   [Experimental API: Using hooks](#experimental-api-using-hooks)
    -   [Sending commands](#sending-commands-1)
    -   [Reading lists using the useList hook](#reading-lists-using-the-uselist-hook)
    -   [Reading list items using the useListItem hook](#reading-list-items-using-the-uselistitem-hook)
-   [Running the build](#running-the-build)
-   [License](#license)

## Installation

```shell
$ npm install wolkenkit-react
```

## Connecting to an application

First you need to add a reference to your application. For the minimum setup, you have to reference the `Application` component. The component establishes a connection to the backend and makes it available to all `wolkenkit-react` components using the [Context API](https://reactjs.org/docs/context.html), so make sure to use it at the top level of your component tree. It will render its children once the application has been connected:

```javascript
import { Application } from 'wolkenkit-react';

export class App extends React.Component {
  render () {
    return (
      <Application host={ 'local.wolkenkit.io' } port={ 3000 }>
        <div className='app'>
        </div>
      </Application>
    );
  }
}
```

### Connecting manually

The `<Application />` component is well suited for simple use cases where you don't use a state container like `MobX` or `Redux` to manage your client state. In scenarios where you actually have a state container, this container will likely connect to your backend and therefore create the wolkenkit application instance. In such scenarios you can setup the connection to the wolkenkit application wherever you like and use the `<Provider />` component to make the application available to all the other components inside your tree:

```javascript
import { Provider } from 'wolkenkit-react';
import React from 'react';
import ReactDom from 'react-dom';

(async () => {
  const application = await wolkenkit.connect(...);

  ReactDom.render((
    <Provider application={ application }>
      <div className='app'></div>
    </Provider>
  ), document.querySelector('#root'));
})();
```

## Sending commands

If you want to send commands from a component use the `withWolkenkit` function to provide the `application` to this component as a property. The application is simply an app instance provided by the [`wolkenkit-client`](https://docs.wolkenkit.io/latest/reference/building-a-client/connecting-to-an-application/) module. So just like the plain client, you can use it to [send commands](https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/).

Most often you will likely use this method to send commands from event handlers like this…

```javascript
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

```javascript
import { List } from 'wolkenkit-react';

const MessageList = () => (
  <List name={ 'messages' } observe={ true }>
    { messages => <ul className={ 'messages' }>{ messages.map(message => <li key={ message.id }>{ message.text }</li>) }</ul> }
  </List>
);
```

Set the `observe` property to `true` if you would like to read the list and observe future updates to it.

Just like the plain JavaScript SDK you can use the `where`, `orderBy`, `skip` and `take` properties to [filter lists](https://docs.wolkenkit.io/latest/reference/building-a-client/reading-lists/#filtering-lists).

```javascript
<List name={ 'messages' } where={{ likes: { $greaterThan: 100 }}}>
  { messages => … }
</List>
);
```

## Reading a single item of a list

In order to read a single item of a list use the `ListItem` component and provide the name of the list using the `list` property as well as a render function as a child that [serves as a render prop](https://reactjs.org/docs/render-props.html). This function will receive the item of this list as the first parameter:

```javascript
import { ListItem } from 'wolkenkit-react';

const MessageDetails = () => (
  <ListItem list={ 'messages' } id='' observe={ true }>
    { item => <div className={ 'message' }>{ message.text }</div> }
  </List>
);
```

Set the `observe` property to `true` if you would like to read the item and observe future updates to it.

## Experimental API: Using hooks

With version 16.8.0 [React introduced the new Hooks API](https://reactjs.org/docs/hooks-intro.html) in order to make stateful logic available to function components. Therefore this package introduces a new API to provide wolkenkit functionality to function components. Please note: this API is still in flux. If you have any questions and concerns about this, feel free to [open an issue](/issues) and give feedback.

### Sending commands

If you want to send commands from a function component use the `useApplication` hook to provide the `application`. It returns an instance of the plain client that you can use to [send commands](https://docs.wolkenkit.io/latest/reference/building-a-client/sending-commands/):

```javascript
const ChatWithHooks = function () {
  const application = useApplication();
  const [ newMessageText, setNewMessage ] = useState('New message');

  const handleSendMessageClick = function (event) {
    application.communication.message().send({
      text: newMessageText
    });
  };

  render () {
    <div>
      <button onClick={ handleSendMessageClick }>Send message</button>
    </div>
  }
};
```

### Reading lists using the `useList` hook

In order to read lists use the `useList` hook and provide the `name` of the list as first parameter. You can provide additional options using the second parameter. Set the `observe` property to `true` if you would like to read the list and observe future updates to it:

```javascript
import { useList } from 'wolkenkit-react';

const MessageList = () => (
  const [ messages ] = useList('messages', { observe: true });

  return <ul className={ 'messages' }>messages.map(message => <li key={ message.id }>{ message.text }</li>)</ul>);
);
```

Just like the plain JavaScript SDK you can use the `where`, `orderBy`, `skip` and `take` options to [filter lists](https://docs.wolkenkit.io/latest/reference/building-a-client/reading-lists/#filtering-lists):

```javascript
const [ topMessages ] = useList('messages', { observe: true,  where={{ likes: { $greaterThan: 100 }}}});
```

### Reading list items using the `useListItem` hook

In order to read a single item of a list use the `useListItem` hook and provide the name of the list as the first parameter and the id of the item as second parameter. You can provide additional options using the third parameter. Set the `observe` property to `true` if you would like to read the list and observe future updates to it:

```javascript
import { useListItem } from 'wolkenkit-react';

const MessageList = ({ id }) => (
  const [ message ] = useListItem('messages', id, { observe: true });

  if (!message) {
    return null;
  }

  return <div className={ 'message' }>{ message.text }</div>;
);
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2018-2019 Nicolai Süper and the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

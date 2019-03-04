/* eslint-disable sort-imports */
import '@babel/polyfill';
import Chat from './screens/Chat.jsx';
/* eslint-enable sort-imports */
import ChatWithHooks from './screens/ChatWithHooks.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import wolkenkit from 'wolkenkit-client';
import { Application, Provider } from 'wolkenkit-react';

const useHooks = window.location.search === '?use-hooks';

(async () => {
  if (useHooks) {
    const application = await wolkenkit.connect({ host: 'local.wolkenkit.io', port: 3000 });

    ReactDOM.render((
      <Provider application={ application }>
        <ChatWithHooks />
      </Provider>
    ), document.querySelector('#root'));

    return;
  }

  ReactDOM.render((
    <Application host='local.wolkenkit.io' port={ 3000 }>
      <Chat />
    </Application>
  ), document.querySelector('#root'));
})();

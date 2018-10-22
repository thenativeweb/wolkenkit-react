import { Application } from 'wolkenkit-react';
import Chat from './screens/Chat.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render((
  <Application host='local.wolkenkit.io' port={ 3000 }>
    <Chat />
  </Application>
), document.querySelector('#root'));

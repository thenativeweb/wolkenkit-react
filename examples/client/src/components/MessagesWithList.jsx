import { List } from 'wolkenkit-react';
import Message from '../components/Message.jsx';
import React from 'react';

const MessagesWithList = function ({ onLikeClick, onMessageDetailClick }) {
  return (
    <List name='messages' observe={ true }>
      { messages => messages.map(message => (
        <Message
          key={ message.id }
          id={ message.id }
          likes={ message.likes }
          text={ message.text }
          timestamp={ message.timestamp }
          onLikeClick={ onLikeClick }
          onTimestampClick={ onMessageDetailClick }
        />
      ))
      }
    </List>
  );
};

export default MessagesWithList;

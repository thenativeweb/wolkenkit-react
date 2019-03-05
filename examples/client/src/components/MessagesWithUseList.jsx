import Message from '../components/Message.jsx';
import React from 'react';
import { useList } from 'wolkenkit-react';

const MessagesWithUseList = function ({ onLikeClick, onMessageDetailClick }) {
  const [ messages ] = useList('messages', { observe: true });

  return messages.map(message => (
    <Message
      key={ message.id }
      id={ message.id }
      likes={ message.likes }
      text={ message.text }
      timestamp={ message.timestamp }
      onLikeClick={ onLikeClick }
      onTimestampClick={ onMessageDetailClick }
    />
  ));
};

export default MessagesWithUseList;

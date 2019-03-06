import Message from './Message.jsx';
import React from 'react';
import { useListItem } from 'wolkenkit-react';

const MessageDetailPanelWithuseListItem = function ({ id, onClose, onLikeClick } = {}) {
  const [ message ] = useListItem('messages', id, { observe: true });

  if (!message) {
    return null;
  }

  return (
    <div className='message-detail-panel'>
      <Message
        key={ message.id }
        id={ message.id }
        likes={ message.likes }
        text={ message.text }
        timestamp={ message.timestamp }
        onLikeClick={ onLikeClick }
      />

      <div className='message-detail-panel__close' onClick={ onClose }>Close</div>
    </div>
  );
};

export default MessageDetailPanelWithuseListItem;

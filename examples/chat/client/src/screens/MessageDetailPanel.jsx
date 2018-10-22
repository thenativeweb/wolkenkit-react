import { ListItem } from 'wolkenkit-react';
import Message from './Message.jsx';
import React from 'react';

const MessageDetailPanel = function ({ id, onClose, onLikeClick } = {}) {
  return (
    <div className='message-detail-panel'>
      <ListItem list='messages' id={ id } observe={ true }>
        { message => (
          <Message
            key={ message.id }
            id={ message.id }
            likes={ message.likes }
            text={ message.text }
            timestamp={ message.timestamp }
            onLikeClick={ onLikeClick }
          />
        )}
      </ListItem>

      <div className='message-detail-panel__close' onClick={ onClose }>Close</div>
    </div>
  );
};

export default MessageDetailPanel;

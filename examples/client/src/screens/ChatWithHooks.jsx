import MessageDetailPanelWithUseListItem from '../components/MessageDetailPanelWithUseListItem.jsx';
import MessagesWithUseList from '../components/MessagesWithUseList.jsx';
import { useApplication } from 'wolkenkit-react';
import React, { useCallback, useEffect, useReducer } from 'react';

const initialState = {
  newMessageText: '',
  selectedMessageId: undefined
};

const appStateReducer = function (state, action) {
  switch (action.type) {
    case 'change-new-message':
      return {
        newMessageText: action.text
      };
    case 'select-message':
      return {
        ...state,
        selectedMessageId: action.id
      };
    case 'deselect-message':
      return {
        ...state,
        selectedMessageId: undefined
      };
    default:
      throw new Error();
  }
};

const ChatWithHooks = function () {
  const application = useApplication();

  const [ state, dispatch ] = useReducer(appStateReducer, initialState);

  useEffect(() => {
    /* eslint-disable no-console */
    console.log('Chat.componentDidMount', application);
    /* eslint-enable no-console */
  }, []);

  const handleNewMessageChange = useCallback(event => {
    dispatch({ type: 'change-new-message', text: event.target.value });
  }, []);

  const handleMessageDetailClick = useCallback(event => {
    event.preventDefault();

    const messageId = event.target.getAttribute('data-message-id');

    dispatch({ type: 'select-message', id: messageId });
  }, []);

  const handleSendMessageClick = async function (event) {
    event.preventDefault();

    const { newMessageText } = state;

    if (!newMessageText) {
      return;
    }

    await new Promise((resolve, reject) => {
      application.communication.message().send({
        text: newMessageText
      }).
        await('sent', resolve).
        failed(reject);
    });

    dispatch({ type: 'change-new-message', text: '' });
  };

  const handleLikeClick = useCallback(event => {
    const messageId = event.target.getAttribute('data-message-id');

    if (!messageId) {
      return;
    }

    application.communication.message(messageId).like();
  }, []);

  return (
    <div className='screen'>
      <div className='left-panel'>
        <ul className='messages'>
          <MessagesWithUseList onLikeClick={ handleLikeClick } onMessageDetailClick={ handleMessageDetailClick } />
        </ul>

        <form className='send-message-form'>
          <input
            id='new-message'
            className='new-message'
            type='text'
            placeholder='Enter a message'
            value={ state.newMessageText }
            onChange={ handleNewMessageChange }
          />
          <button id='send-message' type='submit' onClick={ event => handleSendMessageClick(event) }>Send message</button>
        </form>
      </div>

      { state.selectedMessageId ?
        (
          <div className='right-panel'>
            <MessageDetailPanelWithUseListItem
              id={ state.selectedMessageId }
              onClose={ () => dispatch({ type: 'deselect-message' }) }
              onLikeClick={ handleLikeClick }
            />
          </div>
        ) :
        null
      }
    </div>
  );
};

export default ChatWithHooks;

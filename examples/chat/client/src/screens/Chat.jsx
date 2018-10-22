import Message from './Message.jsx';
import MessageDetailPanel from './MessageDetailPanel.jsx';
import React from 'react';
import { List, withWolkenkit } from 'wolkenkit-react';

class Chat extends React.Component {
  constructor (props) {
    super(props);

    this.handleMessageDetailClick = this.handleMessageDetailClick.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleNewMessageChange = this.handleNewMessageChange.bind(this);
    this.handleSendMessageClick = this.handleSendMessageClick.bind(this);

    this.state = {
      newMessageText: '',
      selectedMessageId: undefined
    };
  }

  handleMessageDetailClick (event) {
    event.preventDefault();

    const messageId = event.target.getAttribute('data-message-id');

    this.setState({
      selectedMessageId: messageId
    });
  }

  handleLikeClick (event) {
    const messageId = event.target.getAttribute('data-message-id');

    const { application } = this.props;

    if (!messageId) {
      return;
    }

    application.communication.message(messageId).like();
  }

  handleNewMessageChange (event) {
    this.setState({
      newMessageText: event.target.value
    });
  }

  handleSendMessageClick (event) {
    event.preventDefault();

    const { application } = this.props;
    const { newMessageText } = this.state;

    if (!this.state.newMessageText) {
      return;
    }

    application.communication.message().send({
      text: newMessageText
    });
  }

  render () {
    const { newMessageText, selectedMessageId } = this.state;

    return (
      <div className='screen'>
        <div className='left-panel'>
          <ul className='messages'>
            <List name='messages' observe={ true }>
              { messages => messages.map(message => (
                <Message
                  key={ message.id }
                  id={ message.id }
                  likes={ message.likes }
                  text={ message.text }
                  timestamp={ message.timestamp }
                  onLikeClick={ this.handleLikeClick }
                  onTimestampClick={ this.handleMessageDetailClick }
                />
              ))
              }
            </List>
          </ul>

          <form className='send-message-form'>
            <input
              id='new-message'
              className='new-message'
              type='text'
              placeholder='Enter a message'
              value={ newMessageText }
              onChange={ this.handleNewMessageChange }
            />
            <button id='send-message' type='submit' onClick={ this.handleSendMessageClick }>Send message</button>
          </form>
        </div>

        { selectedMessageId ?
          (
            <div className='right-panel'>
              <MessageDetailPanel
                id={ selectedMessageId }
                onClose={ () => this.setState({ selectedMessageId: undefined }) }
                onLikeClick={ this.handleLikeClick }
              />
            </div>
          ) :
          null
        }
      </div>
    );
  }
}

export default withWolkenkit(Chat);

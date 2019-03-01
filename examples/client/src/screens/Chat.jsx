import MessageDetailPanelWithListItem from '../components/MessageDetailPanelWithListItem.jsx';
import MessageDetailPanelWithUseListItem from '../components/MessageDetailPanelWithUseListItem.jsx';
import MessagesWithList from '../components/MessagesWithList.jsx';
import MessagesWithUseList from '../components/MessagesWithUseList.jsx';
import React from 'react';
import { withWolkenkit } from 'wolkenkit-react';

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

  componentDidMount () {
    const { application } = this.props;

    /* eslint-disable no-console */
    console.log('Chat.componentDidMount', application);
    /* eslint-enable no-console */
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

  async handleSendMessageClick (event) {
    event.preventDefault();

    const { application } = this.props;
    const { newMessageText } = this.state;

    if (!this.state.newMessageText) {
      return;
    }

    await new Promise((resolve, reject) => {
      application.communication.message().send({
        text: newMessageText
      }).
        await('sent', resolve).
        failed(reject);
    });

    this.setState({
      newMessageText: ''
    });
  }

  render () {
    const { newMessageText, selectedMessageId } = this.state;

    const useHooks = window.location.search === '?use-hooks';

    return (
      <div className='screen'>
        <div className='left-panel'>
          <ul className='messages'>
            {
              useHooks ?
                <MessagesWithUseList onLikeClick={ this.handleLikeClick } onMessageDetailClick={ this.handleMessageDetailClick } /> :
                <MessagesWithList onLikeClick={ this.handleLikeClick } onMessageDetailClick={ this.handleMessageDetailClick } />
            }
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
              {
                useHooks ?
                  <MessageDetailPanelWithUseListItem
                    id={ selectedMessageId }
                    onClose={ () => this.setState({ selectedMessageId: undefined }) }
                    onLikeClick={ this.handleLikeClick }
                  /> :
                  <MessageDetailPanelWithListItem
                    id={ selectedMessageId }
                    onClose={ () => this.setState({ selectedMessageId: undefined }) }
                    onLikeClick={ this.handleLikeClick }
                  />
              }

            </div>
          ) :
          null
        }
      </div>
    );
  }
}

export default withWolkenkit(Chat);

/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const initialState = {
  text: '',
  likes: 0,
  isAuthorized: {
    commands: {
      send: { forPublic: true },
      like: { forPublic: true }
    },
    events: {
      sent: { forPublic: true },
      liked: { forPublic: true }
    }
  }
};

const commands = {
  send (message, command) {
    if (!command.data.text) {
      return command.reject('Text is missing.');
    }

    message.events.publish('sent', {
      text: command.data.text
    });
  },

  like (message) {
    message.events.publish('liked', {
      likes: message.state.likes + 1
    });
  }
};

const events = {
  sent (message, event) {
    message.setState({
      text: event.data.text
    });
  },

  liked (message, event) {
    message.setState({
      likes: event.data.likes
    });
  }
};

module.exports = { initialState, commands, events };

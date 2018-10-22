/* eslint-disable strict */
'use strict';
/* eslint-enable strict */

const fields = {
  text: { initialState: '' },
  likes: { initialState: 0 },
  timestamp: { initialState: 0, fastLookup: true }
};

const projections = {
  'communication.message.sent' (messages, event) {
    messages.add({
      text: event.data.text,
      timestamp: event.metadata.timestamp
    });
  },

  'communication.message.liked' (messages, event) {
    messages.update({
      where: { id: event.aggregate.id },
      set: {
        likes: event.data.likes
      }
    });
  }
};

module.exports = { fields, projections };

import React from 'react';

const Message = function ({ id, text, timestamp, likes, onLikeClick, onTimestampClick } = {}) {
  const date = new Date(timestamp);
  const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <div className='message'>
      {
        onTimestampClick ?
          (<a href='#' className='timestamp' data-message-id={ id } onClick={ onTimestampClick }>{ formattedDate }</a>) :
          (<div className='timestamp'>{ formattedDate }</div>)
      }
      <div className='label'>{ text }</div>
      <div className='likes' data-message-id={ id } onClick={ onLikeClick }>
        <span className='button'>👍</span>
        <span className='count'>{ likes || 0 }</span>
      </div>
    </div>
  );
};

export default Message;

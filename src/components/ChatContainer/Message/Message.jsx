import React from 'react';
import {Message} from "rsuite";

const ChatMessage = ({message}) => {
  const {userName, text} = message

  return (
    <div style={{marginBottom: '15px'}}>
      <Message
        type="info"
        title={userName}
        description={text}
      />
    </div>
  );
};

export default ChatMessage;

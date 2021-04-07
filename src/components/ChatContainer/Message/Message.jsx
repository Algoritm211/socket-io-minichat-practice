import React from 'react';
import {Message} from "rsuite";

const ChatMessage = () => {
  return (
    <div style={{marginBottom: '15px'}}>
      <Message
        type="info"
        title="Alex S"
        description="Detailed description and advices about successful copywriting."
      />
    </div>
  );
};

export default ChatMessage;

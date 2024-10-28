import React from 'react';
import '../../styles/ChatRoom.css';

const ChatMessage = ({ sender, text }) => {
  const isBot = sender === 'BOT';

  return (
    <div className={`chat-message ${isBot ? 'bot-message' : 'user-message'}`}>
      <div className="message-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

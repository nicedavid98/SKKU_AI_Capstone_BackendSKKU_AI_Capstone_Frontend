import React from 'react';
import '../../styles/ChatRoom.css'; // 같은 스타일 파일에서 메시지 스타일 관리

const ChatMessage = ({ sender, text }) => {
  const isBot = sender === 'bot';

  return (
    <div className={`chat-message ${isBot ? 'bot-message' : 'user-message'}`}>
      <div className="message-bubble">
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

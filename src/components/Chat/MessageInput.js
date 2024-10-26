import React, { useState } from 'react';
import '../../styles/ChatRoom.css'; // 같은 스타일 파일에서 메시지 스타일 관리

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message); // 상위 컴포넌트로 메시지 전달
      setMessage('');   // 입력 필드 초기화
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default MessageInput;

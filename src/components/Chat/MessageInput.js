import React, { useState } from 'react';
// 필요한 아이콘 가져오기
import { FaTelegramPlane } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { MdSend } from 'react-icons/md';
import { BiSend } from 'react-icons/bi';
import '../../styles/ChatRoom.css';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
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
      <button type="submit" className="send-button" aria-label="Send">
        <FiSend className="send-icon" />
      </button>
    </form>
  );
};

export default MessageInput;

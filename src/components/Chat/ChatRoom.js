import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import '../../styles/ChatRoom.css'; // 같은 스타일 파일에서 메시지 스타일 관리

const ChatRoom = ({ chatRoomId }) => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // 채팅방이 변경되면 초기 메시지 로드 (채팅방에 따라 다르게 처리 가능)
  useEffect(() => {
    if (chatRoomId === 1) {
      setMessages([
        { id: 1, sender: 'bot', text: 'Welcome to the Design Thinking chat!' },
        { id: 2, sender: 'user', text: 'Hello, let\'s talk about design.' }
      ]);
    } else if (chatRoomId === 2) {
      setMessages([
        { id: 1, sender: 'bot', text: 'Welcome to the E-Commerce Website chat!' },
        { id: 2, sender: 'user', text: 'I have some code questions.' }
      ]);
    } else {
      setMessages([{ id: 1, sender: 'bot', text: 'Please select a chat room.' }]);
    }
  }, [chatRoomId]);

  // 새로운 메시지가 추가되면 자동으로 스크롤을 맨 아래로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 새로운 메시지를 추가하는 함수
  const addMessage = (message) => {
    setMessages([...messages, { id: messages.length + 1, sender: 'user', text: message }]);
  };

  return (
    <div className="chat-room">
      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} sender={message.sender} text={message.text} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default ChatRoom;

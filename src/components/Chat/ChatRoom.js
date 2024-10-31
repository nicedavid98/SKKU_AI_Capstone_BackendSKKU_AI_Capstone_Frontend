import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import '../../styles/ChatRoom.css';

const ChatRoom = ({ chatRoomId, userId }) => {
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  // 특정 채팅방 메시지 불러오기
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/messages/chatroom/${chatRoomId}`);
        const data = await response.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        setMessages([]);
      }
    };
    fetchMessages();
  }, [chatRoomId]);

  // 새로운 메시지를 전송하고, 사용자와 봇 메시지를 별도로 추가하는 함수
  const addMessage = async (message) => {
    // 유저의 메시지를 먼저 화면에 추가
    const userMessage = { id: Date.now(), senderType: 'USER', content: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // 챗봇의 응답 가져오기
    try {
      const response = await fetch(`http://localhost:8080/api/messages/send?chatRoomId=${chatRoomId}&senderType=USER&content=${encodeURIComponent(message)}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      // 챗봇의 응답 메시지만 추가
      const newMessages = await response.json();
      const botMessages = newMessages.filter(msg => msg.senderType !== 'USER');
      setMessages((prevMessages) => [...prevMessages, ...botMessages]); // 기존 메시지에 봇 메시지만 추가
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // 새로운 메시지가 추가되면 스크롤을 아래로 이동
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-room">
      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} sender={message.senderType} text={message.content} />
        ))}
        <div ref={chatEndRef} />
      </div>
      <MessageInput onSend={addMessage} />
    </div>
  );
};

export default ChatRoom;

// import React, { createContext, useState, useContext } from 'react';

// // 채팅 상태를 관리할 컨텍스트 생성
// const ChatContext = createContext();

// // ChatProvider 컴포넌트: 채팅 상태를 제공하는 컴포넌트
// export const ChatProvider = ({ children }) => {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'bot', text: 'Welcome to the chat!' },
//     { id: 2, sender: 'user', text: 'Hello, I need some help.' }
//   ]);

//   // 새로운 메시지를 추가하는 함수
//   const addMessage = (message, sender = 'user') => {
//     const newMessage = {
//       id: messages.length + 1,
//       sender,
//       text: message,
//     };
//     setMessages([...messages, newMessage]);
//   };

//   return (
//     <ChatContext.Provider value={{ messages, addMessage }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

// // 채팅 상태를 사용하기 위한 커스텀 훅
// export const useChat = () => {
//   return useContext(ChatContext);
// };

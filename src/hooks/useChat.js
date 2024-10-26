// import { useState, useRef, useEffect } from 'react';

// const useChat = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'bot', text: 'Welcome to the chat!' },
//     { id: 2, sender: 'user', text: 'Hello, I need some help.' }
//   ]);

//   const chatEndRef = useRef(null);

//   // 새로운 메시지가 추가될 때 자동으로 스크롤을 맨 아래로 이동시키는 함수
//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // 새로운 메시지를 추가하는 함수
//   const addMessage = (message, sender = 'user') => {
//     const newMessage = {
//       id: messages.length + 1,
//       sender,
//       text: message,
//     };
//     setMessages([...messages, newMessage]);
//   };

//   return {
//     messages,
//     addMessage,
//     chatEndRef,
//   };
// };

// export default useChat;

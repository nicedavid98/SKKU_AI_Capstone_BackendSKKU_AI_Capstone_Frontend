import React, { useState } from 'react';
import '../../styles/RecentChats.css'

const RecentChats = ({ onSelectRoom }) => {
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: 'Design Thinking' },
    { id: 2, name: 'E-Commerce Website Code' }
  ]);

  // 새로운 채팅방을 추가하는 함수
  const addChatRoom = (newRoomName) => {
    const newRoom = {
      id: chatRooms.length + 1, // 임시 ID, 나중에 서버에서 받아오는 값으로 대체 가능
      name: newRoomName,
    };
    setChatRooms([...chatRooms, newRoom]);
  };

  // 새로운 채팅방 추가 핸들러 (폼 제출)
  const handleAddChatRoom = (e) => {
    e.preventDefault();
    const newRoomName = e.target.elements.newRoomName.value;
    if (newRoomName.trim()) {
      addChatRoom(newRoomName);
      e.target.reset(); // 폼 초기화
    }
  };

  // 채팅방 선택 핸들러
  const handleSelectRoom = (roomId) => {
    onSelectRoom(roomId); // 부모 컴포넌트로 방 ID 전달
  };

  return (
    <div className="recent-chats">
      <h2>Recent Chats</h2>
      <ul className="chat-room-list">
        {chatRooms.map((room) => (
          <li key={room.id} className="chat-room-item" onClick={() => handleSelectRoom(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>

      {/* 새로운 채팅방을 추가할 수 있는 폼 */}
      <form onSubmit={handleAddChatRoom} className="add-chat-form">
        <input
          type="text"
          name="newRoomName"
          className="add-chat-input"
          placeholder="Enter new chat room name"
          required
        />
        <button type="submit" className="add-chat-button">Add Chat Room</button>
      </form>
    </div>
  );
};

export default RecentChats;


import React, { useState, useEffect } from 'react';
import '../../styles/RecentChats.css';

const RecentChats = ({ onSelectRoom, userId }) => {
  const [chatRooms, setChatRooms] = useState([]); 

  // 채팅방 목록을 로드하는 함수
  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        // 특정 사용자 ID에 따른 채팅방 목록 요청
        const response = await fetch(`http://localhost:8080/api/chatroom?userId=${userId}`);
        const data = await response.json();
        
        // 데이터가 배열인지 확인하여 상태 업데이트
        setChatRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
        setChatRooms([]);
      }
    };
    fetchChatRooms();
  }, [userId]);

  // 새로운 채팅방 추가 함수
  const addChatRoom = async (newRoomName) => {
    try {
      // POST 요청으로 새로운 채팅방 생성
      const response = await fetch(`http://localhost:8080/api/chatroom/create?userId=${userId}&title=${encodeURIComponent(newRoomName)}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to create chat room');
      }

      // 생성된 새 채팅방을 받아 기존 목록에 추가
      const newRoom = await response.json();
      setChatRooms((prevRooms) => [...prevRooms, newRoom]);
    } catch (error) {
      console.error('Failed to create chat room:', error);
    }
  };

  // 새로운 채팅방 추가 폼 핸들러
  const handleAddChatRoom = (e) => {
    e.preventDefault();
    const newRoomName = e.target.elements.newRoomName.value;
    if (newRoomName.trim()) {
      addChatRoom(newRoomName);
      e.target.reset();
    }
  };

  // 채팅방 선택 핸들러
  const handleSelectRoom = (roomId) => {
    onSelectRoom(roomId);
  };

  return (
    <div className="recent-chats">
      <h2>Recent Chats</h2>
      <ul className="chat-room-list">
        {chatRooms.map((room) => (
          <li key={room.id} className="chat-room-item" onClick={() => handleSelectRoom(room.id)}>
            {room.title}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddChatRoom} className="add-chat-form">
        <input type="text" name="newRoomName" className="add-chat-input" placeholder="Enter new chat room name" required />
        <button type="submit" className="add-chat-button">Add Chat Room</button>
      </form>
    </div>
  );
};

export default RecentChats;

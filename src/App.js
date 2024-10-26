import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import RecentChats from './components/RecentChats/RecentChats';
import CalendarPage from './pages/CalendarPage';
import MyPage from './components/MyPage/MyPage';
import ChatRoom from './components/Chat/ChatRoom';
import LoginPage from './pages/LoginPage'; // 로그인 페이지 컴포넌트
import RegisterPage from './pages/RegisterPage'; // 회원가입 페이지 컴포넌트
import { ProfileProvider } from './context/ProfileContext'; 
import './App.css'; // 스타일 파일

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [selectedChatRoom, setSelectedChatRoom] = useState(null); // 현재 선택된 채팅방 ID
  const [userId, setUserId] = useState(null); // 로그인 후 저장되는 사용자 ID

  // 로그인 핸들러
  const handleLogin = async (loginInfo) => {
    setIsLoggedIn(true);
  };

  return (
    <ProfileProvider>
      <Router>
        <div className={isLoggedIn ? "app" : "login-layout"}>
          {!isLoggedIn ? (
            <Routes>
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/*" element={<LoginPage onLogin={handleLogin} />} />
            </Routes>
          ) : (
            <>
              <Sidebar />

              <div className="main-content">
                <Routes>
                  <Route path="/recent-chats" element={<RecentChats userId={userId} onSelectRoom={setSelectedChatRoom} />} />
                  <Route path="/calendar" element={<CalendarPage userId={userId} />} />
                  <Route path="/my-page" element={<MyPage userId={userId} />} />
                  <Route path="/" element={<RecentChats userId={userId} onSelectRoom={setSelectedChatRoom} />} />
                </Routes>
              </div>

              <div className="chat-room">
                <ChatRoom chatRoomId={selectedChatRoom} userId={userId} />
              </div>
            </>
          )}
        </div>
      </Router>
    </ProfileProvider>
  );
}

export default App;

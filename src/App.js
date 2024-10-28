import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import RecentChats from './components/RecentChats/RecentChats';
import CalendarPage from './pages/CalendarPage';
import MyPage from './components/MyPage/MyPage';
import ChatRoom from './components/Chat/ChatRoom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useProfile } from './context/ProfileContext';
import './App.css';

function App() {
  const { updateProfile } = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 로그인 핸들러
  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    updateProfile({
      userId: userInfo.id,
      realname: userInfo.realname,
      bio: userInfo.bio,
      profileImageUrl: userInfo.profileImageUrl,
    });
  };

  // 컴포넌트가 처음 마운트될 때만 리다이렉트
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/recent-chats');
    }
  }, [isLoggedIn]);

  return (
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
              <Route path="/recent-chats" element={<RecentChats />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/my-page" element={<MyPage />} />
              <Route path="/" element={<RecentChats />} />
            </Routes>
          </div>

          <div className="chat-room">
            <ChatRoom />
          </div>
        </>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

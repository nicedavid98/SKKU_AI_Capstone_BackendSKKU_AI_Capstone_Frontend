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
  const { profile, updateProfile } = useProfile();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialLogin, setInitialLogin] = useState(false);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    setInitialLogin(true);
    updateProfile({
      userId: userInfo.id,
      realname: userInfo.realname,
      bio: userInfo.bio,
      profileImageUrl: userInfo.profileImageUrl,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setInitialLogin(false);
    updateProfile({});
    navigate('/');
  };

  useEffect(() => {
    if (isLoggedIn && initialLogin) {
      navigate('/recent-chats');
      setInitialLogin(false);
    }
  }, [isLoggedIn, initialLogin, navigate]);

  return (
    <div className={isLoggedIn ? "app" : "login-layout"}>
      {!isLoggedIn ? (
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<LoginPage onLogin={handleLogin} />} />
        </Routes>
      ) : (
        <>
          <Sidebar onLogout={handleLogout} />
          <div className="main-content">
            <Routes>
              <Route path="/recent-chats" element={<RecentChats onSelectRoom={setSelectedChatRoomId} userId={profile.userId} />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/my-page" element={<MyPage />} />
              <Route path="/" element={<RecentChats onSelectRoom={setSelectedChatRoomId} userId={profile.userId} />} />
            </Routes>
          </div>
          <div className="chat-room">
            <ChatRoom chatRoomId={selectedChatRoomId} userId={profile.userId} />
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

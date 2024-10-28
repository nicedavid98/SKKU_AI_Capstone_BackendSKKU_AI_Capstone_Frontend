import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

  // 로그인 핸들러
  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    updateProfile({
      userId: userInfo.id,
      realname: userInfo.realname,
      bio: userInfo.bio,
      profilePicture: userInfo.profileImageUrl,
    });
  };

  return (
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
    </Router>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar/Sidebar';
// import RecentChats from './components/RecentChats/RecentChats';
// import CalendarPage from './pages/CalendarPage';
// import MyPage from './components/MyPage/MyPage';
// import ChatRoom from './components/Chat/ChatRoom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import { useProfile } from './context/ProfileContext';
// import './App.css';

// function App() {
//   const { updateProfile } = useProfile();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   // 로그인 핸들러
//   const handleLogin = (userInfo) => {
//     setIsLoggedIn(true);
//     updateProfile({
//       userId: userInfo.id,
//       realname: userInfo.realname,
//       bio: userInfo.bio,
//       profileImageUrl: userInfo.profileImageUrl,
//     });
//   };

//   // 로그아웃 핸들러
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     updateProfile({}); // 프로필 초기화
//     navigate('/'); // 로그인 화면으로 리다이렉트
//   };

//   // 컴포넌트가 처음 마운트될 때만 리다이렉트
//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate('/recent-chats');
//     }
//   }, [isLoggedIn, navigate]);

//   return (
//     <div className={isLoggedIn ? "app" : "login-layout"}>
//       {!isLoggedIn ? (
//         <Routes>
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/*" element={<LoginPage onLogin={handleLogin} />} />
//         </Routes>
//       ) : (
//         <>
//           <Sidebar onLogout={handleLogout} />

//           <div className="main-content">
//             <Routes>
//               <Route path="/recent-chats" element={<RecentChats />} />
//               <Route path="/calendar" element={<CalendarPage />} />
//               <Route path="/my-page" element={<MyPage />} />
//               <Route path="/" element={<RecentChats />} />
//             </Routes>
//           </div>

//           <div className="chat-room">
//             <ChatRoom />
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default function AppWrapper() {
//   return (
//     <Router>
//       <App />
//     </Router>
//   );
// }


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
  const [initialLogin, setInitialLogin] = useState(false); // 로그인 초기 상태를 위한 상태
  const navigate = useNavigate();

  // 로그인 핸들러
  const handleLogin = (userInfo) => {
    setIsLoggedIn(true);
    setInitialLogin(true); // 첫 로그인 시에만 true로 설정
    updateProfile({
      userId: userInfo.id,
      realname: userInfo.realname,
      bio: userInfo.bio,
      profileImageUrl: userInfo.profileImageUrl,
    });
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setInitialLogin(false); // 로그아웃 시 초기 로그인 상태도 false로 설정
    updateProfile({});
    navigate('/'); // 로그인 화면으로 리다이렉트
  };

  // 첫 로그인 시에만 recent-chats로 리다이렉트
  useEffect(() => {
    if (isLoggedIn && initialLogin) {
      navigate('/recent-chats');
      setInitialLogin(false); // 첫 로그인 후에 다시 실행되지 않도록 false로 변경
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

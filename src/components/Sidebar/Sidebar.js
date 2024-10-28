import React from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 사용
import { useProfile } from '../../context/ProfileContext'; // 프로필 상태 가져오기
import '../../styles/Sidebar.css';

const Sidebar = () => {
  const { profile } = useProfile(); // 전역 프로필 상태 사용

  return (
    <div className="sidebar">
      {/* 유저 프로필 카드 */}
      <div className="user-profile-card">
        <img src={profile.profileImageUrl} alt={`${profile.realname}'s profile`} className="profile-picture" />
        <div className="user-info">
          <h3>{profile.realname}</h3>
          <p>{profile.bio}</p>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="menu-list">
        <li className="menu-item">
          <Link to="/recent-chats">Recent Chats</Link>
        </li>
        <li className="menu-item">
          <Link to="/calendar">Calendar</Link>
        </li>
        <li className="menu-item">
          <Link to="/my-page">My Page</Link>
        </li>
        <li className="menu-item">
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;


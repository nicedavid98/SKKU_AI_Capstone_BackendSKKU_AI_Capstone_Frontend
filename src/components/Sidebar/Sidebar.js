import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../../context/ProfileContext';
import { FaComments, FaCalendarAlt, FaUser, FaSignOutAlt } from 'react-icons/fa'; // react-icons에서 아이콘 가져오기
import '../../styles/Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const { profile } = useProfile();

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
          <Link to="/recent-chats">
            <FaComments className="menu-icon" /> Recent Chats
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/calendar">
            <FaCalendarAlt className="menu-icon" /> Calendar
          </Link>
        </li>
        <li className="menu-item">
          <Link to="/my-page">
            <FaUser className="menu-icon" /> My Page
          </Link>
        </li>
        <li className="menu-item">
          <button onClick={onLogout} className="logout-button">
            <FaSignOutAlt className="menu-icon" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

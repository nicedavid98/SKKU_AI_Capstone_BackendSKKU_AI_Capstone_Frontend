import React from 'react';
import '../../styles/Sidebar.css'; // 스타일링 파일

const UserProfileCard = ({ name, email, profilePicture }) => {
  return (
    <div className="user-profile-card">
      <img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <h3 className="user-name">{name}</h3>
      <p className="user-email">{email}</p>
    </div>
  );
};

export default UserProfileCard;

import React from 'react';
import '../../styles/Sidebar.css'; // 스타일링 파일

const UserProfileCard = ({ realname, bio, profileImageUrl }) => {
  return (
    <div className="user-profile-card">
      <img src={profileImageUrl} alt={`${realname}'s profile`} className="profile-picture" />
      <h3 className="user-name">{realname}</h3>
      <p className="user-bio">{bio}</p>
    </div>
  );
};

export default UserProfileCard;

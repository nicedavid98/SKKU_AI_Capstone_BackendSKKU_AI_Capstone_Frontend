import React from 'react';
import ProfileEditor from './ProfileEditor';
import { useProfile } from '../../context/ProfileContext'; // 전역 프로필 상태 사용
import '../../styles/MyPage.css';

const MyPage = () => {
  const { profile, updateProfile } = useProfile(); // 전역 상태와 업데이트 함수 가져오기

  return (
    <div className="my-page">
      <div className="profile-info">
        <img src={profile.profilePicture} alt={`${profile.realname}'s profile`} className="profile-picture" />
        <h3>{profile.realname}</h3>
        <p>{profile.bio}</p>
      </div>

      {/* 프로필 수정 기능 */}
      <ProfileEditor profile={profile} onSave={updateProfile} />
    </div>
  );
};

export default MyPage;



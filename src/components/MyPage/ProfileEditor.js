import React, { useState } from 'react';
import '../../styles/MyPage.css';

const ProfileEditor = ({ profile, onSave }) => {
  const [newProfile, setNewProfile] = useState(profile);
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/user/${profile.userId}/update-profile`, { // 절대 경로 사용
        method: 'PUT',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          realname: newProfile.realname,
          profileImageUrl: newProfile.profileImageUrl,
          bio: newProfile.bio,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onSave(updatedUser); // 상위 컴포넌트에 업데이트된 프로필 전달
      } else {
        setError('Failed to update profile.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <form className="profile-editor" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="profileImageUrl">Profile Picture URL:</label>
        <input
          type="text"
          id="profileImageUrl"
          name="profileImageUrl"
          value={newProfile.profileImageUrl}
          onChange={handleChange}
          placeholder="Enter profile picture URL"
        />
      </div>

      <div className="form-group">
        <label htmlFor="realname">Real Name:</label>
        <input
          type="text"
          id="realname"
          name="realname" 
          value={newProfile.realname}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          name="bio"
          value={newProfile.bio}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="save-button">Save Changes</button>
    </form>
  );
};

export default ProfileEditor;

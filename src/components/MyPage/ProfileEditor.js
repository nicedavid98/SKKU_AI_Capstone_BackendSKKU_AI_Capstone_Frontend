import React, { useState } from 'react';
import '../../styles/MyPage.css';

const ProfileEditor = ({ profile, onSave }) => {
  const [newProfile, setNewProfile] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newProfile); // 상위 컴포넌트로 수정된 프로필 전달
  };

  return (
    <form className="profile-editor" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture URL:</label>
        <input
          type="text"
          id="profilePicture"
          name="profilePicture"
          value={newProfile.profilePicture}
          onChange={handleChange}
          placeholder="Enter profile picture URL"
        />
      </div>

      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newProfile.name}
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

      <button type="submit" className="save-button">Save Changes</button>
    </form>
  );
};

export default ProfileEditor;

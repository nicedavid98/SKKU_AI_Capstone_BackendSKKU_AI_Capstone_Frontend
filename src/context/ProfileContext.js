import React, { createContext, useState, useContext } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  const updateProfile = (newProfile) => {
    setProfile((prevProfile) => {
      console.log("Previous Profile:", prevProfile); // 이전 프로필 로그 출력
      console.log("New Profile:", newProfile); // 새로운 프로필 로그 출력

      const updatedProfile = {
        ...prevProfile,
        ...newProfile,
      };
      
      console.log("Updated Profile:", updatedProfile); // 상태 변경 직후 로그 출력
      return updatedProfile;
    });
};


  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);

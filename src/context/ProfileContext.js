// import React, { createContext, useState, useContext } from 'react';

// // 프로필 상태를 위한 Context 생성
// const ProfileContext = createContext();

// // 프로필 상태를 관리하는 Provider 컴포넌트
// export const ProfileProvider = ({ children }) => {
//   const [profile, setProfile] = useState({}); // 초기값을 빈 객체로 설정

//   // 프로필 업데이트 함수
//   const updateProfile = (newProfile) => {
//     setProfile((prevProfile) => ({
//       ...prevProfile,
//       ...newProfile, // 새로운 프로필 값을 기존 상태에 병합
//     }));
//   };

//   return (
//     <ProfileContext.Provider value={{ profile, updateProfile }}>
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// // Context를 사용하기 위한 커스텀 훅
// export const useProfile = () => useContext(ProfileContext);


// ProfileContext.js

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

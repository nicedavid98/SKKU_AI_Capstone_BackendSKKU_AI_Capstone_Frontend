// import React, { createContext, useState, useContext } from 'react';

// // 인증 상태를 관리할 컨텍스트 생성
// const AuthContext = createContext();

// // AuthProvider 컴포넌트: 인증 상태를 제공하는 컴포넌트
// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // 로그인 함수
//   const login = () => {
//     setIsAuthenticated(true); // 나중에 실제 로그인 로직과 백엔드 연동 가능
//   };

//   // 로그아웃 함수
//   const logout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // 인증 상태를 사용하기 위한 커스텀 훅
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user); // 로그인 성공 시 사용자 정보를 전달
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login. Please try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="icon-container">
        <img
          src="/images/bluelift_icon.png" // 아이콘 경로
          alt="BlueLift Icon"
          className="login-icon"
        />
      </div>
      <h2>Welcome to BlueLift Chat!</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Login</button>

        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

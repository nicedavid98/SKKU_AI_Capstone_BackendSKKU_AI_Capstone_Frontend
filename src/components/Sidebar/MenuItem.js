import React from 'react';
import '../../styles/Sidebar.css'; // 스타일링 파일

const MenuItem = ({ title }) => {
  return (
    <div className="menu-item">
      <span>{title}</span>
    </div>
  );
};

export default MenuItem;

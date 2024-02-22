import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';

const MapSidebar = () => {
  const navigate = useNavigate();
  navigate('/');

  return (
    <div className="side_menu">
      <div className="sidebar_content">
        <div className="sidebar_header">
          <img
            src="/static/logo_trip_java.svg"
            alt="logo"
            className="logo"
            onClick={() => navigate('/')}
          />
        </div>
        <div className="sidebar_date">mapdate에서 날짜 받기</div>
        <div className="sidebar_tourismApi"></div>
      </div>
    </div>
  );
};

export default MapSidebar;

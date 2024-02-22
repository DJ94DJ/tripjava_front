import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../styles/style.scss';

const MapSidebar = ({ startDate, endDate }) => {
  const navigate = useNavigate();
  navigate('/');
  // 날짜 포멧 변경
  const formattedStartDate = startDate ? startDate.toLocaleDateString() : '';
  const formattedEndDate = endDate ? endDate.toLocaleDateString() : '';

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
        <div className="sidebar_date">
          {formattedStartDate}, {formattedEndDate}
        </div>
        <div className="sidebar_tourismApi"></div>
      </div>
    </div>
  );
};

export default MapSidebar;

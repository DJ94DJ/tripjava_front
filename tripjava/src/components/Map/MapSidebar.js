import React, { useState, useEffect } from 'react';
import '../../styles/style.scss';

const MapSidebar = () => {
  return (
    <div className="side_menu">
      <div className="sidebar_content">
        <div className="sidebar_header">
          <img src="/static/logo_trip_java.svg" alt="logo" className="logo" />
        </div>
        <div className="sidebar_date">세은님이 보낸 날짜 받깅</div>
        <div className="sidebar_tourismApi"></div>
      </div>
    </div>
  );
};

export default MapSidebar;

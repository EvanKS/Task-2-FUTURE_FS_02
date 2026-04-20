import React, { useContext } from 'react';
import { Search, Bell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Topbar.css';

const Topbar = ({ title, searchTerm, setSearchTerm }) => {
  const { admin } = useContext(AuthContext);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">{title}</h1>
      </div>
      
      <div className="topbar-right">
        {setSearchTerm && (
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search leads..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        )}
        
        <button className="icon-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">
            {admin?.name ? admin.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="user-info">
            <span className="user-name">{admin?.name || 'Admin'}</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

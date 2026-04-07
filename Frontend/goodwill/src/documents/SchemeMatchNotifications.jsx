import React, { useState } from 'react';
import './SchemeMatchNotifications.css';

const SchemeMatchNotifications = () => {
  // Simulated data: This acts as the inbox payload from your Express backend
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      type: 'new_scheme',
      title: 'New Scheme Match: PM Vishwakarma Yojana',
      message: 'A new scheme just launched that matches your "Artisan" profile. Estimated benefit: ₹15,000.',
      timestamp: '2 hours ago',
      impactScore: 84,
      isUnread: true,
      icon: '✨'
    },
    {
      id: 'notif-2',
      type: 'deadline',
      title: 'Urgent: Deadline Approaching',
      message: 'You have 20 days left to apply for the Post Matric Scholarship. Don\'t miss out.',
      timestamp: '1 day ago',
      impactScore: 92,
      isUnread: true,
      icon: '⏰'
    },
    {
      id: 'notif-3',
      type: 'score_update',
      title: 'Profile Updated',
      message: 'Your Gemini AI recalculation is complete. 3 new schemes have been added to your dashboard.',
      timestamp: '3 days ago',
      impactScore: null,
      isUnread: false,
      icon: '🤖'
    },
    {
      id: 'notif-4',
      type: 'new_scheme',
      title: 'Low Match Scheme Added',
      message: 'Stand Up India Scheme added to database. Impact score is low based on your current income bracket.',
      timestamp: '1 week ago',
      impactScore: 35,
      isUnread: false,
      icon: '📊'
    }
  ]);

  const [filter, setFilter] = useState('all'); // 'all' or 'unread'

  // Logic: Filter the feed based on the active chip
  const displayedNotifications = filter === 'unread' 
    ? notifications.filter(n => n.isUnread) 
    : notifications;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isUnread: false })));
  };

  return (
    <div className="sm-notify-container">
      {/* Navbar */}
      <nav className="sm-notify-nav">
        <div className="sm-logo-group">
          <div className="sm-logo-icon">S</div>
          <span className="sm-logo-text">SchemeMatch</span>
        </div>
        <div className="sm-nav-user">
          <button className="sm-btn-text" onClick={() => window.history.back()}>← Dashboard</button>
        </div>
      </nav>

      <main className="sm-notify-main">
        <div className="sm-notify-wrapper">
          
          {/* Header & Filters */}
          <div className="sm-notify-header">
            <h1 className="sm-notify-title">Notifications</h1>
            <div className="sm-notify-actions">
              <div className="sm-filter-chips">
                <button 
                  className={`sm-chip ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`sm-chip ${filter === 'unread' ? 'active' : ''}`}
                  onClick={() => setFilter('unread')}
                >
                  Unread
                </button>
              </div>
              <button className="sm-btn-mark-read" onClick={markAllAsRead}>
                Mark all as read
              </button>
            </div>
          </div>

          {/* Notification Feed */}
          <div className="sm-notify-feed">
            {displayedNotifications.length === 0 ? (
              <div className="sm-empty-state">
                <span className="sm-empty-icon">📭</span>
                <p>You're all caught up!</p>
              </div>
            ) : (
              displayedNotifications.map((notif) => (
                <div key={notif.id} className={`sm-notify-item ${notif.isUnread ? 'unread' : ''}`}>
                  
                  {/* Left: Icon Avatar */}
                  <div className="sm-notify-avatar">
                    <span className="sm-avatar-emoji">{notif.icon}</span>
                  </div>

                  {/* Middle: Content */}
                  <div className="sm-notify-content">
                    <h3 className="sm-notify-item-title">{notif.title}</h3>
                    <p className="sm-notify-item-message">
                      {notif.message} 
                      {notif.impactScore && (
                        <span className={`sm-notify-score ${notif.impactScore >= 80 ? 'high' : 'low'}`}>
                          Impact: {notif.impactScore}/100
                        </span>
                      )}
                    </p>
                    <span className="sm-notify-timestamp">{notif.timestamp}</span>
                  </div>

                  {/* Right: Unread Dot & Menu */}
                  <div className="sm-notify-meta">
                    {notif.isUnread && <div className="sm-unread-dot"></div>}
                    <button className="sm-btn-menu">⋮</button>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default SchemeMatchNotifications;
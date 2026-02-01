import React from 'react';
import './StatsCards.css';

const getRatingColor = (rating) => {
  if (!rating) return '#808080';
  if (rating < 1200) return '#808080';
  if (rating < 1400) return '#008000';
  if (rating < 1600) return '#03A89E';
  if (rating < 1900) return '#0000FF';
  if (rating < 2100) return '#AA00AA';
  if (rating < 2400) return '#FF8C00';
  return '#FF0000';
};

const getRankName = (rank) => {
  if (!rank) return 'Unrated';
  return rank.charAt(0).toUpperCase() + rank.slice(1);
};

const StatsCards = ({ userInfo, totalSolved, contestCount }) => {
  return (
    <div className="stats-cards">
      <div className="stat-card">
        <div className="stat-icon">👤</div>
        <div className="stat-content">
          <h3>{userInfo.handle}</h3>
          <p className="stat-label">Handle</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⭐</div>
        <div className="stat-content">
          <h3 style={{ color: getRatingColor(userInfo.rating) }}>
            {userInfo.rating || 'Unrated'}
          </h3>
          <p className="stat-label">Current Rating</p>
          <p className="stat-sublabel">{getRankName(userInfo.rank)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🏆</div>
        <div className="stat-content">
          <h3 style={{ color: getRatingColor(userInfo.maxRating) }}>
            {userInfo.maxRating || 'N/A'}
          </h3>
          <p className="stat-label">Max Rating</p>
          <p className="stat-sublabel">{getRankName(userInfo.maxRank)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <h3>{totalSolved}</h3>
          <p className="stat-label">Problems Solved</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <h3>{contestCount}</h3>
          <p className="stat-label">Contests Participated</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;


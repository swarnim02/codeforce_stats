import React, { useState } from 'react';
import './UserInput.css';

const UserInput = ({ onSubmit, loading }) => {
  const [handle, setHandle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = handle.trim();
    if (trimmed) {
      onSubmit(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-input-form">
      <input
        type="text"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
        placeholder="Enter Codeforces handle"
        className="user-input"
        disabled={loading}
      />
      <button type="submit" className="submit-button" disabled={loading || !handle.trim()}>
        {loading ? 'Loading...' : 'Get Stats'}
      </button>
    </form>
  );
};

export default UserInput;


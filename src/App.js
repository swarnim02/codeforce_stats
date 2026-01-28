import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import UserInput from './components/UserInput';

function App() {
  const [handle, setHandle] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (userHandle) => {
    setHandle(userHandle);
    setLoading(true);
    setError(null);
    
    try {
      const apiUrl = 'https://codeforces.com/api';
      
      const infoRes = await fetch(`${apiUrl}/user.info?handles=${userHandle}`);
      const infoData = await infoRes.json();
      
      const statusRes = await fetch(`${apiUrl}/user.status?handle=${userHandle}`);
      const statusData = await statusRes.json();
      
      const ratingRes = await fetch(`${apiUrl}/user.rating?handle=${userHandle}`);
      const ratingData = await ratingRes.json();

      if (infoData.status !== 'OK') {
        throw new Error(infoData.comment || 'User not found');
      }
      if (statusData.status !== 'OK') {
        throw new Error(statusData.comment || 'Failed to get submissions');
      }
      if (ratingData.status !== 'OK') {
        throw new Error(ratingData.comment || 'Failed to get rating');
      }

      setData({
        userInfo: infoData.result[0],
        submissions: statusData.result,
        ratingHistory: ratingData.result
      });
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Codeforces Statistics</h1>
        <UserInput onSubmit={handleSubmit} loading={loading} />
        {error && <div className="error-message">{error}</div>}
      </header>
      {data && <Dashboard data={data} />}
    </div>
  );
}

export default App;

import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subMonths, subYears } from 'date-fns';
import './RatingGraph.css';

const RatingGraph = ({ ratingHistory }) => {
  const [timeFilter, setTimeFilter] = useState('all');

  const filteredData = useMemo(() => {
    if (timeFilter === 'all') {
      return ratingHistory;
    }
    
    const now = new Date();
    let cutoff;
    
    if (timeFilter === 'year') {
      cutoff = subYears(now, 1);
    } else if (timeFilter === '6months') {
      cutoff = subMonths(now, 6);
    }
    
    return ratingHistory.filter(e => e.date >= cutoff);
  }, [ratingHistory, timeFilter]);

  const data = filteredData.map((entry, index) => ({
    name: format(entry.date, 'MMM yyyy'),
    rating: entry.rating,
    contest: entry.contestName.substring(0, 20) + (entry.contestName.length > 20 ? '...' : ''),
    fullDate: format(entry.date, 'MMM dd, yyyy')
  }));

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

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{data.contest}</p>
          <p className="tooltip-value" style={{ color: getRatingColor(data.rating) }}>
            Rating: {data.rating}
          </p>
          <p className="tooltip-date">{data.fullDate}</p>
        </div>
      );
    }
    return null;
  };

  if (ratingHistory.length === 0) {
    return <div className="no-data">No contest history available</div>;
  }

  return (
    <div className="rating-graph">
      <div className="rating-graph-controls">
        <label>Time Period: </label>
        <select 
          value={timeFilter} 
          onChange={(e) => setTimeFilter(e.target.value)}
          className="time-filter-select"
        >
          <option value="all">All Time</option>
          <option value="year">Last Year</option>
          <option value="6months">Last 6 Months</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={450}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 50, bottom: 80 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval="preserveStartEnd"
            tick={{ fontSize: 12, fill: '#666' }}
            stroke="#666"
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#666' }}
            stroke="#666"
            width={50}
            label={{ value: 'Rating', angle: -90, position: 'insideLeft', offset: -5, style: { textAnchor: 'middle', fill: '#666', fontSize: '13px', fontWeight: '600' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="rating" 
            name="Rating"
            stroke="#2a5298" 
            strokeWidth={3}
            dot={{ r: 5, fill: '#7e22ce', strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 8, fill: '#7e22ce', strokeWidth: 2, stroke: '#fff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingGraph;

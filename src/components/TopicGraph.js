import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import './TopicGraph.css';

const COLORS = ['#2a5298', '#7e22ce', '#3b82f6', '#8b5cf6', '#a855f7', '#6366f1', '#4f46e5', '#5b21b6', '#6d28d9', '#1e3c72', '#9333ea', '#c026d3', '#db2777', '#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#ffe4e6', '#fff1f2'];

const TopicGraph = ({ byTag }) => {
  const { graphData, allTopics } = useMemo(() => {
    const allData = Object.entries(byTag)
      .map(([tag, count]) => ({ name: tag, value: count }))
      .sort((a, b) => b.value - a.value);
    
    return {
      graphData: allData,
      allTopics: allData
    };
  }, [byTag]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{payload[0].name}</p>
          <p className="tooltip-value">Problems: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  if (graphData.length === 0) {
    return <div className="no-data">No topic data available</div>;
  }

  return (
    <div className="topic-graph-container">
      <div className="topic-graph-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={graphData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => percent > 0.03 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
              outerRadius={140}
              fill="#8884d8"
              dataKey="value"
            >
              {graphData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="topic-list">
        <h3>All Topics ({allTopics.length})</h3>
        <div className="topic-list-content">
          {allTopics.map((topic, index) => (
            <div key={topic.name} className="topic-list-item">
              <div 
                className="topic-color-indicator" 
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="topic-name">{topic.name}</span>
              <span className="topic-count">{topic.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicGraph;


import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getRatingDistribution } from '../utils/dataProcessing';
import './RatingDistribution.css';

const RatingDistribution = ({ byRating }) => {
  const data = getRatingDistribution(byRating);

  if (data.length === 0 || data.every(item => item.count === 0)) {
    return <div className="no-data">No rating data available</div>;
  }

  const CustomBarLabel = ({ x, y, width, value }) => {
    if (value === 0) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#666"
        fontSize={11}
        textAnchor="middle"
        fontWeight="600"
      >
        {value}
      </text>
    );
  };

  return (
    <div className="rating-distribution">
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} margin={{ top: 20, right: 40, left: 80, bottom: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="rating" 
            type="number"
            scale="linear"
            domain={[750, 3550]}
            tick={{ fontSize: 10, fill: '#666' }}
            angle={-45}
            textAnchor="end"
            height={140}
            interval={0}
            allowDuplicatedCategory={false}
            stroke="#666"
            tickFormatter={(value) => value}
            label={{ value: 'Problem Rating', position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#666', fontSize: '13px', fontWeight: '600' } }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#666' }}
            stroke="#666"
            width={60}
            label={{ value: 'Problems Solved', angle: -90, position: 'insideLeft', offset: -5, style: { textAnchor: 'middle', fill: '#666', fontSize: '13px', fontWeight: '600' } }}
            domain={[0, 'dataMax + 1']}
          />
          <Tooltip 
            formatter={(value) => [value === 0 ? 'No problems' : `${value} problem${value !== 1 ? 's' : ''}`, 'Solved']}
            labelFormatter={(label) => `Rating: ${label}`}
            contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.98)', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Bar 
            dataKey="count" 
            name="Problems Solved"
            fill="#2a5298"
            radius={[6, 6, 0, 0]}
            stroke="#1e3c72"
            strokeWidth={1}
            label={<CustomBarLabel />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingDistribution;


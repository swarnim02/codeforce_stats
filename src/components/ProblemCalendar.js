import React from 'react';
import Calendar from 'react-calendar';
import { format, parseISO } from 'date-fns';
import 'react-calendar/dist/Calendar.css';
import './ProblemCalendar.css';

const ProblemCalendar = ({ problemsByDate, view }) => {
  const getTileContent = ({ date, view: tileView }) => {
    if (tileView !== 'month') return null;

    let key;
    if (view === 'yearly') {
      key = format(date, 'yyyy-MM');
    } else {
      key = format(date, 'yyyy-MM-dd');
    }

    const count = problemsByDate[key] || 0;
    
    if (count > 0) {
      // For yearly view, normalize by 50; for monthly, normalize by 10
      const maxCount = view === 'yearly' ? 50 : 10;
      const intensity = Math.min(count / maxCount, 1); // Normalize to 0-1
      const opacity = 0.4 + (intensity * 0.6);
      const size = Math.min(20 + (intensity * 12), 32);
      
      return (
        <div 
          className="problem-marker" 
          style={{ 
            backgroundColor: `rgba(42, 82, 152, ${opacity})`,
            borderRadius: '50%',
            width: `${size}px`,
            height: `${size}px`,
            margin: '2px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: count > 9 ? '0.65rem' : '0.75rem',
            color: count > 5 ? 'white' : '#333',
            fontWeight: 'bold',
            boxShadow: `0 2px 4px rgba(42, 82, 152, ${opacity * 0.5})`,
            transition: 'transform 0.2s'
          }}
          title={`${count} problem${count !== 1 ? 's' : ''} solved on ${format(date, 'MMM dd, yyyy')}`}
        >
          {count > 0 && count}
        </div>
      );
    }
    return null;
  };

  const getTileClassName = ({ date, view: tileView }) => {
    if (tileView !== 'month') return null;

    let key;
    if (view === 'yearly') {
      key = format(date, 'yyyy-MM');
    } else {
      key = format(date, 'yyyy-MM-dd');
    }

    const count = problemsByDate[key] || 0;
    if (count > 0) {
      return 'has-problems';
    }
    return null;
  };

  // Get date range for calendar
  const dateKeys = Object.keys(problemsByDate);
  if (dateKeys.length === 0) {
    return <div className="no-data">No problem solving data available</div>;
  }

  const dates = dateKeys.map(key => {
    try {
      return parseISO(key);
    } catch {
      return null;
    }
  }).filter(Boolean).sort((a, b) => a - b);

  const minDate = dates[0];
  const maxDate = dates[dates.length - 1];

  return (
    <div className="problem-calendar">
      <Calendar
        tileContent={getTileContent}
        tileClassName={getTileClassName}
        minDate={minDate}
        maxDate={maxDate}
        className="custom-calendar"
      />
      <div className="calendar-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'rgba(42, 82, 152, 0.3)' }}></div>
          <span>Few problems</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: 'rgba(42, 82, 152, 1)' }}></div>
          <span>Many problems</span>
        </div>
      </div>
    </div>
  );
};

export default ProblemCalendar;


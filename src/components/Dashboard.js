import React, { useMemo } from 'react';
import './Dashboard.css';
import StatsCards from './StatsCards';
import RatingGraph from './RatingGraph';
import ProblemCalendar from './ProblemCalendar';
import TopicGraph from './TopicGraph';
import RatingDistribution from './RatingDistribution';
import { processSolvedProblems, processRatingHistory, getCalendarData } from '../utils/dataProcessing';

const Dashboard = ({ data }) => {
  const stats = useMemo(() => {
    const solved = processSolvedProblems(data.submissions);
    const ratingHistory = processRatingHistory(data.ratingHistory);
    const monthlyData = getCalendarData(solved.byDate, 'monthly');
    const yearlyData = getCalendarData(solved.byDate, 'yearly');

    return {
      userInfo: data.userInfo,
      totalSolved: solved.totalSolved,
      byRating: solved.byRating,
      byTag: solved.byTag,
      byDate: solved.byDate,
      ratingHistory,
      contestCount: data.ratingHistory.length,
      monthlyData,
      yearlyData
    };
  }, [data]);

  return (
    <div className="dashboard">
      <StatsCards 
        userInfo={stats.userInfo}
        totalSolved={stats.totalSolved}
        contestCount={stats.contestCount}
      />
      
      <div className="dashboard-grid">
        <div className="dashboard-card rating-section">
          <h2>Rating History</h2>
          <RatingGraph ratingHistory={stats.ratingHistory} />
        </div>

        <div className="dashboard-card rating-section">
          <h2>Problems Solved by Rating</h2>
          <RatingDistribution byRating={stats.byRating} />
        </div>

        <div className="dashboard-card topic-card">
          <h2>Topic-wise Problems</h2>
          <TopicGraph byTag={stats.byTag} />
        </div>

        <div className="dashboard-card calendar-card">
          <h2>Problem Solving Calendar</h2>
          <ProblemCalendar problemsByDate={stats.byDate} view="monthly" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


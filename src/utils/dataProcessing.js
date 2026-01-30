import { format, parseISO } from 'date-fns';

export const processSolvedProblems = (submissions) => {
  const solved = new Set();
  const byRating = {};
  const byTag = {};
  const byDate = {};

  for (const sub of submissions) {
    if (sub.verdict === 'OK') {
      const problemId = `${sub.problem.contestId}-${sub.problem.index}`;
      
      if (!solved.has(problemId)) {
        solved.add(problemId);
        
        if (sub.problem.rating) {
          byRating[sub.problem.rating] = (byRating[sub.problem.rating] || 0) + 1;
        }

        if (sub.problem.tags) {
          sub.problem.tags.forEach(tag => {
            byTag[tag] = (byTag[tag] || 0) + 1;
          });
        }

        const date = new Date(sub.creationTimeSeconds * 1000);
        const dateKey = format(date, 'yyyy-MM-dd');
        byDate[dateKey] = (byDate[dateKey] || 0) + 1;
      }
    }
  }

  return {
    totalSolved: solved.size,
    byRating,
    byTag,
    byDate
  };
};

export const processRatingHistory = (ratingData) => {
  const history = ratingData.map(c => ({
    contestId: c.contestId,
    contestName: c.contestName,
    rating: c.newRating,
    date: new Date(c.ratingUpdateTimeSeconds * 1000),
    oldRating: c.oldRating,
    rank: c.rank
  }));
  
  history.sort((a, b) => a.date - b.date);
  return history;
};

export const getCalendarData = (problemsByDate, view = 'monthly') => {
  const result = {};
  
  for (const dateStr in problemsByDate) {
    const date = parseISO(dateStr);
    const count = problemsByDate[dateStr];
    const key = view === 'yearly' ? format(date, 'yyyy-MM') : format(date, 'yyyy-MM-dd');
    result[key] = (result[key] || 0) + count;
  }
  
  return result;
};

export const getRatingDistribution = (byRating) => {
  const result = [];
  for (let r = 800; r <= 3500; r += 100) {
    result.push({
      rating: r,
      count: byRating[r] || 0
    });
  }
  return result;
};


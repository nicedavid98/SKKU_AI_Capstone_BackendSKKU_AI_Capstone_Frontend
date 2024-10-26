import React from 'react';
import '../../styles/Calendar.css'; // 달력 스타일


const MoodSummary = ({ date, summary, mood }) => {
  if (!date) {
    return <p>Please select a date to see the summary.</p>;
  }

  return (
    <div className="mood-summary">
      <h3>Summary for {date}</h3>
      <p>{summary}</p>
      <p>Mood: <strong>{mood}</strong></p>
    </div>
  );
};

export default MoodSummary;

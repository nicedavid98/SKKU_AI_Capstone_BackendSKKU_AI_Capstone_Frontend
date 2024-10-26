import React, { useState } from 'react';
import '../../styles/Calendar.css'; // 달력 스타일


const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const moodData = {
    '2023-10-20': { summary: 'Had a calm conversation with the chatbot.', mood: 'Neutral' },
    '2023-10-21': { summary: 'Discussed some challenges at work.', mood: 'Stressed' },
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const renderMoodSummary = () => {
    if (selectedDate && moodData[selectedDate]) {
      const { summary, mood } = moodData[selectedDate];
      return (
        <div className="mood-summary">
          <h3>Summary for {selectedDate}</h3>
          <p>{summary}</p>
          <p>Mood: {mood}</p>
        </div>
      );
    } else {
      return <p>Please select a date to see the summary.</p>;
    }
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <div className="calendar-grid">
        {[...Array(30)].map((_, i) => {
          const date = `2023-10-${(i + 1).toString().padStart(2, '0')}`;
          return (
            <div
              key={date}
              className={`calendar-date ${selectedDate === date ? 'selected' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      <div className="summary-container">
        {renderMoodSummary()}
      </div>
    </div>
  );
};

export default Calendar;

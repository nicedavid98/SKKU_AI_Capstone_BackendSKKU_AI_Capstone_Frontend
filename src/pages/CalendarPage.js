import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

const CalendarPage = ({ userId }) => {
  const [date, setDate] = useState(new Date());
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 날짜 선택 핸들러
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    fetchSummary(selectedDate);
  };

  // 요약 데이터를 백엔드에서 가져오는 함수
  const fetchSummary = async (selectedDate) => {
    if (!userId) {
      setError("User ID is undefined.");
      setSummary(null);
      return;
    }

    setLoading(true);
    setError(null);

    // 선택한 날짜를 'YYYY-MM-DD' 형식으로 변환
    const formattedDate = selectedDate.toLocaleDateString('en-CA');

    try {
      const response = await fetch(`http://localhost:8080/api/summaries/${userId}/${formattedDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch summary');
      }
      const data = await response.json();
      console.log(data);
      setSummary({
        chatSummary: data.summary,
        depressionLevel: mapDepressionLevel(data.depressionLevel),
      });
    } catch (err) {
      setError(err.message);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

// 우울증 레벨을 텍스트로 변환하는 함수
const mapDepressionLevel = (level) => {
  if (level === -1) return 'Cannot determine'; // No Chats
  if (level > 0.995) return 'Good'; // 0.995 < Good <= 1
  if (level > 0.002) return 'Needs Attention'; // 0.002 < Needs Attention <= 0.995
  if (level >= 0) return 'Depression Detected'; // 0 <= Depression Detected <= 0.002
  return 'Cannot determine'; // Fallback for invalid cases
};

// 우울증 레벨에 따른 이모티콘 표시
const getDepressionLevelEmoji = (levelText) => {
  switch (levelText) {
    case 'Good':
      return '😊';
    case 'Depression Detected':
      return '😰';
    case 'Needs Attention':
      return '😐';
    case 'Cannot determine':
      return '🤔';
    default:
      return '🤔'; // Invalid levelText fallback
  }
};

  return (
    <div className="calendar-page">
      <Calendar
        onChange={handleDateChange}
        value={date}
        locale="en-US"
      />
      <div className="summary-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : summary ? (
          <div className="mood-summary">
            <div className="chat-summary-block">
              <h3>Chat Summary</h3>
              <p>{summary.chatSummary}</p>
            </div>
            <div className="depression-level-block">
              <h3>Depression Level</h3>
              <div className="depression-level-row">
                <p className="depression-emoji">{getDepressionLevelEmoji(summary.depressionLevel)}</p>
                <p className="depression-text">{summary.depressionLevel}</p>
              </div>
            </div>
          </div>
        ) : (
          // <p>No data available for {date.toDateString()}.</p>
          <p>Click on the calendar to check today’s mood 😀</p>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;

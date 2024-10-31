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
    if (level == 10) return 'Cannot determine';
    if (level < -0.9) return 'Good';
    if (level < 0) return 'Moderate';
    if (level < 0.9) return 'Needs Attention';
    return 'Severe';
  };

  // 우울증 레벨에 따른 이모티콘 표시
  const getDepressionLevelEmoji = (level) => {
    switch (level) {
      case 'Good':
        return '😊';
      case 'Moderate':
        return '😐';
      case 'Needs Attention':
        return '😰';
      case 'Severe':
        return '😱';
      case 'Cannot determine':
        return '🤔';
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
          <p>No data available for {date.toDateString()}.</p>
        )}
      </div>
    </div>
  );
};

export default CalendarPage;

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [summary, setSummary] = useState(null);

  // 하드코딩된 날짜별 대화 요약 및 우울증 정보 데이터
  const moodData = {
    '2024-10-20': { chatSummary: 'Had a calm conversation with the chatbot.', depressionLevel: 'Neutral' },
    '2024-10-21': { chatSummary: 'Discussed some challenges at work.', depressionLevel: 'Stressed' },
    '2024-10-22': { chatSummary: 'Shared positive experiences.', depressionLevel: 'Positive' },
  };

  // 날짜 선택 핸들러
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);

    // 선택한 날짜를 로컬 시간대에 맞춰 'YYYY-MM-DD' 형식으로 변환
    const formattedDate = selectedDate.toLocaleDateString('en-CA');
    const selectedSummary = moodData[formattedDate] || null;

    // 선택된 요약 정보 업데이트
    setSummary(selectedSummary);
  };

  // 우울증 레벨에 따른 이모티콘 표시
  const getDepressionLevelEmoji = (level) => {
    switch (level) {
      case 'Neutral':
        return '😐'; // 중립적인 얼굴 이모티콘
      case 'Stressed':
        return '😰'; // 스트레스 받는 얼굴 이모티콘
      case 'Positive':
        return '😊'; // 긍정적인 얼굴 이모티콘
      default:
        return '😶'; // 상태가 정의되지 않은 경우
    }
  };

  return (
    <div className="calendar-page">
      {/* <h2>Calendar</h2> */}
      <Calendar
        onChange={handleDateChange} // 날짜 변경 시 호출되는 함수
        value={date} // 선택된 날짜
        locale="en-US" // 달력 언어를 영어로 설정
      />
      <div className="summary-container">
        {summary ? (
          <div className="mood-summary">
            {/* Chat Summary */}
            <div className="chat-summary-block">
              <h3>Chat Summary</h3>
              <p>{summary.chatSummary}</p>
            </div>

            {/* Depression Level */}
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


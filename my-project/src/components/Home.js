import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuestionPreview from './QuestionPreview';

const Home = () => {
  const [showAnswered, setShowAnswered] = useState(false);
  const authedUser = useSelector(state => state.authedUser);
  const questions = useSelector(state => state.questions);
  const users = useSelector(state => state.users);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authedUser) {
      navigate('/login', { state: { from: '/home' } });
    }
  }, [authedUser, navigate]);

  const answeredQuestions = Object.keys(users[authedUser].answers);

  const answeredQuestionsList = Object.keys(questions)
    .filter(q => answeredQuestions.includes(q))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const unansweredQuestions = Object.keys(questions)
    .filter(q => !answeredQuestions.includes(q))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  const handleTabChange = e => {
    setShowAnswered(e.target.name === 'answered');
  };

  return (
    <div>
      <div className="nav-tabs">
        <button
          className={`tab ${!showAnswered && 'active'}`}
          onClick={handleTabChange}
          name="unanswered"
        >
          Unanswered Questions
        </button>
        <button
          className={`tab ${showAnswered && 'active'}`}
          onClick={handleTabChange}
          name="answered"
        >
          Answered Questions
        </button>
      </div>
      <ul className="question-list">
        {showAnswered
          ? answeredQuestionsList.map(qid => (
              <li key={qid}>
                <QuestionPreview question = {questions[qid]} />
              </li>
            ))
          : unansweredQuestions.map(qid => (
              <li key={qid}>
                <QuestionPreview question = {questions[qid]} />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default Home;

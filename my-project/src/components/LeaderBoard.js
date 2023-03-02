import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LeaderBoard = () => {
  const users = useSelector(state => state.users);
  const authedUser = useSelector(state => state.authedUser);
  const navigate = useNavigate();
  
  useEffect(() => {
      if (!authedUser) {
          navigate('/login', { replace: true });
      }
  }, [authedUser, navigate]);

  const getUserScore = user => {
    const asked = user.questions.length;
    const answered = Object.values(user.answers).length;
    return asked + answered;
  };

  return (
    <ul className="leaderboard-list">
      {Object.values(users)
        .sort((a, b) => getUserScore(b) - getUserScore(a))
        .map(user => (
          <li key={user.id}>
            <div className="user-card">
              <div className="user-avatar">
                <img src={user.avatarURL} alt={user.name} />
              </div>
              <div className="user-details">
                <h2>{user.name}</h2>
                <p>
                  Answered Questions: <span>{Object.values(user.answers).length}</span>
                </p>
                <p>
                  Created Questions: <span>{user.questions.length}</span>
                </p>
              </div>
              <div className="user-score">
                <h3>Score</h3>
                <p>{getUserScore(user)}</p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default LeaderBoard;

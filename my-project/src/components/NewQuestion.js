import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddQuestion } from '../actions/questions';

const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState('');
  const [optionTwoText, setOptionTwoText] = useState('');

  const authedUser = useSelector(state => state.authedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      if (!authedUser) {
          navigate('/login', { replace: true });
      }
  }, [authedUser, navigate]);

  const handleOptionOneChange = (event) => {
    setOptionOneText(event.target.value);
  };

  const handleOptionTwoChange = (event) => {
    setOptionTwoText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (optionOneText !== '' && optionTwoText !== '') {
      let formattedQuestion = {
        optionOneText,
        optionTwoText,
        author: authedUser,
      };
      dispatch(handleAddQuestion(formattedQuestion));
      setOptionOneText('');
      setOptionTwoText('');
      navigate('/');
    } else {
      alert('Please enter both options before submitting.');
    }
  };

  return (
    <div>
      <h1>Create New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Would you rather...
          <input type='text' value={optionOneText} onChange={handleOptionOneChange} />
        </label>
        <p>OR</p>
        <label>
          <input type='text' value={optionTwoText} onChange={handleOptionTwoChange} />
        </label>
        <br />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default NewQuestion;

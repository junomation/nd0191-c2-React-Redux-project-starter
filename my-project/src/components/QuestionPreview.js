import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { useSelector } from 'react-redux';

const QuestionPreview = (props) => {
  const { question } = props;
  const createdDate = formatDate(question.timestamp);
  const users = useSelector(state => state.users);
  const author = users[question.author];

  return (
    <div>
      <Link to={`/questions/${question.id}`}>
        <p>Created by {author.name} on {createdDate}</p>
      </Link>
    </div>
  );
}

export default QuestionPreview;
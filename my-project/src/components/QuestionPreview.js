import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const QuestionPreview = (props) => {
  const { question } = props;
  const createdDate = formatDate(question.timestamp);

  return (
    <div>
      <Link to={`/questions/${question.id}`}>
        <p>Created by {question.author} on {createdDate}</p>
      </Link>
    </div>
  );
}

export default QuestionPreview;
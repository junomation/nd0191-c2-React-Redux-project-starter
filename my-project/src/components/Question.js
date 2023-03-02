import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // Import Link
import { handleSaveQuestionAnswer } from '../actions/shared';
import { withRouter } from '../utils/helpers';

function Question(props) {
  const { question, author, authedUser, dispatch } = props;
  const handleSubmit = (e) => {
    e.preventDefault();
    const answer = e.target.elements.answer.value;
    if (answer) {
      dispatch(handleSaveQuestionAnswer(authedUser, question.id, answer));
    }
  };

  const optionOne = question.optionOne.text;
  const optionTwo = question.optionTwo.text;
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;
  const optionOnePercentage = ((optionOneVotes / totalVotes) * 100).toFixed(2);
  const optionTwoPercentage = ((optionTwoVotes / totalVotes) * 100).toFixed(2);

  return (
      <div>
        <Link to={`/questions/${question.id}`}> {/* Wrap the content inside Link */}
        <h2>{author.name} asks:</h2>
        <h3>Would you rather...</h3>
        </Link>
        {question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
          ? (
            <div>
              <p style={{fontWeight: question.optionOne.votes.includes(authedUser) ? 'bold' : 'normal'}}>
                {optionOne} ({optionOneVotes} votes) - {optionOnePercentage}%
              </p>
              <p style={{fontWeight: question.optionTwo.votes.includes(authedUser) ? 'bold' : 'normal'}}>
                {optionTwo} ({optionTwoVotes} votes) - {optionTwoPercentage}%
              </p>
            </div>
          )
          : (
            <form onSubmit={handleSubmit}>
              <div>
                <input type="radio" id="optionOne" name="answer" value="optionOne" />
                <label htmlFor="optionOne">{optionOne}</label>
              </div>
              <div>
                <input type="radio" id="optionTwo" name="answer" value="optionTwo" />
                <label htmlFor="optionTwo">{optionTwo}</label>
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
      </div>
  );
}

function mapStateToProps({ authedUser, users, questions }, props) {
  let question_id = null;
  if(props.router.params)
  {
    question_id = props.router.params.id;
  }

  if(props.id)
  {
    ({question_id} = props.id);
  }
  
  const question = questions[question_id];
  const author = question ? users[question.author] : null;
  return {
    authedUser,
    question,
    author,
  };
}

export default withRouter(connect(mapStateToProps)(Question));

import React from 'react';
import { connect, useSelector } from 'react-redux';
import { handleSaveQuestionAnswer } from '../actions/shared';
import { withRouter } from '../utils/helpers';
import { AiFillCheckCircle } from 'react-icons/ai';
import styles from './Question.module.css';


function Question(props) {
  const { question, author, authedUser, dispatch } = props;
  const users = useSelector((state) => state.users);
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

  console.log(users);
  console.log(author.id);
  console.log(users[author.id]);

  const createdByUserAvatar = users[author.id].avatarURL;
  return (
      <div>

        {question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
          ? (
            <div>
              <p>
                {question.optionOne.votes.includes(authedUser) ? <AiFillCheckCircle className={styles["icon-checked"]}/> : null}
                {optionOne} ({optionOneVotes} votes) - {optionOnePercentage}%
              </p>
              <p>
                {question.optionTwo.votes.includes(authedUser) ? <AiFillCheckCircle className={styles["icon-checked"]}/> : null}
                {optionTwo} ({optionTwoVotes} votes) - {optionTwoPercentage}%
              </p>
            </div>
          )
          : (
            <div>
              <h3>Would You Rather</h3>
              <img src={createdByUserAvatar} alt={author.name}/>
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
            </div>
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

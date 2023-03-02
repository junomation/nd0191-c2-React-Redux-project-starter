import { RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ADD_USER_QUESTION:
      const { question } = action;

      return {
        ...state,
        [question.author]: {
          ...state[question.author],
          questions: state[question.author].questions.concat(question.id)
        }
      };
    case ADD_USER_ANSWER:
      const { authedUser, qid, answer } = action;
      
      console.log('authedUser: ', authedUser);
      console.log('qid: ', qid);
      console.log('answer: ', answer);
      console.log('state: ', state);
      console.log('state[authedUser]: ', state[authedUser]);
      console.log('state[authedUser].answers: ', state[authedUser].answers);
      console.log('state[authedUser].answers[qid]: ', state[authedUser].answers[qid]);
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
          }
        }        
      };
    default:
      return state;
  }
}

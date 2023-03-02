import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch(action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION :
      const { question } = action
      return {
        ...state,
        [question.id]: question,
      }
    case SAVE_QUESTION_ANSWER :
      const { authedUser, qid, answer } = action
      console.log("state in questions reducer: ", state);
      console.log("qid in questions reducer: ", qid);
      console.log("answer in questions reducer: ", answer);
      console.log("authedUser in questions reducer: ", authedUser);
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      }
    default :
      return state
  }
}

import { saveQuestionAnswer as saveQuestionAnswerAPI, saveQuestion as saveQuestionAPI } from '../utils/api'
// import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(question) {
  return (dispatch) => {
    //dispatch(showLoading())
    return saveQuestionAPI(question)
      .then((formattedQuestion) => dispatch(addQuestion(formattedQuestion)))
      //.then(() => dispatch(hideLoading()))
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}
  

import { saveQuestionAnswer as saveQuestionAnswerAPI, saveQuestion as saveQuestionAPI } from '../utils/api'
// import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_ANSWER = 'ADD_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

function addAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    //dispatch(showLoading())
    return saveQuestionAnswerAPI(info)
      .then(() => dispatch(addAnswer(info)))
      //.then(() => dispatch(hideLoading()))
  };
}

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

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return (dispatch) => {
      const info = { authedUser, qid, answer };
  
      dispatch(saveQuestionAnswer(authedUser, qid, answer));
  
      return saveQuestionAnswerAPI(info).catch((error) => {
        console.warn("Error in handleSaveQuestionAnswer:", error);
        dispatch(saveQuestionAnswer(authedUser, qid, null));
        alert("There was an error saving the answer. Please try again.");
      });
    };
  }
  

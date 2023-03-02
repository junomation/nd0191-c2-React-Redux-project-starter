import { saveQuestionAnswer, saveQuestion } from "../utils/api";
// import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addUserQuestion(question) {
  return {
    type: ADD_USER_QUESTION,
    question,
  };
}

export function addUserAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_USER_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleSaveQuestionAnswer(info) {
  return (dispatch) => {
    //dispatch(showLoading());
    //.then(() => dispatch(hideLoading()))
    return saveQuestionAnswer(info)
      .then(() => dispatch(addUserAnswer(info)))
      
      .catch((e) => {
        console.warn("Error in handleSaveQuestionAnswer: ", e);
        alert("There was an error saving the answer. Try again.");
      });
  };
}

export function handleSaveQuestion(question) {
  return (dispatch) => {
    //dispatch(showLoading());
    //.then(() => dispatch(hideLoading()))
    return saveQuestion(question)
      .then((question) => dispatch(addUserQuestion(question)))      
      .catch((e) => {
        console.warn("Error in handleSaveQuestion: ", e);
        alert("There was an error saving the question. Try again.");
      });
  };
}

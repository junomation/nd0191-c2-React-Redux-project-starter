import { _getQuestions, _getUsers } from "../utils/_DATA";
import { saveQuestionAnswer as saveQuestionAnswerAPI, saveQuestion as saveQuestionAPI } from '../utils/api'
import { receiveQuestions, saveQuestionAnswer, addQuestion } from "./questions";
import { receiveUsers, addUserAnswer, addUserQuestion } from "./users";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export const handleInitialData = () => (dispatch, getState) => {
  const { authedUser } = getState();

  if (authedUser === null) {
    return Promise.all([_getUsers(), _getQuestions()])
      .then(([users, questions]) => {
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
        dispatch(setAuthedUser(authedUser));
      })
      .catch((err) => {
        console.log("Error fetching initial data: ", err);
      });
  }

  return Promise.resolve();
};

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
  return (dispatch) => {
    const info = { authedUser, qid, answer };

    dispatch(showLoading());
    dispatch(saveQuestionAnswer(authedUser, qid, answer));
    dispatch(addUserAnswer(info));
    dispatch(hideLoading());

    return saveQuestionAnswerAPI(info).catch((error) => {
      console.warn("Error in handleSaveQuestionAnswer:", error);
      dispatch(saveQuestionAnswer(authedUser, qid, null));
      dispatch(addUserAnswer({authedUser, qid, answer: null}));
      alert("There was an error saving the answer. Please try again.");
    });
  };
}


export function handleAddQuestion(question) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAPI(question)
      .then((formattedQuestion) => {
        dispatch(addQuestion(formattedQuestion))
        dispatch(addUserQuestion(formattedQuestion))
      })
      .then(() => dispatch(hideLoading()))
  };
}

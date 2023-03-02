import { _getQuestions, _getUsers } from "../utils/_DATA";
import { saveQuestionAnswer as saveQuestionAnswerAPI } from '../utils/api'
import { receiveQuestions, saveQuestionAnswer } from "./questions";
import { receiveUsers, addUserAnswer } from "./users";
import { setAuthedUser } from "./authedUser";

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

    dispatch(saveQuestionAnswer(authedUser, qid, answer));
    dispatch(addUserAnswer(info));

    return saveQuestionAnswerAPI(info).catch((error) => {
      console.warn("Error in handleSaveQuestionAnswer:", error);
      dispatch(saveQuestionAnswer(authedUser, qid, null));
      dispatch(addUserAnswer({authedUser, qid, answer: null}));
      alert("There was an error saving the answer. Please try again.");
    });
  };
}

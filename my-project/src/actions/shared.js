import { _getQuestions, _getUsers } from "../utils/_DATA";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
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

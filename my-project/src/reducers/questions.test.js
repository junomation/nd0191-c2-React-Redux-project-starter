import questions from '../reducers/questions';
import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions';

describe('questions reducer', () => {
  it('should handle RECEIVE_QUESTIONS', () => {
    const prevState = {};
    const questionsData = {
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
          votes: ['sarahedo'],
          text: 'Build our new application with Javascript',
        },
        optionTwo: {
          votes: [],
          text: 'Build our new application with Typescript'
        }
      }
    };
    const action = {
      type: RECEIVE_QUESTIONS,
      questions: questionsData
    };
    const newState = questions(prevState, action);
    expect(newState).toEqual(questionsData);
  });

  it('should handle ADD_QUESTION', () => {
    const prevState = {
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
          votes: ['sarahedo'],
          text: 'Build our new application with Javascript',
        },
        optionTwo: {
          votes: [],
          text: 'Build our new application with Typescript'
        }
      }
    };
    const questionData = {
      id: '6ni6ok3ym7mf1p33lnez',
      author: 'mtsamis',
      timestamp: 1468479767190,
      optionOne: {
        votes: [],
        text: 'hire more frontend developers',
      },
      optionTwo: {
        votes: ['mtsamis', 'sarahedo'],
        text: 'hire more backend developers'
      }
    };
    const action = {
      type: ADD_QUESTION,
      question: questionData
    };
    const newState = questions(prevState, action);
    expect(newState).toEqual({
      ...prevState,
      [questionData.id]: questionData
    });
  });

  it('should handle SAVE_QUESTION_ANSWER', () => {
    const prevState = {
      "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
          votes: ['sarahedo'],
          text: 'Build our new application with Javascript',
        },
        optionTwo: {
          votes: [],
          text: 'Build our new application with Typescript'
        }
      }
    };
    const authedUser = 'sarahedo';
    const qid = '8xf0y6ziyjabvozdd253nd';
    const answer = 'optionTwo';
    const action = {
      type: SAVE_QUESTION_ANSWER,
      authedUser,
      qid,
      answer
    };
    const newState = questions(prevState, action);
    expect(newState).toEqual({
      ...prevState,
      [qid]: {
        ...prevState[qid],
        [answer]: {
          ...prevState[qid][answer],
          votes: [...prevState[qid][answer].votes, authedUser]
        }
      }
    });
  });
});

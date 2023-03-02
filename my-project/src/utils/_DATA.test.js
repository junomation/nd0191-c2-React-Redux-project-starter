import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { _getUsers, _saveQuestion, _saveQuestionAnswer } from './_DATA';

describe('_getUsers', () => {
  test('it resolves with an object containing users', async () => {
    const users = await _getUsers();
    expect(users).toEqual(expect.any(Object));
    expect(Object.keys(users)).toHaveLength(4);
    expect(users['sarahedo']).toEqual(expect.any(Object));
    expect(users['sarahedo']['id']).toBe('sarahedo');
    expect(users['sarahedo']['name']).toBe('Sarah Edo');
    expect(users['sarahedo']['avatarURL']).toBe('/images/avatars/1.png');
    expect(users['sarahedo']['answers']).toEqual(expect.any(Object));
    expect(users['sarahedo']['questions']).toEqual(expect.any(Array));
    expect(users['sarahedo']['password']).toBe('password123');
  });

  test('it returns a Promise that resolves after 1 second', async () => {
    const start = Date.now();
    await _getUsers();
    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(1000);
  });
});

describe('_saveQuestion function', () => {
  const question = {
    optionOneText: 'Test Option One',
    optionTwoText: 'Test Option Two',
    author: 'sarahedo',
  };
  
  test('should add new question to questions object', async () => {
    const result = await _saveQuestion(question);
    expect(typeof result.id).toBe('string');
    expect(result.optionOne.text).toBe(question.optionOneText);
    expect(result.optionTwo.text).toBe(question.optionTwoText);
    expect(result.author).toBe(question.author);
    expect(typeof result.timestamp).toBe('number');
  });

  test('should throw an error if question data is not provided', async () => {
    expect.assertions(1);
    try {
      await _saveQuestion({});
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBe('Please provide optionOneText, optionTwoText, and author');
    }
  });
});


describe('_saveQuestionAnswer', () => {
  it('returns true when correctly formatted data is passed to the function', async () => {
    const result = await _saveQuestionAnswer({
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne',
    });

    expect(result).toBe(true);
  });

  it('returns an error when incorrect data is passed to the function', async () => {
    const errorMessage = 'Please provide authedUser, qid, and answer';

    try {
      await _saveQuestionAnswer({
        authedUser: 'sarahedo',
        qid: null,
        answer: '',
      });
    } catch (error) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(error).toBe(errorMessage);
    }
  });
});


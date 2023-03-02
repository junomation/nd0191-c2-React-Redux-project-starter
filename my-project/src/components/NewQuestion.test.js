import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import NewQuestion from './NewQuestion';
import { MemoryRouter as Router } from 'react-router-dom';

export const mockAuthedUser = 'user1';

export const mockDispatch = jest.fn();

export const mockStore = {
  getState: () => ({ authedUser: mockAuthedUser }),
  dispatch: mockDispatch,
  subscribe: () => {},
};

describe('NewQuestion component', () => {
  test('renders correctly with mocked data', () => {
    render(
      <Router>
        <Provider store={mockStore}>
          <NewQuestion />
        </Provider>
      </Router>
    );

    // Verify that the "Create New Question" header is displayed
    const headerText = screen.getByText(/Create New Question/i);
    expect(headerText).toBeInTheDocument();

    // Verify that the form fields are displayed
    const orPara = screen.getByText(/OR/i);
    // eslint-disable-next-line testing-library/no-node-access
    const optionOneInput = orPara.previousElementSibling.children[0];
    expect(optionOneInput).toBeInTheDocument();
    // eslint-disable-next-line testing-library/no-node-access
    const optionTwoInput = orPara.nextElementSibling.children[0];
    expect(optionTwoInput).toBeInTheDocument();
    
    // Verify that the submit button is displayed
    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();

    // Enter valid input and submit the form
    fireEvent.change(optionOneInput, { target: { value: 'Option One' } });
    expect(optionOneInput.value).toBe('Option One');
    fireEvent.change(optionTwoInput, { target: { value: 'Option Two' } });
    fireEvent.click(submitButton);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  test('displays an error message if both options are not entered', () => {
    const spy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(
      <Router>
        <Provider store={mockStore}>
          <NewQuestion />
        </Provider>
      </Router>
    );

    // Verify that the error message is not displayed initially
    expect(screen.queryByText(/Please enter both options before submitting/i)).not.toBeInTheDocument();

    // Verify that the form fields are displayed
    const orPara = screen.getByText(/OR/i);
    // eslint-disable-next-line testing-library/no-node-access
    const optionOneInput = orPara.previousElementSibling.children[0];
    expect(optionOneInput).toBeInTheDocument();


    fireEvent.change(optionOneInput, { target: { value: 'Option One' } });
    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    // Verify that the error message is displayed
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('Please enter both options before submitting.');

    spy.mockRestore();
  });
});

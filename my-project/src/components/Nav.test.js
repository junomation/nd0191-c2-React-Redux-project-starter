import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Nav from './Nav';
import { MemoryRouter as Router } from 'react-router-dom';

const mockAuthedUser = 'user1';
const mockUsers = {
  user1: {
    id: 'user1',
    name: 'John Doe',
    avatarURL: 'https://www.example.com/avatar1.png',
  },
  user2: {
    id: 'user2',
    name: 'Jane Smith',
    avatarURL: 'https://www.example.com/avatar2.png',
  },
};

const mockStore = {
  getState: () => ({ authedUser: mockAuthedUser, users: mockUsers }),
  subscribe: () => {},
  dispatch: () => {},
};

describe('Nav component', () => {
  test('renders correctly with mocked data', () => {
    const { container } = render(
      <Router>
        <Provider store={mockStore}>
          <Nav />
        </Provider>
      </Router>
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(container.firstChild).toMatchSnapshot();
  });
});

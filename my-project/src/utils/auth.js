import { _getUsers } from '../_DATA';

// Authenticate the user by checking if their username and password match an existing user
export function authenticateUser(username, password) {
  return _getUsers().then(users => {
    const user = Object.values(users).find(user => user.id === username && user.password === password);
    return user ? user.id : null;
  });
}

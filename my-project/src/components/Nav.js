import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import styles from './Nav.module.css';

const Nav = () => {
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const location = useLocation();

  const userName = users[authedUser]?.name;

  const handleLogout = () => {
    dispatch(setAuthedUser(null));
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link
            to="/"
            className={
              location.pathname === '/' ? styles.active : styles.inactive
            }
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className={
              location.pathname === '/add' ? styles.active : styles.inactive
            }
          >
            New Question
          </Link>
        </li>
        <li>
          <Link
            to="/leaderboard"
            className={
              location.pathname === '/leaderboard'
                ? styles.active
                : styles.inactive
            }
          >
            Leaderboard
          </Link>
        </li>
        {authedUser && (
          <li className={styles['authed-user']}>
            <span className={styles['nav-welcome']}>Hello, {userName}</span>
            <button
              className={styles['nav-logout']}
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

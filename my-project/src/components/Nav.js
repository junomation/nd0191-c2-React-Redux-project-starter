import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate();

  const handleNavigate = (e, path) => {
    e.preventDefault();
    navigate(path);
  }

  return (
    <nav className='nav'>
      <ul>
        <li>
          <a href='/' className='active' onClick={(e) => handleNavigate(e, '/')}>
            Home
          </a>
        </li>
        <li>
          <a href='/add' onClick={(e) => handleNavigate(e, '/add')}>
            New Question
          </a>
        </li>
        <li>
          <a href='/leaderboard' onClick={(e) => handleNavigate(e, '/leaderboard')}>
            Leaderboard
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
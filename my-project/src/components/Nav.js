import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <Link to='/' className='active'>
            Home
          </Link>
        </li>
        <li>
          <Link to='/add'>
            New Question
          </Link>
        </li>
        <li>
          <Link to='/leaderboard'>
            Leaderboard
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav

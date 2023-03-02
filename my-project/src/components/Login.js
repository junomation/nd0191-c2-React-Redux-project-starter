import React, { useState } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/authedUser'
import { useNavigate, useLocation } from 'react-router-dom'
import ProtTypes from 'prop-types';

const Login = ({ dispatch }) => {
  const [userId, setUserId] = useState('')
  const location = useLocation();
  const navigate = useNavigate()

  const handleUserIdChange = (e) => {
    const value = e.target.value
    setUserId(value)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    dispatch(handleLogin(userId))
    setUserId('')
    navigate(location?.state?.from || '/');
  }

  return (
    <div className='login'>
      <h1>Would You Rather App</h1>
      <form onSubmit={handleLoginSubmit}>
        <select value={userId} onChange={handleUserIdChange}>
          <option value=''>Select User</option>
          <option value='sarahedo'>Sarah Edo</option>
          <option value='tylermcginnis'>Tyler McGinnis</option>
          <option value='mtsamis'>Mike Tsamis</option>
          <option value='zoshikanlu'>Zenobia Oshikanlu</option>
        </select>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  dispatch: ProtTypes.func.isRequired
}

export default connect()(Login)
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/authedUser'
import { useNavigate, useLocation } from 'react-router-dom'
import ProtTypes from 'prop-types';

const Login = ({ dispatch }) => {
  const [userInfo, setUserInfo] = useState('')
  const location = useLocation();
  const navigate = useNavigate()

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserInfo(JSON.parse(value));
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(userInfo));
    setUserInfo(JSON.stringify({id:'', password: ''}));
    navigate(location?.state?.from || '/');
  }

  return (
    <div className='login'>
      <h1>Would You Rather App</h1>
      <form onSubmit={handleLoginSubmit}>
        <select value={userInfo} onChange={handleUserIdChange}>
          <option value={JSON.stringify({id:'', password: ''})}>Select User</option>
          <option value={JSON.stringify({id:'sarahedo', password: 'password123'})}>Sarah Edo</option>
          <option value={JSON.stringify({id:'tylermcginnis', password: 'abc321'})}>Tyler McGinnis</option>
          <option value={JSON.stringify({id:'mtsamis', password: 'xyz123'})}>Mike Tsamis</option>
          <option value={JSON.stringify({id:'zoshikanlu', password: 'pass246'})}>Zenobia Oshikanlu</option>
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
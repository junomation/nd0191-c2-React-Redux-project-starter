import React, { useState } from 'react'
import { connect } from 'react-redux'
import { handleLogin } from '../actions/authedUser'
import ProtTypes from 'prop-types';
import { withRouter } from '../utils/helpers';

const Login = ({ dispatch, location, navigate }) => {
  const [userInfo, setUserInfo] = useState('');

  const handleUserIdChange = (e) => {
    const value = e.target.value;
    setUserInfo(JSON.parse(value));
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(userInfo));
    setUserInfo(JSON.stringify({id:'', password: ''}));
    navigate(location.pathname || '/');
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

const mapStateToProps = ({},props) => {
  const location = props.router.location;
  const navigate = props.router.navigate;
  console.log(location);
  return {
    location,
    navigate
  }
}

export default withRouter(connect(mapStateToProps)(Login))
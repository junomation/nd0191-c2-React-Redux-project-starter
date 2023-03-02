import React, { useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Home from './Home';
import Question from './Question';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import LoadingBar from 'react-redux-loading-bar';
import { bindActionCreators } from 'redux';
import NotFound from './NotFound';

function App(){
    const dispatch = useDispatch();
    const authedUser = useSelector(state => state.authedUser);

    useEffect(() => {
        dispatch(showLoading);
        dispatch(handleInitialData());
        dispatch(hideLoading);
    }, [dispatch]);

    return (
            <Router>
                <div className="container">
                    <LoadingBar/>
                    <Nav />
                    <Routes>
                        <Route
                            exact path="/"
                            element={ authedUser ? <Home /> : <Login /> }
                        />
                        <Route
                            path="/questions/:id"
                            element={authedUser ? <Question /> : <Login />}
                        />
                        <Route
                            exact path="/add"
                            element={authedUser ? <NewQuestion /> : <Login />}
                        />
                        <Route
                            path="/leaderboard"
                            element={authedUser? <LeaderBoard /> : <Login />}
                        />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </div>
            </Router>  
    );
};

const mapStaeToProps = (state) => {
    return {
        authedUser: state.authedUser,
        loadingBar: state.loadingBar
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(
      { handleInitialData },
      dispatch,
    ),
  })
export default connect(mapStaeToProps, mapDispatchToProps)(App);

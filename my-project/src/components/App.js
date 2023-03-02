import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import Login from './Login';
import Home from './Home';
import Question from './Question';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav';

function App(){
    const dispatch = useDispatch();
    const authedUser = useSelector(state => state.authedUser);

    useEffect(() => {
        dispatch(handleInitialData());
    }, [dispatch]);

    return (
            <Router>
                <div className="container">
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
                        <Route path="*" element={<h1>404 Page Not Found</h1>} />
                    </Routes>
                </div>
            </Router>  
    );
};

export default App;

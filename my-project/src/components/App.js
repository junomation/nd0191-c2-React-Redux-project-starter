import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
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

    if(!authedUser){
        return <Login />;
    }

    return (  
            <div className="container">
                <Nav />
                <Routes>
                    <Route
                        exact path="/"
                        element={ <Home />}
                    />
                    <Route
                        path="/questions/:id"
                        element={<Question />}
                    />
                    <Route
                        exact path="/add"
                        element={<NewQuestion />}
                    />
                    <Route
                        path="/leaderboard"
                        element={<LeaderBoard />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<h1>404 Page Not Found</h1>} />
                </Routes>
            </div>
    );
};

export default App;

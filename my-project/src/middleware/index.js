import thunk from 'redux-thunk';
import logger from './logger';
import { loadingBarMiddleware } from 'react-redux-loading-bar'

const middleware = [thunk, loadingBarMiddleware(), logger];

export default middleware;
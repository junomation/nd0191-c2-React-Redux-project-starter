import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from './reducers';
import App from './components/App';
import middleware from './middleware';

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

const root = document.getElementById('root');
ReactDOM.createRoot(root).render(
  <Provider store={store}>
      <App />
  </Provider>,
);
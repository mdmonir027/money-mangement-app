import jwtDecode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { SET_USER } from './store/actions/types';
import store from './store/store';
import { setAuthToken } from './utils/setAuthToken';

const token = localStorage.getItem('auth_token');
if (token) {
  const decodeToken = jwtDecode(token);
  setAuthToken(token);
  store.dispatch({
    type: SET_USER,
    payload: {
      user: decodeToken,
    },
  });
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);

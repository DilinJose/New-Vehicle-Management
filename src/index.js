import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import App from './components/App';
import reducers from './reducers';
import "./assests/css/index.css"

import thunk from 'redux-thunk';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

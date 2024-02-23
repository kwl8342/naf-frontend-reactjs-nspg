import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import './assets/scss/dashlite.scss';
import './assets/mondelez/css/style.css';
import './assets/mondelez/css/gutters.css';
import './assets/scss/style-email.scss';
import './assets/scss/theme.scss';
// import '../node_modules/select2/dist/css/select2.min.css';
// import './assets/mondelez/css/select2-style.css';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const Error404Modern = lazy(() => import('./pages/error/404-modern'));

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={<div />}>
      <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <Route render={({ location }) => (location.state && location.state.is404 ? <Error404Modern /> : <App />)} />
        </BrowserRouter>
      </Provider>
    </Suspense>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

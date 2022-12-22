/** @jsxRuntime classic */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
// above code required for ie11 support

import '@tourmalinecore/react-tc-ui-kit/es/index.css';
import '@tourmalinecore/react-tc-modal/es/index.css';
import '@tourmalinecore/react-table-responsive/es/index.css';

import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import App from './App';

import { ThemeProvider } from './theme/themeContext';
import { authService } from './common/authService';
import { refreshTokenAndSubscribe } from './common/api/refreshByInterval';

async function initApp() {
  await refreshTokenAndSubscribe();

  ReactDOM.render(
    <React.StrictMode>
      <authService.AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </authService.AuthProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

initApp();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

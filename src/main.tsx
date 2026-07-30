/** @jsxRuntime classic */
import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { ThemeProvider } from './theme/themeContext'
import { authService } from './common/authService'
import { BrowserRouter } from 'react-router-dom'

async function initApp() {
  await authService.startPeriodicalAccessTokenRefresh()

  ReactDOM.render(
    <React.StrictMode>
      <authService.AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </authService.AuthProvider>
    </React.StrictMode>,
    document.getElementById(`root`),
  )
}

initApp()
/** @jsxRuntime classic */
import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'

import { ThemeProvider } from './theme/themeContext'
import { authService } from './common/authService'
import { refreshTokenAndSubscribe } from './common/api/refreshByInterval'

async function initApp() {
  await refreshTokenAndSubscribe()

  ReactDOM.render(
    <React.StrictMode>
      <authService.AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </authService.AuthProvider>
    </React.StrictMode>,
    document.getElementById(`root`),
  )
}

initApp()
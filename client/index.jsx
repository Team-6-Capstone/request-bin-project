import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  const appDoc = document.getElementById('app')
  ReactDOM.createRoot(appDoc).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
})
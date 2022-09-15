import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

document.addEventListener('DOMContentLoaded', () => {
  const appDoc = document.getElementById('app')
  ReactDOM.createRoot(appDoc).render(
    <App />
  )
})
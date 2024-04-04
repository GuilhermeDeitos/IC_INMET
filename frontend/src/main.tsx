import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/MainPage'
import './index.css'

if(!localStorage.getItem('Tema')){
  localStorage.setItem('Tema', 'light')
} 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

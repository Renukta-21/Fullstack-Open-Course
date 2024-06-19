import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Anecdotes from './Anecdotes.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Anecdotes />
  </React.StrictMode>,
)

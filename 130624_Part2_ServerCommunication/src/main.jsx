/*eslint-disable no-unused-vars*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
/* import PhoneBook from './PhoneBook' */
import FetchPosts from './FetchPosts'
import PhoneBook from './PhoneBook'
import axios from 'axios'
import AxiosFetch from './AxiosFetch'
import AxiosNotes from './AxiosNotes'

/* const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
] */

ReactDOM.createRoot(document.getElementById('root')).render(
  <AxiosNotes />
)
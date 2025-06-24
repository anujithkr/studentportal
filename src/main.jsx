// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./bootstrap.min (2).css"
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './Context/ContextShare.jsx'

createRoot(document.getElementById('root')).render(
  // To implement context APi we have to enclose App comp inside contextshare

  <ContextShare>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </ContextShare>


)

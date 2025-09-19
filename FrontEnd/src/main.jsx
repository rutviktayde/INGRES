import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import JalSathiChat from './pages/JalSathiChat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JalSathiChat />
  </StrictMode>,
)

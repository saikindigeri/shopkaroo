import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <Toaster
  position="top-right"
  reverseOrder={false}
   toastOptions={{
          duration: 4000,
          style: {
            background: '#000',
            color: '#fff',
            fontWeight: '500',
            fontSize: '15px',
          
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255,255,255,0.1)',
          },
          success: {
            icon: '✓',
            style: { background: '#50C878' },
          },
          error: {
            icon: '✕',
            style: { background: '#000' },
          },
        }}
        containerStyle={{
          top: 100,   
          right: 24,
        }}
/>
    <App />
  </StrictMode>,
)

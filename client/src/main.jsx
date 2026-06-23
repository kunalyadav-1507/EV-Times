import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster }
from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <App />
    
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: "#fff",
      color: "#333",
      borderRadius: "8px",
      padding: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      minWidth: "350px"
    },
    success: {
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff"
      }
    }
  }}
/>
  </StrictMode>,
)

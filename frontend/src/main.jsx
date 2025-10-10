import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from './components/ui/provider'
import './index.css'
import App from './App.jsx'
import { SearchProvider } from './context/SearchContext.jsx'

// This is to get around the leaflet-draw type bug
window.type = '';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </Provider>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { Provider } from './components/ui/provider'
import './index.css'
import App from './App.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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

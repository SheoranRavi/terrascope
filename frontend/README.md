# Frontend Architecture

This document outlines the component structure and architecture for the Terrascope React frontend.

## Component Tree

The application is broken down into the following component hierarchy:

```
App.jsx
└── / (Main Page)
    ├── ResultsPanel.jsx
    │   ├── ResultsHeader.jsx
    │   └── HotelList.jsx
    │       └── HotelCard.jsx
    │           ├── StarRating.jsx
    │           └── AmenityIcon.jsx
    └── MapPanel.jsx
        ├── Map.jsx (Wrapper for map library)
        │   ├── MapPin.jsx
        │   └── SearchArea.jsx
        ├── DrawTool.jsx
        └── InitialOverlay.jsx
```

## File Structure

This component tree corresponds to the following file structure within `src/components`, following a "folder-per-component" pattern for scalability and encapsulation.

```
src/
├── components/
│   ├── PlaceCard/
│   │   ├── index.jsx
│   │   ├── PlaceCard.module.css
│   │   └── PlaceCard.test.jsx
│   ├── Sidebar/
│   │   ├── index.jsx
│   │   └── SIdebar.module.css
│   ├── Map/
│   │   └── index.jsx
|   |   |__ Map.module.css
│   ├── SearchArea/
│   │   └── index.jsx
│
├── pages/
│   └── HomePage.jsx
│
└── App.jsx
```


## Bug
- leaflet-draw lib has a bug.
- did a patch for it by setting `window.type = ''`.
- Figure out a new library to use or a better way to patch this.
- Possible alternative -> leaflet-geoman
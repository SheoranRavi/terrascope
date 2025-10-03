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
│   ├── AmenityIcon/
│   │   └── index.jsx
│   ├── DrawTool/
│   │   ├── index.jsx
│   │   └── DrawTool.module.css
│   ├── HotelCard/
│   │   ├── index.jsx
│   │   ├── HotelCard.module.css
│   │   └── HotelCard.test.jsx
│   ├── HotelList/
│   │   ├── index.jsx
│   │   └── HotelList.module.css
│   ├── InitialOverlay/
│   │   ├── index.jsx
│   │   └── InitialOverlay.module.css
│   ├── Map/
│   │   └── index.jsx
│   ├── MapPanel/
│   │   └── index.jsx
│   ├── MapPin/
│   │   ├── index.jsx
│   │   └── MapPin.module.css
│   ├── ResultsHeader/
│   │   ├── index.jsx
│   │   └── ResultsHeader.module.css
│   ├── ResultsPanel/
│   │   └── index.jsx
│   ├── SearchArea/
│   │   └── index.jsx
│   └── StarRating/
│       └── index.jsx
│
├── pages/
│   └── HomePage.jsx
│
└── App.jsx
```

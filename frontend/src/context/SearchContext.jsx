import { createContext, useCallback, useState } from "react";
import React from "react";

export const SearchContext = createContext(null);

export function SearchProvider({children}){
  // hotel, (cafe and  more in future)
  const [searchType, setSearchType] = useState('hotel')
  const [places, setPlaces] = useState([])

  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPlaces = useCallback(async (bounds, type) => {
    return new Promise();
  }, [])

  const value = {
    places,
    isLoading,
    error,
    searchType,
    setSearchType,
    fetchPlaces,
  };

  return(
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}
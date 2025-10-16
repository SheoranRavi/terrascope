import { createContext, useCallback, useEffect, useState } from "react";
import React from "react";
import {searchPlaces} from "../api";

export const SearchContext = createContext(null);

export function SearchProvider({children}){
  // hotel, (cafe and  more in future)
  const [searchType, setSearchType] = useState('hotel');
  const [places, setPlaces] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaces = useCallback(async (bounds) => {
    try{
      setLoading(true);
      setError(null);
      const res = await searchPlaces(bounds, searchType);
      if (res.status == 200 && res.data !== null){
        setPlaces(res.data);
      }else{
        setError(res.status);
        setPlaces([]);
      }
    }catch (err){
      console.log(`error : ${err}`);
      console.dir(err);
      setError(err.response.data.error);
      setPlaces([]);
    }finally{
      setLoading(false);
      setSidebarOpen(true);
    }
  }, [searchType])

  const value = {
    places,
    isLoading,
    error,
    searchType,
    setSearchType,
    fetchPlaces,
    setPlaces,
    sidebarOpen,
    setSidebarOpen
  };

  return(
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}
import { createContext, useCallback, useState } from "react";
import React from "react";
import {getHotels} from "../api";

export const SearchContext = createContext(null);

export function SearchProvider({children}){
  // hotel, (cafe and  more in future)
  const [searchType, setSearchType] = useState('hotel');
  const [places, setPlaces] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlaces = useCallback(async (bounds, type) => {
    try{
      setLoading(true);
      const res = await getHotels(bounds);
      if (res.status == 200){
        setPlaces(res.data);
      }else{
        setError(res.status);
      }
    }catch (err){
      console.log(`error : ${err}`);
      setError(err);
    }finally{
      setLoading(false);
    }
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
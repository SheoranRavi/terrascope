import axios from 'axios'

export const createApi = () => {
  const API_URL = import.meta.env.VITE_TERRASCOPE_API_ENDPOINT
  const api = axios.create({
    baseURL: API_URL,
  });

  // for future if authorization is needed
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
}

const api = createApi();

export const getHotels = async (bounds) => {
  return await api.get('/hotels', {
    params: {
      min_lat: bounds.minLat,
      max_lat: bounds.maxLat,
      min_lon: bounds.minLng,
      max_lon: bounds.maxLng,
    }
  });
};

export const searchPlaces = async (bounds, type) => {
  return await api.get('/places', {
    params: {
      min_lat: bounds.minLat,
      max_lat: bounds.maxLat,
      min_lon: bounds.minLng,
      max_lon: bounds.maxLng,
      place_type: type
    }
  });
};

export default api;
import axios from 'axios'

export const createApi = () => {
  const API_URL = import.meta.env.VITE_TERRASCOPE_API_ENDPOINT
  const api = axios.create({
    baseURL: API_URL,
  })

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

export const getHotels = (bounds) => {
  return api.get('/hotels', {
    params: {
      min_lat: bounds.south,
      max_lat: bounds.north,
      min_lon: bounds.west,
      max_lon: bounds.east,
    }
  });
};

export default api;
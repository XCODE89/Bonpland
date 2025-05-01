import axios from "axios";

const api = axios.create({
  // baseURL: "https://bonpland.onrender.com/api",
  baseURL: "https://bonpland-production.up.railway.app/ ",
  // baseURL: "http://localhost:3001/api",
  
});

export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://bonpland.onrender.com/api",
});

export default api;

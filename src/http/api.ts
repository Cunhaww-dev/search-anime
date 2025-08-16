import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});

import axios from "axios";

const jikanAPI = axios.create({
  baseURL: "https://api.jikan.moe/v4",
});

export {jikanAPI}
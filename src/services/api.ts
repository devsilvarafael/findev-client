import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;

import axios from "axios";

export const Api = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://devboard-2dqy.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

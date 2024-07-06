import axios from "axios";

export const Api = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://dev-board-server.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

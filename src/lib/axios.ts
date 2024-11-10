import axios from "axios";

export const Api = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

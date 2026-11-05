import { config } from "@/config/config";
import axios from "axios";

export const api = axios.create({
  baseURL: config.API_URL,
  timeout: 2000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

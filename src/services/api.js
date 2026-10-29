import { config } from "@/config/config";
import axios from "axios";
import { ApiError } from "./error";

export class Api {
  static #instance = null;
  #http;
  #getToken = () => null;

  constructor() {
    this.#http = axios.create({
      baseURL: config.API_URL + `/api/v1`,
      timeout: 10_000,
    });

    this.#registerInterceptors();
  }

  static getInstance() {
    if (!Api.#instance) {
      Api.#instance = new Api();
    }

    return Api.#instance;
  }

  setTokenProvider(fn) {
    this.#getToken = fn;
  }

  #registerInterceptors() {
    this.#http.interceptors.request.use((config) => {
      const token = this.#getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    this.#http.interceptors.response.use(
      (res) => res,
      (err) => {
        Promise.reject(
          new ApiError(err.response?.data?.message ?? err.message, {
            status: err.response?.status,
            data: err.response?.data,
          }),
        );
      },
    );
  }

  async get(url, config) {
    return (await this.#http.get(url, config)).data;
  }

  async post(url, body, config) {
    return (await this.#http.post(url, body, config)).data;
  }

  async patch(url, body, config) {
    return (await this.#http.patch(url, body, config)).data;
  }

  async put(url, body, config) {
    return (await this.#http.put(url, body, config)).data;
  }

  async delete(url, config) {
    return (await this.#http.delete(url, config)).data;
  }
}

export const api = Api.getInstance();

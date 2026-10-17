import axios, { type AxiosError, type AxiosInstance } from "axios";

import { siteConfig } from "@/shared/config/site";

export class AparatApiError extends Error {
  readonly status?: number;
  readonly details?: unknown;

  constructor(message: string, status?: number, details?: unknown) {
    super(message);
    this.name = "AparatApiError";
    this.status = status;
    this.details = details;
  }
}

export const aparatClient: AxiosInstance = axios.create({
  baseURL: `${siteConfig.aparatBaseUrl}/etc/api`,
  timeout: 20_000,
  headers: {
    Accept: "application/json",
  },
});

aparatClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      error.message ??
      "Aparat API request failed";

    throw new AparatApiError(message, status, error.response?.data);
  },
);

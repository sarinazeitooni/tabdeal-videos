import axios, { type AxiosError, type AxiosInstance } from "axios";
import { siteConfig } from "@/shared/config/site";

export type AparatApiError = Error & {
  name: "AparatApiError";
  status?: number;
  details?: unknown;
};

export const createAparatApiError = (
  message: string,
  status?: number,
  details?: unknown,
): AparatApiError => {
  const error = new Error(message) as AparatApiError;
  error.name = "AparatApiError";
  error.status = status;
  error.details = details;
  return error;
};

export const isAparatApiError = (error: unknown): error is AparatApiError =>
  error instanceof Error && error.name === "AparatApiError";

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

    throw createAparatApiError(message, status, error.response?.data);
  },
);

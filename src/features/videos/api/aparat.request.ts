import {
  aparatClient,
  createAparatApiError,
  isAparatApiError,
} from "@/shared/lib/axios";

interface AparatErrorPayload {
  errors?: Array<{ status?: number; detail?: string }>;
}

export const aparatGet = async <T>(path: string): Promise<T> => {
  const { data } = await aparatClient.get<T>(path);
  return data;
};

export const assertNoAparatErrors = (
  payload: AparatErrorPayload,
  fallbackMessage: string,
  status = 404,
): void => {
  if (!payload.errors?.length) return;

  throw createAparatApiError(
    payload.errors[0]?.detail ?? fallbackMessage,
    status,
    payload.errors,
  );
};

export const rethrowAparatError = (
  error: unknown,
  fallbackMessage: string,
  fallbackStatus = 500,
): never => {
  if (isAparatApiError(error)) throw error;

  throw createAparatApiError(fallbackMessage, fallbackStatus);
};

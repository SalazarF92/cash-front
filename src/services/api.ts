import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_URL } from "@/settings";
import { authService } from "./auth";

export async function get<T = unknown>(
  url: AxiosRequestConfig["url"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<T> | undefined> {
  return request<T>({ url, method: "GET", params, headers });
}

export async function post<T = any>(
  url: AxiosRequestConfig["url"],
  data?: AxiosRequestConfig["data"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<T> | undefined> {
  return request<T>({ url, method: "POST", data, headers });
}

export async function put<T = any>(
  url: AxiosRequestConfig["url"],
  data?: AxiosRequestConfig["data"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<T> | undefined> {
  return request<T>({ url, method: "PUT", data, headers });
}

export async function del<T = any>(
  url: AxiosRequestConfig["url"],
  data?: AxiosRequestConfig["data"],
  params?: AxiosRequestConfig["params"],
  headers?: AxiosRequestConfig["headers"]
): Promise<AxiosResponse<T> | undefined> {
  return request<T>({ url, method: "DELETE", data, params, headers });
}

async function request<T = any>(
  options: AxiosRequestConfig
): Promise<AxiosResponse<T> | undefined> {
  try {
    const fetchResponse = async () => {
      return axios({
        ...options,
        baseURL: API_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
    };

    try {
      return fetchResponse();
    } catch (error: any) {
      if (error.response.status == 500) fetchResponse();
    }
  } catch (err: any) {
    handleError(err);
  }
}

function handleError(err: AxiosError<any>) {
  if (!err.response) {
    console.error(err);
    throw new Error("Erro desconhecido, tente novamente...");
  }

  const { status, config, data } = err.response;
  const { url } = config;

  if (status !== 401 || (status === 401 && url === "/auth/login")) {
    const message = data?.message || "";
    const errors = data?.errors || [];
    const errorsData = data?.data?.errors || [];

    if (message) {
      throw message;
    }

    if (!!errors.length && errors[0]) {
      throw new Error(errors[0].message);
    }

    if (!!errorsData.length && errorsData[0]) {
      throw new Error(errorsData[0].message);
    }

    throw new Error("Erro desconhecido, tente novamente...");
  }
}

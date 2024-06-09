import { apiCustomResponse, apiResponse } from "@/model";
import { useAddressStore } from "@/store/address";
import { useAuthStore } from "@/store/auth";
import { useMiscStore } from "@/store/misc";
import { useToastStore } from "@/store/toast";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

export interface AxiosCustomRequestConfig extends AxiosRequestConfig {
  id?: string;
  slug?: string;
  body?: unknown;
}

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  TooManyRequests = 429,
  ValidationError = 406,
  ProcessPending = 409,
  InternalServerError = 500,
  ServerDown = 502,
}

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
};

const injectToken = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  try {
    const token = useAuthStore.getState().access;
    if (token != "") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

export class Http {
  private instance: AxiosInstance | null = null;

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  initHttp() {
    const http = axios.create({
      baseURL: import.meta.env.VITE_BASEURL,
      headers,
    });

    http.interceptors.request.use(
      (config) => {
        if (config.method === "get") {
          useMiscStore.getState().showLoading("query");
          return injectToken(config);
        }
        useMiscStore.getState().showLoading("mutation");
        return injectToken(config);
      },
      (error) => {
        useMiscStore.getState().hideLoading();
        return Promise.reject(error);
      }
    );

    http.interceptors.response.use(
      (response) => {
        useMiscStore.getState().hideLoading();
        return response;
      },
      (error: AxiosError) => {
        useMiscStore.getState().hideLoading();
        return this.handleError(error);
      }
    );

    this.instance = http;
    return http;
  }

  request<T = unknown, R = apiCustomResponse<T>>(
    config: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.request<T, R>(config);
  }

  get<T = unknown, R = apiCustomResponse<T>>(
    url: string,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  post<T = unknown, R = apiCustomResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  put<T = unknown, R = apiCustomResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  patch<T = unknown, R = apiCustomResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  delete<T = unknown, R = apiCustomResponse<T>>(
    url: string,
    config?: AxiosCustomRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }

  private handleError(error: AxiosError) {
    const { response } = error;

    switch (response?.status) {
      case StatusCode.Unauthorized: {
        useToastStore.getState().stackToast({
          title: "لطفا دوباره وارد شوید.",
          message: "برای استفاده از نسخه انلاین دوباره وارد شوید.",
          options: {
            type: "info",
          },
        });
        useAddressStore.getState().setAddress(null);
        useAuthStore.getState().logoutUser();
        break;
      }
      case StatusCode.NotFound: {
        useToastStore.getState().stackToast({
          title: (response.data as Record<string, Record<string, string>>).error
            .message,
          options: {
            type: "error",
          },
        });
        break;
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        break;
      }
      case StatusCode.ValidationError: {
        break;
      }
      case StatusCode.ProcessPending: {
        useToastStore.getState().stackToast({
          title: (error.response?.data as apiResponse<unknown>).error,
          options: {
            type: "error",
          },
        });
        break;
      }
      case StatusCode.TooManyRequests: {
        useToastStore.getState().stackToast({
          title: "تعداد بالای درخواست‌ها",
          message: "لطفا بعد از مدتی دوباره تلاش کنید.",
          options: {
            type: "error",
          },
        });
        break;
      }
      case StatusCode.InternalServerError: {
        useToastStore.getState().stackToast({
          title: "خطا در اتصال به سرور",
          options: {
            type: "error",
          },
        });
        break;
      }
      case StatusCode.ServerDown: {
        useToastStore.getState().stackToast({
          title: "خطا در اتصال به سرور",
          options: {
            type: "error",
          },
        });
        break;
      }
    }

    return Promise.reject(error);
  }
}

export const http = new Http();

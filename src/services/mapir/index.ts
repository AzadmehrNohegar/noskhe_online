import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import * as qs from "qs";

const headers: Readonly<Record<string, string | boolean>> = {
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_MAP_TOKEN,
};

export class MapirHttp {
  private instance: AxiosInstance | null = null;

  private get mapirHttp(): AxiosInstance {
    return this.instance != null ? this.instance : this.initMapirHttp();
  }

  initMapirHttp() {
    const mapirHttp = axios.create({
      baseURL: import.meta.env.VITE_MAPIR_BASEURL,
      headers,
      paramsSerializer: {
        serialize: (params: unknown) => {
          return qs.stringify(params, {
            arrayFormat: "repeat",
          });
        },
      },
    });

    this.instance = mapirHttp;
    return mapirHttp;
  }
  get<T = unknown, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.mapirHttp.get<T, R>(url, config);
  }
}

export const mapirHttp = new MapirHttp();

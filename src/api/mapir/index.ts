import { AxiosRequestConfig } from "axios";
import { mapirHttp } from "@/services/mapir";

export const mapirSearchv2 = async ({ params }: AxiosRequestConfig) => {
  return await mapirHttp.get("/search/v2/", {
    params,
  });
};

export const mapirReverse = async ({ params }: AxiosRequestConfig) => {
  return await mapirHttp.get("/reverse/", {
    params,
  });
};

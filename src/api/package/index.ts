import { pkg } from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getPackageApiPackages = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<pkg[]>("/package/api/packages/", { params });
};

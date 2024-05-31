import { cdr, consumption_chart } from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getCdrApiCustomer = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<cdr[]>("/cdr/api/customer", { params });
};

export const getCdrApiConsumptionChart = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<consumption_chart[]>("/cdr/api/consumption-chart/", {
    params,
  });
};

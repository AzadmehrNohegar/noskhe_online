import { subscription } from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getSubscriptionApiSubscriptions = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<subscription[]>("/subscription/api/subscriptions/", {
    params,
  });
};

export const getSubscriptionApiExportCsvSubscriptions = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/subscription/api/export/csv/subscriptions/", {
    params,
  });
};

export const getSubscriptionApiSubscriptionsById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get<subscription>(`/subscription/api/subscriptions/${id}/`);
};

export const postSubscriptionApiSubscriptionsAutopayById = async ({
  id,
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post(
    `/subscription/api/subscriptions/${id}/auto-pay/`,
    body
  );
};

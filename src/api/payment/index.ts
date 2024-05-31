import { payment } from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getPaymentApiPayments = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<payment[]>("/payment/api/payments/", {
    params,
  });
};

export const getPaymentApiExportCsvPayments = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/payment/api/export/csv/payments/", {
    params,
  });
};

export const postPaymentApiPayments = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/payment/api/payments/", body);
};

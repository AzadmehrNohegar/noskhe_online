import {
  _new_order,
  _new_order_list,
  _pharmacy_order,
  _pharmacy_order_list,
  apiCustomResponse,
  dashboard_kpi,
  login_success_response,
  pharmacyUser,
} from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getPharmacyProfile = async () => {
  return await http.get<{ user: pharmacyUser[] }>("/pharmacy/profile");
};

export const getPharmacyDashboard = async () => {
  return await http.get<dashboard_kpi>("/pharmacy/dashboard");
};

export const getPharmacyFactorNewOrderList = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<_new_order_list[]>("/pharmacy/factor/neworder/list", {
    params,
  });
};

export const getPharmacyFactorOrderList = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<_pharmacy_order_list[]>("/pharmacy/factor/orderList", {
    params,
  });
};

export const getPharmacyFactorOrderById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get<_pharmacy_order>(`/pharmacy/factor/order/${id}`);
};

export const getPharmacyFactorNewOrderSingleById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get<_new_order>(`/pharmacy/factor/neworder/single/${id}`);
};

export const postPharmacyAuthLogin = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<login_success_response>>(
    "/pharmacy/auth/login",
    body
  );
};

export const postPharmacyAuthRegister = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<login_success_response>>(
    "/pharmacy/auth/register",
    body
  );
};

export const postPharmacyFactorOrderAcceptNotPrice = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/pharmacy/factor/order/AcceptNotPrice", body);
};

export const postPharmacyFactorOrderAccept = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<{ factorId: string }>>(
    "/pharmacy/factor/order/Accept",
    body
  );
};

export const patchPharmacyFactorOrderPrice = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.patch("/pharmacy/factor/order/price", body);
};

import {
  _new_order,
  _new_order_list,
  _pharmacy_order,
  _pharmacy_order_list,
  apiCustomResponse,
  dashboard_kpi,
  iban_response,
  login_success_response,
  pharmacy_wallet,
  pharmacyUser,
  wallet_transaction,
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

export const getPharmacyWallet = async () => {
  return await http.get<
    pharmacy_wallet<{
      next: boolean;
      previous: boolean;
      count: number;
      data: wallet_transaction[];
    }>
  >("/pharmacy/wallet");
};

export const getPharmacyFactorOrderNotAccept = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get(`/pharmacy/factor/order/notAccept/${id}`);
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

export const postPharmacyFactorDeliveryCourier = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/pharmacy/factor/delivery/courier", body);
};

export const postPharmacyFactorDeliveryPerson = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/pharmacy/factor/delivery/person", body);
};

export const postPharmacyWalletCardToIban = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<iban_response>>(
    "/pharmacy/wallet/card_to_iban",
    body
  );
};

export const patchPharmacyWalletEditIban = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.patch("/pharmacy/wallet/edit_iban", body);
};

export const patchPharmacyFactorOrderAcceptPrice = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.patch("/pharmacy/factor/order/acceptPrice", body);
};

export const patchPharmacyFactorOrderPrice = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.patch("/pharmacy/factor/order/price", body);
};

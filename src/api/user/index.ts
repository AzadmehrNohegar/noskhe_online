import {
  apiCustomResponse,
  otp_response,
  login_success_response,
  user,
  order_create_response,
  _order,
  _order_list,
  pharmacy_list,
  _user_invoice,
  pharmacy_wallet,
  wallet_transaction,
  iban_response,
} from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getUserProfile = async () => {
  return await http.get<{ user: user[] }>("/user/profile");
};

export const getUserAddressList = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/user/address/list", { params });
};

export const getUserOrderByOrderId = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get<_order>(`/user/order/${id}`);
};

export const getUserOrderInvoiceByOrderId = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get<_user_invoice>(`/user/order/invoice/${id}`);
};

export const getUserOrderList = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<_order_list[]>("/user/order/list", { params });
};

export const getUserDocumentInvoice = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get<unknown>("/user/document/invoice", { params });
};

export const getUserOrderSingleInvoiceById = async ({
  id,
}: AxiosCustomRequestConfig) => {
  return await http.get<_user_invoice>(`/user/order/singleInvoice/${id}`);
};

export const getUserWallet = async () => {
  return await http.get<
    pharmacy_wallet<{
      next: boolean;
      previous: boolean;
      count: number;
      data: wallet_transaction[];
    }>
  >("/user/wallet");
};

export const postUserAddressAdd = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/user/address/add", body);
};

export const postUserAuthSendOtp = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<otp_response>>(
    "/user/auth/send-otp",
    body
  );
};

export const postUserAuthRegisterSendOtp = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<otp_response>>(
    "/user/auth/register/send-otp",
    body
  );
};

export const postUserAuthRegisterCheckOtp = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<login_success_response>>(
    "/user/auth/register/check-otp",
    body
  );
};

export const postUserAuthCheckOtp = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<login_success_response>>(
    "/user/auth/check-otp",
    body
  );
};

export const postUserAuthRefreshToken = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<login_success_response>>(
    "/user/auth/refresh-token",
    body
  );
};

export const postUserOrderCreate = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<order_create_response>>(
    "/user/order/create",
    body
  );
};

export const postUserOrderPersonCreate = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<order_create_response>>(
    "/user/order/person/create",
    body
  );
};

export const postUserOrderPersonPharmacyList = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<
    unknown,
    apiCustomResponse<{ result: pharmacy_list[] }>
  >("/user/order/person/pharmacyList", body);
};

export const postUserOrderAddOTC = async ({
  body,
  headers,
}: AxiosCustomRequestConfig) => {
  return await http.post("/user/order/addOTC", body, { headers });
};

export const postUserOrderUploadPrescription = async ({
  body,
  headers,
}: AxiosCustomRequestConfig) => {
  return await http.post("/user/order/uploadPrescription", body, { headers });
};

export const postUserOrderElecPrescription = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post("/user/order/elecPrescription", body);
};

export const postUserPayment = async ({ body }: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<{ GateWayUrl: string }>>(
    "/user/payment",
    body
  );
};

export const postUserWalletCardToIban = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<iban_response>>(
    "/user/wallet/card_to_iban",
    body
  );
};

export const patchuserWalletEditIban = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.patch("/user/wallet/edit_iban", body);
};

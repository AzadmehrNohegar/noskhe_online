import {
  apiCustomResponse,
  otp_response,
  login_success_response,
  user,
  order_create_response,
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

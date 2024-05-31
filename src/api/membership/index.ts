import {
  apiCustomResponse,
  login_response,
  otp_response,
  login_success_response,
  user,
} from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

export const getUserProfile = async () => {
  return await http.get<{ user: user[] }>("/user/profile");
};

export const getMembershipApiUserRecoverPassword = async ({
  params,
}: AxiosCustomRequestConfig) => {
  return await http.get("/membership/api/users/recover-password/", { params });
};

export const postMembershipApiLogin = async ({
  body,
}: AxiosCustomRequestConfig) => {
  return await http.post<unknown, apiCustomResponse<login_response>>(
    "/membership/api/login/",
    body
  );
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

export const postUserAuthRefreshToken = async ({}) => {
  return await http.post<unknown, apiCustomResponse<login_success_response>>(
    "/user/auth/refresh-token"
  );
};

export const patchMembershipApiUsersRenewPasswordById = async ({
  id,
  body,
}: AxiosCustomRequestConfig) => {
  return await http.patch(`/membership/api/users/${id}/renew-password/`, body);
};

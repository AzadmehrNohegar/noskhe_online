import {
  apiCustomResponse,
  dashboard_kpi,
  login_success_response,
  pharmacyUser,
} from "@/model";
import { AxiosCustomRequestConfig, http } from "@/services/axios";

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

export const getPharmacyProfile = async () => {
  return await http.get<{ user: pharmacyUser[] }>("/pharmacy/profile");
};

export const getPharmacyDashboard = async () => {
  return await http.get<dashboard_kpi>("/pharmacy/dashboard");
};

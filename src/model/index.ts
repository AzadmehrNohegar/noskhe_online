import { AxiosResponse } from "axios";

export interface IDictionary<T> {
  [Key: string]: T;
}

export type ITypedDictionary<T extends string | number | symbol, K> = {
  [Key in T]: K;
};

export type listOption = {
  id: number | string;
  label: string;
  obj?: unknown;
};

export interface IResponsiveGatewayProps<T> {
  fields?: T[];
  isLoading: boolean;
}

export interface IExtendedDialogProps {
  isOpen: boolean;
  closeModal: () => void;
}

export type apiResponse<T> = {
  status: number;
  error: string;
  hint: string | null;
  message: string | null;
  user_id: number | null;
  time: number;
  data: T;
  count?: number;
  next?: string | null;
  previous?: string | null;
  redirect_to?: string | null;
};

export type apiCustomResponse<T> = AxiosResponse<apiResponse<T>>;

export type login_response = {
  token: string;
};

export type login_success_response = {
  token: {
    accessToken: string;
    refreshToken: string;
  };
};

export type otp_response = {
  mobile: string;
};

export type authOtpForm = {
  mobile: string;
  code: string;
};

export type authRegisterForm = {
  mobile: string;
  code: string;
  fullName: string;
  nationalCode: string;
};

export type toast = {
  id: number;
  title: string;
  message?: string;
  options: {
    type: toastType;
  };
};

export type loading_type = "query" | "mutation";

export type toastType = "primary" | "secondary" | "error" | "info" | "success";

export type iconSize = "small" | "medium" | "large";

export type placement = "center" | "top";

export type size = "standard" | "fit";

export type subscription_type = "prepaid" | "postpaid";

export type general_status =
  | "ready"
  | "success"
  | "revoke"
  | "pending"
  | "failed"
  | "closed";

export type general_boolean = "true" | "false";

export type kyc_state = "true" | "false";

export type invoice_type = "periodic" | "interim";

export type cdr_direction = "inbound" | "outbound";

export type operation_type = "increase" | "decrease";

export type invoice_used_for =
  | "package_invoice"
  | "invoice"
  | "base_balance_invoice"
  | "credit_invoice"
  | "";

export type otc = {
  drugName: string;
  type: string;
  count: string;
  image: FileList | null;
};

export type uploadPerscription = {
  image: FileList | null;
};

export type elecPerscription = {
  trackingCode: string;
  nationalCode: string;
  typeOfInsurance: string;
  doctorName: string;
};

export type user = {
  fullName: "azadmehr";
  nationalCode: "0024373028";
  mobile: "09129098256";
  walletBalance: 0;
};

export const ICON_SIZE: IDictionary<string> = {
  small: "text-base",
  medium: "text-xl",
  large: "text-2xl",
};

export const BREADCRUMBS_LABEL: IDictionary<string> = {
  "": "پیشخوان",
  prescription: "نسخه",
  line: "لیست خط‌های من",
  support: "ارتباط با پشتیبان",
  recent: "لیست مکالمات",
  financial: "مالی",
  transaction: "تراکنش‌ها",
  receipt: "قبض‌ها",
  bundle: "بسته‌های اعتباری",
  profile: "حساب کاربری",
  wallet: "کیف پول",
};

import { AxiosResponse } from "axios";
import { FieldError } from "react-hook-form";

export interface IDictionary<T> {
  [Key: string]: T;
}
export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError;
  containerClassName?: string;
  label?: string;
  elementEnd?: React.ReactNode;
  elementStart?: React.ReactNode;
  block?: boolean;
  isLabelAbsolute?: boolean;
  astrisk?: boolean;
  iconClassName?: string;
  deleteAction?: () => void;
}

export interface ITextareaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error?: FieldError;
  containerClassName?: string;
  label?: string;
  elementEnd?: React.ReactNode;
  block?: boolean;
  isLabelAbsolute?: boolean;
  astrisk?: boolean;
  iconClassName?: string;
  deleteAction?: () => void;
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
  result: {
    count: number;
    next: string | null;
    previous: string | null;
    data: T;
  };

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

export type order_create_response = {
  orderId: string;
};

export type otp_response = {
  mobile: string;
};

export type authOtpForm = {
  mobile: string;
  code: string;
};

export type authLoginForm = {
  userName: string;
  password: string;
};

export type authRegisterForm = {
  mobile: string;
  code: string;
  fullName: string;
  nationalCode: string;
};

export type authPharmacyRegisterForm = {
  mobile: string;
  userName: string;
  fullName: string;
  password: string;
};

export type dashboard_form = {
  description: string;
  otc: otc[];
  uploadPrescription: uploadPrescription[];
  elecPrescription: elecPrescription[];
};

export type toast = {
  id: number;
  title: string;
  message?: string;
  options: {
    type: toastType;
  };
};

export type role = "CUSTOMER" | "PHARMACY";

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
  | "PENDING"
  | "FAILED"
  | "closed";

export type general_boolean = "true" | "false";

export type kyc_state = "true" | "false";

export type invoice_type = "periodic" | "interim";

export type cdr_direction = "inbound" | "outbound";

export type operation_type = "increase" | "decrease";

export type _order_status = "PENDING" | "FAILED";

export type _delivery_type = "COURIER";

export type invoice_used_for =
  | "package_invoice"
  | "invoice"
  | "base_balance_invoice"
  | "credit_invoice"
  | "";

export type otc_type =
  | "CAPSULE"
  | "TAB"
  | "CAPSULE_PACKAGE"
  | "TAB_PACKAGE"
  | "DROPLET"
  | "OINTMENT"
  | "DRINK"
  | "OTHER";

export type add_address_form = {
  lat: number;
  lng: number;
  address: string;
  province: string;
  city: string;
  myself: boolean;
  fullName: string;
  phone: string;
};

export type otc = {
  drugName: string;
  type: string;
  count: string;
  image: FileList | File[] | string | null;
};

export type uploadPrescription = {
  image: FileList | File[] | string | null;
};

export type elecPrescription = {
  trackingCode: string;
  nationalCode: string;
  typeOfInsurance: string;
  doctorName: string;
};

export type user = {
  fullName: string;
  nationalCode: number;
  mobile: string;
  walletBalance: number;
};

export type pharmacyUser = {
  mobile: string;
  userName: string;
  address: string;
  city: string;
  coordinates: number[];
  district: string;
  fullName: string;
  licenseNumber: string;
  nationalCode: string;
  pharmacyName: string;
  province: string;
  walletBalance: number;
};

export type mapir_reserve = {
  address: string;
  postal_address: string;
  address_compact: string;
  primary: string;
  name: string;
  poi: string;
  penult: string;
  country: string;
  province: string;
  county: string;
  district: string;
  rural_district: string;
  city: string;
  village: string;
  region: string;
  neighbourhood: string;
  last: string;
  plaque: string;
  postal_code: string;
  geom: geom;
};

export type geom = {
  type: string;
  coordinates: string[];
};

export type address = {
  _id: string;
  province: string;
  city: string;
  address: string;
  coordinate: number[];
  fullName: string;
  mobile: string;
};

export type _order = {
  order: {
    _id: string;
    userId: string;
    mobile: string;
    fullName: string;
    addressId: string;
    description: string;
    status: _order_status;
    deliveryType: _delivery_type;
    accepted: boolean;
    refId: number;
    otc: _otc[];
    uploadPrescription: _uploadPrescription[];
    elecPrescription: _elecPrescription[];
    createdAt: string;
    updatedAt: string;
  };
  address: address;
};

export type _elecPrescription = {
  typeOfInsurance: string;
  nationalCode: string;
  doctorName: string;
  trackingCode: string;
  _id: string;
};

export type _uploadPrescription = {
  image: string;
  _id: string;
  imageUrl: string;
};

export type _otc = {
  type: otc_type;
  count: number;
  _id: string;
  imageUrl: string;
  drugName?: string;
  image?: string;
};

export type _order_list = {
  _id: string;
  userId: string;
  description: string;
  refId: number;
  status: general_status;
  deliveryType: _delivery_type;
  accepted: boolean;
  createdAt: string;
};

export type dashboard_kpi = {
  UNCONFIRMED_ORDERS: number;
  CONFIRMED_ORDERS: number;
  CURRENT_COURIER_ORDERS: number;
  CURRENT_PERSON_ORDERS: number;
  WFC_ORDERS: number;
  ALL_OF_ORDERS: number;
};

export const ICON_SIZE: IDictionary<string> = {
  small: "text-base",
  medium: "text-xl",
  large: "text-2xl",
};

export const BREADCRUMBS_LABEL: IDictionary<string> = {
  "": "پیشخوان",
  order: "سفارشات",
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

export const INSURANCE_LABEL: IDictionary<string> = {
  TAMIN: "بیمه تامین اجتماعی",
  SALAMAT: "بیمه سلامت",
};

export const TYPE_LABEL: IDictionary<string> = {
  CAPSULE: "کپسول - ورق",
  TAB: "قرص - ورق",
  CAPSULE_PACKAGE: "کپسول - بسته",
  TAB_PACKAGE: "قرص - بسته",
  DROPLET: "قطره",
  OINTMENT: "پماد",
  DRINK: "شربت",
  OTHER: "سایر",
};

export const TYPE_STEP: IDictionary<string> = {
  CAPSULE: "ورق",
  TAB: "قرص",
  CAPSULE_PACKAGE: "بسته",
  TAB_PACKAGE: "بسته",
  DROPLET: "عدد",
  OINTMENT: "عدد",
  DRINK: "بطری",
  OTHER: "عدد",
};

export const TYPE_MAX: IDictionary<number> = {
  CAPSULE: 10,
  TAB: 10,
  CAPSULE_PACKAGE: 5,
  TAB_PACKAGE: 5,
  DROPLET: 5,
  OINTMENT: 5,
  DRINK: 5,
  OTHER: 5,
};

export const GENERAL_STATUS: ITypedDictionary<general_status, string> = {
  ready: "آماده برای پرداخت",
  success: "موفق",
  revoke: "لغو شده",
  PENDING: "در حال بررسی",
  FAILED: "ناموفق",
  closed: "بسته شده",
};

export const DELIVERY_TYPE: ITypedDictionary<_delivery_type, string> = {
  COURIER: "پیک",
};

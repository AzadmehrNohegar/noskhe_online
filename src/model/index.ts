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
  otc: otc[];
  uploadPrescription: uploadPrescription[];
  elecPrescription: elecPrescription[];
  description: string;
  isPerson: boolean;
  pharmacy: pharmacy_list | null;
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
  | "SUCCESS"
  | "PENDING"
  | "WAITING"
  | "FAILED"
  | "PAID"
  | "DELIVERED"
  | "SENT"
  | "WFP";

export type general_boolean = "true" | "false";

export type kyc_state = "true" | "false";

export type invoice_type = "periodic" | "interim";

export type cdr_direction = "inbound" | "outbound";

export type operation_type = "increase" | "decrease";

export type _order_status = "PENDING" | "FAILED" | "WAITING";

export type _order_type =
  | "ALL"
  | "PERSON"
  | "COURIER"
  | "WFC"
  | "WFP"
  | "CONFIRMED";

export type _delivery_type = "COURIER" | "PERSON";

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

export type invoice_item_type = "OTC" | "UPLOAD" | "ELEC";

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

export type _new_order = {
  _id: string;
  refId: number;
  fullName: string;
  description: string;
  status: _order_status;
  deliveryType: _delivery_type;
  accepted: boolean;
  otc: _otc[];
  uploadPrescription: _uploadPrescription[];
  elecPrescription: _elecPrescription[];
  createdAt: string;
};

export type _elecPrescription = {
  typeOfInsurance: string;
  nationalCode: string;
  doctorName: string;
  trackingCode: string;
  _id: string;
};

export type _elecPrescriptionWithPrice = {
  typeOfInsurance: string;
  nationalCode: string;
  doctorName: string;
  trackingCode: string;
  price: number;
  patient: number;
  insurance: number;
  count: number;
  total: number;
  _id: string;
};

export type _uploadPrescription = {
  image: string;
  _id: string;
  imageUrl: string;
};

export type _uploadPrescriptionWithPrice = {
  image: string;
  price: number;
  patient: number;
  insurance: number;
  count: number;
  total: number;
  _id: string;
};

export type _otc = {
  type: otc_type;
  count: number;
  _id: string;
  imageUrl: string;
  drugName?: string;
  image?: string;
};

export type _otcWithPrice = {
  type: otc_type;
  count: number;
  imageUrl: string;
  drugName?: string;
  image?: string;
  price: number;
  total: number;
  _id: string;
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

export type _new_order_list = {
  _id: string;
  refId: number;
  pharmacyId: string;
  orderId: string;
  status: _order_status;
  createdAt: string;
  deliveryType: _delivery_type;
  fullName: string;
};

export type dashboard_kpi = {
  UNCONFIRMED_ORDERS: number;
  CONFIRMED_ORDERS: number;
  CURRENT_COURIER_ORDERS: number;
  CURRENT_PERSON_ORDERS: number;
  WFC_ORDERS: number;
  ALL_OF_ORDERS: number;
};

export type pharmacy_list = {
  _id: string;
  address: string;
  city: string;
  pharmacyName: string;
  province: string;
};

export type invoice_price_type = _otc | _uploadPrescription | _elecPrescription;

export type _pharmacy_order_list = {
  _id: string;
  invoiceId: number;
  orderId: string;
  fullName: string;
  price: number;
  insurancePrice: number;
  totalPrice: number;
  deliveryTime: number;
  deliveryDate: string;
  deliveryType: _delivery_type;
  shippingCost: number;
  paymentStatus: boolean;
  sendStatus: boolean;
  active: boolean;
  status: general_status;
  createdAt: string;
};

export type _pharmacy_order = {
  _id: string;
  invoiceId: number;
  userId: string;
  orderId: string;
  fullName: string;
  price: number;
  insurancePrice: number;
  totalPrice: number;
  deliveryDate: string;
  deliveryType: _delivery_type;
  deliveryTime: string;
  shippingCost: number;
  paymentStatus: boolean;
  sendStatus: boolean;
  active: boolean;
  status: general_status;
  otc: _otcWithPrice[];
  uploadPrescription: _uploadPrescriptionWithPrice[];
  elecPrescription: _elecPrescriptionWithPrice[];
  createdAt: string;
};

export type _user_invoice = {
  delivery: _user_invoice_delivery;
  detail: _user_invoice_detail;
  payment: _user_invoice_payment;
};

export type _user_invoice_payment = {
  price: number;
  insurancePrice: number;
  totalPrice: number;
  serviceFee: number;
  finalPrice: number;
  amount: number;
  shippingCost: number;
};

export type _user_invoice_detail = {
  invoiceId: number;
  orderId: number;
  fullName: string;
  price: number;
  insurancePrice: number;
  totalPrice: number;
  shippingCost: number;
  status: general_status;
  otc: _otcWithPrice[];
  uploadPrescription: _uploadPrescriptionWithPrice[];
  elecPrescription: _elecPrescriptionWithPrice[];
  createdAt: string;
};

export type _user_invoice_delivery = {
  deliveryTime: string;
  deliveryTo: string;
  deliveryType: _delivery_type;
};

export type invoice_price = {
  itemId: string;
  price: string;
  insurance: string;
  itemType: invoice_item_type;
  obj?: invoice_price_type;
};

export type pharmacy_wallet<T> = {
  IBAN: string;
  name: string;
  bankName: string;
  cardNumber: string;
  result: T;
};

export type wallet_transaction = {
  RefNo: number;
  amount: number;
  state: "INCREMENT" | "DECREMENT" | "BUY";
  description: string;
  status: boolean;
  createdAt: string;
};

export type iban_response = {
  name: string;
  IBAN: string;
  bankName: string;
  cardNumber: string;
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
  SUCCESS: "موفق",
  PENDING: "در انتظار تایید",
  FAILED: "ناموفق",
  WAITING: "در انتظار قیمت",
  PAID: "پرداخت شده",
  DELIVERED: "تحویل داده شده",
  SENT: "ارسال شده",
  WFP: "در انتظار پرداخت",
};

export const DELIVERY_TYPE: ITypedDictionary<_delivery_type, string> = {
  COURIER: "پیک",
  PERSON: "حضوری",
};

export const ORDER_TYPE: ITypedDictionary<_order_type, string> = {
  ALL: "همه سفارشات",
  COURIER: "سفارشات جاری پیک",
  PERSON: "سفارشات جاری حضوری",
  WFC: "سفارشات در انتظار پیک",
  WFP: "سفارشات در انتظار پرداخت",
  CONFIRMED: "سفارشات تایید شده",
};

export const BANKS: IDictionary<string> = {
  melli: "ملی",
  sepah: "سسپه",
  sanatmadan: "صنعت و معدن",
  keshavarsi: "کشاورزی",
  maskan: "مسکن",
  postbank: "پست بانک",
  tosehe: "توسعه",
  eghtesad: "اقتصاد نوین",
  parsian: "پارسیان",
  pasargad: "پاسارگاد",
  karafarin: "کارآفرین",
  saman: "سامان",
  sina: "سینا",
  sarmaye: "سرمایه",
  shahr: "شهر",
  day: "دی",
  saderat: "صادرات",
  mellat: "ملت",
  tejarat: "تجارت",
  refah: "رفاه",
  ansar: "انصار",
  mehreqtesad: "مهراقتصاد",
  ghavamin: "قوامین",
  resalat: "رسالت",
  ayandeh: "آینده",
  khavarmianeh: "خاورمیانه",
};

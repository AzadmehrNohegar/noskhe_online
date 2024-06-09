import { ITypedDictionary } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { ReactNode } from "react";

export type navLinkSubmenuItem = {
  to: string;
  label: string;
};

export type navLink = {
  to: string;
  icon: (isActive: boolean) => ReactNode;
  label: string;
  end: boolean;
  submenu: navLinkSubmenuItem[] | null;
};

export type registerSteps = "type" | "form" | "package" | "checkout";

export type registerRealData = {
  type: "REAL";
  form: {
    first_name: string;
    last_name: string;
    father_name: string;
    national_code: string;
    id_code: string;
    birth_day: string;
    birth_place: string;
    postal_code: string;
    nationality: string;
  } | null;
};

export type registerLegalData = {
  type: "LEGAL";
  form: {
    name: string;
    national_code: string;
    registered_number: string;
  } | null;
};

export const SIDEBAR_ITEMS: navLink[] = [
  {
    to: "/",
    end: true,
    label: "پیشخوان",
    icon: (isActive) => {
      if (isActive)
        return (
          <IconWrapper
            iconSize="large"
            className="icon-Duotone-Home-Smile-16"
          />
        );
      return <IconWrapper iconSize="large" className="icon-Home-Smile-16" />;
    },
    submenu: null,
  },
  {
    to: "/order",
    end: true,
    label: "سفارشات",
    icon: (isActive) => {
      if (isActive)
        return (
          <IconWrapper iconSize="large" className="icon-Duotone-Bill-List-16" />
        );
      return <IconWrapper iconSize="large" className="icon-Bill-List-16" />;
    },
    submenu: null,
  },
];

export const REGISTER_STEPS: registerSteps[] = [
  "type",
  "form",
  "package",
  "checkout",
];

export const REGISTER_STEPS_LABELS: ITypedDictionary<registerSteps, string> = {
  type: "نوع حساب کاربری",
  form: "فرم ثبت نام",
  package: "پکیج و شماره",
  checkout: "فاکتور و تسویه حساب",
};

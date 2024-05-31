export const MOBILE_FORMAT = new RegExp(
  /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
);

export const EMAIL_PATTERN = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export const RE_DIGIT = new RegExp(/^\d+$/);

export const PERSIAN_PATTERN = new RegExp(/^[\u0600-\u06FF\s]+$/);

export const PASSWORD_FORMAT = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const CHART_COLORS = [
  "#8DE5F1",
  "#5446F7",
  "#9371F4",
  "#BE82E1",
  "#11A9BB",
];

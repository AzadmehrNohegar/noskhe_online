import {
  DatePickerProps,
  CalendarProps,
  default as MultiDatePicker,
} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import clsx from "clsx";
import { useRef } from "react";
import "react-multi-date-picker/styles/colors/purple.css";
import { IconWrapper } from "@/shared/iconWrapper";
import { useOnClickOutside } from "usehooks-ts";

type CalendarPropsGeneral = DatePickerProps & CalendarProps;
interface IDatePicker extends CalendarPropsGeneral {
  containerClassName?: string;
  label?: string;
}

function DatePicker(props: IDatePicker) {
  const ref = useRef<HTMLDivElement>(null);
  const { containerClassName, label, value, ...rest } = props;

  const handleRefClick = () => {
    if (ref.current) ref.current.click();
  };

  useOnClickOutside(ref, () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ref.current as any)?.closeCalendar();
  });

  return (
    <div className={containerClassName}>
      {label ? (
        <label className="label label-text">
          <span className="text-gray-600 text-xs">{label}</span>
        </label>
      ) : null}
      <div
        className={clsx(
          "border border-gray-200 w-full focus:border-info-200 rounded-md relative"
        )}
      >
        <button
          type="button"
          onClick={handleRefClick}
          className="absolute end-3 top-1/2 -translate-y-1/2 text-gray-600 ps-2 border-r border-r-gray-200 z-20"
        >
          <IconWrapper iconSize="medium" className="icon-Calendar-20" />
        </button>
        <MultiDatePicker
          value={value}
          ref={ref}
          calendar={persian}
          locale={persian_fa}
          monthYearSeparator="|"
          calendarPosition="bottom-right"
          editable={false}
          containerClassName="w-full"
          className="purple"
          arrowClassName="border-r-0 border-l-0"
          inputClass="w-full px-3 py-2.5 lg:py-3 text-sm lg:text-base outline-none border-none relative z-10 rounded-lg placeholder:text-gray-400 text-base"
          {...rest}
        />
      </div>
    </div>
  );
}

export { DatePicker };

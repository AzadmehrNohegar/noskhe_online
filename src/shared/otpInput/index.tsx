import React, { Fragment, useMemo } from "react";
import { RE_DIGIT } from "@/constants/variables";
import clsx from "clsx";

interface Props {
  value: string;
  valueLength: number;
  handleChange: (value: string) => void;
  error: boolean;
}

function OtpInput({ value, valueLength, handleChange, error }: Props) {
  const valueItems = useMemo(() => {
    const valueArray = value.split("");
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
        continue;
      }
      items.push("");
    }

    return items;
  }, [value, valueLength]);

  const inputhandleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;
    let targetValue = target.value.trim();
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";
    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value.substring(0, idx) + targetValue + value.substring(idx + 1);

      handleChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      const nextElementSibling =
        target.nextElementSibling as HTMLInputElement | null;

      if (nextElementSibling) {
        nextElementSibling.focus();
      }
    } else if (targetValueLength === valueLength) {
      handleChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const targetValue = target.value;

    target.setSelectionRange(0, targetValue.length);
    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    }
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const { target } = e;

    const prevInputEl =
      target.previousElementSibling as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <div
      className={clsx(
        "flex items-center w-full ltr max-w-full mx-auto justify-between"
      )}
    >
      {valueItems.map((digit, idx) => (
        <Fragment key={idx}>
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="\d{1}"
            maxLength={valueLength}
            className={clsx(
              "w-12 lg:w-16 h-12 lg:h-16 outline-none text-center border rounded-md bg-transparent focus:border-secondary-200 focus:bg-secondary-10",
              !error && "border-gray-200",
              error && "border-red-600"
            )}
            value={digit}
            onFocus={inputOnFocus}
            onChange={(e) => inputhandleChange(e, idx)}
            onKeyDown={inputOnKeyDown}
          />
          {idx < valueLength - 1 ? <Fragment>-</Fragment> : null}
        </Fragment>
      ))}
    </div>
  );
}

export { OtpInput };

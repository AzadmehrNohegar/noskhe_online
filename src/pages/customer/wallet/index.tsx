import { Input } from "@/components/input";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import { Fragment } from "react/jsx-runtime";
import WalletAddShebaDialog from "./partials/addShebaDialog";
import { useState } from "react";
import { useBankHelpers } from "@/utils/useBankHelpers";
import { BANKS } from "@/model";
import { getUserProfile, getUserWallet } from "@/api/user";
import clsx from "clsx";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { Pagination } from "@/shared/pagination";

interface IWalletForm {
  total: string;
}

function Wallet() {
  const [isWalletAddShebaDialogOpen, setIsWalletAddShebaDialogOpen] =
    useState(false);

  const [searchParams, setSearchParams] = useDebouncedSearchParams(0);

  const { bankCardHelper } = useBankHelpers();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<IWalletForm>({
    defaultValues: {
      total: "",
    },
  });

  const onSubmit = (values: IWalletForm) => {
    console.log(values);
  };

  const { data: userData, isLoading: isUserLoading } = useQuery(
    "user-profile",
    () => getUserProfile()
  );

  const { data: userWallet } = useQuery("user-wallet", () => getUserWallet());

  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row items-start min-h-full gap-4">
        <div className="w-full flex flex-col gap-4 lg:w-5/12 pb-4">
          <div className="flex flex-col h-fit border bordr-gray-200 rounded-md overflow-hidden">
            <div className="flex bg-slate-100 items-center justify-between p-4">
              <div className="flex flex-col gap-4 w-full">
                <h2 className="font-semibold">شماره شبا</h2>
                {!userWallet?.data.data.IBAN ? (
                  <div className="flex items-center justify-between w-full">
                    <span>شماره شبایی ثبت نشده است.</span>
                    <button
                      className="btn btn-link text-primary px-0"
                      onClick={() => setIsWalletAddShebaDialogOpen(true)}
                    >
                      افزودن شماره شبا
                    </button>
                  </div>
                ) : null}
                {userWallet?.data.data.IBAN ? (
                  <strong className="text-lg text-primary-500 font-bold inline-flex items-center">
                    {userWallet?.data.data.IBAN}{" "}
                    <span className="text-base text-gray-400 font-light ms-auto">
                      <span
                        tabIndex={-1}
                        className="inline-flex items-center gap-1"
                      >
                        <img
                          src={`/images/banks/${bankCardHelper(
                            userWallet?.data.data.cardNumber.trim()
                          )}.svg`}
                          width={24}
                          height={24}
                          alt=""
                        />
                        {
                          BANKS[
                            bankCardHelper(
                              userWallet?.data.data.cardNumber.trim()
                            ) || ""
                          ]
                        }
                      </span>
                    </span>
                  </strong>
                ) : null}
                {userWallet?.data.data.IBAN ? (
                  <button
                    className="btn btn-link text-primary px-0"
                    onClick={() => setIsWalletAddShebaDialogOpen(true)}
                  >
                    تغییر شماره شبا
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col h-fit border bordr-gray-200 rounded-md overflow-hidden"
          >
            <div className="flex bg-slate-100 items-center justify-between p-4">
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold">اعتبار کیف پول</h2>
                <strong className="text-3xl text-primary-500 font-bold">
                  {!isUserLoading
                    ? Number(
                        userData?.data.data.user[0].walletBalance
                      ).toLocaleString()
                    : null}{" "}
                  <span className="text-base text-gray-400 font-light">
                    ریال
                  </span>
                </strong>
              </div>
              <img
                src="/images/wallet-image.png"
                className="-hue-rotate-60"
                alt="wallet image"
              />
            </div>
            <div className="p-4 flex flex-wrap gap-4">
              <h2 className="font-semibold basis-full">
                افزایش اعتبار کیف پول
              </h2>
              {[100_000, 250_000, 500_000, 1_000_000, 3_000_000, 5_000_000].map(
                (item) => (
                  <label
                    key={item}
                    htmlFor={`${item}`}
                    className="btn btn-ghost border-gray-200 has-[:checked]:border-primary has-[:checked]:bg-primary-10 group basis-modified3 w-full"
                  >
                    <input
                      id={`${item}`}
                      type="checkbox"
                      name="value"
                      className="hidden"
                      checked={+watch("total") === item}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setValue("total", `${item}`);
                          return;
                        }
                        setValue("total", "");
                      }}
                    />
                    <strong className="text-gray-700 text-xs lg:text-sm group-has-[:checked]:text-primary-600 font-medium transition-all group-has-[:checked]:text-primary">
                      {item.toLocaleString()}{" "}
                      <span className="text-gray-500 text-[10px] lg:text-xs font-light group-has-[:checked]:text-primary-500">
                        ریال
                      </span>
                    </strong>
                  </label>
                )
              )}
              <Controller
                control={control}
                name="total"
                rules={{
                  required: "این فیلد ضروری است.",
                }}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    customInput={Input}
                    className="input input-bordered w-full"
                    placeholder="مبلغ دلخواه به ریال"
                    value={value}
                    onValueChange={({ value: v }) => onChange(v)}
                    error={error}
                    allowNegative={false}
                    suffix=" ریال"
                    thousandSeparator
                  />
                )}
              />
            </div>
            <div className="p-4 mt-16">
              <button
                className="btn btn-primary btn-block"
                disabled={!isValid || !isDirty}
              >
                افزایش اعتبار
              </button>
            </div>
          </form>
        </div>
        <div className="flex lg:min-h-full flex-col gap-4 w-full lg:w-7/12">
          <div className="flex flex-col gap-2 border bordr-gray-200 rounded-md divide-y divide-gray-200">
            {userWallet?.data.data.result.data.map((item) => (
              <ul className="flex flex-col gap-3 p-4">
                <li className="inline-flex items-center gap-4 justify-between">
                  <span className="text-grey-500 line-clamp-1 font-bold">
                    {item.description}
                  </span>
                </li>
                <li className="inline-flex items-center gap-4 justify-between">
                  <span className="text-grey-500 line-clamp-1">کد پیگیری:</span>
                  <strong className="text-grey-700 font-normal line-clamp-1">
                    {item.RefNo}
                  </strong>
                </li>
                <li className="inline-flex items-center gap-4 justify-between">
                  <span className="text-grey-500 line-clamp-1">
                    مقدار تراکنش:
                  </span>
                  <strong className="text-grey-700 font-normal line-clamp-1">
                    {item.amount.toLocaleString()}{" "}
                    <span className="font-light">ریال</span>
                  </strong>
                </li>
                <li className="inline-flex items-center gap-4 justify-between">
                  <span className="text-grey-500 line-clamp-1">
                    تاریخ تراکنش:
                  </span>
                  <strong className="text-grey-700 font-normal line-clamp-1 plaintext">
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date(item.createdAt))}
                  </strong>
                </li>
                <li className="inline-flex items-center gap-4 justify-between">
                  <span className="text-grey-500 line-clamp-1">عملیات:</span>
                  <strong
                    className={clsx(
                      "font-normal line-clamp-1",
                      item.state === "INCREMENT" && "text-success",
                      item.state === "BUY" && "text-success",
                      item.state === "DECREMENT" && "text-error"
                    )}
                  >
                    {item.state === "INCREMENT" ? "واریز" : null}
                    {item.state === "DECREMENT" ? "برداشت" : null}
                    {item.state === "BUY" ? "خرید" : null}
                  </strong>
                </li>
                <li className="inline-flex items-center gap-4 justify-between">
                  <span className="text-grey-500 line-clamp-1">وضعیت:</span>
                  <strong
                    className={clsx(
                      "font-normal line-clamp-1",
                      item.status && "text-success",
                      !item.status && "text-error"
                    )}
                  >
                    {item.status ? "موفق" : "ناموفق"}
                  </strong>
                </li>
              </ul>
            ))}
          </div>
          <Pagination
            count={userWallet?.data.data.result.count || 0}
            next={userWallet?.data.data.result.next || false}
            prev={userWallet?.data.data.result.previous || false}
            page={searchParams.get("page") || "1"}
            setPage={(p) => {
              searchParams.set("page", p);
              setSearchParams(searchParams);
            }}
          />
        </div>
      </div>
      <WalletAddShebaDialog
        isOpen={isWalletAddShebaDialogOpen}
        closeModal={() => setIsWalletAddShebaDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Wallet;

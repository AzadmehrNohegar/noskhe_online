import { getPharmacyProfile, getPharmacyWallet } from "@/api/pharmacy";
import { Input } from "@/components/input";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { useQuery } from "react-query";
import { Fragment } from "react/jsx-runtime";
import WalletAddShebaDialog from "./partials/addShebaDialog";
import { useState } from "react";

interface IWalletForm {
  total: string;
}

function Wallet() {
  const [isWalletAddShebaDialogOpen, setIsWalletAddShebaDialogOpen] =
    useState(false);

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
    "pharmacy-profile",
    () => getPharmacyProfile()
  );

  const { data: pharmacyWallet } = useQuery("pharmacy-wallet", () =>
    getPharmacyWallet()
  );

  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row items-start min-h-full gap-4">
        <div className="w-full flex flex-col gap-4 lg:w-5/12 pb-4">
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
          <div className="flex flex-col h-fit border bordr-gray-200 rounded-md overflow-hidden">
            <div className="flex bg-slate-100 items-center justify-between p-4">
              <div className="flex flex-col gap-4 w-full">
                <h2 className="font-semibold">شماره شبا</h2>
                {!pharmacyWallet?.data.data.shebaNum ? (
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
                {pharmacyWallet?.data.data.shebaNum ? (
                  <strong className="text-3xl text-primary-500 font-bold">
                    {Number(
                      pharmacyWallet?.data.data.shebaNum
                    ).toLocaleString()}{" "}
                    <span className="text-base text-gray-400 font-light">
                      ریال
                    </span>
                  </strong>
                ) : null}
              </div>
            </div>
          </div>
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

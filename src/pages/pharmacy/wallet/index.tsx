import { getPharmacyWallet } from "@/api/pharmacy";
import { useQuery } from "react-query";
import { Fragment } from "react/jsx-runtime";
import WalletAddShebaDialog from "./partials/addShebaDialog";
import { useState } from "react";
import { useBankHelpers } from "@/utils/useBankHelpers";
import { BANKS } from "@/model";
import clsx from "clsx";
import { Pagination } from "@/shared/pagination";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

function Wallet() {
  const [isWalletAddShebaDialogOpen, setIsWalletAddShebaDialogOpen] =
    useState(false);

  const [searchParams, setSearchParams] = useDebouncedSearchParams(0);

  const { bankCardHelper } = useBankHelpers();

  const { data: pharmacyWallet } = useQuery("pharmacy-wallet", () =>
    getPharmacyWallet()
  );

  return (
    <Fragment>
      <div className="flex flex-col lg:flex-row items-start min-h-full gap-4">
        <div className="w-full flex flex-col gap-4 lg:w-7/12 pb-4">
          <div className="flex flex-col gap-2 border bordr-gray-200 rounded-md divide-y divide-gray-200">
            {pharmacyWallet?.data.data.result.data.map((item) => (
              <ul className="flex flex-col gap-3 p-4">
                <li className="inline-flex items-center gap-4 justify-between">
                  <span className="text-grey-500 line-clamp-1">
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
                      item.state === "DECREMENT" && "text-error"
                    )}
                  >
                    {item.state === "INCREMENT" ? "واریز" : null}
                    {item.state === "DECREMENT" ? "برداشت" : null}
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
            count={pharmacyWallet?.data.data.result.count || 0}
            next={pharmacyWallet?.data.data.result.next || false}
            prev={pharmacyWallet?.data.data.result.previous || false}
            page={searchParams.get("page") || "1"}
            setPage={(p) => {
              searchParams.set("page", p);
              setSearchParams(searchParams);
            }}
          />
        </div>
        <div className="flex lg:min-h-full flex-col gap-4 w-full lg:w-5/12">
          <div className="flex flex-col h-fit border border-gray-200 rounded-md overflow-hidden">
            <div className="flex bg-slate-100 items-center justify-between p-4">
              <div className="flex flex-col gap-4 w-full">
                <h2 className="font-semibold">شماره شبا</h2>
                {!pharmacyWallet?.data.data.IBAN ? (
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
                {pharmacyWallet?.data.data.IBAN ? (
                  <strong className="text-lg text-primary-500 font-bold inline-flex items-center">
                    {pharmacyWallet?.data.data.IBAN}{" "}
                    <span className="text-base text-gray-400 font-light ms-auto">
                      <span
                        tabIndex={-1}
                        className="inline-flex items-center gap-1"
                      >
                        <img
                          src={`/images/banks/${bankCardHelper(
                            pharmacyWallet?.data.data.cardNumber.trim()
                          )}.svg`}
                          width={24}
                          height={24}
                          alt=""
                        />
                        {
                          BANKS[
                            bankCardHelper(
                              pharmacyWallet?.data.data.cardNumber.trim()
                            ) || ""
                          ]
                        }
                      </span>
                    </span>
                  </strong>
                ) : null}
                {pharmacyWallet?.data.data.IBAN ? (
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

import { Input } from "@/components/input";
import { Breadcrumbs } from "@/shared/breadcrumbs";
import { IconWrapper } from "@/shared/iconWrapper";
import { ListSearchWrapper } from "@/shared/listSearchWrapper";
import { Pagination } from "@/shared/pagination";
import { useMediaQuery } from "usehooks-ts";
import { WalletDesktopTable } from "./partials/desktopTable";
import { useState } from "react";
import { WalletFilterDialog } from "./partials/filterDialog";
import { WalletMobileTable } from "./partials/mobileTable";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getInvoiceApiCreditInvoices,
  getInvoiceApiExportCsvCreditInvoices,
  postInvoiceApiCreditInvoices,
} from "@/api/invoice";
import { credit_invoice, IResponsiveGatewayProps } from "@/model";
import { useToastStore } from "@/store/toast";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import Skeleton from "react-loading-skeleton";
import { useAuthStore } from "@/store/auth";
import { getMembershipApiCustomersById } from "@/api/membership";
import { postPaymentApiPayments } from "@/api/payment";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

interface IWalletForm {
  total_cost: string;
}

function WalletTable(props: IResponsiveGatewayProps<credit_invoice>) {
  const matches = useMediaQuery("(max-width: 1023px)");

  if (matches) return <WalletMobileTable {...props} />;

  return <WalletDesktopTable {...props} />;
}

function Wallet() {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<IWalletForm>({
    defaultValues: {
      total_cost: "",
    },
  });

  const { prime } = useAuthStore();

  const { data: userData, isLoading: isUserLoading } = useQuery(
    "user-profile",
    () =>
      getMembershipApiCustomersById({
        id: prime,
      })
  );

  const queryClient = useQueryClient();

  const { stackToast } = useToastStore();

  const [isWalletFilterDialogOpen, setIsWalletFilterDialogOpen] =
    useState(false);

  const { data: creditInvoicePagination, isLoading } = useQuery(
    ["credit-invoice-pagination", searchParams.toString()],
    () =>
      getInvoiceApiCreditInvoices({
        params: {
          search: searchParams.get("search"),
          limit: 10,
          offset: +(searchParams.get("page") || 0) * 10,
          operation_type: searchParams.get("operation_type"),
          status_code: searchParams.get("status_code"),
        },
      }),
    {
      keepPreviousData: true,
    }
  );

  const createPayment = useMutation(postPaymentApiPayments, {
    onSuccess: (res) => {
      if (res?.data) {
        stackToast({
          title: "در حال انتقال به درگاه پرداخت...",
          options: {
            type: "success",
          },
        });
        window.location.replace(res.data.redirect_to!);
        queryClient.invalidateQueries();
      }
    },
  });

  const increaseValue = useMutation(postInvoiceApiCreditInvoices, {
    onSuccess: () => {
      stackToast({
        title: "افزایش اعتبار با موفقیت ثبت شد.",
        options: {
          type: "success",
        },
      });
    },
  });

  const onSubmit = (values: IWalletForm) =>
    increaseValue
      .mutateAsync({
        body: {
          total_cost: +values.total_cost,
        },
      })
      .then((res) => {
        if (res?.data)
          createPayment.mutate({
            body: {
              description: res.data.data.description,
              invoice_id: res.data.data.id,
              invoice_type: "credit_invoice",
              payment_gateway: "mis",
              files_id: [],
            },
          });
      });

  const getCsv = useMutation(getInvoiceApiExportCsvCreditInvoices, {
    onSuccess: (res) => {
      if (res?.data) {
        const url = window.URL.createObjectURL(
          new Blob([res.data as unknown as string])
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `credit-invoice-${+(searchParams.get("page") || 0) * 10 + 1}-${
            +(searchParams.get("page") || 0) * 10 + 10
          }.csv`
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    },
  });

  const handleCsv = () =>
    getCsv.mutate({
      params: {
        offset: +(searchParams.get("page") || 0) * 10,
      },
    });

  if (isLoading)
    return (
      <Skeleton
        className="block h-full"
        containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
      />
    );

  return (
    <div className="flex lg:h-full flex-col">
      <Breadcrumbs className="lg:hidden mb-4" />
      <div className="flex flex-col lg:flex-row items-start min-h-full gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:w-5/12 pb-4"
        >
          <div className="flex flex-col h-fit border bordr-gray-100 rounded-md overflow-hidden">
            <div className="bg-primary-50 flex items-center justify-between p-4">
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold">اعتبار کیف پول</h2>
                <strong className="text-3xl text-primary-500 font-bold">
                  {!isUserLoading
                    ? Number(userData?.data.data.credit).toLocaleString()
                    : null}{" "}
                  <span className="text-base text-gray-400 font-light">
                    ریال
                  </span>
                </strong>
              </div>
              <img src="/images/wallet-image.png" alt="wallet image" />
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
                    className="btn btn-ghost border-gray-200 has-[:checked]:border-primary-200 has-[:checked]:bg-primary-10 group basis-modified3 w-full"
                  >
                    <input
                      id={`${item}`}
                      type="checkbox"
                      name="value"
                      className="hidden"
                      checked={+watch("total_cost") === item}
                      onChange={(e) => {
                        searchParams.delete("page");
                        if (e.target.checked) {
                          setValue("total_cost", `${item}`);
                          return;
                        }
                        setValue("total_cost", "");
                      }}
                    />
                    <strong className="text-gray-700 text-xs lg:text-sm group-has-[:checked]:text-primary-600 font-medium group-has-[:checked]:font-semibold">
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
                name="total_cost"
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
                    iconClassName="icon-Dollar-16"
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
                disabled={!isValid || !isDirty || increaseValue.isLoading}
              >
                افزایش اعتبار
              </button>
            </div>
          </div>
        </form>
        <div className="flex lg:min-h-full flex-col gap-4 w-full lg:w-7/12">
          <div className="flex items-center gap-3 flex-wrap lg:flex-nowrap lg:justify-normal">
            <ListSearchWrapper className="basis-full lg:basis-auto lg:me-auto" />
            <button
              className="btn btn-secondary btn-square"
              onClick={handleCsv}
              disabled={getCsv.isLoading}
            >
              <IconWrapper
                iconSize="large"
                className="icon-Download-Minimalistic"
              />
            </button>
            <button
              className="btn btn-ghost ms-auto lg:ms-0"
              onClick={() => setIsWalletFilterDialogOpen(true)}
            >
              <IconWrapper
                iconSize="large"
                className="icon-filter-16 hidden lg:inline"
              />
              افزودن فیلتر
            </button>
          </div>
          <WalletTable
            fields={creditInvoicePagination?.data.data}
            isLoading={isLoading}
          />
          <Pagination
            count={creditInvoicePagination?.data.count || 0}
            page={+(searchParams.get("page") || 0)}
            setPage={(val) => {
              searchParams.set("page", String(val));
              setSearchParams(searchParams);
            }}
            next={creditInvoicePagination?.data.next || null}
            prev={creditInvoicePagination?.data.previous || null}
          />
        </div>
        <WalletFilterDialog
          isOpen={isWalletFilterDialogOpen}
          closeModal={() => setIsWalletFilterDialogOpen(false)}
        />
      </div>
    </div>
  );
}

export default Wallet;

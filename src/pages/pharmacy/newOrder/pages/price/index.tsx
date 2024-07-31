import {
  getPharmacyFactorNewOrderSingleById,
  patchPharmacyFactorOrderPrice,
  postPharmacyFactorOrderAccept,
  patchPharmacyFactorOrderAcceptPrice,
} from "@/api/pharmacy";
import { Input } from "@/components/input";
import {
  _elecPrescription,
  _otc,
  _uploadPrescription,
  invoice_price,
  TYPE_STEP,
} from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useMemo } from "react";
import { ImageDialog } from "@/shared/imageDialog";
import { NumericFormat } from "react-number-format";
import Skeleton from "react-loading-skeleton";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { useToastStore } from "@/store/toast";

interface INewOrderPriceForm {
  invoiceItems: invoice_price[];
  deliveryTime: string;
}

function NewOrderPrice() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useDebouncedSearchParams(0);
  const queryClient = useQueryClient();
  const { convertPersian2English } = usePersianConvert();
  const { stackToast } = useToastStore();

  const { data: newOrderData, isLoading } = useQuery(
    `new-order-${orderId}`,
    () => getPharmacyFactorNewOrderSingleById({ id: orderId }),
    {
      onSuccess: (res) => {
        if (res?.data) {
          const otcValues = res.data.data.otc.map((el) => ({
            itemId: el._id,
            itemType: "OTC",
            price: "",
            insurance: "",
            obj: el,
          })) as invoice_price[];
          const uploadValues = res.data.data.uploadPrescription.map((el) => ({
            itemId: el._id,
            itemType: "UPLOAD",
            price: "",
            insurance: "",
            obj: el,
          })) as invoice_price[];
          const elecValues = res.data.data.elecPrescription.map((el) => ({
            itemId: el._id,
            itemType: "ELEC",
            price: "",
            insurance: "",
            obj: el,
          })) as invoice_price[];
          setValue("invoiceItems", [
            ...otcValues,
            ...uploadValues,
            ...elecValues,
          ]);
        }
      },
    }
  );

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { isValid, isDirty },
  } = useForm<INewOrderPriceForm>({
    defaultValues: {
      invoiceItems: [],
      deliveryTime: "",
    },
  });

  const invoiceItems = watch("invoiceItems");
  const stringifiedInvoiceItems = JSON.stringify(watch("invoiceItems"));

  const patchPrice = useMutation(patchPharmacyFactorOrderPrice);
  const acceptOrder = useMutation(postPharmacyFactorOrderAccept);
  const acceptPrice = useMutation(patchPharmacyFactorOrderAcceptPrice);

  const onSubmit = (values: INewOrderPriceForm) =>
    acceptOrder
      .mutateAsync({
        body: {
          orderId,
          deliveryType: newOrderData?.data.data.deliveryType,
          deliveryTime: values.deliveryTime,
        },
      })
      .then(async (res) => {
        if (res?.data) {
          const { factorId } = res.data.data;
          await Promise.all(
            values.invoiceItems.map((item) => {
              delete item.obj;
              return patchPrice.mutateAsync({
                body: {
                  invoiceId: factorId,
                  itemId: item.itemId,
                  price: +convertPersian2English(item.price),
                  insurance: +convertPersian2English(item.insurance),
                  itemType: item.itemType,
                },
              });
            })
          ).then(() => {
            acceptPrice
              .mutateAsync({
                body: {
                  invoiceId: factorId,
                },
              })
              .then(() => {
                queryClient.invalidateQueries();
                stackToast({
                  title: "قیمت اعمال شد.",
                  options: {
                    type: "success",
                  },
                });
                navigate(`/order/${factorId}`);
              });
          });
        }
      });

  const { fields } = useFieldArray({
    control,
    name: "invoiceItems",
    rules: {
      required: true,
    },
  });

  const orderTotal = useMemo(
    () =>
      invoiceItems.reduce(
        (curr, next) => curr + (+next.price - +next.insurance),
        0
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [invoiceItems, stringifiedInvoiceItems]
  );

  if (isLoading || fields.length === 0)
    return (
      <Skeleton
        className="block h-full"
        containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
      />
    );

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 min-h-full pb-24"
      >
        {fields.map((item, index) => {
          if (item.itemType === "OTC") {
            const { count, type, drugName, image } = item.obj as _otc;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 border border-success p-4 rounded-md"
              >
                <div className="flex items-center gap-1">
                  <strong>نام دارو: {drugName}</strong>
                  <span className="text-gray-600">
                    {count} {TYPE_STEP[type]}
                  </span>
                </div>
                <div className="flex items-stretch w-full gap-4 flex-col lg:flex-row">
                  {image ? (
                    <button
                      tabIndex={-1}
                      type="button"
                      className="border border-gray-200 rounded-md p-2 text-gray-600"
                      onClick={() =>
                        navigate(`?image=${image}`, {
                          replace: true,
                        })
                      }
                    >
                      <img
                        src={import.meta.env.VITE_BASEURL + image}
                        className="aspect-square h-80 w-80 min-w-80 min-h-80 object-contain mx-auto"
                        alt="perc"
                      />
                    </button>
                  ) : null}
                  <div className="flex flex-col items-start gap-4 w-full">
                    <Controller
                      control={control}
                      name={`invoiceItems.${index}.price`}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { value, onChange } }) => (
                        <NumericFormat
                          customInput={Input}
                          label="قمیت کل"
                          placeholder="قمیت کل"
                          containerClassName="lg:basis-modified3"
                          className="input input-bordered bg-white w-full ltr text-right"
                          value={value}
                          onValueChange={({ value }) => onChange(value)}
                          suffix=" ریال"
                          thousandSeparator
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          }
          if (item.itemType === "UPLOAD") {
            const { image } = item.obj as _uploadPrescription;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 border border-secondary p-4 rounded-md"
              >
                <div className="flex items-stretch w-full gap-4 flex-col lg:flex-row">
                  {image ? (
                    <button
                      tabIndex={-1}
                      type="button"
                      className="border border-gray-200 rounded-md p-2 text-gray-600"
                      onClick={() =>
                        navigate(`?image=${image}`, {
                          replace: true,
                        })
                      }
                    >
                      <img
                        src={import.meta.env.VITE_BASEURL + image}
                        className="aspect-square h-80 w-80 min-w-80 min-h-80 object-contain mx-auto"
                        alt="perc"
                      />
                    </button>
                  ) : null}
                  <div className="flex flex-col items-start gap-4 w-full">
                    <Controller
                      control={control}
                      name={`invoiceItems.${index}.price`}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { value, onChange } }) => (
                        <NumericFormat
                          customInput={Input}
                          label="قمیت کل"
                          placeholder="قمیت کل"
                          className="input input-bordered bg-white w-full ltr text-right"
                          value={value}
                          onValueChange={({ value }) => onChange(value)}
                          suffix=" ریال"
                          thousandSeparator
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`invoiceItems.${index}.insurance`}
                      render={({ field: { value, onChange } }) => (
                        <NumericFormat
                          customInput={Input}
                          label="سهم بیمه"
                          placeholder="سهم بیمه"
                          className="input input-bordered bg-white w-full ltr text-right"
                          value={value}
                          onValueChange={({ value }) => onChange(value)}
                          suffix=" ریال"
                          thousandSeparator
                        />
                      )}
                    />
                    <NumericFormat
                      customInput={Input}
                      label="سهم بیمار"
                      placeholder="سهم بیمار"
                      className="input input-bordered w-full ltr text-right pointer-events-none"
                      value={
                        +watch(`invoiceItems.${index}.price`) -
                          +watch(`invoiceItems.${index}.insurance`) || ""
                      }
                      tabIndex={-1}
                      suffix=" ریال"
                      thousandSeparator
                      readOnly
                    />
                  </div>
                </div>
              </div>
            );
          }
          if (item.itemType === "ELEC") {
            const { trackingCode, doctorName } = item.obj as _elecPrescription;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 border border-warning p-4 rounded-md"
              >
                <div className="flex items-center gap-1">
                  <span className="text-gray-600">
                    کد رهگیری: {trackingCode}
                  </span>
                  <span className="text-gray-600">نام دکتر: {doctorName}</span>
                </div>
                <div className="flex flex-col items-start gap-4 w-full">
                  <Controller
                    control={control}
                    name={`invoiceItems.${index}.price`}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { value, onChange } }) => (
                      <NumericFormat
                        customInput={Input}
                        label="قمیت کل"
                        placeholder="قمیت کل"
                        className="input input-bordered bg-white w-full ltr text-right"
                        value={value}
                        onValueChange={({ value }) => onChange(value)}
                        suffix=" ریال"
                        thousandSeparator
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`invoiceItems.${index}.insurance`}
                    render={({ field: { value, onChange } }) => (
                      <NumericFormat
                        customInput={Input}
                        label="سهم بیمه"
                        placeholder="سهم بیمه"
                        className="input input-bordered bg-white w-full ltr text-right"
                        value={value}
                        onValueChange={({ value }) => onChange(value)}
                        suffix=" ریال"
                        thousandSeparator
                      />
                    )}
                  />
                  <NumericFormat
                    customInput={Input}
                    label="سهم بیمار"
                    placeholder="سهم بیمار"
                    className="input input-bordered w-full ltr text-right pointer-events-none"
                    value={
                      +watch(`invoiceItems.${index}.price`) -
                        +watch(`invoiceItems.${index}.insurance`) || ""
                    }
                    tabIndex={-1}
                    suffix=" ریال"
                    thousandSeparator
                    readOnly
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
        {newOrderData?.data.data.deliveryType === "PERSON" ? (
          <Controller
            control={control}
            name="deliveryTime"
            rules={{
              required: "این فیلد ضروری است.",
            }}
            render={({ field: { value, onChange } }) => (
              <NumericFormat
                customInput={Input}
                className="input input-bordered bg-white w-full text-center"
                label="زمان اماده سازی"
                placeholder="دقیقه"
                value={value}
                onValueChange={({ value: v }) => onChange(v)}
                allowNegative={false}
                suffix=" دقیقه"
                max={150}
                thousandSeparator
              />
            )}
          />
        ) : null}
        <div className="flex flex-wrap mt-auto items-center border-t border-t-gray-100 p-4 gap-3 w-full fixed bg-[#F9F9FA] bottom-0 end-0 lg:max-w-[83%]">
          <div className="flex flex-col gap-1 me-auto basis-full lg:basis-auto items-center lg:items-start">
            <span className="font-light text-gray-600 text-sm">قیمت کل</span>
            <strong className="text-success">
              {orderTotal.toLocaleString()}{" "}
              <span className="text-xs font-light text-gray-600">تومان</span>
            </strong>
          </div>
          <button
            type="button"
            className="btn btn-link btn-custom text-gray-800 basis-modified2 lg:basis-auto"
            onClick={() => navigate("..")}
          >
            انصراف
          </button>
          <button
            className="btn btn-primary btn-custom btn-wide basis-modified2 lg:basis-auto"
            disabled={!isValid || !isDirty}
          >
            تایید سفارش
          </button>
        </div>
      </form>
      <ImageDialog
        isOpen={!!searchParams.get("image")}
        closeModal={() =>
          navigate(`.`, {
            replace: true,
          })
        }
      />
    </Fragment>
  );
}

export default NewOrderPrice;

import {
  getPharmacyFactorNewOrderSingleById,
  patchPharmacyFactorOrderPrice,
  postPharmacyFactorOrderAccept,
} from "@/api/pharmacy";
import { Input } from "@/components/input";
import {
  _elecPrescription,
  _otc,
  _uploadPrescription,
  INSURANCE_LABEL,
  invoice_price,
  TYPE_STEP,
} from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { ImageDialog } from "@/shared/imageDialog";
import { NumericFormat } from "react-number-format";
import Skeleton from "react-loading-skeleton";

interface INewOrderPriceForm {
  invoiceItems: invoice_price[];
  deliveryTime: string;
}

function NewOrderPrice() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useDebouncedSearchParams(0);

  const { data: newOrderData, isLoading } = useQuery(
    `new-order-${orderId}`,
    () => getPharmacyFactorNewOrderSingleById({ id: orderId }),
    {
      onSuccess: (res) => {
        if (res?.data) {
          const otcValues = res.data.data.otc.map((el) => ({
            invoiceId: orderId,
            itemId: el._id,
            itemType: "OTC",
            price: "",
            insurance: "",
            obj: el,
          })) as invoice_price[];
          const uploadValues = res.data.data.uploadPrescription.map((el) => ({
            invoiceId: orderId,
            itemId: el._id,
            itemType: "UPLOAD",
            price: "",
            insurance: "",
            obj: el,
          })) as invoice_price[];
          const elecValues = res.data.data.otc.map((el) => ({
            invoiceId: orderId,
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

  const patchPrice = useMutation(patchPharmacyFactorOrderPrice);
  const acceptOrder = useMutation(postPharmacyFactorOrderAccept);

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
          const { invoiceId } = res.data.data;
          await Promise.all(
            values.invoiceItems.map((item) => {
              delete item.obj;
              return patchPrice.mutateAsync({
                body: {
                  invoiceId,
                  item,
                },
              });
            })
          );
        }
      });

  const { fields } = useFieldArray({
    control,
    name: "invoiceItems",
    rules: {
      required: true,
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
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
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
                  {image ? (
                    <span className="ms-auto inline-flex items-center gap-1">
                      <strong>تصویر نسخه:</strong>
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
                          className="w-10 h-10 min-w-10 object-contain"
                          alt="perc"
                        />
                      </button>
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-4">
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
          if (item.itemType === "UPLOAD") {
            const { image } = item.obj as _uploadPrescription;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 border border-secondary p-4 rounded-md"
              >
                <div className="flex items-center gap-1">
                  {image ? (
                    <span className="inline-flex items-center gap-1 ms-auto">
                      <strong>تصویر نسخه:</strong>
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
                          className="w-10 h-10 min-w-10 object-contain"
                          alt="perc"
                        />
                      </button>
                    </span>
                  ) : null}
                </div>
                <div className="flex items-center gap-4">
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
          const { typeOfInsurance, trackingCode, doctorName } =
            item.obj as _elecPrescription;
          return (
            <div
              key={item.id}
              className="flex flex-col gap-3 border border-warning p-4 rounded-md"
            >
              <div className="flex items-center gap-1">
                <strong>نوع بیمه: {INSURANCE_LABEL[typeOfInsurance]}</strong>
                <span className="text-gray-600">کد رهگیری: {trackingCode}</span>
                <span className="text-gray-600">نام دکتر: {doctorName}</span>
              </div>
              <div className="flex items-center gap-4">
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
        })}
        {newOrderData?.data.data.deliveryType === "PERSON" ? (
          <div className="flex flex-col">
            <label className="label label-text">
              <span className="text-gray-600 text-xs">زمان آماده سازی</span>
            </label>
            <Controller
              control={control}
              name="deliveryTime"
              rules={{
                required: "این فیلد ضروری است.",
              }}
              render={({ field: { value, onChange } }) => (
                <NumericFormat
                  customInput={Input}
                  className="input input-bordered bg-white w-full text-center pointer-events-none"
                  label="تعداد"
                  placeholder="تعداد"
                  value={value}
                  onValueChange={({ value: v }) => onChange(v)}
                  allowNegative={false}
                  suffix=" دقیقه"
                  max={150}
                  thousandSeparator
                />
              )}
            />
          </div>
        ) : null}
        <div className="flex items-center justify-end border-t border-t-gray-100 pt-4 gap-3 w-full">
          <button
            type="button"
            className="btn btn-link btn-custom text-gray-800"
            onClick={() => navigate("..")}
          >
            انصراف
          </button>
          <button
            className="btn btn-primary btn-custom btn-wide"
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

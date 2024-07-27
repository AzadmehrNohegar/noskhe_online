import { postUserOrderCreate, postUserOrderPersonCreate } from "@/api/user";
import { Textarea } from "@/components/textarea";
import { dashboard_form, INSURANCE_LABEL, TYPE_STEP } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { useAddressStore } from "@/store/address";
import { useMiscStore } from "@/store/misc";
import { useToastStore } from "@/store/toast";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { SelectPharmacyDialog } from "@/shared/selectPharmacy";
import { Input } from "@/components/input";
import { useOrderRequestGenerator } from "@/utils/useOrderRequestGenerator";

interface IDashboardVerifyProps {
  prevStep: () => void;
}

function DashboardVerify({ prevStep }: IDashboardVerifyProps) {
  const [isSelectPharmacyDialogOpen, setIsSelectPharmacyDialogOpen] =
    useState(false);

  const {
    control,
    watch,
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<dashboard_form>();

  const navigate = useNavigate();

  const { setIsAddressDialogOpen } = useMiscStore();
  const { stackToast } = useToastStore();
  const { address } = useAddressStore();
  const { generateOrderRequests } = useOrderRequestGenerator();

  const createPersonOrder = useMutation(postUserOrderPersonCreate);
  const createOrder = useMutation(postUserOrderCreate);

  const onSubmit = (values: dashboard_form) => {
    if (values.isPerson) {
      createPersonOrder
        .mutateAsync({
          body: {
            pharmacyId: values.pharmacy?._id,
            addressId: address!._id,
            description: values.description,
          },
        })
        .then(async (res) => {
          const { otcRequests, elecRequests, uploadRequests } =
            generateOrderRequests(values, res.data.data.orderId);
          await Promise.all([
            ...otcRequests,
            ...uploadRequests,
            ...elecRequests,
          ]).then(() => {
            stackToast({
              title: "سفارش با موفقیت ایجاد شد.",
              options: {
                type: "success",
              },
            });
            navigate(`/order/${res.data.data.orderId}`);
          });
        });
      return;
    }

    createOrder
      .mutateAsync({
        body: {
          addressId: address!._id,
          description: values.description,
        },
      })
      .then(async (res) => {
        const { otcRequests, elecRequests, uploadRequests } =
          generateOrderRequests(values, res.data.data.orderId);
        await Promise.all([
          ...otcRequests,
          ...uploadRequests,
          ...elecRequests,
        ]).then(() => {
          stackToast({
            title: "سفارش با موفقیت ایجاد شد.",
            options: {
              type: "success",
            },
          });
          navigate(`/order/${res.data.data.orderId}`);
        });
      });
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 h-full"
      >
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
          <h2 className="font-semibold text-lg lg:text-xl">جزییات آدرس</h2>
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="w-full lg:w-fit flex flex-col gap-2">
              <h3 className="text-primary text-sm lg:text-base">
                {address?.fullName}
              </h3>
              <p className="text-xs">{address?.address}</p>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-block lg:btn-wide ms-auto"
              onClick={() => setIsAddressDialogOpen(true)}
            >
              تغییر آدرس
            </button>
          </div>
        </div>
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
          <h2 className="font-semibold text-lg lg:text-xl">زمان ارسال</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Controller
                control={control}
                name="isPerson"
                render={({ field: { value, onChange } }) => (
                  <RadioGroup
                    value={value}
                    as="div"
                    className="flex flex-col gap-3"
                    onChange={onChange}
                  >
                    <RadioGroup.Option
                      value={false}
                      as="button"
                      type="button"
                      className="cursor-pointer relative"
                    >
                      {({ checked }) => (
                        <div
                          className={clsx(
                            "btn btn-block justify-start text-start flex-nowrap",
                            checked && "btn-secondary",
                            !checked && "btn-ghost"
                          )}
                        >
                          <IconWrapper
                            className={clsx(
                              "icon-clock-square16 ",
                              checked && "text-white",
                              !checked && "text-gray-500"
                            )}
                            iconSize="medium"
                          />
                          سریع‌ترین زمان ممکن
                          <strong
                            className={clsx(
                              "text-xs ms-auto",
                              checked && "text-white",
                              !checked && "text-gray-700"
                            )}
                          >
                            20000 <span className="font-light">ریال</span>
                          </strong>
                        </div>
                      )}
                    </RadioGroup.Option>
                    <RadioGroup.Option
                      value={true}
                      as="button"
                      type="button"
                      className="cursor-pointer relative"
                    >
                      {({ checked }) => (
                        <div
                          className={clsx(
                            "btn btn-block justify-start text-start flex-nowrap",
                            checked && "btn-secondary",
                            !checked && "btn-ghost"
                          )}
                        >
                          <IconWrapper
                            className={clsx(
                              "icon-User-16 ",
                              checked && "text-white",
                              !checked && "text-gray-500"
                            )}
                            iconSize="medium"
                          />
                          تحویل حضوری
                        </div>
                      )}
                    </RadioGroup.Option>
                  </RadioGroup>
                )}
              />
              {watch("isPerson") ? (
                <Controller
                  control={control}
                  name="pharmacy"
                  rules={{
                    required: "این فیلد ضروری است.",
                  }}
                  render={({ field: { value }, fieldState: { error } }) => (
                    <Input
                      value={value?.address || ""}
                      className="input input-bordered w-full"
                      placeholder="لطفا داروخانه را انتخاب کنید."
                      onClick={() => setIsSelectPharmacyDialogOpen(true)}
                      error={error}
                      elementEnd={
                        <button
                          type="button"
                          className="btn btn-link text-primary"
                          onClick={() => setIsSelectPharmacyDialogOpen(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            version="1.1"
                            id="Capa_1"
                            width="16px"
                            height="16px"
                            viewBox="0 0 45.402 45.402"
                          >
                            <g>
                              <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141   c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27   c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435   c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z" />
                            </g>
                          </svg>
                          انتخاب داروخانه
                        </button>
                      }
                      readOnly
                    />
                  )}
                />
              ) : null}
            </div>
          </div>
        </div>
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
          <h2 className="flex items-center justify-between font-semibold text-lg lg:text-xl">
            <span>لیست سفارشات</span>
            <button
              type="button"
              className="btn btn-link text-primary px-0"
              onClick={prevStep}
            >
              ویرایش سفارش
            </button>
          </h2>
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col divide-y divide-gray-200">
              {getValues().otc.map((el, index) => (
                <li
                  key={`${el.drugName}${index}`}
                  className="flex items-center justify-between py-2"
                >
                  <strong>نام دارو: {el.drugName}</strong>
                  <span className="text-gray-600">
                    {el.count} {TYPE_STEP[el.type]}
                  </span>
                </li>
              ))}
              {getValues().elecPrescription.map((el, index) => (
                <li
                  key={`${el.trackingCode}${index}`}
                  className="flex items-center justify-between py-2"
                >
                  <strong>شماره پیگیری: {el.trackingCode}</strong>
                  <span className="text-gray-600">
                    {INSURANCE_LABEL[el.typeOfInsurance]}
                  </span>
                </li>
              ))}
              {getValues().uploadPrescription.map((el, index) => (
                <li
                  key={`${el.image}${index}`}
                  className="flex items-center justify-between py-2"
                >
                  <strong>تصویر نسخه:</strong>
                  <div className="border border-gray-200 rounded-md p-2 text-gray-600">
                    <img
                      src={URL.createObjectURL(
                        (el.image?.[0] as Blob) || new Blob()
                      )}
                      className="w-10 h-10 min-w-10 object-contain"
                      alt="perc"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
          <h2 className="font-semibold text-lg lg:text-xl">توضیحات نسخه</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Textarea
                label="توضیحات"
                className="textarea textarea-bordered resize-none w-full min-h-24"
                {...register("description")}
              />
            </div>
          </div>
        </div>
        <button className="btn btn-primary mt-auto" disabled={!isValid}>
          ارسال به نزدیک ترین داروخانه
        </button>
      </form>
      <SelectPharmacyDialog
        isOpen={watch("isPerson") && isSelectPharmacyDialogOpen}
        closeModal={() => setIsSelectPharmacyDialogOpen(false)}
      />
    </Fragment>
  );
}

export { DashboardVerify };

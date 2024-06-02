import { Input } from "@/components/input";
import { elecPerscription, otc, uploadPerscription } from "@/model";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Fragment, useState } from "react";
import { SelectAddressDialog } from "@/shared/selectAddress";
import { Textarea } from "@/components/textarea";
import { useAddressStore } from "@/store/address";

interface IDashboardForm {
  description: string;
  otc: otc[];
  uploadPerscription: uploadPerscription[];
  elecPerscription: elecPerscription[];
}

function Dashboard() {
  const [isSelectAddressDialogOpen, setIsSelectAddressDialogOpen] =
    useState(false);

  const { address } = useAddressStore();

  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<IDashboardForm>({
    defaultValues: {
      otc: [],
      uploadPerscription: [],
      elecPerscription: [],
    },
    mode: "all",
  });

  const {
    fields: otcFields,
    append: otcAppend,
    remove: otcRemove,
  } = useFieldArray({
    control,
    name: "otc",
  });

  const {
    fields: uploadFields,
    append: uploadAppend,
    remove: uploadRemove,
  } = useFieldArray({
    control,
    name: "uploadPerscription",
  });

  const {
    fields: elecFields,
    append: elecAppend,
    remove: elecRemove,
  } = useFieldArray({
    control,
    name: "elecPerscription",
  });

  const onSubmit = (values: IDashboardForm) => console.log(values);

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:h-full flex flex-col-reverse h-full lg:flex-row gap-4 relative"
      >
        <div className="w-full lg:w-3/12 lg:h-full">
          <div className="h-full max-h-container-custom flex flex-col gap-4">
            <div className="flex flex-row lg:flex-col pb-1 lg:pb-0 overflow-auto gap-4">
              <button
                type="button"
                className="btn btn-success h-fit justify-start flex gap-4 items-center p-4"
                onClick={() =>
                  otcAppend({
                    drugName: "",
                    type: "",
                    count: "",
                    image: null,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 347.219 347.219"
                >
                  <g>
                    <g id="Layer_5_28_">
                      <g>
                        <path d="M292.914,113.311l-47.97-22.824c-1.045-0.498-2.329-1.101-2.329-3.688c0,0,0-18.528,0-24.705     c0-2.5,2.993-2.662,2.993-2.662c16.385,0,27.609-13.33,27.609-29.716S259.887,0,243.502,0H103.717     C87.332,0,74.002,13.33,74.002,29.716s11.093,29.716,27.478,29.716c0,0,3.124-0.088,3.124,2.787c0,6.146,0,24.58,0,24.58     c0,2.754-1.284,3.189-2.328,3.688l-47.971,22.824c-5.879,2.797-10.313,5.075-10.313,16.328v188.316     c0,10.419,12.85,17.398,41.664,22.629c23.56,4.278,54.795,6.635,87.954,6.635s64.395-2.356,87.954-6.635     c28.814-5.23,41.664-12.21,41.664-22.629v-44.104V159.958V129.64C303.228,117.719,298.794,116.108,292.914,113.311z      M283.192,159.958c-43.878,0-175.513,0-175.513,0c-9.925,0-18,8.075-18,18v77.895c0,9.926,8.075,18,18,18c0,0,128.947,0,171.93,0     c9.75,0,9.62,6.618,9.62,6.618v36.605c-1.329,1.257-8.095,6.216-35.231,10.603c-22.101,3.572-50.649,5.541-80.386,5.541     s-58.286-1.969-80.386-5.541c-27.136-4.387-33.902-9.346-35.231-10.603V129.639c0-2.586,1.284-3.189,2.328-3.686l47.971-22.824     c5.879-2.799,10.313-3.41,10.313-16.33c0,0,0-17.778,0-23.705c0-3.75,3.503-3.662,3.503-3.662h103.25     c0,0,3.258-0.213,3.258,3.662c0,5.927,0,23.705,0,23.705c0,13.254,4.434,13.531,10.313,16.33l47.97,22.824     c1.044,0.496,2.329,1.1,2.329,3.686v25.081C289.228,154.72,290.192,159.958,283.192,159.958z M158.458,229.305h-14.432     c-6.874,0-12.446-5.572-12.446-12.446s5.572-12.446,12.446-12.446h14.043c0,0,3.094,0.144,3.094-2.871c0-3.566,0-14.267,0-14.267     c0-6.874,5.572-12.446,12.446-12.446s12.446,5.572,12.446,12.446c0,0,0,11.429,0,15.239c0,2.042,2.643,1.898,2.643,1.898h14.495     c6.874,0,12.446,5.572,12.446,12.446s-5.572,12.446-12.446,12.446h-14.008c0,0-3.129,0.046-3.129,2.478     c0,3.665,0,14.661,0,14.661c0,6.874-5.572,12.446-12.446,12.446s-12.446-5.572-12.446-12.446c0,0,0-10.851,0-14.467     C161.164,229.06,158.458,229.305,158.458,229.305z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <span>داروی بدون نسخه</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary text-white h-fit justify-start flex gap-4 items-center p-4"
                onClick={() =>
                  uploadAppend({
                    image: null,
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 347.219 347.219"
                >
                  <g>
                    <g id="Layer_5_28_">
                      <g>
                        <path d="M292.914,113.311l-47.97-22.824c-1.045-0.498-2.329-1.101-2.329-3.688c0,0,0-18.528,0-24.705     c0-2.5,2.993-2.662,2.993-2.662c16.385,0,27.609-13.33,27.609-29.716S259.887,0,243.502,0H103.717     C87.332,0,74.002,13.33,74.002,29.716s11.093,29.716,27.478,29.716c0,0,3.124-0.088,3.124,2.787c0,6.146,0,24.58,0,24.58     c0,2.754-1.284,3.189-2.328,3.688l-47.971,22.824c-5.879,2.797-10.313,5.075-10.313,16.328v188.316     c0,10.419,12.85,17.398,41.664,22.629c23.56,4.278,54.795,6.635,87.954,6.635s64.395-2.356,87.954-6.635     c28.814-5.23,41.664-12.21,41.664-22.629v-44.104V159.958V129.64C303.228,117.719,298.794,116.108,292.914,113.311z      M283.192,159.958c-43.878,0-175.513,0-175.513,0c-9.925,0-18,8.075-18,18v77.895c0,9.926,8.075,18,18,18c0,0,128.947,0,171.93,0     c9.75,0,9.62,6.618,9.62,6.618v36.605c-1.329,1.257-8.095,6.216-35.231,10.603c-22.101,3.572-50.649,5.541-80.386,5.541     s-58.286-1.969-80.386-5.541c-27.136-4.387-33.902-9.346-35.231-10.603V129.639c0-2.586,1.284-3.189,2.328-3.686l47.971-22.824     c5.879-2.799,10.313-3.41,10.313-16.33c0,0,0-17.778,0-23.705c0-3.75,3.503-3.662,3.503-3.662h103.25     c0,0,3.258-0.213,3.258,3.662c0,5.927,0,23.705,0,23.705c0,13.254,4.434,13.531,10.313,16.33l47.97,22.824     c1.044,0.496,2.329,1.1,2.329,3.686v25.081C289.228,154.72,290.192,159.958,283.192,159.958z M158.458,229.305h-14.432     c-6.874,0-12.446-5.572-12.446-12.446s5.572-12.446,12.446-12.446h14.043c0,0,3.094,0.144,3.094-2.871c0-3.566,0-14.267,0-14.267     c0-6.874,5.572-12.446,12.446-12.446s12.446,5.572,12.446,12.446c0,0,0,11.429,0,15.239c0,2.042,2.643,1.898,2.643,1.898h14.495     c6.874,0,12.446,5.572,12.446,12.446s-5.572,12.446-12.446,12.446h-14.008c0,0-3.129,0.046-3.129,2.478     c0,3.665,0,14.661,0,14.661c0,6.874-5.572,12.446-12.446,12.446s-12.446-5.572-12.446-12.446c0,0,0-10.851,0-14.467     C161.164,229.06,158.458,229.305,158.458,229.305z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <span>آپلود نسخه پزشک</span>
              </button>
              <button
                type="button"
                className="btn btn-warning text-white h-fit justify-start flex gap-4 items-center p-4"
                onClick={() =>
                  elecAppend({
                    trackingCode: "",
                    nationalCode: "",
                    typeOfInsurance: "",
                    doctorName: "",
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 347.219 347.219"
                >
                  <g>
                    <g id="Layer_5_28_">
                      <g>
                        <path d="M292.914,113.311l-47.97-22.824c-1.045-0.498-2.329-1.101-2.329-3.688c0,0,0-18.528,0-24.705     c0-2.5,2.993-2.662,2.993-2.662c16.385,0,27.609-13.33,27.609-29.716S259.887,0,243.502,0H103.717     C87.332,0,74.002,13.33,74.002,29.716s11.093,29.716,27.478,29.716c0,0,3.124-0.088,3.124,2.787c0,6.146,0,24.58,0,24.58     c0,2.754-1.284,3.189-2.328,3.688l-47.971,22.824c-5.879,2.797-10.313,5.075-10.313,16.328v188.316     c0,10.419,12.85,17.398,41.664,22.629c23.56,4.278,54.795,6.635,87.954,6.635s64.395-2.356,87.954-6.635     c28.814-5.23,41.664-12.21,41.664-22.629v-44.104V159.958V129.64C303.228,117.719,298.794,116.108,292.914,113.311z      M283.192,159.958c-43.878,0-175.513,0-175.513,0c-9.925,0-18,8.075-18,18v77.895c0,9.926,8.075,18,18,18c0,0,128.947,0,171.93,0     c9.75,0,9.62,6.618,9.62,6.618v36.605c-1.329,1.257-8.095,6.216-35.231,10.603c-22.101,3.572-50.649,5.541-80.386,5.541     s-58.286-1.969-80.386-5.541c-27.136-4.387-33.902-9.346-35.231-10.603V129.639c0-2.586,1.284-3.189,2.328-3.686l47.971-22.824     c5.879-2.799,10.313-3.41,10.313-16.33c0,0,0-17.778,0-23.705c0-3.75,3.503-3.662,3.503-3.662h103.25     c0,0,3.258-0.213,3.258,3.662c0,5.927,0,23.705,0,23.705c0,13.254,4.434,13.531,10.313,16.33l47.97,22.824     c1.044,0.496,2.329,1.1,2.329,3.686v25.081C289.228,154.72,290.192,159.958,283.192,159.958z M158.458,229.305h-14.432     c-6.874,0-12.446-5.572-12.446-12.446s5.572-12.446,12.446-12.446h14.043c0,0,3.094,0.144,3.094-2.871c0-3.566,0-14.267,0-14.267     c0-6.874,5.572-12.446,12.446-12.446s12.446,5.572,12.446,12.446c0,0,0,11.429,0,15.239c0,2.042,2.643,1.898,2.643,1.898h14.495     c6.874,0,12.446,5.572,12.446,12.446s-5.572,12.446-12.446,12.446h-14.008c0,0-3.129,0.046-3.129,2.478     c0,3.665,0,14.661,0,14.661c0,6.874-5.572,12.446-12.446,12.446s-12.446-5.572-12.446-12.446c0,0,0-10.851,0-14.467     C161.164,229.06,158.458,229.305,158.458,229.305z" />
                      </g>
                    </g>
                  </g>
                </svg>
                <span>نسخه بیمه</span>
              </button>
              <button
                type="button"
                className="btn btn-ghost text-grey-800 h-fit justify-start flex gap-4 items-center p-4"
                onClick={() => setIsSelectAddressDialogOpen(true)}
              >
                <svg
                  fill="currentColor"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 297 297"
                >
                  <g>
                    <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645   c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645   C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892   c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z" />
                    <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614   c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901   c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104   C179.265,127.948,165.464,141.901,148.5,141.901z" />
                  </g>
                </svg>
                <span>تغییر آدرس</span>
              </button>
            </div>
            {address ? (
              <strong className="line-clamp-1 lg:line-clamp-none">
                <span className="font-light">آدرس: </span>
                {address.address}
              </strong>
            ) : null}
            <Textarea
              label="توضیحات"
              className="textarea textarea-bordered resize-none w-full min-h-24"
              {...register("description")}
            />

            <button
              className="btn btn-primary mt-0 lg:mt-auto"
              disabled={!isValid || !isDirty}
            >
              تایید نسخه
            </button>
          </div>
        </div>
        <div className="w-full lg:w-9/12 h-full">
          <div className="h-full max-h-container-custom-mobile lg:max-h-container-custom overflow-auto p-5 border rounded-md flex flex-col gap-4">
            {otcFields.length === 0 &&
            uploadFields.length === 0 &&
            elecFields.length === 0 ? (
              <h1 className="text-lg lg:text-xl p-4 m-auto text-center flex items-center gap-2">
                <span className="icon-Add-16 text-2xl"></span>
                برای اضافه کردن دارو یا نسخه به سفارش از دکمه های کنار صفحه
                استفاده کنید.
              </h1>
            ) : null}
            {otcFields.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 border border-success rounded-md p-4"
              >
                <div className="flex gap-2 items-center">
                  <h4>داروی بدون نسخه {index + 1}</h4>
                  <label className="form-control ms-auto">
                    <input
                      type="file"
                      className="hidden"
                      {...register(`otc.${index}.image`)}
                    />
                    <span className="btn btn-primary btn-square">
                      <svg
                        fill="currentColor"
                        height="24px"
                        width="240px"
                        version="1.1"
                        viewBox="0 0 350 350"
                        enableBackground="new 0 0 350 350"
                      >
                        <path d="M5,350h340V0H5V350z M25,330v-62.212h300V330H25z M179.509,247.494H60.491L120,171.253L179.509,247.494z   M176.443,211.061l33.683-32.323l74.654,69.05h-79.67L176.443,211.061z M325,96.574c-6.384,2.269-13.085,3.426-20,3.426  c-33.084,0-60-26.916-60-60c0-6.911,1.156-13.612,3.422-20H325V96.574z M25,20h202.516C225.845,26.479,225,33.166,225,40  c0,44.112,35.888,80,80,80c6.837,0,13.523-0.846,20-2.518v130.306h-10.767l-104.359-96.526l-45.801,43.951L120,138.748  l-85.109,109.04H25V20z" />
                      </svg>
                    </span>
                  </label>
                  <button
                    type="button"
                    className="btn btn-error btn-square text-white"
                    onClick={() => otcRemove(index)}
                  >
                    <span className="icon-Trash-16 text-2xl"></span>
                  </button>
                </div>

                <Input
                  placeholder="نام دارو"
                  className="input input-bordered w-full"
                  {...register(`otc.${index}.drugName`, {
                    required: true,
                  })}
                />
                <Input
                  className="input input-bordered w-full"
                  placeholder="نوع دارو"
                  {...register(`otc.${index}.type`, {
                    required: true,
                  })}
                />
                <Controller
                  control={control}
                  name={`otc.${index}.count`}
                  rules={{
                    required: true,
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <NumericFormat
                      customInput={Input}
                      className="input input-bordered w-full"
                      placeholder="تعداد"
                      value={value}
                      onValueChange={({ value: v }) => onChange(v)}
                      error={error}
                      allowNegative={false}
                      suffix=" عدد"
                      thousandSeparator
                    />
                  )}
                />
                {watch(`otc.${index}.image`) ? (
                  <div className="flex w-fit p-4 rounded-md items-center gap-3 border border-success">
                    <img
                      src={URL.createObjectURL(
                        watch(`otc.${index}.image`)?.[0] || new Blob()
                      )}
                      className="w-14 h-14 min-w-14 object-contain"
                      alt="perc"
                    />
                    <button
                      type="button"
                      className="btn btn-error btn-square btn-sm text-white"
                      onClick={() => setValue(`otc.${index}.image`, null)}
                    >
                      <span className="icon-Close-16 text-lg"></span>
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
            {uploadFields.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 border border-secondary rounded-md p-4"
              >
                <div className="flex gap-2 items-center">
                  <h4>نسخه پزشک {index + 1}</h4>
                  <label className="form-control ms-auto">
                    <input
                      type="file"
                      className="hidden"
                      {...register(`uploadPerscription.${index}.image`, {
                        required: true,
                      })}
                    />
                    <span className="btn btn-primary btn-square">
                      <svg
                        fill="currentColor"
                        height="24px"
                        width="240px"
                        version="1.1"
                        viewBox="0 0 350 350"
                        enableBackground="new 0 0 350 350"
                      >
                        <path d="M5,350h340V0H5V350z M25,330v-62.212h300V330H25z M179.509,247.494H60.491L120,171.253L179.509,247.494z   M176.443,211.061l33.683-32.323l74.654,69.05h-79.67L176.443,211.061z M325,96.574c-6.384,2.269-13.085,3.426-20,3.426  c-33.084,0-60-26.916-60-60c0-6.911,1.156-13.612,3.422-20H325V96.574z M25,20h202.516C225.845,26.479,225,33.166,225,40  c0,44.112,35.888,80,80,80c6.837,0,13.523-0.846,20-2.518v130.306h-10.767l-104.359-96.526l-45.801,43.951L120,138.748  l-85.109,109.04H25V20z" />
                      </svg>
                    </span>
                  </label>
                  <button
                    type="button"
                    className="btn btn-error btn-square text-white"
                    onClick={() => uploadRemove(index)}
                  >
                    <span className="icon-Trash-16 text-2xl"></span>
                  </button>
                </div>

                {watch(`uploadPerscription.${index}.image`) ? (
                  <div className="flex w-fit p-4 rounded-md items-center gap-3 border border-secondary">
                    <img
                      src={URL.createObjectURL(
                        watch(`uploadPerscription.${index}.image`)?.[0] ||
                          new Blob()
                      )}
                      className="w-14 h-14 min-w-14 object-contain"
                      alt="perc"
                    />
                    <button
                      type="button"
                      className="btn btn-error btn-square btn-sm text-white"
                      onClick={() =>
                        setValue(`uploadPerscription.${index}.image`, null)
                      }
                    >
                      <span className="icon-Close-16 text-lg"></span>
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
            {elecFields.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 border border-warning rounded-md p-4"
              >
                <div className="flex gap-2 items-center">
                  <h4>نسخه بیمه {index + 1}</h4>
                  <button
                    type="button"
                    className="btn btn-error btn-square text-white ms-auto"
                    onClick={() => elecRemove(index)}
                  >
                    <span className="icon-Trash-16 text-2xl"></span>
                  </button>
                </div>

                <Input
                  placeholder="کد پیگیری"
                  className="input input-bordered w-full"
                  {...register(`elecPerscription.${index}.trackingCode`, {
                    required: true,
                  })}
                />
                <Input
                  placeholder="کد ملی"
                  className="input input-bordered w-full"
                  {...register(`elecPerscription.${index}.nationalCode`, {
                    required: true,
                  })}
                />
                <Input
                  placeholder="نام دکتر"
                  className="input input-bordered w-full"
                  {...register(`elecPerscription.${index}.doctorName`, {
                    required: true,
                  })}
                />
                <Input
                  placeholder="نوع بیمه"
                  className="input input-bordered w-full"
                  {...register(`elecPerscription.${index}.typeOfInsurance`, {
                    required: true,
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
      <SelectAddressDialog
        isOpen={isSelectAddressDialogOpen || !address}
        closeModal={() => setIsSelectAddressDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Dashboard;

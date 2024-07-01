import { Input } from "@/components/input";
import {
  dashboard_form,
  INSURANCE_LABEL,
  TYPE_LABEL,
  TYPE_MAX,
  TYPE_STEP,
} from "@/model";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Fragment, useState } from "react";
import { StatelessSelect } from "@/components/statelessSelect";

interface IDashboardOrderProps {
  nextStep: () => void;
}

function DashboardOrder({ nextStep }: IDashboardOrderProps) {
  useState(false);

  const {
    control,
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { isValid },
  } = useFormContext<dashboard_form>();

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
    name: "uploadPrescription",
  });

  const {
    fields: elecFields,
    append: elecAppend,
    remove: elecRemove,
  } = useFieldArray({
    control,
    name: "elecPrescription",
  });

  const onSubmit = () => nextStep();

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:h-full flex flex-col-reverse h-full lg:flex-row gap-4 relative"
      >
        <div className="w-full lg:w-3/12 lg:h-full">
          <div className="h-full max-h-container-custom flex flex-col gap-4">
            <div className="flex flex-col pb-1 lg:pb-0 gap-4">
              <button
                type="button"
                className="btn btn-secondary h-fit justify-start flex gap-4 items-center p-4"
                onClick={() =>
                  otcAppend({
                    drugName: "",
                    type: "",
                    count: "1",
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
                className="btn btn-secondary text-white h-fit justify-start flex gap-4 items-center p-4"
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
                <span>نسخه الکترونیکی بیمه</span>
              </button>
            </div>
            {/* <Textarea
              label="توضیحات"
              className="textarea textarea-bordered resize-none w-full min-h-24"
              {...register("description")}
            /> */}
            <button
              className="btn btn-primary mt-0 lg:mt-auto"
              disabled={!isValid}
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
                className="flex flex-col gap-3 border bg-white border-success rounded-md p-4"
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
                  className="input input-bordered bg-white w-full"
                  {...register(`otc.${index}.drugName`, {
                    required: true,
                  })}
                />
                <Controller
                  control={control}
                  name={`otc.${index}.type`}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <StatelessSelect
                      containerClassName="w-full"
                      placeholder="نوع دارو"
                      options={[
                        "CAPSULE",
                        "TAB",
                        "CAPSULE_PACKAGE",
                        "TAB_PACKAGE",
                        "DROPLET",
                        "OINTMENT",
                        "DRINK",
                        "OTHER",
                      ]}
                      optionDictionary={TYPE_LABEL}
                      selected={value}
                      setSelected={(op) => {
                        setValue(`otc.${index}.count`, "1");
                        onChange(op);
                      }}
                    />
                  )}
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
                      className="input input-bordered bg-white w-full text-center pointer-events-none"
                      placeholder="تعداد"
                      value={value}
                      onValueChange={({ value: v }) => onChange(v)}
                      error={error}
                      allowNegative={false}
                      suffix={` ${
                        TYPE_STEP[watch(`otc.${index}.type`)] || "عدد"
                      }`}
                      elementStart={
                        <button
                          type="button"
                          className="text-secondary disabled:text-slate-100 absolute start-4 top-1/2 -translate-y-1/2"
                          onClick={() => {
                            if (
                              +value <
                              (TYPE_MAX[watch(`otc.${index}.type`)] || 10)
                            )
                              onChange(+value + 1);
                          }}
                          disabled={
                            +watch(`otc.${index}.count`) >=
                            (TYPE_MAX[watch(`otc.${index}.type`)] || 10)
                          }
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
                        </button>
                      }
                      elementEnd={
                        <button
                          type="button"
                          className="text-secondary disabled:text-slate-100 absolute end-4 top-1/2 -translate-y-1/2"
                          onClick={() => {
                            if (+value > 1) onChange(+value - 1);
                          }}
                          disabled={+watch(`otc.${index}.count`) <= 1}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            height="16px"
                            width="16px"
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 52.161 52.161"
                          >
                            <g>
                              <path d="M52.161,26.081c0,3.246-2.63,5.875-5.875,5.875H5.875C2.63,31.956,0,29.327,0,26.081l0,0c0-3.245,2.63-5.875,5.875-5.875   h40.411C49.531,20.206,52.161,22.835,52.161,26.081L52.161,26.081z" />
                            </g>
                          </svg>
                        </button>
                      }
                      thousandSeparator
                    />
                  )}
                />
                {watch(`otc.${index}.image`) ? (
                  <div className="flex w-fit p-4 rounded-md items-center gap-3 border border-success">
                    <img
                      src={URL.createObjectURL(
                        (watch(`otc.${index}.image`)?.[0] as Blob) || new Blob()
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
                className="flex flex-col gap-3 border bg-white border-secondary rounded-md p-4"
              >
                <div className="flex gap-2 items-center">
                  <h4>نسخه پزشک {index + 1}</h4>
                  <label className="form-control ms-auto">
                    <input
                      type="file"
                      className="hidden"
                      {...register(`uploadPrescription.${index}.image`, {
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

                {watch(`uploadPrescription.${index}.image`) ? (
                  <div className="flex w-fit p-4 rounded-md items-center gap-3 border border-secondary">
                    <img
                      src={URL.createObjectURL(
                        (watch(
                          `uploadPrescription.${index}.image`
                        )?.[0] as Blob) || new Blob()
                      )}
                      className="w-14 h-14 min-w-14 object-contain"
                      alt="perc"
                    />
                    <button
                      type="button"
                      className="btn btn-error btn-square btn-sm text-white"
                      onClick={() =>
                        setValue(`uploadPrescription.${index}.image`, null)
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
                className="flex flex-col gap-3 border bg-white border-warning rounded-md p-4"
              >
                <div className="flex gap-2 items-center">
                  <h4>نسخه الکترونیکی بیمه {index + 1}</h4>
                  <button
                    type="button"
                    className="btn btn-error btn-square text-white ms-auto"
                    onClick={() => elecRemove(index)}
                  >
                    <span className="icon-Trash-16 text-2xl"></span>
                  </button>
                </div>
                <Controller
                  control={control}
                  name={`elecPrescription.${index}.typeOfInsurance`}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { value, onChange } }) => (
                    <StatelessSelect
                      containerClassName="w-full"
                      placeholder="نوع بیمه"
                      options={["TAMIN", "SALAMAT"]}
                      optionDictionary={INSURANCE_LABEL}
                      selected={value}
                      setSelected={onChange}
                    />
                  )}
                />
                <Input
                  type="number"
                  placeholder="کد پیگیری"
                  className="input input-bordered bg-white w-full"
                  {...register(`elecPrescription.${index}.trackingCode`, {
                    required: true,
                  })}
                />
                <Input
                  type="number"
                  placeholder="کد ملی"
                  className="input input-bordered bg-white w-full"
                  {...register(`elecPrescription.${index}.nationalCode`, {
                    required: true,
                  })}
                />
                <Input
                  placeholder="نام دکتر"
                  className="input input-bordered bg-white w-full"
                  {...register(`elecPrescription.${index}.doctorName`, {
                    required: true,
                  })}
                />
              </div>
            ))}
          </div>
        </div>
      </form>
    </Fragment>
  );
}

export { DashboardOrder };

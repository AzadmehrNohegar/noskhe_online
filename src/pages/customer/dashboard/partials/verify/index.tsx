import { postUserOrderCreate, postUserOrderPersonCreate } from "@/api/user";
import { Textarea } from "@/components/textarea";
import { dashboard_form, INSURANCE_LABEL, TYPE_STEP } from "@/model";
import { useAddressStore } from "@/store/address";
import { useMiscStore } from "@/store/misc";
import { useToastStore } from "@/store/toast";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useOrderRequestGenerator } from "@/utils/useOrderRequestGenerator";
import { IconWrapper } from "@/shared/iconWrapper";

interface IDashboardVerifyProps {
  prevStep: () => void;
}

function DashboardVerify({ prevStep }: IDashboardVerifyProps) {
  const {
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
      {!getValues().isPerson ? (
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
          <h2 className="font-semibold text-lg lg:text-xl">زمان ارسال</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-sm lg:text-base flex items-center gap-2">
                <IconWrapper
                  className="icon-clock-square16 text-gray-500"
                  iconSize="medium"
                />
                سریع‌ترین زمان ممکن
                <strong className="text-gray-700 text-xs ms-auto">
                  {(200000).toLocaleString()}{" "}
                  <span className="font-light">ریال</span>
                </strong>
              </h3>
            </div>
          </div>
        </div>
      ) : null}
      {getValues().isPerson ? (
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
          <h2 className="font-semibold text-lg lg:text-xl">جزییات داروخانه</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-sm lg:text-base flex items-center gap-2">
                <IconWrapper
                  className="icon-Home-16 text-gray-500"
                  iconSize="medium"
                />
                {getValues().pharmacy?.pharmacyName}
                <strong className="text-gray-700 text-xs ms-auto">
                  {getValues().pharmacy?.address}
                </strong>
              </h3>
              <h3 className="text-primary text-sm lg:text-base flex items-center gap-2">
                <IconWrapper
                  className="icon-Bill-List-16 text-gray-500"
                  iconSize="medium"
                />
                هزینه خدمات
                <strong className="text-gray-700 text-xs ms-auto">
                  {(50000).toLocaleString()}{" "}
                  <span className="font-light">ریال</span>
                </strong>
              </h3>
            </div>
          </div>
        </div>
      ) : null}
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
  );
}

export { DashboardVerify };

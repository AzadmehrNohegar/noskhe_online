import {
  postUserOrderAddOTC,
  postUserOrderCreate,
  postUserOrderElecPrescription,
  postUserOrderUploadPrescription,
} from "@/api/user";
import { dashboard_form } from "@/model";
import { useAddressStore } from "@/store/address";
import { useToastStore } from "@/store/toast";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

function DashboardVerify() {
  const { getValues } = useFormContext<dashboard_form>();

  const navigate = useNavigate();

  const { stackToast } = useToastStore();
  const { address } = useAddressStore();
  const { convertPersian2English } = usePersianConvert();

  const createOrder = useMutation(postUserOrderCreate);
  const addOTC = useMutation(postUserOrderAddOTC);
  const uploadPrescription = useMutation(postUserOrderUploadPrescription);
  const elecPrescription = useMutation(postUserOrderElecPrescription);

  const onSubmit = (values: dashboard_form) => {
    createOrder
      .mutateAsync({
        body: {
          addressId: address!._id,
          description: values.description,
        },
      })
      .then(async (res) => {
        const otcRequests = values.otc.map((el) => {
          if (el.image) {
            const formData = new FormData();
            formData.append("orderId", res.data.data.orderId);
            formData.append("count", convertPersian2English(el.count));
            formData.append("image", el.image[0]);
            formData.append("type", el.type);
            return addOTC.mutateAsync({
              body: formData,
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
          return addOTC.mutateAsync({
            body: {
              orderId: res.data.data.orderId,
              drugName: el.drugName,
              count: +convertPersian2English(el.count),
              type: el.type,
            },
          });
        });
        const uploadRequests = values.uploadPrescription.map((el) => {
          if (el.image) {
            const formData = new FormData();
            formData.append("orderId", res.data.data.orderId);
            formData.append("image", el.image[0]);
            return uploadPrescription.mutateAsync({
              body: formData,
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
        });
        const elecRequests = values.elecPrescription.map((el) => {
          return elecPrescription.mutateAsync({
            body: {
              orderId: res.data.data.orderId,
              trackingCode: +convertPersian2English(el.trackingCode),
              nationalCode: +convertPersian2English(el.nationalCode),
              typeOfInsurance: el.typeOfInsurance,
              doctorName: el.doctorName,
            },
          });
        });
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
  console.log(onSubmit);
  return <div>{JSON.stringify(getValues())}</div>;
}

export { DashboardVerify };

import { dashboard_form } from "@/model";
import { usePersianConvert } from "../usePersianConvert";
import {
  postUserOrderAddOTC,
  postUserOrderElecPrescription,
  postUserOrderUploadPrescription,
} from "@/api/user";
import { useMutation } from "react-query";

const useOrderRequestGenerator = () => {
  const { convertPersian2English } = usePersianConvert();

  const addOTC = useMutation(postUserOrderAddOTC);
  const uploadPrescription = useMutation(postUserOrderUploadPrescription);
  const elecPrescription = useMutation(postUserOrderElecPrescription);

  const generateOrderRequests = (values: dashboard_form, orderId: string) => {
    const otcRequests = values.otc.map((el) => {
      if (el.image) {
        const formData = new FormData();
        formData.append("orderId", orderId);
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
          orderId: orderId,
          drugName: el.drugName,
          count: +convertPersian2English(el.count),
          type: el.type,
        },
      });
    });
    const uploadRequests = values.uploadPrescription.map((el) => {
      if (el.image) {
        const formData = new FormData();
        formData.append("orderId", orderId);
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
          orderId: orderId,
          trackingCode: +convertPersian2English(el.trackingCode),
          nationalCode: +convertPersian2English(el.nationalCode),
          typeOfInsurance: el.typeOfInsurance,
          doctorName: el.doctorName,
        },
      });
    });
    return { otcRequests, uploadRequests, elecRequests };
  };
  return { generateOrderRequests };
};

export { useOrderRequestGenerator };

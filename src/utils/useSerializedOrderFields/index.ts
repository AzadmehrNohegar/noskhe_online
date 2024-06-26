import { dashboard_form } from "@/model";

const useSerializedOrderFields = () => {
  const getSerializedValues = (values: dashboard_form): dashboard_form => {
    const { otc, uploadPrescription, ...rest } = values;
    const serializedOtc = otc.map((item) => {
      if (item.image)
        return {
          ...item,
          image: Array.from(item.image),
        };
      return item;
    });
    const serializedUploadPrescription = uploadPrescription.map((item) => {
      if (item.image)
        return {
          ...item,
          image: Array.from(item.image),
        };
      return item;
    });
    return {
      otc: serializedOtc,
      uploadPrescription: serializedUploadPrescription,
      ...rest,
    };
  };

  return { getSerializedValues };
};

export { useSerializedOrderFields };

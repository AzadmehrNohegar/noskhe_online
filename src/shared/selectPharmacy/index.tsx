import { postUserOrderPersonPharmacyList } from "@/api/user";
import { Dialog } from "@/components/dialog";
import { dashboard_form, IExtendedDialogProps, pharmacy_list } from "@/model";
import { useAddressStore } from "@/store/address";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { Controller, useForm, useFormContext } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

interface ISelectPharmacyDialogForm {
  pharmacy: pharmacy_list | null;
}

interface ISelectPharmacyDialog extends IExtendedDialogProps {
  action: () => void;
}

function SelectPharmacyDialog(props: ISelectPharmacyDialog) {
  const { isOpen, closeModal, action } = props;

  const { address } = useAddressStore();

  const { setValue } = useFormContext<dashboard_form>();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ISelectPharmacyDialogForm>({
    defaultValues: {
      pharmacy: null,
    },
  });

  const { data: pharmacyList, isLoading } = useQuery("pharmacy-list", () =>
    postUserOrderPersonPharmacyList({
      body: {
        addressId: address?._id,
      },
    })
  );

  const onSubmit = (values: ISelectPharmacyDialogForm) => {
    setValue("pharmacy", values.pharmacy, { shouldValidate: true });
    setValue("isPerson", true, { shouldValidate: true });
    action();
    closeModal();
  };

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title className="flex items-center p-4 bg-primary-10 border-b border-b-primary-200 rounded-t-1.5lg">
        <span className="font-semibold text-primary-800 me-auto">
          انتخاب داروخانه
        </span>
      </Dialog.Title>
      <Dialog.Panel
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-x-4 gap-y-6 p-4"
      >
        {!isLoading &&
        (pharmacyList?.data.result.data as unknown as pharmacy_list[])
          .length === 0 ? (
          <span className="text-start">داروخانه‌ای یافت نشد.</span>
        ) : null}
        <Controller
          control={control}
          name="pharmacy"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              value={value}
              as="div"
              className="flex flex-col gap-3 overflow-y-auto max-h-64 pe-2"
              onChange={onChange}
              by="_id"
            >
              {isLoading ? (
                <Skeleton
                  height={40}
                  count={4}
                  inline
                  containerClassName="flex flex-col gap-3"
                />
              ) : null}
              {(
                pharmacyList?.data.result.data as unknown as pharmacy_list[]
              )?.map((item: pharmacy_list) => (
                <RadioGroup.Option
                  key={item._id}
                  value={item}
                  as="button"
                  type="button"
                  className="cursor-pointer relative"
                >
                  {({ checked }) => (
                    <div
                      className={clsx(
                        "btn btn-block btn-lg justify-start text-start flex-nowrap",
                        checked && "btn-primary",
                        !checked && "bg-white btn-ghost"
                      )}
                    >
                      <div className="w-6 min-w-6 h-6 bg-white border rounded-full border-gray-500 flex items-center justify-center">
                        {checked ? (
                          <div className="w-4 min-w-4 h-4 bg-primary rounded-full" />
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-2">
                        <span>{item.pharmacyName}</span>
                        <span className="line-clamp-1">{item.address}</span>
                      </div>
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          )}
        />
        <div className="flex items-center justify-end border-t border-t-gray-100 pt-4 gap-3">
          <button
            type="button"
            className="btn btn-link btn-custom text-gray-800"
            onClick={closeModal}
          >
            انصراف
          </button>
          <button
            className="btn btn-primary btn-custom btn-wide"
            disabled={!isValid}
          >
            انتخاب داروخانه
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { SelectPharmacyDialog };

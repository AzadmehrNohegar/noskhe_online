/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUserAddressList } from "@/api/user";
import { Dialog } from "@/components/dialog";
import { address, IExtendedDialogProps } from "@/model";
import { useAddressStore } from "@/store/address";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { RadioGroup } from "@headlessui/react";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

interface ISelectAddressStepForm {
  address: address | null;
}

function SelectAddressStep({ closeModal }: IExtendedDialogProps) {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const { setAddress } = useAddressStore();

  const handleAdd = () => {
    searchParams.set("step", "add");
    setSearchParams(searchParams);
  };

  const { data: addressList, isLoading } = useQuery("address-list", () =>
    getUserAddressList({})
  );

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<ISelectAddressStepForm>({
    defaultValues: {
      address: null,
    },
  });

  const onSubmit = (values: ISelectAddressStepForm) => {
    setAddress(values.address!);
    closeModal();
  };

  return (
    <Dialog.Panel
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-x-4 gap-y-6 p-4"
    >
      {!isLoading && (addressList as any)?.data.address?.length === 0 ? (
        <span className="text-start">آدرسی از قبل مشخص نکرده‌اید.</span>
      ) : null}
      <Controller
        control={control}
        name="address"
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
            {(addressList as any)?.data.address?.map((item: address) => (
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
                      "btn btn-block justify-start text-start flex-nowrap",
                      checked && "btn-primary",
                      !checked && "bg-white btn-ghost"
                    )}
                  >
                    <div className="w-6 min-w-6 h-6 bg-white border rounded-full border-gray-500 flex items-center justify-center">
                      {checked ? (
                        <div className="w-4 min-w-4 h-4 bg-primary rounded-full" />
                      ) : null}
                    </div>
                    <span className="line-clamp-1">{item.address}</span>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        )}
      />
      <button
        type="button"
        className="btn btn-block btn-secondary"
        onClick={handleAdd}
      >
        <span className="icon-Add-16 text-xl"></span>
        افزودن آدرس
      </button>
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
          disabled={!isValid || !isDirty}
        >
          انتخاب آدرس
        </button>
      </div>
    </Dialog.Panel>
  );
}

export { SelectAddressStep };

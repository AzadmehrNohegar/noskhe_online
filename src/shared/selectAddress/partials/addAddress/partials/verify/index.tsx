import { postUserAddressAdd } from "@/api/user";
import { Checkbox } from "@/components/checkbox";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { MOBILE_FORMAT } from "@/constants/variables";
import { add_address_form, IExtendedDialogProps } from "@/model";
import { NoskheMapElement } from "@/modules/map/noskheMapElement";
import { NoskheMapMarker } from "@/modules/map/noskheMapmarker";
import { useToastStore } from "@/store/toast";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { Controller, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

interface IAddAddressVerifyProps extends IExtendedDialogProps {
  handleStep: (step: "map" | "verify") => void;
}

function AddAddressVerify({ handleStep }: IAddAddressVerifyProps) {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useFormContext<add_address_form>();

  const [searchParams, setSearchParams] = useDebouncedSearchParams();
  const queryClient = useQueryClient();

  const { convertPersian2English } = usePersianConvert();
  const { stackToast } = useToastStore();

  const handleSelect = () => {
    searchParams.delete("step");
    setSearchParams(searchParams);
  };

  const createAddress = useMutation(postUserAddressAdd, {
    onSuccess: () => {
      stackToast({
        title: "آدرس با موفقیت اضافه شد.",
        options: {
          type: "success",
        },
      });
      queryClient.invalidateQueries();
      handleSelect();
    },
  });

  const onSubmit = (values: add_address_form) =>
    createAddress.mutate({
      body: {
        ...values,
        phone: convertPersian2English(values.phone),
      },
    });

  return (
    <Dialog.Panel
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-end gap-4 p-4"
    >
      <div className="w-full basis-full h-52 relative">
        <NoskheMapElement
          center={[watch("lng"), watch("lat")]}
          interactive={false}
          zoom={[16]}
          className="z-10"
          containerStyle={{
            outerHeight: "100%",
            innerHeight: "100%",
            width: "100%",
            outerWidth: "100%",
            height: "208px",
            borderRadius: "8px",
            pointerEvents: "none",
          }}
        >
          <NoskheMapMarker
            coordinates={[watch("lng"), watch("lat")]}
            anchor="bottom"
          />
        </NoskheMapElement>
        <button
          type="submit"
          onClick={() => handleStep("map")}
          className="absolute left-2 bottom-2 z-10 btn btn-primary btn-square btn-sm"
        >
          <span className="icon-Edit-16 text-xl"></span>
        </button>
      </div>
      <Input
        label="آدرس کامل"
        placeholder="آدرس کامل را وارد کنید."
        containerClassName="basis-modified2"
        className="input input-bordered w-full"
        {...register("address", {
          required: true,
        })}
      />
      <Input
        label="استان"
        placeholder="استان را وارد کنید."
        containerClassName="basis-modified2"
        className="input input-bordered w-full"
        {...register("province", {
          required: true,
        })}
      />
      <Input
        label="شهر"
        placeholder="شهر را وارد کنید."
        containerClassName="basis-modified2"
        className="input input-bordered w-full"
        {...register("city", {
          required: true,
        })}
      />
      <Input
        label="نام گیرنده"
        placeholder="نام گیرنده را وارد کنید."
        containerClassName="basis-modified2"
        className="input input-bordered w-full"
        {...register("fullName", {
          required: true,
        })}
      />
      <Input
        label="شماره تماس گیرنده"
        placeholder="شماره تماس گیرنده را وارد کنید."
        containerClassName="basis-modified2"
        className="input input-bordered w-full"
        {...register("phone", {
          required: true,
          validate: (value) => {
            if (
              convertPersian2English(value).match(MOBILE_FORMAT) &&
              value.length === 11
            )
              return;
            return "شماره موبایل نادرست است.";
          },
        })}
      />
      <Controller
        control={control}
        name="myself"
        render={({ field: { value, onChange } }) => (
          <Checkbox
            label="گیرنده هستم."
            containerClassName="basis-modified2 justify-end"
            className="checkbox checkbox-success"
            checked={value}
            onChange={onChange}
          />
        )}
      />

      <div className="flex items-center justify-end border-t border-t-grey-100 pt-4 gap-3 basis-full">
        <button
          className="btn btn-link btn-custom text-grey-800"
          onClick={handleSelect}
        >
          انصراف
        </button>
        <button
          className="btn btn-primary btn-custom btn-wide"
          disabled={!isValid || !isDirty}
        >
          ذخیره آدرس
        </button>
      </div>
    </Dialog.Panel>
  );
}

export { AddAddressVerify };

import { postPharmacyWalletCardToIban } from "@/api/pharmacy";
import { Dialog } from "@/components/dialog";
import { Input } from "@/components/input";
import { BANKS, iban_response, IExtendedDialogProps } from "@/model";
import { useBankHelpers } from "@/utils/useBankHelpers";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { useMutation } from "react-query";

interface IWalletAddShebaDialogSelectStepProps extends IExtendedDialogProps {
  nextStep: () => void;
}

interface IWalletAddShebaDialogSelectStepForm {
  cardNum: string;
}

function WalletAddShebaDialogSelectStep({
  nextStep,
  closeModal,
}: IWalletAddShebaDialogSelectStepProps) {
  const { bankCardHelper } = useBankHelpers();
  const { convertPersian2English } = usePersianConvert();

  const { setValue } = useFormContext<iban_response>();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<IWalletAddShebaDialogSelectStepForm>({
    defaultValues: {
      cardNum: "",
    },
  });

  const postCard = useMutation(postPharmacyWalletCardToIban, {
    onSuccess: (res) => {
      const { IBAN, bankName, cardNumber, name } = res.data.data;
      setValue("IBAN", IBAN);
      setValue("bankName", bankName);
      setValue("cardNumber", cardNumber);
      setValue("name", name);

      nextStep();
    },
  });

  const onSubmit = (values: IWalletAddShebaDialogSelectStepForm) =>
    postCard.mutate({
      body: {
        cardNum: convertPersian2English(values.cardNum),
      },
    });

  return (
    <Dialog.Panel
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-x-4 gap-y-6 p-4 text-start"
    >
      <Controller
        control={control}
        name="cardNum"
        rules={{
          required: "این فیلد ضروری است.",
          minLength: {
            message: "طول شماره کارت باید ۱۶ رقم باشد.",
            value: 16,
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <PatternFormat
            value={value}
            onValueChange={({ value: val }) => onChange(val)}
            label="شماره کارت"
            placeholder="شماره کارت را وارد کنید"
            format="#### #### #### ####"
            customInput={Input}
            className="input input-bordered w-full ltr placeholder:text-end"
            isAllowed={(values) => !values.value.includes("-")}
            error={error}
            elementStart={
              <span
                tabIndex={-1}
                className="inline-flex items-center min-w-max gpa-2 absolute start-4 gap-2 peer-placeholder-shown:hidden"
              >
                {bankCardHelper(value.trim()) ? (
                  <img
                    src={`/images/banks/${bankCardHelper(value.trim())}.svg`}
                    width={24}
                    height={24}
                    alt=""
                  />
                ) : null}

                {BANKS[bankCardHelper(value.trim()) || ""]}
              </span>
            }
          />
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
          تایید شماره کارت
        </button>
      </div>
    </Dialog.Panel>
  );
}

export { WalletAddShebaDialogSelectStep };

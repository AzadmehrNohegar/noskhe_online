import { patchPharmacyWalletEditIban } from "@/api/pharmacy";
import { Dialog } from "@/components/dialog";
import { iban_response, IExtendedDialogProps } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { useToastStore } from "@/store/toast";
import { useBankHelpers } from "@/utils/useBankHelpers";
import { useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

interface IWalletAddShebaDialogConfirmStepProps extends IExtendedDialogProps {
  prevStep: () => void;
}

function WalletAddShebaDialogConfirmStep({
  prevStep,
  closeModal,
}: IWalletAddShebaDialogConfirmStepProps) {
  const queryClient = useQueryClient();
  const { stackToast } = useToastStore();
  const { bankCardHelper } = useBankHelpers();

  const { watch, handleSubmit } = useFormContext<iban_response>();

  const editIban = useMutation(patchPharmacyWalletEditIban, {
    onSuccess: () => {
      stackToast({
        title: "شماره شبا با موفقیت ثبت شد.",
        options: {
          type: "success",
        },
      });
      queryClient.invalidateQueries();
      closeModal();
    },
  });

  const onSubmit = (values: iban_response) =>
    editIban.mutate({
      body: {
        ...values,
      },
    });

  return (
    <Dialog.Panel
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-x-4 gap-y-6 p-4 text-start"
    >
      <ul className="flex flex-col divide-y divide-gray-200 text-sm">
        <li className="flex items-center justify-between py-2">
          <strong>شماره شبا: </strong>
          <span className="text-gray-600">{watch("IBAN")}</span>
        </li>
        <li className="flex items-center justify-between py-2">
          <strong>شماره کارت: </strong>
          <span className="text-gray-600">{watch("cardNumber")}</span>
        </li>
        <li className="flex items-center justify-between py-2">
          <strong>نام مالک حساب: </strong>
          <span className="text-gray-600">{watch("name")}</span>
        </li>

        <li className="flex items-center justify-between py-2">
          <strong>نام بانک: </strong>
          <span className="text-gray-600 inline-flex items-center gap-2">
            {watch("bankName")}
            <img
              src={`/images/banks/${bankCardHelper(watch("cardNumber"))}.svg`}
              width={24}
              height={24}
              alt=""
            />
          </span>
        </li>
      </ul>
      <div className="flex items-center justify-between ms-auto">
        <button className="btn btn-link px-0 text-primary" onClick={prevStep}>
          <IconWrapper iconSize="medium" className="icon-Edit-16" />
          <span>تدوین شماره کارت</span>
        </button>
      </div>
      <div className="flex items-center justify-end border-t border-t-gray-100 pt-4 gap-3">
        <button
          type="button"
          className="btn btn-link btn-custom text-gray-800"
          onClick={closeModal}
        >
          انصراف
        </button>
        <button className="btn btn-primary btn-custom btn-wide">
          تایید شماره شبا
        </button>
      </div>
    </Dialog.Panel>
  );
}

export { WalletAddShebaDialogConfirmStep };

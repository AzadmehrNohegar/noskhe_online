import { Dialog } from "@/components/dialog";
import { iban_response, IExtendedDialogProps } from "@/model";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { WalletAddShebaDialogSelectStep } from "./partials/selectStep";
import { WalletAddShebaDialogConfirmStep } from "./partials/confirmStep";

function WalletAddShebaDialog(props: IExtendedDialogProps) {
  const { isOpen, closeModal } = props;

  const [step, setStep] = useState<"select" | "confirm">("select");

  const methods = useForm<iban_response>({
    defaultValues: {
      bankName: "",
      cardNumber: "",
      IBAN: "",
      name: "",
    },
  });

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title className="flex items-center p-4 bg-primary-10 border-b border-b-primary-200 rounded-t-1.5lg">
        <span className="font-semibold text-primary-800 me-auto">
          تغییر شماره شبا
        </span>
      </Dialog.Title>
      <FormProvider {...methods}>
        {step === "select" ? (
          <WalletAddShebaDialogSelectStep
            nextStep={() => setStep("confirm")}
            {...props}
          />
        ) : null}
        {step === "confirm" ? (
          <WalletAddShebaDialogConfirmStep
            prevStep={() => setStep("select")}
            {...props}
          />
        ) : null}
      </FormProvider>
    </Dialog>
  );
}

export default WalletAddShebaDialog;

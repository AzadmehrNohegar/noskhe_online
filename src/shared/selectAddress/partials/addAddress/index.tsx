import { useState } from "react";
import { AddAddressMap } from "./partials/map";
import { add_address_form, IExtendedDialogProps } from "@/model";
import { FormProvider, useForm } from "react-hook-form";
import { AddAddressVerify } from "./partials/verify";

function AddAddressStep(props: IExtendedDialogProps) {
  const [step, setStep] = useState<"map" | "verify">("map");
  const methods = useForm<add_address_form>({
    defaultValues: {
      address: "",
      city: "",
      province: "",
      fullName: "",
      lat: 0,
      lng: 0,
      myself: false,
      phone: "",
    },
  });
  return (
    <FormProvider {...methods}>
      {step === "map" ? (
        <AddAddressMap handleStep={(step) => setStep(step)} {...props} />
      ) : null}
      {step === "verify" ? (
        <AddAddressVerify handleStep={(step) => setStep(step)} {...props} />
      ) : null}
    </FormProvider>
  );
}

export { AddAddressStep };

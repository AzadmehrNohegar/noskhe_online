import { useState } from "react";
import { CustomerAuthOtpCredentials } from "./partials/credentials";
import { CustomerAuthOtpVerification } from "./partials/verification";
import { FormProvider, useForm } from "react-hook-form";
import { authOtpForm } from "@/model";

function AuthRegister() {
  const [step, setStep] = useState<"credentials" | "verification">(
    "credentials"
  );

  const methods = useForm<authOtpForm>({
    defaultValues: {
      mobile: "",
      code: "",
    },
  });

  return (
    <div className="flex items-center h-lvh relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-4 lg:hidden">
        <img src="/logo.png" width={128} height={58} alt="logo" />
      </div>
      <FormProvider {...methods}>
        <div className="w-full flex items-center justify-center bg-misc-light-bg h-full p-5">
          {step === "credentials" ? (
            <CustomerAuthOtpCredentials
              setNextStep={() => setStep("verification")}
            />
          ) : null}
          {step === "verification" ? (
            <CustomerAuthOtpVerification
              setPrevStep={() => setStep("credentials")}
            />
          ) : null}
        </div>
      </FormProvider>
    </div>
  );
}

export default AuthRegister;

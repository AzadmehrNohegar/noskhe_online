import { useState } from "react";
import { AuthOtpCredentials } from "./partials/credentials";
import { AuthOtpVerification } from "./partials/verification";
import { FormProvider, useForm } from "react-hook-form";
import { authRegisterForm } from "@/model";

function AuthOtp() {
  const [step, setStep] = useState<"credentials" | "verification">(
    "credentials"
  );

  const methods = useForm<authRegisterForm>({
    defaultValues: {
      mobile: "",
      code: "",
    },
  });

  return (
    <div className="flex items-center h-lvh relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-4 lg:hidden">
        <img src="/logo.png" width={58} height={58} alt="logo" />
      </div>
      <FormProvider {...methods}>
        <div className="w-full flex items-center justify-center bg-misc-light-bg h-full p-5">
          {step === "credentials" ? (
            <AuthOtpCredentials setNextStep={() => setStep("verification")} />
          ) : null}
          {step === "verification" ? (
            <AuthOtpVerification setPrevStep={() => setStep("credentials")} />
          ) : null}
        </div>
      </FormProvider>
    </div>
  );
}

export default AuthOtp;

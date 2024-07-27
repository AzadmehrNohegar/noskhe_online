import { dashboard_form } from "@/model";
import { FormProvider, useForm } from "react-hook-form";
import { DashboardOrder } from "./partials/order";
import { useState } from "react";
import { DashboardVerify } from "./partials/verify";
import DashboardDelivery from "./partials/delivery";

function Dashboard() {
  const [step, setStep] = useState<"delivery" | "order" | "verify">("delivery");

  const methods = useForm<dashboard_form>({
    defaultValues: {
      otc: [],
      uploadPrescription: [],
      elecPrescription: [],
      description: "",
      isPerson: false,
      pharmacy: null,
    },
    mode: "all",
  });

  return (
    <FormProvider {...methods}>
      {step === "delivery" ? (
        <DashboardDelivery nextStep={() => setStep("order")} />
      ) : null}
      {step === "order" ? (
        <DashboardOrder nextStep={() => setStep("verify")} />
      ) : null}
      {step === "verify" ? (
        <DashboardVerify prevStep={() => setStep("order")} />
      ) : null}
    </FormProvider>
  );
}

export default Dashboard;

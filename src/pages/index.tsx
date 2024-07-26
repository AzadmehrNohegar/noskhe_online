import { useAuthStore } from "@/store/auth";
import PharmacyBasePage from "./pharmacy";
import CustomerBasePage from "./customer";

function BasePage() {
  const { role } = useAuthStore();

  if (role === "PHARMACY") return <PharmacyBasePage />;

  return <CustomerBasePage />;
}

export default BasePage;

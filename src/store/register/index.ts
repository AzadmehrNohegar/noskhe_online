import {
  REGISTER_STEPS,
  registerLegalData,
  registerRealData,
  registerSteps,
} from "@/constants/misc";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IRegisterStore {
  data: registerRealData | registerLegalData | null;
  currentStep: registerSteps;
  steps: registerSteps[];
  goToNextStep: () => void;
  goToPrevStep: () => void;
  canGoToNextStep: () => boolean;
  canGoToPrevStep: () => boolean;
  setRegisterData: (data: registerRealData | registerLegalData | null) => void;
  resetRegisterData: () => void;
}

const useRegisterStore = create<IRegisterStore>()(
  persist(
    (set, get) => ({
      data: null,
      currentStep: REGISTER_STEPS[0],
      steps: REGISTER_STEPS,
      goToNextStep: () => {
        const s = get().currentStep;
        const arr = structuredClone(get().steps);
        if (arr[arr.indexOf(s) + 1])
          set({ currentStep: arr[arr.indexOf(s) + 1] });
      },
      goToPrevStep: () => {
        const s = get().currentStep;
        const arr = structuredClone(get().steps);
        if (arr[arr.indexOf(s) - 1])
          set({ currentStep: arr[arr.indexOf(s) - 1] });
      },
      canGoToNextStep: () => {
        const s = get().currentStep;
        const arr = structuredClone(get().steps);
        return s !== arr.pop();
      },
      canGoToPrevStep: () => {
        const s = get().currentStep;
        const arr = structuredClone(get().steps);
        return s !== arr.shift();
      },
      setRegisterData: (data) => {
        set({ data });
      },
      resetRegisterData: () => {
        set({ currentStep: get().steps[0], data: null });
      },
    }),
    {
      name: "register-storage",
    }
  )
);

export { useRegisterStore };

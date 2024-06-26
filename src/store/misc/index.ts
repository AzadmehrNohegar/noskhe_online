import { loading_type } from "@/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IMiscStore {
  addressDialogOpen: boolean;
  setIsAddressDialogOpen: (state: boolean) => void;
  loading: boolean;
  type: loading_type;
  showLoading: (type: loading_type) => void;
  hideLoading: () => void;
}

const useMiscStore = create<IMiscStore>()(
  persist(
    (set) => ({
      addressDialogOpen: false,
      loading: false,
      type: "query",
      showLoading: (type) => set({ loading: true, type }),
      hideLoading: () => set({ loading: false }),
      setIsAddressDialogOpen: (s) => set({ addressDialogOpen: s }),
    }),
    {
      name: "misc-storage",
    }
  )
);

export { useMiscStore };

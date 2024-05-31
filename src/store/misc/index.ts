import { loading_type } from "@/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IMiscStore {
  loading: boolean;
  type: loading_type;
  showLoading: (type: loading_type) => void;
  hideLoading: () => void;
}

const useMiscStore = create<IMiscStore>()(
  persist(
    (set) => ({
      loading: false,
      type: "query",
      showLoading: (type) => set({ loading: true, type }),
      hideLoading: () => set({ loading: false }),
    }),
    {
      name: "misc-storage",
    }
  )
);

export { useMiscStore };

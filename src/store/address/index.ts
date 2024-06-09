import { address } from "@/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAddressStore {
  address: address | null;
  setAddress: (a: address | null) => void;
}

const useAddressStore = create<IAddressStore>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (address) => set({ address }),
    }),
    {
      name: "address-storage",
    }
  )
);

export { useAddressStore };

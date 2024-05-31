// import { postRefresh } from "@/api/refresh";
import { toast } from "@/model";
import { create } from "zustand";

interface IToastStore {
  stack: toast[];
  stackToast: (toast: Pick<toast, "message" | "options" | "title">) => void;
  shiftToast: () => void;
  deleteToast: (id: number) => void;
}

const useToastStore = create<IToastStore>()((set, get) => ({
  stack: [],
  stackToast: (toast) =>
    set({
      stack: [
        ...get().stack,
        {
          id: Math.floor(Math.random() * 1000000),
          ...toast,
        },
      ],
    }),
  shiftToast: () => {
    const [, ...rest] = get().stack;
    set({ stack: rest });
  },
  deleteToast: (_id) =>
    set({ stack: get().stack.filter((item) => item.id !== _id) }),
}));

export { useToastStore };

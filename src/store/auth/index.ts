// import { postAccountAuthRefreshToken } from "@/api/account";
// import { AxiosResponse } from "axios";
import { postUserAuthRefreshToken } from "@/api/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  access: string;
  refresh: string;
  prime: string;
  isAuthenticated: boolean;
  refreshUser: (resolve: () => void, reject: () => void) => Promise<void>;
  loginUser: (accessToken: string, primeToken: string) => void;
  logoutUser: () => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      access: "",
      refresh: "",
      prime: "",
      isAuthenticated: false,

      loginUser: (accessToken, refreshToken) =>
        set({
          access: accessToken,
          refresh: refreshToken,
          isAuthenticated: true,
        }),
      refreshUser: (resolve, reject) =>
        postUserAuthRefreshToken({
          body: {
            refresh: get().refresh,
          },
        })
          .then((res) => {
            if (res?.data) {
              const { token } = res.data.data;
              set({
                access: token.accessToken,
                isAuthenticated: true,
              });
              resolve();
            }
          })
          .catch(() => {
            set({ access: "", refresh: "", isAuthenticated: false });
            reject();
          }),

      logoutUser: () => set({ access: "", prime: "", isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export { useAuthStore };

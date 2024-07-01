// import { postAccountAuthRefreshToken } from "@/api/account";
// import { AxiosResponse } from "axios";
import { postUserAuthRefreshToken } from "@/api/user";
import { role } from "@/model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
  access: string;
  refresh: string;
  isAuthenticated: boolean;
  role: role;
  refreshUser: (resolve: () => void, reject: () => void) => Promise<void>;
  loginUser: (accessToken: string, primeToken: string, role: role) => void;
  logoutUser: () => void;
}

const useAuthStore = create<IAuthStore>()(
  persist(
    (set, get) => ({
      access: "",
      refresh: "",
      isAuthenticated: false,
      role: "CUSTOMER",
      loginUser: (accessToken, refreshToken, role) =>
        set({
          access: accessToken,
          refresh: refreshToken,
          role: role,
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

      logoutUser: () =>
        set({ access: "", refresh: "", isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export { useAuthStore };

import { postPharmacyAuthLogin } from "@/api/pharmacy";
import { Divider } from "@/components/divider";
import { Input } from "@/components/input";
import { authLoginForm } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { useAuthStore } from "@/store/auth";
import { useToastStore } from "@/store/toast";
import { usePersianConvert } from "@/utils/usePersianConvert";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

function PharmacyAuthLogin() {
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { loginUser } = useAuthStore();
  const { stackToast } = useToastStore();
  const { convertPersian2English } = usePersianConvert();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<authLoginForm>({
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const login = useMutation(postPharmacyAuthLogin, {
    onSuccess: (res) => {
      if (res?.data) {
        const { token } = res.data.data;

        stackToast({
          title: "خوش آمدید!",
          options: {
            type: "success",
          },
        });
        queryClient.invalidateQueries();
        loginUser(token.accessToken, token.refreshToken, "PHARMACY");
        navigate("/", {
          replace: true,
        });
      }
    },
    onError: () => {
      stackToast({
        title: "نام کاربری یا رمز عبور اشتباه است.",
        options: {
          type: "error",
        },
      });
    },
  });

  const onSubmit = (values: authLoginForm) =>
    login.mutate({
      body: {
        userName: convertPersian2English(values.userName),
        password: convertPersian2English(values.password),
      },
    });

  return (
    <div className="flex items-center h-lvh relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-4 lg:hidden">
        <img src="/logo.png" width={128} height={58} alt="logo" />
      </div>
      <div className="w-full flex items-center justify-center bg-misc-light-bg h-full p-5">
        <form
          className="flex flex-col gap-4 w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="lg:text-xl flex items-center gap-2 font-bold text-secondary justify-center lg:justify-start">
            ورود به پنل نسخه انلاین
          </h1>
          <span className="text-gray-600 text-sm lg:text-base text-center lg:text-start">
            برای ورود به حساب کاربری اطلاعات زیر را وارد کنید.
          </span>
          <Input
            placeholder="نام کاربری"
            className="input input-bordered w-full"
            containerClassName="w-full"
            iconClassName="icon-User-16"
            autoComplete="on"
            deleteAction={() => setValue("userName", "")}
            error={errors?.userName}
            {...register("userName", {
              required: "این فیلد ضروری است.",
            })}
          />
          <Input
            placeholder="رمز عبور"
            type={isPassword ? "password" : "text"}
            className="input input-bordered w-full"
            containerClassName="w-full"
            iconClassName="icon-Lock-16"
            autoComplete="on"
            elementEnd={
              <button
                tabIndex={-1}
                type="button"
                className="btn btn-link text-gray-800 absolute end-8 peer-placeholder-shown:hidden"
                onClick={() => setIsPassword((prevState) => !prevState)}
              >
                <IconWrapper
                  iconSize="medium"
                  className={clsx(
                    isPassword && "icon-Eye-16",
                    !isPassword && "icon-Eye-Closed-16"
                  )}
                />
              </button>
            }
            error={errors.password}
            {...register("password", {
              required: "این فیلد ضروری است.",
            })}
          />

          <button
            className="btn btn-secondary btn-block"
            disabled={!isValid || login.isLoading}
          >
            ورود به حساب کاربری
          </button>
          <Divider orientation="horizontal" />
          <div className="flex items-center flex-wrap justify-center gap-4 w-full">
            <Link
              to="../customer"
              className="btn btn-outline text-primary hover:bg-primary hover:border-primary btn-block basis-full"
            >
              ورود مشتری
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PharmacyAuthLogin;

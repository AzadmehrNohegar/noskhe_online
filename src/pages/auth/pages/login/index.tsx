import { postMembershipApiLogin } from "@/api/membership";
import { Divider } from "@/components/divider";
import { Input } from "@/components/input";
import { IconWrapper } from "@/shared/iconWrapper";
import { useAuthStore } from "@/store/auth";
import { useRegisterStore } from "@/store/register";
import { useToastStore } from "@/store/toast";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";

interface IAuthLoginForm {
  username: string;
  password: string;
  prime_code: string;
}

function AuthLogin() {
  const [isPassword, setIsPassword] = useState(true);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { loginUser } = useAuthStore();
  const { resetRegisterData } = useRegisterStore();
  const { stackToast } = useToastStore();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: {
      isValid,
      // isDirty,
      errors,
    },
  } = useForm<IAuthLoginForm>({
    defaultValues: {
      // username: "admin",
      // password: "123qwe!@#QWE",
      // prime_code: "338",
      username: "",
      password: "",
      prime_code: "",
    },
  });
  const login = useMutation(postMembershipApiLogin, {
    onSuccess: (res) => {
      const { prime_code } = getValues();
      if (res?.data) {
        const { token } = res.data.data;

        stackToast({
          title: "خوش آمدید!",
          options: {
            type: "success",
          },
        });
        queryClient.invalidateQueries();
        loginUser(token, prime_code);
        navigate("/");
      }
    },
  });

  const resetRegisterSteps = useCallback(
    () => resetRegisterData(),
    [resetRegisterData]
  );

  useEffect(() => {
    resetRegisterSteps();
  }, [resetRegisterSteps]);

  const onSubmit = ({ prime_code, ...rest }: IAuthLoginForm) =>
    login.mutate({
      body: {
        prime_code: +prime_code,
        ...rest,
      },
    });

  return (
    <div className="flex items-center h-lvh relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-4 lg:hidden">
        <img src="/logo.png" width={58} height={58} alt="logo" />
      </div>
      <div className="w-full lg:w-8/12 flex items-center justify-center bg-misc-light-bg h-full p-5">
        <form
          className="flex flex-col gap-4 w-full max-w-lg"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="lg:text-xl flex items-center gap-2 font-bold text-primary justify-center lg:justify-start">
            <img src="/images/exclude.svg" alt="heading icon" />
            ورود با نام کاربری به پنل نسخه انلاین
          </h1>
          <span className="text-gray-600 text-sm lg:text-base text-center lg:text-start">
            برای ورود به حساب کاربری اطلاعات زیر را وارد کنید
          </span>
          <Input
            placeholder="نام کاربری"
            className="input input-bordered w-full"
            containerClassName="w-full"
            iconClassName="icon-User-16"
            autoComplete="on"
            deleteAction={() => setValue("username", "")}
            error={errors.username}
            {...register("username", {
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
                className="btn btn-link text-gray-700 absolute end-8 peer-placeholder-shown:hidden"
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
          <Input
            placeholder="شناسه کاربری"
            type="number"
            className="input input-bordered w-full"
            containerClassName="w-full"
            iconClassName="icon-Paperclip-16"
            autoComplete="on"
            deleteAction={() => setValue("prime_code", "")}
            error={errors.prime_code}
            {...register("prime_code", {
              required: "این فیلد ضروری است.",
            })}
          />
          <Link
            to="forget-password"
            type="button"
            className="btn btn-ghost btn-primary ms-auto w-fit"
          >
            فراموشی رمز ‌عبور
          </Link>
          <button
            className="btn btn-primary btn-block"
            disabled={
              !isValid ||
              // || !isDirty
              login.isLoading
            }
          >
            ورود
          </button>
          <Divider orientation="horizontal" />
          <Link
            to="otp"
            type="button"
            className="btn btn-outline btn-primary btn-block"
          >
            ورود با تلفن همراه
          </Link>
          <div className="flex items-center justify-center gap-4 w-full">
            <span className="text-sm text-gray-600">حساب کاربری ندارید؟</span>
            <Link
              to="register"
              type="button"
              className="btn btn-ghost btn-primary"
            >
              ثبت‌نام در نسخه انلاین
            </Link>
          </div>
        </form>
      </div>
      <div className="w-4/12 hidden lg:block h-full gap-6">
        <img
          src="/images/banner.png"
          className="w-full h-full rounded-1.5lg"
          alt="login bg"
        />
      </div>
    </div>
  );
}

export default AuthLogin;

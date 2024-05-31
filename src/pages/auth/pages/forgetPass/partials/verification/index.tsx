import { patchMembershipApiUsersRenewPasswordById } from "@/api/membership";
import { Divider } from "@/components/divider";
import { Input } from "@/components/input";
import { PASSWORD_FORMAT } from "@/constants/variables";
import { IconWrapper } from "@/shared/iconWrapper";
import { useToastStore } from "@/store/toast";
import { usePersianConvert } from "@/utils/usePersianConvert";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";

interface IAuthForgetPassVerificationForm {
  old_password: string;
  new_password1: string;
  new_password2: string;
}

function AuthForgetPassVerification() {
  const [isPassword, setIsPassword] = useState(true);

  const { stackToast } = useToastStore();
  const { convertPersian2English } = usePersianConvert();

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = useForm<IAuthForgetPassVerificationForm>({
    defaultValues: {
      old_password: "",
      new_password1: "",
      new_password2: "",
    },
    mode: "all",
  });

  const renewPassword = useMutation(patchMembershipApiUsersRenewPasswordById, {
    onSuccess: () => {
      stackToast({
        title: "رمز عبور با موفقیت تغییر یافت.",
        options: {
          type: "success",
        },
      });
      navigate("..");
    },
    onError: () => {
      stackToast({
        title: "رمز عبور قبلی اشتباه است.",
        options: {
          type: "error",
        },
      });
    },
  });

  const onSubmit = (values: IAuthForgetPassVerificationForm) =>
    renewPassword.mutate({
      id: "313",
      body: {
        old_password: convertPersian2English(values.old_password),
        new_password1: convertPersian2English(values.new_password1),
        new_password2: convertPersian2English(values.new_password2),
      },
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full max-w-lg"
    >
      <h1 className="lg:text-xl flex items-center gap-2 font-bold text-primary justify-center lg:justify-start">
        <img src="/images/exclude.svg" alt="heading icon" />
        ورود با نام کاربری به پنل نسخه انلاین
      </h1>
      <span className="text-gray-600 text-sm lg:text-base text-center lg:text-start">
        برای ورود به حساب کاربری اطلاعات زیر را وارد کنید
      </span>
      <Input
        placeholder="رمز عبور قبلی"
        type={isPassword ? "password" : "text"}
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-Lock-16"
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
        error={errors.old_password}
        {...register("old_password", {
          required: "این فیلد ضروری است.",
          minLength: {
            value: 8,
            message: "رمز عبور باید بیش از ۸ کاراکتر باشد.",
          },
        })}
      />
      <Input
        placeholder="رمز عبور جدید"
        type={isPassword ? "password" : "text"}
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-Lock-16"
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
        error={errors.new_password1}
        {...register("new_password1", {
          required: "این فیلد ضروری است.",
          validate: (val) => {
            if (convertPersian2English(val) === watch("old_password"))
              return "باید رمز عبور جدید با رمز عبور قبلی متفاوت باشد.";
            if (!convertPersian2English(val).match(PASSWORD_FORMAT))
              return "رمز عبور باید شامل حروف بزرگ و کوچک٬ عدد و کاراکتر باشد.";
            return;
          },
        })}
      />
      <Input
        placeholder="تکرار رمز عبور جدید"
        type={isPassword ? "password" : "text"}
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-Lock-16"
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
        error={errors.new_password2}
        {...register("new_password2", {
          required: "این فیلد ضروری است.",
          validate: (val) => {
            if (convertPersian2English(val) !== watch("new_password1"))
              return "رمز عبور تکرار شده با رمز عبور وارد شده باید برابر باشد.";
            return;
          },
        })}
      />

      <button
        className="btn btn-primary btn-block"
        disabled={!isValid || !isDirty || renewPassword.isLoading}
      >
        تغییر رمزعبور
      </button>
      <Divider orientation="horizontal" />
      <div className="flex items-center justify-center gap-4 w-full">
        <span className="text-sm text-gray-600">بازگشت به</span>
        <Link to=".." type="button" className="btn btn-ghost btn-primary">
          صفحه ورود
        </Link>
      </div>
    </form>
  );
}

export { AuthForgetPassVerification };

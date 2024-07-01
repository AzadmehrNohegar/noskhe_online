import { postUserAuthRegisterCheckOtp } from "@/api/user";
import { Divider } from "@/components/divider";
import { authRegisterForm } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { OtpInput } from "@/shared/otpInput";
import { Timer } from "@/shared/timer";
import { useAuthStore } from "@/store/auth";
import { useToastStore } from "@/store/toast";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "usehooks-ts";

interface ICustomerAuthOtpVerificationProps {
  setPrevStep: () => void;
}

function CustomerAuthOtpVerification({
  setPrevStep,
}: ICustomerAuthOtpVerificationProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { loginUser } = useAuthStore();
  const { stackToast } = useToastStore();
  const formRef = useRef<HTMLFormElement>(null);
  const { convertPersian2English } = usePersianConvert();

  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 120,
    intervalMs: 1000,
    countStop: 0,
  });

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, isDirty },
  } = useFormContext<authRegisterForm>();

  const login = useMutation(postUserAuthRegisterCheckOtp, {
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
        loginUser(token.accessToken, token.refreshToken, "CUSTOMER");
        navigate("/");
      }
    },
  });

  const onSubmit = (values: authRegisterForm) =>
    login.mutate({
      body: {
        ...values,
        mobile: convertPersian2English(values.mobile),
      },
    });

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
    >
      <h1 className="lg:text-xl flex items-center gap-2 font-bold text-primary justify-center lg:justify-start">
        تایید شماره موبایل
      </h1>
      <div className="flex items-center justify-between">
        <span className="text-gray-600 text-sm lg:text-base text-center lg:text-start">
          کد به شماره <span className="plaintext">{watch("mobile")}</span> ارسال
          شد.
        </span>
        <button
          type="button"
          className="btn btn-ghost btn-primary"
          onClick={setPrevStep}
        >
          <IconWrapper iconSize="medium" className="icon-Edit-16" />
          ویرایش شماره
        </button>
      </div>
      <Controller
        control={control}
        name="code"
        rules={{
          required: "این فیلد ضروری است.",
          minLength: {
            message: "طول رمز عبور باید ۵ کاراکتر باشد.",
            value: 5,
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <OtpInput
            value={value}
            handleChange={(v) => {
              onChange(v);
              if (v.trim().length === 5) formRef.current?.requestSubmit();
            }}
            valueLength={5}
            error={!!error}
          />
        )}
      />

      <div className="flex items-center justify-center gap-4 py-4">
        <Timer className="text-sm text-primary" seconds={count} />
        {count === 0 ? (
          <button
            type="button"
            className="btn btn-link btn-primary btn-sm px-0"
            onClick={resetCountdown}
          >
            ارسال دوباره کد
          </button>
        ) : null}
        {count !== 0 ? (
          <span className="text-sm inline-flex items-center font-light h-8">
            تا ارسال دوباره کد
          </span>
        ) : null}
      </div>
      <Divider orientation="horizontal" />
      <button
        className="btn btn-primary btn-block"
        disabled={!isValid || !isDirty || login.isLoading}
      >
        ورود
      </button>
    </form>
  );
}

export { CustomerAuthOtpVerification };

import { postUserAuthSendOtp } from "@/api/user";
import { Divider } from "@/components/divider";
import { Input } from "@/components/input";
import { authOtpForm } from "@/model";
import { useToastStore } from "@/store/toast";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

interface IAuthOtpCredentialsProps {
  setNextStep: () => void;
}

function AuthOtpCredentials({ setNextStep }: IAuthOtpCredentialsProps) {
  const { stackToast } = useToastStore();

  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: {
      isValid,
      // isDirty,
      errors,
    },
  } = useFormContext<authOtpForm>();

  const generateToken = useMutation(postUserAuthSendOtp, {
    onSuccess: (res) => {
      if (res?.data) {
        stackToast({
          title: "پیامک ارسال شد.",
          message: "رمز یکبار مصرف برای شما ارسال شد.",
          options: {
            type: "success",
          },
        });
        setSearchParams(searchParams);
        setNextStep();
      }
    },
    onError: () => {
      stackToast({
        title: "نام کاربری یا شناسه کاربری اشتباه است.",
        options: {
          type: "error",
        },
      });
    },
  });

  const onSubmit = (values: authOtpForm) =>
    generateToken.mutate({
      body: {
        mobile: values.mobile,
      },
    });

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="lg:text-xl flex items-center gap-2 font-bold text-primary justify-center lg:justify-start">
        ورود به پنل نسخه انلاین
      </h1>
      <span className="text-gray-600 text-sm lg:text-base text-center lg:text-start">
        برای ورود به حساب کاربری اطلاعات زیر را وارد کنید.
      </span>
      <Input
        placeholder="شماره موبایل"
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-User-16"
        autoComplete="on"
        deleteAction={() => setValue("mobile", "")}
        error={errors?.mobile}
        {...register("mobile", {
          required: "این فیلد ضروری است.",
        })}
      />

      <button
        className="btn btn-primary btn-block"
        disabled={
          !isValid ||
          // || !isDirty
          generateToken.isLoading
        }
      >
        ورود به حساب کاربری
      </button>
      <Divider orientation="horizontal" />
      {/* <Link
        to=".."
        type="button"
        className="btn btn-outline btn-primary btn-block"
      >
        ورود با نام کاربری
      </Link> */}
      <div className="flex items-center justify-center gap-4 w-full">
        <span className="text-sm text-gray-600">حساب کاربری ندارید؟</span>
        <Link to="register" type="button" className="btn btn-ghost btn-primary">
          ثبت‌نام در نسخه انلاین
        </Link>
      </div>
    </form>
  );
}

export { AuthOtpCredentials };

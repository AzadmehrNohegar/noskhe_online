import { postUserAuthRegisterSendOtp } from "@/api/user";
import { Divider } from "@/components/divider";
import { Input } from "@/components/input";
import { MOBILE_FORMAT } from "@/constants/variables";
import { authOtpForm, authRegisterForm } from "@/model";
import { useToastStore } from "@/store/toast";
import { usePersianConvert } from "@/utils/usePersianConvert";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

interface ICustomerAuthOtpCredentialsProps {
  setNextStep: () => void;
}

function CustomerAuthOtpCredentials({
  setNextStep,
}: ICustomerAuthOtpCredentialsProps) {
  const { stackToast } = useToastStore();
  const { convertPersian2English } = usePersianConvert();

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { isValid, isDirty, errors },
  } = useFormContext<authRegisterForm>();

  const generateToken = useMutation(postUserAuthRegisterSendOtp, {
    onSuccess: (res) => {
      if (res?.data) {
        stackToast({
          title: "پیامک ارسال شد.",
          message: "رمز یکبار مصرف برای شما ارسال شد.",
          options: {
            type: "success",
          },
        });
        setNextStep();
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

  const onSubmit = (values: authOtpForm) =>
    generateToken.mutate({
      body: {
        mobile: convertPersian2English(values.mobile),
        nationalCode: convertPersian2English(getValues("nationalCode")),
      },
    });

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="lg:text-xl flex items-center gap-2 font-bold text-primary justify-center lg:justify-start">
        ثبت نام پنل نسخه انلاین
      </h1>
      <span className="text-gray-600 text-sm lg:text-base text-center lg:text-start">
        برای ثبت نام حساب کاربری اطلاعات زیر را وارد کنید.
      </span>
      <Input
        placeholder="نام و نام خانوادگی"
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-User-16"
        autoComplete="on"
        deleteAction={() => setValue("fullName", "")}
        error={errors.mobile}
        {...register("fullName", {
          required: "این فیلد ضروری است.",
        })}
      />
      <Input
        type="number"
        placeholder="شماره موبایل"
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-Phone-16"
        autoComplete="on"
        deleteAction={() => setValue("mobile", "")}
        error={errors.mobile}
        {...register("mobile", {
          required: "شماره موبایل خود را وارد کنید.",
          validate: (value) => {
            if (
              convertPersian2English(value).match(MOBILE_FORMAT) &&
              value.length === 11
            )
              return;
            return "شماره موبایل نادرست است.";
          },
        })}
      />

      <Input
        placeholder="کد ملی"
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-Home-16"
        autoComplete="on"
        deleteAction={() => setValue("nationalCode", "")}
        error={errors.mobile}
        {...register("nationalCode", {
          required: "این فیلد ضروری است.",
          minLength: {
            value: 10,
            message: "کد ملی باید ۱۰ رقم باشد.",
          },
          maxLength: {
            value: 10,
            message: "کد ملی باید ۱۰ رقم باشد.",
          },
        })}
      />
      <button
        className="btn btn-primary btn-block"
        disabled={!isValid || !isDirty || generateToken.isLoading}
      >
        ثبت نام
      </button>
      <Divider orientation="horizontal" />
      {/* <Link
        to=".."
        type="button"
        className="btn btn-outline btn-primary btn-block"
      >
        ورود با نام کاربری
      </Link> */}
      <div className="flex items-center flex-wrap justify-center gap-4 w-full">
        <span className="text-sm text-gray-600">حساب کاربری دارید؟</span>
        <Link to=".." type="button" className="btn btn-link text-primary">
          ورود به نسخه انلاین
        </Link>
        <Link
          to="../../pharmacy/register"
          className="btn btn-outline text-secondary hover:bg-secondary hover:border-secondary btn-block basis-full"
        >
          ثبت نام داروخانه
        </Link>
      </div>
    </form>
  );
}

export { CustomerAuthOtpCredentials };

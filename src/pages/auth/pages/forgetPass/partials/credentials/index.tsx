import { getMembershipApiUserRecoverPassword } from "@/api/membership";
import { Divider } from "@/components/divider";
import { Input } from "@/components/input";
import { useToastStore } from "@/store/toast";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";

interface IAuthForgetPassCredentialsProps {
  setNextStep: () => void;
}

interface IAuthForgetPassCredentialsForm {
  key: string;
  prime_code: string;
}

function AuthForgetPassCredentials({
  setNextStep,
}: IAuthForgetPassCredentialsProps) {
  const { stackToast } = useToastStore();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      isValid,
      // isDirty,
      errors,
    },
  } = useForm<IAuthForgetPassCredentialsForm>({
    defaultValues: {
      // key: "admin",
      // prime_code: "338",
      key: "",
      prime_code: "",
    },
  });

  const recoverPassword = useMutation(getMembershipApiUserRecoverPassword, {
    onSuccess: () => {
      stackToast({
        title: "پیامک ارسال شد.",
        message: "لینک بازیابی رمز عبور برای شما ارسال شد.",
        options: {
          type: "success",
        },
      });
      setNextStep();
    },
  });

  const onSubmit = (values: IAuthForgetPassCredentialsForm) =>
    recoverPassword.mutate({
      params: {
        ...values,
      },
    });

  return (
    <form
      className="flex flex-col gap-6 w-full max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="lg:text-xl flex items-center gap-2 font-bold text-primary justify-center lg:justify-start">
        <img src="/images/exclude.svg" alt="heading icon" />
        فراموشی رمز‌عبور
      </h1>
      <span className="text-gray-600 text-sm lg:text-base text-center lg:text-start">
        لطفاً در صورت فراموشی رمز عبور مشخصات خود را برای بازیابی وارد کنید
      </span>
      <Input
        placeholder="نام کاربری"
        className="input input-bordered w-full"
        containerClassName="w-full"
        iconClassName="icon-User-16"
        autoComplete="on"
        deleteAction={() => setValue("key", "")}
        error={errors.key}
        {...register("key", {
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

      <button
        className="btn btn-primary btn-block"
        disabled={
          !isValid ||
          // ||!isDirty
          recoverPassword.isLoading
        }
      >
        بازیابی رمز عبور
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

export { AuthForgetPassCredentials };

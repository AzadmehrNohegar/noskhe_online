import { getUserProfile } from "@/api/user";
import { Input } from "@/components/input";
import Skeleton from "react-loading-skeleton";
import { useQuery } from "react-query";

function Profile() {
  const { data: userData, isLoading } = useQuery("user-profile", () =>
    getUserProfile()
  );

  if (isLoading)
    return (
      <Skeleton
        className="block h-full"
        containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
      />
    );

  return (
    <div className="flex flex-col divide-y">
      <div className="flex flex-wrap gap-x-4 gap-y-6 pb-6">
        <h2 className="flex items-center gap-2 basis-full font-semibold">
          اطلاعات حساب کاربری
        </h2>
        <Input
          defaultValue={userData?.data.data.user?.[0].mobile}
          type="text"
          containerClassName="basis-full lg:basis-modified3"
          className="input input-bordered w-full"
          label="شماره موبایل"
          iconClassName="icon-Phone-16"
          disabled
        />
        <Input
          defaultValue="*********"
          type="password"
          containerClassName="basis-full lg:basis-modified3"
          className="input input-bordered w-full"
          label="رمز عبور"
          iconClassName="icon-Lock-16"
          disabled
        />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-6 py-6">
        <h2 className="flex items-center gap-2 basis-full font-semibold">
          اطلاعات هویتی
        </h2>
        <Input
          defaultValue={userData?.data.data.user?.[0].fullName}
          type="text"
          containerClassName="basis-full lg:basis-modified3"
          className="input input-bordered w-full"
          label="نام و نام خانوادگی"
          iconClassName="icon-User-16"
          disabled
        />
        <Input
          defaultValue={userData?.data.data.user?.[0].nationalCode}
          type="number"
          containerClassName="basis-full lg:basis-modified3"
          className="input input-bordered w-full"
          label="کد ملی"
          iconClassName="icon-User-16"
          disabled
        />
      </div>
    </div>
  );
}

export default Profile;

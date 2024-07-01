import { Input } from "@/components/input";
import { useForm } from "react-hook-form";
import { IconWrapper } from "@/shared/iconWrapper";
import clsx from "clsx";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { HTMLProps } from "react";

interface IListSearchWrapperForm {
  search: string;
}

function ListSearchWrapper({ className }: HTMLProps<HTMLDivElement>) {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const { register, handleSubmit } = useForm<IListSearchWrapperForm>({
    values: {
      search: searchParams.get("search") || "",
    },
  });

  const onSubmit = (values: IListSearchWrapperForm) => {
    if (!values.search) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }
    searchParams.set("search", values.search);
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx("w-96", className)}>
      <Input
        className="input input-bordered bg-white w-full peer"
        placeholder="جست و جو..."
        elementEnd={
          <button className="absolute end-1 lg:end-2 inset-y-auto btn btn-sm peer-[&:not(:placeholder-shown)]:btn-primary font-light">
            پیدا کن
            <IconWrapper iconSize="medium" className="icon-Search20" />
          </button>
        }
        {...register("search")}
      />
    </form>
  );
}

export { ListSearchWrapper };

import { DatePicker } from "@/components/datepicker";
import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

function WalletFilterDialog({ isOpen, closeModal }: IExtendedDialogProps) {
  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const handleCancel = () => {
    setSearchParams("");
    closeModal();
  };

  return (
    <Dialog isOpen={isOpen} closeModal={handleCancel} placement="center">
      <Dialog.Title className="flex items-center p-4 bg-primary-10 border-b border-b-primary-200 rounded-t-1.5lg">
        <span className="font-semibold text-primary-800 me-auto">
          افزودن فیلتر
        </span>
        <button
          className="btn btn-ghost hover:bg-danger-50 text-red-600"
          onClick={handleCancel}
        >
          <IconWrapper iconSize="medium" className="icon-Trash-16" />
          حذف فیلتر
        </button>
      </Dialog.Title>
      <Dialog.Panel className="flex flex-col gap-x-4 gap-y-6 pt-4">
        <div className="flex flex-col items-center gap-4 px-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="text-sm font-light text-gray-600">
              نوع تراکنش:
            </span>
            <div className="flex items-center gap-4 border border-dashed border-gray-200 rounded-1.5lg p-4 w-full">
              <label
                htmlFor="withdraw"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="type"
                  id="withdraw"
                  className="checkbox checkbox-accent checked:checkbox-primary peer"
                  checked={searchParams.get("operation_type") === "decrease"}
                  onChange={(e) => {
                    searchParams.delete("page");
                    if (e.target.checked) {
                      searchParams.set("operation_type", "decrease");
                      setSearchParams(searchParams);
                      return;
                    }
                    searchParams.delete("operation_type");
                    setSearchParams(searchParams);
                  }}
                />
                <span className="text-sm text-gray-600 font-light peer-checked:text-primary peer-checked:font-semibold transition-all">
                  برداشت
                </span>
              </label>
              <label
                htmlFor="deposit"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="type"
                  id="deposit"
                  className="checkbox checkbox-accent checked:checkbox-primary peer"
                  checked={searchParams.get("operation_type") === "increase"}
                  onChange={(e) => {
                    searchParams.delete("page");
                    if (e.target.checked) {
                      searchParams.set("operation_type", "increase");
                      setSearchParams(searchParams);
                      return;
                    }
                    searchParams.delete("operation_type");
                    setSearchParams(searchParams);
                  }}
                />
                <span className="text-sm text-gray-600 font-light peer-checked:text-primary peer-checked:font-semibold transition-all">
                  واریز
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <span className="text-sm font-light text-gray-600">وضعیت:</span>
            <div className="flex items-center gap-4 border border-dashed border-gray-200 rounded-1.5lg p-4 w-full">
              <label
                htmlFor="success"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="status"
                  id="success"
                  className="checkbox checkbox-accent checked:checkbox-primary peer"
                  checked={searchParams.get("status_code") === "success"}
                  onChange={(e) => {
                    searchParams.delete("page");
                    if (e.target.checked) {
                      searchParams.set("status_code", "success");
                      setSearchParams(searchParams);
                      return;
                    }
                    searchParams.delete("status_code");
                    setSearchParams(searchParams);
                  }}
                />
                <span className="text-sm text-gray-600 font-light peer-checked:text-primary peer-checked:font-semibold transition-all">
                  موفق
                </span>
              </label>
              <label
                htmlFor="failed"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="status"
                  id="failed"
                  className="checkbox checkbox-accent checked:checkbox-primary peer"
                  checked={searchParams.get("status_code") === "revoke"}
                  onChange={(e) => {
                    searchParams.delete("page");
                    if (e.target.checked) {
                      searchParams.set("status_code", "revoke");
                      setSearchParams(searchParams);
                      return;
                    }
                    searchParams.delete("status_code");
                    setSearchParams(searchParams);
                  }}
                />
                <span className="text-sm text-gray-600 font-light peer-checked:text-primary peer-checked:font-semibold transition-all">
                  ناموفق
                </span>
              </label>
              <label
                htmlFor="pending"
                className="inline-flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="status"
                  id="pending"
                  className="checkbox checkbox-accent checked:checkbox-primary peer"
                  checked={searchParams.get("status_code") === "pending"}
                  onChange={(e) => {
                    searchParams.delete("page");
                    if (e.target.checked) {
                      searchParams.set("status_code", "pending");
                      setSearchParams(searchParams);
                      return;
                    }
                    searchParams.delete("status_code");
                    setSearchParams(searchParams);
                  }}
                />
                <span className="text-sm text-gray-600 font-light peer-checked:text-primary peer-checked:font-semibold transition-all">
                  در حال بررسی
                </span>
              </label>
            </div>
          </div>
        </div>

        <DatePicker containerClassName="px-4 pb-4" placeholder="تاریخ" />

        <div className="flex items-center justify-end border-t border-t-gray-100 p-4 gap-3">
          <button
            className="btn btn-link btn-custom text-gray-800"
            onClick={handleCancel}
          >
            انصراف
          </button>
          <button className="btn btn-primary btn-custom" onClick={closeModal}>
            اعمال فیلتر
          </button>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { WalletFilterDialog };

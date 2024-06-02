import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps } from "@/model";
import { AddAddressStep } from "./partials/addAddress";
import { SelectAddressStep } from "./partials/selectAddress";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

function SelectAddressDialog(props: IExtendedDialogProps) {
  const { isOpen, closeModal } = props;

  const [searchParams] = useDebouncedSearchParams();

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title className="flex items-center p-4 bg-primary-10 border-b border-b-primary-200 rounded-t-1.5lg">
        <span className="font-semibold text-primary-800 me-auto">
          انتخاب آدرس
        </span>
      </Dialog.Title>
      {searchParams.get("step") ? <AddAddressStep {...props} /> : null}
      {!searchParams.get("step") ? <SelectAddressStep {...props} /> : null}
    </Dialog>
  );
}

export { SelectAddressDialog };

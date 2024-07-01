import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps } from "@/model";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

function ImageDialog({ isOpen, closeModal }: IExtendedDialogProps) {
  const [searchParams] = useDebouncedSearchParams(0);

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Panel className="p-4">
        <div className="p-4 w-fit mx-auto h-96 border border-gray-200 rounded-lg">
          <img
            src={
              searchParams.get("image")
                ? import.meta.env.VITE_BASEURL + searchParams.get("image")
                : "/logo.png"
            }
            className="h-full mx-auto object-contain"
            alt="image"
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export { ImageDialog };

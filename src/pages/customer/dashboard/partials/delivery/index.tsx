import { IconWrapper } from "@/shared/iconWrapper";
import { SelectPharmacyDialog } from "@/shared/selectPharmacy";
import { Fragment, useState } from "react";

interface IDashboardDeliveryProps {
  nextStep: () => void;
}

function DashboardDelivery({ nextStep }: IDashboardDeliveryProps) {
  const [isSelectPharmacyDialogOpen, setIsSelectPharmacyDialogOpen] =
    useState(false);

  return (
    <Fragment>
      <div className="flex items-center gap-4">
        <button
          className="w-full aspect-square bg-primary text-white rounded-md flex flex-col justify-center items-center gap-3"
          onClick={nextStep}
        >
          <IconWrapper
            className="icon-clock-square16 text-4xl lg:text-9xl"
            iconSize="large"
          />
          <span className="text-lg lg:text-2xl">تحویل با پیک</span>
        </button>
        <button
          className="w-full aspect-square bg-secondary text-white rounded-md flex flex-col justify-center items-center gap-3"
          onClick={() => setIsSelectPharmacyDialogOpen(true)}
        >
          <IconWrapper
            className="icon-User-16 text-4xl lg:text-9xl"
            iconSize="large"
          />
          <span className="text-lg lg:text-2xl">تحویل حضوری</span>
        </button>
      </div>
      <SelectPharmacyDialog
        isOpen={isSelectPharmacyDialogOpen}
        closeModal={() => setIsSelectPharmacyDialogOpen(false)}
        action={nextStep}
      />
    </Fragment>
  );
}

export default DashboardDelivery;

function MobileDashboardTable() {
  return (
    <div className="flex flex-col divide-y divide-gray-200">
      <ul className="text-sm flex flex-col gap-4 p-4">
        <li className="inline-flex items-center justify-between gap-4">
          <strong>شماره سفارش‌</strong>
          <span className="font-normal text-gray-600">74654</span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>تاریخ درخواست</strong>
          <span className="font-normal text-gray-600 plaintext">
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>تاریخ تحویل</strong>
          <span className="font-normal text-gray-600 plaintext">
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>شماره سفارش‌</strong>
          <span className="font-normal text-warning-700">در انتظار پرداخت</span>
        </li>
      </ul>
      <ul className="text-sm flex flex-col gap-4 p-4">
        <li className="inline-flex items-center justify-between gap-4">
          <strong>شماره سفارش‌</strong>
          <span className="font-normal text-gray-600">74654</span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>تاریخ درخواست</strong>
          <span className="font-normal text-gray-600 plaintext">
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>تاریخ تحویل</strong>
          <span className="font-normal text-gray-600 plaintext">
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>شماره سفارش‌</strong>
          <span className="font-normal text-warning-700">در انتظار پرداخت</span>
        </li>
      </ul>
      <ul className="text-sm flex flex-col gap-4 p-4">
        <li className="inline-flex items-center justify-between gap-4">
          <strong>شماره سفارش‌</strong>
          <span className="font-normal text-gray-600">74654</span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>تاریخ درخواست</strong>
          <span className="font-normal text-gray-600 plaintext">
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>تاریخ تحویل</strong>
          <span className="font-normal text-gray-600 plaintext">
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date())}
          </span>
        </li>
        <li className="inline-flex items-center justify-between gap-4">
          <strong>شماره سفارش‌</strong>
          <span className="font-normal text-warning-700">در انتظار پرداخت</span>
        </li>
      </ul>
    </div>
  );
}

export { MobileDashboardTable };

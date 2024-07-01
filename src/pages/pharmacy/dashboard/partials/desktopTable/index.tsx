function DesktopDashboardTable() {
  return (
    <table className="table">
      <thead className="text-sm border-t border-b border-gray-200 bg-secondary bg-opacity-10">
        <tr className="border-0">
          <th align="right">شماره سفارش‌</th>
          <th align="right">تاریخ درخواست</th>
          <th align="right">تاریخ تحویل</th>
          <th align="right">وضعیت</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm">
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal text-warning-700">
              در انتظار پرداخت
            </span>
          </td>
        </tr>
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal text-success-700">
              در حال آماده‌سازی
            </span>
          </td>
        </tr>
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal text-warning-700">
              در انتظار پرداخت
            </span>
          </td>
        </tr>
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal">تحویل شده</span>
          </td>
        </tr>
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal text-warning-700">
              در انتظار پرداخت
            </span>
          </td>
        </tr>
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal text-success-700">
              در حال آماده‌سازی
            </span>
          </td>
        </tr>
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal text-warning-700">
              در انتظار پرداخت
            </span>
          </td>
        </tr>
        <tr className="border-gray-200 even:bg-gray-50 last-of-type:border-b-0">
          <td align="right">
            <span className="plaintext">1460</span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="plaintext">
              {new Intl.DateTimeFormat("fa-IR", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(new Date())}
            </span>
          </td>
          <td align="right">
            <span className="font-normal">تحویل شده</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export { DesktopDashboardTable };

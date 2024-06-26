import { getUserOrderByOrderId } from "@/api/user";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { INSURANCE_LABEL, TYPE_LABEL, TYPE_STEP } from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import Skeleton from "react-loading-skeleton";

function OrderSingle() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: orderData, isLoading } = useQuery(
    `order-${orderId}`,
    () =>
      getUserOrderByOrderId({
        id: orderId,
      }),
    {
      enabled: !!orderId,
    }
  );

  if (isLoading)
    return (
      <Skeleton
        className="block h-full"
        containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
      />
    );

  return (
    <div className="flex flex-col gap-3 h-full">
      <h2 className="flex items-center font-semibold lg:text-xl">
        <button
          className="btn btn-square btn-sm btn-link text-gray-600"
          onClick={() => navigate(-1)}
        >
          <IconWrapper iconSize="medium" className="icon-Arrow-Right-16" />
        </button>
        شماره سفارش: {orderId}
      </h2>
      <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
        <h6 className="font-semibold text-xs lg:text-sm">
          سفارش شما درحال بررسی توسط داروخانه است و ظرف ۳۰ دقیقه آینده هزینه آن
          محاسبه و از طریق پیامک به شما اطلاع داده خواهد شد.
        </h6>
      </div>

      <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4">
        <h2 className="font-semibold text-lg lg:text-xl">اقلام سفارش</h2>
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col divide-y divide-gray-200 text-sm lg:text-base">
            {orderData?.data.data.order.otc.map((el) => (
              <li
                key={el._id}
                className="flex items-center justify-between py-2"
              >
                {el.drugName ? (
                  <Fragment>
                    <strong>
                      نام: {el.drugName || "-"} نوع: {TYPE_LABEL[el.type]}
                    </strong>
                    <span className="text-gray-600">
                      {el.count} {TYPE_STEP[el.type]}
                    </span>
                  </Fragment>
                ) : null}
                {el.image ? (
                  <Fragment>
                    <strong>تصویر نسخه:</strong>
                    <img
                      src={el.imageUrl}
                      className="w-10 h-10 min-w-10 object-contain"
                      alt="perc"
                    />
                  </Fragment>
                ) : null}
              </li>
            ))}
            {orderData?.data.data.order.elecPrescription.map((el, index) => (
              <li
                key={`${el.trackingCode}${index}`}
                className="flex items-center justify-between py-2"
              >
                <strong>شماره پیگیری: {el.trackingCode}</strong>
                <span className="text-gray-600">
                  {INSURANCE_LABEL[el.typeOfInsurance]}
                </span>
              </li>
            ))}
            {orderData?.data.data.order.uploadPrescription.map((el, index) => (
              <li
                key={`${el.image}${index}`}
                className="flex items-center justify-between py-2"
              >
                <strong>تصویر نسخه:</strong>
                <div className="border border-gray-200 rounded-md p-2 text-gray-600">
                  <img
                    src={el.imageUrl}
                    className="w-10 h-10 min-w-10 object-contain"
                    alt="perc"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderSingle;

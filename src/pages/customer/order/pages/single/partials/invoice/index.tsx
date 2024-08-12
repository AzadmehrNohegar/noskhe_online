import { getUserOrderInvoiceByOrderId, postUserPayment } from "@/api/user";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import {
  DELIVERY_TYPE,
  GENERAL_STATUS,
  INSURANCE_LABEL,
  TYPE_LABEL,
  TYPE_STEP,
} from "@/model";
import { IconWrapper } from "@/shared/iconWrapper";
import Skeleton from "react-loading-skeleton";
import { Chip } from "@/components/chip";
import { ImageDialog } from "@/shared/imageDialog";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

function OrderSingleInvoice() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useDebouncedSearchParams(0);

  const { data: orderData, isLoading } = useQuery(
    `order-invoice-${orderId}-customer`,
    () =>
      getUserOrderInvoiceByOrderId({
        id: orderId,
      }),
    {
      enabled: !!orderId && searchParams.get("status") !== "PENDING",
    }
  );

  const createPayment = useMutation(postUserPayment);

  const handlePayment = () =>
    createPayment.mutate({
      body: {
        invoiceId: `${orderData?.data.data.detail.invoiceId}`,
        callback: window.location.href,
      },
    });

  if (isLoading)
    return (
      <Skeleton
        className="block h-full"
        containerClassName="block max-h-mobileContainer h-full pb-4 lg:pb-4 lg:max-h-max"
      />
    );

  return (
    <Fragment>
      <div className="flex flex-col gap-3 h-full pb-24">
        <h2 className="flex items-center font-semibold lg:text-xl">
          <button
            className="btn btn-square btn-sm btn-link text-gray-600"
            onClick={() => navigate("..")}
          >
            <IconWrapper iconSize="medium" className="icon-Arrow-Right-16" />
          </button>
          فاکتور سفارش: {orderId}
        </h2>
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4 bg-white">
          <h2 className="font-semibold text-lg lg:text-xl flex items-center gap-2">
            <span className="p-2 rounded-lg bg-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFFFFF"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 347.219 347.219"
              >
                <g>
                  <g id="Layer_5_28_">
                    <g>
                      <path d="M292.914,113.311l-47.97-22.824c-1.045-0.498-2.329-1.101-2.329-3.688c0,0,0-18.528,0-24.705     c0-2.5,2.993-2.662,2.993-2.662c16.385,0,27.609-13.33,27.609-29.716S259.887,0,243.502,0H103.717     C87.332,0,74.002,13.33,74.002,29.716s11.093,29.716,27.478,29.716c0,0,3.124-0.088,3.124,2.787c0,6.146,0,24.58,0,24.58     c0,2.754-1.284,3.189-2.328,3.688l-47.971,22.824c-5.879,2.797-10.313,5.075-10.313,16.328v188.316     c0,10.419,12.85,17.398,41.664,22.629c23.56,4.278,54.795,6.635,87.954,6.635s64.395-2.356,87.954-6.635     c28.814-5.23,41.664-12.21,41.664-22.629v-44.104V159.958V129.64C303.228,117.719,298.794,116.108,292.914,113.311z      M283.192,159.958c-43.878,0-175.513,0-175.513,0c-9.925,0-18,8.075-18,18v77.895c0,9.926,8.075,18,18,18c0,0,128.947,0,171.93,0     c9.75,0,9.62,6.618,9.62,6.618v36.605c-1.329,1.257-8.095,6.216-35.231,10.603c-22.101,3.572-50.649,5.541-80.386,5.541     s-58.286-1.969-80.386-5.541c-27.136-4.387-33.902-9.346-35.231-10.603V129.639c0-2.586,1.284-3.189,2.328-3.686l47.971-22.824     c5.879-2.799,10.313-3.41,10.313-16.33c0,0,0-17.778,0-23.705c0-3.75,3.503-3.662,3.503-3.662h103.25     c0,0,3.258-0.213,3.258,3.662c0,5.927,0,23.705,0,23.705c0,13.254,4.434,13.531,10.313,16.33l47.97,22.824     c1.044,0.496,2.329,1.1,2.329,3.686v25.081C289.228,154.72,290.192,159.958,283.192,159.958z M158.458,229.305h-14.432     c-6.874,0-12.446-5.572-12.446-12.446s5.572-12.446,12.446-12.446h14.043c0,0,3.094,0.144,3.094-2.871c0-3.566,0-14.267,0-14.267     c0-6.874,5.572-12.446,12.446-12.446s12.446,5.572,12.446,12.446c0,0,0,11.429,0,15.239c0,2.042,2.643,1.898,2.643,1.898h14.495     c6.874,0,12.446,5.572,12.446,12.446s-5.572,12.446-12.446,12.446h-14.008c0,0-3.129,0.046-3.129,2.478     c0,3.665,0,14.661,0,14.661c0,6.874-5.572,12.446-12.446,12.446s-12.446-5.572-12.446-12.446c0,0,0-10.851,0-14.467     C161.164,229.06,158.458,229.305,158.458,229.305z" />
                    </g>
                  </g>
                </g>
              </svg>
            </span>
            سفارش دارو
          </h2>
          <span className="text-gray-600 font-normal text-sm plaintext">
            {new Intl.DateTimeFormat("fa-IR", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(new Date(orderData?.data.data.detail.createdAt || ""))}
          </span>
          <Chip className="w-fit" status={orderData?.data.data.detail.status}>
            {GENERAL_STATUS[orderData?.data.data.detail.status || "PENDING"]}
          </Chip>
        </div>
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4 bg-white">
          <h2 className="font-semibold text-lg lg:text-xl flex items-center gap-2">
            <span className="rounded-lg bg-secondary inline-flex items-center justify-center w-9 min-w-9 aspect-square">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFFFFF"
                height="20px"
                width="20px"
                version="1.1"
                viewBox="0 0 231.306 231.306"
                enableBackground="new 0 0 231.306 231.306"
              >
                <g>
                  <path d="M229.548,67.743L163.563,1.757C162.438,0.632,160.912,0,159.32,0H40.747C18.279,0,0,18.279,0,40.747v149.813   c0,22.468,18.279,40.747,40.747,40.747h149.813c22.468,0,40.747-18.279,40.747-40.747V71.985   C231.306,70.394,230.673,68.868,229.548,67.743z M164.32,19.485l47.5,47.5h-47.5V19.485z M190.559,219.306H40.747   C24.896,219.306,12,206.41,12,190.559V40.747C12,24.896,24.896,12,40.747,12H152.32v60.985c0,3.313,2.687,6,6,6h60.985v111.574   C219.306,206.41,206.41,219.306,190.559,219.306z" />
                  <path d="m103.826,52.399c-5.867-5.867-13.667-9.098-21.964-9.098s-16.097,3.231-21.964,9.098c-5.867,5.867-9.098,13.667-9.098,21.964 0,8.297 3.231,16.097 9.098,21.964l61.536,61.536c7.957,7.956 20.9,7.954 28.855,0 7.955-7.956 7.955-20.899 0-28.855l-60.928-60.926c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l60.927,60.927c3.276,3.276 3.276,8.608 0,11.884s-8.607,3.276-11.884,0l-61.536-61.535c-3.601-3.601-5.583-8.388-5.583-13.479 0-5.092 1.983-9.879 5.583-13.479 7.433-7.433 19.525-7.433 26.958,0l64.476,64.476c11.567,11.567 11.567,30.388 0,41.955-5.603,5.603-13.053,8.689-20.977,8.689s-15.374-3.086-20.977-8.689l-49.573-49.574c-2.343-2.343-6.143-2.343-8.485,0-2.343,2.343-2.343,6.142 0,8.485l49.573,49.573c7.87,7.87 18.333,12.204 29.462,12.204s21.593-4.334 29.462-12.204 12.204-18.333 12.204-29.463c0-11.129-4.334-21.593-12.204-29.462l-64.476-64.476z" />
                </g>
              </svg>
            </span>
            جزئیات سفارش
          </h2>
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col divide-y divide-gray-200 text-sm">
              {orderData?.data.data.detail.otc.map((el) => (
                <li
                  key={el._id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex flex-col gap-1">
                    <span>
                      <strong>
                        نام: {el.drugName || "-"} نوع: {TYPE_LABEL[el.type]}/{" "}
                      </strong>
                      <span className="text-gray-600">
                        {el.count} {TYPE_STEP[el.type]}
                      </span>
                    </span>
                    <span>
                      <strong>
                        قیمت کل: {el.price.toLocaleString() || "-"} ریال
                      </strong>
                    </span>
                  </div>
                  {el.image ? (
                    <div className="flex items-center gap-1">
                      <strong>تصویر نسخه:</strong>
                      <button
                        type="button"
                        className="border border-gray-200 rounded-md p-2 text-gray-600"
                        onClick={() =>
                          navigate(`?image=${el.image}`, {
                            replace: true,
                          })
                        }
                      >
                        <img
                          src={import.meta.env.VITE_BASEURL + el.image}
                          className="w-10 aspect-square min-w-10 lg:w-40 lg:min-w-40 object-contain"
                          alt="perc"
                        />
                      </button>
                    </div>
                  ) : null}
                </li>
              ))}
              {orderData?.data.data.detail.elecPrescription.map((el, index) => (
                <li
                  key={`${el.trackingCode}${index}`}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex flex-col gap-1">
                    <span>
                      <strong>
                        نوع بیمه: {INSURANCE_LABEL[el.typeOfInsurance]}/{" "}
                      </strong>
                      <span className="text-gray-600">
                        کد رهگیری: {el.trackingCode}
                      </span>
                    </span>
                    <span>
                      <strong>
                        قیمت کل: {el.price.toLocaleString() || "-"}/{" "}
                      </strong>
                      <span>
                        سهم بیمه: {el.insurance.toLocaleString()} ریال/{" "}
                      </span>
                      <span>
                        قیمت تمام شده: {el.total.toLocaleString()} ریال
                      </span>
                    </span>
                  </div>
                </li>
              ))}
              {orderData?.data.data.detail.uploadPrescription.map(
                (el, index) => (
                  <li
                    key={`${el.image}${index}`}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex flex-col gap-1">
                      <span>
                        <strong>تصویر نسخه:</strong>
                      </span>
                      <span>
                        <strong>
                          قیمت کل: {el.price.toLocaleString() || "-"}/{" "}
                        </strong>
                        <span>
                          سهم بیمه: {el.insurance.toLocaleString()} ریال/{" "}
                        </span>
                        <span>
                          قیمت تمام شده: {el.total.toLocaleString()} ریال
                        </span>
                      </span>
                    </div>
                    <button
                      type="button"
                      className="border border-gray-200 rounded-md p-2 text-gray-600"
                      onClick={() =>
                        navigate(`?image=${el.image}`, {
                          replace: true,
                        })
                      }
                    >
                      <img
                        src={import.meta.env.VITE_BASEURL + el.image}
                        className="w-10 aspect-square min-w-10 lg:w-40 lg:min-w-40 object-contain"
                        alt="perc"
                      />
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4 bg-white">
          <h2 className="font-semibold text-lg lg:text-xl flex items-center gap-2">
            <span className="p-2 rounded-lg bg-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#FFFFFF"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 297 297"
              >
                <g>
                  <path d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645   c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645   C259.253,49.703,209.57,0,148.5,0z M148.5,272.689c-22.049-21.366-90.243-93.029-90.243-161.892   c0-49.784,40.483-90.287,90.243-90.287s90.243,40.503,90.243,90.287C238.743,179.659,170.549,251.322,148.5,272.689z" />
                  <path d="M148.5,59.183c-28.273,0-51.274,23.154-51.274,51.614c0,28.461,23.001,51.614,51.274,51.614   c28.273,0,51.274-23.153,51.274-51.614C199.774,82.337,176.773,59.183,148.5,59.183z M148.5,141.901   c-16.964,0-30.765-13.953-30.765-31.104c0-17.15,13.801-31.104,30.765-31.104c16.964,0,30.765,13.953,30.765,31.104   C179.265,127.948,165.464,141.901,148.5,141.901z" />
                </g>
              </svg>
            </span>
            جزئیات تحویل
          </h2>
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col divide-y divide-gray-200 text-sm">
              <li className="flex items-center justify-between py-2">
                <strong>نوع تحویل: </strong>
                <span className="text-gray-600">
                  {
                    DELIVERY_TYPE[
                      orderData?.data.data.delivery?.deliveryType || "COURIER"
                    ]
                  }
                </span>
              </li>
              <li className="flex items-center justify-between py-2">
                <strong>زمان تحویل: </strong>
                <span className="text-gray-600 text-justify">
                  {orderData?.data.data.delivery?.deliveryTime}
                </span>
              </li>
              <li className="flex items-center justify-between py-2">
                <strong>محل تحویل: </strong>
                <span className="text-gray-600 text-justify">
                  {orderData?.data.data.delivery?.deliveryTo}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {orderData?.data.data.payment ? (
          <div className="border border-gray-200 p-4 rounded-md flex flex-col gap-4 bg-white">
            <h2 className="font-semibold text-lg lg:text-xl flex items-center gap-2">
              <span className="p-2 rounded-lg bg-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Capa_1"
                  viewBox="0 0 502.685 502.685"
                >
                  <g>
                    <g>
                      <path
                        fill="#FFFFFF"
                        d="M482.797,276.924c4.53-5.824,6.73-13.331,4.724-20.988L428.05,30.521    c-3.451-13.029-16.847-20.837-29.854-17.386L18.184,113.331C5.22,116.761-2.61,130.2,0.798,143.207L60.269,368.6    c3.408,13.007,16.868,20.816,29.876,17.408l134.278-35.419v75.476c0,42.214,69.954,64.303,139.11,64.303    c69.113,0,139.153-22.089,139.153-64.302V311.61C502.685,297.869,495.157,286.307,482.797,276.924z M439.763,199.226l6.212,23.469    l-75.541,19.953l-6.169-23.512L439.763,199.226z M395.931,50.733l11.799,44.695l-118.014,31.148l-11.799-44.695L395.931,50.733z     M342.975,224.744l6.04,22.951c-27.934,1.251-55.113,6.126-76.943,14.452l-4.616-17.429L342.975,224.744z M79.984,319.224    l-6.169-23.426l75.519-19.975l6.212,23.555L79.984,319.224z M170.625,270.237l75.476-19.953l5.716,21.506    c-1.834,1.122-3.559,2.286-5.242,3.473l-69.781,18.421L170.625,270.237z M477.491,424.209c0,24.612-50.993,44.544-113.958,44.544    c-62.9,0-113.937-19.953-113.937-44.544v-27.718c0-0.928,0.539-1.769,0.69-2.653c3.602,23.34,52.654,41.847,113.247,41.847    c60.614,0,109.687-18.508,113.268-41.847c0.151,0.884,0.69,1.726,0.69,2.653V424.209z M477.491,369.678    c0,24.591-50.993,44.522-113.958,44.522c-62.9,0-113.937-19.931-113.937-44.522V341.96c0-0.906,0.539-1.769,0.69-2.653    c3.602,23.318,52.654,41.869,113.247,41.869c60.614,0,109.687-18.551,113.268-41.869c0.151,0.884,0.69,1.747,0.69,2.653V369.678z     M363.532,356.11c-62.9,0-113.937-19.931-113.937-44.501c0-24.569,51.036-44.5,113.937-44.5c62.965,0,113.958,19.931,113.958,44.5    C477.491,336.179,426.497,356.11,363.532,356.11z"
                      />
                    </g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                    <g></g>
                  </g>
                </svg>
              </span>
              جزئیات پرداخت
            </h2>
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col divide-y divide-gray-200 text-sm">
                <li className="flex items-center justify-between py-2">
                  <strong>قیمت: </strong>
                  <strong className="text-gray600 plaintext">
                    {orderData?.data.data.payment?.amount?.toLocaleString()}{" "}
                    <span className="font-light">ریال</span>
                  </strong>
                </li>
                {orderData?.data.data.payment?.createdAt ? (
                  <li className="flex items-center justify-between py-2">
                    <strong>زمان پرداخت: </strong>
                    <span className="text-gray-600 font-normal text-sm plaintext">
                      {new Intl.DateTimeFormat("fa-IR", {
                        dateStyle: "long",
                        timeStyle: "short",
                      }).format(
                        new Date(orderData?.data.data.payment?.createdAt || "")
                      )}
                    </span>
                  </li>
                ) : null}

                <li className="flex items-center justify-between py-2">
                  <strong>کد رهگیری: </strong>
                  <span className="text-gray-600 text-justify">
                    {orderData?.data.data.payment?.trackingCode}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
        {orderData?.data.data.detail.status === "WFP" ? (
          <div className="flex flex-wrap mt-auto items-center border-t border-t-gray-100 p-4 gap-3 w-full fixed bg-[#F9F9FA] bottom-0 end-0 lg:max-w-[83%]">
            <button
              className="btn btn-primary btn-custom btn-wide ms-auto"
              onClick={handlePayment}
              disabled={createPayment.isLoading}
            >
              پرداخت
            </button>
          </div>
        ) : null}
      </div>
      <ImageDialog
        isOpen={!!searchParams.get("image")}
        closeModal={() =>
          navigate(`.`, {
            replace: true,
          })
        }
      />
    </Fragment>
  );
}

export { OrderSingleInvoice };

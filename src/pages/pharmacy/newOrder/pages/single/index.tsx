import {
  getPharmacyFactorNewOrderSingleById,
  getPharmacyFactorOrderNotAccept,
  postPharmacyFactorOrderAcceptNotPrice,
} from "@/api/pharmacy";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";
import { IconWrapper } from "@/shared/iconWrapper";
import { Chip } from "@/components/chip";
import {
  DELIVERY_TYPE,
  GENERAL_STATUS,
  INSURANCE_LABEL,
  TYPE_LABEL,
  TYPE_STEP,
} from "@/model";
import { ImageDialog } from "@/shared/imageDialog";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";
import { useToastStore } from "@/store/toast";

function NewOrderSingle() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useDebouncedSearchParams(0);
  const queryClient = useQueryClient();
  const { stackToast } = useToastStore();

  const { data: newOrderData, isLoading } = useQuery(
    `new-order-${orderId}`,
    () => getPharmacyFactorNewOrderSingleById({ id: orderId })
  );

  const notAccept = useMutation(getPharmacyFactorOrderNotAccept, {
    onSuccess: () => {
      stackToast({
        title: "سفارش رد شد.",
        options: {
          type: "info",
        },
      });
      queryClient.invalidateQueries();
      navigate("..");
    },
  });

  const acceptNotPrice = useMutation(postPharmacyFactorOrderAcceptNotPrice, {
    onSuccess: () => {
      stackToast({
        title: "سفارش تایید شد.",
        options: {
          type: "success",
        },
      });
      queryClient.invalidateQueries();
      navigate("price");
    },
  });

  const handleAcceptNotPrice = () =>
    acceptNotPrice.mutate({
      body: {
        orderId,
      },
    });

  const handleNotAccept = () =>
    notAccept.mutate({
      id: orderId,
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
      <div className="flex flex-col gap-3 h-full">
        <h2 className="flex items-center font-semibold lg:text-xl">
          <button
            className="btn btn-square btn-sm btn-link text-gray-600"
            onClick={() => navigate("..")}
          >
            <IconWrapper iconSize="medium" className="icon-Arrow-Right-16" />
          </button>
          شماره سفارش: {newOrderData?.data.data.refId}
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
            }).format(new Date(newOrderData?.data.data.createdAt || ""))}
          </span>
          <Chip className="w-fit" status={newOrderData?.data.data.status}>
            {GENERAL_STATUS[newOrderData?.data.data.status || "PENDING"]}
          </Chip>
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
                      newOrderData?.data.data.deliveryType || "COURIER"
                    ]
                  }
                </span>
              </li>
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
              {newOrderData?.data.data.otc.map((el) => (
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
                      <strong>تصویر دارو:/ تعداد: {el.count}</strong>
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
                    </Fragment>
                  ) : null}
                </li>
              ))}
              {newOrderData?.data.data.elecPrescription.map((el, index) => (
                <li
                  key={`${el.trackingCode}${index}`}
                  className="flex items-center justify-between py-2"
                >
                  <strong>
                    نوع بیمه: {INSURANCE_LABEL[el.typeOfInsurance]}/ کد ملی:{" "}
                    {el.nationalCode}/ کد رهگیری: {el.trackingCode}
                  </strong>
                </li>
              ))}
              {newOrderData?.data.data.uploadPrescription.map((el, index) => (
                <li
                  key={`${el.image}${index}`}
                  className="flex items-center justify-between py-2"
                >
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
                </li>
              ))}
            </ul>
          </div>
        </div>
        {searchParams.get("status") === "PENDING" ||
        !searchParams.get("status") ? (
          <div className="flex items-center justify-end border-t border-t-gray-100 pt-4 gap-3 w-full">
            <button
              className="btn btn-link btn-custom text-gray-800"
              onClick={handleNotAccept}
            >
              رد سفارش
            </button>
            <button
              className="btn btn-primary btn-custom btn-wide"
              onClick={handleAcceptNotPrice}
              disabled={acceptNotPrice.isLoading}
            >
              تایید سفارش
            </button>
          </div>
        ) : null}
        {searchParams.get("status") === "WAITING" ? (
          <div className="flex items-center justify-end border-t border-t-gray-100 pt-4 gap-3 w-full">
            <Link to="price" className="btn btn-primary btn-custom btn-wide">
              ثبت قیمت
            </Link>
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

export default NewOrderSingle;

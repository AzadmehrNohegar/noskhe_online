/* eslint-disable @typescript-eslint/no-explicit-any */
import { NoskheMapMarker } from "@/modules/map/noskheMapmarker";
import { NoskheMapElement } from "@/modules/map/noskheMapElement";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDebounceValue } from "usehooks-ts";
import { Autocomplete } from "@/components/autoComplete";
import { mapirReverse, mapirSearchv2 } from "@/api/mapir";
import { Dialog } from "@/components/dialog";
import { add_address_form, IExtendedDialogProps, mapir_reserve } from "@/model";
import { useFormContext } from "react-hook-form";
import { useDebouncedSearchParams } from "@/utils/useDebouncedSearchParams";

interface IAddAddressMapProps extends IExtendedDialogProps {
  handleStep: (step: "map" | "verify") => void;
}

function AddAddressMap({ handleStep }: IAddAddressMapProps) {
  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useDebouncedSearchParams();

  const handleSelect = () => {
    searchParams.delete("step");
    setSearchParams(searchParams);
  };

  const { setValue, watch } = useFormContext<add_address_form>();

  const [zoom, setZoom] = useState<number[]>([12]);
  const [coords, setCoords] = useState<number[]>(() => {
    if (watch("lng") && watch("lat")) {
      return [watch("lng"), watch("lat")];
    }
    return [51.42047, 35.729054];
  });
  const [center, setCenter] = useState<number[]>(() => {
    if (watch("lng") && watch("lat")) {
      return [watch("lng"), watch("lat")];
    }
    return [51.42047, 35.729054];
  });
  const [text, setText] = useState<string>("");
  const [debouncedValue] = useDebounceValue(text, 200);

  const { data: mapirSearchData } = useQuery(
    ["mapir-search", debouncedValue],
    () =>
      mapirSearchv2({
        params: {
          text: debouncedValue,
        },
      }),
    {
      enabled: debouncedValue.length > 1,
      refetchOnWindowFocus: false,
    }
  );

  const validateAddress = useMutation(mapirReverse, {
    onSuccess: (res) => {
      if (res?.data) {
        const { geom, address, city, province } = res.data as mapir_reserve;
        const [longitude, latitude] = geom.coordinates;
        queryClient.invalidateQueries();
        setValue("lat", +latitude);
        setValue("lng", +longitude);
        setValue("address", address);
        setValue("province", province);
        setValue("city", city);
        handleStep("verify");
      }
    },
  });

  const handleMutation = () => {
    const [lon, lat] = coords;
    validateAddress.mutate({
      params: {
        lon,
        lat,
      },
    });
  };

  const handleMapClick = (_: any, e: any) => {
    const { lngLat } = e;
    setZoom([_.transform._zoom]);
    setCoords([lngLat.lng, lngLat.lat]);
  };

  const handleMapDrag = (e: any) => {
    const { lng, lat } = e.getCenter();
    setCoords([lng, lat]);
  };

  const handleAddressClick = (item: any) => {
    setCoords(item.geom.coordinates);
    setText(item.address);
  };

  useEffect(() => {
    if (coords) setCenter(coords);
  }, [coords]);

  return (
    <Dialog.Panel className="flex flex-col gap-x-4 gap-y-6 p-4">
      <Autocomplete
        name="mapir-search"
        type="text"
        value={text}
        className="input input-bordered w-full"
        onChange={(e) => setText(e.target.value)}
        placeholder="موقعیت مکانی خود را انتخاب کنید..."
      >
        {(mapirSearchData as any)?.data.value.map(
          (item: Record<string, string>, index: number) => (
            <button
              key={`${index}-${item.address}`}
              className="w-100 text-right border-b border-b-G8 p-3"
              onClick={() => handleAddressClick(item)}
            >
              {item.address}
            </button>
          )
        )}
      </Autocomplete>
      <NoskheMapElement
        userLocation
        onDblClick={handleMapClick}
        center={center}
        zoom={zoom}
        onDrag={handleMapDrag}
        className="w-100 h-96"
        containerStyle={{
          outerHeight: "100%",
          innerHeight: "100%",
          width: "100%",
        }}
      >
        <NoskheMapMarker coordinates={coords} anchor="bottom" />
      </NoskheMapElement>
      <div className="flex items-center justify-end border-t border-t-grey-100 pt-4 gap-3">
        <button
          type="button"
          className="btn btn-link btn-custom text-grey-800"
          onClick={handleSelect}
        >
          انصراف
        </button>
        <button
          className="btn btn-primary btn-custom btn-wide"
          onClick={handleMutation}
          disabled={validateAddress.isLoading}
        >
          تایید آدرس
        </button>
      </div>
    </Dialog.Panel>
  );
}

export { AddAddressMap };

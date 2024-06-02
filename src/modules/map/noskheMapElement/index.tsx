import { PropsWithChildren, useEffect, useState } from "react";
import Mapir from "mapir-react-component";
import "mapir-react-component/dist/index.css";

const AuthenticatedMap = Mapir.setToken({
  transformRequest: (url: string) => {
    return {
      url: url,
      headers: {
        "x-api-key": import.meta.env.VITE_MAP_TOKEN,
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

function NoskheMapElement({
  children,
  ...rest
}: PropsWithChildren & {
  userLocation?: boolean;
  interactive?: boolean;
  onDblClick?: (_: unknown, e: unknown) => void;
  center?: number[];
  zoom?: number[];
  onDrag?: (e: unknown) => void;
  className?: string;
  containerStyle?: Record<string, unknown>;
}) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!isVisible) return null;

  return (
    <Mapir
      Map={AuthenticatedMap}
      apiKey={import.meta.env.VITE_MAP_TOKEN}
      {...rest}
    >
      <Mapir.ZoomControl position={"top-left"} />
      {children}
    </Mapir>
  );
}

export { NoskheMapElement };

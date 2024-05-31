import { useLocation } from "react-router-dom";

const useIsCurrentEndpoint = () => {
  const { pathname } = useLocation();

  const isCurrentEndpoint = (to: string) =>
    pathname.split("/").includes(to.slice(1));

  return { isCurrentEndpoint };
};

export { useIsCurrentEndpoint };

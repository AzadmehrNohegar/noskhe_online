import clsx from "clsx";
import { CSSProperties, PropsWithChildren } from "react";

interface IRadialProgress extends PropsWithChildren {
  containerClassName: string;
  progress: number;
  max: number;
  customProperties?: Record<string, string>;
}

function RadialProgress({
  containerClassName,
  progress,
  max,
  children,
  customProperties,
}: IRadialProgress) {
  return (
    <div className="relative">
      <div
        className="radial-progress absolute text-gray-200"
        style={
          {
            "--size": "6rem",
            "--thickness": "4px",
            "--value": (max - progress / max) * 100,
            ...customProperties,
          } as CSSProperties
        }
      ></div>
      <div
        className={clsx("radial-progress", containerClassName)}
        style={
          {
            "--size": "6rem",
            "--thickness": "4px",
            "--value": (progress / max) * 100,
            ...customProperties,
          } as CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}

export { RadialProgress };

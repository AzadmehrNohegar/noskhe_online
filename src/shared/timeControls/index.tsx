import { HTMLProps, useMemo } from "react";

interface ITimeControls extends HTMLProps<HTMLSpanElement> {
  seconds: number;
}

function TimeControls({ seconds, ...rest }: ITimeControls) {
  const time = useMemo(() => {
    let totalSeconds = seconds;
    const h =
      Math.floor(totalSeconds / 3600) < 10
        ? `0${Math.floor(totalSeconds / 3600)}`
        : Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const m =
      Math.floor(totalSeconds / 60) < 10
        ? `0${Math.floor(totalSeconds / 60)}`
        : Math.floor(totalSeconds / 60);
    const s =
      totalSeconds % 60 < 10 ? `0${totalSeconds % 60}` : totalSeconds % 60;
    return { h, m, s };
  }, [seconds]);

  return (
    <span {...rest}>
      {time.h}:{time.m}:{time.s}
    </span>
  );
}

export { TimeControls };

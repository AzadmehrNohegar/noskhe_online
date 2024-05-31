import { HTMLProps } from "react";

interface ITimerProps extends HTMLProps<HTMLSpanElement> {
  seconds: number;
}

function Timer({ seconds, ...rest }: ITimerProps) {
  return (
    <span {...rest}>
      {Math.floor(seconds / 60)}:
      {seconds - Math.floor(seconds / 60) * 60 < 10
        ? `0${seconds - Math.floor(seconds / 60) * 60}`
        : seconds - Math.floor(seconds / 60) * 60}
    </span>
  );
}

export { Timer };

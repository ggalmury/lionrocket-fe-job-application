import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Display1 = ({ text, styles }: TypographyProps) => {
  return (
    <span
      className={clsx(
        "text-display1-sm leading-display1-sm",
        "md:text-display1-md md:leading-display1-md",
        "lg:text-display1-lg lg:leading-display1-lg",
        styles?.color,
        styles?.weight ?? "font-bold",
      )}
    >
      {text}
    </span>
  );
};

export default Display1;

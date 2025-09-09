import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Display2 = ({ text, styles }: TypographyProps) => {
  return (
    <span
      className={clsx(
        "text-display2-sm leading-display2-sm",
        "md:text-display2-md md:leading-display2-md",
        "lg:text-display2-lg lg:leading-display2-lg",
        styles?.color,
        styles?.weight ?? "font-bold",
      )}
    >
      {text}
    </span>
  );
};

export default Display2;

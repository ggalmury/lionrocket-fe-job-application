import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Title2 = ({ text, styles }: TypographyProps) => {
  return (
    <span
      className={clsx(
        "text-title2-sm leading-title2-sm",
        "md:text-title2-md md:leading-title2-md",
        "lg:text-title2-lg lg:leading-title2-lg",
        styles?.color,
        styles?.weight ?? "font-bold",
      )}
    >
      {text}
    </span>
  );
};

export default Title2;

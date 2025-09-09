import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Title1 = ({ text, styles }: TypographyProps) => {
  return (
    <span
      className={clsx(
        "text-title1-sm leading-title1-sm",
        "md:text-title1-md md:leading-title1-md",
        "lg:text-title1-lg lg:leading-title1-lg",
        styles?.color,
        styles?.weight ?? "font-bold",
      )}
    >
      {text}
    </span>
  );
};

export default Title1;

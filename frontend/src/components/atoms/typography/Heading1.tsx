import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Heading1 = ({ text, styles }: TypographyProps) => {
  return (
    <span
      className={clsx(
        "text-heading1-sm leading-heading1-sm",
        "md:text-heading1-md md:leading-heading1-md",
        "lg:text-heading1-lg lg:leading-heading1-lg",
        styles?.color,
        styles?.weight ?? "font-bold",
      )}
    >
      {text}
    </span>
  );
};

export default Heading1;

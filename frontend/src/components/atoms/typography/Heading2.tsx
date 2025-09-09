import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Heading2 = ({ text, styles }: TypographyProps) => {
  return (
    <span
      className={clsx(
        "text-heading2-sm leading-heading2-sm",
        "md:text-heading2-md md:leading-heading2-md",
        "lg:text-heading2-lg lg:leading-heading2-lg",
        styles?.color,
        styles?.weight ?? "font-bold",
      )}
    >
      {text}
    </span>
  );
};

export default Heading2;

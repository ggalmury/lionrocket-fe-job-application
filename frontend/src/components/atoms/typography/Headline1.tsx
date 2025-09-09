import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Headline1 = ({ text, styles }: TypographyProps) => {
  return (
    <span
      className={clsx(
        "text-headline1-sm leading-headline1-sm",
        "md:text-headline1-md md:leading-headline1-md",
        "lg:text-headline1-lg lg:leading-headline1-lg",
        styles?.color,
        styles?.weight ?? "font-bold",
      )}
    >
      {text}
    </span>
  );
};

export default Headline1;

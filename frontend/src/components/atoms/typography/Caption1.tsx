import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Caption1 = ({ text, styles }: TypographyProps) => {
  return <span className={clsx("text-caption1 leading-caption1", styles?.color, styles?.weight ?? "font-normal")}>{text}</span>;
};

export default Caption1;

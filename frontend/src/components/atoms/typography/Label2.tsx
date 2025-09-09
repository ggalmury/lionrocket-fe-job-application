import clsx from "clsx";

import type { TypographyProps } from "@/components/atoms/typography/props/typographyProps";

const Label2 = ({ text, styles }: TypographyProps) => {
  return <span className={clsx("text-label2 leading-label2", styles?.color, styles?.weight ?? "font-normal")}>{text}</span>;
};

export default Label2;
